'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Button from '../login/Button';

const DeleteMessageModal = ({ isOpen, onClose, messageData, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm(messageData.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm w-full p-0 gap-0">
        <DialogHeader className="p-6 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
            Delete
          </DialogTitle>
          {/* <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button> */}
        </DialogHeader>

        <div className="p-6 pt-0 text-center space-y-4">
          <p className="text-gray-700 text-base font-medium">
            Are you sure you want to delete this message?
          </p>
        </div>

        <DialogFooter className="p-6 border-t border-gray-200">
          <div className="flex justify-between w-full gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              size="default"
              className="w-full text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              size="default"
              className="w-full text-sm bg-orange-500 hover:bg-orange-600 text-white"
              type="button"
            >
              Yes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMessageModal;
