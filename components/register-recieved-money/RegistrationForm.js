'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const accountOptions = [
  { value: '210001002331', label: 'Savings Account (***2331)' },
  { value: '110001002321', label: 'Checking Account (***2321)' },
  { value: '210001002551', label: 'Emergency Fund (***2551)' },
];

const contactOptions = [
  { value: 'email', label: 'Email Address' },
  { value: 'phone', label: 'Phone Number' },
];

const RegistrationForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    receiveAccount: '',
    contactType: '', // To handle the Email/Phone Select box
    contactValue: '', // The actual email or phone input (implied by image structure)
  });

  const [errors, setErrors] = useState({});
  const [isContactInputVisible, setIsContactInputVisible] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));

    // Logic to show/hide contact value input based on contact type selection
    if (field === 'contactType') {
      setIsContactInputVisible(!!value);
      handleChange('contactValue', ''); // Clear the contact value when type changes
    }
  };

  // Custom input component for the actual contact value (Email/Phone)
  const ContactValueInput = () => {
    let label, placeholder, type;

    if (formData.contactType === 'email') {
      label = 'Email Address *';
      placeholder = 'Enter email address';
      type = 'email';
    } else if (formData.contactType === 'phone') {
      label = 'Phone Number *';
      placeholder = 'Enter phone number (e.g., 123-456-7890)';
      type = 'tel';
    } else {
      return null; // Should not happen if select is working
    }

    return (
      <GlobalInput
        label={label}
        type={type}
        required
        placeholder={placeholder}
        value={formData.contactValue}
        onChange={(e) => handleChange('contactValue', e.target.value)}
        error={errors.contactValue}
      />
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nickname.trim()) newErrors.nickname = 'Nickname is required.';
    if (!formData.receiveAccount)
      newErrors.receiveAccount = 'Receiving Account is required.';

    if (!formData.contactType)
      newErrors.contactType = 'Please select Email or Phone.';

    if (!formData.contactValue.trim()) {
      newErrors.contactValue = `${
        formData.contactType === 'email' ? 'Email Address' : 'Phone Number'
      } is required.`;
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
      nickname: '',
      receiveAccount: '',
      contactType: '',
      contactValue: '',
    });
    setErrors({});
    setIsContactInputVisible(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nickname & Receiving Account */}
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
            label="Receiving Account"
            required
            placeholder="Select"
            value={formData.receiveAccount}
            onChange={(value) => handleChange('receiveAccount', value)}
            options={accountOptions}
            error={errors.receiveAccount}
          />
        </div>

        {/* Contact Type Select */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="Email Address/Phone Number"
            required
            placeholder="Select"
            value={formData.contactType}
            onChange={(value) => handleChange('contactType', value)}
            options={contactOptions}
            error={errors.contactType}
          />

          {/* Contact Value Input (Conditionally rendered) */}
          {isContactInputVisible && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContactValueInput />
            </motion.div>
          )}

          {/* Placeholder if Contact Type is selected but contact input is not aligned (for aesthetic on desktop) */}
          {!isContactInputVisible && <div className="hidden md:block"></div>}
        </div>

        {/* Buttons (Image only shows Cancel, but we assume Submit is needed) */}
        <div className="flex justify-center gap-4 pt-4 max-w-[400px] mx-auto">
          <Button
            variant="outline"
            onClick={handleReset}
            size="default"
            className="w-full text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Cancel
          </Button>
          {/* Assuming a Submit button is implied/hidden, use it for the form action */}
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            size="default"
            className="w-full text-sm bg-orange-500 hover:bg-orange-600 text-white hidden" // Hidden, but used by form
          >
            Register
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default RegistrationForm;
