'use client';

import HeaderTop from '@/components/global/HeaderTop';
import MessageFilter from '@/components/secure-messages/MessageFilter';
import MessagesList from '@/components/secure-messages/MessagesList';
import NewSecureMessageModal from '@/components/secure-messages/NewSecureMessageModal';
import { useState } from 'react';

// --- MOCK DATA ---
const initialMessages = [
  {
    id: 1,
    subject: 'Consumer Loan',
    category: 'Loan',
    date: '06/13/2025',
    status: 'Unread',
    isRead: false,
    content: 'Regarding your recent loan application status...',
  },
  {
    id: 2,
    subject: 'Bank Account',
    category: 'Account Inquiry',
    date: '06/13/2025',
    status: 'Read',
    isRead: true,
    content:
      'We have updated the terms and conditions for your checking account...',
  },
  {
    id: 3,
    subject: 'Change e-mail address',
    category: 'Profile Update',
    date: '06/13/2025',
    status: 'Read',
    isRead: true,
    content: 'Your request to change your email address has been processed.',
  },
  {
    id: 4,
    subject: 'Unread Notification',
    category: 'Notification',
    date: '06/12/2025',
    status: 'Unread',
    isRead: false,
    content: 'A new statement is available for viewing.',
  },
];
// --- MOCK DATA END ---

const filterMessages = (data, filters) => {
  return data.filter((msg) => {
    // Status Filter (Inbox/Sent/Read/Unread) - Assuming "Inbox" means reading the list as is.
    if (filters.status === 'Unread' && msg.isRead) return false;
    if (filters.status === 'Read' && !msg.isRead) return false;

    // Category Filter
    if (
      filters.category !== 'All Categories' &&
      msg.category !== filters.category
    )
      return false;

    // Date Range filtering logic can be added here based on filters.dateRange

    return true;
  });
};

export default function SecureMessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [filters, setFilters] = useState({
    status: 'Inbox', // Default: Inbox
    category: 'All Categories',
    dateRange: 'Select',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'Inbox',
      category: 'All Categories',
      dateRange: 'Select',
    });
  };

  const handleSendNewMessage = async (formData) => {
    // Simulate API call to send message
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newMessage = {
      id: messages.length + 1,
      subject: formData.subject,
      category: 'Sent', // Mark as Sent category for display
      date: new Date().toLocaleDateString('en-US'),
      status: 'Sent',
      isRead: true, // Messages sent by user are "read" by user
      content: formData.message,
    };

    setMessages((prev) => [newMessage, ...prev]);
    console.log('New message sent:', formData);
    setIsModalOpen(false);
  };

  const filteredMessages = filterMessages(messages, filters);

  return (
    <div className="p-6">
      <HeaderTop
        title="Secure Messages"
        text="Securely communicate with our banking team"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Filter Section */}
      <MessageFilter
        initialFilters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Messages List and + New Message Button */}
      <MessagesList
        data={filteredMessages}
        onNewMessageClick={() => setIsModalOpen(true)}
      />

      {/* New Message Modal */}
      <NewSecureMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSendNewMessage}
      />
    </div>
  );
}
