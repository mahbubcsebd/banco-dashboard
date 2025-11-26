'use client';

import { motion } from 'framer-motion';
import { CreditCard, Eye, MoreHorizontal, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

const colorMap = {
  blue: {
    gradient: 'bg-gradient-to-br from-blue-400 to-blue-500 backdrop-blur-xl',
    iconBg: 'bg-blue-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-blue-500/25',
    border: 'border-blue-400',
    leftBorder: 'border-l-blue-400',
    circleBg: 'from-blue-400 to-blue-500',
    lightBg: 'bg-blue-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(59,130,246,0.7)_0%,rgba(37,99,235,0.7)_100%)]',
    actionBg: 'bg-blue-50/80 backdrop-blur-md',
    actionHover: 'hover:bg-blue-100/80',
    actionIcon: 'text-blue-600',
  },
  green: {
    gradient: 'bg-gradient-to-br from-green-400 to-green-500 backdrop-blur-xl',
    iconBg: 'bg-green-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-green-500/25',
    border: 'border-green-400',
    leftBorder: 'border-l-green-400',
    circleBg: 'from-green-400 to-green-500',
    lightBg: 'bg-green-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(16,185,129,0.7)_0%,rgba(5,150,105,0.7)_100%)]',
    actionBg: 'bg-green-50/80 backdrop-blur-md',
    actionHover: 'hover:bg-green-100/80',
    actionIcon: 'text-green-600',
  },
  teal: {
    gradient: 'bg-gradient-to-br from-teal-400 to-teal-500 backdrop-blur-xl',
    iconBg: 'bg-teal-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-teal-500/25',
    border: 'border-teal-400',
    leftBorder: 'border-l-teal-400',
    circleBg: 'from-teal-400 to-teal-500',
    lightBg: 'bg-teal-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(20,184,166,0.7)_0%,rgba(13,148,136,0.7)_100%)]',
    actionBg: 'bg-teal-50/80 backdrop-blur-md',
    actionHover: 'hover:bg-teal-100/80',
    actionIcon: 'text-teal-600',
  },
  purple: {
    gradient:
      'bg-gradient-to-br from-purple-400 to-purple-500 backdrop-blur-xl',
    iconBg: 'bg-purple-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-purple-500/25',
    border: 'border-purple-400',
    leftBorder: 'border-l-purple-400',
    circleBg: 'from-purple-400 to-purple-500',
    lightBg: 'bg-purple-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(168,85,247,0.7)_0%,rgba(147,51,234,0.7)_100%)]',
    actionBg: 'bg-purple-50/80 backdrop-blur-md',
    actionHover: 'hover:bg-purple-100/80',
    actionIcon: 'text-purple-600',
  },
  red: {
    gradient: 'bg-gradient-to-br from-red-400 to-red-500 backdrop-blur-xl',
    iconBg: 'bg-red-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-red-500/25',
    border: 'border-red-400',
    leftBorder: 'border-l-red-400',
    circleBg: 'from-red-400 to-red-500',
    lightBg: 'bg-red-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(239,68,68,0.7)_0%,rgba(220,38,38,0.7)_100%)]',
    actionBg: 'bg-red-50/80 backdrop-blur-md',
    actionHover: 'hover:bg-red-100/80',
    actionIcon: 'text-red-600',
  },
  navy: {
    gradient:
      'bg-gradient-to-br from-slate-600/80 to-slate-700/80 backdrop-blur-xl',
    iconBg: 'bg-slate-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-slate-500/25',
    border: 'border-slate-600',
    leftBorder: 'border-l-slate-600',
    circleBg: 'from-slate-600/80 to-slate-700/80',
    lightBg: 'bg-slate-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(51,65,85,0.7)_0%,rgba(30,41,59,0.7)_100%)]',
    actionBg: 'bg-slate-100/80 backdrop-blur-md',
    actionHover: 'hover:bg-slate-200/80',
    actionIcon: 'text-slate-700',
  },
  slate: {
    gradient: 'bg-gradient-to-br from-slate-400 to-slate-500 backdrop-blur-xl',
    iconBg: 'bg-slate-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-slate-500/25',
    border: 'border-slate-400',
    leftBorder: 'border-l-slate-400',
    circleBg: 'from-slate-400 to-slate-500',
    lightBg: 'bg-slate-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(100,116,139,0.7)_0%,rgba(71,85,105,0.7)_100%)]',
    actionBg: 'bg-slate-100/80 backdrop-blur-md',
    actionHover: 'hover:bg-slate-200/80',
    actionIcon: 'text-slate-700',
  },
  amber: {
    gradient: 'bg-gradient-to-br from-amber-400 to-amber-500 backdrop-blur-xl',
    iconBg: 'bg-amber-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-amber-500/25',
    border: 'border-amber-400',
    leftBorder: 'border-l-amber-400',
    circleBg: 'from-amber-400 to-amber-500',
    lightBg: 'bg-amber-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(245,158,11,0.7)_0%,rgba(217,119,6,0.7)_100%)]',
    actionBg: 'bg-amber-50/80 backdrop-blur-md',
    actionHover: 'hover:bg-amber-100/80',
    actionIcon: 'text-amber-600',
  },
  indigo: {
    gradient:
      'bg-gradient-to-br from-indigo-400 to-indigo-500 backdrop-blur-xl',
    iconBg: 'bg-indigo-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-indigo-500/25',
    border: 'border-indigo-400',
    leftBorder: 'border-l-indigo-400',
    circleBg: 'from-indigo-400 to-indigo-500',
    lightBg: 'bg-indigo-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(99,102,241,0.7)_0%,rgba(79,70,229,0.7)_100%)]',
    actionBg: 'bg-indigo-50/80 backdrop-blur-md',
    actionHover: 'hover:bg-indigo-100/80',
    actionIcon: 'text-indigo-600',
  },
  sky: {
    gradient: 'bg-gradient-to-br from-sky-300/80 to-sky-400 backdrop-blur-xl',
    iconBg: 'bg-sky-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-sky-500/25',
    border: 'border-sky-300',
    leftBorder: 'border-l-sky-300',
    circleBg: 'from-sky-300/80 to-sky-400',
    lightBg: 'bg-sky-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(56,189,248,0.7)_0%,rgba(14,165,233,0.7)_100%)]',
    actionBg: 'bg-sky-50/80 backdrop-blur-md',
    actionHover: 'hover:bg-sky-100/80',
    actionIcon: 'text-sky-600',
  },
  orange: {
    gradient:
      'bg-gradient-to-br from-orange-300/80 to-orange-400 backdrop-blur-xl',
    iconBg: 'bg-orange-500/15 backdrop-blur-md',
    iconHover: 'hover:bg-orange-500/25',
    border: 'border-orange-300',
    leftBorder: 'border-l-orange-300',
    circleBg: 'from-orange-300/80 to-orange-400',
    lightBg: 'bg-orange-50',
    curveGradient:
      'bg-[linear-gradient(135deg,rgba(251,146,60,0.7)_0%,rgba(249,115,22,0.7)_100%)]',
    actionBg: 'bg-orange-50/80 backdrop-blur-md',
    actionHover: 'hover:bg-orange-100/80',
    actionIcon: 'text-orange-600',
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

  // Grid View
  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        whileHover={{ y: -4 }}
        className={`${colors.gradient} rounded-lg p-5 md:p-6 text-white relative overflow-hidden shadow-lg border border-white/20`}
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
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
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
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm">
              <Send className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm">
              <CreditCard className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors ml-auto backdrop-blur-sm">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // List View
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
      <div className="relative bg-white/70 backdrop-blur-xl h-[120px] overflow-hidden w-full rounded-r-full shadow-sm border border-white/50">
        {/* Left colored accent bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors.gradient} rounded-l-2xl z-20`}
        />

        {/* Content Section */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-5 z-20 max-w-[65%] lg:max-w-[55%]">
          {/* Main Icon */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="relative shrink-0"
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${colors.gradient} flex items-center justify-center text-white shadow-md relative overflow-hidden border border-white/30`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50" />
              <IconComponent
                className="w-7 h-7 md:w-8 md:h-8 relative z-10"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-px h-16 bg-gray-200/60 shrink-0 hidden md:block" />

          {/* Text Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
            <div className="flex flex-col gap-0.5 min-w-[106px]">
              <p className="text-[11px] md:text-xs font-bold text-gray-800 uppercase tracking-wide">
                {account.type}
              </p>
              <p className="text-[10px] text-gray-500 font-medium font-mono tracking-tight">
                {account.accountNumber}
              </p>
            </div>

            <div className="flex flex-col md:border-l md:border-gray-200/60 md:pl-6 font-medium">
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider hidden md:block mb-0.5">
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

        {/* ACTION BUTTONS */}
        <div className="absolute top-1/2 -translate-y-1/2 right-10 lg:right-12 z-30 flex flex-col gap-1.5">
          <motion.button
            onClick={handleViewAccount}
            whileHover={{ scale: 1.05, x: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center p-1.5 w-7 h-7 md:w-8 md:h-8 rounded-lg shadow-sm transition-all duration-200 ${colors.actionBg} ${colors.actionHover} border border-white/40`}
          >
            <Eye className={`w-4 h-4 ${colors.actionIcon}`} strokeWidth={2} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, x: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center p-1.5 w-7 h-7 md:w-8 md:h-8 rounded-lg shadow-sm transition-all duration-200 ${colors.actionBg} ${colors.actionHover} border border-white/40`}
          >
            <Send className={`w-4 h-4 ${colors.actionIcon}`} strokeWidth={2} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, x: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center p-1.5 w-7 h-7 md:w-8 md:h-8 rounded-lg shadow-sm transition-all duration-200 ${colors.actionBg} ${colors.actionHover} border border-white/40`}
          >
            <MoreHorizontal
              className={`w-4 h-4 ${colors.actionIcon}`}
              strokeWidth={2}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
