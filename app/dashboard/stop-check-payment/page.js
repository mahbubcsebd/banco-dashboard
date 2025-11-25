'use client';

import HeaderTop from '@/components/global/HeaderTop';
import StopCheckPaymentForm from '@/components/stop-check-payment/StopCheckPaymentForm';
import { useState } from 'react';

export default function StopCheckPaymentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Account Info (From screenshot)
  const accountInfo = 'SAVINGS 110001002321 USD 5,705.05';

  const handleStopPaymentSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Stop Payment Requested:', formData);
    setIsSubmitting(false);

    // Handle success
    alert('Stop payment request submitted successfully!');
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Stop Check Payment"
        // Subtitle implied from context or blank if not needed
        text="Request to stop payment on an issued check"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Stop Payment Form */}
      <StopCheckPaymentForm
        accountInfo={accountInfo}
        onSubmit={handleStopPaymentSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
