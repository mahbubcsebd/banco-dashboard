'use client';

import Logo from '@/assets/icons/finxact.svg';
import GlobalInput from '@/components/global/GlobalInput';
import GlobalSelect from '@/components/global/GlobalSelect';
import LanguageSelector from '@/components/global/LanguageSelector';
import Button from '@/components/login/Button';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ForgotUserIDPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('personal');
  const [identificationType, setIdentificationType] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      customerNumber: '',
      mobileNumber: '',
      email: '',
      dateOfBirth: '',
      identificationType: '',
    },
  });

  const onSubmit = async (data) => {
    if (!identificationType) {
      alert('Please select identification type');
      return;
    }

    setLoading(true);
    console.log({ ...data, userType, identificationType });
    setTimeout(() => {
      setLoading(false);
      // Handle success
    }, 1500);
  };

  const identificationTypes = [
    { value: 'passport', label: 'Passport' },
    { value: 'national_id', label: 'National ID' },
    { value: 'drivers_license', label: "Driver's License" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop)',
        }}
      />

      {/* Opacity Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-500/20 via-white/60 to-orange-500/20 backdrop-blur-sm" />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-10"
        />
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl z-10"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/login"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>

            <LanguageSelector />
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src={Logo}
              alt="logo"
              className="h-8 sm:h-10 w-auto object-cover"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Forgot User ID
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* User Type Radio Buttons - Orange Theme */}
            <div className="flex items-center gap-6 sm:gap-12 justify-center pb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  value="personal"
                  checked={userType === 'personal'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500 focus:ring-2 cursor-pointer"
                  style={{ accentColor: '#f97316' }}
                />
                <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                  Personal User
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  value="corporate"
                  checked={userType === 'corporate'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500 focus:ring-2 cursor-pointer"
                  style={{ accentColor: '#f97316' }}
                />
                <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                  Corporate User
                </span>
              </label>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Customer Number */}
              <GlobalInput
                label="Customer Number"
                type="text"
                placeholder="Enter customer number"
                required
                {...register('customerNumber', {
                  required: 'Customer number is required',
                  minLength: {
                    value: 6,
                    message: 'Must be at least 6 characters',
                  },
                })}
                error={errors.customerNumber?.message}
              />

              {/* Mobile Number */}
              <GlobalInput
                label="Mobile Number"
                type="tel"
                placeholder="Enter mobile number"
                required
                {...register('mobileNumber', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: 'Enter valid mobile number',
                  },
                })}
                error={errors.mobileNumber?.message}
              />

              {/* Email Address */}
              <GlobalInput
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                required
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={errors.email?.message}
              />

              {/* Date of Birth */}
              <GlobalInput
                label="Date of Birth"
                type="date"
                placeholder="mm/dd/yyyy"
                required
                {...register('dateOfBirth', {
                  required: 'Date of birth is required',
                })}
                error={errors.dateOfBirth?.message}
              />
            </div>

            {/* Identification Type - Custom GlobalSelect */}
            <GlobalSelect
              label="Identification Type"
              placeholder="Select"
              required
              options={identificationTypes}
              value={identificationType}
              onChange={(value) => {
                setIdentificationType(value);
                setValue('identificationType', value);
              }}
              error={!identificationType && errors.identificationType?.message}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                size="default"
                className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                onClick={() => router.push('/login')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="default"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400 font-medium">
              COPYRIGHT © 2025 FINXACT
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotUserIDPage;
