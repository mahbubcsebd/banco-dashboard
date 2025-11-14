'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeftRight,
  LayoutDashboard,
  MoreHorizontal,
  Send,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    id: 'transfers',
    label: 'Transfer',
    icon: ArrowLeftRight,
    route: '/dashboard/landing/transfers',
  },
  {
    id: 'bill-payments',
    label: 'Bill Pay',
    icon: Send,
    route: '/dashboard/landing/bill-pay',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    route: '/dashboard',
  },
  {
    id: 'mobile-topup',
    label: 'Top-Up',
    icon: Upload,
    route: '/dashboard/landing/mobile-topup',
  },
  { id: 'more', label: 'More', icon: MoreHorizontal, route: null },
];

export default function MobileNav({ onMenuClick }) {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white z-999 shadow-2xl shadow-gray-300/50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ id, label, icon: Icon, route }) => {
          const isActive = pathname === route;

          if (id === 'more') {
            return (
              <button
                key={id}
                onClick={onMenuClick}
                className="flex flex-col items-center gap-1 py-2 px-3 min-w-[60px]"
              >
                <Icon className="w-5 h-5 text-gray-500" />
                <span className="text-xs font-medium text-gray-500">
                  {label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={id}
              href={route}
              className="flex flex-col items-center gap-1 py-2 px-3 relative min-w-[60px]"
            >
              {id === 'dashboard' ? (
                <div className="flex flex-col items-center -mt-8">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-linear-to-br from-orange-500 to-orange-600 shadow-orange-300'
                        : 'bg-linear-to-br from-gray-700 to-gray-800 shadow-gray-400'
                    }`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                </div>
              ) : (
                <>
                  {/* Active Indicator - Only for non-dashboard items */}
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? 'text-orange-500' : 'text-gray-500'
                    }`}
                  />
                  <span
                    className={`text-xs font-medium transition-colors duration-200 ${
                      isActive ? 'text-orange-500' : 'text-gray-500'
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
