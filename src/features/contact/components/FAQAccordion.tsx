"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openItems.has(index);
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <GlassCard className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg transition-all"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-purple-300 pr-4 group-hover:text-purple-200 transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.4, 0, 0.2, 1] 
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                        className="border-t border-gray-600/30 pt-4"
                      >
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                        {faq.category && (
                          <span className="inline-block mt-3 px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                            {faq.category}
                          </span>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
};