'use client';

import { motion } from 'framer-motion';
import { CreditCard, Eye, MoreHorizontal, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

const colorMap = {
  orange: {
    gradient: 'bg-gradient-to-br from-orange-400 to-orange-500',
    iconBg: 'bg-orange-600/20',
    iconHover: 'hover:bg-orange-600/30',
    border: 'border-orange-500',
    leftBorder: 'border-l-orange-500',
    circleBg: 'from-orange-400 to-orange-500',
    lightBg: 'bg-orange-50',
    curveGradient: 'bg-[linear-gradient(135deg,#FF7E5F_0%,#FEB47B_100%)]',
  },
  purple: {
    gradient: 'bg-gradient-to-br from-purple-400 to-purple-500',
    iconBg: 'bg-purple-600/20',
    iconHover: 'hover:bg-purple-600/30',
    border: 'border-purple-500',
    leftBorder: 'border-l-purple-500',
    circleBg: 'from-purple-400 to-purple-500',
    lightBg: 'bg-purple-50',
    curveGradient: 'bg-[linear-gradient(135deg,#A78BFA_0%,#C4B5FD_100%)]',
  },
  teal: {
    gradient: 'bg-gradient-to-br from-teal-400 to-teal-500',
    iconBg: 'bg-teal-600/20',
    iconHover: 'hover:bg-teal-600/30',
    border: 'border-teal-500',
    leftBorder: 'border-l-teal-500',
    circleBg: 'from-teal-400 to-teal-500',
    lightBg: 'bg-teal-50',
    curveGradient: 'bg-[linear-gradient(135deg,#2DD4BF_0%,#6EE7B7_100%)]',
  },
  blue: {
    gradient: 'bg-gradient-to-br from-blue-400 to-blue-500',
    iconBg: 'bg-blue-600/20',
    iconHover: 'hover:bg-blue-600/30',
    border: 'border-blue-500',
    leftBorder: 'border-l-blue-500',
    circleBg: 'from-blue-400 to-blue-500',
    lightBg: 'bg-blue-50',
    curveGradient: 'bg-[linear-gradient(135deg,#3B82F6_0%,#60A5FA_100%)]',
  },
};

const accountIcons = {
  'Savings Account': CreditCard,
  'Checking Account': Send,
  'Credit Card': CreditCard,
  'Investment Account': Eye,
};

export default function AccountCard({ account, index, viewMode = 'grid' }) {
  const router = useRouter();

  if (!account) {
    return null;
  }

  const colors = colorMap[account.color] || colorMap.orange;
  const IconComponent = accountIcons[account.type] || CreditCard;

  const handleViewAccount = () => {
    router.push(`/accounts/${account.accountNumber}`);
  };

  // Grid View
  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        whileHover={{ y: -4 }}
        className={`${colors.gradient} rounded-2xl p-5 md:p-6 text-white relative overflow-hidden shadow-lg`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs md:text-sm font-semibold uppercase tracking-wider opacity-90 mb-1">
                {account.type}
              </p>
              <p className="text-[11px] opacity-80">{account.accountNumber}</p>
            </div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-0.5"
            >
              <button
                onClick={handleViewAccount}
                className={`p-1.5 rounded-full ${colors.iconBg} ${colors.iconHover} transition-colors`}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <span className="text-[9px] font-medium opacity-90">Action</span>
            </motion.div>
          </div>

          <div className="mb-4">
            <motion.h3
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-2xl md:text-3xl font-bold mb-0.5"
            >
              $
              {account.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </motion.h3>
            <p className="text-[10px] opacity-75">{account.currency}</p>
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-0.5"
            >
              <button
                className={`p-2 rounded-full ${colors.iconBg} ${colors.iconHover} transition-colors`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
              <span className="text-[9px] font-medium opacity-90">Send</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-0.5"
            >
              <button
                className={`p-2 rounded-full ${colors.iconBg} ${colors.iconHover} transition-colors`}
              >
                <CreditCard className="w-3.5 h-3.5" />
              </button>
              <span className="text-[9px] font-medium opacity-90">Card</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-0.5 ml-auto"
            >
              <button
                className={`p-2 rounded-full ${colors.iconBg} ${colors.iconHover} transition-colors`}
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
              <span className="text-[9px] font-medium opacity-90">More</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // List View - Compact & Modern Design
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        scale: 1.005,
        boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-[110px] border-l-4 ${colors.leftBorder}`}
    >
      {/* Curved Gradient Shape - More Subtle */}
      <div
        className={`absolute inset-y-0 right-0 ${colors.curveGradient}`}
        style={{
          width: '35%',
          clipPath: 'ellipse(75% 100% at 100% 50%)',
          opacity: 0.9,
          zIndex: 0,
        }}
      >
        {/* Subtle Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-white rounded-full translate-y-1/4" />
        </div>
      </div>

      {/* Main Content - Compact Layout */}
      <div className="flex items-center justify-between h-full px-5 relative z-10">
        {/* Left Section - Icon & Type */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            className={`w-16 h-16 rounded-xl ${colors.gradient} flex items-center justify-center text-white shadow-lg relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white opacity-10" />
            <IconComponent className="w-7 h-7 relative z-10" strokeWidth={2} />
          </motion.div>

          <div className="border-l border-gray-200 pl-4">
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-0.5">
              {account.type.split(' ')[0]}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">
              {account.accountNumber}
            </p>
          </div>
        </div>

        {/* Middle Section - Balance Info */}
        <div className="flex-1 px-6 min-w-0">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
            Available Balance
          </p>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
              $
              {account.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
          </motion.div>
          <p className="text-[9px] text-gray-400 mt-0.5 font-medium uppercase tracking-wider">
            {account.currency}
          </p>
        </div>

        {/* Right Section - Compact Action Buttons with Titles */}
        <div className="flex gap-3 items-center relative z-20">
          <motion.div
            whileHover={{
              scale: 1.08,
              y: -2,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1"
          >
            <button
              onClick={handleViewAccount}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group relative overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${colors.circleBg} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
              />
              <Eye
                className="w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors duration-200 relative z-10"
                strokeWidth={2.5}
              />
            </button>
            <span className="text-[9px] font-medium text-gray-600">Action</span>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.08,
              y: -2,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1"
          >
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
              <div
                className={`absolute inset-0 bg-linear-to-br ${colors.circleBg} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
              />
              <Send
                className="w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors duration-200 relative z-10"
                strokeWidth={2.5}
              />
            </button>
            <span className="text-[9px] font-medium text-gray-600">Send</span>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.08,
              y: -2,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1"
          >
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
              <div
                className={`absolute inset-0 bg-linear-to-br ${colors.circleBg} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
              />
              <MoreHorizontal
                className="w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors duration-200 relative z-10"
                strokeWidth={2.5}
              />
            </button>
            <span className="text-[9px] font-medium text-gray-600">More</span>
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent opacity-50" />
    </motion.div>
  );
}
