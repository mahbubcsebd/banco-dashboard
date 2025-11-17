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

// Mock options (You should replace these with your actual API data)
const achIdcOptions = [
  { value: '1_IRS_EIN', label: '1 - IRS Identification Number (EIN)' },
  { value: '2_SOCIAL', label: '2 - Social Security Number (SSN)' },
];
const legalFormOptions = [
  { value: 'LLC', label: 'LLC Limited Liability Partnerships' },
  { value: 'INC', label: 'INC Corporations' },
];
const businessSectorOptions = [
  { value: 'MANUFACTURING', label: 'Other manufacturing industries' },
  { value: 'RETAIL', label: 'Retail Trade' },
];
const stateOptions = [
  { value: 'Sint Eustatius', label: 'Sint Eustatius' },
  { value: 'FL', label: 'Florida' },
];

const initialFormData = {
  firstName: '',
  lastName: '',
  nickname: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  homePhoneNumber: '',
  mobileNumber: '',
  personalEmailAddress: '',
  achCompanyName: '',
  achCompanyIdentificationIcd: '',
  achCompanyIdentification: '',
  irsNif: '',
  legalForm: '',
  businessSector: '',
};

const AddEditSubsidiaryModal = ({
  isOpen,
  onClose,
  subsidiaryData,
  isEditMode = false,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && isEditMode && subsidiaryData) {
      setFormData({
        ...initialFormData,
        ...subsidiaryData.details,
      });
      setErrors({});
    } else if (isOpen && !isEditMode) {
      setFormData(initialFormData);
      setErrors({});
    }
  }, [isOpen, isEditMode, subsidiaryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    // Required fields based on asterisks in the image
    if (!formData.firstName.trim()) newErrors.firstName = 'Required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required.';
    if (!formData.nickname.trim()) newErrors.nickname = 'Required.';
    if (!formData.homePhoneNumber.trim())
      newErrors.homePhoneNumber = 'Required.';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Required.';
    if (!formData.personalEmailAddress.trim())
      newErrors.personalEmailAddress = 'Required.';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Required.';
    if (!formData.city.trim()) newErrors.city = 'Required.';
    if (!formData.state) newErrors.state = 'Required.';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Required.';
    if (!formData.achCompanyName.trim()) newErrors.achCompanyName = 'Required.';
    if (!formData.achCompanyIdentificationIcd)
      newErrors.achCompanyIdentificationIcd = 'Required.';
    if (!formData.achCompanyIdentification.trim())
      newErrors.achCompanyIdentification = 'Required.';
    if (!formData.irsNif.trim()) newErrors.irsNif = 'Required.';
    if (!formData.legalForm) newErrors.legalForm = 'Required.';
    if (!formData.businessSector) newErrors.businessSector = 'Required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Submit form data (this will trigger the confirmation modal in the parent)
      onSubmit(formData, isEditMode);
      // Note: We don't close the modal here, the parent (CompanyInfoPage) handles closure after success/confirmation
      setIsSubmitting(false);
    }
  };

  const modalTitle = isEditMode
    ? 'Edit Subsidiary Details'
    : 'Add Subsidiary Details';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-4xl w-full p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 border-b border-gray-200 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* LEFT COLUMN FIELDS */}
              <GlobalInput
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />
              <GlobalInput
                label="Home Phone Number"
                name="homePhoneNumber"
                placeholder="Enter home phone number"
                value={formData.homePhoneNumber}
                onChange={handleChange}
                error={errors.homePhoneNumber}
                required
              />
              <GlobalInput
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />
              <GlobalInput
                label="Mobile Number"
                name="mobileNumber"
                placeholder="Enter mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
                error={errors.mobileNumber}
                required
              />
              <GlobalInput
                label="Nickname"
                name="nickname"
                placeholder="Enter nickname"
                value={formData.nickname}
                onChange={handleChange}
                error={errors.nickname}
                required
              />
              <GlobalInput
                label="Personal Email Address"
                name="personalEmailAddress"
                placeholder="Enter personal email address"
                value={formData.personalEmailAddress}
                onChange={handleChange}
                error={errors.personalEmailAddress}
                required
              />
              <GlobalInput
                label="Address Line 1"
                name="addressLine1"
                placeholder="Enter address line 1"
                value={formData.addressLine1}
                onChange={handleChange}
                error={errors.addressLine1}
                required
              />
              <GlobalInput
                label="Address Line 2"
                name="addressLine2"
                placeholder="Enter address line 2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
              <GlobalInput
                label="City"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                required
              />
              <GlobalInput
                label="Zip Code"
                name="zipCode"
                placeholder="Enter zip code"
                value={formData.zipCode}
                onChange={handleChange}
                error={errors.zipCode}
                required
              />

              {/* RIGHT COLUMN FIELDS (ACH/LEGAL) */}
              <GlobalInput
                label="ACH Company Name"
                name="achCompanyName"
                placeholder="Enter ach company name"
                value={formData.achCompanyName}
                onChange={handleChange}
                error={errors.achCompanyName}
                required
              />
              <GlobalSelect
                label="ACH Company Identification ICD"
                name="achCompanyIdentificationIcd"
                placeholder="Select"
                value={formData.achCompanyIdentificationIcd}
                onChange={(v) =>
                  handleSelectChange('achCompanyIdentificationIcd', v)
                }
                options={achIdcOptions}
                error={errors.achCompanyIdentificationIcd}
                required
              />
              <GlobalInput
                label="ACH Company Identification"
                name="achCompanyIdentification"
                placeholder="Enter ach company identification"
                value={formData.achCompanyIdentification}
                onChange={handleChange}
                error={errors.achCompanyIdentification}
                required
              />
              <GlobalInput
                label="IRS NIF"
                name="irsNif"
                placeholder="Enter irs nif"
                value={formData.irsNif}
                onChange={handleChange}
                error={errors.irsNif}
                required
              />
              <GlobalSelect
                label="Legal Form"
                name="legalForm"
                placeholder="Select"
                value={formData.legalForm}
                onChange={(v) => handleSelectChange('legalForm', v)}
                options={legalFormOptions}
                error={errors.legalForm}
                required
              />
              <GlobalSelect
                label="Business Sector"
                name="businessSector"
                placeholder="Select"
                value={formData.businessSector}
                onChange={(v) => handleSelectChange('businessSector', v)}
                options={businessSectorOptions}
                error={errors.businessSector}
                required
              />
              <GlobalSelect
                label="State"
                name="state"
                placeholder="Select"
                value={formData.state}
                onChange={(v) => handleSelectChange('state', v)}
                options={stateOptions}
                error={errors.state}
                required
              />
            </div>
          </div>

          <DialogFooter className="p-6 border-t border-gray-200 flex justify-center">
            <div className="flex w-full sm:w-auto gap-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="w-full sm:w-auto text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full sm:w-auto text-sm bg-orange-500 hover:bg-orange-600 text-white"
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

export default AddEditSubsidiaryModal;
