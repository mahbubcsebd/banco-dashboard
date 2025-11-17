'use client';

import { motion } from 'framer-motion';
import { Edit, Eye, Mail, Phone, Trash2 } from 'lucide-react';
import { useState } from 'react';

const SubsidiaryList = ({ data, onAction }) => {
  // ❌ NOTE: Mock Modal Definitions HAVE BEEN REMOVED from this file.
  // The actual modals should be rendered in the parent component (CompanyInfoPage.js).

  // 🌟 STATE FOR MODAL MANAGEMENT (Used to manage local visibility of action clicks) 🌟
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState(null);

  const tableHeaders = [
    { key: 'name', label: 'Subsidiary Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'note', label: 'Nickname/Note' },
    { key: 'actions', label: 'Actions', align: 'right' },
  ];

  // Helper function for button styling
  const getButtonStyle = (color) => {
    const base =
      'flex items-center justify-center p-2 rounded-lg text-xs font-semibold border transition-colors duration-200';
    switch (color) {
      case 'blue':
        return `${base} border-blue-600 text-blue-600 hover:bg-blue-50`;
      case 'orange':
        return `${base} border-orange-600 text-orange-600 hover:bg-orange-50`;
      case 'red':
        return `${base} border-red-600 text-red-600 hover:bg-red-50`;
      default:
        return base;
    }
  };

  // 🌟 ACTION DISPATCHER (Calls parent and manages local state) 🌟
  const handleActionClick = (action, sub) => {
    setSelectedSubsidiary(sub);

    // Resetting all states before setting the target one
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);

    // Set the state for the modal that needs to open
    if (action === 'View') {
      setIsViewModalOpen(true);
    } else if (action === 'Edit') {
      setIsEditModalOpen(true);
    } else if (action === 'Delete') {
      setIsDeleteModalOpen(true);
    }

    // Notify the parent component (CompanyInfoPage)
    onAction(action, sub);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="text-gray-700 font-medium text-lg mb-8">
        Business User Shirly Banawis{' '}
        <span className="text-orange-500 ml-1">Hi 👋</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {data.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No subsidiary details found.
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:grid grid-cols-6 font-semibold text-gray-600 border-b pb-2 pt-4 px-6 text-sm uppercase bg-gray-50">
              {tableHeaders.map((header) => (
                <span
                  key={header.key}
                  className={`col-span-1 ${
                    header.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {header.label}
                </span>
              ))}
            </div>

            {/* List/Table Body */}
            <div className="divide-y divide-gray-100">
              {data.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 md:px-6 md:py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Desktop Row View */}
                  <div className="hidden md:grid grid-cols-6 items-center text-sm text-gray-700">
                    <span className="font-medium text-gray-900 col-span-1 truncate">
                      {sub.name}
                    </span>
                    <span className="col-span-1 truncate">{sub.email}</span>
                    <span className="col-span-1">{sub.phone}</span>
                    <span className="col-span-1 truncate">{sub.note}</span>

                    {/* Actions */}
                    <div className="col-span-2 flex justify-end space-x-3">
                      <button
                        onClick={() => handleActionClick('View', sub)}
                        className={getButtonStyle('blue')}
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </button>
                      <button
                        onClick={() => handleActionClick('Edit', sub)}
                        className={getButtonStyle('orange')}
                      >
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleActionClick('Delete', sub)}
                        className={getButtonStyle('red')}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </button>
                    </div>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-2">
                    <div className="font-bold text-gray-900 text-base">
                      {sub.name}
                    </div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-orange-500" />{' '}
                        <span>{sub.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-orange-500" />{' '}
                        <span>{sub.phone}</span>
                      </div>
                      <div className="text-xs text-gray-500 ml-6">
                        Note: {sub.note}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        onClick={() => handleActionClick('View', sub)}
                        className={getButtonStyle('blue')}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleActionClick('Edit', sub)}
                        className={getButtonStyle('orange')}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleActionClick('Delete', sub)}
                        className={getButtonStyle('red')}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubsidiaryList;
