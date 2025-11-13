'use client';

import ContactOptions from '@/components/contact-us/ContactOptions';
import HeaderTop from '@/components/global/HeaderTop';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const DynamicMapLocation = dynamic(
  () => import('@/components/contact-us/MapLocation'),
  {
    ssr: false, // Prevents 'window is not defined' error
    loading: () => (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Loading map component...</p>
      </div>
    ),
  }
);

// Mock Contact Data
const contactData = {
  whatsapp: {
    number: '+1 (703) 953-7415',
    label: 'WHATSAPP',
  },
  call: {
    number: '+1 (703) 953-7415',
    label: 'CALL US AT',
  },
  email: {
    address: 'info@finxact.com',
    label: 'EMAIL ADDRESS',
  },
  website: {
    url: 'https://www.finxact.com/',
    label: 'WEBSITE',
  },
  office: {
    name: 'Finxact from Fiserv',
    address1: '1301 Riverplace Blvd #500T,',
    address2: 'Jacksonville, FL 32207, United States',
    mapCenter: { lat: 30.332, lng: -81.655 }, // Example coordinates for Jacksonville
  },
};

export default function ContactUsPage() {
  return (
    <div className="p-6">
      <HeaderTop
        title="Contact Us"
        text="We're here to help. If you have any questions or suggestions about our products or services, please reach us on any of the options below."
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Contact Options Grid */}
        <ContactOptions data={contactData} />

        {/* Map and Location Detail */}
        <DynamicMapLocation locationData={contactData.office} />
      </motion.div>
    </div>
  );
}
