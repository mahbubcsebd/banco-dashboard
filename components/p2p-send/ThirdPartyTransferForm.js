'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const accountOptions = [
  { value: 'CHK-110001002321', label: 'Checking Account ($5,234.50)' },
  { value: 'SAV-210001002331', label: 'Savings Account ($12,450.00)' },
];

const recipientOptions = [
  { value: 'john.doe@example.com', label: 'John Doe (john.doe@example.com)' },
  { value: '1234567890', label: 'Jane Smith (123-456-7890)' },
  { value: 'add_new', label: 'Add New Recipient...' },
];

const ThirdPartyTransferForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    recipient: '',
    amount: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fromAccount)
      newErrors.fromAccount = 'Please select the account to send from.';
    if (!formData.recipient)
      newErrors.recipient = 'Please select or enter the recipient.';
    if (!formData.amount) newErrors.amount = 'Please enter an amount.';
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      newErrors.amount = 'Amount must be a positive number.';
    // Description is optional as per image's lack of asterisk

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      fromAccount: '',
      recipient: '',
      amount: '',
      description: '',
    });
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* From Account & Email Address/Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="From Account"
            required
            placeholder="Select"
            value={formData.fromAccount}
            onChange={(value) => handleChange('fromAccount', value)}
            options={accountOptions}
            error={errors.fromAccount}
          />

          <GlobalSelect
            label="Email Address/Phone Number"
            required
            placeholder="Select"
            value={formData.recipient}
            onChange={(value) => handleChange('recipient', value)}
            options={recipientOptions}
            error={errors.recipient}
          />
        </div>

        {/* Amount & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalInput
            label="Amount"
            type="number"
            step="0.01"
            required
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            error={errors.amount}
          />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <GlobalInput
            label="Description"
            isTextarea
            rows="3"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        {/* Buttons (Cancel/Submit) */}
        <div className="flex justify-center gap-4 pt-4 max-w-[400px] mx-auto">
          <Button
            variant="outline"
            onClick={handleReset}
            size="default"
            className="w-full text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
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

export default ThirdPartyTransferForm;
