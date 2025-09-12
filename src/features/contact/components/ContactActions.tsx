"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Download, Loader2, CheckCircle } from 'lucide-react';
import { socialLinks } from '../constants/contactData';

interface ContactActionsProps {
  layout?: 'horizontal' | 'stacked' | 'inline';
  showResume?: boolean;
  showSocial?: boolean;
  className?: string;
}

export const ContactActions: React.FC<ContactActionsProps> = ({
  layout = 'horizontal',
  showResume = true,
  showSocial = true,
  className = ""
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const downloadResume = useCallback(async () => {
    if (isDownloading) return;
    
    try {
      setIsDownloading(true);
      
      const response = await fetch('/resume.pdf', { method: 'HEAD' });
      if (!response.ok) {
        console.error('Resume file not found');
        setIsDownloading(false);
        return;
      }

      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Cameron_Resume.pdf';
      link.style.display = 'none';
      
      let downloadCompleted = false;

      const handleDownloadComplete = () => {
        if (!downloadCompleted) {
          downloadCompleted = true;
          setIsDownloading(false);
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 3000);
        }
      };

      const handleWindowFocus = () => {
        if (downloadCompleted) return;
        setTimeout(() => {
          if (!downloadCompleted) {
            handleDownloadComplete();
          }
        }, 500);
      };

      const handleVisibilityChange = () => {
        if (downloadCompleted || document.hidden) return;
        setTimeout(() => {
          if (!downloadCompleted) {
            handleDownloadComplete();
          }
        }, 300);
      };

      const fallbackTimer = setTimeout(() => {
        if (!downloadCompleted) {
          handleDownloadComplete();
        }
      }, 2000);

      window.addEventListener('focus', handleWindowFocus);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      document.body.appendChild(link);
      link.click();
      
      const cleanup = () => {
        clearTimeout(fallbackTimer);
        window.removeEventListener('focus', handleWindowFocus);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        if (!downloadCompleted) {
          setIsDownloading(false);
        }
      };

      setTimeout(cleanup, 10000);
      
    } catch (err) {
      console.error('Failed to download resume:', err);
      setIsDownloading(false);
    }
  }, [isDownloading]);

  const SocialLinks = () => (
    <div className={`${layout === 'inline' ? 'flex items-center space-x-4' : 'grid grid-cols-2 gap-3'}`}>
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center space-x-2 transition-all group ${
            layout === 'inline' 
              ? 'text-gray-300 hover:text-white' 
              : 'p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700/50 focus:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50'
          }`}
          aria-label={`Visit my ${social.name} profile`}
        >
          {social.name === "GitHub" ? (
            <Github className={`${layout === 'inline' ? 'w-5 h-5' : 'w-6 h-6'} text-gray-300 group-hover:text-white transition-colors`} />
          ) : social.name === "LinkedIn" ? (
            <Linkedin className={`${layout === 'inline' ? 'w-5 h-5' : 'w-6 h-6'} text-gray-300 group-hover:text-blue-400 transition-colors`} />
          ) : null}
          {layout !== 'inline' && (
            <span className="font-medium text-gray-300 group-hover:text-white">
              {social.name}
            </span>
          )}
        </motion.a>
      ))}
    </div>
  );

  const ResumeDownload = () => (
    <div className="space-y-3">
      <motion.button
        onClick={downloadResume}
        whileHover={!isDownloading ? { scale: 1.02 } : {}}
        whileTap={!isDownloading ? { scale: 0.98 } : {}}
        disabled={isDownloading}
        className={`${layout === 'stacked' ? 'w-full' : 'w-auto'} flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all group ${
          isDownloading 
            ? 'opacity-80 cursor-not-allowed' 
            : 'hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-400/50'
        }`}
        aria-label={isDownloading ? "Downloading resume..." : "Download my resume"}
      >
        {isDownloading ? (
          <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
        ) : (
          <Download className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
        )}
        <span className={`font-medium transition-colors ${
          isDownloading 
            ? 'text-purple-300' 
            : 'text-purple-300 group-hover:text-white'
        }`}>
          {isDownloading ? 'Downloading...' : 'Download Resume'}
        </span>
      </motion.button>

      <AnimatePresence>
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center space-x-2 p-2 bg-green-500/20 border border-green-500/30 rounded-lg"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm font-medium">
              Resume downloaded successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (layout === 'inline') {
    return (
      <div className={`flex items-center space-x-6 ${className}`}>
        {showSocial && <SocialLinks />}
        {showResume && showSocial && <div className="h-6 w-px bg-gray-600" />}
        {showResume && <ResumeDownload />}
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div className={`flex flex-col sm:flex-row gap-6 ${className}`}>
        {showSocial && (
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-3">Connect With Me</h3>
            <SocialLinks />
          </div>
        )}
        {showResume && (
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-3">Get My Resume</h3>
            <ResumeDownload />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {showSocial && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Connect With Me</h3>
          <SocialLinks />
        </div>
      )}
      {showResume && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Get My Resume</h3>
          <ResumeDownload />
        </div>
      )}
    </div>
  );
};