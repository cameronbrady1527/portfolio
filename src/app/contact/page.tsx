"use client";

import { GlassCard } from "@/components/GlassCard";
import { NeuralButton } from "@/components/NeuralButton";
import { Header } from "@/components/Header";
import { TypewriterText } from "@/components/TypewriterText";
import { useState, useEffect, useRef, useCallback } from "react";
import { Github, Linkedin, AlertCircle, CheckCircle, Loader2, Send, Mail, MapPin, Clock, Copy, Check, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CelebrationEffect,
  FormField,
  FAQAccordion,
  useContactForm,
  contactInfo,
  socialLinks,
  subjectOptions,
  faqData
} from "@/features/contact";
import { ScrollIndicator } from "@/components/ui";

export default function Contact() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const statusMessageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    formData,
    isSubmitting,
    submitStatus,
    errors,
    validationStatus,
    isTyping,
    showParticles,
    emailSuggestions,
    showSuggestions,
    handleInputChange,
    handleBlur,
    handleSubmit,
    selectEmailSuggestion,
    hasErrors
  } = useContactForm();

  // Throttled scroll handler for better performance
  const throttledScroll = useCallback(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsAtTop(window.scrollY < 100);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    return handleScroll;
  }, []);

  useEffect(() => {
    const scrollHandler = throttledScroll();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [throttledScroll]);

  // Copy to clipboard functionality
  const copyToClipboard = useCallback(async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  // Resume download functionality
  const downloadResume = useCallback(async () => {
    if (isDownloading) return; // Prevent multiple simultaneous downloads
    
    try {
      setIsDownloading(true);
      
      // First check if the file exists
      const response = await fetch('/resume.pdf', { method: 'HEAD' });
      if (!response.ok) {
        console.error('Resume file not found');
        setIsDownloading(false);
        return;
      }

      // Create download link
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Cameron_Resume.pdf';
      link.style.display = 'none';
      
      let downloadCompleted = false;

      // Function to handle download completion
      const handleDownloadComplete = () => {
        if (!downloadCompleted) {
          downloadCompleted = true;
          setIsDownloading(false);
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 3000);
        }
      };

      // Method 1: Use focus events to detect when user returns to page
      const handleWindowFocus = () => {
        if (downloadCompleted) return;
        // Small delay to ensure this is from download dialog interaction
        setTimeout(() => {
          if (!downloadCompleted) {
            handleDownloadComplete();
          }
        }, 500);
      };

      // Method 2: Use Page Visibility API
      const handleVisibilityChange = () => {
        if (downloadCompleted || document.hidden) return;
        // When page becomes visible again after download dialog
        setTimeout(() => {
          if (!downloadCompleted) {
            handleDownloadComplete();
          }
        }, 300);
      };

      // Method 3: Fallback timer (in case focus/visibility events don't fire)
      const fallbackTimer = setTimeout(() => {
        if (!downloadCompleted) {
          handleDownloadComplete();
        }
      }, 2000);

      // Add event listeners
      window.addEventListener('focus', handleWindowFocus);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      
      // Clean up function
      const cleanup = () => {
        clearTimeout(fallbackTimer);
        window.removeEventListener('focus', handleWindowFocus);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        // Ensure loading state is cleared
        if (!downloadCompleted) {
          setIsDownloading(false);
        }
      };

      // Clean up after 10 seconds regardless
      setTimeout(cleanup, 10000);
      
    } catch (err) {
      console.error('Failed to download resume:', err);
      setIsDownloading(false);
    }
  }, [isDownloading]);

  // Auto-scroll to status message when submission completes
  useEffect(() => {
    if (submitStatus !== 'idle' && statusMessageRef.current) {
      setTimeout(() => {
        statusMessageRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 100);
    }
  }, [submitStatus]);

  return (
    <div className="relative min-h-screen">
      {/* Celebration Effect */}
      <CelebrationEffect showParticles={showParticles} />
      
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
                Let&apos;s Build Something Amazing Together
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Whether you&apos;re interested in collaboration, have a project in mind, 
                or just want to connect, I&apos;d love to hear from you.
              </p>
            </GlassCard>

            {/* Scroll Indicator */}
            <ScrollIndicator isVisible={isAtTop} />
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
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        type="text"
                        name="name"
                        label="Name"
                        value={formData.name}
                        error={errors.name}
                        isRequired
                        validationStatus={validationStatus.name}
                        isTyping={isTyping.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Your full name"
                      />
                      
                      <FormField
                        type="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        error={errors.email}
                        isRequired
                        validationStatus={validationStatus.email}
                        isTyping={isTyping.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="your.email@example.com"
                        suggestions={emailSuggestions}
                        showSuggestions={showSuggestions}
                        onSelectSuggestion={selectEmailSuggestion}
                      />
                    </div>

                    <FormField
                      type="select"
                      name="subject"
                      label="Subject"
                      value={formData.subject}
                      error={errors.subject}
                      isRequired
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      options={subjectOptions}
                    />

                    <FormField
                      type="textarea"
                      name="message"
                      label="Message"
                      value={formData.message}
                      error={errors.message}
                      isRequired
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Tell me about your project, idea, or how I can help..."
                      rows={6}
                      maxLength={5000}
                      showCharacterCount
                    />

                    {/* Submit Status */}
                    <div ref={statusMessageRef}>
                      <AnimatePresence>
                        {submitStatus === "success" && (
                          <motion.div 
                            className="relative p-6 bg-gradient-to-r from-green-500/20 via-green-400/20 to-emerald-500/20 border border-green-500/30 rounded-lg overflow-hidden"
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: -10 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                          >
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            
                            <div className="relative flex items-center">
                              <div className="relative mr-4">
                                <motion.div
                                  initial={{ scale: 0, rotate: -90 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ 
                                    delay: 0.3, 
                                    type: "spring", 
                                    damping: 18, 
                                    stiffness: 250,
                                    duration: 0.6
                                  }}
                                >
                                  <CheckCircle className="w-8 h-8 text-green-400" />
                                </motion.div>
                                
                                {[...Array(3)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="absolute -inset-2 bg-green-400/15 rounded-full"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ 
                                      scale: [0, 1.8, 2.2], 
                                      opacity: [0, 0.6, 0.3, 0] 
                                    }}
                                    transition={{ 
                                      duration: 2.5, 
                                      delay: 0.5 + (i * 0.4), 
                                      repeat: Infinity, 
                                      ease: [0.4, 0, 0.2, 1],
                                      repeatDelay: 1
                                    }}
                                  />
                                ))}
                              </div>
                              
                              <motion.p 
                                className="text-green-300 font-medium text-lg leading-relaxed"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  delay: 0.6, 
                                  duration: 0.8,
                                  ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                              >
                                Thank you! Your message has been sent successfully. I&apos;ll get back to you within 24 hours.
                              </motion.p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {submitStatus === "error" && (
                        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg animate-in slide-in-from-bottom duration-500">
                          <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-400 mr-2 animate-in zoom-in duration-300 delay-200" />
                            <p className="text-red-300 font-medium">
                              Oops! Something went wrong. Please try again or reach out via email directly.
                            </p>
                          </div>
                        </div>
                      )}

                      {submitStatus === "rate-limited" && (
                        <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg animate-in slide-in-from-bottom duration-500">
                          <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 animate-in zoom-in duration-300 delay-200" />
                            <p className="text-yellow-300 font-medium">
                              You&apos;ve reached the message limit. Please wait 15 minutes before sending another message.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <NeuralButton
                      variant="primary"
                      size="lg"
                      className={`w-full transition-all duration-300 ${
                        isSubmitting ? 'scale-98 opacity-90' : 'hover:scale-105'
                      }`}
                      disabled={isSubmitting || hasErrors}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </div>
                    </NeuralButton>
                  </form>
                </GlassCard>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-white">Contact Information</h2>
                
                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon === 'Mail' ? Mail : info.icon === 'MapPin' ? MapPin : Clock;
                    
                    return (
                      <div key={index} className="group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-gray-400 mb-1">{info.title}</h3>
                              {info.link ? (
                                <a 
                                  href={info.link}
                                  className="text-purple-300 hover:text-purple-200 transition-colors text-lg font-medium block truncate"
                                >
                                  {info.value}
                                </a>
                              ) : (
                                <p className="text-gray-200 text-lg font-medium">{info.value}</p>
                              )}
                              {info.priority && (
                                <span className="inline-block mt-1 px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                                  {info.priority}
                                </span>
                              )}
                              {info.estimate && (
                                <p className="text-sm text-gray-400 mt-1">{info.estimate}</p>
                              )}
                              {info.availability && (
                                <p className="text-sm text-green-400 mt-1">{info.availability}</p>
                              )}
                            </div>
                          </div>
                          
                          {info.copyable && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => copyToClipboard(info.value, `contact-${index}`)}
                              className="flex-shrink-0 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors group-hover:opacity-100 opacity-60"
                              aria-label={`Copy ${info.title}`}
                            >
                              <AnimatePresence mode="wait">
                                {copiedItem === `contact-${index}` ? (
                                  <motion.div
                                    key="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ duration: 0.15 }}
                                  >
                                    <Check className="w-4 h-4 text-green-400" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="copy"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ duration: 0.15 }}
                                  >
                                    <Copy className="w-4 h-4 text-gray-400" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Connect With Me</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-3 p-4 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700/50 focus:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all group"
                        aria-label={`Visit my ${social.name} profile`}
                      >
                        {social.name === "GitHub" ? (
                          <Github className="w-6 h-6 text-gray-300 group-hover:text-white group-focus:text-white transition-colors" />
                        ) : social.name === "LinkedIn" ? (
                          <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-blue-400 group-focus:text-blue-400 transition-colors" />
                        ) : null}
                        <span className={`font-medium ${social.color}`}>{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                  
                  {/* Resume Download Button */}
                  <motion.button
                    onClick={downloadResume}
                    whileHover={!isDownloading ? { scale: 1.02 } : {}}
                    whileTap={!isDownloading ? { scale: 0.98 } : {}}
                    disabled={isDownloading}
                    className={`w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all group ${
                      isDownloading 
                        ? 'opacity-80 cursor-not-allowed' 
                        : 'hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-400/50'
                    }`}
                    aria-label={isDownloading ? "Downloading resume..." : "Download my resume"}
                  >
                    {isDownloading ? (
                      <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                    ) : (
                      <Download className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    )}
                    <span className={`font-medium transition-colors ${
                      isDownloading 
                        ? 'text-purple-300' 
                        : 'text-purple-300 group-hover:text-white'
                    }`}>
                      {isDownloading ? 'Downloading...' : 'Download Resume'}
                    </span>
                  </motion.button>

                  {/* Success Indicator */}
                  <AnimatePresence>
                    {downloadSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mt-3 flex items-center justify-center space-x-2 p-2 bg-green-500/20 border border-green-500/30 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 text-sm font-medium">
                          Resume downloaded successfully!
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                  <div className="text-4xl mb-4 font-bold text-purple-300">Quick</div>
                  <h3 className="text-xl font-bold text-white mb-2">Quick Response</h3>
                  <p className="text-gray-300">I typically respond within 24 hours</p>
                </div>
                <div>
                  <div className="text-4xl mb-4 font-bold text-blue-300">Remote</div>
                  <h3 className="text-xl font-bold text-white mb-2">Remote Available</h3>
                  <p className="text-gray-300">Open to remote collaboration worldwide</p>
                </div>
                <div>
                  <div className="text-4xl mb-4 font-bold text-green-300">Open</div>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Have questions? Find answers to the most common inquiries about my work, availability, and expertise.
              </p>
            </motion.div>
            
            <FAQAccordion faqs={faqData} />
          </div>
        </section>
      </main>
    </div>
  );
}
