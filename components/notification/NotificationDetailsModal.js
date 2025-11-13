'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Clock } from 'lucide-react';
import Button from '../login/Button';

const NotificationDetailsModal = ({ isOpen, onClose, messageData }) => {
  const data = messageData || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md w-full p-0 gap-0">
        <DialogHeader className="p-6 border-b border-gray-200 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Notification Details
          </DialogTitle>
          {/* <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button> */}
        </DialogHeader>

        <div className="p-6 space-y-4">
          {/* Subject/Title */}
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
            {data.title || 'Notification'}
          </h3>

          {/* Date */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Date: {data.date || 'N/A'}</span>
          </div>

          {/* Message Content */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-base text-gray-700 whitespace-pre-wrap">
              {data.content || 'No message content available.'}
            </p>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              size="default"
              className="w-auto text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
              type="button"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDetailsModal;
