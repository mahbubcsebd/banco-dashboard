'use client';

import HeaderTop from '@/components/global/HeaderTop';
import AffidavitForm from '@/components/order-an-affidavit/AffidavitForm';
import { useState } from 'react';

export default function OrderAffidavitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Account Info (From screenshot)
  const accountInfo = 'SAVINGS 110001002321 USD 5,705.05';

  const handleOrderSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Affidavit Ordered:', formData);
    setIsSubmitting(false);

    // Handle success
    alert('Affidavit order placed successfully!');
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Order An Affidavit"
        // Subtitle implied from context
        text="Request an official affidavit for your account"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Order Form */}
      <AffidavitForm
        accountInfo={accountInfo}
        onSubmit={handleOrderSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
