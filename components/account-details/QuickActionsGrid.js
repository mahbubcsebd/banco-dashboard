'use client';

import { motion } from 'framer-motion';
import {
  CreditCard,
  Download,
  FileCheck,
  FileText,
  Printer,
  RefreshCw,
  Search,
  Send,
  Settings,
} from 'lucide-react';

const quickActions = [
  { icon: Search, label: 'Search/Filter' },
  { icon: FileText, label: 'Account Activity' },
  { icon: Send, label: 'Transfer' },
  { icon: Printer, label: 'Order Print Statement' },
  { icon: RefreshCw, label: 'Reorder Checkbook' },
  { icon: CreditCard, label: 'Stop Check' },
  { icon: FileCheck, label: 'Order An Affidavit' },
  { icon: Download, label: 'Order Cashier Check' },
  { icon: FileText, label: 'Positive Pay' },
  { icon: Settings, label: 'Account Settings' },
];

const QuickActionsGrid = () => {
  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 sm:gap-4">
        {quickActions.map((action, index) => (
          <ActionCard key={action.label} action={action} index={index} />
        ))}
      </div>
    </div>
  );
};

const ActionCard = ({ action, index }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative bg-white rounded-md lg:rounded-xl p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300"
    >
      {/* Subtle hover effect */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-50/0 to-orange-50/0 group-hover:from-orange-50/50 group-hover:to-orange-50/20 rounded-md lg:rounded-xl transition-all duration-300" />

      <div className="relative flex flex-col items-center gap-3 text-center">
        {/* Icon container */}
        <div className="">
          <action.icon
            className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 group-hover:text-white transition-colors duration-300"
            strokeWidth={2}
          />
        </div>

        {/* Text */}
        <p className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-900 leading-tight transition-colors">
          {action.label}
        </p>
      </div>
    </motion.button>
  );
};

export default QuickActionsGrid;
