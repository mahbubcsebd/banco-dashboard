'use client';

import MobileLandingPage from '@/components/landing/MobileLandingPage';
import { FileText, History, Zap } from 'lucide-react';

export default function BillPayLandingPage() {
  const images = [
    {
      src: 'https:/login/images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80',
      alt: 'Pay bills easily',
    },
    {
      src: 'https:/login/images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80',
      alt: 'Schedule payments',
    },
    {
      src: 'https:/login/images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
      alt: 'Track your bills',
    },
  ];

  const actions = [
    {
      title: 'Bill Payments',
      icon: Zap,
      href: '/dashboard/bill-payments-pay',
    },
    {
      title: 'Payment History',
      icon: History,
      href: '/dashboard/bill-payments-history',
    },
    {
      title: 'Manage Payees',
      icon: FileText,
      href: '/dashboard/bill-payments-billers',
    },
  ];

  return (
    <MobileLandingPage title="Bill Pay" images={images} actions={actions} />
  );
}
