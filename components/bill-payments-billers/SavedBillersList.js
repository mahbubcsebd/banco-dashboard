'use client';

import { motion } from 'framer-motion';
import { CreditCard, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Assuming Next.js for routing
import { useState } from 'react';

// Import the new Modals
import DeleteBillTemplateModal from './DeleteBillTemplateModal';
import EditBillTemplateModal from './EditBillTemplateModal';

const SavedBillersList = ({ data = [] }) => {
  const router = useRouter(); // Initialize router

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBiller, setSelectedBiller] = useState(null);

  const handleAction = (action, biller) => {
    setSelectedBiller(biller);

    if (action === 'Pay') {
      // 🎯 Requirement: Navigate to /dashboard/bill-payments-pay
      router.push(`/dashboard/bill-payments-pay?billerId=${biller.id}`);
    } else if (action === 'Edit') {
      setIsEditModalOpen(true);
    } else if (action === 'Delete') {
      setIsDeleteModalOpen(true);
    }
  };

  // Handlers for Modals
  const handleEditSubmit = (updatedData) => {
    console.log('Template updated successfully:', updatedData);
    // Logic to update the list/state in the parent component (ManageBillTemplate.js)
  };

  const handleDeleteConfirm = (billerToDelete) => {
    console.log('Template deleted successfully:', billerToDelete.id);
    // Logic to delete the item from the list/state in the parent component
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-3"
    >
      {/* Modals */}
      <EditBillTemplateModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        billerData={selectedBiller}
        onSubmit={handleEditSubmit}
      />
      <DeleteBillTemplateModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        billerData={selectedBiller}
        onConfirm={handleDeleteConfirm}
      />

      {data.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            No saved billers found matching your filters.
          </p>
        </div>
      ) : (
        data.map((biller, index) => (
          <motion.div
            key={biller.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-y-0 md:gap-x-4 items-center">
              {/* Biller Name & Details */}
              <div className="flex-1 min-w-0 md:col-span-1">
                <div className="text-base font-semibold text-gray-900 truncate">
                  {biller.billerName}
                </div>
                <div className="md:hidden text-xs text-gray-500 mt-0.5">
                  Category: {biller.billerCategory}
                </div>
              </div>

              {/* Account/Reference Numbers (Middle Section) */}
              <div className="grid grid-cols-2 gap-4 md:col-span-1 text-sm text-gray-700">
                <div>
                  <span className="text-xs font-medium text-gray-500 block">
                    Account Number:
                  </span>
                  <span className="font-medium">{biller.accountNumber}</span>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 block">
                    Reference Number:
                  </span>
                  <span className="font-medium">{biller.referenceNumber}</span>
                </div>
              </div>

              {/* Actions (Right Section) */}
              <div className="flex justify-start md:justify-end space-x-4 md:space-x-6 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                {/* Pay Action - navigates to the required link */}
                <button
                  onClick={() => handleAction('Pay', biller)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors text-sm"
                >
                  <CreditCard className="w-4 h-4" /> <span>Pay</span>
                </button>

                {/* Edit Action - opens modal */}
                <button
                  onClick={() => handleAction('Edit', biller)}
                  className="flex items-center space-x-1 text-orange-600 hover:text-orange-800 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" /> <span>Edit</span>
                </button>

                {/* Delete Action - opens modal */}
                <button
                  onClick={() => handleAction('Delete', biller)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" /> <span>Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default SavedBillersList;
