"use client";

import { GlassCard } from "@/components/GlassCard";
import { NeuralButton } from "@/components/NeuralButton";
import { Header } from "@/components/Header";
import { TypewriterText } from "@/components/TypewriterText";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CelebrationEffect,
  FormField,
  useContactForm,
  contactInfo,
  socialLinks,
  subjectOptions
} from "@/features/contact";

export default function Contact() {
  const [isAtTop, setIsAtTop] = useState(true);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div 
              className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${
                isAtTop 
                  ? 'opacity-100 translate-y-0 animate-bounce' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors cursor-pointer group">
                <span className="text-sm font-medium mb-2 group-hover:scale-110 transition-transform">
                  Scroll to explore
                </span>
                <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
            </div>
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
                  {contactInfo.map((info, index) => (
                    <GlassCard key={index} className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-purple-300">{info.icon}</div>
                      <div className="flex-1">
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
                        {social.name === "GitHub" ? (
                          <Github className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                        ) : social.name === "LinkedIn" ? (
                          <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
                        ) : null}
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
                  I&apos;m particularly interested in projects that combine multiple disciplines and have real-world impact.
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-bold text-purple-300 mb-2">
                  Do you take on freelance work?
                </h3>
                <p className="text-gray-300">
                  Yes! I&apos;m available for freelance projects, consulting, and collaboration opportunities. 
                  I prefer projects that align with my expertise in AI, healthcare, and full-stack development.
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-bold text-purple-300 mb-2">
                  What&apos;s your typical project timeline?
                </h3>
                <p className="text-gray-300">
                  Project timelines vary based on scope and complexity. Small projects might take 1-2 weeks, 
                  while larger applications can span 1-4 months. I&apos;ll provide a detailed timeline during our initial discussion.
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

              <GlassCard>
                <h3 className="text-lg font-bold text-purple-300 mb-2">
                  What&apos;s your background in computational neuroscience?
                </h3>
                <p className="text-gray-300">
                  I&apos;m passionate about leveraging machine learning and AI to advance computational neuroscience. 
                  My current research focuses on Parkinson&apos;s disease detection through vocal biomarkers, achieving 94.9% precision. 
                  I&apos;m building the foundation for my future career as a neurosurgeon who bridges AI research with clinical practice.
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-bold text-purple-300 mb-2">
                  Do you work on healthcare technology projects?
                </h3>
                <p className="text-gray-300">
                  Yes! Healthcare technology is my primary focus. For example, I&apos;ve developed early detection systems for neurological disorders, 
                  including my Parkinson&apos;s disease detection project using vocal biomarkers. I&apos;m particularly interested in projects 
                  that can improve patient outcomes and advance medical diagnostics through AI and machine learning.
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-bold text-purple-300 mb-2">
                  Are you available for nonprofit consulting?
                </h3>
                <p className="text-gray-300">
                  Absolutely! I have experience as a nonprofit consultant, having worked with the Community Mindfulness Project 
                  where I developed data-driven tools for nonprofit analysis. I can help with strategic program development, 
                  board governance, and technical solutions for nonprofit organizations.
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-bold text-purple-300 mb-2">
                  What&apos;s your experience with AI and machine learning?
                </h3>
                <p className="text-gray-300">
                  I work extensively with AI/ML technologies including Python, Scikit-learn, PyTorch, and various data science tools. 
                  My projects include AI-powered content generation platforms, healthcare diagnostics, and research applications. 
                  I&apos;m currently working at Astral AI, developing AI-powered web applications and data scraping automations.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
