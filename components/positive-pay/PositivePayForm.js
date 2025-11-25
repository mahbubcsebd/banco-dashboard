'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import Button from '../login/Button';

const PositivePayForm = ({ accountInfo, onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    checkNumber: '',
    checkIssuedDate: '',
    amount: '',
    beneficiaryName: '',
    comment: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.checkNumber.trim())
      newErrors.checkNumber = 'Check number is required.';
    if (!formData.checkIssuedDate)
      newErrors.checkIssuedDate = 'Date is required.';
    if (!formData.amount) newErrors.amount = 'Amount is required.';
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      newErrors.amount = 'Invalid amount.';

    if (!formData.beneficiaryName.trim())
      newErrors.beneficiaryName = 'Beneficiary name is required.';
    if (!formData.comment.trim()) newErrors.comment = 'Comment is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(formData);
      // Optionally reset form
      // setFormData({ checkNumber: '', checkIssuedDate: '', amount: '', beneficiaryName: '', comment: '' });
    }
  };

  const handleCancel = () => {
    setFormData({
      checkNumber: '',
      checkIssuedDate: '',
      amount: '',
      beneficiaryName: '',
      comment: '',
    });
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
            Account Number
          </label>
          <div className="text-base font-semibold text-gray-900 uppercase">
            {accountInfo}
          </div>
        </div>

        {/* Row 1: Check Number & Date */}
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

          <div className="relative">
            <GlobalInput
              label="Check Issued Date"
              required
              name="checkIssuedDate"
              type="date"
              placeholder="Enter check issued date"
              value={formData.checkIssuedDate}
              onChange={handleChange}
              error={errors.checkIssuedDate}
              className="pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 -mt-1 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer pointer-events-none" />
          </div>
        </div>

        {/* Row 2: Amount & Beneficiary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <GlobalInput
            label="Beneficiary Name"
            required
            name="beneficiaryName"
            placeholder="Enter beneficiary name"
            value={formData.beneficiaryName}
            onChange={handleChange}
            error={errors.beneficiaryName}
          />
        </div>

        {/* Row 3: Comment (Full Width) */}
        <GlobalInput
          label="Comment"
          required
          name="comment"
          placeholder="Enter comment"
          value={formData.comment}
          onChange={handleChange}
          error={errors.comment}
        />

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

export default PositivePayForm;
