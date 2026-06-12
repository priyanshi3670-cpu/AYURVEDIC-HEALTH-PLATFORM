import React from 'react';
import { Wind, Flame, Droplets, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const DoshaCard: React.FC = () => {
  const doshas = [
    {
      name: 'Vata (Air + Ether)',
      description: 'The energy of movement. Controls breathing, pulse, muscle movements, and tissue cells activity.',
      characteristics: 'Light, dry, cold, rough, mobile, and subtle.',
      strengths: ['Creative and artistic', 'Quick learner & communicative', 'Enthusiastic and active'],
      challenges: ['Prone to anxiety & worry', 'Dry skin and cold limbs', 'Irregular sleep and digestion'],
      icon: Wind,
      color: 'from-sky-500/10 to-indigo-500/10 border-sky-500/20 text-sky-700 hover:border-sky-500/40 bg-sky-500/5',
      iconBg: 'bg-sky-500/20 text-sky-700'
    },
    {
      name: 'Pitta (Fire + Water)',
      description: 'The energy of digestion and metabolism. Controls biochemical transformation, temperature, and intellect.',
      characteristics: 'Hot, sharp, light, oily, spreading, and liquid.',
      strengths: ['Intelligent and highly focused', 'Strong leadership skills', 'Robust appetite & metabolic fire'],
      challenges: ['Easily angered & irritable', 'Prone to acid reflux & rashes', 'Inflammatory tendencies'],
      icon: Flame,
      color: 'from-amber-500/10 to-orange-500/10 border-orange-500/20 text-orange-700 hover:border-orange-500/40 bg-orange-500/5',
      iconBg: 'bg-orange-500/20 text-orange-700'
    },
    {
      name: 'Kapha (Water + Earth)',
      description: 'The energy of structure and lubrication. Forms physical body framework and cushions joints.',
      characteristics: 'Heavy, slow, cool, oily, smooth, dense, and soft.',
      strengths: ['Calm, patient, and loving', 'Strong immune defense', 'Excellent memory and physical power'],
      challenges: ['Prone to weight gain & lethargy', 'Respiratory mucus congestion', 'Possessive or stubborn mood patterns'],
      icon: Droplets,
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-700 hover:border-emerald-500/40 bg-emerald-500/5',
      iconBg: 'bg-emerald-500/20 text-emerald-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {doshas.map((d, index) => {
        const Icon = d.icon;
        return (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{ y: -3 }}
            className={`bg-white border rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${d.color}`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-black text-base md:text-lg text-text-primary">{d.name}</h3>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner ${d.iconBg}`}>
                  <Icon className="w-5 h-5 animate-pulse" />
                </div>
              </div>
              
              <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                {d.description}
              </p>
              
              <div className="bg-white/40 p-3.5 rounded-xl border border-current/5 space-y-1">
                <span className="text-[9px] uppercase font-black tracking-wider block opacity-75">Nature/Gunas:</span>
                <p className="text-xs text-text-primary font-bold">{d.characteristics}</p>
              </div>

              {/* Strengths list */}
              <div className="space-y-2 pt-2">
                <span className="text-[9px] uppercase font-black tracking-wider block opacity-75">Strengths</span>
                <ul className="space-y-1.5 text-xs text-text-primary font-semibold">
                  {d.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges list */}
              <div className="space-y-2 pt-2">
                <span className="text-[9px] uppercase font-black tracking-wider block opacity-75">Imbalance Risks</span>
                <ul className="space-y-1.5 text-xs text-text-primary font-semibold">
                  {d.challenges.map((chal, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{chal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DoshaCard;
