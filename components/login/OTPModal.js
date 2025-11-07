'use client';

import Button from '@/components/login/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const OTPModal = ({ isOpen, onClose, onVerify }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedContact, setSelectedContact] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const contactOptions = [
    { value: 'phone1', label: '*****1267' },
    { value: 'email1', label: 'j***@example.com' },
  ];

  const handleGenerateToken = () => {
    if (!selectedContact) {
      setError('Please select where to send the token');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }
    setError('');
    onVerify(otp);
    handleClose();
    router.push('/dashboard');
  };

  const handleClose = () => {
    setStep(1);
    setSelectedContact('');
    setOtp('');
    setError('');
    onClose();
  };

  const handleRegenerate = () => {
    setOtp('');
    setError('');
    setStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-md p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            OTP Confirmation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
          {step === 1 ? (
            // Step 1: Generate Token
            <>
              <p className="text-gray-600 text-xs sm:text-sm">
                Generate a one-time PIN to sign in to your account.
              </p>

              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium text-gray-700">
                  Send to
                </label>
                <Select
                  value={selectedContact}
                  onValueChange={setSelectedContact}
                >
                  <SelectTrigger className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-10 sm:h-11">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {contactOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="cursor-pointer hover:bg-orange-50 focus:bg-orange-50"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <p className="text-xs sm:text-sm text-red-500 -mt-2">{error}</p>
              )}

              <div className="flex gap-2 sm:gap-3 pt-2">
                <Button
                  variant="outline"
                  size="default"
                  className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 text-xs sm:text-base py-2 sm:py-3"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="default"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-xs sm:text-base py-2 sm:py-3"
                  onClick={handleGenerateToken}
                >
                  Generate Token
                </Button>
              </div>
            </>
          ) : (
            // Step 2: Verify OTP
            <>
              <p className="text-gray-900 font-medium text-xs sm:text-sm">
                Enter the token sent via SMS/Email by the Bank
              </p>

              {/* Shadcn Input OTP - Responsive */}
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setError('');
                  }}
                >
                  <InputOTPGroup className="gap-0">
                    <InputOTPSlot
                      index={0}
                      className="w-9 h-11 sm:w-12 sm:h-14 text-lg sm:text-xl border border-gray-300 rounded-l-lg focus:border-orange-500! focus:ring-0! focus:outline-none! focus:shadow-none!"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-9 h-11 sm:w-12 sm:h-14 text-lg sm:text-xl border-y border-r border-gray-300 focus:border-orange-500! focus:ring-0! focus:outline-none! focus:shadow-none!"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-9 h-11 sm:w-12 sm:h-14 text-lg sm:text-xl border-y border-r border-gray-300 rounded-r-lg focus:border-orange-500! focus:ring-0! focus:outline-none! focus:shadow-none!"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator>
                    <span className="text-xl sm:text-2xl font-bold text-gray-400 mx-1 sm:mx-2">
                      -
                    </span>
                  </InputOTPSeparator>
                  <InputOTPGroup className="gap-0">
                    <InputOTPSlot
                      index={3}
                      className="w-9 h-11 sm:w-12 sm:h-14 text-lg sm:text-xl border border-gray-300 rounded-l-lg focus:border-orange-500! focus:ring-0! focus:outline-none! focus:shadow-none!"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-9 h-11 sm:w-12 sm:h-14 text-lg sm:text-xl border-y border-r border-gray-300 focus:border-orange-500! focus:ring-0! focus:outline-none! focus:shadow-none!"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-9 h-11 sm:w-12 sm:h-14 text-lg sm:text-xl border-y border-r border-gray-300 rounded-r-lg focus:border-orange-500! focus:ring-0! focus:outline-none! focus:shadow-none!"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <p className="text-xs sm:text-sm text-red-500 text-center -mt-2">
                  {error}
                </p>
              )}

              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Did not receive an SMS/Email token?{' '}
                  <button
                    onClick={handleRegenerate}
                    className="font-medium text-orange-600 hover:text-orange-700 underline transition-colors"
                  >
                    Regenerate Token
                  </button>
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3 pt-2">
                <Button
                  variant="outline"
                  size="default"
                  className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 text-xs sm:text-base py-2 sm:py-3"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="default"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-xs sm:text-base py-2 sm:py-3"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPModal;
