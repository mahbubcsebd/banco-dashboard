'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronRight,
  Filter,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  UserX,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Mock data
const allUsers = [
  {
    id: 1,
    userId: 'SANDBAR01',
    firstName: 'Sandra',
    lastName: 'Bolack',
    name: 'SANDRA BOLACK',
    role: 'approver',
    phone: '2466549982',
    email: 'tester2@moadbusglobal.com',
    dateOfBirth: '10/10/2007',
    theme: 'blue',
    status: 'active',
  },
  {
    id: 2,
    userId: 'TINYTANTAN',
    firstName: 'Jungkok',
    lastName: 'Koyaanisqatsiu',
    name: 'JUNGKOK KOYAANISQATSIU',
    role: 'entry',
    phone: '713374356',
    email: 'shirly.banawis@moadbusglobal.com',
    dateOfBirth: '15/05/1995',
    theme: 'purple',
    status: 'active',
  },
  {
    id: 3,
    userId: 'JPARK05',
    firstName: 'Jimin',
    lastName: 'Park',
    name: 'JIMIN PARK',
    role: 'approver',
    phone: '791717234',
    email: 'tester3@moadbusglobal.com',
    dateOfBirth: '13/10/1995',
    theme: 'teal',
    status: 'active',
  },
  {
    id: 4,
    userId: 'JHOPEAPPROVER',
    firstName: 'J-Hope Jung',
    lastName: 'Ho-Seok',
    name: 'J-HOPE JUNG HO-SEOK',
    role: 'approver',
    phone: '78737346',
    email: 'tester4@moadbusglobal.com',
    dateOfBirth: '18/02/1994',
    theme: 'orange',
    status: 'active',
  },
  {
    id: 5,
    userId: 'JPOP05',
    firstName: 'Jimin',
    lastName: 'Jo',
    name: 'JIMIN JO',
    role: 'entry',
    phone: '7017116134',
    email: 'tester6@moadbusglobal.com',
    dateOfBirth: '25/08/1998',
    theme: 'green',
    status: 'active',
  },
  {
    id: 6,
    userId: 'SUGAPOP01',
    firstName: 'Suga',
    lastName: 'Victor',
    name: 'SUGA VICTOR',
    role: 'approver',
    phone: '57643245767',
    email: 'tester7@moadbusglobal.com',
    dateOfBirth: '09/03/1993',
    theme: 'indigo',
    status: 'active',
  },
];

const colorThemes = {
  blue: {
    gradient: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
    badge: 'bg-blue-600/30 text-white border border-white/20',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    textColor: 'text-white',
    buttonBg: 'bg-white/10 hover:bg-white/20',
    buttonBorder: 'border-white/20',
    shadow: 'hover:shadow-blue-200',
  },
  purple: {
    gradient: 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
    badge: 'bg-purple-600/30 text-white border border-white/20',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    textColor: 'text-white',
    buttonBg: 'bg-white/10 hover:bg-white/20',
    buttonBorder: 'border-white/20',
    shadow: 'hover:shadow-purple-200',
  },
  teal: {
    gradient: 'bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600',
    badge: 'bg-teal-600/30 text-white border border-white/20',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    textColor: 'text-white',
    buttonBg: 'bg-white/10 hover:bg-white/20',
    buttonBorder: 'border-white/20',
    shadow: 'hover:shadow-teal-200',
  },
  orange: {
    gradient: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600',
    badge: 'bg-orange-600/30 text-white border border-white/20',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    textColor: 'text-white',
    buttonBg: 'bg-white/10 hover:bg-white/20',
    buttonBorder: 'border-white/20',
    shadow: 'hover:shadow-orange-200',
  },
  green: {
    gradient: 'bg-gradient-to-br from-green-400 via-green-500 to-green-600',
    badge: 'bg-green-600/30 text-white border border-white/20',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    textColor: 'text-white',
    buttonBg: 'bg-white/10 hover:bg-white/20',
    buttonBorder: 'border-white/20',
    shadow: 'hover:shadow-green-200',
  },
  indigo: {
    gradient: 'bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600',
    badge: 'bg-indigo-600/30 text-white border border-white/20',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    textColor: 'text-white',
    buttonBg: 'bg-white/10 hover:bg-white/20',
    buttonBorder: 'border-white/20',
    shadow: 'hover:shadow-indigo-200',
  },
};

