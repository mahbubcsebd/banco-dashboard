'use client';

import HeaderTop from '@/components/global/HeaderTop';
import OrderStatementForm from '@/components/order-print-statement/OrderStatementForm';
import { useState } from 'react';

export default function OrderPrintStatementPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Account Info (From screenshot)
  const accountInfo = 'SAVINGS 110001002321 USD 5,705.05';

  const handleOrderSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Print Statement Ordered:', formData);
    setIsSubmitting(false);

    // Handle success (e.g., show toast or success modal)
    alert('Statement order placed successfully!');
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Order Print Statement"
        // Subtitle isn't explicitly in the screenshot, but keeping the layout consistent
        text="Request a printed copy of your monthly account statement"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Order Form */}
      <OrderStatementForm
        accountInfo={accountInfo}
        onSubmit={handleOrderSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
