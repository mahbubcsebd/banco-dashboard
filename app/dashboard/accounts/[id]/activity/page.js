// app/dashboard/accounts/[id]/activity/page.jsx
'use client';

import TransactionCard from '@/components/account-details/TransactionCard';
import HeaderTop from '@/components/global/HeaderTop';
import { accounts } from '@/data/mockData';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

const ActivityPage = () => {
  const params = useParams();
  const accountId = parseInt(params.id);
  const account = accounts.find((acc) => acc.id === accountId);

  const [activeTab, setActiveTab] = useState('activity');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  if (!account) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Account not found</p>
          <Link
            href="/dashboard/accounts"
            className="inline-block mt-4 text-orange-600 hover:text-orange-700 font-medium"
          >
            Go back to accounts
          </Link>
        </div>
      </div>
    );
  }

  const getGradientClass = (gradient) => {
    if (!gradient) return 'bg-gradient-to-r from-gray-400 to-gray-500';
    return `bg-gradient-to-r ${gradient}`;
  };

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return (account.transactions || []).filter(
      (txn) =>
        txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [account.transactions, searchQuery]);

  // TanStack Table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        cell: (info) => (
          <div className="text-sm text-gray-600">
            {info.getValue()}
            <div className="text-xs text-gray-400 mt-1">
              {info.row.original.time}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: (info) => (
          <div>
            <p className="text-sm font-medium text-gray-900">
              {info.getValue()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {info.row.original.category}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: (info) => {
          const transaction = info.row.original;
          return (
            <div className="text-right">
              <span
                className={`text-sm font-semibold ${
                  transaction.type === 'credit'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {transaction.type === 'credit' ? '+' : '-'}$
                {info.getValue().toFixed(2)}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => (
          <div className="text-right">
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                info.getValue() === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {info.getValue()}
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredTransactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="">
      {/* Header */}
      <HeaderTop
        title="Account Activity"
        text="View your account activity"
        link="/dashboard/accounts"
        linkText="Back to Accounts"
      />
      {/* Account Info Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6"
      >
        <div className={`${getGradientClass(account.gradient)} p-6 text-white`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm opacity-90 mb-1">{account.type}</p>
              <p className="text-2xl font-bold mb-2">{account.accountNumber}</p>
              <p className="text-sm opacity-90">{account.accountTitle}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm opacity-90 mb-1">Current Balance</p>
              <p className="text-3xl font-bold">
                $
                {(account.balance || 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-500">Available Balance:</span>
            <span className="ml-2 font-semibold text-gray-900">
              $
              {(account.availableBalance || 0).toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="text-gray-500">Currency:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {account.currency || 'USD'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-gray-200 p-1 rounded-xl mb-6"
      >
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => setActiveTab('activity')}
            className={`py-2.5 px-4 rounded-lg font-medium transition-all text-sm ${
              activeTab === 'activity'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2.5 px-4 rounded-lg font-medium transition-all text-sm ${
              activeTab === 'summary'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Summary
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === 'activity' && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Search and Filter */}
            <div className="flex gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Mobile View - Card Layout */}
            <div className="block lg:hidden space-y-2">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    index={index}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
                  No transactions found
                </div>
              )}
            </div>

            {/* Desktop View - Table Layout */}
            <div className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row) => (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {table.getPageCount() > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing{' '}
                    {table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      1}{' '}
                    to{' '}
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                      filteredTransactions.length
                    )}{' '}
                    of {filteredTransactions.length} results
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                Monthly Income
              </h3>
              <p className="text-3xl font-bold text-green-600">
                ${(account.monthlyIncome || 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                Monthly Expenses
              </h3>
              <p className="text-3xl font-bold text-red-600">
                ${(account.monthlyExpenses || 0).toFixed(2)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActivityPage;
