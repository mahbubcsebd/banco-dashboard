'use client';

import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import UserCard from '@/components/dashboard/UserCard';
import {
  DeactivateUserModal,
  DeleteUserModal,
  ResetPasswordModal,
  SuccessModal,
} from '@/components/dashboard/UserModal';
import Link from 'next/link';
import Button from '../login/Button';

const generateMockUsers = () => {
  const roles = ['owner', 'approver', 'entry'];
  const firstNames = [
    'Sandra',
    'Jungkok',
    'Jimin',
    'J-Hope',
    'Suga',
    'John',
    'Jane',
    'Michael',
    'Sarah',
    'David',
    'Emily',
    'Robert',
    'Lisa',
    'James',
    'Maria',
  ];
  const lastNames = [
    'Bolack',
    'Koyaanisqatsiu',
    'Park',
    'Jung',
    'Victor',
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Davis',
    'Miller',
    'Wilson',
    'Moore',
    'Taylor',
    'Anderson',
  ];

  const users = [];
  for (let i = 1; i <= 120; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];

    users.push({
      id: i,
      userId: `USER${String(i).padStart(4, '0')}`,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      role,
      phone: `+1 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(
        100 + Math.random() * 900
      )} ${Math.floor(1000 + Math.random() * 9000)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      dateOfBirth: `${Math.floor(1 + Math.random() * 28)}/${Math.floor(
        1 + Math.random() * 12
      )}/19${Math.floor(80 + Math.random() * 20)}`,
      status: 'active',
    });
  }
  return users;
};

const allUsers = generateMockUsers();
const ITEMS_PER_PAGE = 12;

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successData, setSuccessData] = useState({
    confirmationNumber: '',
    message: '',
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Link href="/dashboard/create-user">
            <Button
              variant="primary"
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-md"
            >
              Create User
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {['all', 'owner', 'approver', 'entry'].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  selectedRole === role
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {role === 'all'
                  ? 'All'
                  : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-600 pt-2 border-t border-gray-100">
            Showing {filteredUsers.length} user
            {filteredUsers.length !== 1 ? 's' : ''}
          </div>
        </div>

        {!isMobile && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {currentUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {currentUsers.map((user, index) => (
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
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No users found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        )}

        {isMobile && currentUsers.length > 0 && (
          <div className="mobile-swiper-container bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Swiper
              modules={[SwiperPagination]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
              }}
            >
              {currentUsers.map((user, index) => (
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
              }
              .mobile-swiper-container .swiper-pagination-bullet-active {
                width: 32px;
                border-radius: 4px;
                background: #f97316;
              }
            `}</style>
          </div>
        )}

        {filteredUsers.length > ITEMS_PER_PAGE && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-1 flex-wrap justify-center">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === 'number' && handlePageChange(page)
                    }
                    disabled={page === '...'}
                    className={`min-w-10 h-10 rounded-lg text-sm font-medium ${
                      page === currentPage
                        ? 'bg-orange-600 text-white shadow-md'
                        : page === '...'
                        ? 'bg-transparent text-gray-400 cursor-default'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

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
