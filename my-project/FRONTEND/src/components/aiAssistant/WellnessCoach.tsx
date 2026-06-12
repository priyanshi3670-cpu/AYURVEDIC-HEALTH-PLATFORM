import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AIWellnessTask } from '../../types';
import { FiCheck, FiCircle } from 'react-icons/fi';

interface WellnessCoachProps {
  tasks: AIWellnessTask[];
}

const WellnessCoach: React.FC<WellnessCoachProps> = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-gray-800">AI Wellness Coach</h3>
          <p className="text-xs text-gray-400">Daily Ayurvedic wellness tasks</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-[#2E7D32]">{progress}%</span>
          <p className="text-[10px] text-gray-400">{completedCount}/{tasks.length} done</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-emerald-100 rounded-full mb-5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-[#2E7D32] to-[#81C784] rounded-full"
        />
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <motion.button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
              task.completed
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-white border-gray-100 hover:border-emerald-200 hover:bg-[#F8FFF8]'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
              task.completed ? 'bg-[#2E7D32] text-white' : 'border-2 border-gray-300'
            }`}>
              {task.completed ? <FiCheck className="w-3 h-3" /> : <FiCircle className="w-3 h-3 text-transparent" />}
            </div>
            <span className="text-lg shrink-0">{task.icon}</span>
            <div className="flex-grow text-left">
              <span className={`text-xs font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {task.task}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 shrink-0">{task.time}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default WellnessCoach;
