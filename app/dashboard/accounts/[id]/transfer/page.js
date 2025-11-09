// app/dashboard/accounts/[id]/transfer/page.jsx
'use client';

import HeaderTop from '@/components/global/HeaderTop';
import { accounts } from '@/data/mockData';
import { motion } from 'framer-motion';
import { ChevronDown, Info } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const TransferPage = () => {
  const params = useParams();
  const router = useRouter();
  const accountId = parseInt(params.id);
  const account = accounts.find((acc) => acc.id === accountId);

  const [formData, setFormData] = useState({
    fromAccount: account?.accountNumber || '',
    toAccount: '',
    amount: '',
    description: '',
    transferType: 'immediate',
  });

  const [loading, setLoading] = useState(false);

  if (!account) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <p className="text-center text-gray-500">Account not found</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Transfer initiated successfully!');
      router.push('/dashboard/accounts');
    }, 2000);
  };

  const otherAccounts = accounts.filter((acc) => acc.id !== accountId);

  return (
    <div className="">
      <HeaderTop
        title="Transfer"
        text="Move money easily between your own accounts"
        link="/dashboard/accounts"
        linkText="Back to Accounts"
      />

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* From and To Accounts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* From Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Account <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.fromAccount}
                  onChange={(e) =>
                    setFormData({ ...formData, fromAccount: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value={account.accountNumber}>
                    {account.type} {account.accountNumber} USD{' '}
                    {account.balance.toFixed(2)}
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* To Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Account <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.toAccount}
                  onChange={(e) =>
                    setFormData({ ...formData, toAccount: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Select</option>
                  {otherAccounts.map((acc) => (
                    <option key={acc.id} value={acc.accountNumber}>
                      {acc.type} {acc.accountNumber} USD{' '}
                      {acc.balance.toFixed(2)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Available Balance Info */}
          <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Available Balance:{' '}
              <span className="font-bold">
                USD{' '}
                {account.availableBalance.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </p>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                USD
              </span>
            </div>
          </div>

          {/* Transfer Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Transfer Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, transferType: 'immediate' })
                }
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  formData.transferType === 'immediate'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Immediate
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, transferType: 'scheduled' })
                }
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  formData.transferType === 'scheduled'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Scheduled
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 px-6 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TransferPage;
