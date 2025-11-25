'use client';

import { motion } from 'framer-motion';
import { CreditCard, Eye, MoreHorizontal, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

const colorMap = {
  orange: {
    linear: 'bg-linear-to-br from-orange-400 to-orange-500',
    iconBg: 'bg-orange-600/20',
    iconHover: 'hover:bg-orange-600/30',
    border: 'border-orange-500',
    leftBorder: 'border-l-orange-500',
    circleBg: 'from-orange-400 to-orange-500',
    lightBg: 'bg-orange-50',
    curvelinear: 'bg-[linear-linear(135deg,#FF7E5F_0%,#FEB47B_100%)]',
  },
  purple: {
    linear: 'bg-linear-to-br from-purple-400 to-purple-500',
    iconBg: 'bg-purple-600/20',
    iconHover: 'hover:bg-purple-600/30',
    border: 'border-purple-500',
    leftBorder: 'border-l-purple-500',
    circleBg: 'from-purple-400 to-purple-500',
    lightBg: 'bg-purple-50',
    curvelinear: 'bg-[linear-linear(135deg,#A78BFA_0%,#C4B5FD_100%)]',
  },
  teal: {
    linear: 'bg-linear-to-br from-teal-400 to-teal-500',
    iconBg: 'bg-teal-600/20',
    iconHover: 'hover:bg-teal-600/30',
    border: 'border-teal-500',
    leftBorder: 'border-l-teal-500',
    circleBg: 'from-teal-400 to-teal-500',
    lightBg: 'bg-teal-50',
    curvelinear: 'bg-[linear-linear(135deg,#2DD4BF_0%,#6EE7B7_100%)]',
  },
  blue: {
    linear: 'bg-linear-to-br from-blue-400 to-blue-500',
    iconBg: 'bg-blue-600/20',
    iconHover: 'hover:bg-blue-600/30',
    border: 'border-blue-500',
    leftBorder: 'border-l-blue-500',
    circleBg: 'from-blue-400 to-blue-500',
    lightBg: 'bg-blue-50',
    curvelinear: 'bg-[linear-linear(135deg,#3B82F6_0%,#60A5FA_100%)]',
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

  // Grid View (No changes here as requested)
  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        whileHover={{ y: -4 }}
        className={`${colors.linear} rounded-2xl p-5 md:p-6 text-white relative overflow-hidden shadow-lg`}
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

  // List View - REDESIGNED with 3D Curve Border
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
        scale: 1.002,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      // CHANGED: Removed calc width, now full width
      className="relative w-full"
    >
      {/* CHANGED: Removed calc width, now full width. Added rounded-r-2xl for proper corner smoothing */}
      <div className="relative bg-white h-[120px] overflow-hidden w-full rounded-r-2xl shadow-xs border border-gray-100/50">
        {/* Left colored accent bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 ${colors.linear} rounded-l-2xl`}
        />

        {/* Content Section with Icon & Divider */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-5 z-20 max-w-[55%]">
          {/* Icon Container */}
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 3,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            className="relative shrink-0"
          >
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-xl ${colors.linear} flex items-center justify-center text-white relative overflow-hidden shadow-md`}
            >
              <div className="absolute inset-0 bg-white opacity-10" />
              <IconComponent
                className="w-9 h-9 relative z-10"
                strokeWidth={2}
              />
            </div>
          </motion.div>

          {/* Divider Line */}
          <div className="w-px h-24 bg-linear-to-b from-transparent via-gray-300 to-transparent shrink-0" />

          {/* Text Content */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                {account.type}
              </p>
              <p className="text-[10px] text-gray-400 font-medium">
                {account.accountNumber}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
              className="flex flex-col justify-center"
            >
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Available Balance
              </p>
              <motion.h3
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: index * 0.05 + 0.2,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                className="text-2xl font-bold text-gray-900 tracking-tight"
              >
                $
                {account.balance.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </motion.h3>
              <p className="text-[9px] text-gray-400 mt-0.5 font-medium uppercase tracking-wider">
                {account.currency}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons - Repositioned slightly left */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 + 0.3, duration: 0.4 }}
          // CHANGED: Adjusted right position from lg:right-8 to lg:right-10
          className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30"
        >
          <motion.button
            onClick={handleViewAccount}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-sm flex items-center justify-center w-7 h-7 ${colors.iconBg} ${colors.iconHover} transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm`}
          >
            <Eye className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`p-1 rounded-sm flex items-center justify-center w-7 h-7 ${colors.iconBg} ${colors.iconHover} transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm`}
          >
            <Send className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`p-1 rounded-sm flex items-center justify-center w-7 h-7 ${colors.iconBg} ${colors.iconHover} transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm`}
          >
            <MoreHorizontal className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </motion.button>
        </motion.div>

        {/* NEW: Right side 3D curved border effect */}
        <div className="absolute top-0 bottom-0 right-0 w-8 overflow-hidden z-10">
          {/* The colored curve structure */}
          <div
            className={`absolute top-0 bottom-0 right-[-12px] w-16 rounded-l-3xl ${colors.linear} shadow-[-3px_0_10px_rgba(0,0,0,0.1)]`}
          >
            {/* Inner highlight for 3D shine effect */}
            <div className="absolute inset-0 rounded-l-3xl bg-linear-to-b from-white/40 via-transparent to-black/10" />
            {/* A thin crisp edge line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/40 mix-blend-overlay" />
          </div>
        </div>

        {/* Subtle Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-100 to-transparent" />
      </div>
    </motion.div>
  );
}
