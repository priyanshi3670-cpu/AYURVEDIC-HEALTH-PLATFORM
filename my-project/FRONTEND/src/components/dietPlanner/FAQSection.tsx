import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'What is digestive fire (Agni) and why is it so important?',
    a: 'Agni is the biological fire that governs digestion, metabolism, and assimilation. When Agni is strong, foods are completely digested into nutrients (Ojas). If Agni is weak or erratic, undigested food ferments into a toxic sticky substance called Ama, which is the root cause of physical disorders.'
  },
  {
    q: 'Why are raw salads and cold smoothies discouraged for Vata dominant profiles?',
    a: 'Vata constitution is naturally light, dry, cold, and mobile. Raw vegetables are also cold and dry, which aggravates Vata, leading to bloating, dry skin, gas, and anxious energy. Warm, cooked, well-spiced foods with healthy fats (ghee) help ground Vata.'
  },
  {
    q: 'What is Viruddha Ahara (incompatible food combinations)?',
    a: 'In Ayurveda, certain foods should not be eaten together because they disrupt stomach enzymes. Major examples include: milk with fish, milk with sour fruits (melons or bananas), cold water immediately after hot tea, and honey cooked at high temperatures (which renders honey toxic).'
  },
  {
    q: 'How should water be consumed relative to meals?',
    a: 'Avoid drinking large amounts of cold water before or after meals. Small sips of lukewarm water during meals is optimal as it moistens food. Drinking cold water before a meal dilutes gastric juices; drinking it immediately after slows down metabolism.'
  },
  {
    q: 'Is organic Ghee healthy to eat daily?',
    a: 'Yes, in moderation. Ghee (clarified butter) is highly praised in Ayurvedic texts. It directly feeds the digestive fire (Agni), lubricates joint capsules, supports memory (Sadhaka Pitta), and acts as a carrier (Anupana) for fat-soluble vitamins deep into cells.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleOpen = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-serif font-bold text-gray-800">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Understand the core science of Ayurvedic Nutrition & Ahara
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-emerald-50 rounded-2xl overflow-hidden transition-all bg-emerald-50/10"
            >
              <button
                onClick={() => toggleOpen(idx)}
                className="w-full flex justify-between items-center p-4 text-left font-bold text-xs text-gray-750 hover:bg-emerald-50/35 transition-all outline-none cursor-pointer"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />
                )}
              </button>
              
              {isOpen && (
                <div className="p-4 pt-0 text-xs text-gray-500 leading-relaxed font-medium bg-white border-t border-emerald-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
