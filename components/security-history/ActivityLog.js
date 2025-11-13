'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const ActivityLog = ({ data }) => {
  const [openDate, setOpenDate] = useState(data[0]?.date || '');

  const handleToggle = (date) => {
    setOpenDate((prev) => (prev === date ? '' : date));
  };

  const containerVariants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0, overflow: 'hidden' },
  };

  const formatTime = (time) => (time.length <= 5 ? time : time.split(' ')[0]);

  return (
    <div className="space-y-4">
      {data.map((day) => {
        const isOpen = openDate === day.date;
        const ActivityIcon = isOpen ? ChevronDown : ChevronRight;

        return (
          <div
            key={day.date}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
          >
            {/* Accordion Header (Date) - Clickable Card Header */}
            <button
              onClick={() => handleToggle(day.date)}
              className={`flex items-center justify-between w-full p-4 text-left font-semibold transition-colors duration-300 ${
                isOpen
                  ? 'bg-gray-50 text-gray-900'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="flex items-center">
                <ActivityIcon className="w-5 h-5 mr-2 text-gray-500 transition-transform duration-300" />
                {day.date}
              </span>
              <span></span>
            </button>

            {/* Accordion Content (Activities) */}
            <motion.div
              initial={false}
              animate={isOpen ? 'open' : 'closed'}
              variants={containerVariants}
              transition={{ duration: 0.3 }}
            >
              <div className="p-0 border-t border-gray-100">
                {day.activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="grid grid-cols-[1fr_5fr] gap-4 py-3 px-6 border-l-4 border-orange-500 bg-white hover:bg-orange-50/50 transition-colors border-dashed last:border-b-0"
                  >
                    {/* Time (First column) */}
                    <span className="text-sm font-medium text-gray-600">
                      {activity.time}
                    </span>

                    {/* Description (Second column) */}
                    <span className="text-sm text-gray-800">
                      {activity.description}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityLog;
