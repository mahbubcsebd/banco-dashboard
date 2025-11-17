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

  const colors = colorMap[account.color] || colorMap.blue;
  const IconComponent = accountIcons[account.type] || CreditCard;

  const handleViewAccount = () => {
    router.push(`/dashboard/accounts/${account.accountNumber}`);
  };

  // Format balance display (handle negative for loans/credit cards)
  const formatBalance = (balance) => {
    const absBalance = Math.abs(balance);
    const formatted = absBalance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return balance < 0 ? `-$${formatted}` : `$${formatted}`;
  };

  // Display appropriate label based on account type
  const getBalanceLabel = () => {
    if (account.type.includes('LOAN')) {
      return 'Amount Owed';
    } else if (account.type === 'CREDIT_CARD') {
      return 'Current Balance';
    }
    return 'Available Balance';
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
                {account.type.replace(/_/g, ' ')}
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
              {formatBalance(account.balance)}
            </motion.h3>
            <p className="text-[10px] opacity-75">{getBalanceLabel()}</p>
          </div>

          {/* Show credit limit for credit cards */}
          {/* {account.type === 'CREDIT_CARD' && account.creditLimit && (
            <div className="mb-3">
              <p className="text-[10px] opacity-75">Available Credit</p>
              <p className="text-sm font-semibold">
                ${account.availableBalance.toLocaleString()}
              </p>
            </div>
          )} */}

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
      className="relative w-full lg:w-[calc(100%-100px)] lg:mb-6"
    >
      <div className="relative bg-white h-[120px] lg:h-[180px] overflow-visible w-full lg:w-[calc(100%-100px)]">
        {/* Left colored accent bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 lg:w-2 ${colors.gradient} rounded-l-2xl`}
        />
        <div className="absolute left-full top-0 h-1/2 bg-white w-[100px] rounded-tr-full z-20 hidden lg:block" />
        <div className="absolute left-full bottom-0 h-1/2 bg-white w-[100px] rounded-br-full z-80 hidden lg:block" />

        {/* Content Section with Icon & Divider */}
        <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 md:gap-5 z-50 max-w-[55%]">
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
              className={`w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-md md:rounded-xl ${colors.gradient} flex items-center justify-center text-white relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white opacity-10" />
              <IconComponent
                className="w-6 h-6 md:w-9 md:h-9 relative z-10"
                strokeWidth={2}
              />
            </div>
          </motion.div>

          {/* Divider Line */}
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gray-300 to-transparent shrink-0" />

          {/* Text Content */}
          <div className="flex xl:flex-col items-center xl:items-start gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                {account.type.replace(/_/g, ' ')}
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
                {getBalanceLabel()}
              </p>
              <motion.h3
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: index * 0.05 + 0.2,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                className={`text-2xl font-bold tracking-tight ${
                  account.balance < 0 ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                {formatBalance(account.balance)}
              </motion.h3>
              <p className="text-[9px] text-gray-400 mt-0.5 font-medium uppercase tracking-wider">
                {account.currency}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 + 0.3, duration: 0.4 }}
          className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 lg:gap-2 z-50"
        >
          <motion.button
            onClick={handleViewAccount}
            whileHover={{
              scale: 1.08,
              y: -2,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 lg:p-2.5 rounded-sm flex items-center justify-center w-7 h-7 lg:w-auto lg:h-auto ${colors.iconBg} ${colors.iconHover} transition-all duration-200 shadow-md hover:shadow-lg backdrop-blur-sm`}
          >
            <Eye className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.08,
              y: -2,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.95 }}
            className={`p-1 lg:p-2.5 rounded-sm flex items-center justify-center w-7 h-7 lg:w-auto lg:h-auto ${colors.iconBg} ${colors.iconHover} transition-all duration-200 shadow-md hover:shadow-lg backdrop-blur-sm`}
          >
            <Send className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.08,
              y: -2,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.95 }}
            className={`p-1 lg:p-2.5 rounded-sm flex items-center justify-center w-7 h-7 lg:w-auto lg:h-auto ${colors.iconBg} ${colors.iconHover} transition-all duration-200 shadow-md hover:shadow-lg backdrop-blur-sm`}
          >
            <MoreHorizontal
              className="w-4 h-4 text-gray-700"
              strokeWidth={2.5}
            />
          </motion.button>
        </motion.div>

        {/* Right side circular design */}
        <div className="absolute left-full top-0 h-1/2 bg-white w-[100px] rounded-tr-full z-20 hidden lg:block" />
        <div className="absolute left-full bottom-0 h-1/2 bg-white w-[100px] rounded-br-full z-20 hidden lg:block" />
        <div className="absolute left-full top-1/2 -translate-y-1/2 w-[180px] h-[120px] lg:h-[180px] z-30 hidden lg:block">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.05 + 0.2,
              duration: 0.5,
              ease: 'easeOut',
            }}
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[180px] h-[120px] lg:h-[180px] rounded-full ${colors.gradient} z-40 hidden lg:block`}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-black/20" />
            <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white/20 blur-xl" />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />
      </div>
    </motion.div>
  );
}
