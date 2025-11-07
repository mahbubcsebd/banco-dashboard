'use client';

import Logo from '@/assets/icons/finxact.svg';
import GlobalInput from '@/components/global/GlobalInput';
import LanguageSelector from '@/components/global/LanguageSelector';
import Button from '@/components/login/Button';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ForgotPasswordPage = () => {
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
      dateOfBirth: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log('Forgot Password Data:', data);
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
              Forgot Password
            </h2>
            {/* <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full" /> */}
          </div>

          {/* Description */}
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6 px-4">
            To reset your password, we need some information to verify your
            identity. If you need future assistance, please contact us.
          </p>

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

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="default"
                className="w-full bg-blue-600 hover:bg-blue-700"
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

export default ForgotPasswordPage;
