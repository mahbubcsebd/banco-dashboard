'use client';

import HeaderTop from '@/components/global/HeaderTop';
import FileUploadForm from '@/components/secure-upload/FileUploadForm';
import { useState } from 'react';

export default function SecureFileUploadPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = async (formData) => {
    setIsSubmitting(true);

    // Simulate file processing and API call
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log('File Upload submitted:', formData);
    setIsSubmitting(false);

    // Show success message or handle error
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Secure File Upload"
        text="Upload sensitive documents securely to your account"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* File Upload Form */}
      <FileUploadForm onSubmit={handleFileUpload} isSubmitting={isSubmitting} />
    </div>
  );
}
