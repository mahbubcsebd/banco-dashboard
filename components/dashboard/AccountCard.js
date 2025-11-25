'use client';

import { motion } from 'framer-motion';
import { CreditCard, Eye, MoreHorizontal, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

const colorMap = {
  orange: {
    linear: 'bg-linear-to-br from-orange-400 to-orange-500',
    // Mobile: Light tint BG, dark colored icon
    mobileActionBg: 'bg-orange-50 hover:bg-orange-100',
    mobileActionText: 'text-orange-600',
    // Desktop: Transparent white BG, pure white icon (for visibility on color curve)
    desktopActionBg: 'lg:bg-white/20 lg:hover:bg-white/30',
    desktopActionText: 'lg:text-white',

    border: 'border-orange-500',
    circleBg: 'from-orange-400 to-orange-500',
  },
  purple: {
    linear: 'bg-linear-to-br from-purple-400 to-purple-500',
    mobileActionBg: 'bg-purple-50 hover:bg-purple-100',
    mobileActionText: 'text-purple-600',
    desktopActionBg: 'lg:bg-white/20 lg:hover:bg-white/30',
    desktopActionText: 'lg:text-white',

    border: 'border-purple-500',
    circleBg: 'from-purple-400 to-purple-500',
  },
  teal: {
    linear: 'bg-linear-to-br from-teal-400 to-teal-500',
    mobileActionBg: 'bg-teal-50 hover:bg-teal-100',
    mobileActionText: 'text-teal-600',
    desktopActionBg: 'lg:bg-white/20 lg:hover:bg-white/30',
    desktopActionText: 'lg:text-white',

    border: 'border-teal-500',
    circleBg: 'from-teal-400 to-teal-500',
  },
  blue: {
    linear: 'bg-linear-to-br from-blue-400 to-blue-500',
    mobileActionBg: 'bg-blue-50 hover:bg-blue-100',
    mobileActionText: 'text-blue-600',
    desktopActionBg: 'lg:bg-white/20 lg:hover:bg-white/30',
    desktopActionText: 'lg:text-white',

    border: 'border-blue-500',
    circleBg: 'from-blue-400 to-blue-500',
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

  // Grid View (No changes)
  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        whileHover={{ y: -4 }}
        className={`${colors.linear} rounded-full p-5 md:p-6 text-white relative overflow-hidden shadow-lg`}
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
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
          <div className="mb-4">
            <motion.h3 className="text-2xl md:text-3xl font-bold mb-0.5">
              $
              {account.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </motion.h3>
            <p className="text-[10px] opacity-75">{account.currency}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <Send className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <CreditCard className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors ml-auto">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // List View - Fixed Icon Shapes & Visibility Colors
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
      className="relative w-full"
    >
      <div className="relative bg-white h-[120px] overflow-hidden w-full rounded-r-full shadow-sm border border-gray-100/50">
        {/* Left colored accent bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors.linear} rounded-l-2xl z-20`}
        />

        {/* Content Section */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-5 z-20 max-w-[65%] lg:max-w-[55%]">
          {/* Main Icon (Left side) */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="relative shrink-0"
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${colors.linear} flex items-center justify-center text-white shadow-md relative overflow-hidden`}
            >
              {/* Subtle inner shine for main icon */}
              <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-50" />
              <IconComponent
                className="w-7 h-7 md:w-8 md:h-8 relative z-10"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-px h-16 bg-gray-100/80 shrink-0 hidden md:block" />

          {/* Text Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] md:text-xs font-bold text-gray-800 uppercase tracking-wide">
                {account.type}
              </p>
              <p className="text-[10px] text-gray-400 font-medium font-mono tracking-tight">
                {account.accountNumber}
              </p>
            </div>

            <div className="flex flex-col md:border-l md:border-gray-100 md:pl-6 font-medium">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider hidden md:block mb-0.5">
                Available
              </p>
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight flex items-baseline">
                <span className="text-sm md:text-lg mr-0.5 opacity-70">$</span>
                {account.balance.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h3>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS - Fixed Shapes & Colors for Visibility */}
        {/* Positioned closer to right edge on mobile, further left on desktop to sit nicely on curve */}
        <div className="absolute top-1/2 -translate-y-1/2 right-10 lg:right-12 z-30 flex flex-col gap-1.5">
          {/* View Button */}
          <motion.button
            onClick={handleViewAccount}
            whileHover={{ scale: 1.05, x: -1 }}
            whileTap={{ scale: 0.95 }}
            // SHAPE: rounded-lg (squares) instead of rounded-full
            // COLORS: Combined mobile/desktop classes for visibility everywhere
            className={`
              flex items-center justify-center p-1.5 w-7 h-7 md:w-8 md:h-8 rounded-lg shadow-xs transition-all duration-200 backdrop-blur-sm
              ${colors.mobileActionBg} ${colors.mobileActionText}
              ${colors.desktopActionBg} ${colors.desktopActionText}
            `}
          >
            <Eye className="w-4 h-4" strokeWidth={2} />
          </motion.button>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center justify-center p-1.5 w-7 h-7 md:w-8 md:h-8 rounded-lg shadow-xs transition-all duration-200 backdrop-blur-sm
              ${colors.mobileActionBg} ${colors.mobileActionText}
              ${colors.desktopActionBg} ${colors.desktopActionText}
            `}
          >
            <Send className="w-4 h-4" strokeWidth={2} />
          </motion.button>

          {/* More Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center justify-center p-1.5 w-7 h-7 md:w-8 md:h-8 rounded-lg shadow-xs transition-all duration-200 backdrop-blur-sm
              ${colors.mobileActionBg} ${colors.mobileActionText}
              ${colors.desktopActionBg} ${colors.desktopActionText}
            `}
          >
            <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
          </motion.button>
        </div>

        {/* DESKTOP: Right Side Full Curve Background (Hidden on mobile) */}
        <div className="block absolute top-0 bottom-0 right-0 w-24 lg:w-32 overflow-hidden z-10 pointer-events-none">
          {/* Wide smooth curve */}
          <div
            className={`absolute top-0 bottom-0 right-[-40px] w-64 rounded-l-[100px] ${colors.linear} shadow-[-5px_0_25px_rgba(0,0,0,0.1)]`}
          >
            <div className="absolute inset-0 rounded-l-[100px] bg-linear-to-b from-white/40 via-transparent to-black/10" />
            {/* Crisp edge line */}
            <div className="absolute left-0 top-0 bottom-0 w-[0.5px] bg-white/50 mix-blend-overlay" />
          </div>
        </div>

        {/* MOBILE: Very subtle accent border on the right (No big curve) */}
        <div
          className={`lg:hidden absolute top-0 right-0 bottom-0 w-0.5 bg-gradient-to-b ${colors.circleBg} opacity-20`}
        />

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-50" />
      </div>
    </motion.div>
  );
}
