'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronRight,
  Mail,
  Phone,
  RefreshCw,
  Trash2,
  User,
  UserX,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import {
  DeactivateUserModal,
  DeleteUserModal,
  ResetPasswordModal,
  SuccessModal,
} from './UserModal';

// Mock data
const allUsers = [
  {
    id: 1,
    userId: 'SANDBAR01',
    firstName: 'Sandra',
    lastName: 'Bolack',
    name: 'Sandra Bolack',
    role: 'owner',
    phone: '+1 246 654 9982',
    email: 'sandra.b@company.com',
    dateOfBirth: '10/10/2007',
    status: 'active',
  },
  {
    id: 2,
    userId: 'TINYTANTAN',
    firstName: 'Jungkok',
    lastName: 'Koyaanisqatsiu',
    name: 'Jungkok Koyaanisqatsiu',
    role: 'entry',
    phone: '+1 713 374 356',
    email: 'jungkok@company.com',
    dateOfBirth: '15/05/1995',
    status: 'active',
  },
  {
    id: 3,
    userId: 'JPARK05',
    firstName: 'Jimin',
    lastName: 'Park',
    name: 'Jimin Park',
    role: 'approver',
    phone: '+1 791 717 234',
    email: 'jimin.park@company.com',
    dateOfBirth: '13/10/1995',
    status: 'active',
  },
  {
    id: 4,
    userId: 'JHOPEAPPROVER',
    firstName: 'J-Hope',
    lastName: 'Jung',
    name: 'J-Hope Jung',
    role: 'approver',
    phone: '+1 787 373 46',
    email: 'jhope@company.com',
    dateOfBirth: '18/02/1994',
    status: 'active',
  },
  {
    id: 5,
    userId: 'JPOP05',
    firstName: 'Jimin',
    lastName: 'Jo',
    name: 'Jimin Jo',
    role: 'entry',
    phone: '+1 701 711 6134',
    email: 'jimin.jo@company.com',
    dateOfBirth: '25/08/1998',
    status: 'active',
  },
  {
    id: 6,
    userId: 'SUGAPOP01',
    firstName: 'Suga',
    lastName: 'Victor',
    name: 'Suga Victor',
    role: 'owner',
    phone: '+1 576 432 45767',
    email: 'suga.v@company.com',
    dateOfBirth: '09/03/1993',
    status: 'active',
  },
];

// Professional Corporate Colors
const roleThemes = {
  owner: {
    gradient: 'from-amber-500 to-amber-600',
    bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    badge: 'bg-amber-900/40 text-amber-100 border-amber-400/30',
    text: 'text-amber-50',
    textSecondary: 'text-amber-100',
    iconBg: 'bg-amber-400/30',
    label: 'owner',
  },
  approver: {
    gradient: 'from-emerald-600 to-emerald-700',
    bg: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
    badge: 'bg-emerald-900/40 text-emerald-100 border-emerald-500/30',
    text: 'text-emerald-50',
    textSecondary: 'text-emerald-100',
    iconBg: 'bg-emerald-500/30',
    label: 'approver',
  },
  entry: {
    gradient: 'from-slate-600 to-slate-700',
    bg: 'bg-gradient-to-br from-slate-600 to-slate-700',
    badge: 'bg-slate-900/40 text-slate-100 border-slate-500/30',
    text: 'text-slate-50',
    textSecondary: 'text-slate-100',
    iconBg: 'bg-slate-500/30',
    label: 'entry',
  },
};

