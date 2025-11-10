'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const TransferForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    currency: '', // NEW FIELD based on image
    description: '',
    transferType: 'immediate',
  });

  const [errors, setErrors] = useState({});

  // From Account options (your original structure)
  const accountOptions = [
    { value: 'CHK-110001002321', label: 'Checking Account ($5,234.50)' },
    { value: 'SAV-210001002331', label: 'Savings Account ($12,450.00)' },
    { value: 'SAV-210001002441', label: 'Savings Plus ($8,900.25)' },
    { value: 'SAV-210001002551', label: 'Emergency Fund ($15,000.00)' },
  ];

  // Currency options (NEW FIELD based on image)
  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'XOF', label: 'XOF' },
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
    if (
      formData.fromAccount &&
      formData.toAccount &&
      formData.fromAccount === formData.toAccount
    )
      newErrors.toAccount = 'To account must be different from from account.';
    if (!formData.amount) newErrors.amount = 'Please enter an amount.';
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      newErrors.amount = 'Amount must be a positive number.';
    if (!formData.currency) newErrors.currency = 'Please select a currency.'; // Validation for new field
    if (!formData.description)
      newErrors.description = 'Please enter a description.';
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
      toAccount: '',
      amount: '',
      currency: '', // Reset new field
      description: '',
      transferType: 'immediate',
    });
    setErrors({});
  };

  const toAccountOptions = accountOptions.filter(
    (option) => option.value !== formData.fromAccount
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: From Account & To Account (Original Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="From" // Changed label to match image
            required
            placeholder="Select"
            value={formData.fromAccount}
            onChange={(value) => handleChange('fromAccount', value)}
            options={accountOptions}
            error={errors.fromAccount}
          />

          <GlobalSelect
            label="To" // Changed label to match image
            required
            placeholder="Select"
            value={formData.toAccount}
            onChange={(value) => handleChange('toAccount', value)}
            options={toAccountOptions}
            error={errors.toAccount}
          />
        </div>

        {/* Row 2: Amount & Currency (NEW ROW to incorporate Currency, keeping the original 2-column structure) */}
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
          <GlobalSelect
            label="Currency" // NEW FIELD
            required
            placeholder="Select"
            value={formData.currency}
            onChange={(value) => handleChange('currency', value)}
            options={currencyOptions}
            error={errors.currency}
          />
        </div>

        <div className="space-y-6">
          {/* Transfer Type (Original Radio Button structure) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Transfer Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="transferType"
                  value="immediate"
                  checked={formData.transferType === 'immediate'}
                  onChange={(e) => handleChange('transferType', e.target.value)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-2 focus:ring-orange-100 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  Immediate
                </span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="transferType"
                  value="scheduled"
                  checked={formData.transferType === 'scheduled'}
                  onChange={(e) => handleChange('transferType', e.target.value)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-2 focus:ring-orange-100 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  Scheduled
                </span>
              </label>
            </div>
          </div>
        </div>

        <GlobalInput
          label="Description"
          required
          placeholder="Enter description"
          isTextarea // Keeping original structure's textarea for Description
          rows={3}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
        />

        {/* Buttons (Cancelled/Submit) */}
        <div className="flex justify-center gap-4 pt-4 max-w-[600px] mx-auto">
          <Button
            variant="outline"
            onClick={handleReset}
            size="default"
            className="w-full text-sm hover:bg-blue-50"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            size="default"
            className="w-full text-sm hover:bg-blue-50"
          >
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TransferForm;
