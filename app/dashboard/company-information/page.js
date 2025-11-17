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
      firstName: 'Alex',
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
      firstName: 'Maria',
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
  {
    id: 3,
    name: 'Benjamin Lee',
    phone: '3125559988',
    email: 'ben.lee@example.com',
    note: 'HR Coordinator',
    details: {
      firstName: 'Benjamin',
      lastName: 'Lee',
      nickname: 'HRBen',
      addressLine1: '89 Oak Ridge Blvd',
      addressLine2: '',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      homePhoneNumber: '3125559988',
      mobileNumber: '8881112222',
      personalEmailAddress: 'ben@company.com',
      achCompanyName: 'ACH CO 3',
      achCompanyIdentificationIcd: '3_EIN',
      achCompanyIdentification: 'ach1233',
      irsNif: 'irs23322',
      legalForm: 'LLP',
      businessSector: 'FINANCE',
    },
  },
  {
    id: 4,
    name: 'Sophia Martinez',
    phone: '7185552211',
    email: 'sophia.m@example.com',
    note: 'Operations Manager',
    details: {
      firstName: 'Sophia',
      lastName: 'Martinez',
      nickname: 'OpsSophia',
      addressLine1: '400 Main Street',
      addressLine2: 'Apt 5B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      homePhoneNumber: '7185552211',
      mobileNumber: '8883334444',
      personalEmailAddress: 'sophia@company.com',
      achCompanyName: 'ACH CO 4',
      achCompanyIdentificationIcd: '4_EIN',
      achCompanyIdentification: 'ach4433',
      irsNif: 'nif4433',
      legalForm: 'CORP',
      businessSector: 'TECHNOLOGY',
    },
  },
  {
    id: 5,
    name: 'Daniel Kim',
    phone: '2135554521',
    email: 'dan.kim@example.com',
    note: 'IT Support Specialist',
    details: {
      firstName: 'Daniel',
      lastName: 'Kim',
      nickname: 'ITDan',
      addressLine1: '90 Sunset Blvd',
      addressLine2: '',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      homePhoneNumber: '2135554521',
      mobileNumber: '7775556666',
      personalEmailAddress: 'dan@company.com',
      achCompanyName: 'ACH CO 5',
      achCompanyIdentificationIcd: '5_EIN',
      achCompanyIdentification: 'ach5511',
      irsNif: 'nif5511',
      legalForm: 'LLC',
      businessSector: 'SERVICES',
    },
  },
  {
    id: 6,
    name: 'Emily Davis',
    phone: '4075557788',
    email: 'emily.d@example.com',
    note: 'Marketing Coordinator',
    details: {
      firstName: 'Emily',
      lastName: 'Davis',
      nickname: 'MktEmily',
      addressLine1: '55 Palm Drive',
      addressLine2: '',
      city: 'Orlando',
      state: 'FL',
      zipCode: '32801',
      homePhoneNumber: '4075557788',
      mobileNumber: '6661113333',
      personalEmailAddress: 'emily@company.com',
      achCompanyName: 'ACH CO 6',
      achCompanyIdentificationIcd: '6_EIN',
      achCompanyIdentification: 'ach6633',
      irsNif: 'nif6633',
      legalForm: 'INC',
      businessSector: 'MARKETING',
    },
  },
  {
    id: 7,
    name: 'Christopher Brown',
    phone: '6025553344',
    email: 'chris.b@example.com',
    note: 'Procurement Lead',
    details: {
      firstName: 'Christopher',
      lastName: 'Brown',
      nickname: 'ProcChris',
      addressLine1: '320 Desert Road',
      addressLine2: '',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      homePhoneNumber: '6025553344',
      mobileNumber: '5552229999',
      personalEmailAddress: 'chris@company.com',
      achCompanyName: 'ACH CO 7',
      achCompanyIdentificationIcd: '7_EIN',
      achCompanyIdentification: 'ach7766',
      irsNif: 'nif7766',
      legalForm: 'LLC',
      businessSector: 'LOGISTICS',
    },
  },
  {
    id: 8,
    name: 'Olivia Wilson',
    phone: '2065559988',
    email: 'olivia.w@example.com',
    note: 'Product Designer',
    details: {
      firstName: 'Olivia',
      lastName: 'Wilson',
      nickname: 'DesignLiv',
      addressLine1: '77 Pine Street',
      addressLine2: '',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      homePhoneNumber: '2065559988',
      mobileNumber: '4445552222',
      personalEmailAddress: 'olivia@company.com',
      achCompanyName: 'ACH CO 8',
      achCompanyIdentificationIcd: '8_EIN',
      achCompanyIdentification: 'ach8899',
      irsNif: 'nif8899',
      legalForm: 'INC',
      businessSector: 'DESIGN',
    },
  },
  {
    id: 9,
    name: 'William Thompson',
    phone: '6155553311',
    email: 'will.t@example.com',
    note: 'Compliance Officer',
    details: {
      firstName: 'William',
      lastName: 'Thompson',
      nickname: 'ComWill',
      addressLine1: '12 Maple Lane',
      addressLine2: '',
      city: 'Nashville',
      state: 'TN',
      zipCode: '37201',
      homePhoneNumber: '6155553311',
      mobileNumber: '5551114444',
      personalEmailAddress: 'will@company.com',
      achCompanyName: 'ACH CO 9',
      achCompanyIdentificationIcd: '9_EIN',
      achCompanyIdentification: 'ach9988',
      irsNif: 'nif9988',
      legalForm: 'LLP',
      businessSector: 'LEGAL',
    },
  },
  {
    id: 10,
    name: 'Ava Hernandez',
    phone: '3055556677',
    email: 'ava.h@example.com',
    note: 'Customer Relations',
    details: {
      firstName: 'Ava',
      lastName: 'Hernandez',
      nickname: 'CR_Ava',
      addressLine1: '450 Ocean Drive',
      addressLine2: 'Unit 21',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      homePhoneNumber: '3055556677',
      mobileNumber: '4443332222',
      personalEmailAddress: 'ava@company.com',
      achCompanyName: 'ACH CO 10',
      achCompanyIdentificationIcd: '10_EIN',
      achCompanyIdentification: 'ach1011',
      irsNif: 'nif1011',
      legalForm: 'CORP',
      businessSector: 'HOSPITALITY',
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
