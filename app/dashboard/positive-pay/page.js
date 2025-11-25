'use client';

import HeaderTop from '@/components/global/HeaderTop';
import PositivePayForm from '@/components/positive-pay/PositivePayForm';
import PositivePayList from '@/components/positive-pay/PositivePayList';
import { useState } from 'react';

export default function PositivePayPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentItems, setRecentItems] = useState([]);

  // Mock Account Info
  const accountInfo = 'SAVINGS 110001002321 USD 5,705.05';

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Positive Pay Submitted:', formData);

    // Add new item to list (Mock logic)
    const newItem = {
      checkNumber: formData.checkNumber,
      description: formData.beneficiaryName,
      amount: `USD ${Number(formData.amount).toFixed(2)}`,
      date: formData.checkIssuedDate,
      status: 'Pending',
    };

    setRecentItems([newItem, ...recentItems]);
    setIsSubmitting(false);

    // Show success message
    alert('Positive Pay details submitted successfully!');
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Positive Pay"
        // Subtitle inferred from context
        text="Protect yourself and others by reporting suspicious activity"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <div className="space-y-8">
        {/* Positive Pay Form */}
        <PositivePayForm
          accountInfo={accountInfo}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />

        {/* Results/History List */}
        <PositivePayList data={recentItems} />
      </div>
    </div>
  );
}
