'use client';

import HeaderTop from '@/components/global/HeaderTop';
import TransferForm from '@/components/transfer-between-accounts/TransferForm';
import TransferTable from '@/components/transfer-between-accounts/TransferTable';
// import HeaderTop from '@/components/HeaderTop';
// import TransferForm from '@/components/TransferForm';
// import TransferTable from '@/components/TransferTable';
import { useState } from 'react';

// Mock data for recent transfers
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
  {
    id: 4,
    fromAccount: 'SAV 210001002331',
    toAccount: 'CHK 110001002321',
    date: '10/27/2025 05:16:45',
    reference: 'Ref: 812319',
    amount: 1.0,
    status: 'SUCCESS',
  },
  {
    id: 5,
    fromAccount: 'CHK 110001002321',
    toAccount: 'SAV 210001002331',
    date: '10/27/2025 02:46:38',
    reference: 'Ref: 847281',
    amount: 1.0,
    status: 'SUCCESS',
  },
  {
    id: 6,
    fromAccount: 'CHK 110001002321',
    toAccount: 'SAV 210001002331',
    date: '10/22/2025 05:13:26',
    reference: 'Ref: 806811',
    amount: 45.37,
    status: 'SUCCESS',
  },
  {
    id: 7,
    fromAccount: 'SAV 210001002331',
    toAccount: 'SAV 210001002441',
    date: '10/06/2025 05:05:02',
    reference: 'Ref: 838762',
    amount: 1.0,
    status: 'SUCCESS',
  },
  {
    id: 8,
    fromAccount: 'CHK 110001002321',
    toAccount: 'SAV 210001002331',
    date: '06/17/2025 08:33:14',
    reference: 'Ref: 572969',
    amount: 124.0,
    status: 'SUCCESS',
  },
  {
    id: 9,
    fromAccount: 'SAV 210001002331',
    toAccount: 'SAV 210001002551',
    date: '06/16/2025 11:32:22',
    reference: 'Ref: 411919',
    amount: 103.45,
    status: 'SUCCESS',
  },
  {
    id: 10,
    fromAccount: 'SAV 101',
    toAccount: 'SAV 92',
    date: '06/10/2025 10:07:40',
    reference: 'Ref: 102174',
    amount: 2.22,
    status: 'SUCCESS',
  },
];

export default function TransferBetweenAccounts() {
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
          title="Transfer Between My Accounts At Finxact"
          text="Move money easily between your own accounts"
          link="/dashboard"
          linkText="Back to Dashboard"
        />

        {/* Transfer Form */}
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
