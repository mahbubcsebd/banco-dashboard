'use client';

import HeaderTop from '@/components/global/HeaderTop';
import ThirdPartyTransferForm from '@/components/p2p-send/ThirdPartyTransferForm';
import { useState } from 'react';

export default function SendMoneyToThirdPartyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTransferSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Third Party Transfer submitted:', formData);
    setIsSubmitting(false);

    // Show success message or handle error
  };

  return (
    <div className="">
      <HeaderTop
        title="Send Money to Third Party"
        text="Send money quickly and securely to friends, family, and contacts"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Third Party Transfer Form */}
      <ThirdPartyTransferForm
        onSubmit={handleTransferSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
