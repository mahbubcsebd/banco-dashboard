'use client';

import HeaderTop from '@/components/global/HeaderTop';
import PayrollSelection from '@/components/payroll-management/PayrollSelection';
import { useState } from 'react';

// --- MOCK DATA ---
const mockAccounts = [
  {
    account: '110001002672',
    name: 'Current',
    currency: 'USD',
    isPayroll: true,
  },
  {
    account: '210001515519',
    name: 'Savings',
    currency: 'USD',
    isPayroll: false,
  },
  {
    account: '210001515520',
    name: 'Savings',
    currency: 'USD',
    isPayroll: false,
  },
  {
    account: '210001515521',
    name: 'Savings',
    currency: 'USD',
    isPayroll: false,
  },
];
// --- MOCK DATA END ---

export default function PayrollManagementPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Find the currently selected payroll account (or default to the first one)
  const initialPayrollAccount =
    mockAccounts.find((acc) => acc.isPayroll)?.account ||
    mockAccounts[0].account;
  const [selectedAccount, setSelectedAccount] = useState(initialPayrollAccount);

  const handleFormSubmit = async (selectedAcc) => {
    setIsSubmitting(true);

    // Simulate API call to set new payroll account
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('New Payroll Account submitted:', selectedAcc);
    setIsSubmitting(false);

    // Handle success/error
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Payroll Management"
        text="Designate an account for receiving your payroll deposits"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Payroll Selection Component */}
      <PayrollSelection
        accounts={mockAccounts}
        initialSelection={initialPayrollAccount}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
