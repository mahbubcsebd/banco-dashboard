'use client';

import HeaderTop from '@/components/global/HeaderTop';
import NumberManagementForm from '@/components/mobile-manage/NumberManagementForm';
import SavedNumbersTable from '@/components/mobile-manage/SavedNumbersTable';
import { useState } from 'react';

// --- MOCK DATA ---
const initialSavedNumbers = [
  {
    id: 1,
    nickname: 'mehedihasjib',
    mobileNumber: '234567889',
    mobileCarrier: 'UTS',
  },
  {
    id: 2,
    nickname: 'mehe-hdi',
    mobileNumber: '8768768768',
    mobileCarrier: 'UTS',
  },
  {
    id: 3,
    nickname: "Wife's Phone",
    mobileNumber: '1122334455',
    mobileCarrier: 'Digicel',
  },
  {
    id: 4,
    nickname: 'Office Line',
    mobileNumber: '555000999',
    mobileCarrier: 'Chippie',
  },
];
// --- MOCK DATA END ---

export default function ManageMobileNumbersPage() {
  const [savedNumbers, setSavedNumbers] = useState(initialSavedNumbers);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveNumber = async (formData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newNumber = {
      id: savedNumbers.length + 1,
      ...formData,
    };

    setSavedNumbers((prev) => [...prev, newNumber]);
    console.log('New mobile number saved:', newNumber);
    setIsSubmitting(false);
  };

  const handleDelete = (id) => {
    setSavedNumbers((prev) => prev.filter((num) => num.id !== id));
    console.log(`Deleted mobile number ID: ${id}`);
  };

  const handleEdit = (id, updatedData) => {
    setSavedNumbers((prev) =>
      prev.map((num) => (num.id === id ? { ...num, ...updatedData } : num))
    );
    console.log(`Edited mobile number ID: ${id}`);
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Manage Mobile Numbers"
        text="Add and manage your frequently used mobile numbers"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Form Section */}
      <NumberManagementForm
        onSubmit={handleSaveNumber}
        isSubmitting={isSubmitting}
      />

      {/* Table Section */}
      <SavedNumbersTable
        data={savedNumbers}
        onDelete={handleDelete}
        onEdit={handleEdit} // Pass edit handler
      />
    </div>
  );
}
