'use client';

import HeaderTop from '@/components/global/HeaderTop';
import ContactInfoForm from '@/components/profile-personal/ContactInfoForm';
import { useState } from 'react';

// Mock Initial Data (based on the screenshot)
const initialContactData = {
  firstName: 'Marvin',
  lastName: 'Higgins',
  address1: '44 Main St',
  address2: '',
  city: '',
  zipCode: '35332',
  mobileNumber: '2138751267',
  emailAddress: 'tester2@moadbusglobal.com',
};

export default function ContactInformationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call to update contact information
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Contact Information updated:', formData);
    setIsSubmitting(false);

    // Show success message or handle error
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Contact Information"
        text="Review and update your personal contact details securely"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Contact Information Form */}
      <ContactInfoForm
        initialData={initialContactData}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
