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
import { Activity, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricPoint {
  name: string;
  progress: number;
  target: number;
}

interface RecoveryChartProps {
  weeklyData: MetricPoint[];
  monthlyData: MetricPoint[];
  condition: string;
}

export const RecoveryChart: React.FC<RecoveryChartProps> = ({
  weeklyData,
  monthlyData,
  condition
}) => {
  const [chartMode, setChartMode] = useState<'weekly' | 'monthly'>('weekly');

  const activeData = chartMode === 'weekly' ? weeklyData : monthlyData;

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Activity className="w-5 h-5 text-accent animate-pulse" />
          </div>
          <div>
            <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Dynamic outcome tracking</span>
            <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Recovery & Treatment Progress</h3>
          </div>
        </div>

        {/* Chart Toggle */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-1 rounded-xl flex items-center self-start text-[10px] font-black uppercase tracking-wider">
          <button
            onClick={() => setChartMode('weekly')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              chartMode === 'weekly' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            Weekly Logs
          </button>
          <button
            onClick={() => setChartMode('monthly')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              chartMode === 'monthly' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            Monthly Summary
          </button>
        </div>
      </div>

      {/* Metric Info */}
      <div className="bg-[#F8FFF8] border border-primary/10 p-4 rounded-2xl flex items-center justify-between text-xs max-w-md">
        <div>
          <span className="text-[8.5px] uppercase font-bold text-text-secondary block">Monitored Pathway</span>
          <strong className="text-primary text-[13px]">{condition}</strong>
        </div>
        <div className="text-right flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-left leading-tight">
            <span className="text-[8.5px] uppercase font-bold text-text-secondary block">Current Index</span>
            <strong className="text-primary font-black text-sm">72% Completed</strong>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={activeData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
              axisLine={{ stroke: '#E2E8F0' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
              axisLine={{ stroke: '#E2E8F0' }}
              tickLine={false}
              unit="%"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #E2E8F0', 
                borderRadius: '16px',
                fontSize: '11px',
                fontWeight: 600,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
              }} 
            />
            <Legend 
              wrapperStyle={{ fontSize: '10.5px', fontWeight: 700, paddingTop: '10px' }}
              iconType="circle"
            />
            <Area 
              type="monotone" 
              name="My Progress"
              dataKey="progress" 
              stroke="#2E7D32" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorProgress)" 
            />
            <Area 
              type="monotone" 
              name="Milestone Target"
              dataKey="target" 
              stroke="#D4AF37" 
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1} 
              fill="url(#colorTarget)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default RecoveryChart;