export default function FinalUserGrid() {
  const [isMobile, setIsMobile] = useState(false);

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successData, setSuccessData] = useState({
    confirmationNumber: '',
    message: '',
  });

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const generateConfirmationNumber = () =>
    Math.floor(100000000 + Math.random() * 900000000);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteSubmit = (user) => {
    setShowDeleteModal(false);
    console.log('Delete user:', user.userId);
  };

  const handleResetPasswordClick = (user) => {
    setSelectedUser(user);
    setShowResetModal(true);
  };

  const handleResetPasswordConfirm = () => {
    setShowResetModal(false);
    setSuccessData({
      confirmationNumber: generateConfirmationNumber(),
      message: 'Password reset email has been sent to the user.',
    });
    setShowSuccessModal(true);
  };

  const handleDeactivateClick = (user) => {
    setSelectedUser(user);
    setShowDeactivateModal(true);
  };

  const handleDeactivateConfirm = () => {
    setShowDeactivateModal(false);
    setSuccessData({
      confirmationNumber: generateConfirmationNumber(),
      message: 'User has been deactivated successfully.',
    });
    setShowSuccessModal(true);
  };

  // User Card Component
  const UserCard = ({ user, index }) => {
    const theme = roleThemes[user.role] || roleThemes.entry;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={`${theme.bg} rounded-xl shadow-lg overflow-hidden border border-white/10 h-full`}
      >
        {/* Header with Role Badge */}
        <div className="p-3 pb-2 relative">
          {/* Role Badge - Top Right */}
          <div className="absolute top-2 right-2">
            <span
              className={`${theme.badge} border text-xs font-medium px-2.5 py-0.5 rounded-full backdrop-blur-sm`}
            >
              {theme.label}
            </span>
          </div>

          {/* User Icon and ID */}
          <div className="flex items-center gap-2 pr-20">
            <div
              className={`${theme.iconBg} p-2 rounded-full backdrop-blur-sm ring-2 ring-white/20`}
            >
              <User className={`w-5 h-5 ${theme.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`text-sm font-bold ${theme.text} uppercase tracking-wide truncate`}
              >
                {user.userId}
              </h3>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="px-3 pb-2">
          <p
            className={`text-base font-semibold ${theme.text} leading-tight truncate`}
          >
            {user.name}
          </p>
        </div>

        {/* Contact Info */}
        <div className="px-3 pb-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <div
              className={`${theme.iconBg} p-1.5 rounded-lg backdrop-blur-sm`}
            >
              <Phone className={`w-3.5 h-3.5 ${theme.textSecondary}`} />
            </div>
            <span className={`text-xs ${theme.textSecondary} font-medium`}>
              {user.phone}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`${theme.iconBg} p-1.5 rounded-lg backdrop-blur-sm`}
            >
              <Mail className={`w-3.5 h-3.5 ${theme.textSecondary}`} />
            </div>
            <span
              className={`text-xs ${theme.textSecondary} font-medium truncate`}
              title={user.email}
            >
              {user.email}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Action Buttons */}
        <div className="bg-black/15 p-2 grid grid-cols-3 gap-1.5">
          <button
            onClick={() => handleDeleteClick(user)}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg py-2 transition-all flex flex-col items-center gap-1"
          >
            <Trash2 className={`w-3.5 h-3.5 ${theme.text}`} />
            <span className={`text-[9px] font-semibold ${theme.text}`}>
              Delete
            </span>
          </button>
          <button
            onClick={() => handleResetPasswordClick(user)}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg py-2 transition-all flex flex-col items-center gap-1"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${theme.text}`} />
            <span className={`text-[9px] font-semibold ${theme.text}`}>
              Reset
            </span>
          </button>
          <button
            onClick={() => handleDeactivateClick(user)}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg py-2 transition-all flex flex-col items-center gap-1"
          >
            <UserX className={`w-3.5 h-3.5 ${theme.text}`} />
            <span className={`text-[9px] font-semibold ${theme.text}`}>
              Disable
            </span>
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-sm text-gray-600 mt-0.5">
              Manage your team members
            </p>
          </div>

          <Link href="/dashboard/manage-users">
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-orange-50"
            >
              View All
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </div>

        {/* Users Grid - Desktop & Tablet */}
        {!isMobile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {allUsers.map((user, index) => (
                <UserCard key={user.id} user={user} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Mobile Swiper - Smooth Slider */}
        {isMobile && allUsers.length > 0 && (
          <div className="mobile-swiper-container">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
              }}
              className="pb-12"
            >
              {allUsers.map((user, index) => (
                <SwiperSlide key={user.id}>
                  <UserCard user={user} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Swiper Pagination Styles */}
            <style jsx global>{`
              .mobile-swiper-container .swiper-pagination {
                bottom: 0 !important;
              }

              .mobile-swiper-container .swiper-pagination-bullet {
                width: 8px;
                height: 8px;
                background: #d1d5db;
                opacity: 1;
                transition: all 0.3s ease;
              }

              .mobile-swiper-container .swiper-pagination-bullet-active {
                width: 32px;
                border-radius: 4px;
                background: #f97316;
              }
            `}</style>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence mode="wait">
        {showDeleteModal && selectedUser && (
          <DeleteUserModal
            user={selectedUser}
            onClose={() => setShowDeleteModal(false)}
            onSubmit={handleDeleteSubmit}
          />
        )}

        {showResetModal && (
          <ResetPasswordModal
            onClose={() => setShowResetModal(false)}
            onConfirm={handleResetPasswordConfirm}
          />
        )}

        {showDeactivateModal && (
          <DeactivateUserModal
            onClose={() => setShowDeactivateModal(false)}
            onConfirm={handleDeactivateConfirm}
          />
        )}

        {showSuccessModal && (
          <SuccessModal
            onClose={() => setShowSuccessModal(false)}
            confirmationNumber={successData.confirmationNumber}
            message={successData.message}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
