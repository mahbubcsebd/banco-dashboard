'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Button from '../login/Button';

const AddOtpModal = ({
  isOpen,
  onClose,
  mobileNumber,
  onConfirm,
  isSubmitting,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(mobileNumber);
    }
    // Note: The parent component should handle closing the modal after submission is complete
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-xs w-full p-0 gap-0">
        <DialogHeader className="p-4 border-b border-gray-200 relative">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Add OTP Mobile number
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="p-4 space-y-4">
          {/* Data Display */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Mobile Number</span>
            <span className="font-semibold text-gray-900">{mobileNumber}</span>
          </div>
        </div>

        <DialogFooter className="p-4 border-t border-gray-200">
          <Button
            type="button"
            onClick={handleConfirm}
            variant="primary"
            loading={isSubmitting}
            className="w-full text-sm bg-orange-500 hover:bg-orange-600 text-white"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOtpModal;
