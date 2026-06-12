import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../types';
import { X, Sparkles, AlertCircle } from 'lucide-react';

interface DietGeneratorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profile: Omit<UserProfile, 'id'>) => void;
  initialProfile: UserProfile | null;
}

const DOSHA_TYPES = ['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha', 'Tridoshic'];
const HEALTH_GOALS_LIST = [
  'Weight Loss',
  'Weight Management',
  'Hormonal Balance',
  'Metabolic Reset',
  'Muscle Gain',
  'Detoxification',
  'Stress Relief',
  'General Health'
];
const MEDICAL_CONDITIONS_LIST = [
  'PCOS',
  'Diabetes',
  'Hypertension',
  'Thyroid',
  'Acidity',
  'IBS',
  'Arthritis',
  'Asthma'
];
const DIET_PREFERENCES = ['Vegetarian', 'Vegan', 'Eggetarian', 'Non-Vegetarian', 'Pescatarian'];

export const DietGeneratorForm: React.FC<DietGeneratorFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialProfile
}) => {
  const [name, setName] = useState('Priyanshi Sharma');
  const [age, setAge] = useState(24);
  const [gender, setGender] = useState('Female');
  const [weight, setWeight] = useState(62);
  const [height, setHeight] = useState(165);
  const [activityLevel, setActivityLevel] = useState('Moderate');
  const [doshaType, setDoshaType] = useState('Pitta');
  const [healthGoals, setHealthGoals] = useState<string[]>(['Hormonal Balance']);
  const [medicalConditions, setMedicalConditions] = useState<string[]>(['PCOS']);
  const [dietPreference, setDietPreference] = useState('Vegetarian');
  
  const [activeTab, setActiveTab] = useState<'basics' | 'ayurveda' | 'goals'>('basics');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialProfile) {
      setName(initialProfile.name || 'Priyanshi Sharma');
      setAge(initialProfile.age || 24);
      setGender(initialProfile.gender || 'Female');
      setWeight(initialProfile.weight || 62);
      setHeight(initialProfile.height || 165);
      setActivityLevel(initialProfile.activityLevel || 'Moderate');
      setDoshaType(initialProfile.doshaType || 'Pitta');
      setHealthGoals(initialProfile.healthGoals || []);
      setMedicalConditions(initialProfile.medicalConditions || []);
      setDietPreference(initialProfile.dietPreference || 'Vegetarian');
    }
  }, [initialProfile, isOpen]);

  if (!isOpen) return null;

  const handleGoalToggle = (goal: string) => {
    setHealthGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleConditionToggle = (cond: string) => {
    setMedicalConditions(prev =>
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name');
      setActiveTab('basics');
      return;
    }
    if (age <= 0 || weight <= 0 || height <= 0) {
      setErrorMsg('Please enter valid physical measurements');
      setActiveTab('basics');
      return;
    }
    setErrorMsg('');
    onSubmit({
      name,
      age,
      gender,
      weight,
      height,
      activityLevel,
      doshaType,
      healthGoals,
      medicalConditions,
      dietPreference
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-emerald-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-primary text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">Ayurvedic Diet Generator</h3>
              <p className="text-xs text-white/80 mt-0.5">Customize your Pathya Ahara (healing nutrition plan)</p>
            </div>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-emerald-50 px-6 py-2 bg-emerald-50/20">
          <button
            type="button"
            onClick={() => setActiveTab('basics')}
            className={`flex-1 py-2 text-xs font-bold transition-all border-b-2 text-center cursor-pointer ${
              activeTab === 'basics'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            1. Personal Info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ayurveda')}
            className={`flex-1 py-2 text-xs font-bold transition-all border-b-2 text-center cursor-pointer ${
              activeTab === 'ayurveda'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            2. Ayurvedic Parameters
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('goals')}
            className={`flex-1 py-2 text-xs font-bold transition-all border-b-2 text-center cursor-pointer ${
              activeTab === 'goals'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            3. Goals & Health
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMsg && (
            <div className="bg-red-50 text-red-700 text-xs p-3.5 rounded-xl border border-red-100 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Tab 1: Basics */}
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-emerald-50/30 border border-emerald-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-xs outline-none transition-all font-semibold"
                  placeholder="Enter patient full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={age}
                    onChange={e => setAge(Number(e.target.value))}
                    className="w-full bg-emerald-50/30 border border-emerald-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-xs outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="w-full bg-emerald-50/30 border border-emerald-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-xs outline-none font-semibold cursor-pointer"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={weight}
                    onChange={e => setWeight(Number(e.target.value))}
                    className="w-full bg-emerald-50/30 border border-emerald-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-xs outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Height (cm)</label>
                  <input
                    type="number"
                    min="50"
                    required
                    value={height}
                    onChange={e => setHeight(Number(e.target.value))}
                    className="w-full bg-emerald-50/30 border border-emerald-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-xs outline-none font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Activity Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Sedentary', 'Moderate', 'Active'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setActivityLevel(level)}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        activityLevel === level
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm'
                          : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-gray-500'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Ayurveda */}
          {activeTab === 'ayurveda' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                  Body Constitution (Dominant Dosha)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DOSHA_TYPES.map(dosha => (
                    <button
                      key={dosha}
                      type="button"
                      onClick={() => setDoshaType(dosha)}
                      className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        doshaType === dosha
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm'
                          : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-gray-500'
                      }`}
                    >
                      {dosha}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-2">
                  Note: If you don't know your Dosha, take our AI Dosha Assessment or select a dominant one based on physical frame.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Dietary Preference</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DIET_PREFERENCES.map(pref => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setDietPreference(pref)}
                      className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        dietPreference === pref
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm'
                          : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-gray-500'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Goals */}
          {activeTab === 'goals' && (
            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-2">
                  Select Health Goals (Multi-select)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {HEALTH_GOALS_LIST.map(goal => {
                    const isSelected = healthGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => handleGoalToggle(goal)}
                        className={`py-2.5 px-3.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex justify-between items-center ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                            : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-gray-500'
                        }`}
                      >
                        <span>{goal}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-2">
                  Current Medical Conditions (Multi-select)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MEDICAL_CONDITIONS_LIST.map(cond => {
                    const isSelected = medicalConditions.includes(cond);
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => handleConditionToggle(cond)}
                        className={`py-2.5 px-3.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex justify-between items-center ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                            : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-gray-500'
                        }`}
                      >
                        <span>{cond}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="border-t border-emerald-50 p-6 flex justify-between items-center bg-emerald-50/10">
          <div>
            {activeTab !== 'basics' && (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'goals') setActiveTab('ayurveda');
                  else if (activeTab === 'ayurveda') setActiveTab('basics');
                }}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-all cursor-pointer"
              >
                Back
              </button>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-gray-600 transition-all cursor-pointer font-bold"
            >
              Cancel
            </button>
            {activeTab !== 'goals' ? (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'basics') setActiveTab('ayurveda');
                  else if (activeTab === 'ayurveda') setActiveTab('goals');
                }}
                className="bg-primary hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-accent hover:bg-amber-600 text-primary font-black text-xs px-6 py-2.5 rounded-xl shadow-md uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <span>Compile Plan</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietGeneratorForm;
