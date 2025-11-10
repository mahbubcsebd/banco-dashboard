'use client';

import HeaderTop from '@/components/global/HeaderTop';
import TransferTable from '@/components/transfer-between-accounts/TransferTable';
import TransferForm from '@/components/transfers-local-bank/TranferForm';
// import TransferForm from '@/components/transfers-local-bank/TransferForm';
import { useState } from 'react';

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
  {
    id: 2,
    fromAccount: 'CHK 110001002321',
    toAccount: 'SAV 210001002331',
    date: '11/03/2025 05:53:32',
    reference: 'Ref: 115091',
    amount: 10.0,
    status: 'SUCCESS',
  },
  {
    id: 3,
    fromAccount: 'CHK 110001002321',
    toAccount: 'SAV 210001002331',
    date: '10/29/2025 02:03:56',
    reference: 'Ref: 835535',
    amount: 10.0,
    status: 'SUCCESS',
  },
  // ... rest of the mock data
];

export default function TransferToOtherLocalBanks() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTransferSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Transfer submitted:', formData);
    setIsSubmitting(false);

    // Show success message or handle error
  };

  return (
    <div className="">
      {/* Main Content */}
      <div className="">
        <HeaderTop
          title="Transfer To Other Local Banks" // Changed title
          text="Easily transfer money to accounts of other local banks" // Changed text
          link="/dashboard"
          linkText="Back to Dashboard"
        />

        {/* Transfer Form (The form's content logic is updated below) */}
        <TransferForm
          onSubmit={handleTransferSubmit}
          isSubmitting={isSubmitting}
        />

        {/* Recent Transfers Table */}
        <TransferTable data={recentTransfersData} />
      </div>
    </div>
  );
}
