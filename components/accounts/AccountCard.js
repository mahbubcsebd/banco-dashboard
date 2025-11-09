// components/dashboard/AccountCard.jsx
'use client';

import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, FileText } from 'lucide-react';
import Link from 'next/link';

const AccountCard = ({ account, index }) => {
  // Safety checks
  if (!account) return null;

  const getGradientClass = (gradient) => {
    if (!gradient) return 'bg-gradient-to-r from-gray-400 to-gray-500';
    return `bg-gradient-to-r ${gradient}`;
  };

  const getBgColorClass = (color) => {
    const colors = {
      orange: 'bg-orange-600',
      purple: 'bg-purple-600',
      teal: 'bg-teal-600',
      blue: 'bg-blue-600',
    };
    return colors[color] || 'bg-gray-600';
  };

  const getLightBgClass = (color) => {
    const colors = {
      orange: 'bg-orange-50',
      purple: 'bg-purple-50',
      teal: 'bg-teal-50',
      blue: 'bg-blue-50',
    };
    return colors[color] || 'bg-gray-50';
  };

  const getTextClass = (color) => {
    const colors = {
      orange: 'text-orange-600',
      purple: 'text-purple-600',
      teal: 'text-teal-600',
      blue: 'text-blue-600',
    };
    return colors[color] || 'text-gray-600';
  };

  const getBorderClass = (color) => {
    const colors = {
      orange: 'border-orange-200',
      purple: 'border-purple-200',
      teal: 'border-teal-200',
      blue: 'border-blue-200',
    };
    return colors[color] || 'border-gray-200';
  };

  return (
    <Link href={`/dashboard/accounts/${account.accountNumber}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      >
        {/* Card Header */}
        <div
          className={`${getGradientClass(
            account.gradient
          )} p-4 sm:p-5 text-white`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs sm:text-sm opacity-90 mb-1">
                {account.type || 'N/A'}
              </p>
              <p className="text-base sm:text-lg font-bold">
                {account.accountNumber || 'N/A'}
              </p>
            </div>
            <div
              className={`${getBgColorClass(
                account.color
              )} px-3 py-1 rounded-full text-xs font-semibold`}
            >
              {account.status || 'Active'}
            </div>
          </div>
          <p className="text-xs sm:text-sm opacity-90">
            {account.accountTitle || 'Account'}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Balance Info */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Balance</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                $
                {(account.balance || 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Available</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                $
                {(account.availableBalance || 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* Account Holder */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Account Holder</p>
            <p className="text-sm font-medium text-gray-900">
              {account.accountName || 'N/A'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/dashboard/accounts/${account.id}/transfer`}
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border ${getBorderClass(
                account.color
              )} ${getLightBgClass(account.color)} ${getTextClass(
                account.color
              )} hover:shadow-md transition-all text-xs sm:text-sm font-medium flex-1 justify-center min-w-[90px]`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Transfer</span>
            </Link>
            <Link
              href={`/dashboard/accounts/${account.id}/statement`}
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border ${getBorderClass(
                account.color
              )} ${getLightBgClass(account.color)} ${getTextClass(
                account.color
              )} hover:shadow-md transition-all text-xs sm:text-sm font-medium flex-1 justify-center min-w-[90px]`}
            >
              <FileText className="w-4 h-4" />
              <span>Statement</span>
            </Link>
            <Link
              href={`/dashboard/accounts/${account.id}/activity`}
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border ${getBorderClass(
                account.color
              )} ${getLightBgClass(account.color)} ${getTextClass(
                account.color
              )} hover:shadow-md transition-all text-xs sm:text-sm font-medium flex-1 justify-center min-w-[90px]`}
            >
              <Activity className="w-4 h-4" />
              <span>Activity</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default AccountCard;
