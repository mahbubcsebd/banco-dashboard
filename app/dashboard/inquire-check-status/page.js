'use client';

import HeaderTop from '@/components/global/HeaderTop';
import CheckStatusForm from '@/components/inquire-check-status/CheckStatusForm';
import CheckStatusResults from '@/components/inquire-check-status/CheckStatusResults';
import { useState } from 'react';

export default function InquireCheckStatusPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkData, setCheckData] = useState(null);

  // Mock Account Info
  const accountInfo = 'SAVINGS 110001002321 USD 5,705.05';

  const handleInquireSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call to fetch check status
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Searching for Check Number:', formData.checkNumber);

    // Mock result data
    const mockResult = [
      {
        checkNumber: formData.checkNumber,
        description: 'Payment to Vendor ABC',
        amount: 'USD 500.00',
        date: '11/20/2025',
        status: 'Cleared',
      },
    ];

    setCheckData(mockResult);
    setIsSubmitting(false);
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Inquire Check Status"
        text="Check the status of your issued checks"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <div className="space-y-8">
        {/* Inquiry Form */}
        <CheckStatusForm
          accountInfo={accountInfo}
          onSubmit={handleInquireSubmit}
          isSubmitting={isSubmitting}
        />

        {/* Results Section (Always visible headers as per image, data populates after search) */}
        <CheckStatusResults data={checkData} />
      </div>
    </div>
  );
}
