'use client';

import StepIndicator from '@/components/appointments/StepIndicator'; // Reusing your StepIndicator
import PersonalContactStep from '@/components/create-user/PersonalContactStep';
import UserInformationStep from '@/components/create-user/UserInformationStep';
import HeaderTop from '@/components/global/HeaderTop';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CreateUserPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    { id: 1, name: 'User Information' },
    { id: 2, name: 'Personal Contact Info' },
  ];

  // --- Navigation and Submission Handlers ---

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
    await new Promise((resolve) => setTimeout(resolve, 2500));

    console.log('New User Data Submitted:', finalData);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // --- Render Logic ---

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UserInformationStep onNext={handleNext} />;
      case 2:
        return (
          <PersonalContactStep
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
        title="Create User"
        text="Set up a new user account for your business"
        link="/dashboard/user-admin"
        linkText="Back to User Administration"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-4xl mx-auto"
      >
        <div className="max-w-md mx-auto">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            // Basic step change handling for this simple 2-step process
          />
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-12 space-y-4"
          >
            <h4 className="text-2xl font-bold text-green-600">
              User Created Successfully!
            </h4>
            <p className="text-gray-700">
              The new user account has been registered.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
                setFormData({});
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white mt-4"
            >
              Create Another User
            </Button>
          </motion.div>
        ) : (
          renderStep()
        )}
      </motion.div>
    </div>
  );
}
