'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const reasonOptions = [
  { value: 'unauthorized_transaction', label: 'Unauthorized Transaction' },
  { value: 'phishing_attempt', label: 'Phishing Attempt (Email/SMS)' },
  { value: 'stolen_credentials', label: 'Stolen Login Credentials' },
  { value: 'suspicious_activity', label: 'General Suspicious Activity' },
];

const ReportFraudForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    reason: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.reason)
      newErrors.reason = 'Please select a reason for reporting.';
    if (!formData.message.trim())
      newErrors.message = 'Please enter a detailed message.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(formData);
      // Reset form on submit attempt
      setFormData({ reason: '', message: '' });
    }
  };

  const handleCancel = () => {
    setFormData({ reason: '', message: '' });
    setErrors({});
    console.log('Report cancelled/reset.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 max-w-xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Reason Select */}
        <GlobalSelect
          label="Reason"
          required
          placeholder="Select"
          value={formData.reason}
          onChange={(value) => handleChange('reason', value)}
          options={reasonOptions}
          error={errors.reason}
        />

        {/* Message Textarea */}
        <GlobalInput
          label="Message"
          required
          placeholder="Enter message"
          isTextarea
          rows={6}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          error={errors.message}
        />

        {/* Buttons (Cancel/Submit - Orange theme as seen in image) */}
        <div className="flex justify-start gap-4 pt-4 max-w-xs mx-auto">
          <Button
            variant="outline"
            onClick={handleCancel}
            size="default"
            className="w-full text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
            type="button"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            size="default"
            className="w-full text-sm bg-orange-500 hover:bg-orange-600 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReportFraudForm;
