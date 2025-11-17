'use client';

import GlobalInput from '@/components/global/GlobalInput';
import GlobalSelect from '@/components/global/GlobalSelect';
import Button from '@/components/login/Button';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Mock Data
const titleOptions = [
  { value: 'Mr', label: 'Mr.' },
  { value: 'Ms', label: 'Ms.' },
  { value: 'Dr', label: 'Dr.' },
];
const roleOptions = [
  { value: 'Admin', label: 'Administrator' },
  { value: 'Viewer', label: 'Viewer' },
  { value: 'Approver', label: 'Approver' },
];

const UserInformationStep = ({ onNext }) => {
  const [formData, setFormData] = useState({
    title: '',
    position: '',
    firstName: '',
    role: '',
    lastName: '',
    userId: '',
    dateOfBirth: '',
    maidenName: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Required.';
    if (!formData.position.trim()) newErrors.position = 'Required.';
    if (!formData.firstName.trim()) newErrors.firstName = 'Required.';
    if (!formData.role) newErrors.role = 'Required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required.';
    if (!formData.userId.trim()) newErrors.userId = 'Required.';
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Required.';
    // Maiden Name is optional
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
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
          {/* Title & Position */}
          <GlobalSelect
            label="Title"
            required
            placeholder="Select"
            value={formData.title}
            onChange={(v) => handleChange('title', v)}
            options={titleOptions}
            error={errors.title}
          />
          <GlobalInput
            label="Position"
            required
            placeholder="Enter position"
            value={formData.position}
            onChange={(e) => handleChange('position', e.target.value)}
            error={errors.position}
          />

          {/* First Name & Role */}
          <div className="relative">
            <GlobalInput
              label="First Name"
              required
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              error={errors.firstName}
            />
            {/* <Info className="absolute right-3 top-1/2 -mt-1 transform -translate-y-1/2 w-4 h-4 text-red-500 cursor-help" /> */}
          </div>
          <GlobalSelect
            label="Role"
            required
            placeholder="Select"
            value={formData.role}
            onChange={(v) => handleChange('role', v)}
            options={roleOptions}
            error={errors.role}
          />

          {/* Last Name & User ID */}
          <div className="relative">
            <GlobalInput
              label="Last Name"
              required
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              error={errors.lastName}
            />
            {/* <Info className="absolute right-3 top-1/2 -mt-1 transform -translate-y-1/2 w-4 h-4 text-red-500 cursor-help" /> */}
          </div>
          <div className="relative">
            <GlobalInput
              label="User ID"
              required
              placeholder="Enter user id"
              value={formData.userId}
              onChange={(e) => handleChange('userId', e.target.value)}
              error={errors.userId}
            />
            {/* <Info className="absolute right-3 top-1/2 -mt-1 transform -translate-y-1/2 w-4 h-4 text-red-500 cursor-help" /> */}
          </div>

          {/* Date of Birth & Maiden Name */}
          <div className="relative">
            <GlobalInput
              label="Date of Birth(mm/dd/yyyy)"
              required
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              error={errors.dateOfBirth}
            />
            {/* <Calendar className="absolute right-3 top-1/2 -mt-1 transform -translate-y-1/2 w-4 h-4 text-red-500 cursor-help" /> */}
          </div>
          <GlobalInput
            label="Maiden Name"
            placeholder="Enter maiden name"
            value={formData.maidenName}
            onChange={(e) => handleChange('maidenName', e.target.value)}
            error={errors.maidenName}
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            type="submit"
            size="default"
            className="w-full sm:w-40 text-sm bg-orange-500 hover:bg-orange-600 text-white"
          >
            Next
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default UserInformationStep;
