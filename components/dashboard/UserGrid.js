'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import UserCard from './UserCard'; // Import করলাম
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

export default function UserGrid() {
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
          <div className="grid grid-cols-1 xl:grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {allUsers.map((user, index) => (
                <UserCard
                  key={user.id}
                  user={user}
                  index={index}
                  onDelete={handleDeleteClick}
                  onResetPassword={handleResetPasswordClick}
                  onDeactivate={handleDeactivateClick}
                />
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
            >
              {allUsers.map((user, index) => (
                <SwiperSlide key={user.id}>
                  <UserCard
                    user={user}
                    index={index}
                    onDelete={handleDeleteClick}
                    onResetPassword={handleResetPasswordClick}
                    onDeactivate={handleDeactivateClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Swiper Pagination Styles */}
            <style jsx global>{`
              .mobile-swiper-container .swiper {
                padding-bottom: 0;
              }

              .mobile-swiper-container .swiper-pagination {
                position: relative !important;
                bottom: auto !important;
                margin-top: 20px;
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

      {/* Modals - Updated with isOpen prop pattern */}
      <DeleteUserModal
        isOpen={showDeleteModal && !!selectedUser}
        user={selectedUser || {}}
        onClose={() => setShowDeleteModal(false)}
        onSubmit={handleDeleteSubmit}
      />

      <ResetPasswordModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleResetPasswordConfirm}
      />

      <DeactivateUserModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={handleDeactivateConfirm}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        confirmationNumber={successData.confirmationNumber}
        message={successData.message}
      />
    </div>
  );
}
