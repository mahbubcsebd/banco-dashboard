// src/components//MobileQuickActions.jsx
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  CreditCard,
  Mail,
  MapPin,
  Plus,
  User,
  UserPlus,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const QUICK_ACTIONS = [
  {
    id: 'corporate',
    label: 'Corporate Access',
    icon: Building2,
    route: '/reg-corporate-banking',
    mobileOnly: true,
  },
  {
    id: 'personal',
    label: 'Personal Access',
    icon: User,
    route: '/reg-personal-banking',
    mobileOnly: true,
  },
  {
    id: 'new_customer',
    label: 'Become a Client',
    icon: UserPlus,
    route: '/new-customer',
    mobileOnly: true,
  },
  {
    id: 'open_account',
    label: 'Open New Account',
    icon: CreditCard,
    route: '/open-account',
    mobileOnly: true,
  },
  // Added extra items based on the reference image pop-up for better UX
  {
    id: 'locate',
    label: 'Find Branch/ATM',
    icon: MapPin,
    route: '/find-branch',
    mobileOnly: false,
  },
  {
    id: 'contact',
    label: 'Contact Us',
    icon: Mail,
    route: '/contact-us',
    mobileOnly: false,
  },
];

const MobileQuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Floating Action Button (FAB) */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center
                   bg-blue-500 text-white shadow-xl shadow-orange-500/50"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 135 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        aria-label="Quick Actions"
      >
        <Plus className="w-4 h-4" />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Pop-up Menu (Dialog/Sheet Simulation) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-2xl shadow-2xl p-6"
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
              <h4 className="text-lg font-bold text-gray-800">Quick Access</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Using a grid to display action items on mobile */}
            <div className="grid grid-cols-2 gap-4">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.id}
                  href={action.route}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100
                             hover:bg-orange-50 transition-colors duration-200 text-center space-y-2 group"
                  onClick={() => setIsOpen(false)} // Close on click
                >
                  <action.icon className="w-6 h-6 text-orange-500 group-hover:text-orange-600" />
                  <span className="text-xs font-medium text-gray-700 group-hover:text-gray-800">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-3 flex-wrap mt-6">
              <Link
                href="/privacy-notice"
                className="hover:text-orange-500 transition-colors"
              >
                Privacy Notice
              </Link>
              <span>|</span>
              <Link
                href="/faq"
                className="hover:text-orange-500 transition-colors"
              >
                FAQ
              </Link>
              <span>|</span>
              <Link
                href="/technical-requirements"
                className="hover:text-orange-500 transition-colors"
              >
                Technical Requirements
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileQuickActions;
