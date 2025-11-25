'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import Button from '../login/Button';

const CheckStatusForm = ({ accountInfo, onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    checkNumber: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.checkNumber.trim()) {
      newErrors.checkNumber = 'Check Number is required.';
    }
    // Optional: Add numeric validation if check numbers are always numeric
    // else if (isNaN(formData.checkNumber)) newErrors.checkNumber = 'Must be numeric';

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
    setFormData({ checkNumber: '' });
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Static Account Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account
          </label>
          <div className="text-base font-semibold text-gray-900 uppercase">
            {accountInfo}
          </div>
        </div>

        {/* Check Number Input */}
        <div className="max-w-lg">
          <GlobalInput
            label="Check Number"
            name="checkNumber"
            placeholder="Enter check number"
            value={formData.checkNumber}
            onChange={handleChange}
            error={errors.checkNumber}
          />
        </div>

        {/* Buttons */}
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

export default CheckStatusForm;
