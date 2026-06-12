import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  condition: string;
  treatmentName: string;
  recoveryTime: string;
  text: string;
  rating: number;
  avatar: string;
}

export const SuccessStoryCard: React.FC = () => {
  const stories: Testimonial[] = [
    {
      id: 'story-1',
      name: 'Rohan Deshmukh',
      condition: 'Chronic Osteoarthritis',
      treatmentName: 'Basti (Panchakarma)',
      recoveryTime: '8 Weeks',
      text: 'For 5 years I had severe knee stiffness. After 14 days of medicated oil enemas (Basti), the deep lubricating effect was magical. I can walk stairs pain-free now!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80'
    },
    {
      id: 'story-2',
      name: 'Shreya Kapoor',
      condition: 'Hormonal PCOS & Severe Acne',
      treatmentName: 'PCOS Wellness Program',
      recoveryTime: '3 Months',
      text: 'I had irregular periods and cystic acne covering my face. Virechana blood cleansing and Shathavari herbs normalized my cycles naturally in 90 days. Highly recommend!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80'
    },
    {
      id: 'story-3',
      name: 'Arjun Sen',
      condition: 'Adrenal Burnout & Insomnia',
      treatmentName: 'Stress Management Program',
      recoveryTime: '4 Weeks',
      text: 'Chronic stress at work destroyed my sleep. Shirodhara oil stream pouring on my forehead calmed my mind on the very first day. My insomnia is completely cured.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80'
    }
  ];

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="bg-[#2E7D32]/5 text-primary border border-primary/10 text-[9px] font-bold py-1 px-3.5 rounded-full uppercase tracking-wider inline-block">
          Outcomes Registry
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Patient Success Stories</h2>
        <p className="text-xs text-text-secondary leading-relaxed">
          Read authentic recovery reports from patients who restored systemic balance through our customized programs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((item) => (
          <div
            key={item.id}
            className="bg-[#FAF9F6] border border-[#2E7D32]/5 p-6 rounded-3xl space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              {/* Stars & Condition */}
              <div className="flex justify-between items-center">
                <div className="flex">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-[9px] bg-[#2E7D32]/5 text-primary border border-primary/10 py-0.5 px-2.5 rounded-full uppercase font-bold tracking-wider">
                  {item.condition}
                </span>
              </div>

              {/* Quote text */}
              <p className="text-xs text-text-secondary leading-relaxed italic font-medium">
                "{item.text}"
              </p>
            </div>

            {/* Profile info footer */}
            <div className="flex items-center space-x-3 pt-3.5 border-t border-gray-100 mt-2 shrink-0">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-sm">
                <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-primary">{item.name}</h4>
                <p className="text-[10px] text-text-secondary font-medium">
                  Treated via <span className="text-accent font-bold">{item.treatmentName}</span> ({item.recoveryTime})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStoryCard;
