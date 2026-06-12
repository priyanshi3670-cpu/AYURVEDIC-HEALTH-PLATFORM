import React, { useState } from 'react';
import { Apple, Flame, Moon, Droplets, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { WellnessMetric } from '../../types';

interface WellnessCardProps {
  metrics: WellnessMetric;
  onUpdateMetrics: (updated: WellnessMetric) => void;
}

export const WellnessCard: React.FC<WellnessCardProps> = ({
  metrics,
  onUpdateMetrics
}) => {
  const [waterGlasses, setWaterGlasses] = useState(6); // default 6 glasses (1.5L)
  const [sleepTime, setSleepTime] = useState(7.5); // default 7.5 hours
  const [loggedWorkout, setLoggedWorkout] = useState(false);
  const [dietLoggedToday, setDietLoggedToday] = useState(false);

  const handleLogWater = () => {
    if (waterGlasses < 12) {
      const newGlasses = waterGlasses + 1;
      setWaterGlasses(newGlasses);
      // Update water intake metric percentage (target is 10 glasses = 100%)
      const percentage = Math.min(Math.round((newGlasses / 10) * 100), 100);
      onUpdateMetrics({ ...metrics, waterIntake: percentage });
    }
  };

  const handleToggleWorkout = () => {
    setLoggedWorkout(!loggedWorkout);
    onUpdateMetrics({
      ...metrics,
      exerciseProgress: !loggedWorkout ? 100 : 80 // simulate increase to 100% on check
    });
  };

  const handleToggleDiet = () => {
    setDietLoggedToday(!dietLoggedToday);
    onUpdateMetrics({
      ...metrics,
      dietAdherence: !dietLoggedToday ? 95 : 85
    });
  };

  const pillars = [
    {
      id: 'diet',
      name: 'Diet Adherence',
      value: `${metrics.dietAdherence}%`,
      subText: dietLoggedToday ? 'All meals logged today' : 'Log your Pitta diet plan',
      progress: metrics.dietAdherence,
      icon: Apple,
      color: 'from-emerald-500/10 to-emerald-600/10 text-emerald-700 border-emerald-500/20',
      action: (
        <button
          onClick={handleToggleDiet}
          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
            dietLoggedToday 
              ? 'bg-emerald-600 border-transparent text-white' 
              : 'bg-white hover:bg-emerald-50 text-emerald-600 border-emerald-600/20'
          }`}
        >
          {dietLoggedToday ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      )
    },
    {
      id: 'exercise',
      name: 'Vedic Exercise (Yoga)',
      value: `${metrics.exerciseProgress}%`,
      subText: loggedWorkout ? 'Pranayama & Surya Namaskar done' : 'Log 30m daily routine',
      progress: metrics.exerciseProgress,
      icon: Flame,
      color: 'from-orange-500/10 to-orange-600/10 text-orange-700 border-orange-500/20',
      action: (
        <button
          onClick={handleToggleWorkout}
          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
            loggedWorkout 
              ? 'bg-orange-600 border-transparent text-white' 
              : 'bg-white hover:bg-orange-50 text-orange-600 border-orange-600/20'
          }`}
        >
          {loggedWorkout ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      )
    },
    {
      id: 'sleep',
      name: 'Sleep Quality',
      value: `${sleepTime} hrs`,
      subText: 'Target: 8 hours restorative sleep',
      progress: Math.min((sleepTime / 8) * 100, 100),
      icon: Moon,
      color: 'from-indigo-500/10 to-indigo-600/10 text-indigo-700 border-indigo-500/20',
      action: (
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => {
              const val = Math.max(sleepTime - 0.5, 4);
              setSleepTime(val);
              onUpdateMetrics({ ...metrics, sleepQuality: Math.round((val / 8) * 100) });
            }}
            className="w-5 h-5 bg-white border border-indigo-200 rounded text-indigo-700 flex items-center justify-center text-[10px] font-black cursor-pointer hover:bg-indigo-50 select-none"
          >
            -
          </button>
          <button 
            onClick={() => {
              const val = Math.min(sleepTime + 0.5, 12);
              setSleepTime(val);
              onUpdateMetrics({ ...metrics, sleepQuality: Math.round((val / 8) * 100) });
            }}
            className="w-5 h-5 bg-white border border-indigo-200 rounded text-indigo-700 flex items-center justify-center text-[10px] font-black cursor-pointer hover:bg-indigo-50 select-none"
          >
            +
          </button>
        </div>
      )
    },
    {
      id: 'water',
      name: 'Water Intake',
      value: `${(waterGlasses * 250) / 1000} L`,
      subText: `${waterGlasses} of 10 glasses logged`,
      progress: metrics.waterIntake,
      icon: Droplets,
      color: 'from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-500/20',
      action: (
        <button
          onClick={handleLogWater}
          className="p-1.5 bg-white border border-blue-600/20 hover:bg-blue-50 text-blue-600 rounded-lg transition-all cursor-pointer flex items-center space-x-0.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[8px] font-black uppercase">250ml</span>
        </button>
      )
    }
  ];

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Wellness summary</span>
        <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Daily Habits & Vitality Mappings</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Log habits below to calculate your daily Ayurvedic wellness index.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#FAF9F6] border border-primary/5 rounded-2xl p-4 flex flex-col justify-between h-44 shadow-sm"
            >
              {/* Header block */}
              <div className="flex items-start justify-between">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center border shadow-sm`}>
                  <IconComponent className="w-4.5 h-4.5" />
                </div>
                {item.action}
              </div>

              {/* Value and texts */}
              <div className="space-y-2">
                <div>
                  <h4 className="font-serif font-black text-text-primary text-xs leading-tight">
                    {item.name}
                  </h4>
                  <strong className="text-primary text-base font-black leading-none mt-1 block">
                    {item.value}
                  </strong>
                </div>

                {/* Progress slide */}
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-gray-200/60 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-[8.5px] text-text-secondary font-bold block truncate">
                    {item.subText}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WellnessCard;
