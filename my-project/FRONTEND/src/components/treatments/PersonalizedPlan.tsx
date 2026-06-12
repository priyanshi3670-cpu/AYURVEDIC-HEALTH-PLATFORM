import React, { useState } from 'react';
import { Sparkles, Clipboard, CheckCircle2, RotateCcw, Loader2 } from 'lucide-react';
import { PersonalizedPlan as PlanType, Treatment } from '../../types';
import treatmentDetailsApi from '../../services/treatmentDetailsApi';

interface PersonalizedPlanProps {
  treatment: Treatment;
}

export const PersonalizedPlan: React.FC<PersonalizedPlanProps> = ({ treatment }) => {
  const [age, setAge] = useState<number>(30);
  const [goal, setGoal] = useState<string>('Digestive Rejuvenation & Detox');
  const [dosha, setDosha] = useState<string>('Vata');
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [isDemoNotice, setIsDemoNotice] = useState<boolean>(false);

  const goalOptions = [
    'Digestive Rejuvenation & Detox',
    'Stress Relief & Calm Mind',
    'Chronic Joint Lubrication',
    'Skin Clearing & Blood Purifying',
    'Metabolic Boost & Weight Management'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPlan(null);
    try {
      const res = await treatmentDetailsApi.getPersonalizedPlan(treatment.id, age, goal, dosha);
      setPlan(res.data);
      setIsDemoNotice(res.isFallback);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setAge(30);
    setGoal('Digestive Rejuvenation & Detox');
    setDosha('Vata');
  };

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">AI Compounding</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Personalized Treatment Plan System</h3>
        <p className="text-xs text-text-secondary leading-relaxed max-w-xl">
          Enter your specific details to compile a customized healing chart combining recommended diet, daily lifestyle rules, and recovery benchmarks.
        </p>
      </div>

      {!plan ? (
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-[#FAF9F6] p-5 rounded-2xl border border-primary/5">
          {/* Age input */}
          <div className="space-y-1.5 text-xs">
            <label className="text-[9px] uppercase font-bold text-text-secondary">Patient Age</label>
            <input
              type="number"
              min="12"
              max="99"
              required
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 30)}
              className="w-full bg-white border border-[#2E7D32]/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary font-semibold text-text-primary"
            />
          </div>

          {/* Goal Select */}
          <div className="space-y-1.5 text-xs">
            <label className="text-[9px] uppercase font-bold text-text-secondary">Health Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-white border border-[#2E7D32]/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary font-semibold text-text-primary"
            >
              {goalOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Dosha Select */}
          <div className="space-y-1.5 text-xs">
            <label className="text-[9px] uppercase font-bold text-text-secondary">Dosha Constitution</label>
            <select
              value={dosha}
              onChange={(e) => setDosha(e.target.value)}
              className="w-full bg-white border border-[#2E7D32]/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary font-semibold text-text-primary"
            >
              <option value="Vata">Vata (Air & Space)</option>
              <option value="Pitta">Pitta (Fire & Water)</option>
              <option value="Kapha">Kapha (Earth & Water)</option>
            </select>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-light text-white font-bold text-[11px] py-2.5 px-4 rounded-xl shadow-md transition-colors uppercase tracking-widest flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-75"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                  <span>Generate Plan</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6 animate-fade-in-up">
          {/* Plan Receipt Layout */}
          <div className="bg-[#FAF9F6] border border-[#2E7D32]/10 p-6 rounded-3xl relative overflow-hidden space-y-6">
            {/* Corner leaf decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#2E7D32]/5 rounded-bl-full flex items-center justify-center text-primary/10">
              <Clipboard className="w-10 h-10" />
            </div>

            <div className="border-b border-primary/10 pb-4 flex flex-col sm:flex-row justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-[8px] font-bold text-accent uppercase tracking-widest block">Clinical Report Reference</span>
                <h4 className="font-serif text-sm font-bold text-primary">Custom Holistic Wellness Guideline</h4>
              </div>
              <div className="text-right sm:text-[10px] text-text-secondary font-bold space-y-0.5">
                <div>Patient Age: <span className="text-primary font-black">{plan.patientAge} Years</span></div>
                <div>Imbalance Profile: <span className="text-primary font-black">{plan.doshaType} Doshic dominance</span></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Diet Column */}
              <div className="space-y-3 bg-white p-4.5 rounded-2xl border border-primary/5">
                <h5 className="font-serif text-xs font-bold text-primary border-b border-gray-50 pb-1.5 uppercase tracking-wide">
                  Suggested Diet (Ahar)
                </h5>
                <ul className="space-y-2 text-text-primary">
                  {plan.suggestedDiet.map((item, i) => (
                    <li key={i} className="flex space-x-2 items-start font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-[11px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lifestyle Column */}
              <div className="space-y-3 bg-white p-4.5 rounded-2xl border border-primary/5">
                <h5 className="font-serif text-xs font-bold text-primary border-b border-gray-50 pb-1.5 uppercase tracking-wide">
                  Lifestyle Rules (Vihar)
                </h5>
                <ul className="space-y-2 text-text-primary">
                  {plan.suggestedLifestyle.map((item, i) => (
                    <li key={i} className="flex space-x-2 items-start font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-[11px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom info section */}
            <div className="pt-4 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <div className="text-[10px] text-text-secondary font-bold">
                Therapy Target: <span className="text-primary font-black">{plan.suggestedTherapy}</span>
              </div>
              <div className="text-[10px] text-text-secondary font-bold">
                Expected Healing Scale: <span className="text-primary font-black">{plan.expectedTimeline}</span>
              </div>
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex justify-end space-x-3 text-xs">
            <button
              onClick={handleReset}
              className="border border-[#2E7D32]/20 hover:bg-primary/5 text-primary font-bold text-[10px] py-2.5 px-4 rounded-xl transition-colors uppercase tracking-widest flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Configuration</span>
            </button>
          </div>

          {isDemoNotice && (
            <p className="text-[9px] text-text-secondary italic text-center">
              🍃 Using secure offline plan compilation due to endpoint unavailability.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default PersonalizedPlan;
