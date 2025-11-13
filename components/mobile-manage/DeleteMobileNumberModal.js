'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import Button from '../login/Button';

const DeleteMobileNumberModal = ({
  isOpen,
  onClose,
  numberData,
  onConfirm,
}) => {
  const data = numberData || {};

  const handleConfirm = () => {
    onConfirm(data.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md w-full p-0 gap-0">
        <DialogHeader className="p-6 border-b border-gray-200 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Delete Mobile Number
          </DialogTitle>
          {/* <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button> */}
        </DialogHeader>

        <div className="p-6 space-y-5 text-sm">
          {/* Confirmation Message */}
          <p className="text-red-600 font-medium text-center flex items-center justify-center space-x-2">
            <Trash2 className="w-5 h-5" />
            <span>Are you sure you want to delete this number?</span>
          </p>

          {/* Data Display */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Nickname</span>
              <span className="font-medium text-gray-900">{data.nickname}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Mobile Number</span>
              <span className="font-medium text-gray-900">
                {data.mobileNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Mobile Carrier</span>
              <span className="font-medium text-gray-900">
                {data.mobileCarrier}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-gray-200">
          <div className="flex justify-end w-full">
            {/* Only Submit button as per image */}
            <Button
              variant="primary"
              onClick={handleConfirm}
              size="default"
              className="w-full text-sm bg-orange-500 hover:bg-orange-600 text-white"
              type="button"
            >
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMobileNumberModal;
