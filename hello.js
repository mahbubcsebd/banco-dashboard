import { colorMap } from '@/utils/accountColors';
import { motion } from 'framer-motion';
import {
    ArrowLeftRight,
    Clock,
    CreditCard,
    DollarSign,
    Eye,
    Send,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const typeConfig = {
  1: {
    // Savings
    name: 'Savings Account',
    color: 'cyan',
    icon: CreditCard,
    actions: [
      {
        icon: ArrowLeftRight,
        label: 'Transfer',
        route: (a) =>
          `/dashboard/transfers/transfer-between-own-acccounts?account=${a.accountNumber}`,
      },
      { icon: Send, label: 'Pay', route: '/dashboard/bill-payments-pay' },
      {
        icon: Clock,
        label: 'Activity',
        route: (a) => `/dashboard/activity/${a.accountNumber}`,
      },
    ],
  },
  6: {
    // Current / Checking
    name: 'Current Account',
    color: 'blue',
    icon: CreditCard,
    actions: [
      {
        icon: ArrowLeftRight,
        label: 'Transfer',
        route: (a) =>
          `/dashboard/transfers/transfer-between-own-acccounts?account=${a.accountNumber}`,
      },
      { icon: Send, label: 'Pay', route: '/dashboard/bill-payments-pay' },
      {
        icon: Clock,
        label: 'Activity',
        route: (a) => `/dashboard/activity/${a.accountNumber}`,
      },
    ],
  },
  7: {
    // Credit Card
    name: 'Credit Card',
    color: 'purple',
    icon: CreditCard,
    actions: [
      {
        icon: Send,
        label: 'Pay',
        route: '/dashboard/credit-card/bill-payments-pay',
      },
      {
        icon: Clock,
        label: 'Activity',
        route: (a) => `/dashboard/activity/${a.accountNumber}`,
      },
    ],
  },
  5: {
    // Loan
    name: 'Loan Account',
    color: 'teal',
    icon: DollarSign,
    actions: [
      {
        icon: ArrowLeftRight,
        label: 'Make a Payment',
        route: '/dashboard/make-payment',
      },
      {
        icon: Clock,
        label: 'Activity',
        route: (a) => `/dashboard/activity/${a.accountNumber}`,
      },
    ],
  },
  3: {
    // Time Deposit
    name: 'Time Account',
    color: 'pink',
    icon: Clock,
    actions: [
      {
        icon: Clock,
        label: 'Activity',
        route: (a) => `/dashboard/activity/${a.accountNumber}`,
      },
    ],
  },
};

export default function AccountCard({ account, index, viewMode = 'grid' }) {
  const navigate = useNavigate();
  if (!account) return null;

  const config = typeConfig[account.accountType] || typeConfig[1];
  const colors = colorMap[config.color] || colorMap.orange;
  const IconComponent = config.icon;

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    const path =
      typeof action.route === 'function' ? action.route(account) : action.route;
    navigate(path);
  };

  const handleViewAccount = () => {
    navigate(`/accounts/${account.accountNumber}`);
  };

  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        whileHover={{ y: -4 }}
        className={`${colors.linear} rounded-2xl p-5 md:p-6 text-white relative overflow-hidden shadow-lg`}
        onClick={handleViewAccount}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 -translate-x-1/2 translate-y-1/2 bg-white rounded-full" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="mb-1 text-xs font-semibold tracking-wider uppercase md:text-sm opacity-90">
                {account.accountName}
              </p>
              <p className="text-[11px] opacity-80">{account.accountNumber}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-0.5"
            >
              <button
                className={`p-1.5 rounded-full ${colors.iconBg} ${colors.iconHover} transition-colors`}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <span className="text-[9px] font-medium opacity-90">Action</span>
            </motion.div>
          </div>

          <div className="mb-4">
            <motion.h3
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-2xl md:text-3xl font-bold mb-0.5"
            >
              $
              {account.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </motion.h3>
            <p className="text-[10px] opacity-75">{account.currency}</p>
          </div>

          <div className="flex items-center gap-2">
            {config.actions.map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center gap-0.5 ${
                    idx === config.actions.length - 1 ? 'ml-auto' : ''
                  }`}
                >
                  <button
                    onClick={(e) => handleActionClick(e, action)}
                    className={`p-2 rounded-full ${colors.iconBg} ${colors.iconHover} transition-colors`}
                  >
                    <ActionIcon className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[9px] font-medium opacity-90">
                    {action.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ scale: 1.002 }}
      className="relative w-full"
    >
      <div className="relative bg-white h-[120px] overflow-hidden w-full rounded-r-2xl shadow-xs border border-gray-100/50">
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 ${colors.linear} rounded-l-2xl`}
        />

        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-5 z-20 max-w-[55%]">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="relative shrink-0"
          >
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-xl ${colors.linear} flex items-center justify-center text-white relative overflow-hidden shadow-md`}
            >
              <div className="absolute inset-0 bg-white opacity-10" />
              <IconComponent
                className="relative z-10 w-9 h-9"
                strokeWidth={2}
              />
            </div>
          </motion.div>

          <div className="w-px h-24 bg-linear-to-b from-transparent via-gray-300 to-transparent shrink-0" />

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs font-bold tracking-wide text-gray-800 uppercase">
                {account.accountName}
              </p>
              <p className="text-[10px] text-gray-400 font-medium">
                {account.accountNumber}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
              className="flex flex-col justify-center"
            >
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Available Balance
              </p>
              <motion.h3
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                $
                {account.balance.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </motion.h3>
              <p className="text-[9px] text-gray-400 mt-0.5 font-medium uppercase tracking-wider">
                {account.currency}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 + 0.3, duration: 0.4 }}
          className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30"
        >
          {config.actions.map((action, idx) => {
            const ActionIcon = action.icon;
            return (
              <motion.button
                key={idx}
                onClick={(e) => handleActionClick(e, action)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-sm w-7 h-7 ${colors.iconBg} ${colors.iconHover} transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm`}
              >
                <ActionIcon className="w-4 h-4 text-gray-700" strokeWidth={2} />
              </motion.button>
            );
          })}
        </motion.div>

        <div className="absolute top-0 bottom-0 right-0 z-10 w-8 overflow-hidden">
          <div
            className={`absolute top-0 bottom-0 -right-3 w-16 rounded-l-3xl ${colors.linear} shadow-[-3px_0_10px_rgba(0,0,0,0.1)]`}
          >
            <div className="absolute inset-0 rounded-l-3xl bg-linear-to-b from-white/40 via-transparent to-black/10" />
            <div className="absolute top-0 bottom-0 left-0 w-px bg-white/40 mix-blend-overlay" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-100 to-transparent" />
      </div>
    </motion.div>
  );
}




