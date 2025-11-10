'use client';

import HeaderTop from '@/components/global/HeaderTop';
import PayeeForm from '@/components/transfers-manage-payees/PayeeForm';
import { useState } from 'react';

export default function AddPayeePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayeeSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call to add payee
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Payee submitted:', formData);
    setIsSubmitting(false);

    // After success, you might want to redirect or show a success message
  };

  return (
    <div className="">
      <HeaderTop
        title="Add Payee"
        text="Register a new beneficiary for transfers"
        link="/dashboard/transfers"
        linkText="Back to Transfers"
      />

      {/* Payee Registration Form */}
      <PayeeForm onSubmit={handlePayeeSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
