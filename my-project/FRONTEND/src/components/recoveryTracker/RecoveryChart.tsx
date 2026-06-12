import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Activity, Star } from 'lucide-react';

interface ProgressPoint {
  week: string;
  progressPercentage: number;
  healthScore: number;
  energyLevel: number;
  sleepQuality: number;
  stressLevel: number;
}

interface RecoveryChartProps {
  progressPoints: ProgressPoint[];
}

export const RecoveryChart: React.FC<RecoveryChartProps> = ({ progressPoints }) => {
  const [metric, setMetric] = useState<'progress' | 'metrics'>('progress');

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Activity className="w-5 h-5 text-accent animate-pulse" />
          </div>
          <div>
            <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">healing progression index</span>
            <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Biometric Health Chart</h3>
          </div>
        </div>

        {/* Metric selection toggle */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-1 rounded-xl flex items-center self-start text-[10px] font-black uppercase tracking-wider">
          <button
            onClick={() => setMetric('progress')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              metric === 'progress' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            Detox Progression
          </button>
          <button
            onClick={() => setMetric('metrics')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              metric === 'metrics' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            Vitality Metrics
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {metric === 'progress' ? (
            <AreaChart data={progressPoints} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProgressPage10" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorHealthPage10" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="week" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '16px', fontSize: '11px', fontWeight: 600 }} />
              <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 700, paddingTop: '10px' }} iconType="circle" />
              <Area type="monotone" name="Recovery %" dataKey="progressPercentage" stroke="#2E7D32" strokeWidth={3} fillOpacity={1} fill="url(#colorProgressPage10)" />
              <Area type="monotone" name="Health Score" dataKey="healthScore" stroke="#D4AF37" strokeWidth={2} strokeDasharray="3 3" fillOpacity={1} fill="url(#colorHealthPage10)" />
            </AreaChart>
          ) : (
            <LineChart data={progressPoints} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="week" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '16px', fontSize: '11px', fontWeight: 600 }} />
              <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 700, paddingTop: '10px' }} iconType="circle" />
              <Line type="monotone" name="Energy (Ojas)" dataKey="energyLevel" stroke="#F59E0B" strokeWidth={3.5} dot={{ r: 4 }} />
              <Line type="monotone" name="Sleep (Nidra)" dataKey="sleepQuality" stroke="#3F51B5" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" name="Stress Calmness" dataKey="stressLevel" stroke="#EF4444" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default RecoveryChart;
