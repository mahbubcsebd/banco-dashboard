'use client';

import HeaderTop from '@/components/global/HeaderTop';
import ApprovalsParameters from '@/components/transactions-approvals/ApprovalsParameters';
import { useState } from 'react';

// --- MOCK DATA ---
const mockAccounts = [
  {
    account: '110001002672',
    type: 'Current',
    requiresMultiple: false,
    numSigners: 1,
  },
  {
    account: '210001515519',
    type: 'Savings',
    requiresMultiple: true,
    numSigners: 2,
  },
  {
    account: '210001515520',
    type: 'Savings',
    requiresMultiple: true,
    numSigners: 2,
  },
  {
    account: '210001515521',
    type: 'Savings',
    requiresMultiple: false,
    numSigners: 1,
  },
  {
    account: '310001002197',
    type: 'Time',
    requiresMultiple: false,
    numSigners: 1,
  },
  {
    account: '410001002561',
    type: 'Loan',
    requiresMultiple: true,
    numSigners: 2,
  },
];
// --- MOCK DATA END ---

export default function TransactionsApprovalsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountParams, setAccountParams] = useState(mockAccounts);

  const handleFormSubmit = async (updatedParams) => {
    setIsSubmitting(true);

    // Simulate API call to save new parameters
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Updated Approval Parameters:', updatedParams);
    // Optionally update local state with saved params: setAccountParams(updatedParams);
    setIsSubmitting(false);
    alert('Transaction Approval Parameters Saved!');
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Transactions Approvals Parameters"
        text="Configure the required approval settings for each account"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Approvals Parameters Component */}
      <ApprovalsParameters
        initialParams={accountParams}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
