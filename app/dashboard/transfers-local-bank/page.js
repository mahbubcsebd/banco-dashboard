'use client';

import HeaderTop from '@/components/global/HeaderTop';
import TransferTable from '@/components/transfer-between-accounts/TransferTable';
import TransferToOtherForm from '@/components/transfers-local-bank/TranferForm';
import { useState } from 'react';

// 🌟 Import Modal Components 🌟
import TransferToOtherConfirmationModal from '@/components/transfer-other-finxt/TransferToOtherConfirmationModal';
import TransferToOtherSuccessModal from '@/components/transfer-other-finxt/TransferToOtherSuccessModal';

// Mock data for recent transfers (unchanged)
const recentTransfersData = [
  {
    id: 1,
    fromAccount: 'CHK 110001002321',
    toAccount: 'SAV 210001002441',
    date: '11/03/2025 12:31:20',
    reference: 'Ref: 836973',
    amount: 123.45,
    status: 'SUCCESS',
  },
  // ... rest of the mock data
];

// --- Mock Data Lookup Logic ---
const simulateDataLookup = (formData) => {
  const amountNum = Number(formData.amount) || 0;

  // Mock fee calculation (assuming this is done server-side or via a service layer)
  const commission = amountNum * 0.01;
  const stamp = amountNum * 0.02;
  const taxFee = 1.0;
  const tca = 1.0;
  const totalFees = commission + stamp + taxFee + tca;
  const totalAmount = amountNum + totalFees;

  // Mock lookup for labels (replace with real lookup based on selected IDs)
  const fromAccountLabel = 'CURRENT 110001002321 USD 5,744.48';
  const toAccountLabel = 'Local Bank Payee - ACCT 9876';

  return {
    ...formData,
    amount: amountNum,
    fromAccountLabel,
    toAccountLabel,
    commission,
    stamp,
    taxFee,
    tca,
    totalFees,
    totalAmount, // Include fees
  };
};
// ---------------------------------

export default function TransferToOtherLocalBanks() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [transferData, setTransferData] = useState(null);

  // Step 1: Triggered by form submission (opens confirmation modal)
  const handleFormSubmit = (formData) => {
    const dataForModal = simulateDataLookup(formData);
    setTransferData(dataForModal);
    setIsConfirmModalOpen(true); // Open the confirmation modal
  };

  // Step 2: Triggered by confirmation modal (final API call)
  const handleFinalSubmit = async (finalDataWithFees) => {
    setIsSubmitting(true);
    setIsConfirmModalOpen(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('FINAL LOCAL BANK TRANSFER SUBMITTED:', finalDataWithFees);

    setTransferData(finalDataWithFees); // Update data with final fees
    setIsSubmitting(false);
    setIsSuccessModalOpen(true); // Open the success modal
  };

  return (
    <div className="p-6">
      {/* 🌟 1. Confirmation Modal (Rendered Here) 🌟 */}
      <TransferToOtherConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        transferData={transferData}
        onConfirm={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />

      {/* 🌟 2. Success Modal (Rendered Here) 🌟 */}
      <TransferToOtherSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        transferData={transferData}
      />

      <HeaderTop
        title="Transfer To Other Local Banks"
        text="Easily transfer money to accounts of other local banks"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <TransferToOtherForm
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />

      <TransferTable data={recentTransfersData} />
    </div>
  );
}
