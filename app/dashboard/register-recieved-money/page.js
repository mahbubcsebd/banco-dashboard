'use client';

import HeaderTop from '@/components/global/HeaderTop';
import RegistrationForm from '@/components/register-recieved-money/RegistrationForm';
import { useState } from 'react';

export default function RegisterToReceiveMoneyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistrationSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('P2P Registration submitted:', formData);
    setIsSubmitting(false);

    // Show success message or redirect back to payee list
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Register to Receive Money from Third Party"
        text="Enter your phone number or email address and press 'Search' to receive money into that Account."
        link="/dashboard/p2p-receive"
        linkText="Back to Payee List"
      />

      {/* Registration Form */}
      <RegistrationForm
        onSubmit={handleRegistrationSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