// Modal Components
const DeleteUserModal = ({ user, onClose, onSubmit }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Delete User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* First Name */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600 font-medium">First Name</span>
            <span className="text-gray-900 font-semibold">
              {user.firstName}
            </span>
          </div>

          {/* Last Name */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Last Name</span>
            <span className="text-gray-900 font-semibold">{user.lastName}</span>
          </div>

          {/* User ID */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600 font-medium">User ID</span>
            <span className="text-gray-900 font-semibold">{user.userId}</span>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600 font-medium">
              Date of Birth(mm/dd/yyyy)
            </span>
            <span className="text-gray-900 font-semibold">
              {user.dateOfBirth}
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Email</span>
            <span className="text-gray-900 font-semibold">{user.email}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-600 font-medium">Phone</span>
            <span className="text-gray-900 font-semibold">{user.phone}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSubmit(user)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-16 rounded-lg shadow-lg transition-colors"
          >
            Submit
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ResetPasswordModal = ({ onClose, onConfirm }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <p className="text-lg text-gray-700">Reset Password?</p>
        </div>

        {/* Footer */}
        <div className="p-6 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-colors"
          >
            OK
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DeactivateUserModal = ({ onClose, onConfirm }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Deactivate user</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <p className="text-lg text-gray-700">Deactivate user?</p>
        </div>

        {/* Footer */}
        <div className="p-6 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-colors"
          >
            OK
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SuccessModal = ({ onClose, confirmationNumber, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Success</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center space-y-4">
          <p className="text-gray-700">
            <span className="font-medium">Confirmation Number:</span>{' '}
            {confirmationNumber}
          </p>
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Footer */}
        <div className="p-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-16 rounded-lg shadow-lg transition-colors"
          >
            OK
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function UserGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

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

  // Filter users based on search and role
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === 'all' || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  // Generate random confirmation number
  const generateConfirmationNumber = () => {
    return Math.floor(100000000 + Math.random() * 900000000);
  };

  // Action handlers
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteSubmit = (user) => {
    setShowDeleteModal(false);
    // Here you would typically make an API call
    console.log('Delete user:', user.userId);
    // Show success modal or handle as needed
  };

  const handleResetPasswordClick = (user) => {
    setSelectedUser(user);
    setShowResetModal(true);
  };

  const handleResetPasswordConfirm = () => {
    setShowResetModal(false);
    const confirmationNumber = generateConfirmationNumber();
    setSuccessData({
      confirmationNumber,
      message:
        'Child User Password has been reset successfully. Child user will receive message on his/her registered Mobile/email.',
    });
    setShowSuccessModal(true);
    // Here you would typically make an API call
    console.log('Reset password for:', selectedUser?.userId);
  };

  const handleDeactivateClick = (user) => {
    setSelectedUser(user);
    setShowDeactivateModal(true);
  };

  const handleDeactivateConfirm = () => {
    setShowDeactivateModal(false);
    const confirmationNumber = generateConfirmationNumber();
    setSuccessData({
      confirmationNumber,
      message: 'Child User status changed successfully.',
    });
    setShowSuccessModal(true);
    // Here you would typically make an API call
    console.log('Deactivate user:', selectedUser?.userId);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          My Users
        </h2>

        <div className="flex items-center gap-2">
          {/* Filter Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
              showFilters
                ? 'bg-orange-50 border-orange-300 text-orange-600'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter</span>
          </motion.button>

          {/* View All Link */}
          <Link href="/users/all">
            <motion.div
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-orange-50"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, user ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
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

              {/* Role Filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-600 self-center">
                  Role:
                </span>
                {['all', 'approver', 'entry', 'admin', 'viewer'].map((role) => (
                  <motion.button
                    key={role}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedRole(role)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-colors ${
                      selectedRole === role
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {role}
                  </motion.button>
                ))}
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                Showing{' '}
                <span className="font-semibold text-gray-900">
                  {filteredUsers.length}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-gray-900">
                  {allUsers.length}
                </span>{' '}
                users
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Users Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredUsers.map((user) => {
            const theme = colorThemes[user.theme] || colorThemes.blue;

            return (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`${theme.gradient} rounded-xl overflow-hidden shadow-lg ${theme.shadow} transition-all duration-300 relative`}
              >
                {/* Card Header */}
                <div className="p-4 space-y-3 relative z-10">
                  {/* User ID and Role Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm font-bold ${theme.textColor} uppercase truncate`}
                      >
                        {user.userId}
                      </h3>
                    </div>
                    <span
                      className={`${theme.badge} text-[10px] font-semibold uppercase px-2 py-1 rounded-md backdrop-blur-sm whitespace-nowrap`}
                    >
                      {user.role}
                    </span>
                  </div>

                  {/* User Name */}
                  <div>
                    <p
                      className={`text-base font-bold ${theme.textColor} leading-tight`}
                    >
                      {user.name}
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    {/* Phone */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`${theme.iconBg} p-1.5 rounded-md backdrop-blur-sm`}
                      >
                        <Phone className={`w-3.5 h-3.5 ${theme.iconColor}`} />
                      </div>
                      <span
                        className={`text-xs ${theme.textColor} font-medium`}
                      >
                        {user.phone}
                      </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`${theme.iconBg} p-1.5 rounded-md backdrop-blur-sm`}
                      >
                        <Mail className={`w-3.5 h-3.5 ${theme.iconColor}`} />
                      </div>
                      <span
                        className={`text-xs ${theme.textColor} font-medium truncate`}
                        title={user.email}
                      >
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/20" />

                {/* Action Buttons */}
                <div className="p-3 bg-black/10 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Delete Button */}
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteClick(user)}
                      className={`${theme.buttonBg} ${theme.buttonBorder} border ${theme.textColor} rounded-lg p-2 transition-all duration-200 flex flex-col items-center gap-1 backdrop-blur-sm`}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-[9px] font-semibold">Delete</span>
                    </motion.button>

                    {/* Reset Password Button */}
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleResetPasswordClick(user)}
                      className={`${theme.buttonBg} ${theme.buttonBorder} border ${theme.textColor} rounded-lg p-2 transition-all duration-200 flex flex-col items-center gap-1 backdrop-blur-sm`}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="text-[9px] font-semibold text-center leading-tight">
                        Reset Password
                      </span>
                    </motion.button>

                    {/* Deactivate Button */}
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeactivateClick(user)}
                      className={`${theme.buttonBg} ${theme.buttonBorder} border ${theme.textColor} rounded-lg p-2 transition-all duration-200 flex flex-col items-center gap-1 backdrop-blur-sm`}
                    >
                      <UserX className="w-4 h-4" />
                      <span className="text-[9px] font-semibold text-center leading-tight">
                        Deactivate user
                      </span>
                    </motion.button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-2">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No users found
          </h3>
          <p className="text-sm text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
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
