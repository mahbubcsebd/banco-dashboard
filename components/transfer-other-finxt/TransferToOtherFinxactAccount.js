'use client';

import HeaderTop from '@/components/global/HeaderTop';
import TransferTable from '@/components/transfer-between-accounts/TransferTable'; // Reusing TransferTable
import TransferToOtherConfirmationModal from '@/components/transfer-other-finxt/TransferToOtherConfirmationModal';
import TransferToOtherForm from '@/components/transfer-other-finxt/TransferToOtherForm';
import TransferToOtherSuccessModal from '@/components/transfer-other-finxt/TransferToOtherSuccessModal';
import { useState } from 'react';

// Mock data (you can replace later with API data)
const recentTransfersData = [
  {
    id: 1,
    fromAccount: 'CHK 11000982321',
    toAccount: 'Jaz',
    date: '10/29/2025 09:23:56',
    reference: 'Ref: 109103',
    amount: 10.0,
    status: 'SUCCESS',
  },
];

export default function TransferToOtherFinxactAccount() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [transferData, setTransferData] = useState(null);

  // Step 1: Triggered by form submission (opens confirmation modal)
  const handleFormSubmit = (formData) => {
    // Mock lookup for labels (replace with real lookup)
    const fromAccountLabel = 'CURRENT 110001002321 USD 5,744.48';
    const toAccountLabel = 'SAVINGS 210001002331 USD 6,733.01';

    setTransferData({
      ...formData,
      amount: Number(formData.amount) || 0, // Ensure amount is number
      fromAccountLabel,
      toAccountLabel,
    });
    setIsConfirmModalOpen(true);
  };

  // Step 2: Triggered by confirmation modal (final API call)
  const handleFinalSubmit = async (finalDataWithFees) => {
    setIsSubmitting(true);
    setIsConfirmModalOpen(false);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('FINAL TRANSFER SUBMITTED:', finalDataWithFees);

    setTransferData(finalDataWithFees);
    setIsSubmitting(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="p-6">
      <TransferToOtherConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        transferData={transferData}
        onConfirm={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />

      <TransferToOtherSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        transferData={transferData}
      />

      <HeaderTop
        title="Transfer to Other Finxact Account"
        text="Easily transfer money to accounts at other banks"
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
