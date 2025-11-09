'use client';

import Logo from '@/assets/icons/finxact.svg';
import GlobalInput from '@/components/global/GlobalInput';
import GlobalSelect from '@/components/global/GlobalSelect';
import LanguageSelector from '@/components/global/LanguageSelector';
import Button from '@/components/login/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, BarChart3, Lock, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log('Registration data:', data);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const securityQuestions = [
    { value: 'pet', label: "What was your first pet's name?" },
    { value: 'school', label: 'What was your elementary school name?' },
    { value: 'city', label: 'In which city were you born?' },
    { value: 'nickname', label: 'What is your childhood nickname?' },
  ];

  const legalFormOptions = [
    { value: 'sole', label: 'Sole Proprietorship' },
    { value: 'llc', label: 'LLC (Limited Liability Company)' },
    { value: 'corp', label: 'Corporation' },
    { value: 'part', label: 'Partnership' },
  ];

  const businessSectorOptions = [
    { value: 'tech', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'retail', label: 'Retail' },
    { value: 'manuf', label: 'Manufacturing' },
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

      {/* Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-500/20 via-white/60 to-orange-500/20 backdrop-blur-sm" />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-10"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-10"
        />
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl z-10"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Back</span>
            </Link>
            <LanguageSelector />
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <Image
              src={Logo}
              alt="logo"
              className="h-7 sm:h-8 md:h-10 w-auto object-cover"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Register to Banking
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 sm:mb-8 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-md text-sm sm:text-base font-medium transition-all ${
                activeTab === 'personal'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Personal Banking
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('corporate')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-md text-sm sm:text-base font-medium transition-all ${
                activeTab === 'corporate'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Corporate Banking
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-5"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 sm:space-y-5"
                >
                  <p className="font-semibold text-gray-700 text-sm sm:text-base">
                    Member Details:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <GlobalInput
                      label="Customer Number"
                      required
                      {...register('customerNumber')}
                    />
                    <GlobalInput
                      label="User ID"
                      required
                      {...register('userId')}
                    />
                    <GlobalInput
                      label="First Name"
                      required
                      {...register('firstName')}
                    />
                    <GlobalInput
                      label="Last Name"
                      required
                      {...register('lastName')}
                    />
                    <GlobalInput
                      label="Date of Birth"
                      type="date"
                      required
                      {...register('dob')}
                    />
                    <GlobalInput
                      label="ID Number"
                      required
                      {...register('idNumber')}
                    />
                  </div>

                  <p className="font-semibold text-gray-700 pt-2 sm:pt-3 text-sm sm:text-base">
                    Contact Information:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <GlobalInput
                      label="Mobile Number"
                      type="tel"
                      required
                      {...register('mobile')}
                    />
                    <GlobalInput
                      label="Email Address"
                      type="email"
                      required
                      {...register('email')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <GlobalSelect
                      label="Pick up location / Gridcard / Token"
                      placeholder="Select"
                      options={[
                        { value: 'branch', label: 'Branch Office' },
                        { value: 'courier', label: 'Courier Delivery' },
                      ]}
                    />
                  </div>

                  <div className="pt-2 sm:pt-3">
                    <p className="font-semibold text-gray-700 text-sm sm:text-base">
                      Security Questions{' '}
                      <span className="text-xs text-gray-500">
                        (Select at least 3)
                      </span>
                    </p>

                    <div className="space-y-3 sm:space-y-4 mt-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5"
                        >
                          <GlobalSelect
                            label={`Security Question ${i + 1}`}
                            placeholder="Select"
                            options={securityQuestions}
                            {...register(`question_${i + 1}`)}
                          />
                          <GlobalInput
                            label="Answer"
                            required
                            {...register(`answer_${i + 1}`)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'corporate' && (
                <motion.div
                  key="corporate"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 sm:space-y-5"
                >
                  <p className="font-semibold text-gray-700 text-sm sm:text-base">
                    Corporate Details:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <GlobalInput
                      label="Enterprise Name"
                      placeholder="Enter enterprise name"
                      required
                      {...register('enterpriseName')}
                    />
                    <GlobalSelect
                      label="Legal Form"
                      placeholder="Select"
                      required
                      options={legalFormOptions}
                      {...register('legalForm')}
                    />
                    <GlobalSelect
                      label="Business Sector"
                      placeholder="Select"
                      required
                      options={businessSectorOptions}
                      {...register('businessSector')}
                    />
                    <GlobalInput
                      label="Chamber of Commerce"
                      required
                      {...register('chamberOfCommerce')}
                    />
                    <GlobalInput
                      label="Customer Number"
                      required
                      {...register('customerNumber')}
                    />
                    <GlobalInput
                      label="User ID"
                      required
                      {...register('userId')}
                    />
                    <GlobalInput
                      label="Tax ID"
                      required
                      {...register('taxId')}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
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
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                loading={loading}
              >
                {activeTab === 'personal' ? 'Register' : 'Next'}
              </Button>
            </div>
          </form>

          {/* Exclusive Benefits */}
          <div className="mt-8 sm:mt-10 bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6 border border-gray-100">
            <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-3 sm:mb-4">
              Exclusive Finxact Benefits:
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li className="flex items-start gap-2 sm:gap-3">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>24/7 secure access to your accounts</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Advanced financial insights and planning tools</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Military-grade encryption and fraud protection</span>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400 font-medium">
              COPYRIGHT © 2025 FINXACT
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
