'use client';

import HeaderTop from '@/components/global/HeaderTop';
import ChangePasswordForm from '@/components/security-password/ChangePasswordForm';
import { useState } from 'react';

export default function ChangePasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call to change password
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Password change attempt:', {
      success: true,
      user: 'Marvin Higgins',
      newPasswordSet: formData.newPassword.length > 0, // Don't log actual passwords
    });
    setIsSubmitting(false);

    // Handle success/error (e.g., show success modal and redirect)
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Change Password"
        text="Update your account password securely"
        link="/dashboard/settings"
        linkText="Back to Settings"
      />

      {/* Change Password Form */}
      <ChangePasswordForm
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
