'use client';

import { motion } from 'framer-motion';
import { CreditCard, Eye, MoreHorizontal, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

const colorMap = {
  blue: {
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconBg: 'bg-blue-600/20',
    iconHover: 'hover:bg-blue-600/30',
    border: 'border-blue-500',
    leftBorder: 'border-l-blue-500',
    circleBg: 'from-blue-500 to-blue-600',
    lightBg: 'bg-blue-50',
    curveGradient: 'bg-[linear-gradient(135deg,#3B82F6_0%,#2563EB_100%)]',
    actionBg: 'bg-blue-100/90',
    actionHover: 'hover:bg-blue-200/90',
    actionIcon: 'text-blue-700',
  },
  green: {
    gradient: 'bg-gradient-to-br from-green-500 to-green-600',
    iconBg: 'bg-green-600/20',
    iconHover: 'hover:bg-green-600/30',
    border: 'border-green-500',
    leftBorder: 'border-l-green-500',
    circleBg: 'from-green-500 to-green-600',
    lightBg: 'bg-green-50',
    curveGradient: 'bg-[linear-gradient(135deg,#10B981_0%,#059669_100%)]',
    actionBg: 'bg-green-100/90',
    actionHover: 'hover:bg-green-200/90',
    actionIcon: 'text-green-700',
  },
  teal: {
    gradient: 'bg-gradient-to-br from-teal-500 to-teal-600',
    iconBg: 'bg-teal-600/20',
    iconHover: 'hover:bg-teal-600/30',
    border: 'border-teal-500',
    leftBorder: 'border-l-teal-500',
    circleBg: 'from-teal-500 to-teal-600',
    lightBg: 'bg-teal-50',
    curveGradient: 'bg-[linear-gradient(135deg,#14B8A6_0%,#0D9488_100%)]',
    actionBg: 'bg-teal-100/90',
    actionHover: 'hover:bg-teal-200/90',
    actionIcon: 'text-teal-700',
  },
  purple: {
    gradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
    iconBg: 'bg-purple-600/20',
    iconHover: 'hover:bg-purple-600/30',
    border: 'border-purple-500',
    leftBorder: 'border-l-purple-500',
    circleBg: 'from-purple-500 to-purple-600',
    lightBg: 'bg-purple-50',
    curveGradient: 'bg-[linear-gradient(135deg,#A855F7_0%,#9333EA_100%)]',
    actionBg: 'bg-purple-100/90',
    actionHover: 'hover:bg-purple-200/90',
    actionIcon: 'text-purple-700',
  },
  red: {
    gradient: 'bg-gradient-to-br from-red-500 to-red-600',
    iconBg: 'bg-red-600/20',
    iconHover: 'hover:bg-red-600/30',
    border: 'border-red-500',
    leftBorder: 'border-l-red-500',
    circleBg: 'from-red-500 to-red-600',
    lightBg: 'bg-red-50',
    curveGradient: 'bg-[linear-gradient(135deg,#EF4444_0%,#DC2626_100%)]',
    actionBg: 'bg-red-100/90',
    actionHover: 'hover:bg-red-200/90',
    actionIcon: 'text-red-700',
  },
  navy: {
    gradient: 'bg-gradient-to-br from-slate-700 to-slate-800',
    iconBg: 'bg-slate-600/20',
    iconHover: 'hover:bg-slate-600/30',
    border: 'border-slate-700',
    leftBorder: 'border-l-slate-700',
    circleBg: 'from-slate-700 to-slate-800',
    lightBg: 'bg-slate-50',
    curveGradient: 'bg-[linear-gradient(135deg,#334155_0%,#1E293B_100%)]',
    actionBg: 'bg-slate-200/90',
    actionHover: 'hover:bg-slate-300/90',
    actionIcon: 'text-slate-800',
  },
  slate: {
    gradient: 'bg-gradient-to-br from-slate-500 to-slate-600',
    iconBg: 'bg-slate-600/20',
    iconHover: 'hover:bg-slate-600/30',
    border: 'border-slate-500',
    leftBorder: 'border-l-slate-500',
    circleBg: 'from-slate-500 to-slate-600',
    lightBg: 'bg-slate-50',
    curveGradient: 'bg-[linear-gradient(135deg,#64748B_0%,#475569_100%)]',
    actionBg: 'bg-slate-200/90',
    actionHover: 'hover:bg-slate-300/90',
    actionIcon: 'text-slate-800',
  },
  amber: {
    gradient: 'bg-gradient-to-br from-amber-500 to-amber-600',
    iconBg: 'bg-amber-600/20',
    iconHover: 'hover:bg-amber-600/30',
    border: 'border-amber-500',
    leftBorder: 'border-l-amber-500',
    circleBg: 'from-amber-500 to-amber-600',
    lightBg: 'bg-amber-50',
    curveGradient: 'bg-[linear-gradient(135deg,#F59E0B_0%,#D97706_100%)]',
    actionBg: 'bg-amber-100/90',
    actionHover: 'hover:bg-amber-200/90',
    actionIcon: 'text-amber-700',
  },
  indigo: {
    gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    iconBg: 'bg-indigo-600/20',
    iconHover: 'hover:bg-indigo-600/30',
    border: 'border-indigo-500',
    leftBorder: 'border-l-indigo-500',
    circleBg: 'from-indigo-500 to-indigo-600',
    lightBg: 'bg-indigo-50',
    curveGradient: 'bg-[linear-gradient(135deg,#6366F1_0%,#4F46E5_100%)]',
    actionBg: 'bg-indigo-100/90',
    actionHover: 'hover:bg-indigo-200/90',
    actionIcon: 'text-indigo-700',
  },
  sky: {
    gradient: 'bg-gradient-to-br from-sky-400 to-sky-500',
    iconBg: 'bg-sky-600/20',
    iconHover: 'hover:bg-sky-600/30',
    border: 'border-sky-400',
    leftBorder: 'border-l-sky-400',
    circleBg: 'from-sky-400 to-sky-500',
    lightBg: 'bg-sky-50',
    curveGradient: 'bg-[linear-gradient(135deg,#38BDF8_0%,#0EA5E9_100%)]',
    actionBg: 'bg-sky-100/90',
    actionHover: 'hover:bg-sky-200/90',
    actionIcon: 'text-sky-700',
  },
  orange: {
    gradient: 'bg-gradient-to-br from-orange-400 to-orange-500',
    iconBg: 'bg-orange-600/20',
    iconHover: 'hover:bg-orange-600/30',
    border: 'border-orange-500',
    leftBorder: 'border-l-orange-500',
    circleBg: 'from-orange-400 to-orange-500',
    lightBg: 'bg-orange-50',
    curveGradient: 'bg-[linear-gradient(135deg,#FB923C_0%,#F97316_100%)]',
    actionBg: 'bg-orange-100/90',
    actionHover: 'hover:bg-orange-200/90',
    actionIcon: 'text-orange-700',
  },
};

const accountIcons = {
  CHECKING: Send,
  SAVINGS: CreditCard,
  MONEY_MARKET: Eye,
  TIME_DEPOSIT: CreditCard,
  AUTO_LOAN: CreditCard,
  MORTGAGE_LOAN: CreditCard,
  PERSONAL_LOAN: CreditCard,
  CREDIT_CARD: CreditCard,
  BUSINESS: CreditCard,
  RETIREMENT_IRA: CreditCard,
  RETIREMENT_401K: CreditCard,
  JOINT: CreditCard,
  STUDENT: Send,
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
        className={`${colors.gradient} rounded-lg p-5 md:p-6 text-white relative overflow-hidden shadow-lg`}
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
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors.gradient} rounded-l-2xl z-20`}
        />

        {/* Content Section */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-5 z-20 max-w-[65%] lg:max-w-[55%]">
          {/* Main Icon (Left side) */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="relative shrink-0"
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${colors.gradient} flex items-center justify-center text-white shadow-md relative overflow-hidden`}
            >
              {/* Subtle inner shine for main icon */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50" />
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
        <div className="absolute top-1/2 -translate-y-1/2 right-10 lg:right-12 z-30 flex flex-col gap-1.5">
          {/* View Button */}
          <motion.button
            onClick={handleViewAccount}
            whileHover={{ scale: 1.05, x: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center p-1.5 w-7 h-7 md:w-8 md:h-8 rounded-lg shadow-sm transition-all duration-200 backdrop-blur-sm ${colors.actionBg} ${colors.actionHover}`}
          >
            <Eye className={`w-4 h-4 ${colors.actionIcon}`} strokeWidth={2} />
          </motion.button>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center p-1.5 w-7 h-7 md:w-8 md:h-8 rounded-lg shadow-sm transition-all duration-200 backdrop-blur-sm ${colors.actionBg} ${colors.actionHover}`}
          >
            <Send className={`w-4 h-4 ${colors.actionIcon}`} strokeWidth={2} />
          </motion.button>

          {/* More Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center p-1.5 w-7 h-7 md:w-8 md:h-8 rounded-lg shadow-sm transition-all duration-200 backdrop-blur-sm ${colors.actionBg} ${colors.actionHover}`}
          >
            <MoreHorizontal
              className={`w-4 h-4 ${colors.actionIcon}`}
              strokeWidth={2}
            />
          </motion.button>
        </div>

        {/* DESKTOP: Right Side Full Curve Background */}
        <div className="block absolute top-0 bottom-0 right-0 w-24 lg:w-32 overflow-hidden z-10 pointer-events-none">
          {/* Wide smooth curve */}
          <div
            className={`absolute top-0 bottom-0 right-[-40px] w-64 rounded-l-[100px] ${colors.gradient} shadow-[-5px_0_25px_rgba(0,0,0,0.1)]`}
          >
            <div className="absolute inset-0 rounded-l-[100px] bg-gradient-to-b from-white/40 via-transparent to-black/10" />
            {/* Crisp edge line */}
            <div className="absolute left-0 top-0 bottom-0 w-[0.5px] bg-white/50 mix-blend-overlay" />
          </div>
        </div>

        {/* MOBILE: Very subtle accent border on the right */}
        <div
          className={`lg:hidden absolute top-0 right-0 bottom-0 w-0.5 bg-gradient-to-b ${colors.circleBg} opacity-20`}
        />

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-50" />
      </div>
    </motion.div>
  );
}
