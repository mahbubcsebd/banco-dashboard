'use client';

import { userData } from '@/data/mockData';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  FileText,
  LogOut,
  Mail,
  Settings,
  Sparkles,
  TextAlignStart,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header({
  isCollapsed,
  setIsCollapsed,
  onMobileMenuClick,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      title: 'New transaction',
      description: 'Transfer of $1,000 completed',
      time: '5 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Account statement ready',
      description: 'Your monthly statement is available',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Security alert',
      description: 'New device logged in',
      time: '1 day ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // handle logout
  const handleLogout = () => {
    router.push('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-9999">
      {/* Mobile Menu Button */}
      <button
        onClick={onMobileMenuClick}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <TextAlignStart className="w-5 h-5 text-gray-700" />
      </button>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2 md:gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-linear-to-br hover:from-orange-50 hover:to-purple-50 rounded-lg relative group transition-all"
          title="AI Assistant"
        >
          <Sparkles className="w-5 h-5 text-gray-700 group-hover:text-orange-500 transition-colors" />
        </motion.button>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            )}
          </motion.button>
          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-75 lg:w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  <div className="max-h-96 overflow-y-auto overflow-x-hidden">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0 ${
                          notification.unread ? 'bg-orange-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                              notification.unread
                                ? 'bg-orange-500'
                                : 'bg-gray-300'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 mb-1">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 mb-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-400">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <button className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-linear-to-br from-orange-400 to-orange-500 overflow-hidden ring-2 ring-white hover:ring-orange-100 transition-all"
          >
            <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
              {userData.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          </motion.button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfile(false)}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  {/* Profile Info */}
                  <div className="px-4 py-4 border-b border-gray-100 bg-linear-to-br from-orange-50 to-purple-50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold">
                        {userData.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {userData.name}
                        </p>
                        <p className="text-xs text-gray-600">Premium Account</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/dashboard/profile-personal"
                      onClick={() => setShowProfile(false)}
                    >
                      <motion.button
                        whileHover={{
                          x: 4,
                          backgroundColor: 'rgb(249, 250, 251)',
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">My Profile</span>
                      </motion.button>
                    </Link>

                    <Link
                      href="/statements"
                      onClick={() => setShowProfile(false)}
                    >
                      <motion.button
                        whileHover={{
                          x: 4,
                          backgroundColor: 'rgb(249, 250, 251)',
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">Statements</span>
                      </motion.button>
                    </Link>

                    <Link
                      href="/secure-messages"
                      onClick={() => setShowProfile(false)}
                    >
                      <motion.button
                        whileHover={{
                          x: 4,
                          backgroundColor: 'rgb(249, 250, 251)',
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">Messages</span>
                      </motion.button>
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setShowProfile(false)}
                    >
                      <motion.button
                        whileHover={{
                          x: 4,
                          backgroundColor: 'rgb(249, 250, 251)',
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm font-medium">Settings</span>
                      </motion.button>
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 py-2">
                    <motion.button
                      whileHover={{
                        x: 4,
                        backgroundColor: 'rgb(254, 242, 242)',
                      }}
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
