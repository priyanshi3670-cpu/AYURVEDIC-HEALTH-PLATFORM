import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const faqs = [
  {
    question: 'How accurate is AI guidance?',
    answer: 'Our AI assistant provides recommendations based on established Ayurvedic principles and traditional knowledge databases. While it offers helpful wellness guidance, it should be used as a supplementary tool alongside professional medical consultation. The system continuously learns from verified Ayurvedic texts and expert-validated responses.'
  },
  {
    question: 'Can AI diagnose diseases?',
    answer: 'No, our AI assistant does not diagnose diseases. It provides educational wellness information and general Ayurvedic guidance based on symptoms and Dosha analysis. For medical diagnosis and treatment, always consult a qualified Ayurvedic physician or healthcare professional.'
  },
  {
    question: 'How are recommendations generated?',
    answer: 'Recommendations are generated using keyword matching against curated Ayurvedic knowledge databases, including dosha-specific dietary guidelines, lifestyle practices (Dinacharya), seasonal routines (Ritucharya), and traditional treatment protocols. The system considers your Dosha type, health goals, and reported symptoms.'
  },
  {
    question: 'Can I save my chats?',
    answer: 'Yes! You can bookmark any AI response by hovering over the message and clicking the bookmark icon. All bookmarked responses are saved in the Saved Bookmarks section. Your conversation history is also automatically preserved and searchable.'
  },
  {
    question: 'Is my health data secure?',
    answer: 'Your health information is stored locally and processed securely. We follow strict data privacy guidelines. No personal health data is shared with third parties. The AI processes your queries in real-time without storing sensitive medical information.'
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6"
    >
      <div className="flex items-center gap-2 mb-1">
        <FiHelpCircle className="w-4 h-4 text-[#2E7D32]" />
        <h3 className="font-serif text-lg font-bold text-gray-800">Frequently Asked Questions</h3>
      </div>
      <p className="text-xs text-gray-400 mb-5">Common questions about the AI Ayurveda Assistant</p>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-emerald-50 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#F8FFF8] transition-colors cursor-pointer"
            >
              <span className="text-xs font-bold text-gray-700">{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="w-4 h-4 text-gray-400" />
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-emerald-50 pt-3">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQSection;
