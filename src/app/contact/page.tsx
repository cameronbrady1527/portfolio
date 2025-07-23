"use client";
// contact/page.tsx
// Contact page for Cameron Brady's portfolio
// Features contact form, contact information, and social media links
//
// Sections:
// - Hero section with contact overview
// - Contact form with validation
// - Contact information
// - Social media links
// - Neural background integration

import { GlassCard } from "@/components/GlassCard";
import { NeuralButton } from "@/components/NeuralButton";
import { Header } from "@/components/Header";
import { TypewriterText } from "@/components/TypewriterText";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success/error
    const success = Math.random() > 0.3; // 70% success rate for demo
    setSubmitStatus(success ? "success" : "error");
    setIsSubmitting(false);
    
    if (success) {
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "cameron.brady@example.com",
      link: "mailto:cameron.brady@example.com"
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: "📍",
      title: "Location",
      value: "Ithaca, NY / Remote",
      link: null
    },
    {
      icon: "⏰",
      title: "Response Time",
      value: "Within 24 hours",
      link: null
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/cameronbrady",
      icon: "🐙",
      color: "hover:text-gray-300"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/cameronbrady",
      icon: "💼",
      color: "hover:text-blue-400"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/cameronbrady",
      icon: "🐦",
      color: "hover:text-blue-400"
    },
    {
      name: "ResearchGate",
      url: "https://researchgate.net/profile/cameron-brady",
      icon: "🔬",
      color: "hover:text-green-400"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center p-8 relative">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <GlassCard className="mb-8">
              <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
                <TypewriterText 
                  text="Get In Touch" 
                  speed={80}
                  className="text-white"
                />
              </h1>
              <p className="text-xl sm:text-2xl text-purple-300 font-medium mb-6">
                Let's Build Something Amazing Together
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Whether you're interested in collaboration, have a project in mind, 
                or just want to connect, I'd love to hear from you.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-white">Send a Message</h2>
                <GlassCard>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="project-collaboration">Project Collaboration</option>
                        <option value="research-opportunity">Research Opportunity</option>
                        <option value="consulting">Consulting</option>
                        <option value="speaking-engagement">Speaking Engagement</option>
                        <option value="general-inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell me about your project, idea, or how I can help..."
                      />
                    </div>

                    {/* Submit Status */}
                    {submitStatus === "success" && (
                      <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <p className="text-green-300">Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.</p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <p className="text-red-300">Oops! Something went wrong. Please try again or reach out via email.</p>
                      </div>
                    )}

                    <NeuralButton
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                      onClick={() => handleSubmit(new Event('submit') as any)}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </NeuralButton>
                  </form>
                </GlassCard>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-white">Contact Information</h2>
                
                {/* Contact Details */}
                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => (
                    <GlassCard key={index} className="flex items-center space-x-4">
                      <div className="text-2xl">{info.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{info.title}</h3>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-purple-300 hover:text-purple-200 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-300">{info.value}</p>
                        )}
                      </div>
                    </GlassCard>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Connect With Me</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-all group"
                      >
                        <span className="text-xl">{social.icon}</span>
                        <span className={`font-medium ${social.color}`}>{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Availability & Response */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <GlassCard>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-2">Quick Response</h3>
                  <p className="text-gray-300">I typically respond within 24 hours</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold text-white mb-2">Remote Available</h3>
                  <p className="text-gray-300">Open to remote collaboration worldwide</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-bold text-white mb-2">Open to Discuss</h3>
                  <p className="text-gray-300">Always interested in new opportunities</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <GlassCard>
                <h3 className="text-lg font-bold text-purple-300 mb-2">
                  What types of projects do you work on?
                </h3>
                <p className="text-gray-300">
                  I specialize in AI/ML applications, healthcare technology, web development, and research projects. 
                  I'm particularly interested in projects that combine multiple disciplines and have real-world impact.
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-bold text-purple-300 mb-2">
                  Do you take on freelance work?
                </h3>
                <p className="text-gray-300">
                  Yes! I'm available for freelance projects, consulting, and collaboration opportunities. 
                  I prefer projects that align with my expertise in AI, healthcare, and full-stack development.
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-bold text-purple-300 mb-2">
                  What's your typical project timeline?
                </h3>
                <p className="text-gray-300">
                  Project timelines vary based on scope and complexity. Small projects might take 2-4 weeks, 
                  while larger applications can span 2-6 months. I'll provide a detailed timeline during our initial discussion.
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-bold text-purple-300 mb-2">
                  Are you available for speaking engagements?
                </h3>
                <p className="text-gray-300">
                  Absolutely! I enjoy speaking about AI in healthcare, machine learning applications, 
                  and the intersection of neuroscience and computer science. Feel free to reach out for conference or event opportunities.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
