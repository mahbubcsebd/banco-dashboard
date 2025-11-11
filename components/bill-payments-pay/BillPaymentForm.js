'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button'; // Assuming this Button component is available

const accountOptions = [
  { value: '210001002331', label: 'Savings Account (***2331)' },
  { value: '110001002321', label: 'Checking Account (***2321)' },
];

const billerOptions = [
  { value: 'HSBC', label: 'HSBC Corp' },
  { value: 'ElectricityCo', label: 'Electricity Co.' },
  { value: 'WaterCo', label: 'Water Utilities' },
];

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

const BillPaymentForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    payFrom: '',
    payBill: '',
    currency: '',
    amount: '',
    referenceNumber: '',
    description: '',
    transferType: 'immediate',
    saveAsTemplate: false,
    billTemplateName: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.payFrom)
      newErrors.payFrom = 'Please select account to pay from.';
    if (!formData.payBill) newErrors.payBill = 'Please select the biller.';
    if (!formData.currency) newErrors.currency = 'Please select currency.';
    if (!formData.amount) newErrors.amount = 'Please enter an amount.';
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      newErrors.amount = 'Amount must be a positive number.';
    if (!formData.referenceNumber.trim())
      newErrors.referenceNumber = 'Reference Number is required.';

    if (formData.saveAsTemplate && !formData.billTemplateName.trim()) {
      newErrors.billTemplateName =
        'Template Name is required when saving as template.';
    }

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
      payFrom: '',
      payBill: '',
      currency: '',
      amount: '',
      referenceNumber: '',
      description: '',
      transferType: 'immediate',
      saveAsTemplate: false,
      billTemplateName: '',
    });
    setErrors({});
  };

  const transferTypeOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'scheduled', label: 'Scheduled' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 mx-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Pay Bills</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pay From & Pay Bill */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="Pay From"
            required
            placeholder="Select"
            value={formData.payFrom}
            onChange={(value) => handleChange('payFrom', value)}
            options={accountOptions}
            error={errors.payFrom}
          />

          <GlobalSelect
            label="Pay Bill"
            required
            placeholder="Select"
            value={formData.payBill}
            onChange={(value) => handleChange('payBill', value)}
            options={billerOptions}
            error={errors.payBill}
          />
        </div>

        {/* Currency & Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="Currency"
            required
            placeholder="Select"
            value={formData.currency}
            onChange={(value) => handleChange('currency', value)}
            options={currencyOptions}
            error={errors.currency}
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

        {/* Reference Number & Description/Transfer Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalInput
            label="Reference Number"
            required
            placeholder="Enter reference number"
            value={formData.referenceNumber}
            onChange={(e) => handleChange('referenceNumber', e.target.value)}
            error={errors.referenceNumber}
          />
        </div>
        <div className="grid grid-cols-1 gap-6">
          {/* Transfer type */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="transferType"
                value="immediate"
                checked={formData.transferType === 'immediate'}
                onChange={(e) => handleChange('transferType', e.target.value)}
                className="text-orange-500 focus:ring-orange-200"
              />
              <span>Immediate</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="transferType"
                value="scheduled"
                checked={formData.transferType === 'scheduled'}
                onChange={(e) => handleChange('transferType', e.target.value)}
                className="text-orange-500 focus:ring-orange-200"
              />
              <span>Scheduled</span>
            </label>
          </div>
          <GlobalInput
            label="Description"
            isTextarea
            rows="3"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        {/* Save as Template Checkbox */}
        <div className="flex items-center pt-2">
          <input
            id="saveAsTemplate"
            name="saveAsTemplate"
            type="checkbox"
            checked={formData.saveAsTemplate}
            onChange={(e) => handleChange('saveAsTemplate', e.target.checked)}
            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <label
            htmlFor="saveAsTemplate"
            className="ml-2 block text-sm text-gray-900"
          >
            Save as Bill Template
          </label>
        </div>

        {/* Bill Template Name (Conditional Field) */}
        {formData.saveAsTemplate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GlobalInput
              label="Bill Template Name"
              required
              placeholder="Enter bill template name"
              value={formData.billTemplateName}
              onChange={(e) => handleChange('billTemplateName', e.target.value)}
              error={errors.billTemplateName}
            />
          </motion.div>
        )}

        {/* Buttons (Cancel/Submit) */}
        <div className="flex justify-center gap-4 pt-4 max-w-[400px] mx-auto">
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

export default BillPaymentForm;
