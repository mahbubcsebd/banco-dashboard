'use client';

import HeaderTop from '@/components/global/HeaderTop';
import TransferTable from '@/components/transfer-between-accounts/TransferTable';
import TransferToOtherForm from '@/components/transfer-other-finxt/TransferToOtherForm';
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
  {
    id: 2,
    fromAccount: 'CHK 11000982321',
    toAccount: 'Jake',
    date: '10/19/2025 09:23:56',
    reference: 'Ref: 108286',
    amount: 10.0,
    status: 'SUCCESS',
  },
  {
    id: 3,
    fromAccount: 'SAV 21000982321',
    toAccount: 'Payee',
    date: '09/21/2025 09:23:56',
    reference: 'Ref: 101201',
    amount: 30.0,
    status: 'SUCCESS',
  },
];

export default function TransferToOtherFinxactAccount() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTransferSubmit = async (formData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Transfer submitted:', formData);
    setIsSubmitting(false);
  };

  return (
    <div className="">
      <HeaderTop
        title="Transfer to Other Finxact Account"
        text="Easily transfer money to accounts at other banks"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <TransferToOtherForm
        onSubmit={handleTransferSubmit}
        isSubmitting={isSubmitting}
      />

      <TransferTable data={recentTransfersData} />
    </div>
  );
}
