'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import SessionExpiredModal from '@/components/modals/SessionExpiredModal';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// export const metadata = {
//   title: 'Dashboard | Banco di Caribe',
//   description: 'Manage your accounts and transactions',
// };

export default function DashboardRootLayout({ children }) {
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('authToken');
      const expiryTime = localStorage.getItem('tokenExpiry');

      if (expiryTime && Date.now() > parseInt(expiryTime)) {
        setSessionExpired(true);
      }
    };

    checkSession();

    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <DashboardLayout>
          {children}
          <SessionExpiredModal
            isOpen={sessionExpired}
            onClose={() => setSessionExpired(false)}
          />
        </DashboardLayout>
      </body>
    </html>
  );
}
