'use client';

import HeaderTop from '@/components/global/HeaderTop';
import OtpNumberManagement from '@/components/manage-otp/OtpNumberManagement';
import { useState } from 'react';

// --- MOCK DATA ---
const initialOtpNumbers = [
  { id: 37, mobileNumber: '00009199199' },
  { id: 38, mobileNumber: '917' },
  { id: 40, mobileNumber: '21787888917' },
  { id: 43, mobileNumber: '07777799993' },
];
// --- MOCK DATA END ---

export default function ManageOtpMobilePage() {
  const [otpNumbers, setOtpNumbers] = useState(initialOtpNumbers);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNumber = async (number) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newNumber = {
      id: Math.max(...otpNumbers.map((n) => n.id), 0) + 1,
      mobileNumber: number,
    };

    setOtpNumbers((prev) => [...prev, newNumber]);
    console.log('New OTP number added:', newNumber);
    setIsSubmitting(false);
  };

  const handleDeleteNumber = (id) => {
    // In a real app, you would call API first
    setOtpNumbers((prev) => prev.filter((n) => n.id !== id));
    console.log(`Deleted OTP number ID: ${id}`);
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Manage OTP Mobile Numbers"
        text="Control the mobile numbers authorized to receive OTP for transactions"
        link="/dashboard/security"
        linkText="Back to Security Settings"
      />

      {/* OTP Number Management Component */}
      <OtpNumberManagement
        numbers={otpNumbers}
        onAdd={handleAddNumber}
        onDelete={handleDeleteNumber}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
