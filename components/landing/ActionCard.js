'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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

const ActionCard = ({ title, icon: Icon, href, description, badge }) => {
  return (
    // <Link
    //   href={href}
    //   className="relative p-6 bg-white rounded-3xl border-2 border-gray-100 hover:border-orange-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group min-h-[180px]"
    // >
    //   {/* Optional Badge */}
    //   {badge && (
    //     <div className="absolute top-4 right-4 px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
    //       {badge}
    //     </div>
    //   )}

    //   {/* Icon with minimal styling */}
    //   <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-orange-50 rounded-2xl group-hover:bg-orange-100 transition-colors duration-300">
    //     {Icon && <Icon className="w-8 h-8 text-orange-500" strokeWidth={2} />}
    //   </div>

    //   {/* Title */}
    //   <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
    //     {title}
    //   </h3>

    //   {/* Description */}
    //   {description && (
    //     <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    //   )}

    //   {/* Subtle arrow indicator */}
    //   <div className="absolute bottom-6 right-6 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
    //     <svg
    //       className="w-3 h-3 text-gray-600 group-hover:text-white transition-colors duration-300"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth={2}
    //         d="M9 5l7 7-7 7"
    //       />
    //     </svg>
    //   </div>
    // </Link>
    <Link href={`/${href}`} className="block h-full">
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-lg lg:rounded-xl p-4 border border-gray-200 hover:border-orange-200 hover:shadow-md transition-all text-left block h-full"
      >
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-orange-50 `}
        >
          <Icon className="w-5 h-5 text-orange-500" />
        </div>
        <h3 className="font-semibold text-[#09090B] text-sm md:text-base">
          {title}
        </h3>
      </motion.div>
    </Link>
  );
};

export default ActionCard;
