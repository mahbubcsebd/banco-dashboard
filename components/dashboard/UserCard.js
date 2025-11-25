'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  User,
  UserX,
} from 'lucide-react';

// Role-based Color Configuration
const roleConfig = {
  owner: {
    wrapper: 'bg-amber-50/50 border-amber-200 hover:border-amber-300',
    accentBar: 'bg-amber-500',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    label: 'Owner',
    Icon: ShieldAlert, // Special icon for Owner
    actionBtn: 'hover:bg-amber-100 text-amber-700',
  },
  approver: {
    wrapper: 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300',
    accentBar: 'bg-emerald-500',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    label: 'Approver',
    Icon: ShieldCheck,
    actionBtn: 'hover:bg-emerald-100 text-emerald-700',
  },
  entry: {
    wrapper: 'bg-white border-slate-200 hover:border-slate-300',
    accentBar: 'bg-slate-400',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
    label: 'Entry',
    Icon: User,
    actionBtn: 'hover:bg-slate-100 text-slate-700',
  },
};

export default function UserListCard({
  user,
  index = 0,
  onDelete,
  onResetPassword,
  onDeactivate,
}) {
  const roleKey = user.role?.toLowerCase() || 'entry';
  const theme = roleConfig[roleKey] || roleConfig.entry;
  const RoleIcon = theme.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="w-full"
    >
      <div
        className={`
          relative flex flex-col md:flex-row
          w-full overflow-hidden rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md
          ${theme.wrapper}
        `}
      >
        {/* Left Accent Bar (Color Indicator) */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 md:w-1.5 ${theme.accentBar} z-10`}
        />

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 flex flex-col md:flex-row items-start md:items-center p-3 md:py-3 md:pl-5 md:pr-2 gap-3 md:gap-4">
          {/* 1. Header: Avatar + Identity */}
          <div className="flex items-center gap-3 w-full md:w-auto md:min-w-[200px]">
            {/* Avatar Circle */}
            <div
              className={`w-10 h-10 md:w-11 md:h-11 rounded-full ${theme.iconBg} flex items-center justify-center shrink-0 border border-white shadow-sm`}
            >
              <RoleIcon
                className={`w-5 h-5 md:w-6 md:h-6 ${theme.iconColor}`}
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-gray-900 leading-tight">
                {user.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                  {user.userId}
                </span>
                {/* Mobile Badge */}
                <span
                  className={`md:hidden text-[9px] px-1.5 py-0 rounded-sm font-bold border uppercase tracking-wide ${theme.badge}`}
                >
                  {theme.label}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Badge (Hidden on Mobile) */}
          <div className="hidden md:flex items-center">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold border uppercase tracking-wide ${theme.badge}`}
            >
              {theme.label}
            </span>
          </div>

          {/* 2. Contact Info (Compact Row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:items-center gap-y-1 gap-x-4 w-full md:w-auto md:ml-auto md:mr-4">
            <div className="flex items-center gap-2 text-xs text-gray-600 bg-white/60 md:bg-transparent p-1.5 md:p-0 rounded border border-transparent md:border-none">
              <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="font-medium font-mono tracking-tight">
                {user.phone}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 bg-white/60 md:bg-transparent p-1.5 md:p-0 rounded border border-transparent md:border-none">
              <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate max-w-[200px]">{user.email}</span>
            </div>
          </div>
        </div>

        {/* --- ACTION AREA --- */}

        {/* DESKTOP ACTIONS: Right Side Vertical Divider */}
        <div className="hidden md:flex flex-row items-center gap-1 pr-3 border-l border-gray-200/60 pl-3 bg-white/30">
          <DesktopActionBtn
            onClick={() => onResetPassword?.(user)}
            icon={RefreshCw}
            label="Reset"
            color="text-blue-600 hover:bg-blue-50"
          />
          <DesktopActionBtn
            onClick={() => onDeactivate?.(user)}
            icon={UserX}
            label="Disable"
            color="text-amber-600 hover:bg-amber-50"
          />
          <DesktopActionBtn
            onClick={() => onDelete?.(user)}
            icon={Trash2}
            label="Delete"
            color="text-red-600 hover:bg-red-50"
          />
        </div>

        {/* MOBILE ACTIONS: Bottom Footer Row */}
        <div className="md:hidden flex items-center border-t border-gray-100 bg-gray-50/50">
          <MobileActionBtn
            onClick={() => onResetPassword?.(user)}
            icon={RefreshCw}
            label="Reset"
            color="text-blue-600"
          />
          <div className="w-px h-4 bg-gray-200" />
          <MobileActionBtn
            onClick={() => onDeactivate?.(user)}
            icon={UserX}
            label="Disable"
            color="text-amber-600"
          />
          <div className="w-px h-4 bg-gray-200" />
          <MobileActionBtn
            onClick={() => onDelete?.(user)}
            icon={Trash2}
            label="Delete"
            color="text-red-600"
          />
        </div>
      </div>
    </motion.div>
  );
}

// --- Sub-components for cleaner code ---

function DesktopActionBtn({ onClick, icon: Icon, label, color }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`p-2 rounded-lg transition-colors duration-200 group relative ${color}`}
    >
      <Icon className="w-4 h-4" />
      {/* Tooltip on Hover */}
      {/* <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span> */}
    </button>
  );
}

function MobileActionBtn({ onClick, icon: Icon, label, color }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 active:bg-gray-100 transition-colors ${color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {label}
      </span>
    </button>
  );
}
