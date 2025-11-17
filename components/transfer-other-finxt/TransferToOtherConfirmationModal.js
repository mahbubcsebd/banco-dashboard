'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Info, X } from 'lucide-react';
import Button from '../login/Button';

// Mock calculation for fees
const calculateFees = (amount) => {
  const commission = amount * 0.01; // 1% commission
  const stamp = amount * 0.02; // 2% stamp
  const taxFee = 1.0; // Fixed tax fee
  const tca = 1.0; // Fixed TCA
  const totalFees = commission + stamp + taxFee + tca;
  const totalAmount = amount + totalFees;

  // Ensure all returns are safe numbers
  return {
    commission: Number(commission) || 0,
    stamp: Number(stamp) || 0,
    taxFee: Number(taxFee) || 0,
    tca: Number(tca) || 0,
    totalFees: Number(totalFees) || 0,
    totalAmount: Number(totalAmount) || 0,
  };
};

const TransferToOtherConfirmationModal = ({
  isOpen,
  onClose,
  transferData,
  onConfirm,
  isSubmitting,
}) => {
  if (!transferData) return null;

  const amountNum = Number(transferData.amount) || 0;
  const fees = calculateFees(amountNum);

  const displayData = [
    { label: 'From Account', value: transferData.fromAccountLabel || 'N/A' },
    { label: 'To Account', value: transferData.toAccountLabel || 'N/A' },
    { label: 'Currency', value: transferData.currency || 'USD' },
    { label: 'Description', value: transferData.description },
    {
      label: 'Amount',
      value: `${transferData.currency} ${amountNum.toFixed(2)}`,
    },
    {
      label: 'When',
      value:
        transferData.transferType === 'immediate' ? 'Immediate' : 'Scheduled',
    },
    { label: 'Commission', value: `USD ${fees.commission.toFixed(2)}` },
    { label: 'Stamp', value: `USD ${fees.stamp.toFixed(2)}` },
    { label: 'Tax Fee', value: `USD ${fees.taxFee.toFixed(2)}` },
    { label: 'TCA', value: `USD ${fees.tca.toFixed(2)}` },
  ];

  const handleConfirm = () => {
    onConfirm({ ...transferData, ...fees });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md w-full p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 border-b border-gray-200 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Confirm Transfer to Other Finxact Account
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="p-6 space-y-4">
          {displayData.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between pb-1 text-sm ${
                index >= 4 ? 'font-medium' : 'font-semibold'
              }`}
            >
              <span className="text-gray-500">{item.label}</span>
              <span className="text-gray-900">{item.value}</span>
            </div>
          ))}

          {/* Total Fees */}
          <div className="flex justify-between font-bold pt-4 text-base border-t border-gray-200">
            <span className="text-gray-800">TOTAL FEES</span>
            <span className="text-gray-900">
              USD {fees.totalFees.toFixed(2)}
            </span>
          </div>

          {/* Review Box */}
          <div className="flex p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500 mt-4">
            <Info className="w-5 h-5 text-orange-600 mr-3 mt-1" />
            <p className="text-sm text-gray-700">
              Please review your transfer details carefully before submitting.
            </p>
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-gray-200">
          <Button
            type="button"
            onClick={handleConfirm}
            variant="primary"
            loading={isSubmitting}
            className="w-full sm:w-auto text-sm bg-orange-500 hover:bg-orange-600 text-white"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferToOtherConfirmationModal;
