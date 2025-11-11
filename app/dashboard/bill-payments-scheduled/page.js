'use client';

import ScheduledPaymentsFilter from '@/components/bill-payments-scheduled/ScheduledPaymentsFilter';
import UpcomingPaymentsList from '@/components/bill-payments-scheduled/UpcomingPaymentsList';
import HeaderTop from '@/components/global/HeaderTop';
import { useState } from 'react';

// --- MOCK DATA ---
const scheduledPaymentsData = [
  {
    id: 1,
    payFrom: '110001002321',
    payTo: '30146999',
    date: '10/22/2025',
    amount: 11.0,
    currency: 'USD',
    status: 'Expired',
    reference: 'Ref: 1234',
  },
  {
    id: 2,
    payFrom: '110001002321',
    payTo: '30146999',
    date: '10/09/2025',
    amount: 1.0,
    currency: 'USD',
    status: 'Active',
    reference: 'Ref: 5678',
  },
  {
    id: 3,
    payFrom: '210001002551',
    payTo: '987654321',
    date: '06/20/2025',
    amount: 11.0,
    currency: 'USD',
    status: 'Expired',
    reference: 'Ref: 9012',
  },
  {
    id: 4,
    payFrom: '110001002321',
    payTo: '3351200901',
    date: '10/30/2025',
    amount: 1.0,
    currency: 'USD',
    status: 'Cancelled',
    reference: 'Ref: 3456',
  },
  {
    id: 5,
    payFrom: '110001002321',
    payTo: '831010290',
    date: '10/13/2025',
    amount: 1.0,
    currency: 'USD',
    status: 'Cancelled',
    reference: 'Ref: 7890',
  },
  {
    id: 6,
    payFrom: '210001002441',
    payTo: '831010290',
    date: '10/03/2025',
    amount: 100.0,
    currency: 'USD',
    status: 'Cancelled',
    reference: 'Ref: 1357',
  },
  {
    id: 7,
    payFrom: '210001002331',
    payTo: '30146999',
    date: '10/07/2025',
    amount: 10.0,
    currency: 'USD',
    status: 'Active',
    reference: 'Ref: 2468',
  },
];
// --- MOCK DATA END ---

const filterPayments = (data, filters) => {
  // Simplified filtering logic based on mock data
  return data.filter((payment) => {
    if (filters.status !== 'All' && payment.status !== filters.status)
      return false;
    if (
      filters.fromAccount !== 'All' &&
      payment.payFrom !== filters.fromAccount
    )
      return false;

    // Simple search functionality
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matches =
        payment.payFrom.includes(searchTerm) ||
        payment.payTo.includes(searchTerm) ||
        payment.reference.toLowerCase().includes(searchTerm);
      if (!matches) return false;
    }

    return true;
  });
};

export default function ManageScheduledBillPayments() {
  const [filters, setFilters] = useState({
    status: 'All',
    fromAccount: 'All',
    search: '',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredResults = filterPayments(scheduledPaymentsData, filters);

  const handleNewPayment = () => {
    console.log('Navigating to new bill payment form...');
    // router.push('/dashboard/bill-payments/new');
  };

  return (
    <div className="">
      <HeaderTop
        title="Manage Scheduled Bill Payments"
        text="View and manage all your upcoming payments"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <div className="p-6">
        <ScheduledPaymentsFilter
          initialFilters={filters}
          onFilterChange={handleFilterChange}
          onNewPayment={handleNewPayment}
        />

        <UpcomingPaymentsList data={filteredResults} />
      </div>
    </div>
  );
}
