'use client';

import HeaderTop from '@/components/global/HeaderTop';
import NotificationSection from '@/components/notification/NotificationSection';
import { BellRing, Clock, Gift } from 'lucide-react';

// --- MOCK DATA ---
const mockNotifications = {
  alerts: [
    {
      id: 1,
      title: 'Alert Notifications',
      icon: BellRing,
      messages: [{ content: '[Global] test only', date: '2025-11-05' }],
    },
  ],
  promotions: [
    { id: 2, title: 'Promotion Notifications', icon: Gift, messages: [] },
  ],
  reminders: [
    { id: 3, title: 'Reminder Notifications', icon: Clock, messages: [] },
  ],
};

// Add some mock messages for better demo
mockNotifications.alerts[0].messages.push({
  content: 'Your balance is below $100.00.',
  date: '2025-11-04',
});
mockNotifications.promotions[0].messages.push({
  content: 'Get 5% cashback on all online purchases this month!',
  date: '2025-11-01',
});
mockNotifications.reminders[0].messages.push({
  content: 'Reminder: Your Bill Payment for Utility Co. is due in 3 days.',
  date: '2025-11-02',
});
// --- MOCK DATA END ---

export default function NotificationsPage() {
  // Combine all categories into one list for simplicity in rendering
  const allNotifications = [
    ...mockNotifications.alerts,
    ...mockNotifications.promotions,
    ...mockNotifications.reminders,
  ];

  return (
    <div className="p-6">
      <HeaderTop
        title="Notifications"
        text="Manage and view your account alerts, reminders, and promotional messages."
        link="/dashboard/settings"
        linkText="Back to Settings"
      />

      {/* Notifications Display Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 max-w-4xl mx-auto space-y-6">
        {allNotifications.map((section) => (
          <NotificationSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
