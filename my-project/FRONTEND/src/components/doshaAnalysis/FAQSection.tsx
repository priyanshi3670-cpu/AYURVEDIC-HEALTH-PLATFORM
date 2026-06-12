import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: "What is the difference between Prakriti and Vikriti?",
      a: "Prakriti is your biological body constitution determined at the moment of conception, representing your natural state of balance. Vikriti is your current state of imbalance, influenced by diet, stress, season, and environment."
    },
    {
      q: "Can my dominant Dosha change over time?",
      a: "No, your Prakriti (natural constitution) remains constant throughout your life. However, your Vikriti (active state of imbalance) can fluctuate. The goal of Ayurveda is to bring your Vikriti back in line with your Prakriti."
    },
    {
      q: "What does it mean to have a dual-dosha (e.g., Pitta-Kapha)?",
      a: "Most people have a double-dosha constitution where two doshas are prominent, and one is less active. In a Pitta-Kapha constitution, you carry the heat, sharpness, and digestion of Pitta along with the structure, strength, and calm of Kapha."
    },
    {
      q: "How often should I retake this assessment?",
      a: "It is recommended to retake this assessment seasonally (every 3-4 months) or whenever you notice significant shifts in your digestion, sleep cycles, energy, or mood patterns to identify and correct any active Vikriti imbalances."
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2.5 border-b border-gray-50 pb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <HelpCircle className="w-5 h-5 text-accent" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">constitution common queries</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Frequently Asked Questions</h3>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className="bg-[#FAF9F6] border border-primary/5 rounded-2xl overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex items-center justify-between p-4 text-left font-serif text-xs md:text-sm font-black text-text-primary hover:text-primary transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary shrink-0" />
                )}
              </button>
              
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="p-4 pt-0 text-xs text-text-secondary leading-relaxed font-semibold border-t border-gray-100/50">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
