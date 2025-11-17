'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Button from '../login/Button';

const ViewSubsidiaryModal = ({ isOpen, onClose, subsidiaryData }) => {
  // Flattened data for display, ensuring all fields are present
  const data = subsidiaryData?.details ? subsidiaryData.details : {};

  // Define the ordered display structure based on the "View Subsidiary" image
  const displayRows = [
    { label: 'First Name', value: data.firstName || 'N/A' },
    { label: 'Last Name', value: data.lastName || 'N/A' },
    { label: 'Nickname', value: data.nickname || 'N/A' },
    { label: 'Address Line 1', value: data.addressLine1 || 'N/A' },
    { label: 'Address Line 2', value: data.addressLine2 || 'N/A' },
    { label: 'City', value: data.city || 'N/A' },
    { label: 'State', value: data.state || 'N/A' },
    { label: 'Zip Code', value: data.zipCode || 'N/A' },
    { label: 'Home Phone Number', value: data.homePhoneNumber || 'N/A' },
    { label: 'Mobile Number', value: data.mobileNumber || 'N/A' },
    {
      label: 'Personal Email Address',
      value: data.personalEmailAddress || 'N/A',
    },
    { label: 'ACH Company Name', value: data.achCompanyName || 'N/A' },
    {
      label: 'ACH Company Identification ICD',
      value: data.achCompanyIdentificationIcd || 'N/A',
    },
    {
      label: 'ACH Company Identification',
      value: data.achCompanyIdentification || 'N/A',
    },
    { label: 'IRS NIF', value: data.irsNif || 'N/A' },
    { label: 'Legal Form', value: data.legalForm || 'N/A' },
    { label: 'Business Sector', value: data.businessSector || 'N/A' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg w-full p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 border-b border-gray-200 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            View Subsidiary
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="p-6 space-y-3">
          {displayRows.map((row, index) => (
            <div
              key={index}
              className="flex justify-between pb-1 border-b border-gray-100 text-sm"
            >
              <span className="text-gray-500 w-1/2">{row.label}</span>
              <span className="font-medium text-gray-900 w-1/2 text-right wrap-break-word">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <DialogFooter className="p-6 border-t border-gray-200 flex justify-center">
          <Button
            type="button"
            onClick={onClose}
            variant="primary"
            className="w-full sm:w-auto text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSubsidiaryModal;
