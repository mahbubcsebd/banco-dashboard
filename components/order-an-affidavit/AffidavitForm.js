'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const branchOptions = [
  { value: 'branch_1', label: 'Branch 1 - Fairfax' },
  { value: 'branch_2', label: 'Branch 2 - Manassas' },
  { value: 'branch_hq', label: 'Headquarters - Main St' },
];

const AffidavitForm = ({ accountInfo, onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    pickupBranch: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (value) => {
    setFormData({ pickupBranch: value });
    setErrors({ pickupBranch: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.pickupBranch)
      newErrors.pickupBranch = 'Please select a pick up branch.';

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
    setFormData({ pickupBranch: '' });
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
        {/* Static Account Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Account
          </label>
          <div className="text-base font-semibold text-gray-900 uppercase leading-relaxed">
            {accountInfo}
          </div>
        </div>

        {/* Pick up Branch Selection */}
        <div className="max-w-lg">
          <GlobalSelect
            label="Pick up Branch"
            required
            placeholder="Select"
            value={formData.pickupBranch}
            onChange={handleChange}
            options={branchOptions}
            error={errors.pickupBranch}
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

export default AffidavitForm;
