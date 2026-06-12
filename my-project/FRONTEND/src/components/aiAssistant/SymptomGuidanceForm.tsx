import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiAlertCircle, FiCheckCircle, FiUser } from 'react-icons/fi';
import { AISymptomAnalysis } from '../../types';

interface SymptomGuidanceFormProps {
  onAnalyze?: (result: AISymptomAnalysis) => void;
}

const MOCK_SYMPTOM_RESPONSES: Record<string, AISymptomAnalysis> = {
  default: {
    id: 'sa-1',
    symptoms: [],
    possibleInsights: [
      'Based on Ayurvedic principles, your symptoms may indicate a Dosha imbalance.',
      'Digestive fire (Agni) assessment is recommended.',
      'Consider Dinacharya (daily routine) adjustments for better balance.',
    ],
    lifestyleSuggestions: [
      'Follow a regular sleep schedule (10 PM - 6 AM)',
      'Practice 15 minutes of Pranayama daily',
      'Drink warm water with ginger throughout the day',
      'Include Triphala in your evening routine',
    ],
    doctorConsultation: true,
    severity: 'Moderate',
  },
};

const SymptomGuidanceForm: React.FC<SymptomGuidanceFormProps> = ({ onAnalyze }) => {
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('Mild');
  const [ageGroup, setAgeGroup] = useState('25-35');
  const [result, setResult] = useState<AISymptomAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    // Simulate AI processing
    await new Promise(r => setTimeout(r, 1500));

    const analysis: AISymptomAnalysis = {
      ...MOCK_SYMPTOM_RESPONSES.default,
      id: `sa-${Date.now()}`,
      symptoms: symptoms.split(',').map(s => s.trim()),
      severity: severity as 'Low' | 'Moderate' | 'High',
    };

    setResult(analysis);
    setIsAnalyzing(false);
    onAnalyze?.(analysis);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <FiSearch className="w-4 h-4 text-[#2E7D32]" />
          <h3 className="font-serif text-lg font-bold text-gray-800">Symptom Guidance Tool</h3>
        </div>
        <p className="text-xs text-gray-400 mb-5">Describe your symptoms for Ayurvedic insights</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-1 block">Symptoms</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms (e.g., headache, fatigue, bloating...)"
              className="w-full bg-[#F8FFF8] border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] resize-none h-20 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#F8FFF8] border border-emerald-100 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 cursor-pointer"
              >
                <option value="">Select</option>
                <option value="1-3 days">1-3 days</option>
                <option value="1 week">1 week</option>
                <option value="2+ weeks">2+ weeks</option>
                <option value="1+ month">1+ month</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-[#F8FFF8] border border-emerald-100 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 cursor-pointer"
              >
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Age Group</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full bg-[#F8FFF8] border border-emerald-100 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 cursor-pointer"
              >
                <option value="18-24">18-24</option>
                <option value="25-35">25-35</option>
                <option value="36-50">36-50</option>
                <option value="50+">50+</option>
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isAnalyzing || !symptoms.trim()}
            className="w-full bg-[#2E7D32] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                Analyzing...
              </>
            ) : (
              <>
                <FiSearch className="w-4 h-4" />
                Get Guidance
              </>
            )}
          </motion.button>
        </form>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 space-y-4"
            >
              {/* Severity Badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                result.severity === 'Low' ? 'bg-green-100 text-green-700' :
                result.severity === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                <FiAlertCircle className="w-3 h-3" />
                {result.severity} Severity
              </div>

              {/* Insights */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="text-xs font-bold text-blue-800 mb-2">Possible Ayurveda Insights</h4>
                <ul className="space-y-1.5">
                  {result.possibleInsights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-blue-700">
                      <FiCheckCircle className="w-3 h-3 mt-0.5 shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lifestyle Suggestions */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <h4 className="text-xs font-bold text-emerald-800 mb-2">Lifestyle Suggestions</h4>
                <ul className="space-y-1.5">
                  {result.lifestyleSuggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-emerald-700">
                      <span className="text-[#D4AF37] mt-0.5 shrink-0">✦</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Doctor Consultation */}
              {result.doctorConsultation && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <FiUser className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-800 mb-1">Doctor Consultation Recommended</h4>
                    <p className="text-[10px] text-amber-700">Based on your symptoms, we recommend consulting an Ayurvedic practitioner for personalized assessment.</p>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-[10px] text-gray-500 italic text-center">
                  ⚠️ This information is educational and not a medical diagnosis. Always consult a qualified healthcare professional.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SymptomGuidanceForm;
