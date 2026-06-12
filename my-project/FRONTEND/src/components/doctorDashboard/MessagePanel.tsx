import React from 'react';

const MessagePanel: React.FC = () => {
  const messages = [
    { name: 'Rahul Verma', preview: 'Doctor, the pain in my knee is...', time: '10:30 AM', unread: 2 },
    { name: 'Priyanshi Sharma', preview: 'Can I change my diet plan?', time: 'Yesterday', unread: 0 },
    { name: 'Vikram Joshi', preview: 'Thank you for the advice.', time: 'Monday', unread: 0 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">Patient Messages</h3>
        <button className="text-primary text-sm font-medium hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                {msg.name.charAt(0)}
              </div>
              {msg.unread > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                  {msg.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h4 className={`text-sm truncate ${msg.unread > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                  {msg.name}
                </h4>
                <span className="text-[10px] text-gray-400">{msg.time}</span>
              </div>
              <p className={`text-xs truncate ${msg.unread > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                {msg.preview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagePanel;
