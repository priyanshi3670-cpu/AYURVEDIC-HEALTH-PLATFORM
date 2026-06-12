import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'How do I book a consultation or Panchakarma package?',
    answer: 'You can book directly by clicking the "Book Consultation" button on the top hero section or by selecting the "Book Package" option on specific therapy programs. After submitting your name, contact info, and desired date, our center care coordinator will contact you within 2 hours to confirm your appointment and slot times.'
  },
  {
    id: 2,
    question: 'Do you provide residential accommodation for long-term programs?',
    answer: 'Yes! Most of our premium Panchakarma centers feature comfortable residential packages ranging from 7 to 21 days. Accommodation choices include luxury AC rooms, single occupancy suites, and garden cottages. Meals are purely organic, tailored to your dosha, and prepared in-house by Ayurvedic chefs.'
  },
  {
    id: 3,
    question: 'What classical Ayurvedic therapies are available at this clinic?',
    answer: 'We offer a full spectrum of classical treatments including Panchakarma detoxification (Vamana, Virechana, Basti, Nasya, Rakta Mokshana), oil pouring (Shirodhara, Ksheeradhara), oil massages (Abhyanga, Udvarthanam), and joint therapy (Janu Basti, Griva Basti). All therapies are performed using high-grade organic medicated oils.'
  },
  {
    id: 4,
    question: 'Do you offer online post-treatment consultations?',
    answer: 'Absolutely. We offer complete hybrid recovery support. After completing your in-person Panchakarma or therapy cycle, you can schedule virtual follow-up appointments with your consulting Vaidya to check progress, adjust herb dosages, and adapt your seasonal diet plan.'
  }
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-emerald-800/5">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-accent uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-amber-500/10">
          Got Questions?
        </span>
        <h2 className="font-serif text-3xl font-black text-text-primary">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-text-secondary mt-2 font-medium">
          Have queries about treatment timelines, stays, or appointments? Explore answers below.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`border rounded-2xl transition-all duration-300 ${
                isOpen 
                  ? 'border-primary bg-gradient-to-br from-[#F8FFF8] to-white shadow-sm' 
                  : 'border-gray-100 hover:border-primary/20 hover:bg-[#F8FFF8]/20'
              }`}
            >
              {/* Question Trigger */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-primary' : 'text-text-secondary'}`} />
                  <span className="font-serif font-black text-sm md:text-base text-text-primary">
                    {faq.question}
                  </span>
                </div>
                <div className={`p-1.5 rounded-lg transition-transform ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-50 text-text-secondary'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Answer Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 pt-0 text-xs text-text-secondary leading-relaxed font-medium pl-14 border-t border-gray-100/50 mt-2">
                      {faq.answer}
                    </div>
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
