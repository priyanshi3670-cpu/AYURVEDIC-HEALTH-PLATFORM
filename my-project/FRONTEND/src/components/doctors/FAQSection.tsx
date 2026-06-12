import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'Simply select your preferred date from the calendar slider, choose an available time slot, fill out your patient details (name, email, phone, and symptoms) in the form, and click "Book Appointment". Your scheduling request will be processed immediately.'
    },
    {
      question: 'Can I reschedule or cancel my booking?',
      answer: 'Yes. You can reschedule or cancel your appointment free of charge up to 24 hours before the scheduled time slot. Please check your confirmation email for direct reschedule links or contact our clinic helpline.'
    },
    {
      question: 'What is a video consultation and how does it work?',
      answer: 'An online video consultation connects you directly with the doctor via a secure Google Meet link. Upon booking approval, you will receive the calendar invitation with details. Make sure you have a reliable internet connection at the scheduled time.'
    },
    {
      question: 'How do I pay the consultation fee?',
      answer: 'For online consultations, you can pay securely online via cards, UPI, or net banking using the payment instructions sent in your verification email. For clinic visits, you can pay directly at the front desk using cash or cards.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <h3 className="font-serif text-lg font-bold text-primary flex items-center space-x-2.5">
        <HelpCircle className="w-5 h-5 text-accent shrink-0" />
        <span>Frequently Asked Questions</span>
      </h3>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border-b border-gray-100 last:border-0 pb-3 last:pb-0 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center text-left py-2 text-xs font-bold text-primary hover:text-primary-light transition-colors focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-accent transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
