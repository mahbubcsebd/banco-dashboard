// components/modals/SessionExpiredModal.jsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SessionExpiredModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleOk = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    onClose();
    router.push('/');
  };

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
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full mb-4 sm:mb-6"
          >
            <Clock
              className="w-7 h-7 sm:w-8 sm:h-8 text-orange-600"
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
              Session Expired
            </DialogTitle>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <DialogDescription className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 px-2">
              Your session has expired. Please click OK or reload the browser.
            </DialogDescription>
          </motion.div>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            onClick={handleOk}
            className="w-full py-3 sm:py-3.5 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors font-medium text-sm sm:text-base touch-manipulation"
          >
            OK
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SessionExpiredModal;
