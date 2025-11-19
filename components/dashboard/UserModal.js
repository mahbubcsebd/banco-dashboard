'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle2 } from 'lucide-react';
import Button from '../login/Button';

// Delete User Modal
export const DeleteUserModal = ({ isOpen, onClose, user, onSubmit }) => {
  const handleConfirm = () => {
    onSubmit(user);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md w-full p-0 gap-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Delete User
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-3">
          {[
            { label: 'First Name', value: user.firstName },
            { label: 'Last Name', value: user.lastName },
            { label: 'User ID', value: user.userId },
            { label: 'Date of Birth', value: user.dateOfBirth },
            { label: 'Email', value: user.email },
            { label: 'Phone', value: user.phone },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between text-sm py-2 border-b last:border-0"
            >
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>

        <DialogFooter className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between w-full gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              size="default"
              className="w-full text-sm border-gray-300 text-gray-700 hover:bg-gray-100"
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              size="default"
              className="w-full text-sm bg-red-600 hover:bg-red-700 text-white"
              type="button"
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Reset Password Modal
export const ResetPasswordModal = ({ isOpen, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm w-full p-0 gap-0">
        <DialogHeader className="p-6 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
            Reset Password
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-0 text-center space-y-4">
          <p className="text-gray-700 text-base">
            Are you sure you want to reset this user's password?
          </p>
        </div>

        <DialogFooter className="p-6 border-t border-gray-200">
          <div className="flex justify-between w-full gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              size="default"
              className="w-full text-sm border-gray-300 text-gray-700 hover:bg-gray-100"
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              size="default"
              className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white"
              type="button"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Deactivate User Modal
export const DeactivateUserModal = ({ isOpen, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm w-full p-0 gap-0">
        <DialogHeader className="p-6 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
            Deactivate User
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-0 text-center space-y-4">
          <p className="text-gray-700 text-base">
            Are you sure you want to deactivate this user?
          </p>
        </div>

        <DialogFooter className="p-6 border-t border-gray-200">
          <div className="flex justify-between w-full gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              size="default"
              className="w-full text-sm border-gray-300 text-gray-700 hover:bg-gray-100"
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              size="default"
              className="w-full text-sm bg-orange-600 hover:bg-orange-700 text-white"
              type="button"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Success Modal
export const SuccessModal = ({
  isOpen,
  onClose,
  confirmationNumber,
  message,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm w-full p-0 gap-0">
        <div className="p-8 text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>

          <DialogTitle className="text-xl font-semibold text-gray-900">
            Success
          </DialogTitle>

          <div className="space-y-3 text-sm">
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Confirmation:</span>{' '}
              <span className="font-mono font-semibold">
                {confirmationNumber}
              </span>
            </p>
            <p className="text-gray-600">{message}</p>
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="primary"
            onClick={onClose}
            size="default"
            className="w-full text-sm bg-gray-900 hover:bg-gray-800 text-white"
            type="button"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
