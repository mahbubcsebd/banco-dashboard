'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Button from '../login/Button';

const ConfirmationModal = ({
  isOpen,
  onClose,
  data,
  onConfirm,
  isSubmitting,
}) => {
  // Convert data object into displayable rows
  const displayData = data
    ? [
        { label: 'Name', value: `${data.firstName} ${data.lastName}` },
        { label: 'Nickname', value: data.nickname },
        {
          label: 'Address',
          value: `${data.addressLine1} ${data.addressLine2}`.trim(),
        },
        {
          label: 'City, State, Zip',
          value: `${data.city}, ${data.state}, ${data.zipCode}`,
        },
        { label: 'Phone', value: data.homePhoneNumber },
        { label: 'Email', value: data.emailAddress || 'N/A' },
      ]
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md w-full p-0 gap-0">
        <DialogHeader className="p-6 border-b border-gray-200 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Confirm Subsidiary Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-gray-800">
            Please review the details before saving:
          </h4>
          <div className="space-y-3 text-sm">
            {displayData.map((item) => (
              <div
                key={item.label}
                className="flex justify-between pb-1 border-b border-dashed border-gray-100"
              >
                <span className="text-gray-500">{item.label}</span>
                <span className="font-medium text-gray-900 text-right max-w-[50%]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-gray-200">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="w-full sm:w-auto text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
            disabled={isSubmitting}
          >
            Cancel / Edit
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            variant="primary"
            loading={isSubmitting}
            className="w-full sm:w-auto text-sm bg-orange-500 hover:bg-orange-600 text-white"
          >
            Confirm & Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
