// app/dashboard/accounts/page.jsx
'use client';

import AccountsSection from '@/components/accounts/AccountsSection';
import SummaryCards from '@/components/accounts/SummaryCards';
import { accounts } from '@/data/mockData';

const AccountsPage = () => {
  // Calculate summary from accounts
  const summaryData = {
    totalCurrent: accounts
      .filter((acc) => acc.type === 'CURRENT')
      .reduce((sum, acc) => sum + acc.balance, 0),
    totalSavings: accounts
      .filter((acc) => acc.type === 'SAVINGS')
      .reduce((sum, acc) => sum + acc.balance, 0),
    totalInvestment: accounts
      .filter((acc) => acc.type === 'INVESTMENT')
      .reduce((sum, acc) => sum + acc.balance, 0),
    totalBalance: accounts.reduce((sum, acc) => sum + acc.balance, 0),
  };

  return (
    <div className="">
      {/* Summary Cards */}
      <SummaryCards data={summaryData} />

      {/* Accounts Section */}
      <AccountsSection accounts={accounts} />
    </div>
  );
};

export default AccountsPage;
