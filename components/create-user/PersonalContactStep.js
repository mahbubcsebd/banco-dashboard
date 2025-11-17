'use client';

import GlobalInput from '@/components/global/GlobalInput';
import GlobalSelect from '@/components/global/GlobalSelect';
import Button from '@/components/login/Button';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Mock Data
const stateOptions = [
  { value: 'FL', label: 'Florida' },
  { value: 'NY', label: 'New York' },
];

const PersonalContactStep = ({ onNext, onBack, isSubmitting }) => {
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    officePhoneNumber: '',
    mobilePhoneNumber1: '',
    mobilePhoneNumber2: '',
    personalEmailAddress: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Required.';
    if (!formData.city.trim()) newErrors.city = 'Required.';
    if (!formData.country.trim()) newErrors.country = 'Required.';
    if (!formData.mobilePhoneNumber1.trim())
      newErrors.mobilePhoneNumber1 = 'Required.';
    if (!formData.personalEmailAddress.trim())
      newErrors.personalEmailAddress = 'Required.';
    if (!formData.state) newErrors.state = 'Required.';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData); // Triggers final submission in parent component
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 pt-8"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address 1 & Address 2 */}
          <GlobalInput
            label="Address Line 1"
            required
            placeholder="Enter address line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            error={errors.addressLine1}
          />
          <GlobalInput
            label="Address Line 2"
            placeholder="Enter address line 2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            error={errors.addressLine2}
          />

          {/* City & Country */}
          <GlobalInput
            label="City"
            required
            placeholder="Enter city"
            name="city"
            value={formData.city}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            error={errors.city}
          />
          <GlobalInput
            label="Country"
            required
            placeholder="Enter country"
            name="country"
            value={formData.country}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            error={errors.country}
          />

          {/* State & Zip Code */}
          <GlobalSelect
            label="State"
            required
            placeholder="Select"
            name="state"
            value={formData.state}
            onChange={(v) => handleChange('state', v)}
            options={stateOptions}
            error={errors.state}
          />
          <GlobalInput
            label="Zip code"
            required
            placeholder="Enter zip code"
            name="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            error={errors.zipCode}
          />

          {/* Office Phone & Mobile 1 */}
          <GlobalInput
            label="Office Phone Number"
            placeholder="Enter office phone number"
            name="officePhoneNumber"
            value={formData.officePhoneNumber}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            error={errors.officePhoneNumber}
          />
          <GlobalInput
            label="Mobile Phone Number 1"
            required
            placeholder="Enter mobile phone number 1"
            name="mobilePhoneNumber1"
            value={formData.mobilePhoneNumber1}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            error={errors.mobilePhoneNumber1}
          />

          {/* Mobile 2 & Email */}
          <GlobalInput
            label="Mobile Phone Number 2"
            placeholder="Enter mobile phone number 2"
            name="mobilePhoneNumber2"
            value={formData.mobilePhoneNumber2}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            error={errors.mobilePhoneNumber2}
          />
          <GlobalInput
            label="Personal Email Address"
            required
            type="email"
            placeholder="Enter personal email address"
            name="personalEmailAddress"
            value={formData.personalEmailAddress}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            error={errors.personalEmailAddress}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            size="default"
            className="text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
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
            className="text-sm bg-orange-500 hover:bg-orange-600 text-white"
          >
            Register
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PersonalContactStep;
