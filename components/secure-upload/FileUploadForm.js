'use client';

import { motion } from 'framer-motion';
import { FileImage, FileSpreadsheet, FileText, Upload, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone'; // Assuming react-dropzone is installed
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const purposeOptions = [
  { value: 'ID_Verification', label: 'ID Verification' },
  { value: 'Loan_Documents', label: 'Loan Documents' },
  { value: 'Account_Updates', label: 'Account Updates/Forms' },
  { value: 'Other', label: 'Other' },
];

const acceptedFileTypes = ['xlsx', 'csv', 'pdf', 'jpeg', 'png', 'jpg'];
const acceptedMimeTypes = {
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
    '.xlsx',
  ],
  'text/csv': ['.csv'],
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/png': ['.png'],
};

// --- Custom Text Content ---
const DROPZONE_TEXT = {
  dragActive: 'Drop the file(s) here...',
  default: 'Drag and drop or click to browse files',
  acceptedTypes: `Accepted File Types: ${acceptedFileTypes
    .join(', ')
    .toUpperCase()}. Max Size: 5MB per file.`,
};

// Utility function to get file icon based on MIME type
const getFileIcon = (mimeType) => {
  if (mimeType.startsWith('image/'))
    return <FileImage className="w-6 h-6 text-orange-500" />;
  if (mimeType.includes('pdf'))
    return <FileText className="w-6 h-6 text-red-600" />;
  if (mimeType.includes('sheet') || mimeType.includes('csv'))
    return <FileSpreadsheet className="w-6 h-6 text-green-600" />;
  return <FileText className="w-6 h-6 text-gray-500" />;
};

// --- File Preview Component ---
const FilePreview = ({ file, onDelete }) => {
  const isImage = file.type.startsWith('image/');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col items-center justify-between space-y-2">
        {/* Preview/Icon */}
        <div className="w-full flex items-center justify-center p-2 rounded-md h-20">
          {isImage && file.preview ? (
            <img
              src={file.preview}
              alt={file.name}
              className="max-w-full max-h-full object-contain rounded"
              onLoad={() => URL.revokeObjectURL(file.preview)}
            />
          ) : (
            getFileIcon(file.type)
          )}
        </div>

        {/* Name and Size */}
        <div className="w-full text-center truncate">
          <span
            className="text-xs font-medium text-gray-800 block truncate"
            title={file.name}
          >
            {file.name}
          </span>
          <span className="text-xs text-gray-500 block">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <button
        type="button"
        onClick={() => onDelete(file)}
        className="absolute top-1 right-1 p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
        title="Remove file"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const FileUploadForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    purpose: '',
    description: '',
    files: [], // Array to hold multiple files
  });

  const [errors, setErrors] = useState({});

  // --- Dropzone Logic ---
  const onDrop = useCallback((acceptedFiles) => {
    // Combine new files with existing files
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : null,
      })
    );

    setFormData((prev) => ({ ...prev, files: [...prev.files, ...newFiles] }));
    setErrors((prev) => ({ ...prev, files: '' }));
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxSize: 5242880, // 5MB limit per file
      accept: acceptedMimeTypes,
    });

  // Clean up preview URLs
  useEffect(() => {
    return () =>
      formData.files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [formData.files]);

  // --- Form Logic ---
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleFileDelete = (fileToDelete) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((file) => file !== fileToDelete),
    }));
    // Revoke URL immediately
    if (fileToDelete.preview) URL.revokeObjectURL(fileToDelete.preview);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.purpose) newErrors.purpose = 'Purpose is required.';
    if (!formData.description.trim())
      newErrors.description = 'Description is required.';
    if (formData.files.length === 0) {
      newErrors.files = 'Please select at least one file to upload.';
    }

    if (fileRejections.length > 0) {
      newErrors.files =
        'One or more files were rejected. Check size (max 5MB) or type.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      // Data passed to API: { purpose, description, files: [File Object] }
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({ purpose: '', description: '', files: [] });
    setErrors({});
  };

  const hasError = useMemo(
    () => errors.files || fileRejections.length > 0,
    [errors.files, fileRejections.length]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 max-w-xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Purpose */}
        <GlobalSelect
          label="Purpose"
          required
          placeholder="Select"
          value={formData.purpose}
          onChange={(value) => handleChange('purpose', value)}
          options={purposeOptions}
          error={errors.purpose}
        />

        {/* Description */}
        <GlobalInput
          label="Description"
          required
          placeholder="Enter description"
          isTextarea
          rows={3}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
        />

        {/* --- Dropzone Area --- */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Secure File Upload *
          </label>

          {/* File Input/Drop Area */}
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors min-h-40 cursor-pointer
                    ${
                      hasError
                        ? 'border-red-500 bg-red-50'
                        : isDragActive
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-orange-400 hover:border-orange-500 hover:bg-orange-50'
                    }`}
          >
            <input {...getInputProps()} id="file-upload-input" />
            <Upload className="w-8 h-8 mb-2 text-orange-500" />
            <span className="text-gray-800 text-center font-medium">
              {isDragActive ? DROPZONE_TEXT.dragActive : DROPZONE_TEXT.default}
            </span>
          </div>

          {(errors.files || fileRejections.length > 0) && (
            <p className="text-sm text-red-500 mt-1">
              {errors.files ||
                fileRejections[0]?.errors[0]?.message ||
                'File upload error.'}
            </p>
          )}

          <p className="text-xs text-gray-500 pt-2">
            {DROPZONE_TEXT.acceptedTypes}
          </p>
        </div>

        {/* --- File Preview List --- */}
        {formData.files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 border-t border-gray-200"
          >
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              {formData.files.length} File(s) Ready for Submission:
            </h4>
            {/* Responsive Grid for Previews */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {formData.files.map((file) => (
                <FilePreview
                  key={file.name}
                  file={file}
                  onDelete={handleFileDelete}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Buttons (Cancel/Submit) */}
        <div className="flex justify-start gap-4 pt-4">
          <Button
            variant="outline"
            onClick={handleReset}
            size="default"
            className="w-full sm:w-auto text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            size="default"
            className="w-full sm:w-auto text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default FileUploadForm;
