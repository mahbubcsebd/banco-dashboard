'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Eye, History, X } from 'lucide-react';

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'text-green-600 bg-green-50';
    case 'Expired':
      return 'text-gray-500 bg-gray-100';
    case 'Cancelled':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-500 bg-gray-100';
  }
};

const UpcomingPaymentsList = ({ data = [] }) => {
  const handleAction = (action, payment) => {
    console.log(`${action} action triggered for payment ID: ${payment.id}`);
    // Implement actual navigation or modal display here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-3"
    >
      {data.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            No scheduled payments found matching your filters.
          </p>
        </div>
      ) : (
        data.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Desktop/Tablet View (md:flex) */}
            <div className="hidden md:flex items-center justify-between">
              {/* Payment Info */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center space-x-2 text-base font-semibold text-gray-900">
                  <span>{payment.payFrom}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span>{payment.payTo}</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {payment.date}
                </div>
              </div>

              {/* Amount and Status */}
              <div className="flex items-center space-x-6 shrink-0">
                <div className="text-right font-bold text-gray-900 w-24">
                  {payment.currency} {payment.amount.toFixed(2)}
                </div>
                <div
                  className={`text-xs font-medium px-2 py-1 rounded-full w-20 text-center ${getStatusColor(
                    payment.status
                  )}`}
                >
                  {payment.status}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <button
                    onClick={() => handleAction('View', payment)}
                    className="hover:text-blue-600 flex items-center space-x-1"
                  >
                    <Eye className="w-4 h-4" /> <span>View</span>
                  </button>
                  <button
                    onClick={() => handleAction('History', payment)}
                    className="hover:text-blue-600 flex items-center space-x-1"
                  >
                    <History className="w-4 h-4" /> <span>History</span>
                  </button>
                  {payment.status === 'Active' && (
                    <button
                      onClick={() => handleAction('Cancel', payment)}
                      className="hover:text-red-600 flex items-center space-x-1"
                    >
                      <X className="w-4 h-4" /> <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Card View (md:hidden) */}
            <div className="md:hidden space-y-3">
              {/* Top Row: From/To, Amount, Status */}
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {payment.payFrom}{' '}
                    <ChevronRight className="w-3 h-3 inline text-gray-400" />{' '}
                    {payment.payTo}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {payment.date}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-base font-bold text-gray-900">
                    {payment.currency} {payment.amount.toFixed(2)}
                  </div>
                  <div
                    className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between border-t border-gray-100 pt-3">
                <button
                  onClick={() => handleAction('View', payment)}
                  className="text-sm text-blue-600 flex items-center space-x-1 hover:underline"
                >
                  <Eye className="w-4 h-4" /> <span>View</span>
                </button>
                <button
                  onClick={() => handleAction('History', payment)}
                  className="text-sm text-blue-600 flex items-center space-x-1 hover:underline"
                >
                  <History className="w-4 h-4" /> <span>History</span>
                </button>
                {payment.status === 'Active' && (
                  <button
                    onClick={() => handleAction('Cancel', payment)}
                    className="text-sm text-red-600 flex items-center space-x-1 hover:underline"
                  >
                    <X className="w-4 h-4" /> <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default UpcomingPaymentsList;
