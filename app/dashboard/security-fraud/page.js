'use client';

import HeaderTop from '@/components/global/HeaderTop';
import ReportFraudForm from '@/components/security-fraud/ReportFraudForm';
import { useState } from 'react';

export default function ReportFraudPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call to submit fraud report
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log('Fraud Report submitted:', formData);
    setIsSubmitting(false);

    // Show success message and reset form
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Report Fraud"
        text="Protect yourself and others by reporting suspicious activity"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Fraud Report Form */}
      <ReportFraudForm
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
