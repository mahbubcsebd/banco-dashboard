'use client';

import { motion } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import Button from '../login/Button';

// Assuming AddOtpModal is imported from the correct path
import AddOtpModal from './AddOtpModal';

const OtpNumberManagement = ({
  numbers,
  onAdd,
  onDelete,
  isSubmitting = false,
}) => {
  const [newNumber, setNewNumber] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [numberToConfirm, setNumberToConfirm] = useState('');

  const validate = () => {
    if (!newNumber.trim() || newNumber.length < 5 || isNaN(newNumber.trim())) {
      setError('Please enter a valid mobile number (at least 5 digits).');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setNumberToConfirm(newNumber.trim());
      setIsModalOpen(true);
    }
  };

  const handleConfirmAdd = (number) => {
    onAdd(number);
    setNewNumber('');
    setIsModalOpen(false);
    setNumberToConfirm('');
  };

  const handleCancel = () => {
    setNewNumber('');
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="max-w-2xl mx-auto"
    >
      <AddOtpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mobileNumber={numberToConfirm}
        onConfirm={handleConfirmAdd}
        isSubmitting={isSubmitting}
      />

      {/* --- ADD NEW NUMBER FORM --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
            {/* Mobile Number Input (Height is controlled by GlobalInput's internal padding/height) */}
            <div className="grow w-full">
              <GlobalInput
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                required
                placeholder="Enter mobile number"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
                error={error}
              />
            </div>

            {/* Buttons (Ensuring fixed height h-[44px] to match typical py-3 inputs) */}
            <div className="flex space-x-3 w-full sm:w-auto shrink-0">
              <Button
                variant="primary"
                type="submit"
                loading={isSubmitting && numberToConfirm === newNumber.trim()}
                size="default"
                className="w-full sm:w-auto text-sm bg-orange-500 hover:bg-orange-600 text-white h-12"
                disabled={isSubmitting}
              >
                Submit
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                size="default"
                className="w-full sm:w-auto text-sm border-blue-600 text-blue-600 hover:bg-blue-50 h-12"
                type="button"
                disabled={isSubmitting}
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* --- SAVED NUMBER LIST --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-100">
        {numbers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No OTP mobile numbers saved.
          </div>
        ) : (
          numbers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4 text-sm font-medium">
                <span className="text-gray-500 hidden sm:inline">
                  ID: {item.id}
                </span>
                <span className="flex items-center space-x-1 text-gray-900">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>Mobile Number: {item.mobileNumber}</span>
                </span>
              </div>

              <button
                onClick={() => onDelete(item.id)}
                className="text-gray-500 hover:text-red-600 transition-colors p-1"
                title="Delete this number"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default OtpNumberManagement;
