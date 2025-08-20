import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting store
const rateLimit = new Map<string, { count: number; lastReset: number }>();

// Simple rate limiting: 5 submissions per 15 minutes per IP
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(key);

  if (!record) {
    rateLimit.set(key, { count: 1, lastReset: now });
    return true;
  }

  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimit.set(key, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function validateContactForm(data: ContactFormData): string[] {
  const errors: string[] = [];

  if (!data.name?.trim() || data.name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters");
  }

  if (!data.email?.trim()) {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Invalid email format");
    }
  }

  if (!data.subject) {
    errors.push("Subject is required");
  }

  if (!data.message?.trim() || data.message.trim().length < 10) {
    errors.push("Message is required and must be at least 10 characters");
  }

  if (data.message?.length > 5000) {
    errors.push("Message must be less than 5000 characters");
  }

  return errors;
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is properly configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key_here') {
      console.error("RESEND_API_KEY is not configured properly");
      return NextResponse.json(
        { 
          success: false, 
          message: "Email service is not properly configured. Please contact me directly at cab495@cornell.edu" 
        },
        { status: 500 }
      );
    }

    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Too many requests. Please wait before sending another message." 
        },
        { status: 429 }
      );
    }

    const body: ContactFormData = await request.json();

    // Validate the form data
    const validationErrors = validateContactForm(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Validation failed", 
          errors: validationErrors 
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      subject: body.subject,
      message: sanitizeInput(body.message)
    };

    // Log the submission
    console.log("Contact form submission:", {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ip: rateLimitKey
    });

    // Send email using Resend
    try {
      const emailResult = await resend.emails.send({
        from: `${process.env.FROM_NAME || "Cameron Brady Portfolio"} <${process.env.FROM_EMAIL || "noreply@cameronbrady.dev"}>`,
        to: process.env.CONTACT_EMAIL || "cab495@cornell.edu",
        subject: `Portfolio Contact: ${sanitizedData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #555; margin-bottom: 8px;">Contact Details:</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${sanitizedData.name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${sanitizedData.email}</p>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${sanitizedData.subject}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #555; margin-bottom: 8px;">Message:</h3>
                <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #7c3aed; border-radius: 5px;">
                  <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${sanitizedData.message}</p>
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px; margin: 0;">
                  <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
                  <strong>IP:</strong> ${rateLimitKey}
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              This email was sent from your portfolio contact form
            </div>
          </div>
        `,
        // Plain text fallback
        text: `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Subject: ${sanitizedData.subject}

Message:
${sanitizedData.message}

Submitted: ${new Date().toLocaleString()}
IP: ${rateLimitKey}
        `.trim()
      });

      if (emailResult.error) {
        console.error("Resend error:", emailResult.error);
        throw new Error(`Failed to send email: ${emailResult.error.message || emailResult.error || 'Unknown error'}`);
      }

      console.log("Email sent successfully:", emailResult.data?.id);
      
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      throw new Error("Failed to send email notification");
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you within 24 hours."
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Sorry, something went wrong. Please try again or contact me directly at cab495@cornell.edu" 
      },
      { status: 500 }
    );
  }
}
