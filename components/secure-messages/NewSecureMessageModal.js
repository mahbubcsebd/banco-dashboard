'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const subjectOptions = [
  { value: 'Account Inquiry', label: 'Account Inquiry' },
  { value: 'Transfer Help', label: 'Transfer Help' },
  { value: 'Technical Support', label: 'Technical Support' },
  { value: 'General Feedback', label: 'General Feedback' },
];

const NewSecureMessageModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.subject) {
      newErrors.subject = 'Subject is required.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      onSubmit(formData).finally(() => {
        setIsSubmitting(false);
        setFormData({ subject: '', message: '' }); // Reset form on submit
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md w-full p-0 gap-0">
        <DialogHeader className="p-6 border-b border-gray-200 relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            New Secure Message
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
            {/* Subject Select */}
            <GlobalSelect
              label="Subject"
              required
              placeholder="Select"
              value={formData.subject}
              onChange={(value) => handleChange('subject', value)}
              options={subjectOptions}
              error={errors.subject}
            />

            {/* Message Textarea */}
            <GlobalInput
              label="Message"
              required
              placeholder="Type your message here..."
              isTextarea
              rows={6}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              error={errors.message}
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
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                loading={isSubmitting}
                size="default"
                className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white"
              >
                Send
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewSecureMessageModal;
