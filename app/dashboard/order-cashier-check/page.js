'use client';

import HeaderTop from '@/components/global/HeaderTop';
import CashierCheckForm from '@/components/order-cashier-check/CashierCheckForm';
import { useState } from 'react';

export default function OrderCashierCheckPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Cashier Check Ordered:', formData);
    setIsSubmitting(false);

    // Handle success
    alert('Cashier Check order placed successfully!');
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Order Cashier Check"
        // Subtitle implied from context
        text="Request a cashier check from your account"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Order Form */}
      <CashierCheckForm
        onSubmit={handleOrderSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
