'use client';

import Link from 'next/link';

const ActionCard = ({ title, icon: Icon, href }) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all duration-300 cursor-pointer group"
    >
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center mb-2 text-orange-500 group-hover:scale-110 transition-transform duration-300">
        {Icon && <Icon className="w-full h-full" strokeWidth={1.5} />}
      </div>

      {/* Title */}
      <h3 className="text-xs font-medium text-gray-800 text-center leading-tight">
        {title}
      </h3>
    </Link>
  );
};

export default ActionCard;
