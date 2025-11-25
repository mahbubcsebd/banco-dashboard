'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

// Mock Options
const accountOptions = [
  { value: '110001002321', label: 'SAVINGS 110001002321 USD 5,705.05' },
  { value: '210001005555', label: 'CHECKING 210001005555 USD 12,450.00' },
];

const typeOptions = [
  { value: 'Domestic', label: 'Domestic' },
  { value: 'International', label: 'International' },
];

const branchOptions = [
  { value: 'branch_1', label: 'Branch 1 - Fairfax' },
  { value: 'branch_2', label: 'Branch 2 - Manassas' },
  { value: 'branch_hq', label: 'Headquarters - Main St' },
];

const CashierCheckForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    beneficiary: '',
    address: '',
    type: 'Domestic', // Default as per image
    amount: '',
    pickupBranch: '',
    memo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fromAccount)
      newErrors.fromAccount = 'Please select an account.';
    if (!formData.beneficiary.trim())
      newErrors.beneficiary = 'Beneficiary name is required.';
    if (!formData.type) newErrors.type = 'Please select a type.';
    if (!formData.amount) newErrors.amount = 'Amount is required.';
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      newErrors.amount = 'Invalid amount.';

    if (!formData.pickupBranch)
      newErrors.pickupBranch = 'Please select a branch.';
    if (!formData.memo.trim()) newErrors.memo = 'Memo is required.';

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
    setFormData({
      fromAccount: '',
      beneficiary: '',
      address: '',
      type: 'Domestic',
      amount: '',
      pickupBranch: '',
      memo: '',
    });
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 max-w-5xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: From Account & Beneficiary */}
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

          <GlobalInput
            label="Beneficiary"
            required
            placeholder="Enter beneficiary"
            value={formData.beneficiary}
            onChange={(e) => handleChange('beneficiary', e.target.value)}
            error={errors.beneficiary}
          />
        </div>

        {/* Row 2: Address (Full Width) */}
        <GlobalInput
          label="Address"
          placeholder="Enter address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          // Address doesn't have an asterisk in the image, so usually optional, but standard input
        />

        {/* Row 3: Type & Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="Type"
            required
            placeholder="Select"
            value={formData.type}
            onChange={(value) => handleChange('type', value)}
            options={typeOptions}
            error={errors.type}
          />

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

        {/* Row 4: Pickup Branch & Memo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="Branch to Pick Up Check"
            required
            placeholder="Select"
            value={formData.pickupBranch}
            onChange={(value) => handleChange('pickupBranch', value)}
            options={branchOptions}
            error={errors.pickupBranch}
          />

          <GlobalInput
            label="Memo"
            required
            placeholder="Enter memo"
            value={formData.memo}
            onChange={(e) => handleChange('memo', e.target.value)}
            error={errors.memo}
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

export default CashierCheckForm;
