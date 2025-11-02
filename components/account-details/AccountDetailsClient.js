'use client';

import AccountBalanceCard from '@/components/account-details/AccountBalanceCard';
import AccountDetailsList from '@/components/account-details/AccountDetailsList';
import QuickActionsGrid from '@/components/account-details/QuickActionsGrid';
import StatementCard from '@/components/account-details/StatementCard';
import TransactionCard from '@/components/account-details/TransactionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AccountDetailsClient = ({ account }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = account.transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      {/* Main Content */}
      <div className="">
        <AccountBalanceCard account={account} />
        <QuickActionsGrid />
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-auto bg-white border border-gray-200 p-1 rounded-xl">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg py-2.5 text-xs sm:text-sm font-medium"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg py-2.5 text-xs sm:text-sm font-medium"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="statements"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg py-2.5 text-xs sm:text-sm font-medium"
            >
              Statements
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg py-2.5 text-xs sm:text-sm font-medium"
            >
              Details
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Recent Transactions
                </h3>
              </div>
              <div className="space-y-2">
                {account.transactions.slice(0, 5).map((transaction, index) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    index={index}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 hover:bg-gray-100 text-gray-700 font-medium"
              >
                View All Transactions
              </Button>
            </motion.div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="mt-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-200"
                />
              </div>

              {/* Transactions List */}
              <div className="space-y-2">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                      index={index}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>No transactions found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* Statements Tab */}
          <TabsContent value="statements" className="mt-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Account Statements
              </h3>
              <div className="space-y-2">
                {account.statements.map((statement, index) => (
                  <StatementCard
                    key={statement.month}
                    statement={statement}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Account Information
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <AccountDetailsList account={account} />
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  );
};

export default AccountDetailsClient;
