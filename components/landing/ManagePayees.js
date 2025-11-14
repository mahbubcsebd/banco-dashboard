'use client';

import { motion } from 'framer-motion';
import { Edit, FilePlus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ManagePayees = () => {
  const router = useRouter();

  const actions = [
    {
      id: 'add',
      title: 'Add',
      icon: FilePlus,
      onClick: () => router.push('/mobile-topup/payees/add'),
      color: 'orange',
    },
    {
      id: 'edit',
      title: 'Edit',
      icon: Edit,
      onClick: () => router.push('/mobile-topup/payees/edit'),
      color: 'orange',
    },
    {
      id: 'delete',
      title: 'Delete',
      icon: Trash2,
      onClick: () => router.push('/mobile-topup/payees/delete'),
      color: 'orange',
    },
  ];

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="grid grid-cols-3 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={action.onClick}
                className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all hover:border-orange-300 group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors mb-3">
                  <Icon className="w-8 h-8 text-orange-500" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {action.title}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ManagePayees;
