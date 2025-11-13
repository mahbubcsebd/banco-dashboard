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

const carrierOptions = [
  { value: 'UTS', label: 'UTS' },
  { value: 'Digicel', label: 'Digicel' },
  { value: 'Chippie', label: 'Chippie' },
];

const EditMobileNumberModal = ({
  isOpen,
  onClose,
  numberData,
  onEditSubmit,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (numberData) {
      setFormData({
        id: numberData.id,
        nickname: numberData.nickname || '',
        mobileCarrier: numberData.mobileCarrier || '',
        mobileNumber: numberData.mobileNumber || '',
      });
      setErrors({});
    }
  }, [numberData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nickname.trim()) {
      newErrors.nickname = 'Nickname is required.';
    }
    if (!formData.mobileCarrier) {
      newErrors.mobileCarrier = 'Mobile Carrier is required.';
    }
    if (!formData.mobileNumber.trim() || isNaN(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Valid Mobile Number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      console.log('Submitting edited mobile number:', formData);

      setTimeout(() => {
        onEditSubmit(formData.id, formData); // Submit the ID and updated data
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
            Edit Mobile Number
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
            <GlobalInput
              label="Nickname"
              required
              placeholder="Enter nickname"
              value={formData.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
              error={errors.nickname}
            />

            <GlobalSelect
              label="Mobile Carrier"
              required
              placeholder="Select"
              value={formData.mobileCarrier}
              onChange={(value) => handleChange('mobileCarrier', value)}
              options={carrierOptions}
              error={errors.mobileCarrier}
            />

            <GlobalInput
              label="Mobile Number"
              required
              placeholder="Enter mobile number"
              type="tel"
              value={formData.mobileNumber}
              onChange={(e) => handleChange('mobileNumber', e.target.value)}
              error={errors.mobileNumber}
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

export default EditMobileNumberModal;
