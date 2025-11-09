import AccountDetailsClient from '@/components/account-details/AccountDetailsClient';
import { getAccountByNumber } from '@/data/mockData';
import { notFound } from 'next/navigation';

const AccountDetailsPage = async ({ params }) => {
  const { id } = await params;

  const account = getAccountByNumber(id);

  if (!account) {
    notFound();
  }

  return <AccountDetailsClient account={account} />;
};

export default AccountDetailsPage;
