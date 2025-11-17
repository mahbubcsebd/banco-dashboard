'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

// 1. Account Options-এ Balance যুক্ত করা হয়েছে
const accountOptions = [
  {
    value: 'CHK-110001002321',
    label: 'Checking Account ($5,234.50)',
    balance: 'USD 5,234.50',
  },
  {
    value: 'SAV-210001002331',
    label: 'Savings Account ($12,450.00)',
    balance: 'USD 12,450.00',
  },
  {
    value: 'SAV-210001002441',
    label: 'Savings Plus ($8,900.25)',
    balance: 'USD 8,900.25',
  },
  {
    value: 'SAV-210001002551',
    label: 'Emergency Fund ($15,000.00)',
    balance: 'USD 15,000.00',
  },
];

const frequencyOptions = [
  { value: 'once', label: 'Once' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'halfyearly', label: 'Halfyearly' },
  { value: 'annual', label: 'Annual' },
];

// 2. নতুন Until অপশন যুক্ত করা হয়েছে
const untilOptions = [
  { value: 'furtherNotice', label: 'Further Notice' },
  { value: 'specificDate', label: 'Specific Date' },
];

const TransferForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: '',
    transferType: 'immediate',
    startDate: '',
    howOften: 'once',
    // 3. নতুন state যুক্ত করা হয়েছে
    untilOption: 'furtherNotice',
    untilDate: '',
  });

  const [errors, setErrors] = useState({});

  const isScheduled = formData.transferType === 'scheduled';
  // 4. Recurring Transfer লজিক: scheduled এবং once ছাড়া অন্য কোনো frequency
  const isRecurring = isScheduled && formData.howOften !== 'once';

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleTransferTypeChange = (value) => {
    handleChange('transferType', value);
    if (value === 'immediate') {
      handleChange('startDate', '');
      handleChange('howOften', 'once');
      // Reset new fields
      handleChange('untilOption', 'furtherNotice');
      handleChange('untilDate', '');
    }
  };

  const handleHowOftenChange = (value) => {
    handleChange('howOften', value);
    // Reset Until option if switching from non-recurring to recurring (or vice-versa)
    if (value === 'once') {
      handleChange('untilOption', 'furtherNotice');
      handleChange('untilDate', '');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fromAccount)
      newErrors.fromAccount = 'From account is required.';
    if (!formData.toAccount) newErrors.toAccount = 'To account is required.';
    if (
      formData.fromAccount &&
      formData.toAccount &&
      formData.fromAccount === formData.toAccount
    )
      newErrors.toAccount = 'Accounts must be different.';
    if (!formData.amount) newErrors.amount = 'Amount is required.';
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      newErrors.amount = 'Amount must be positive.';
    if (!formData.description)
      newErrors.description = 'Description is required.';

    // Scheduled Fields Validation
    if (isScheduled) {
      if (!formData.startDate) newErrors.startDate = 'Start date is required.';

      // Validation for Recurring Transfers (How Often != 'once')
      if (isRecurring) {
        if (!formData.untilOption)
          newErrors.untilOption = 'Until condition is required.';
        if (formData.untilOption === 'specificDate' && !formData.untilDate) {
          newErrors.untilDate = 'A specific date is required.';
        }
      }
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
      fromAccount: '',
      toAccount: '',
      amount: '',
      description: '',
      transferType: 'immediate',
      startDate: '',
      howOften: 'once',
      untilOption: 'furtherNotice',
      untilDate: '',
    });
    setErrors({});
  };

  const toAccountOptions = accountOptions.filter(
    (option) => option.value !== formData.fromAccount
  );

  // 5. Selected From Account এর ব্যালেন্স খুঁজে বের করা
  const selectedFromAccount = accountOptions.find(
    (opt) => opt.value === formData.fromAccount
  );
  const availableBalance = selectedFromAccount
    ? selectedFromAccount.balance
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: From Account & To Account */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <GlobalSelect
              label="From Account"
              required
              placeholder="Select account"
              value={formData.fromAccount}
              onChange={(value) => handleChange('fromAccount', value)}
              options={accountOptions}
              error={errors.fromAccount}
            />
            {/* 6. Available Balance Display */}
            {availableBalance && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-gray-500 mt-1"
              >
                Current Available Balance: {availableBalance}
              </motion.p>
            )}
          </div>

          <GlobalSelect
            label="To Account"
            required
            placeholder="Select account"
            value={formData.toAccount}
            onChange={(value) => handleChange('toAccount', value)}
            options={toAccountOptions}
            error={errors.toAccount}
          />
        </div>

        {/* Row 2: Amount & Start Date (Dynamic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount Field (Always present) */}
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

          {/* Start Date Input (Shows ONLY when Scheduled is ON) */}
          {isScheduled ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <GlobalInput
                label="Start Date"
                name="startDate"
                type="date"
                required={isScheduled}
                placeholder="11/18/2025"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                error={errors.startDate}
                className="pr-10"
              />
              {/* <Calendar className="absolute right-3 top-1/2 -mt-1 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" /> */}
            </motion.div>
          ) : (
            <div className="hidden md:block"></div>
          )}
        </div>

        {/* Row 3: Transfer Type Buttons & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Side Container for Transfer Type/How Often/Until */}
          <div className="space-y-4">
            {/* Transfer Type Buttons (Immediate/Scheduled) */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Type
              </label>
              <div className="flex justify-start gap-2 p-1 border border-gray-300 rounded-md bg-gray-50 max-w-[250px]">
                <button
                  type="button"
                  onClick={() => handleTransferTypeChange('immediate')}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors w-full ${
                    !isScheduled
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-transparent text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Immediate
                </button>
                <button
                  type="button"
                  onClick={() => handleTransferTypeChange('scheduled')}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors w-full ${
                    isScheduled
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-transparent text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Scheduled
                </button>
              </div>
            </div>

            {/* How Often (Only shown if Scheduled is selected) */}
            {isScheduled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="pt-2 space-y-4"
              >
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How Often
                </label>
                <div className="flex flex-wrap gap-4">
                  {frequencyOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="howOften"
                        value={option.value}
                        checked={formData.howOften === option.value}
                        onChange={(e) => handleHowOftenChange(e.target.value)}
                        className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-2 focus:ring-orange-100 cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                  {errors.howOften && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.howOften}
                    </p>
                  )}
                </div>

                {/* 7. Conditional Until Fields (Only for recurring, i.e., howOften !== 'once') */}
                {isRecurring && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="pt-4 space-y-4"
                  >
                    {/* Until Option (Further Notice / Specific Date) */}
                    <GlobalSelect
                      label="Until"
                      required
                      placeholder="Select condition"
                      value={formData.untilOption}
                      onChange={(value) => handleChange('untilOption', value)}
                      options={untilOptions}
                      error={errors.untilOption}
                    />

                    {/* Specific Date Input (Only if 'Specific Date' is selected for Until) */}
                    {formData.untilOption === 'specificDate' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        <GlobalInput
                          label="Specific Date"
                          name="untilDate"
                          type="date"
                          required
                          placeholder="11/18/2026"
                          value={formData.untilDate}
                          onChange={(e) =>
                            handleChange('untilDate', e.target.value)
                          }
                          error={errors.untilDate}
                          className="pr-10"
                        />
                        {/* <Calendar className="absolute right-3 top-1/2 -mt-1 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" /> */}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Description (Right Side) */}
          <GlobalInput
            label="Description"
            required
            placeholder="Enter description"
            isTextarea
            rows={isScheduled ? 10 : 7} // Scheduled/Recurring এর জন্য একটু বড় টেক্সট-এরিয়া
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={errors.description}
          />
        </div>

        {/* Buttons (Cancel/Submit) */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="outline"
            onClick={handleReset}
            size="default"
            className="w-full sm:w-auto text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            size="default"
            className="w-full sm:w-auto text-sm bg-orange-500 hover:bg-orange-600 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TransferForm;
