// components/modals/ErrorModal.jsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const ErrorModal = ({ isOpen, onClose, title, message, onRetry }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md w-full p-0 gap-0">
        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button> */}

        {/* Content */}
        <div className="text-center p-6 sm:p-8">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full mb-4 sm:mb-6"
          >
            <AlertCircle
              className="w-7 h-7 sm:w-8 sm:h-8 text-red-600"
              strokeWidth={2.5}
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">
              {title || 'Error Occurred'}
            </DialogTitle>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <DialogDescription className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 px-2">
              {message || 'Something went wrong. Please try again.'}
            </DialogDescription>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full py-3 sm:py-3.5 px-6 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 active:bg-orange-100 transition-colors font-medium text-sm sm:text-base touch-manipulation"
              >
                Try Again
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full py-3 sm:py-3.5 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors font-medium text-sm sm:text-base touch-manipulation"
            >
              Close
            </button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
