import React from 'react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { PieChart as PieIcon, BarChart3, ShieldAlert } from 'lucide-react';

interface DoshaChartsProps {
  vata: number;
  pitta: number;
  kapha: number;
}

export const DoshaCharts: React.FC<DoshaChartsProps> = ({ vata, pitta, kapha }) => {
  const pieData = [
    { name: 'Vata (Air/Ether)', value: vata, color: '#0EA5E9' },
    { name: 'Pitta (Fire/Water)', value: pitta, color: '#F97316' },
    { name: 'Kapha (Water/Earth)', value: kapha, color: '#10B981' }
  ];

  const barData = [
    { name: 'Vata', Percentage: vata, fill: '#0EA5E9' },
    { name: 'Pitta', Percentage: pitta, fill: '#F97316' },
    { name: 'Kapha', Percentage: kapha, fill: '#10B981' }
  ];

  // Radar chart representation based on attributes mapping
  const radarData = [
    { subject: 'Mobility & Motion', A: vata * 1.2, B: pitta * 0.7, fullMark: 100 },
    { subject: 'Heat & Metabolism', A: pitta * 1.3, B: kapha * 0.6, fullMark: 100 },
    { subject: 'Structure & Stamina', A: kapha * 1.2, B: vata * 0.5, fullMark: 100 },
    { subject: 'Mental Agility', A: vata * 1.1, B: pitta * 0.9, fullMark: 100 },
    { subject: 'Emotional Calm', A: kapha * 1.3, B: vata * 0.4, fullMark: 100 },
    { subject: 'Sensory Sharpness', A: pitta * 1.2, B: kapha * 0.8, fullMark: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Charts tabs or grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pie Chart container */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl flex flex-col justify-between h-80 shadow-sm">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-2.5 mb-2 shrink-0">
            <PieIcon className="w-4 h-4 text-primary" />
            <strong className="font-serif text-xs font-black uppercase text-text-primary tracking-wider">Bio-Energy Breakdown</strong>
          </div>
          <div className="flex-1 min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Composition']} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center percentage display */}
            <div className="absolute top-[48%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center leading-none">
              <strong className="text-text-primary text-xl font-serif font-black">{vata + pitta + kapha === 0 ? 0 : 100}%</strong>
              <span className="text-[7.5px] uppercase font-bold text-text-secondary block mt-1">Total Profile</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 shrink-0 text-[10px] font-bold text-text-secondary pt-2">
            {pieData.map((d, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span>{d.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart container */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl flex flex-col justify-between h-80 shadow-sm">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-2.5 mb-2 shrink-0">
            <BarChart3 className="w-4 h-4 text-primary" />
            <strong className="font-serif text-xs font-black uppercase text-text-primary tracking-wider">Dosha Intensity Levels</strong>
          </div>
          <div className="flex-grow min-h-0">
            <ResponsiveContainer width="100%" height="105%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#6B7280" fontSize={10} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#6B7280" fontSize={10} tickLine={false} />
                <Tooltip formatter={(value) => [`${value}%`]} />
                <Bar dataKey="Percentage" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart container */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl flex flex-col justify-between h-80 shadow-sm">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-2.5 mb-2 shrink-0">
            <ShieldAlert className="w-4 h-4 text-primary" />
            <strong className="font-serif text-xs font-black uppercase text-text-primary tracking-wider">Functional Constitution mapping</strong>
          </div>
          <div className="flex-grow min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" stroke="#6B7280" fontSize={8} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="#E2E8F0" />
                <Radar name="Active Attributes" dataKey="A" stroke="#2E7D32" fill="#2E7D32" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoshaCharts;
