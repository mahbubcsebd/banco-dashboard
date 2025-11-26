'use client';

import { transactions } from '@/data/mockData';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const columnHelper = createColumnHelper();

const filterCategories = [
  { id: 'all', label: 'All' },
  { id: 'between-accounts', label: 'Between my Accounts at Finxact' },
  { id: 'to-banco', label: 'To Other Finxact Account' },
  { id: 'to-local', label: 'To Other Local Bank' },
  { id: 'loan', label: 'Loan Payment' },
  { id: 'send-money', label: 'Send Money' },
  { id: 'mobile-topup', label: 'Mobile Topup' },
];

export default function RecentTransactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [globalFilter, setGlobalFilter] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobalFilter(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter data based on category - FIXED
  const filteredData = useMemo(() => {
    let data = transactions;

    if (activeFilter !== 'all') {
      data = transactions.filter((transaction) => {
        const category = transaction.category.toLowerCase();
        switch (activeFilter) {
          case 'between-accounts':
            return category === 'between my accounts at Finxact';
          case 'to-banco':
            return category === 'to other Finxact account';
          case 'to-local':
            return category === 'to other local bank';
          case 'loan':
            return category === 'loan payment';
          case 'send-money':
            return category === 'send money';
          case 'mobile-topup':
            return category === 'mobile topup';
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (globalFilter) {
      data = data.filter((transaction) =>
        transaction.description
          .toLowerCase()
          .includes(globalFilter.toLowerCase())
      );
    }

    return data;
  }, [activeFilter, globalFilter]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('description', {
        header: 'TRANSACTION',
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                info.row.original.type === 'credit'
                  ? 'bg-linear-to-br from-teal-50 to-emerald-50'
                  : 'bg-linear-to-br from-red-50 to-orange-50'
              }`}
            >
              {info.row.original.type === 'credit' ? (
                <ArrowDownLeft className="w-4 h-4 text-teal-600" />
              ) : (
                <ArrowUpRight className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {info.getValue()}
              </p>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('category', {
        header: 'CATEGORY',
        cell: (info) => (
          <div>
            <p className="text-sm font-medium text-gray-700">
              {info.getValue()}
            </p>
            <p className="text-xs text-gray-400">
              {info.row.original.accountNumber}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor('date', {
        header: 'DATE',
        cell: (info) => (
          <p className="text-sm text-gray-600 font-medium">{info.getValue()}</p>
        ),
      }),
      columnHelper.accessor('amount', {
        header: 'AMOUNT',
        cell: (info) => {
          const amount = info.getValue();
          const isPositive = amount > 0;

          return (
            <div className="text-right">
              <p
                className={`font-bold text-sm transition-colors duration-200 ${
                  isPositive ? 'text-teal-600' : 'text-red-600'
                }`}
              >
                {isPositive ? '+' : ''}${Math.abs(amount).toFixed(2)}
              </p>
            </div>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Transactions
          </h2>
        </div>
        <Link href="/transactions">
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-orange-50"
          >
            View All
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </Link>
      </div>

      {/* Desktop filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 hidden lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filterCategories.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile filter */}
      <div className="flex flex-col gap-2 lg:hidden">
        {/* Search Row (Always Single Line) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          <div className="relative shrink-0 w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-orange-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Filter Chips in 2-Column Wrapping Layout */}
        <div className="grid grid-cols-2 gap-2 ">
          {filterCategories.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-2 rounded-md text-xs font-normal transition-all duration-200 text-center
          ${
            activeFilter === filter.id
              ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
          }
        `}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2">
        {table.getRowModel().rows.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Search className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="font-semibold text-sm text-gray-500">
              No transactions found
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          table.getRowModel().rows.map((row, index) => {
            const transaction = row.original;
            const isPositive = transaction.amount > 0;

            return (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:bg-orange-50/30 transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isPositive
                          ? 'bg-linear-to-br from-teal-50 to-emerald-50'
                          : 'bg-linear-to-br from-red-50 to-orange-50'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowDownLeft className="w-4 h-4 text-teal-600" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate mb-0.5">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.category} • {transaction.accountNumber}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {transaction.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p
                      className={`font-bold text-base ${
                        isPositive ? 'text-teal-600' : 'text-red-600'
                      }`}
                    >
                      {isPositive ? '+' : ''}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}

        {/* Mobile Pagination */}
        {filteredData.length > table.getState().pagination.pageSize && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-gray-500">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                filteredData.length
              )}{' '}
              of {filteredData.length}
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  table.getCanPreviousPage()
                    ? 'bg-gray-100 text-gray-700 active:scale-95'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 rounded-lg">
                {table.getState().pagination.pageIndex + 1} /{' '}
                {table.getPageCount()}
              </div>

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  table.getCanNextPage()
                    ? 'bg-gray-100 text-gray-700 active:scale-95'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table - Simple & Clean */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-gray-50 border-b border-gray-200"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
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
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Search className="w-12 h-12 mb-3 opacity-50" />
                      <p className="font-medium">No transactions found</p>
                      <p className="text-sm mt-1">
                        Try adjusting your search or filter
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    style={{
                      opacity: 0,
                      animation: `fadeIn 0.2s ease-out ${
                        index * 0.02
                      }s forwards`,
                    }}
                    className="hover:bg-orange-50/30 transition-colors duration-200 cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        {filteredData.length > table.getState().pagination.pageSize && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="text-xs text-gray-600">
              Showing{' '}
              <span className="font-semibold text-gray-900">
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}
              </span>{' '}
              -{' '}
              <span className="font-semibold text-gray-900">
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  filteredData.length
                )}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-gray-900">
                {filteredData.length}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  table.getCanPreviousPage()
                    ? 'hover:bg-gray-200 text-gray-700'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: table.getPageCount() }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    className={`min-w-8 h-8 px-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      table.getState().pagination.pageIndex === i
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="sm:hidden px-3 py-1 text-xs font-medium text-gray-700">
                {table.getState().pagination.pageIndex + 1} /{' '}
                {table.getPageCount()}
              </div>

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  table.getCanNextPage()
                    ? 'hover:bg-gray-200 text-gray-700'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
