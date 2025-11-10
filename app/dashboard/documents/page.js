'use client';

import GlobalSelect from '@/components/global/GlobalSelect';
import HeaderTop from '@/components/global/HeaderTop';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';

// Mock document data
const documentsData = {
  personal: [
    {
      title: 'What is Finxact',
      description: 'Learn more about the Finxact core banking platform.',
      pdfUrl: '/documents/what-is-finxact.pdf',
      year: '2024',
    },
    {
      title: 'Bank setup overview',
      description: 'A quick start guide to setting up your Finxact account.',
      pdfUrl: '/documents/bank-setup-overview.pdf',
      year: '2023',
    },
    {
      title: 'Lito Savings account Terms and Conditions',
      description: 'Important legal details about your Lito Savings account.',
      pdfUrl: '/documents/lito-terms.pdf',
      year: '2022',
    },
    {
      title: 'History of our Bank',
      description: 'An overview of our institution’s legacy and values.',
      pdfUrl: '/documents/history-of-bank.pdf',
      year: '2024',
    },
  ],
  corporate: [
    {
      title: 'Corporate Account Policy',
      description: 'Policies and operational guidelines for corporate clients.',
      pdfUrl: '/documents/corporate-policy.pdf',
      year: '2024',
    },
    {
      title: 'Business Terms & Conditions',
      description: 'Detailed terms applicable to business accounts.',
      pdfUrl: '/documents/business-terms.pdf',
      year: '2023',
    },
    {
      title: 'Corporate KYC Requirements',
      description: 'Required documentation for company verification.',
      pdfUrl: '/documents/corporate-kyc.pdf',
      year: '2022',
    },
  ],
};

const DocumentsFormsPage = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filteredDocs, setFilteredDocs] = useState([]);

  // Type options
  const typeOptions = useMemo(
    () => [
      { value: 'personal', label: 'Personal Accounts' },
      { value: 'corporate', label: 'Corporate Accounts' },
    ],
    []
  );

  // Available years based on type
  const availableYears = useMemo(() => {
    if (!selectedType) return [];
    const docs = documentsData[selectedType] || [];
    const years = [...new Set(docs.map((d) => d.year))];
    return years.map((year) => ({ value: year, label: year }));
  }, [selectedType]);

  // Handle type change
  const handleTypeChange = (value) => {
    setSelectedType(value);
    setSelectedYear('');
    setFilteredDocs([]);
  };

  // Handle year change
  const handleYearChange = (value) => {
    setSelectedYear(value);
    if (selectedType) {
      const docs = documentsData[selectedType] || [];
      const filtered = docs.filter((d) => d.year === value);
      setFilteredDocs(filtered);
    }
  };

  // Manual filter (button)
  const handleFilter = () => {
    if (!selectedType || !selectedYear) {
      alert('Please select both document type and year');
      return;
    }
    const docs = documentsData[selectedType] || [];
    const filtered = docs.filter((d) => d.year === selectedYear);
    setFilteredDocs(filtered);
  };

  return (
    <div>
      {/* Header */}
      <HeaderTop
        title="Documents & Forms"
        text="Access and download important bank documents and policies"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-4 md:p-6 mb-6 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <GlobalSelect
            label="Select Type"
            placeholder="Select document type"
            required
            value={selectedType}
            onChange={handleTypeChange}
            options={typeOptions}
          />

          <GlobalSelect
            label="Select Year"
            placeholder="Select year"
            required
            value={selectedYear}
            onChange={handleYearChange}
            options={availableYears}
            disabled={!selectedType}
          />

          <button
            onClick={handleFilter}
            disabled={!selectedType || !selectedYear}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium h-12 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Filter
          </button>
        </div>
      </motion.div>

      {/* Documents Grid */}
      <AnimatePresence mode="wait">
        {filteredDocs.length > 0 ? (
          <motion.div
            key="documents-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredDocs.map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="p-5 md:p-6 border-b border-gray-100 bg-gradient-to-br from-orange-50 to-orange-100/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-500">{doc.description}</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <button
                    onClick={() => alert(`Downloading ${doc.title}`)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium text-sm shadow-sm"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 bg-white rounded-xl border border-gray-200"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedType ? 'No Documents Found' : 'Select a Document Type'}
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              {selectedType
                ? 'There are no documents available for the selected year.'
                : 'Please select a document type to view documents.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentsFormsPage;
