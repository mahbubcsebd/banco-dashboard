'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const payeeTypeOptions = [
  { value: 'LocalBank', label: 'Local Bank Transfer' },
  { value: 'International', label: 'International Transfer' },
  { value: 'FinxactAccount', label: 'Finxact Account' },
];

const accountTypeOptions = [
  { value: 'Checking', label: 'Checking' },
  { value: 'Savings', label: 'Savings' },
];

const bankOptions = [
  { value: 'BancoDiCaribe', label: 'Finxact N.V. (Curacao)' },
  { value: 'OtherLocalBank', label: 'Local Bank X' },
];

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'XOF', label: 'XOF' },
];

const PayeeForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    payeeType: '',
    lastNameFirstName: '',
    beneficiaryNickname: '',
    accountNumber: '',
    accountType: '',
    bank: 'BancoDiCaribe', // Default selected
    currency: 'USD', // Default selected
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.payeeType) newErrors.payeeType = 'Payee Type is required.';
    if (!formData.lastNameFirstName.trim())
      newErrors.lastNameFirstName = 'Last Name & First Name are required.';
    if (!formData.beneficiaryNickname.trim())
      newErrors.beneficiaryNickname = 'Beneficiary Nickname is required.';
    if (!formData.accountNumber.trim())
      newErrors.accountNumber = 'Account Number is required.';
    if (!formData.accountType)
      newErrors.accountType = 'Account Type is required.';
    if (!formData.bank) newErrors.bank = 'Bank is required.';
    if (!formData.currency) newErrors.currency = 'Currency is required.';

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
      payeeType: '',
      lastNameFirstName: '',
      beneficiaryNickname: '',
      accountNumber: '',
      accountType: '',
      bank: 'BancoDiCaribe',
      currency: 'USD',
    });
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8  mx-auto" // Added max-width for centered look like the image
    >
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payee Type */}
          <GlobalSelect
            label="Payee Type"
            required
            placeholder="Select"
            value={formData.payeeType}
            onChange={(value) => handleChange('payeeType', value)}
            options={payeeTypeOptions}
            error={errors.payeeType}
          />

          {/* Last Name & First Name */}
          <GlobalInput
            label="Last Name & First Name"
            required
            placeholder="Enter last name & first name"
            value={formData.lastNameFirstName}
            onChange={(e) => handleChange('lastNameFirstName', e.target.value)}
            error={errors.lastNameFirstName}
          />

          {/* Beneficiary Nickname */}
          <GlobalInput
            label="Beneficiary Nickname"
            required
            placeholder="Enter beneficiary nickname"
            value={formData.beneficiaryNickname}
            onChange={(e) =>
              handleChange('beneficiaryNickname', e.target.value)
            }
            error={errors.beneficiaryNickname}
          />

          {/* Account Number */}
          <GlobalInput
            label="Account Number"
            required
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={(e) => handleChange('accountNumber', e.target.value)}
            error={errors.accountNumber}
          />

          {/* Account Type */}
          <GlobalSelect
            label="Account Type"
            required
            placeholder="Select"
            value={formData.accountType}
            onChange={(value) => handleChange('accountType', value)}
            options={accountTypeOptions}
            error={errors.accountType}
          />

          {/* Bank (Defaulted) */}
          <GlobalSelect
            label="Bank"
            required
            placeholder="Select"
            value={formData.bank}
            onChange={(value) => handleChange('bank', value)}
            options={bankOptions}
            error={errors.bank}
          />

          {/* Currency (Defaulted) */}
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

        {/* Buttons (Cancel/Submit) */}
        <div className="flex justify-center gap-4 pt-10 max-w-[400px] mx-auto">
          <Button
            variant="outline"
            onClick={handleReset}
            size="default"
            className="w-full text-sm"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            size="default"
            className="w-full text-sm"
          >
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PayeeForm;
