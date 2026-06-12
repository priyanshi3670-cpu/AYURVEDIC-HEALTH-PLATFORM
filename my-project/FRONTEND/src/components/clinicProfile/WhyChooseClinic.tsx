import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Building, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    title: 'Verified Facility',
    description: '100% certified by National Ayurvedic boards, maintaining premium hospital hygiene and safety protocols.',
    icon: ShieldCheck,
    color: 'from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-500/20'
  },
  {
    id: 2,
    title: 'Experienced Doctors',
    description: 'Consultations with certified BAMS/MD Vaidyas with over 15+ years of clinical pulse-diagnosis expertise.',
    icon: Award,
    color: 'from-amber-500/10 to-yellow-500/10 text-amber-700 border-amber-500/20'
  },
  {
    id: 3,
    title: 'Personalized Care',
    description: 'Custom Prakriti (dosha) analyses shaping individual diet, lifestyle, and organic herbal drug schedules.',
    icon: HeartHandshake,
    color: 'from-rose-500/10 to-pink-500/10 text-rose-700 border-rose-500/20'
  },
  {
    id: 4,
    title: 'Modern Infrastructure',
    description: 'Luxury wooden Droni tables, steam chambers, herbal gardens, and fully equipped private recovery suites.',
    icon: Building,
    color: 'from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-500/20'
  },
  {
    id: 5,
    title: 'Trusted Treatments',
    description: 'Time-tested remedies backed by clinical outcome trackers, offering high recovery ratios for chronic diseases.',
    icon: Sparkles,
    color: 'from-purple-500/10 to-indigo-500/10 text-purple-700 border-purple-500/20'
  }
];

export const WhyChooseClinic: React.FC = () => {
  return (
    <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-emerald-800/5">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-accent uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-amber-500/10">
          The Connect Standard
        </span>
        <h2 className="font-serif text-3xl font-black text-text-primary leading-tight">
          Why Choose This Center?
        </h2>
        <p className="text-xs text-text-secondary mt-3 leading-relaxed">
          Experience classical Ayurvedic wellness integrated with premium customer experience standards, certified physicians, and clinical outcome metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#F8FFF8]/40 border border-emerald-950/5 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 shadow-sm hover:shadow-md hover:bg-white"
            >
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 border shadow-sm`}>
                <IconComponent className="w-7 h-7" />
              </div>

              {/* Text */}
              <h3 className="font-serif font-bold text-base text-text-primary mb-2.5">
                {feature.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseClinic;
