import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const TreatmentFAQ: React.FC = () => {
  const faqs = [
    {
      question: 'Are Ayurvedic therapies safe to undergo?',
      answer: 'Yes, absolutely. Classical treatments like Panchakarma and Abhyanga use natural organic oils and herbal decocations suited to your specific body constitution (Doshas). All therapies are conducted under the supervision of qualified BAMS doctors to ensure absolute safety.'
    },
    {
      question: 'Can I undergo Ayurvedic treatment while taking modern pharmaceuticals?',
      answer: 'Generally, yes. Ayurvedic treatments work holistically and can often complement modern drugs. However, it is essential to disclose all current medications during your initial Vaidya consultation to avoid herb-drug interactions.'
    },
    {
      question: 'How are treatment recovery timelines estimated?',
      answer: 'Recovery timelines depend on whether a condition is acute or chronic, the strength of your digestive fire (Agni), and your adherence to prescribed diet changes. Mild imbalances resolve in 2-4 weeks, while deep-seated tissue conditions may require 3-6 months.'
    },
    {
      question: 'Are clinical treatment costs covered by insurance?',
      answer: 'Under AYUSH ministry guidelines, many health insurance policies in India now cover in-patient Ayurvedic treatments (like Panchakarma) conducted at government-recognized hospitals or NABH-accredited wellness centers. Please check with your provider.'
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
        <span>Treatment FAQ</span>
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

export default TreatmentFAQ;
