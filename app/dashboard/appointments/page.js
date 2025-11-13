'use client';

import StepContactInfo from '@/components/appointments/StepContactInfo';
import StepDayAndTime from '@/components/appointments/StepDayAndTime';
import StepDiscussionTopic from '@/components/appointments/StepDiscussionTopic';
import StepIndicator from '@/components/appointments/StepIndicator';
import StepLocation from '@/components/appointments/StepLocation';
import HeaderTop from '@/components/global/HeaderTop';
import { motion } from 'framer-motion'; // For smooth transition
import { useState } from 'react';

// --- MOCK DATA ---
const branchData = [
  {
    id: 1,
    name: 'Branch 1',
    address: '11180 Lee Highway, Fairfax, VA-22030',
    type: 'Branch',
  },
  {
    id: 2,
    name: 'Branch 2',
    address: '9200 Centreville Rd, Manassas, VA',
    type: 'Branch',
  },
  {
    id: 3,
    name: 'Branch 4',
    address: '252 A1A N Suite 300, Ponte Vedra Beach, FL, United States',
    type: 'Branch',
  },
  { id: 4, name: 'Finxact ATM 1', address: 'Finxact ATM 1', type: 'ATM' },
  {
    id: 5,
    name: 'Branch 5',
    address: '250 A1A N Suite 300, Ponte Vedra Beach, FL, United States',
    type: 'Branch',
  },
  {
    id: 6,
    name: 'Branch 6',
    address: '256 A1A N Suite 300, Ponte Vedra Beach, FL, United States',
    type: 'Branch',
  },
  {
    id: 15,
    name: 'Branch 15',
    address: '276 A1A N Suite 300, Ponte Vedra Beach, FL, United States',
    type: 'Branch',
  },
];
// --- MOCK DATA END ---

export default function ScheduleAppointmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    { id: 1, name: 'Location' },
    { id: 2, name: 'Discussion Topic' },
    { id: 3, name: 'Day and Time' },
    { id: 4, name: 'Contact Information' },
  ];

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit({ ...formData, ...data });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (finalData) => {
    setIsSubmitting(true);

    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Final Appointment Data:', finalData);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepLocation onNext={handleNext} branchData={branchData} />;
      case 2:
        return <StepDiscussionTopic onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <StepDayAndTime onNext={handleNext} onBack={handleBack} />;
      case 4:
        return (
          <StepContactInfo
            onNext={handleNext}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Schedule an Appointment"
        text="Meet with our banking specialists for personalized assistance"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <StepIndicator steps={steps} currentStep={currentStep} />

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-12 space-y-4"
          >
            <h4 className="text-2xl font-bold text-green-600">
              Appointment Scheduled!
            </h4>
            <p className="text-gray-700">
              Your appointment has been successfully confirmed. A specialist
              will contact you soon.
            </p>
            <Button
              variant="primary"
              onClick={() => setIsSuccess(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
            >
              Go Back
            </Button>
          </motion.div>
        ) : (
          renderStep()
        )}
      </motion.div>
    </div>
  );
}
