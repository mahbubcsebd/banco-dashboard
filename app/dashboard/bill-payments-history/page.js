'use client';

import PaymentHistoryFilter from '@/components/bill-payments-history/PaymentHistoryFilter';
import PaymentResultsList from '@/components/bill-payments-history/PaymentResultsList';
import HeaderTop from '@/components/global/HeaderTop';
import { useState } from 'react';

// --- মক ডেটা ---
const allPaymentsData = [
  {
    id: 1,
    date: '2025-11-04 03:55:07',
    payFrom: '210001002331',
    payTo: 'HSBC Corp',
    reference: 'Ref: 8523941',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 2,
    date: '2025-11-02 12:17:21',
    payFrom: '110001002321',
    payTo: 'Utility Co.',
    reference: 'Ref: 282362347',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 3,
    date: '2025-10-29 03:55:16',
    payFrom: '210001002331',
    payTo: 'HSBC Corp',
    reference: 'Ref: 1566622',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 4,
    date: '2025-10-28 16:29:49',
    payFrom: '210001002331',
    payTo: 'Internet Provider',
    reference: 'Ref: 038400446',
    amount: 11.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 5,
    date: '2025-10-24 13:22:49',
    payFrom: '110001002321',
    payTo: 'HSBC Corp',
    reference: 'Ref: 335672996',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 6,
    date: '2025-10-24 07:05:04',
    payFrom: '210001002331',
    payTo: 'HSBC Corp',
    reference: 'Ref: 1423538',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 7,
    date: '2025-10-24 01:05:50',
    payFrom: '110001002321',
    payTo: 'Water Co',
    reference: 'Ref: 4815610',
    amount: 1.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 8,
    date: '2025-10-23 05:05:53',
    payFrom: '110001002321',
    payTo: 'HSBC Corp',
    reference: 'Ref: 1607991',
    amount: 11.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 9,
    date: '2025-10-23 05:05:51',
    payFrom: '210001002331',
    payTo: 'HSBC Corp',
    reference: 'Ref: 6907387',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 10,
    date: '2025-10-23 05:05:51',
    payFrom: '110001002321',
    payTo: 'HSBC Corp',
    reference: 'Ref: 5500110',
    amount: 1.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
];
// --- মক ডেটা শেষ ---

// একটি সাধারণ ফিল্টার ফাংশন
const filterPayments = (data, filters) => {
  if (!filters) return data;

  return data.filter((payment) => {
    // 1. Biller Filter
    if (filters.biller && filters.biller !== 'All') {
      if (payment.payTo !== filters.biller) return false;
    }

    // 2. Date From/To Filter (Simplified comparison for mock data)
    // In a real app, this would use Date objects for accurate comparison
    const paymentDate = new Date(payment.date.split(' ')[0]);
    const dateFrom = filters.dateFrom
      ? new Date(filters.dateFrom)
      : new Date(0);
    const dateTo = filters.dateTo ? new Date(filters.dateTo) : new Date();

    if (paymentDate < dateFrom || paymentDate > dateTo) return false;

    return true;
  });
};

export default function PaymentHistoryPage() {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    biller: 'All', // Default filter option
  });

  const [filteredResults, setFilteredResults] = useState(allPaymentsData);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (newFilters) => {
    setIsSearching(true);
    // 1 second delay simulation
    setTimeout(() => {
      setFilters(newFilters);
      const results = filterPayments(allPaymentsData, newFilters);
      setFilteredResults(results);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Payment History"
        text="View and track all your payments"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Payment History Filter Form */}
      <PaymentHistoryFilter
        initialFilters={filters}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {/* Payment Results List (Responsive) */}
      <PaymentResultsList data={filteredResults} isSearching={isSearching} />
    </div>
  );
}
