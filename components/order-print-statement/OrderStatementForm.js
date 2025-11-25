'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

// Generate Year Options (e.g., last 5 years)
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 5 }, (_, i) => ({
  value: (currentYear - i).toString(),
  label: (currentYear - i).toString(),
}));

const monthOptions = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const OrderStatementForm = ({
  accountInfo,
  onSubmit,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState({
    year: '',
    month: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.year) newErrors.year = 'Please select a year.';
    if (!formData.month) newErrors.month = 'Please select a month.';

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
    setFormData({ year: '', month: '' });
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Static Account Info Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            For Account
          </label>
          <div className="text-base font-semibold text-gray-900">
            {accountInfo}
          </div>
        </div>

        {/* Year & Month Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="Year"
            placeholder="Select"
            value={formData.year}
            onChange={(value) => handleChange('year', value)}
            options={yearOptions}
            error={errors.year}
          />

          <GlobalSelect
            label="Month"
            placeholder="Select"
            value={formData.month}
            onChange={(value) => handleChange('month', value)}
            options={monthOptions}
            error={errors.month}
          />
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
      </form>
    </motion.div>
  );
};

export default OrderStatementForm;