import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';


const typeConfig = {
  1: { name: 'Savings Account', color: 'cyan', icon: CreditCard },
  6: { name: 'Current Account', color: 'blue', icon: CreditCard },
  7: { name: 'Credit Card', color: 'purple', icon: CreditCard },
  5: { name: 'Loan Account', color: 'teal', icon: DollarSign },
  3: { name: 'Time Account', color: 'pink', icon: Clock },
};

const typeActions = {
  1: [
    {
      icon: ArrowLeftRight,
      label: 'Transfer',
      route: (a) => `/dashboard/transfer/${a.accountNumber}`,
    },
    { icon: Send, label: 'Pay', route: '/dashboard/bill-payments-pay' },
    { icon: Clock, label: 'Activity', route: (a) => `/dashboard/activity/${a.accountNumber}` },
  ],
  6: [
    {
      icon: ArrowLeftRight,
      label: 'Transfer',
      route: (a) => `/dashboard/transfer/${a.accountNumber}`,
    },
    { icon: Send, label: 'Pay', route: '/dashboard/bill-payments-pay' },
    { icon: Clock, label: 'Activity', route: (a) => `/dashboard/activity/${a.accountNumber}` },
  ],
  7: [
    { icon: Send, label: 'Pay', route: '/dashboard/credit-card/bill-payments-pay' },
    { icon: Clock, label: 'Activity', route: (a) => `/dashboard/activity/${a.accountNumber}` },
  ],
  5: [
    { icon: ArrowLeftRight, label: 'Make a Payment', route: '/dashboard/make-payment' },
    { icon: Clock, label: 'Activity', route: (a) => `/dashboard/activity/${a.accountNumber}` },
  ],
  3: [{ icon: Clock, label: 'Activity', route: (a) => `/dashboard/activity/${a.accountNumber}` }],
};

