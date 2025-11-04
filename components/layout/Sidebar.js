'use client';

import Logo from '@/assets/icons/logo.svg';
import { sidebarMenuItems } from '@/data/mockData';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftRight,
  Building2,
  Calendar,
  ChevronRight,
  File,
  FileText,
  Headphones,
  LayoutDashboard,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  PanelLeft,
  PanelRight,
  Send,
  Smartphone,
  Upload,
  User,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const iconMap = {
  pieChart: LayoutDashboard,
  building: Building2,
  document: FileText,
  documentText: File,
  transfer: ArrowLeftRight,
  send: Send,
  users: Users,
  mobile: Smartphone,
  support: Headphones,
  message: MessageSquare,
  location: MapPin,
  calendar: Calendar,
  upload: Upload,
  mail: Mail,
  user: User,
  lock: Lock,
};

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  mobileOpen = false,
  setMobileOpen = () => {},
}) {
  const pathname = usePathname();
  const activeItem = pathname === '/' ? 'dashboard' : pathname.slice(1);

  const hoverMotion = {
    rest: { x: 0, backgroundColor: 'rgba(255,255,255,0)' },
    hover: {
      x: 4,
      backgroundColor: 'rgba(255,165,0,0.05)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden flex flex-col bg-white border-r border-gray-200 fixed left-0 top-0 h-screen z-90 w-60 overflow-hidden"
          >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={Logo}
                    alt="logo"
                    className="w-full h-full rounded-full overflow-hidden"
                  />
                </div>
                <span className="font-semibold text-sm text-orange-500">
                  BANCO DI CARIBE
                </span>
              </Link>

              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar overflow-x-hidden">
              {sidebarMenuItems.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6">
                  <div className="px-4 mb-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {section.section}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = iconMap[item.icon];
                      const isActive = activeItem === item.id;

                      return (
                        <motion.div
                          key={item.id}
                          initial="rest"
                          whileHover="hover"
                          animate="rest"
                          variants={hoverMotion}
                          className="rounded-md"
                        >
                          <Link
                            href={item.id === 'dashboard' ? '/' : `/${item.id}`}
                            onClick={() => setMobileOpen(false)}
                            className={`w-full flex items-center gap-3 px-4 py-3 relative transition-all duration-300 rounded-md ${
                              isActive
                                ? 'text-orange-500 bg-orange-50 shadow-sm'
                                : 'text-gray-700 hover:text-orange-500'
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="mobileActive"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"
                              />
                            )}
                            <Icon className="w-5 h-5 shrink-0" />
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                            {isActive && (
                              <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 text-xs text-gray-500">
              © 2025 Banco di Caribe.
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Expand Button */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="hidden md:block fixed left-[65px] top-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all z-50"
        >
          <PanelRight className="w-4 h-4 text-gray-400" />
        </button>
      )}

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col bg-white border-r border-gray-200 fixed left-0 top-0 h-screen z-40 overflow-hidden"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={Logo}
                  alt="logo"
                  className="w-full h-full rounded-full overflow-hidden"
                />
              </div>
              <span className="font-semibold text-sm text-orange-500">
                BANCO DI CARIBE
              </span>
            </Link>
          ) : (
            <Link
              href="/"
              className="w-8 h-8 rounded-full overflow-hidden inline-block"
            >
              <Image
                src={Logo}
                alt="logo"
                className="w-full h-full rounded-full overflow-hidden"
              />
            </Link>
          )}

          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <PanelLeft className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar overflow-x-hidden">
          {sidebarMenuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {!isCollapsed && (
                <div className="px-4 mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {section.section}
                  </span>
                </div>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon];
                  const isActive = activeItem === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      variants={hoverMotion}
                      className="rounded-md"
                    >
                      <Link
                        href={item.id === 'dashboard' ? '/' : `/${item.id}`}
                        className={`w-full flex items-center gap-3 px-4 py-3 relative transition-all duration-300 rounded-md ${
                          isActive
                            ? 'text-orange-500 bg-orange-50 shadow-sm'
                            : 'text-gray-700 hover:text-orange-500'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"
                          />
                        )}
                        <Icon className="w-5 h-5 shrink-0" />
                        {!isCollapsed && (
                          <span className="text-sm font-medium whitespace-nowrap">
                            {item.label}
                          </span>
                        )}
                        {!isCollapsed && isActive && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 text-xs text-gray-500">
          {!isCollapsed ? '© 2025 Banco di Caribe.' : '©'}
        </div>
      </motion.aside>
    </>
  );
}
