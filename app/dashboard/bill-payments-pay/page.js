'use client';

import BillPaymentForm from '@/components/bill-payments-pay/BillPaymentForm';
import PaymentHistoryTable from '@/components/bill-payments-pay/PaymentHistoryTable';
import HeaderTop from '@/components/global/HeaderTop';
import { useState } from 'react';

const recentPaymentsData = [
  {
    id: 1,
    payFrom: '210001002331',
    payTo: 'HSBC Corp',
    date: '2025-10-24 07:12:00',
    reference: 'Ref: 923481',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 2,
    payFrom: '110001002321',
    payTo: 'Electricity Co.',
    date: '2025-10-23 15:52:20',
    reference: 'Ref: 1616747',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 3,
    payFrom: '110001002321',
    payTo: 'HSBC Corp',
    date: '2025-10-23 15:45:10',
    reference: 'Ref: 605202',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 4,
    payFrom: '210001002331',
    payTo: 'Water Utilities',
    date: '2025-10-23 10:23:40',
    reference: 'Ref: 65840746',
    amount: 11.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 5,
    payFrom: '110001002321',
    payTo: 'HSBC Corp',
    date: '2025-10-24 12:27:41',
    reference: 'Ref: 539678436',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
  {
    id: 6,
    payFrom: '210001002331',
    payTo: 'HSBC Corp',
    date: '2025-10-24 07:15:04',
    reference: 'Ref: 1415381',
    amount: 10.0,
    currency: 'USD',
    status: 'SUCCESS',
  },
];

export default function PayBillsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBillSubmit = async (formData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Bill payment submitted:', formData);
    setIsSubmitting(false);

    // After success, you might want to update the history table
  };

  return (
    <div className="">
      <HeaderTop
        title="Pay Bills"
        text="Manage and pay your bills securely and conveniently"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Bill Payment Form */}
      <BillPaymentForm
        onSubmit={handleBillSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Recent Payments Table */}
      <PaymentHistoryTable data={recentPaymentsData} />
    </div>
  );
}
