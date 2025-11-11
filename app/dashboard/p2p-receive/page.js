'use client';

import HeaderTop from '@/components/global/HeaderTop';
import RegisteredPayeesSection from '@/components/p2p-receive/RegisteredPayeesSection';
import { useState } from 'react';

// --- MOCK DATA ---
const registeredPayees = [
  {
    id: 1,
    nickname: 'test input',
    emailPhone: 'testinput@gmail.com',
    receiveAccount: '210001002331',
  },
  {
    id: 2,
    nickname: 'test input edited',
    emailPhone: 'testinputtest@gmail.com',
    receiveAccount: '210001002331',
  },
  {
    id: 3,
    nickname: 'an test',
    emailPhone: 'antest@gmail.com',
    receiveAccount: '210001002551',
  },
  {
    id: 4,
    nickname: 'Phone Contact 1',
    emailPhone: '973041001',
    receiveAccount: '210001002331',
  },
  {
    id: 5,
    nickname: 'ewvf',
    emailPhone: 'test@gmail.com',
    receiveAccount: '210001002331',
  },
  {
    id: 6,
    nickname: 'Phone Contact 2',
    emailPhone: '324324234',
    receiveAccount: '110001002321',
  },
];
// --- MOCK DATA END ---

export default function ReceiveMoneyFromThirdPartyPage() {
  const [payees, setPayees] = useState(registeredPayees);
  const [selectedPayees, setSelectedPayees] = useState([]);

  const handleRegister = () => {
    console.log('Navigating to registration form...');
    // router.push('/p2p/register');
  };

  const handleDelete = () => {
    if (selectedPayees.length === 0) {
      alert('Please select at least one payee to delete.');
      return;
    }

    console.log('Deleting payees with IDs:', selectedPayees);

    const remainingPayees = payees.filter(
      (payee) => !selectedPayees.includes(payee.id)
    );

    // Simulate API call and update state
    setTimeout(() => {
      setPayees(remainingPayees);
      setSelectedPayees([]);
      console.log('Deletion simulated successfully.');
    }, 500);
  };

  const handleToggleSelect = (id) => {
    setSelectedPayees((prev) =>
      prev.includes(id)
        ? prev.filter((payeeId) => payeeId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="p-6">
      <HeaderTop
        title="Receive Money from Third Party"
        text="Below are list of registered P2P Payees to receive money"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <RegisteredPayeesSection
        data={payees}
        selectedPayees={selectedPayees}
        onToggleSelect={handleToggleSelect}
        onRegister={handleRegister}
        onDelete={handleDelete}
        onCancel={() => setSelectedPayees([])}
      />
    </div>
  );
}
