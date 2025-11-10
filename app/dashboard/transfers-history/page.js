'use client';

import HeaderTop from '@/components/global/HeaderTop';
// import HistoryFilterForm from '@/components/transfer-history/HistoryFilterForm';
import HistoryFilterForm from '@/components/transfers-history/HistoryFilterForm';
import HistoryResultsTable from '@/components/transfers-history/HistoryResultsTable';
import { useState } from 'react';

// --- মক ডেটা ---
const allTransfersData = [
  {
    id: 1,
    date: '11/05/2025',
    type: 'Between Accounts at Finxact',
    description: 'Savings to Checking',
    amount: 150.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 2,
    date: '10/28/2025',
    type: 'To Other Local Banks',
    description: 'Payment to Utility Co.',
    amount: 75.5,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 3,
    date: '10/15/2025',
    type: 'To Other Local Banks',
    description: 'Rent Payment',
    amount: 1200.0,
    currency: 'USD',
    status: 'SCHEDULED', // Example of a scheduled/pending status
  },
  {
    id: 4,
    date: '09/01/2025',
    type: 'P2P Payments',
    description: 'Gift to John Doe',
    amount: 25.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 5,
    date: '08/20/2025',
    type: 'Between Accounts at Finxact',
    description: 'Emergency Fund Top Up',
    amount: 500.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 6,
    date: '07/15/2025',
    type: 'Bill Payments',
    description: 'Cable Bill',
    amount: 85.99,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 7,
    date: '06/01/2025',
    type: 'To Other Local Banks',
    description: 'Mortgage',
    amount: 2500.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 8,
    date: '05/10/2025',
    type: 'Between Accounts at Finxact',
    description: 'Interest Posting',
    amount: 12.34,
    currency: 'USD',
    status: 'SUCCESS',
  },
];
const filterTransfers = (data, filters) => {
  if (!filters) return data;

  return data.filter((transfer) => {
    // Transaction Type Filter
    if (filters.transactionType && filters.transactionType !== 'All') {
      if (transfer.type !== filters.transactionType) return false;
    }

    // Amount From/To Filter
    const amount = transfer.amount;
    const amountFrom = parseFloat(filters.amountFrom) || 0;
    const amountTo = parseFloat(filters.amountTo) || Infinity;

    if (amount < amountFrom || amount > amountTo) return false;

    const transferDate = new Date(transfer.date);
    const dateFrom = filters.dateFrom
      ? new Date(filters.dateFrom)
      : new Date(0);
    const dateTo = filters.dateTo ? new Date(filters.dateTo) : new Date();

    if (transferDate < dateFrom || transferDate > dateTo) return false;

    return true;
  });
};

export default function TransferHistoryPage() {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    transactionType: 'All',
    amountFrom: '',
    amountTo: '',
  });

  const [filteredResults, setFilteredResults] = useState(allTransfersData);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (newFilters) => {
    setIsSearching(true);
    // 2 second delay simulation
    setTimeout(() => {
      setFilters(newFilters);
      const results = filterTransfers(allTransfersData, newFilters);
      setFilteredResults(results);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="">
      <HeaderTop
        title="Transfer History"
        text="View and track all your money transfers"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* History Filter Form */}
      <HistoryFilterForm
        initialFilters={filters}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {/* History Results Table */}
      <HistoryResultsTable data={filteredResults} isSearching={isSearching} />
    </div>
  );
}
