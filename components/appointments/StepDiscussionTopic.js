'use client';

import GlobalInput from '@/components/global/GlobalInput'; // Added GlobalInput for Reason
import GlobalSelect from '@/components/global/GlobalSelect';
import Button from '@/components/login/Button';
import { motion } from 'framer-motion';
import { useState } from 'react';

const serviceOptions = [
  { value: 'Loan Specialist', label: 'Loan Specialist' },
  { value: 'Account Manager', label: 'Account Manager' },
  { value: 'Investment Advisor', label: 'Investment Advisor' },
  { value: 'General Banking', label: 'General Banking' },
];

const StepDiscussionTopic = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    service: '',
    reason: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.service) newErrors.service = 'Service selection is required.';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Combine data for next step
    onNext({ discussionTopic: formData.service, reason: formData.reason });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-4 pt-8"
    >
      <h3 className="text-lg font-semibold text-gray-800">Discussion Topic</h3>
      <form onSubmit={handleNext} className="max-w-md space-y-6">
        {/* Service Select */}
        <GlobalSelect
          label="Service"
          required
          placeholder="Select"
          value={formData.service}
          onChange={(value) => handleChange('service', value)}
          options={serviceOptions}
          error={errors.service}
        />

        {/* Reason Input */}
        <GlobalInput
          label="Reason"
          required
          placeholder="Enter reason"
          value={formData.reason}
          onChange={(e) => handleChange('reason', e.target.value)}
          error={errors.reason}
          isTextarea
          rows={3}
        />

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            size="default"
            className="text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
            type="button"
          >
            Back
          </Button>
          <Button
            variant="primary"
            type="submit"
            size="default"
            className="text-sm bg-orange-500 hover:bg-orange-600 text-white"
          >
            Next
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default StepDiscussionTopic;
