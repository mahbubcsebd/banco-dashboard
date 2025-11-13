'use client';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Edit, SortAsc, SortDesc, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react'; // Added useMemo for sorting state
import Button from '../login/Button';

// Import Modals
import DeleteMobileNumberModal from './DeleteMobileNumberModal';
import EditMobileNumberModal from './EditMobileNumberModal';

const SavedNumbersTable = ({ data = [], onDelete, onEdit }) => {
  // State for Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  // State for Sorting (Managed by useReactTable internally, but we use it via table object)
  const [sorting, setSorting] = useState([]);

  // Handlers for Modals
  const handleEditAction = (number) => {
    setSelectedNumber(number);
    setIsEditModalOpen(true);
  };

  const handleDeleteAction = (number) => {
    setSelectedNumber(number);
    setIsDeleteModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'nickname',
        header: 'Nickname',
        cell: ({ row }) => (
          <div className="text-sm font-medium text-gray-900">
            {row.original.nickname}
          </div>
        ),
      },
      {
        accessorKey: 'mobileNumber',
        header: 'Mobile Number',
        cell: ({ row }) => (
          <div className="text-sm text-gray-700">
            {row.original.mobileNumber}
          </div>
        ),
      },
      {
        accessorKey: 'mobileCarrier',
        header: 'Mobile Carrier',
        cell: ({ row }) => (
          <div className="text-sm text-gray-700">
            {row.original.mobileCarrier}
          </div>
        ),
      },
      {
        accessorKey: 'deleteAction',
        header: 'Delete',
        cell: ({ row }) => (
          <div className="text-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAction(row.original);
              }}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Delete"
            >
              <X className="w-4 h-4 mx-auto" />
            </button>
          </div>
        ),
      },
      {
        accessorKey: 'editAction',
        header: 'Edit',
        cell: ({ row }) => (
          <div className="text-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditAction(row.original);
              }}
              className="text-blue-500 hover:text-blue-700 transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4 mx-auto" />
            </button>
          </div>
        ),
      },
    ],
    [onDelete, onEdit]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  // Sort button click handler
  const handleSortClick = () => {
    const currentSort = sorting[0];
    let newSort = [];

    // Toggle sorting between 'asc', 'desc', and 'none' on 'nickname'
    if (
      !currentSort ||
      currentSort.id !== 'nickname' ||
      currentSort.desc === false
    ) {
      newSort = [{ id: 'nickname', desc: true }];
    } else if (currentSort.desc === true) {
      newSort = [{ id: 'nickname', desc: false }];
    }

    setSorting(newSort);
  };

  const sortIcon =
    sorting.length && sorting[0].id === 'nickname' ? (
      sorting[0].desc ? (
        <SortDesc className="w-4 h-4" />
      ) : (
        <SortAsc className="w-4 h-4" />
      )
    ) : (
      <SortAsc className="w-4 h-4 opacity-50" />
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mx-auto"
    >
      {/* Modals */}
      <EditMobileNumberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        numberData={selectedNumber}
        onEditSubmit={onEdit}
      />
      <DeleteMobileNumberModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        numberData={selectedNumber}
        onConfirm={onDelete}
      />

      {/* Header with Sort button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Saved Numbers</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-1 text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
          onClick={handleSortClick}
        >
          {sortIcon}
          <span>Sort</span>
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No saved mobile numbers found.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View (Implementation remains the same) */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* ... Table structure ... */}
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

          {/* Mobile Card View (Implementation remains the same) */}
          <div className="md:hidden space-y-3">
            {data.map((number, index) => (
              <motion.div
                key={number.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3"
              >
                {/* Row 1: Nickname & Carrier */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-2">
                  <div className="text-base font-semibold text-gray-900">
                    {number.nickname}
                  </div>
                  <div className="text-sm text-gray-600">
                    {number.mobileCarrier}
                  </div>
                </div>

                {/* Row 2: Mobile Number & Actions */}
                <div className="flex justify-between items-center pt-1">
                  <div className="text-sm text-gray-700 font-medium">
                    {number.mobileNumber}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleDeleteAction(number)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEditAction(number)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
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

export default SavedNumbersTable;
