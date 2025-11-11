'use client';

import SavedBillersList from '@/components/bill-payments-billers/SavedBillersList';
import TemplateFilter from '@/components/bill-payments-billers/TemplateFilter';
import HeaderTop from '@/components/global/HeaderTop';
import { useState } from 'react';

// --- MOCK DATA ---
const savedBillersData = [
  {
    id: 1,
    billerName: 'G Exch',
    billerCategory: 'Utilities',
    accountNumber: '123456789',
    referenceNumber: 'REF1001',
  },
  {
    id: 2,
    billerName: 'HSBC CorpTiruTest',
    billerCategory: 'Bank/Finance',
    accountNumber: '987654321',
    referenceNumber: 'REF1002',
  },
  {
    id: 3,
    billerName: 'tester22',
    billerCategory: 'Telecom',
    accountNumber: '555444333',
    referenceNumber: 'REF1003',
  },
  {
    id: 4,
    billerName: 'tesfg',
    billerCategory: 'Utilities',
    accountNumber: '112233445',
    referenceNumber: 'REF1004',
  },
  {
    id: 5,
    billerName: 'ntest',
    billerCategory: 'Telecom',
    accountNumber: '998877665',
    referenceNumber: 'REF1005',
  },
  {
    id: 6,
    billerName: 'test111',
    billerCategory: 'Other',
    accountNumber: '102938475',
    referenceNumber: 'REF1006',
  },
];
// --- MOCK DATA END ---

const filterBillers = (data, filters) => {
  return data.filter((biller) => {
    // 1. Category Filter
    if (
      filters.category !== 'All' &&
      biller.billerCategory !== filters.category
    )
      return false;

    // 2. Search Filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matches =
        biller.billerName.toLowerCase().includes(searchTerm) ||
        biller.accountNumber.includes(searchTerm) ||
        biller.referenceNumber.includes(searchTerm);
      if (!matches) return false;
    }

    return true;
  });
};

export default function ManageBillTemplatePage() {
  const [filters, setFilters] = useState({
    category: 'All',
    search: '',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredResults = filterBillers(savedBillersData, filters);

  return (
    <div className="p-6">
      <HeaderTop
        title="Manage Bill Template"
        text="View, edit, or delete your saved billers for bill payments"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <TemplateFilter
        initialFilters={filters}
        onFilterChange={handleFilterChange}
      />

      <SavedBillersList data={filteredResults} />
    </div>
  );
}
