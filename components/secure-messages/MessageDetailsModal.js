'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const MessageDetailsModal = ({ isOpen, onClose, messageData }) => {
  const data = messageData || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-xl w-full p-0 gap-0">
        <DialogHeader className="p-6 border-b border-gray-200 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Message Details
          </DialogTitle>
          {/* <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button> */}
        </DialogHeader>

        <div className="p-6">
          {/* Date and Subject */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <p className="text-sm text-gray-500 mb-1">{data.date}</p>
            <h3 className="text-lg font-bold text-gray-900">
              {data.subject || 'Consumer loan'}
            </h3>
          </div>

          {/* Message Content */}
          <div className="space-y-4">
            <p className="text-base text-gray-700 whitespace-pre-wrap">
              {data.content || 'Sample reply'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetailsModal;
