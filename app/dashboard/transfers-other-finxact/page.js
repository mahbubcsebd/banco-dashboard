'use client';

import HeaderTop from '@/components/global/HeaderTop';
import TransferForm from '@/components/transfer-between-accounts/TransferForm';
import TransferTable from '@/components/transfer-between-accounts/TransferTable';
// Import necessary modals (assuming these are available)
import TransferConfirmationModal from '@/components/transfer-between-accounts/TransferConfirmationModal';
import TransferSuccessModal from '@/components/transfer-between-accounts/TransferSuccessModal';

import { useState } from 'react';

// Mock data for recent transfers (unchanged)
const recentTransfersData = [
  // ... your mock data ...
];

export default function TransferBetweenAccounts() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [transferData, setTransferData] = useState(null);

  // --- Fictitious Function to Simulate Fee Calculation/Data Lookup ---
  const simulateDataLookup = (formData) => {
    // Logic from confirmation modal for fee calculation (must be run before opening modal)
    const amountNum = Number(formData.amount) || 0;

    const fees = {
      commission: amountNum * 0.01,
      stamp: amountNum * 0.02,
      taxFee: 1.0,
      tca: 1.0,
      totalFees: amountNum * 0.03 + 2.0,
      totalAmount: amountNum + amountNum * 0.03 + 2.0,
    };

    // Mock lookup for labels (replace with real lookup)
    const fromAccountLabel = 'SAV 210001002331 USD 4,489.33';
    const toAccountLabel = 'SAV 210001002441 USD 6,713.01';

    return {
      ...formData,
      amount: amountNum, // Pass as number
      fromAccountLabel,
      toAccountLabel,
      ...fees,
    };
  };
  // -------------------------------------------------------------------

  // Step 1: Triggered by form submission (opens confirmation modal)
  const handleFormSubmit = (formData) => {
    const dataWithFees = simulateDataLookup(formData);

    setTransferData(dataWithFees);
    setIsConfirmModalOpen(true); // 👈 FIX: Open the confirmation modal
  };

  // Step 2: Triggered by confirmation modal (final API call)
  const handleFinalSubmit = async (finalDataWithFees) => {
    setIsSubmitting(true);
    setIsConfirmModalOpen(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('FINAL TRANSFER SUBMITTED:', finalDataWithFees);

    setTransferData(finalDataWithFees);
    setIsSubmitting(false);
    setIsSuccessModalOpen(true); // 👈 Open the success modal
  };

  return (
    <div className="p-6">
      {/* 🌟 Confirmation Modal - RENDERED HERE 🌟 */}
      <TransferConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        transferData={transferData}
        onConfirm={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />

      {/* 🌟 Success Modal - RENDERED HERE 🌟 */}
      <TransferSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        transferData={transferData}
      />

      <HeaderTop
        title="Transfer Between My Accounts At MCB Bank"
        text="Move money easily between your own accounts"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <TransferForm
        onSubmit={handleFormSubmit} // This now triggers the confirmation flow
        isSubmitting={isSubmitting}
      />

      <TransferTable data={recentTransfersData} />
    </div>
  );
}
