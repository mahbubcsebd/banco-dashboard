'use client';

import AddEditSubsidiaryModal from '@/components/company-information/AddEditSubsidiaryModal'; // Updated Import Name
import ConfirmationModal from '@/components/company-information/ConfirmationModal';
import DeleteSubsidiaryModal from '@/components/company-information/DeleteSubsidiaryModal'; // New Import
import SubsidiaryList from '@/components/company-information/SubsidiaryList';
import ViewSubsidiaryModal from '@/components/company-information/ViewSubsidiaryModal'; // New Import
import HeaderTop from '@/components/global/HeaderTop';
import Button from '@/components/login/Button';
import SuccessModal from '@/components/modals/SuccessModal';
import { useState } from 'react';

// --- MOCK DATA ---
const initialSubsidiaries = [
  {
    id: 1,
    name: 'Alex Johnson',
    phone: '65765765765',
    email: 'alex.johnson@example.com',
    note: 'Sales Team Lead',
    details: {
      /* Full Subsidiary Details */ firstName: 'Alex',
      lastName: 'Johnson',
      nickname: 'SalesLead',
      addressLine1: '14 Elm Street',
      addressLine2: '',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30303',
      homePhoneNumber: '65765765765',
      mobileNumber: '9991112222',
      personalEmailAddress: 'alex@company.com',
      achCompanyName: 'ACH CO 1',
      achCompanyIdentificationIcd: '1_IRS_EIN',
      achCompanyIdentification: 'njhgjfg',
      irsNif: 'vghvghfghf',
      legalForm: 'LLC',
      businessSector: 'MANUFACTURING',
    },
  },
  {
    id: 2,
    name: 'Maria Garcia',
    phone: '4045550102',
    email: 'maria.g@example.com',
    note: 'Accounts Payable',
    details: {
      /* Full Subsidiary Details */ firstName: 'Maria',
      lastName: 'Garcia',
      nickname: 'APManager',
      addressLine1: '200 Peach Tree Rd',
      addressLine2: 'Suite 100',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30308',
      homePhoneNumber: '4045550102',
      mobileNumber: '9992223333',
      personalEmailAddress: 'maria@company.com',
      achCompanyName: 'ACH CO 2',
      achCompanyIdentificationIcd: '2_SOCIAL',
      achCompanyIdentification: 'uiyttyui',
      irsNif: 'yutyuoyt',
      legalForm: 'INC',
      businessSector: 'RETAIL',
    },
  },
];
// --- MOCK DATA END ---

export default function CompanyInfoPage() {
  const [subsidiaries, setSubsidiaries] = useState(initialSubsidiaries);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [subsidiaryToHandle, setSubsidiaryToHandle] = useState(null); // Used for View, Edit, Delete, Confirm
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // --- Core Action Dispatcher from SubsidiaryList ---
  const handleAction = (action, subsidiary) => {
    setSubsidiaryToHandle(subsidiary);
    if (action === 'Create') {
      setIsEditMode(false);
      setSubsidiaryToHandle(null); // Clear data for new creation
      setIsAddEditModalOpen(true);
    } else if (action === 'View') {
      setIsViewModalOpen(true);
    } else if (action === 'Edit') {
      setIsEditMode(true);
      setIsAddEditModalOpen(true);
    } else if (action === 'Delete') {
      setIsDeleteModalOpen(true);
    }
  };

  // --- Modal Submit Handlers ---

  // 1. Triggered by AddEditSubsidiaryModal (validates and moves to confirmation)
  const handleModalSubmit = (formData, isEdit) => {
    setSubsidiaryToHandle(formData); // Set the new/edited data
    setIsConfirmModalOpen(true);
    setIsAddEditModalOpen(false); // Close form modal
  };

  // 2. Triggered by ConfirmationModal (final save)
  const handleConfirmAndSave = async () => {
    if (!subsidiaryToHandle) return;

    setIsConfirmModalOpen(false);
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Save Logic
    const isEditing = subsidiaryToHandle.id;
    let successMsg;

    if (isEditing) {
      setSubsidiaries((prev) =>
        prev.map((sub) =>
          sub.id === subsidiaryToHandle.id
            ? {
                ...sub,
                name: `${subsidiaryToHandle.firstName} ${subsidiaryToHandle.lastName}`,
                details: subsidiaryToHandle,
              }
            : sub
        )
      );
      successMsg = `Subsidiary '${subsidiaryToHandle.firstName}' updated successfully.`;
    } else {
      const newSubsidiary = {
        id: subsidiaries.length + 1,
        name: `${subsidiaryToHandle.firstName} ${subsidiaryToHandle.lastName}`,
        phone: subsidiaryToHandle.homePhoneNumber,
        email: subsidiaryToHandle.personalEmailAddress || 'N/A',
        note: subsidiaryToHandle.nickname,
        details: subsidiaryToHandle,
      };
      setSubsidiaries((prev) => [...prev, newSubsidiary]);
      successMsg = `Subsidiary '${newSubsidiary.name}' added successfully.`;
    }

    setIsSubmitting(false);
    setSuccessMessage(successMsg);
    setIsSuccessModalOpen(true);
  };

  // 3. Triggered by DeleteConfirmationModal
  const handleConfirmDelete = async (idToDelete) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubsidiaries((prev) => prev.filter((sub) => sub.id !== idToDelete));

    const deletedName =
      subsidiaries.find((s) => s.id === idToDelete)?.name || 'The subsidiary';
    setSuccessMessage(`${deletedName} was deleted successfully.`);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Company Information"
        text="Manage your business information and subsidiaries"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Create Subsidiary Button - Triggers "Create" action */}
      <div className="flex justify-end mb-6 max-w-7xl mx-auto">
        <Button
          variant="primary"
          onClick={() => handleAction('Create', null)}
          className="bg-orange-500 hover:bg-orange-600 text-white shadow-md"
        >
          Create Subsidiary
        </Button>
      </div>

      {/* Subsidiary List */}
      <SubsidiaryList data={subsidiaries} onAction={handleAction} />

      {/* --- MODALS --- */}

      {/* 1. Create/Edit Modal */}
      <AddEditSubsidiaryModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSubmit={handleModalSubmit}
        isEditMode={isEditMode}
        subsidiaryData={isEditMode ? subsidiaryToHandle : null}
      />

      {/* 2. View Modal */}
      <ViewSubsidiaryModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        subsidiaryData={subsidiaryToHandle}
      />

      {/* 3. Delete Confirmation Modal */}
      <DeleteSubsidiaryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        subsidiaryData={subsidiaryToHandle}
        onConfirm={handleConfirmDelete}
      />

      {/* 4. Confirmation Modal (Data Review before Save) */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        data={subsidiaryToHandle}
        onConfirm={handleConfirmAndSave}
        isSubmitting={isSubmitting}
      />

      {/* 5. Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title={isSubmitting ? 'Processing...' : 'Action Successful!'}
        message={successMessage || 'Your action has been completed.'}
      />
    </div>
  );
}
