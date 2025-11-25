'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const reasonOptions = [
  { value: 'lost', label: 'Lost' },
  { value: 'stolen', label: 'Stolen' },
  { value: 'destroyed', label: 'Destroyed' },
  { value: 'other', label: 'Other' },
];

const StopCheckPaymentForm = ({
  accountInfo,
  onSubmit,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState({
    checkNumber: '',
    amount: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.checkNumber.trim())
      newErrors.checkNumber = 'Check Number is required.';
    if (!formData.amount) newErrors.amount = 'Amount is required.';
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      newErrors.amount = 'Invalid amount.';

    if (!formData.reason) newErrors.reason = 'Please select a reason.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    setFormData({ checkNumber: '', amount: '', reason: '' });
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Static Account Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            For Account
          </label>
          <div className="text-base font-semibold text-gray-900 uppercase">
            {accountInfo}
          </div>
        </div>

        {/* Row 1: Check Number & Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalInput
            label="Check Number"
            required
            name="checkNumber"
            placeholder="Enter check number"
            value={formData.checkNumber}
            onChange={handleChange}
            error={errors.checkNumber}
          />

          <GlobalInput
            label="Amount"
            required
            name="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            error={errors.amount}
          />
        </div>

        {/* Row 2: Reason (Half Width to match image layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="Reason"
            required
            placeholder="Select"
            value={formData.reason}
            onChange={(value) => handleSelectChange('reason', value)}
            options={reasonOptions}
            error={errors.reason}
          />
          {/* Empty div to maintain grid structure if needed, or just let it take one column */}
          <div className="hidden md:block"></div>
        </div>

        {/* Buttons (Cancel/Submit) */}
        <div className="flex justify-end">
          <div className="flex flex-col sm:flex-row gap-4 pt-6 max-w-[400px]">
            <Button
              variant="outline"
              onClick={handleCancel}
              size="default"
              className="w-full text-sm border-blue-600 text-blue-600 hover:bg-blue-50 h-11"
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
              className="w-full text-sm bg-orange-500 hover:bg-orange-600 text-white h-11"
            >
              Submit
            </Button>
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className="pt-4 text-sm text-gray-800 leading-relaxed">
          <p>
            The stop payment is effective only in case the check has been lost
            or stolen or the payer is in bankruptcy (art. 222 du Code du
            Commerce). MCB Bank cannot be responsible for a false declaration of
            a client.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default StopCheckPaymentForm;
