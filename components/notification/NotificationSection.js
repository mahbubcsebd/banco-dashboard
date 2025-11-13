'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Gift, Info } from 'lucide-react';
import { useState } from 'react';

// Import Modal
import NotificationDetailsModal from './NotificationDetailsModal';

const NotificationSection = ({ section }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleMessageClick = (message) => {
    setSelectedMessage({
      ...message,
      title: section.title.split(' - ')[0], // Use the section title as the message title
    });
    setIsModalOpen(true);
  };

  const getSectionIcon = (title) => {
    if (title.includes('Alert'))
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    if (title.includes('Promotion'))
      return <Gift className="w-5 h-5 text-green-500" />;
    if (title.includes('Reminder'))
      return <Clock className="w-5 h-5 text-blue-500" />;
    return <Info className="w-5 h-5 text-gray-500" />;
  };

  // Determine the status color for the main section title (based on content)
  const titleColor = section.title.includes('Alert')
    ? 'text-red-600'
    : 'text-blue-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {/* Modal for Details */}
      <NotificationDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        messageData={selectedMessage}
      />

      {/* Section Header (e.g., Alert Notifications) */}
      <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
        {getSectionIcon(section.title)}
        <h3
          className={`text-lg font-semibold ${titleColor} hover:underline cursor-pointer`}
        >
          {section.title}
        </h3>
      </div>

      {/* Message List (Responsive and Styled) */}
      <div className="pl-6 space-y-2">
        {section.messages.length === 0 ? (
          <div className="text-gray-500 text-sm italic py-2">
            No messages found in this category.
          </div>
        ) : (
          section.messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => handleMessageClick(message)}
              // Improved Card Design
              className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-white text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {/* Message Content (Truncated) */}
              <div className="flex-1 truncate pr-4">
                <p className="text-sm font-medium truncate">
                  {message.content}
                </p>
              </div>

              {/* Date */}
              <div className="text-xs text-gray-400 shrink-0">
                {message.date}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default NotificationSection;
