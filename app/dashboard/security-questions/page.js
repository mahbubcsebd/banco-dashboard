'use client';

import HeaderTop from '@/components/global/HeaderTop';
import ChallengeQuestionsForm from '@/components/security-questions/ChallengeQuestionsForm';
import { useState } from 'react';

export default function ChallengeQuestionsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call to save security questions
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Challenge Questions saved:', formData);
    setIsSubmitting(false);

    // Handle success/error
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Challenge Questions"
        text="Set up security questions for enhanced account protection"
        link="/dashboard/settings"
        linkText="Back to Settings"
      />

      {/* Challenge Questions Form */}
      <ChallengeQuestionsForm
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
