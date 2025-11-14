'use client';

import Logo from '@/assets/icons/finxact.svg';
import LanguageSelector from '@/components/global/LanguageSelector';
import Button from '@/components/login/Button';
import MobileQuickActions from '@/components/login/MobileQuickActions';
import OTPModal from '@/components/login/OTPModal';
import PasswordInput from '@/components/login/PasswordInput';
import { motion } from 'framer-motion';
import { Building2, LogIn, User, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  // New state for showing messages (Success/Error) on the main page
  const [statusMessage, setStatusMessage] = useState({
    isVisible: false,
    type: '', // 'success' or 'error'
    text: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      userId: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    // Clear any previous status message when starting a new login attempt
    setStatusMessage({ isVisible: false, type: '', text: '' });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Login data:', data);
      setShowOtpModal(true);
    }, 1000);
  };

  const handleOtpVerify = (otp) => {
    console.log('OTP verification initiated with:', otp);
    // 1. Close the OTP modal
    setShowOtpModal(false);

    // --- STATIC TEST LOGIC (Success: '1234', Error: anything else) ---
    const isSuccessful = false;

    // Simulate a delay for the API call after OTP submission
    setTimeout(() => {
      if (isSuccessful) {
        // SUCCESS CASE
        setStatusMessage({
          isVisible: true,
          type: 'success',
          text: 'Login Successful! You are being redirected to your dashboard.',
        });

        // Reset the form after successful login
        reset();

        // You would typically redirect the user here
        // setTimeout(() => {
        //   router.push('/dashboard');
        // }, 2000);
      } else {
        // ERROR CASE
        setStatusMessage({
          isVisible: true,
          type: 'error',
          text: 'OTP Verification Failed. The code is incorrect or expired. Please sign in again.',
        });
        // Reset form on error as well (optional)
        reset();
      }
    }, 500); // Small delay to simulate server check
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background and Animated Elements */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop)',
        }}
      />
      <div className="fixed inset-0 bg-linear-to-br from-orange-500/20 via-white/60 to-orange-500/20 backdrop-blur-sm" />
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

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg z-10"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 lg:p-8 xl:p-10 border border-white/20">
          {/* Language Selector */}
          <div className="flex justify-end mb-4 lg:mb-6">
            <LanguageSelector />
          </div>

          {/* Logo and Branding */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-4 md:mb-8"
          >
            <Link href="/" className="inline-block">
              <motion.div
                variants={itemVariants}
                className="flex justify-center md:mb-4 w-[140px] lg:w-[180px] mx-auto"
              >
                <Image
                  src={Logo}
                  alt="logo"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </Link>
            <motion.div
              variants={itemVariants}
              className="mt-6 mb-2 hidden md:block"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome Back
              </h2>
            </motion.div>
          </motion.div>

          {/* --- STATUS MESSAGE DISPLAY --- */}
          {statusMessage.isVisible && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg mb-6 border ${
                statusMessage.type === 'success'
                  ? 'bg-green-100 border-green-400 text-green-700'
                  : 'bg-red-100 border-red-400 text-red-700'
              } text-sm font-medium`}
            >
              {statusMessage.text}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {/* User ID Input */}
            <div className="space-y-5 mb-2 md:mb-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User ID <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('userId', {
                    required: 'User ID is required',
                    minLength: {
                      value: 3,
                      message: 'User ID must be at least 3 characters',
                    },
                  })}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none ${
                    errors.userId
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                  }`}
                  placeholder="Enter your user ID"
                />
                {errors.userId && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.userId.message}
                  </motion.p>
                )}
              </div>

              {/* Password Input with Eye Toggle */}
              <PasswordInput
                label="Password"
                required
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                error={errors.password?.message}
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-end md:hidden">
              <Link
                href="/active-device"
                className="text-sm text-gray-500 hover:text-blue-500 transition duration-150"
              >
                Register new account to device
              </Link>
            </div>

            <div className="grid gap-3 pt-5">
              <Button
                type="submit"
                variant="primary"
                size="default"
                loading={loading}
                className="w-full"
                icon={LogIn}
              >
                Sign In Securely
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="default"
                loading={loading}
                className="w-full bg-blue-600"
                // icon={LogIn}
              >
                Sign In with face ID
              </Button>
            </div>
          </form>

          <div className="hidden md:block">
            {/* Forgot Links */}
            <div className="flex items-center justify-center gap-2 mt-4 text-sm">
              <Link
                href="/forgot-user-id"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot User ID
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot Password
              </Link>
            </div>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-sm text-gray-500 font-medium">OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/reg-corporate-banking" className="w-full">
                  <Button
                    variant="outline"
                    size="default"
                    icon={Building2}
                    className="w-full text-sm hover:bg-blue-50"
                  >
                    Corporate Banking
                  </Button>
                </Link>

                <Link href="/reg-personal-banking" className="w-full">
                  <Button
                    variant="outline"
                    size="default"
                    icon={User}
                    className="w-full text-sm hover:bg-blue-50"
                  >
                    Personal Banking
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/new-customer" className="w-full">
                  <Button
                    variant="outline"
                    size="default"
                    icon={UserPlus}
                    className="w-full text-sm hover:bg-blue-50"
                  >
                    New Customer
                  </Button>
                </Link>

                <Link href="/open-account" className="w-full">
                  <Button
                    variant="outline"
                    size="default"
                    className="w-full text-sm hover:bg-blue-50"
                  >
                    Open an Account
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
                <Link
                  href="/privacy-notice"
                  className="hover:text-orange-500 transition-colors"
                >
                  Privacy Notice
                </Link>
                <span>|</span>
                <Link
                  href="/faq"
                  className="hover:text-orange-500 transition-colors"
                >
                  FAQ
                </Link>
                <span>|</span>
                <Link
                  href="/technical-requirements"
                  className="hover:text-orange-500 transition-colors"
                >
                  Technical Requirements
                </Link>
              </div>

              <p className="text-xs text-center text-gray-400 font-medium">
                COPYRIGHT © 2025 Finxact
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerify}
      />

      <MobileQuickActions />
    </div>
  );
};

export default LoginPage;
