'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

// Mock options for Currency
const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'XOF', label: 'XOF' },
];

const EditBillTemplateModal = ({ isOpen, onClose, billerData, onSubmit }) => {
  // Initialize state with default or provided data
  const [formData, setFormData] = useState({
    billerName: '',
    billerTemplateName: '',
    currency: '',
    referenceNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to populate form when modal opens or billerData changes
  useEffect(() => {
    if (billerData) {
      setFormData({
        billerName: billerData.billerName || '',
        billerTemplateName: billerData.billerName || '', // Using billerName as template name default
        currency: billerData.currency || 'USD',
        referenceNumber: billerData.referenceNumber || '',
      });
      setErrors({}); // Reset errors when new data is loaded
    }
  }, [billerData, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};

    // Validation logic
    if (!formData.billerTemplateName.trim()) {
      newErrors.billerTemplateName = 'Biller Template Name is required.';
    }
    if (!formData.currency) {
      newErrors.currency = 'Currency is required.';
    }
    if (!formData.referenceNumber.trim()) {
      newErrors.referenceNumber = 'Reference Number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      console.log('Submitting edited template:', formData); // Console log for submission

      // Simulate API call
      setTimeout(() => {
        onSubmit(formData);
        setIsSubmitting(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md w-full p-0 gap-0">
        <DialogHeader className="p-6 border-b border-gray-200 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Edit Bill Template
          </DialogTitle>
          {/* <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button> */}
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            {/* Biller Name (Read-only as per image) */}
            <GlobalInput
              label="Biller Name"
              placeholder="G Exchange Corp"
              value={formData.billerName}
              isReadOnly={true}
            />

            {/* Biller Template Name */}
            <GlobalInput
              label="Biller Template Name"
              placeholder="G Exch"
              value={formData.billerTemplateName}
              onChange={(e) =>
                handleChange('billerTemplateName', e.target.value)
              }
              error={errors.billerTemplateName}
            />

            {/* Currency */}
            <GlobalSelect
              label="Currency"
              required
              placeholder="USD"
              value={formData.currency}
              onChange={(value) => handleChange('currency', value)}
              options={currencyOptions}
              error={errors.currency}
            />

            {/* Reference No. */}
            <GlobalInput
              label="Reference No."
              required
              placeholder="135246789"
              value={formData.referenceNumber}
              onChange={(e) => handleChange('referenceNumber', e.target.value)}
              error={errors.referenceNumber}
            />
          </div>

          <DialogFooter className="p-6 border-t border-gray-200">
            <div className="flex w-full gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                size="default"
                className="w-full text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                loading={isSubmitting}
                size="default"
                className="w-full text-sm bg-orange-500 hover:bg-orange-600 text-white"
              >
                Submit
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBillTemplateModal;
