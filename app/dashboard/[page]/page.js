'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftRight,
  Building2,
  Calendar,
  Clock,
  CreditCard,
  File,
  FileText,
  Headphones,
  List,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Plus,
  Send,
  Settings,
  Smartphone,
  Sparkles,
  Upload,
  User,
  Users,
} from 'lucide-react';
import { useParams } from 'next/navigation';

const pageTitles = {
  accounts: 'Accounts',
  'my-accounts': 'My Accounts',
  transactions: 'Transactions',
  statements: 'Statements',
  documents: 'Documents & Forms',
  transfers: 'Transfers',
  'bill-payments': 'Bill Payments',
  'p2p-payments': 'P2P Payments',
  'mobile-topup': 'Mobile Top-Up',
  support: 'Support',
  'secure-messages': 'Secure Messages',
  'find-branch': 'Find Branch/ATM',
  appointments: 'Appointments',
  'secure-upload': 'Secure Upload',
  'contact-us': 'Contact Us',
  profile: 'Profile',
  security: 'Security',
  settings: 'Settings',

  transfer: 'Transfer',
  'pay-bill': 'Pay Bill',
  pending: 'Pending Transactions',
  'quick-deposit': 'Quick Deposit',
};

const iconMap = {
  accounts: Building2,
  'my-accounts': CreditCard,
  transactions: List,
  statements: FileText,
  documents: File,
  transfers: ArrowLeftRight,
  'bill-payments': Send,
  'p2p-payments': Users,
  'mobile-topup': Smartphone,
  support: Headphones,
  'secure-messages': MessageSquare,
  'find-branch': MapPin,
  appointments: Calendar,
  'secure-upload': Upload,
  'contact-us': Mail,
  profile: User,
  security: Lock,
  settings: Settings,
  transfer: ArrowLeftRight,
  'pay-bill': Send,
  pending: Clock,
  'quick-deposit': Plus,
};

export default function DynamicPage() {
  const { page } = useParams();
  const pageSlug = page?.toLowerCase?.() || '';
  const pageTitle = pageTitles[pageSlug] || 'Page';
  const Icon = iconMap[pageSlug] || Sparkles;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageSlug}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center border border-gray-100"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 220,
              damping: 15,
            }}
            className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <Icon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Page Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            {pageTitle}
          </motion.h1>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6"
          >
            <Clock className="w-4 h-4" />
            Coming Soon
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 leading-relaxed"
          >
            We are working hard to bring you this feature. Stay tuned for
            updates!
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
