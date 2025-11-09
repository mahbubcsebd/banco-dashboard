// components/dashboard/SummaryCards.jsx
'use client';

import { motion } from 'framer-motion';
import { DollarSign, PiggyBank, TrendingUp, Wallet } from 'lucide-react';

const SummaryCards = ({ data }) => {
  const cards = [
    {
      title: 'Total Current',
      amount: data.totalCurrent || 0,
      icon: Wallet,
      color: 'orange',
      gradient: 'from-orange-400 to-orange-500',
    },
    {
      title: 'Total Savings',
      amount: data.totalSavings || 0,
      icon: PiggyBank,
      color: 'purple',
      gradient: 'from-purple-400 to-purple-500',
    },
    {
      title: 'Total Investment',
      amount: data.totalInvestment || 0,
      icon: TrendingUp,
      color: 'teal',
      gradient: 'from-teal-400 to-teal-500',
    },
    {
      title: 'Total Balance',
      amount: data.totalBalance || 0,
      icon: DollarSign,
      color: 'blue',
      gradient: 'from-blue-400 to-blue-500',
    },
  ];

  return (
    <div className="mb-6">
      {/* Desktop View */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient}`}
              >
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-1">{card.title}</p>
            <p className="text-xl font-bold text-gray-900">
              $
              {card.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile/Tablet View - Horizontal Scroll */}
      <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 border border-gray-100 min-w-[160px]"
            >
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient} inline-block mb-3`}
              >
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-gray-500 mb-1">{card.title}</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {card.amount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
