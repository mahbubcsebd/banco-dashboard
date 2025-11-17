'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Check, Printer } from 'lucide-react';
import Button from '../login/Button';

const TransferSuccessModal = ({ isOpen, onClose, transferData }) => {
  // 🌟 FIX 1: If transferData is null or undefined, return null immediately.
  // This prevents accessing nested properties like transferData.amount.
  if (!transferData) return null;

  // Use the safely available data
  const confirmationNumber = '222028032';

  // Helper to safely get fixed value or default string
  const getFixedValue = (value) => {
    // 🌟 FIX 2: Check if value is a valid number before calling toFixed
    const safeValue = Number(value);
    return isNaN(safeValue) ? 'N/A' : safeValue.toFixed(2);
  };

  // Data structures using the safe helper
  const displayData = [
    { label: 'Confirmation Number', value: confirmationNumber },
    { label: 'From Account', value: transferData.fromAccountLabel },
    { label: 'To Account', value: transferData.toAccountLabel },
    { label: 'Description', value: transferData.description },
    { label: 'Amount', value: `USD ${getFixedValue(transferData.amount)}` },
  ];

  const feesData = [
    {
      label: 'Commission',
      value: `USD ${getFixedValue(transferData.commission)}`,
    },
    { label: 'Stamp', value: `USD ${getFixedValue(transferData.stamp)}` },
    { label: 'Tax Fee', value: `USD ${getFixedValue(transferData.taxFee)}` },
    { label: 'TCA', value: `USD ${getFixedValue(transferData.tca)}` },
    {
      label: 'Total Fees',
      value: `USD ${getFixedValue(transferData.totalFees)}`,
    },
  ];

  const handlePrint = () => {
    console.log('Printing transfer confirmation...');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md w-full p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
          >
            <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
          </motion.div>

          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b pb-3 mx-auto max-w-xs">
            Transfer Between My Accounts At Finxact Bank
          </DialogTitle>

          {/* Main Details */}
          <div className="space-y-3 text-sm text-gray-700 font-semibold mb-6">
            {displayData.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-500 font-medium">{item.label}</span>
                <span className="text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Fees Details */}
          <div className="space-y-2 text-sm text-gray-700 mb-6 border-t pt-4">
            {feesData.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-500 font-medium">{item.label}</span>
                <span className="text-gray-900">{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-base border-t pt-2">
              <span className="text-gray-800">TOTAL COST</span>
              <span className="text-gray-900">
                {getFixedValue(transferData.totalAmount)}
              </span>
            </div>
          </div>

          {/* Done Button and Print Icon */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <Button
              type="button"
              onClick={onClose}
              variant="primary"
              className="w-40 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Done
            </Button>
            <button
              onClick={handlePrint}
              className="text-gray-400 hover:text-blue-600"
            >
              <Printer className="w-6 h-6" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferSuccessModal;
