'use client';

import HeaderTop from '@/components/global/HeaderTop';
import ScheduledTransferFilter from '@/components/transfers-scheduled/ScheduledTransferFilter';
import UpcomingTransfersTable from '@/components/transfers-scheduled/UpcomingTransfersTable';
import { useEffect, useState } from 'react';

const allScheduledTransfers = [
  {
    id: 101,
    date: '12/01/2025',
    transferType: 'Bill Payment',
    fromAccount: 'CHK 110001002321',
    to: 'Internet Service Provider',
    amount: 99.5,
    currency: 'USD',
    frequency: 'Monthly',
    status: 'ACTIVE',
  },
  {
    id: 102,
    date: '11/15/2025',
    transferType: 'To Other Local Banks',
    fromAccount: 'SAV 210001002331',
    to: 'Local Bank A',
    amount: 500.0,
    currency: 'USD',
    frequency: 'One Time',
    status: 'ACTIVE',
  },
  {
    id: 103,
    date: '12/10/2025',
    transferType: 'Between Accounts at Finxact',
    fromAccount: 'CHK 110001002321',
    to: 'Savings Plus',
    amount: 200.0,
    currency: 'USD',
    frequency: 'Monthly',
    status: 'ACTIVE',
  },
  {
    id: 104,
    date: '01/01/2026',
    transferType: 'P2P Payments',
    fromAccount: 'SAV 210001002441',
    to: 'Sarah K.',
    amount: 50.0,
    currency: 'USD',
    frequency: 'Quarterly',
    status: 'PAUSED',
  },
];
const filterScheduledTransfers = (data, filters) => {
  if (!filters) return data;

  return data.filter((transfer) => {
    // 1. Transfer Type Filter
    if (filters.transferType && filters.transferType !== 'All') {
      if (transfer.transferType !== filters.transferType) return false;
    }

    // 2. From Account Filter
    if (filters.fromAccount && filters.fromAccount !== 'All') {
      if (transfer.fromAccount !== filters.fromAccount) return false;
    }

    return true;
  });
};

export default function ScheduledTransfersPage() {
  const [filters, setFilters] = useState({
    transferType: 'All',
    fromAccount: 'All',
  });

  const [filteredResults, setFilteredResults] = useState(allScheduledTransfers);

  // Apply filters whenever state changes (or initially)
  useEffect(() => {
    const results = filterScheduledTransfers(allScheduledTransfers, filters);
    setFilteredResults(results);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleBack = () => {
    console.log('Navigating back to Transfers menu...');
  };

  return (
    <div className="">
      <HeaderTop
        title="Scheduled Transfers"
        text="View and manage all your upcoming transfers"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Filter and Back button area */}
      <ScheduledTransferFilter
        initialFilters={filters}
        onFilterChange={handleFilterChange}
        onBack={handleBack}
      />

      {/* Results Table */}
      <UpcomingTransfersTable data={filteredResults} />
    </div>
  );
}
