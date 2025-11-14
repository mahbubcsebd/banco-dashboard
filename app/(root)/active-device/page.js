'use client';

import Logo from '@/assets/icons/finxact.svg';
import GlobalInput from '@/components/global/GlobalInput';
import LanguageSelector from '@/components/global/LanguageSelector';
import Button from '@/components/login/Button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

const ActivateUserPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      userId: '',
      accountNumber: '',
      email: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log('Activate User Data:', data);
    setTimeout(() => {
      setLoading(false);
      // Handle success - redirect or show success message
    }, 1500);
  };

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
      <div className="fixed inset-0 bg-linear-to-br from-orange-500/20 via-white/60 to-orange-500/20 backdrop-blur-sm" />

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
        className="w-full max-w-2xl z-10"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20">
          {/* Language Selector */}
          <div className="flex justify-end mb-4 lg:mb-6">
            <LanguageSelector />
          </div>

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
                Active Device
              </h2>
            </motion.div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* User ID */}
            <GlobalInput
              label="User ID"
              type="text"
              placeholder="Enter your user ID"
              required
              {...register('userId', {
                required: 'User ID is required',
                minLength: {
                  value: 3,
                  message: 'User ID must be at least 3 characters',
                },
              })}
              error={errors.userId?.message}
            />

            {/* Account Number */}
            <GlobalInput
              label="Account Number"
              type="text"
              placeholder="Enter your account number"
              required
              {...register('accountNumber', {
                required: 'Account number is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Account number must contain only numbers',
                },
                minLength: {
                  value: 5,
                  message: 'Account number must be at least 5 digits',
                },
              })}
              error={errors.accountNumber?.message}
            />

            {/* Email */}
            <GlobalInput
              label="Email"
              type="email"
              placeholder="Enter your email address"
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

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="default"
                className="w-full bg-orange-500 hover:bg-orange-600"
                loading={loading}
              >
                SUBMIT
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

export default ActivateUserPage;
