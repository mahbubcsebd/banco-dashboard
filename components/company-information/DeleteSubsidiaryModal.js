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

const DeleteSubsidiaryModal = ({
  isOpen,
  onClose,
  subsidiaryData,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm(subsidiaryData.id); // Pass ID to parent delete function
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm w-full p-0 gap-0">
        <DialogHeader className="p-6 border-b border-gray-200 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Delete Subsidiary
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-5 text-center space-y-4">
          <p className="font-semibold text-gray-800 text-base">
            Are you sure you want to delete the subsidiary:{' '}
            <span className="text-red-600 block mt-1">
              '{subsidiaryData?.name}'?
            </span>
          </p>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
        </div>

        <DialogFooter className="p-6 border-t border-gray-200 flex justify-between">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="w-full sm:w-auto text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            variant="primary"
            className="w-full sm:w-auto text-sm bg-red-600 hover:bg-red-700 text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSubsidiaryModal;
