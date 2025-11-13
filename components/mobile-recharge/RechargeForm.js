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

const topUpNumberOptions = [
  { value: '9876543210', label: '9876543210 (Self)' },
  { value: '1122334455', label: '1122334455 (Contact A)' },
  { value: 'add_new', label: 'Enter New Number...' },
];

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

const popularPlans = [20, 30, 50, 100];

const RechargeForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    topUpNumber: '',
    currency: '',
    rechargeAmount: '',
    comment: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handlePlanSelect = (amount) => {
    handleChange('rechargeAmount', String(amount));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fromAccount)
      newErrors.fromAccount = 'Please select the account to pay from.';
    if (!formData.topUpNumber)
      newErrors.topUpNumber = 'Please select or enter the top-up number.';
    if (!formData.currency) newErrors.currency = 'Please select currency.';
    if (!formData.rechargeAmount)
      newErrors.rechargeAmount = 'Please enter a recharge amount.';
    else if (
      isNaN(formData.rechargeAmount) ||
      Number(formData.rechargeAmount) <= 0
    )
      newErrors.rechargeAmount = 'Amount must be a positive number.';

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
      topUpNumber: '',
      currency: '',
      rechargeAmount: '',
      comment: '',
    });
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Optimized 2-Column Grid for all main fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. From Account */}
          <GlobalSelect
            label="From Account"
            required
            placeholder="Select"
            value={formData.fromAccount}
            onChange={(value) => handleChange('fromAccount', value)}
            options={accountOptions}
            error={errors.fromAccount}
          />

          {/* 2. Top-up Number */}
          <GlobalSelect
            label="Top-up Number"
            required
            placeholder="Select"
            value={formData.topUpNumber}
            onChange={(value) => handleChange('topUpNumber', value)}
            options={topUpNumberOptions}
            error={errors.topUpNumber}
          />

          {/* 3. Currency */}
          <GlobalSelect
            label="Currency"
            required
            placeholder="Select"
            value={formData.currency}
            onChange={(value) => handleChange('currency', value)}
            options={currencyOptions}
            error={errors.currency}
          />

          {/* 4. Recharge Amount */}
          <GlobalInput
            label="Recharge Amount"
            type="number"
            step="0.01"
            required
            placeholder="0.00"
            value={formData.rechargeAmount}
            onChange={(e) => handleChange('rechargeAmount', e.target.value)}
            error={errors.rechargeAmount}
          />
        </div>

        {/* Comment & Popular Recharge Plans (Aligned at the top) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 5. Comment (Textarea) */}
          <GlobalInput
            label="Comment"
            placeholder="Enter comment"
            isTextarea
            rows={4}
            value={formData.comment}
            onChange={(e) => handleChange('comment', e.target.value)}
          />

          {/* 6. Popular Recharge Plans (Aligned to the top) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Popular Recharge Plans
            </label>
            <div className="flex flex-wrap gap-2">
              {popularPlans.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handlePlanSelect(amount)}
                  className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors
                                ${
                                  Number(formData.rechargeAmount) === amount
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-200'
                                }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>
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

export default RechargeForm;
