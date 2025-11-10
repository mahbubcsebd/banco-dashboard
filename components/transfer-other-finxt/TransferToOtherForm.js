'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const TransferToOtherForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    currency: '',
    description: '',
    transferType: 'immediate',
  });

  const [errors, setErrors] = useState({});

  const accountOptions = [
    { value: 'CHK-110001002321', label: 'Checking Account ($5,234.50)' },
    { value: 'SAV-210001002331', label: 'Savings Account ($12,450.00)' },
    { value: 'SAV-210001002441', label: 'Savings Plus ($8,900.25)' },
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'BDT', label: 'BDT' },
    { value: 'EUR', label: 'EUR' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fromAccount)
      newErrors.fromAccount = 'Please select the from account.';
    if (!formData.toAccount)
      newErrors.toAccount = 'Please select the to account.';
    if (!formData.amount) newErrors.amount = 'Please enter an amount.';
    if (!formData.currency) newErrors.currency = 'Please select a currency.';
    if (!formData.description)
      newErrors.description = 'Please enter a description.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      fromAccount: '',
      toAccount: '',
      amount: '',
      currency: '',
      description: '',
      transferType: 'immediate',
    });
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Accounts */}
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
            label="To Account"
            required
            placeholder="Select"
            value={formData.toAccount}
            onChange={(value) => handleChange('toAccount', value)}
            options={accountOptions}
            error={errors.toAccount}
          />
        </div>

        {/* Amount + Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalInput
            label="Amount"
            type="number"
            placeholder="0.00"
            required
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            error={errors.amount}
          />
          <GlobalSelect
            label="Currency"
            required
            placeholder="Select"
            value={formData.currency}
            onChange={(value) => handleChange('currency', value)}
            options={currencyOptions}
            error={errors.currency}
          />
        </div>

        {/* Transfer type */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="transferType"
              value="immediate"
              checked={formData.transferType === 'immediate'}
              onChange={(e) => handleChange('transferType', e.target.value)}
              className="text-orange-500 focus:ring-orange-200"
            />
            <span>Immediate</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="transferType"
              value="scheduled"
              checked={formData.transferType === 'scheduled'}
              onChange={(e) => handleChange('transferType', e.target.value)}
              className="text-orange-500 focus:ring-orange-200"
            />
            <span>Scheduled</span>
          </label>
        </div>

        {/* Description */}
        <GlobalInput
          label="Description"
          required
          isTextarea
          rows={3}
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
        />

        {/* Buttons */}
        <div className="flex justify-center gap-4 pt-4 max-w-[600px] mx-auto">
          <Button
            variant="secondary"
            onClick={handleReset}
            size="default"
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            size="default"
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TransferToOtherForm;
