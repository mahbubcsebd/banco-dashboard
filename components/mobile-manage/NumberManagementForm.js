'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const carrierOptions = [
  { value: 'UTS', label: 'UTS' },
  { value: 'Digicel', label: 'Digicel' },
  { value: 'Chippie', label: 'Chippie' },
];

const NumberManagementForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    mobileCarrier: '',
    mobileNumber: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nickname.trim()) newErrors.nickname = 'Nickname is required.';
    if (!formData.mobileCarrier)
      newErrors.mobileCarrier = 'Mobile Carrier is required.';
    if (!formData.mobileNumber.trim() || isNaN(formData.mobileNumber.trim()))
      newErrors.mobileNumber = 'Valid Mobile Number is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(formData);
      // Reset form after successful submission
      setFormData({ nickname: '', mobileCarrier: '', mobileNumber: '' });
    }
  };

  const handleReset = () => {
    setFormData({ nickname: '', mobileCarrier: '', mobileNumber: '' });
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nickname & Mobile Carrier */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalInput
            label="Nickname"
            required
            placeholder="Enter nickname"
            value={formData.nickname}
            onChange={(e) => handleChange('nickname', e.target.value)}
            error={errors.nickname}
          />

          <GlobalSelect
            label="Mobile Carrier"
            required
            placeholder="Select"
            value={formData.mobileCarrier}
            onChange={(value) => handleChange('mobileCarrier', value)}
            options={carrierOptions}
            error={errors.mobileCarrier}
          />
        </div>

        {/* Mobile Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalInput
            label="Mobile Number"
            required
            placeholder="Enter mobile number"
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => handleChange('mobileNumber', e.target.value)}
            error={errors.mobileNumber}
          />
        </div>

        {/* Buttons (Cancel/Save) */}
        <div className="flex justify-start gap-4 pt-4 max-w-[400px] mx-auto">
          <Button
            variant="outline"
            onClick={handleReset}
            size="default"
            className="w-full text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            size="default"
            className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Number
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default NumberManagementForm;
