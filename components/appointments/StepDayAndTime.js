'use client';

import GlobalInput from '@/components/global/GlobalInput';
import GlobalSelect from '@/components/global/GlobalSelect';
import Button from '@/components/login/Button';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Mock availability data (same as the image's times)
const mockAvailableTimes = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '03:30 PM',
];

// Placeholder for location data (must be passed from parent)
const mockLocationOptions = [
  {
    value: 'Branch 5',
    label: 'Branch 5 250 A1A N Suite 300, Ponte Vedra Beach, FL United States',
  },
];

const StepDayAndTime = ({ onNext, onBack, selectedLocation }) => {
  const [formData, setFormData] = useState({
    location: mockLocationOptions[0].value, // Pre-selected location from step 1
    date: '2025-11-13', // Mock date as seen in image
    time: '',
  });
  const [errors, setErrors] = useState({});

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({ ...prev, time: time }));
    setErrors((prev) => ({ ...prev, time: '' }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.time) newErrors.time = 'Time is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Combine data for next step
    onNext({ appointmentDate: formData.date, appointmentTime: formData.time });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-4 pt-8"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        Check Availability
      </h3>

      <form onSubmit={handleNext} className="max-w-2xl space-y-6">
        {/* Check Availability Location (Select/Readonly) */}
        <GlobalSelect
          label="Check Availability"
          required
          placeholder="Select"
          value={formData.location}
          onChange={(value) => handleChange('location', value)}
          options={mockLocationOptions}
          error={errors.location}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Input */}
          <GlobalInput
            label="Date"
            required
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            error={errors.date}
          />

          {/* Available Times */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available times on: {formData.date}
            </label>
            <div className="grid grid-cols-3 gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50 max-h-48 overflow-y-auto">
              {mockAvailableTimes.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeSelect(time)}
                  className={`px-2 py-2 text-sm font-medium rounded transition-colors border
                                ${
                                  formData.time === time
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                >
                  {time}
                </button>
              ))}
            </div>
            {errors.time && (
              <p className="text-sm text-red-500 mt-1">{errors.time}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            size="default"
            className="text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
            type="button"
          >
            Back
          </Button>
          <Button
            variant="primary"
            type="submit"
            size="default"
            className="text-sm bg-orange-500 hover:bg-orange-600 text-white"
          >
            Next
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default StepDayAndTime;
