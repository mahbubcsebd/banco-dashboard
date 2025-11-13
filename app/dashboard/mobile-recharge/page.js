'use client';

import HeaderTop from '@/components/global/HeaderTop';
import RechargeForm from '@/components/mobile-recharge/RechargeForm';
import { useState } from 'react';

export default function MobileRechargePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRechargeSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Mobile Recharge submitted:', formData);
    setIsSubmitting(false);

    // Show success message
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Mobile Recharge"
        text="Top-up any mobile number"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Recharge Form */}
      <RechargeForm
        onSubmit={handleRechargeSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
