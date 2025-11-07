'use client';

import Logo from '@/assets/icons/finxact.svg';
import GlobalInput from '@/components/global/GlobalInput';
import GlobalSelect from '@/components/global/GlobalSelect';
import LanguageSelector from '@/components/global/LanguageSelector';
import Button from '@/components/login/Button';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, Lock, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterCorporateBankingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log('Corporate Registration data:', data);
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      // You might redirect the user or show a success message here
      console.log('Registration Complete!');
    }, 1500);
  };

  // Options for Select fields (as seen in the image/standard corporate form)
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
        className="w-full max-w-xl z-10" // Reduced max-w for a cleaner corporate look based on the image
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <LanguageSelector />
          </div>

          <div className="flex justify-center mb-6">
            <Image
              src={Logo}
              alt="logo"
              className="h-8 sm:h-10 w-auto object-cover"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Register to Corporate Banking
            </h2>
            {/* Using the blue color for the corporate registration divider for consistency */}
            {/* <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" /> */}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            <GlobalInput label="User ID" required {...register('userId')} />
            <GlobalInput label="Tax ID" required {...register('taxId')} />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
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
                Next
              </Button>
            </div>
          </form>

          {/* Exclusive Benefits */}
          <div className="mt-10 bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4">
              Exclusive Finxact Benefits:
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>24/7 secure access to your accounts</span>
              </li>
              <li className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>Advanced financial insights and planning tools</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>Military-grade encryption and fraud protection</span>
              </li>
            </ul>
          </div>

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

export default RegisterCorporateBankingPage;
