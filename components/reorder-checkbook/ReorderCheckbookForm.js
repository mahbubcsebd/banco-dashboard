'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const bindingOptions = [
  { value: 'single', label: 'Single' },
  { value: 'duplicate', label: 'Duplicate' },
  { value: 'top_stub', label: 'Top Stub' },
];

const branchOptions = [
  { value: 'branch_1', label: 'Branch 1 - Fairfax' },
  { value: 'branch_2', label: 'Branch 2 - Manassas' },
  { value: 'branch_4', label: 'Branch 4 - Ponte Vedra Beach' },
  { value: 'branch_5', label: 'Branch 5 - Main St' },
];

const ReorderCheckbookForm = ({
  accountInfo,
  onSubmit,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState({
    binding: '',
    deliveryBranch: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.binding) newErrors.binding = 'Please select a binding type.';
    if (!formData.deliveryBranch)
      newErrors.deliveryBranch = 'Please select a delivery branch.';

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
    setFormData({ binding: '', deliveryBranch: '' });
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
            For Account
          </label>
          <div className="text-base font-semibold text-gray-900">
            {accountInfo}
          </div>
        </div>

        {/* Binding & Delivery Branch Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="Binding"
            required
            placeholder="Select"
            value={formData.binding}
            onChange={(value) => handleChange('binding', value)}
            options={bindingOptions}
            error={errors.binding}
          />

          <GlobalSelect
            label="Delivery Branch"
            required
            placeholder="Select"
            value={formData.deliveryBranch}
            onChange={(value) => handleChange('deliveryBranch', value)}
            options={branchOptions}
            error={errors.deliveryBranch}
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

export default ReorderCheckbookForm;
