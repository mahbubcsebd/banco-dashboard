'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

// Shadcn-style Dialog Components
const DialogOverlay = ({ onClick }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
  />
);

const DialogContent = ({ children, onClose }) => (
  <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-lg">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  </div>
);

// Delete User Modal
export const DeleteUserModal = ({ user, onClose, onSubmit }) => {
  return (
    <>
      <DialogOverlay onClick={onClose} />
      <DialogContent onClose={onClose}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Delete User</h2>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {[
            { label: 'First Name', value: user.firstName },
            { label: 'Last Name', value: user.lastName },
            { label: 'User ID', value: user.userId },
            { label: 'Date of Birth', value: user.dateOfBirth },
            { label: 'Email', value: user.email },
            { label: 'Phone', value: user.phone },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between text-sm py-2 border-b last:border-0"
            >
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(user)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </>
  );
};

// Reset Password Modal
export const ResetPasswordModal = ({ onClose, onConfirm }) => {
  return (
    <>
      <DialogOverlay onClick={onClose} />
      <DialogContent onClose={onClose}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Reset Password</h2>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 text-center">
          <p className="text-sm text-gray-600">
            Are you sure you want to reset this user's password?
          </p>
        </div>

        <div className="flex gap-2 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </DialogContent>
    </>
  );
};

// Deactivate User Modal
export const DeactivateUserModal = ({ onClose, onConfirm }) => {
  return (
    <>
      <DialogOverlay onClick={onClose} />
      <DialogContent onClose={onClose}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Deactivate User</h2>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 text-center">
          <p className="text-sm text-gray-600">
            Are you sure you want to deactivate this user?
          </p>
        </div>

        <div className="flex gap-2 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </DialogContent>
    </>
  );
};

// Success Modal
export const SuccessModal = ({ onClose, confirmationNumber, message }) => {
  return (
    <>
      <DialogOverlay onClick={onClose} />
      <DialogContent onClose={onClose}>
        <div className="p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>

          <h2 className="text-lg font-semibold mb-4">Success</h2>

          <div className="space-y-3 text-sm">
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Confirmation:</span>{' '}
              <span className="font-mono">{confirmationNumber}</span>
            </p>
            <p className="text-gray-600">{message}</p>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            OK
          </button>
        </div>
      </DialogContent>
    </>
  );
};
