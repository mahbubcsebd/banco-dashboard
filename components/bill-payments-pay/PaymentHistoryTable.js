'use client';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const PaymentHistoryTable = ({
  data = [],
  showViewAll = true,
  viewAllLink = '/dashboard/payments-history',
}) => {
  const columns = [
    {
      accessorKey: 'paymentDetails',
      header: 'Payment Details',
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
            <span>{row.original.payFrom}</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span>{row.original.payTo}</span>
          </div>
          <div className="text-xs text-gray-500">{row.original.date}</div>
          <div className="text-xs text-gray-400">
            Ref: {row.original.reference}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => (
        <div className="text-right font-semibold text-gray-900">
          {row.original.currency} {row.original.amount.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-right">Status</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {row.original.status}
          </span>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Upcoming & Recent Payments
        </h2>
        {showViewAll && (
          <Link
            href={viewAllLink}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 transition-colors"
          >
            View All Payments
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {data.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No payments found</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
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
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {data.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                {/* Row 1: To/From and Status */}
                <div className="flex items-start justify-between mb-3 border-b border-gray-100 pb-3">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      <span className="truncate">{payment.payFrom}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                      <span className="truncate">{payment.payTo}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 shrink-0 ml-2 lowercase">
                    {payment.status}
                  </span>
                </div>

                {/* Row 2: Date, Reference, and Amount */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <div>{payment.date}</div>
                    <div className="text-gray-400">
                      Ref: {payment.reference}
                    </div>
                  </div>
                  <div className="text-base font-semibold text-gray-900">
                    {payment.currency} {payment.amount.toFixed(2)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default PaymentHistoryTable;
