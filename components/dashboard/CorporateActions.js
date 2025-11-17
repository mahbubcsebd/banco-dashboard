'use client';
import { motion } from 'framer-motion';
import { Building2, Smartphone, Users } from 'lucide-react';
import Link from 'next/link';

const corporateActions = [
  {
    id: 1,
    title: 'Manage Users',
    description: 'Manage users in your Organization',
    icon: Users,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
    hoverBorder: 'hover:border-orange-200',
    slug: 'manage-users',
  },
  {
    id: 2,
    title: 'Manage OTP Mobile Numbers',
    description: 'Manage phone numbers for OTP authentication',
    icon: Smartphone,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    hoverBorder: 'hover:border-green-200',
    slug: 'manage-otp-numbers',
  },
  {
    id: 3,
    title: 'Company Information',
    description: 'Update the Organization details',
    icon: Building2,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
    hoverBorder: 'hover:border-purple-200',
    slug: 'company-information',
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

export default function CorporateActions() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4 items-stretch"
    >
      {corporateActions.map((action) => {
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
              className={`bg-white rounded-lg lg:rounded-xl p-2 md:p-4 lg:p-4 xl:p-5 border border-gray-200 ${action.hoverBorder} hover:shadow-md transition-all text-left flex items-center gap-2 lg:block lg:gap-0 h-full`}
            >
              <div
                className={`w-8 lg:w-10 h-8 lg:h-10 rounded-lg flex items-center justify-center lg:mb-3 ${action.bgColor}`}
              >
                <Icon className={`w-4 lg:w-5 h-4 lg:h-5 ${action.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#09090B] text-sm md:text-base lg:mb-2">
                  {action.title}
                </h3>
                <p className="hidden lg:block text-xs md:text-sm text-[#71717A] leading-snug">
                  {action.description}
                </p>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
}
