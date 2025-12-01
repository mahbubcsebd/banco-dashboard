'use client';

import { motion } from 'framer-motion';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Eye,
  MoreHorizontal,
  Receipt,
  Send,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// ... (colorMap and accountIcons remain the same) ...
const colorMap = {
  blue: {
    active: 'bg-blue-500 text-white shadow-blue-200',
    inactive: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    border: 'border-blue-200',
    accent: 'bg-blue-500',
    light: 'bg-blue-100',
    icon: 'text-blue-600',
  },
  green: {
    active: 'bg-green-500 text-white shadow-green-200',
    inactive: 'bg-green-50 text-green-600 hover:bg-green-100',
    border: 'border-green-200',
    accent: 'bg-green-500',
    light: 'bg-green-100',
    icon: 'text-green-600',
  },
  teal: {
    active: 'bg-teal-500 text-white shadow-teal-200',
    inactive: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
    border: 'border-teal-200',
    accent: 'bg-teal-500',
    light: 'bg-teal-100',
    icon: 'text-teal-600',
  },
  purple: {
    active: 'bg-purple-500 text-white shadow-purple-200',
    inactive: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    border: 'border-purple-200',
    accent: 'bg-purple-500',
    light: 'bg-purple-100',
    icon: 'text-purple-600',
  },
  red: {
    active: 'bg-red-500 text-white shadow-red-200',
    inactive: 'bg-red-50 text-red-600 hover:bg-red-100',
    border: 'border-red-200',
    accent: 'bg-red-500',
    light: 'bg-red-100',
    icon: 'text-red-600',
  },
  navy: {
    active: 'bg-slate-700 text-white shadow-slate-300',
    inactive: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    border: 'border-slate-300',
    accent: 'bg-slate-700',
    light: 'bg-slate-200',
    icon: 'text-slate-700',
  },
  slate: {
    active: 'bg-slate-500 text-white shadow-slate-200',
    inactive: 'bg-slate-50 text-slate-600 hover:bg-slate-100',
    border: 'border-slate-300',
    accent: 'bg-slate-500',
    light: 'bg-slate-200',
    icon: 'text-slate-600',
  },
  amber: {
    active: 'bg-amber-500 text-white shadow-amber-200',
    inactive: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
    border: 'border-amber-200',
    accent: 'bg-amber-500',
    light: 'bg-amber-100',
    icon: 'text-amber-700',
  },
  indigo: {
    active: 'bg-indigo-500 text-white shadow-indigo-200',
    inactive: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
    border: 'border-indigo-200',
    accent: 'bg-indigo-500',
    light: 'bg-indigo-100',
    icon: 'text-indigo-600',
  },
  sky: {
    active: 'bg-sky-500 text-white shadow-sky-200',
    inactive: 'bg-sky-50 text-sky-600 hover:bg-sky-100',
    border: 'border-sky-200',
    accent: 'bg-sky-500',
    light: 'bg-sky-100',
    icon: 'text-sky-600',
  },
  orange: {
    active: 'bg-orange-500 text-white shadow-orange-200',
    inactive: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
    border: 'border-orange-200',
    accent: 'bg-orange-500',
    light: 'bg-orange-100',
    icon: 'text-orange-700',
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

export default function AccountTabView({ accounts }) {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const router = useRouter();

  const colors = colorMap[selectedAccount.color] || colorMap.orange;
  const IconComponent = accountIcons[selectedAccount.type] || CreditCard;

  const getLastFourDigits = (accountNumber) => {
    return accountNumber.slice(-4);
  };

  const handleViewAccount = () => {
    router.push(`/accounts/${selectedAccount.accountNumber}`);
  };

  return (
    <div className="space-y-0">
      {/* Tabs - Fixed Width, Mobile 3 per row */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-x-0">
        {accounts.map((account, index) => {
          const tabColors = colorMap[account.color] || colorMap.orange;
          const isActive = selectedAccount.id === account.id;

          return (
            <motion.button
              key={account.id}
              onClick={() => setSelectedAccount(account)}
              whileHover={{ scale: isActive ? 1 : 1.02, y: isActive ? 0 : -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
              style={{
                zIndex: isActive ? 20 : 10 - index,
                // index 0 er jonno margin 0, karon ei ta shobshomoy prothome thakbe.
                // Baki shob margin logic Tailwind class-er madhyome hobe.
                marginLeft: index === 0 ? '0px' : undefined,
              }}
              className={`
                relative w-full px-2 py-2.5 text-xs font-semibold
                transition-all duration-200
                border border-b-0 rounded-t-xl
                ${
                  isActive
                    ? tabColors.active +
                      ' shadow-lg border-transparent translate-y-0'
                    : tabColors.inactive + ' ' + tabColors.border + 'opacity-90'
                }
                ${index !== 0 ? '-ml-2' : ''}

                /* Mobile (3 columns): Index 1, 4, 7... (3n+1) should have 0 margin to start a new row. */
                nth-[3n+1]:ml-0

                /* Medium (4 columns): Overrides mobile. Index 1, 5, 9... (4n+1) should have 0 margin. */
                md:nth-[4n+1]:ml-0

                /* Large (6 columns): Overrides medium. Index 1, 7, 13... (6n+1) should have 0 margin. */
                lg:nth-[6n+1]:ml-0

                /* Extra Large (10 columns): Overrides large. Index 1, 11, 21... (10n+1) should have 0 margin. */
                xl:nth-[10n+1]:ml-0
              `}
            >
              {/* Account Name and Number side by side */}
              <div className="flex items-center justify-center gap-1">
                <span className="capitalize text-[10px] sm:text-[11px] font-bold">
                  {account.type.split('_')[0]}
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] font-medium shrink-0 ${
                    isActive ? 'opacity-90' : 'opacity-70'
                  }`}
                >
                  {getLastFourDigits(account.accountNumber)}
                </span>
              </div>

              {/* Bottom connector for active tab */}
              {isActive && (
                <div
                  className={`absolute -bottom-px left-0 right-0 h-px ${
                    tabColors.active.split(' ')[0]
                  }`}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Account Details */}
      <motion.div
        key={selectedAccount.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl rounded-tl-none overflow-hidden shadow-lg border border-gray-100 relative z-30"
      >
        {/* Top Section - Balance */}
        <div
          className={`${colors.light} p-4 md:p-5 border-b border-gray-100/50`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 ${colors.accent} rounded-xl flex items-center justify-center shadow-sm`}
              >
                <IconComponent
                  className="w-5 h-5 md:w-6 md:h-6 text-white"
                  strokeWidth={2}
                />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 capitalize">
                  {selectedAccount.type.toLowerCase().replace(/_/g, ' ')}
                </h3>
                <p className="text-xs text-gray-600 font-mono font-medium">
                  {selectedAccount.accountNumber}
                </p>
              </div>
            </div>

            <motion.button
              onClick={handleViewAccount}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4 text-gray-600" strokeWidth={2} />
            </motion.button>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1 font-bold uppercase tracking-wider opacity-80">
              Available Balance
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              $
              {selectedAccount.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>

        {/* Bottom Section - Quick Actions */}
        <div className="p-4 md:p-5">
          <div className="grid grid-cols-4 gap-2">
            <ActionButton
              icon={ArrowUpRight}
              label="Send"
              colorClass={colors.icon}
            />
            <ActionButton
              icon={ArrowDownLeft}
              label="Receive"
              colorClass={colors.icon}
            />
            <ActionButton
              icon={Receipt}
              label="History"
              colorClass={colors.icon}
            />
            <ActionButton
              icon={MoreHorizontal}
              label="More"
              colorClass={colors.icon}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Helper Component for Buttons
function ActionButton({ icon: Icon, label, colorClass }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-all shadow-sm hover:shadow"
    >
      <Icon className={`w-5 h-5 ${colorClass}`} strokeWidth={2} />
      <span className="text-[10px] font-semibold text-gray-700">{label}</span>
    </motion.button>
  );
}
