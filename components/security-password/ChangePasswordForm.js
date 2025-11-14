'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import Button from '../login/Button';

const ChangePasswordForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    reEnterPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const minLength = 8;

    if (!formData.oldPassword.trim())
      newErrors.oldPassword = 'Current password is required.';

    if (
      !formData.newPassword.trim() ||
      formData.newPassword.length < minLength
    ) {
      newErrors.newPassword = `New password must be at least ${minLength} characters.`;
    }

    if (!formData.reEnterPassword.trim()) {
      newErrors.reEnterPassword = 'Please re-enter the new password.';
    } else if (formData.newPassword !== formData.reEnterPassword) {
      newErrors.reEnterPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(formData);
      setFormData({ oldPassword: '', newPassword: '', reEnterPassword: '' });
    }
  };

  const handleCancel = () => {
    setFormData({ oldPassword: '', newPassword: '', reEnterPassword: '' });
    setErrors({});
    console.log('Password change cancelled/reset.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 max-w-lg mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <GlobalInput
            label="Old Password"
            name="oldPassword"
            type="password"
            required
            placeholder="Enter old password"
            value={formData.oldPassword}
            onChange={handleChange}
            error={errors.oldPassword}
          />

          <GlobalInput
            label="New Password"
            name="newPassword"
            type="password"
            required
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
          />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <GlobalInput
            label="Re-enter New Password"
            name="reEnterPassword"
            type="password"
            required
            placeholder="Re-enter new password"
            value={formData.reEnterPassword}
            onChange={handleChange}
            error={errors.reEnterPassword}
          />
          {/* Empty column for alignment */}
          <div className="hidden md:block"></div>
        </div>

        {/* Buttons (Cancel/Submit) */}
        <div className="flex justify-start gap-4 pt-4 max-w-[400px] mx-auto">
          <Button
            variant="outline"
            onClick={handleCancel}
            size="default"
            className="w-full text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
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
            className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChangePasswordForm;
