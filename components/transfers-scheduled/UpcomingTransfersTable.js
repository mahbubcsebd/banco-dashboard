'use client';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';

const getStatusColor = (status) => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800';
    case 'PAUSED':
      return 'bg-yellow-100 text-yellow-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const UpcomingTransfersTable = ({ data = [] }) => {
  const columns = [
    {
      accessorKey: 'date',
      header: 'Next Date',
      cell: ({ row }) => (
        <div className="text-sm font-medium text-gray-900">
          {row.original.date}
        </div>
      ),
    },
    {
      accessorKey: 'to',
      header: 'Payee/Destination',
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">
          {row.original.to}
          <div className="text-xs text-gray-500">
            {row.original.transferType}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'fromAccount',
      header: 'From Account',
      cell: ({ row }) => (
        <div className="text-xs text-gray-500">{row.original.fromAccount}</div>
      ),
    },
    {
      accessorKey: 'frequency',
      header: 'Frequency',
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">{row.original.frequency}</div>
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
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              row.original.status
            )}`}
          >
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
      {data.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            No upcoming scheduled transfers found.
          </p>
        </div>
      ) : (
        /* Desktop Table View */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
      )}
    </motion.div>
  );
};

export default UpcomingTransfersTable;
