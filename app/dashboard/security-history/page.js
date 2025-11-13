'use client';

import HeaderTop from '@/components/global/HeaderTop';
import ActivityLog from '@/components/security-history/ActivityLog';
import { Printer } from 'lucide-react';

// --- MOCK DATA ---
const mockActivityData = {
  '11/13/2025': [
    { time: '10:05 AM', description: 'Session created successfully' },
    { time: '10:06 AM', description: 'Send OTP successfully' },
    { time: '11:15 AM', description: 'Session created successfully' },
    { time: '11:16 AM', description: 'Send OTP successfully' },
    { time: '11:20 AM', description: 'Transferred $50 to SAV 210001002331' },
  ],
  '11/12/2025': [
    { time: '09:00 AM', description: 'User login success' },
    { time: '09:05 AM', description: 'Checked account balance' },
  ],
  '11/11/2025': [
    { time: '14:30 PM', description: 'Attempted password change (Failed)' },
    { time: '14:35 PM', description: 'Password changed successfully' },
  ],
  '11/10/2025': [
    { time: '08:00 AM', description: 'Session created successfully' },
  ],
  '11/09/2025': [
    { time: '16:00 PM', description: 'Mobile Recharge for 9876543210' },
  ],
  '11/08/2025': [
    { time: '12:00 PM', description: 'Viewed Account Statements' },
  ],
};

const activitiesByDate = Object.keys(mockActivityData).map((date) => ({
  date,
  activities: mockActivityData[date],
}));
// --- MOCK DATA END ---

export default function UserActivityPage() {
  const handlePrint = () => {
    console.log('Printing User Activity Log...');
    // Implement print logic here
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="User Activity"
        text="Monitor User Activity"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 max-w-4xl mx-auto">
        <ActivityLog data={activitiesByDate} />

        <div className="flex justify-center pt-8 border-t border-gray-100 mt-6">
          <button
            onClick={handlePrint}
            className="text-gray-500 hover:text-blue-600 transition-colors p-2"
            title="Print Activity Log"
          >
            <Printer className="w-6 h-6 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