const SortableTabItem = ({ account, index, isActive, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: account.id,
  });

  const config = typeConfig[account.accountType] || typeConfig[1];
  const colors = colorMap[config.color] || colorMap.orange;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : isActive ? 20 : 10 - index,
    opacity: isDragging ? 0.5 : 1,
  };

  const getLastFour = (num) => num.slice(-4);

  return (
    <motion.button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onSelect}
      whileHover={{ scale: isActive ? 1 : 1.02, y: isActive ? 0 : -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full px-3 py-3 text-xs font-semibold transition-all duration-300
        border rounded-t-xl cursor-grab active:cursor-grabbing
        ${
          isActive
            ? `${colors.linear} text-white shadow-lg border-transparent`
            : `bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100`
        }
        ${index !== 0 ? '-ml-2' : ''}
        nth-[3n+1]:ml-0 md:nth-[4n+1]:ml-0 lg:nth-[6n+1]:ml-0 xl:nth-[10n+1]:ml-0
      `}
    >
      <div className="flex justify-center items-center gap-0.5">
        <span className="text-[10px] font-bold uppercase">{account.accountName}</span>
        <span className={`text-[9px] font-mono ${isActive ? 'opacity-90' : 'opacity-70'}`}>
          {getLastFour(account.accountNumber)}
        </span>
      </div>

      {isActive && (
        <div className={`absolute -bottom-px left-0 right-0 h-px ${colors.linear.split(' ')[0]}`} />
      )}
    </motion.button>
  );
};

export default function AccountTab({ accounts, activeId }) {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const navigate = useNavigate();

  const config = typeConfig[selectedAccount.accountType] || typeConfig[1];
  const colors = colorMap[config.color] || colorMap.orange;
  const IconComponent = config.icon;
  const actions = typeActions[selectedAccount.accountType] || typeActions[1];

  const handleAction = (e, action) => {
    e.stopPropagation();
    const path = typeof action.route === 'function' ? action.route(selectedAccount) : action.route;
    navigate(path, { state: { account: selectedAccount } });
  };

  const goToOptions = (e) => {
    e.stopPropagation();
    navigate('/dashboard/account-options', { state: { account: selectedAccount } });
  };

  return (
    <div className="space-y-0">
      {/* Tabs */}
      <SortableContext items={accounts.map((a) => a.id)} strategy={horizontalListSortingStrategy}>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-x-0">
          {accounts.map((acc, i) => (
            <SortableTabItem
              key={acc.id}
              account={acc}
              index={i}
              isActive={selectedAccount.id === acc.id}
              onSelect={() => setSelectedAccount(acc)}
            />
          ))}
        </div>
      </SortableContext>

      {/* Details Card */}
      <motion.div
        key={selectedAccount.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-30 overflow-hidden bg-white border border-gray-100 rounded-tl-none shadow-lg rounded-2xl"
        onClick={goToOptions}
      >
        {/* Header with Gradient */}
        <div className={`${colors.linear} p-5 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl">
                <IconComponent className="w-7 h-7" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-bold">{config.name}</h3>
                <p className="font-mono text-sm opacity-90">{selectedAccount.accountNumber}</p>
              </div>
            </div>
            <motion.button
              onClick={goToOptions}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold tracking-wider uppercase opacity-80">
              Available Balance
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight">
              $
              {selectedAccount.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 bg-gray-50">
          <div className="grid grid-cols-3 gap-3">
            {actions.map((action, i) => (
              <ActionButton
                key={i}
                icon={action.icon}
                label={action.label}
                onClick={(e) => handleAction(e, action)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
    >
      <Icon className="w-6 h-6 text-gray-700" strokeWidth={2} />
      <span className="text-xs font-semibold text-gray-700">{label}</span>
    </motion.button>
  );
}
