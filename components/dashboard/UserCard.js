'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, RefreshCw, Trash2, User, UserX } from 'lucide-react';

// Professional Corporate Colors - Component er moddhe rakhlam
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

export default function UserCard({
  user,
  index = 0,
  onDelete,
  onResetPassword,
  onDeactivate,
}) {
  // User er role onujayi theme select korbe, na thakle entry default
  const theme = roleThemes[user.role?.toLowerCase()] || roleThemes.entry;

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
            className={`${theme.badge} border text-xs font-medium px-2.5 py-0.5 rounded-full backdrop-blur-sm uppercase`}
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
          <div className={`${theme.iconBg} p-1.5 rounded-lg backdrop-blur-sm`}>
            <Phone className={`w-3.5 h-3.5 ${theme.textSecondary}`} />
          </div>
          <span className={`text-xs ${theme.textSecondary} font-medium`}>
            {user.phone}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className={`${theme.iconBg} p-1.5 rounded-lg backdrop-blur-sm`}>
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
          onClick={() => onDelete?.(user)}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg py-2 transition-all flex flex-col items-center gap-1"
        >
          <Trash2 className={`w-3.5 h-3.5 ${theme.text}`} />
          <span className={`text-[9px] font-semibold ${theme.text}`}>
            Delete
          </span>
        </button>
        <button
          onClick={() => onResetPassword?.(user)}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg py-2 transition-all flex flex-col items-center gap-1"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${theme.text}`} />
          <span className={`text-[9px] font-semibold ${theme.text}`}>
            Reset
          </span>
        </button>
        <button
          onClick={() => onDeactivate?.(user)}
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
}
