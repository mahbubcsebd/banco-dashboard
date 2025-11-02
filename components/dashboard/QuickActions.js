'use client';

import { motion } from 'framer-motion';
import { ArrowLeftRight, Clock, Plus, Send } from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    id: 1,
    title: 'Transfer',
    description: 'Move money between accounts',
    icon: ArrowLeftRight,
    bgColor: 'bg-orange-50',
    slug: 'transfer',
  },
  {
    id: 2,
    title: 'Pay Bill',
    description: 'Pay your bills online',
    icon: Send,
    bgColor: 'bg-orange-50',
    slug: 'pay-bill',
  },
  {
    id: 3,
    title: 'Pending',
    description: 'Current Pending Transactions',
    icon: Clock,
    bgColor: 'bg-orange-50',
    slug: 'pending',
  },
  {
    id: 4,
    title: 'Quick Deposit',
    description: 'Deposit funds instantly',
    icon: Plus,
    bgColor: 'bg-orange-50',
    slug: 'quick-deposit',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function QuickActions() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-4 items-stretch"
    >
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.id}
            href={`/${action.slug}`}
            className="block h-full"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-lg lg:rounded-xl p-2 md:p-4 lg:p-4 xl:p-5 border border-gray-200 hover:border-orange-200 hover:shadow-md transition-all text-left flex items-center gap-2 lg:block lg:gap-0 h-full"
            >
              <div
                className={`w-8 lg:w-10 h-8 lg:h-10 rounded-lg flex items-center justify-center lg:mb-3 ${action.bgColor}`}
              >
                <Icon className="w-4 lg:w-5 h-4 lg:h-5 text-orange-500" />
              </div>
              <h3 className="font-semibold text-[#09090B] text-sm md:text-base lg:mb-2">
                {action.title}
              </h3>
              <p className="hidden lg:block text-xs md:text-sm text-[#71717A] leading-snug">
                {action.description}
              </p>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
}
