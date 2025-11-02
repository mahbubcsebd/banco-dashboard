'use client';

import { motion } from 'framer-motion';
import { CreditCard, Eye, MoreHorizontal, Send } from 'lucide-react';

const colorMap = {
  orange: {
    gradient: 'bg-gradient-to-br from-orange-400 to-orange-500',
    iconBg: 'bg-orange-600/20',
    iconHover: 'hover:bg-orange-600/30',
  },
  purple: {
    gradient: 'bg-gradient-to-br from-purple-400 to-purple-500',
    iconBg: 'bg-purple-600/20',
    iconHover: 'hover:bg-purple-600/30',
  },
  teal: {
    gradient: 'bg-gradient-to-br from-teal-400 to-teal-500',
    iconBg: 'bg-teal-600/20',
    iconHover: 'hover:bg-teal-600/30',
  },
  blue: {
    gradient: 'bg-gradient-to-br from-blue-400 to-blue-500',
    iconBg: 'bg-blue-600/20',
    iconHover: 'hover:bg-blue-600/30',
  },
};

export default function AccountCard({ account, index }) {
  const colors = colorMap[account.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={`${colors.gradient} rounded-2xl p-5 md:p-6 text-white relative overflow-hidden shadow-lg`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6 sm:mb-4 lg:mb-4 xxl:mb-6">
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider opacity-90 mb-1">
              {account.type}
            </p>
            <p className="text-[13px]">{account.accountNumber}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${colors.iconBg} ${colors.iconHover} transition-colors`}
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="mb-6 sm:mb-4 lg:mb-4 xxl:mb-6">
          <motion.h3
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-3xl md:text-3xl font-bold mb-1"
          >
            $
            {account.balance.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </motion.h3>
          <p className="text-xs opacity-75">{account.currency}</p>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2.5 rounded-full ${colors.iconBg} ${colors.iconHover} transition-colors`}
          >
            <Send className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2.5 rounded-full ${colors.iconBg} ${colors.iconHover} transition-colors`}
          >
            <CreditCard className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2.5 rounded-full ${colors.iconBg} ${colors.iconHover} transition-colors ml-auto`}
          >
            <MoreHorizontal className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
