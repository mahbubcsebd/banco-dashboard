// app/dashboard/modals/page.jsx
'use client';

import ErrorModal from '@/components/modals/ErrorModal';
import SessionExpiredModal from '@/components/modals/SessionExpiredModal';
import SuccessModal from '@/components/modals/SuccessModal';
import { motion } from 'framer-motion';
import { AlertCircle, Check, Clock, Eye } from 'lucide-react';
import { useState } from 'react';

export default function ModalsPage() {
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const modalCards = [
    {
      id: 'session',
      title: 'Session Expired',
      description:
        'Displayed when user session expires or authentication fails',
      icon: Clock,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      onClick: () => setShowSessionExpired(true),
    },
    {
      id: 'success',
      title: 'Success Message',
      description: 'Shows successful operations and confirmations',
      icon: Check,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      onClick: () => setShowSuccess(true),
    },
    {
      id: 'error',
      title: 'Error Message',
      description: 'Displays errors, failures, or validation messages',
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      onClick: () => setShowError(true),
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Modal Components
        </h1>
        <p className="text-gray-500">Click on any card to preview the modal</p>
      </motion.div>

      {/* Modal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modalCards.map((modal, index) => (
          <motion.div
            key={modal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={modal.onClick}
            className="cursor-pointer group"
          >
            <div
              className={`bg-white rounded-xl p-6 border-2 ${modal.borderColor} hover:shadow-lg transition-all`}
            >
              {/* Icon */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 ${modal.bgColor} rounded-lg group-hover:scale-110 transition-transform`}
                >
                  <modal.icon
                    className={`w-6 h-6 ${modal.iconColor}`}
                    strokeWidth={2.5}
                  />
                </div>
                <Eye className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {modal.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{modal.description}</p>

              {/* Preview Button */}
              <button className="w-full py-2.5 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm">
                Preview Modal
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-white rounded-xl p-6 border border-gray-200"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-gray-900">
                Simple & Clean Design
              </p>
              <p className="text-gray-600">
                Minimal design that matches your theme
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-gray-900">Smooth Animations</p>
              <p className="text-gray-600">Subtle Framer Motion animations</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-gray-900">Orange Theme</p>
              <p className="text-gray-600">
                Consistent orange-500 color scheme
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="font-semibold text-gray-900">Fully Responsive</p>
              <p className="text-gray-600">Works perfectly on all devices</p>
            </div>
          </div>
        </div>
      </motion.div> */}

      {/* Modals */}
      <SessionExpiredModal
        isOpen={showSessionExpired}
        onClose={() => setShowSessionExpired(false)}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Payment Successful!"
        message="Your transaction has been processed successfully."
      />

      <ErrorModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Transaction Failed"
        message="We couldn't process your payment. Please try again."
        onRetry={() => {
          setShowError(false);
          setTimeout(() => setShowSuccess(true), 300);
        }}
      />
    </div>
  );
}
