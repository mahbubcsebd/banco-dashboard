'use client';

import HeaderTop from '@/components/global/HeaderTop';
import ReorderCheckbookForm from '@/components/reorder-checkbook/ReorderCheckbookForm';
import { useState } from 'react';

export default function ReorderCheckbookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Account Info (From screenshot)
  const accountInfo = 'SAVINGS 110001002321 USD 5,705.05';

  const handleReorderSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Checkbook Reorder Request:', formData);
    setIsSubmitting(false);

    // Show success message
    alert('Checkbook reorder request submitted successfully!');
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Reorder Checkbook"
        text="Request a new checkbook for your account"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Reorder Form */}
      <ReorderCheckbookForm
        accountInfo={accountInfo}
        onSubmit={handleReorderSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
