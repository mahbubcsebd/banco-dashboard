'use client';

import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react'; // Changed from Square to Trash2
import { useState } from 'react';
import Button from '../login/Button';

// Import the new modals
import DeleteMessageModal from './DeleteMessageModal';
import MessageDetailsModal from './MessageDetailsModal';

const MessagesList = ({ data = [], onNewMessageClick, onDelete }) => {
  // State for Modals
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // 1. Handle clicking on a message row (View Details)
  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setIsDetailsModalOpen(true);
  };

  // 2. Handle clicking the Delete Icon (Open Confirmation Modal)
  const handleDeleteIconClick = (e, message) => {
    e.stopPropagation(); // Prevent the row click handler from firing
    setSelectedMessage(message);
    setIsDeleteModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      {/* Modals */}
      <MessageDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        messageData={selectedMessage}
      />
      <DeleteMessageModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        messageData={selectedMessage}
        onConfirm={onDelete} // Pass the main delete handler
      />

      {/* Header and New Message Button */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
        <Button
          variant="primary"
          onClick={onNewMessageClick}
          size="default"
          className="flex items-center space-x-1 text-sm bg-blue-600 hover:bg-blue-700 text-white"
        >
          + New Message
        </Button>
      </div>

      {/* List of Messages */}
      <div className="space-y-0 divide-y divide-gray-100">
        {data.length === 0 ? (
          <div className="py-4 text-center text-gray-500">
            No messages found matching your criteria.
          </div>
        ) : (
          data.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              // 3. Click handler for row click (opens details)
              onClick={() => handleMessageClick(message)}
              className={`flex justify-between items-center py-3 px-3 rounded-md transition-colors cursor-pointer border border-transparent
                                ${
                                  message.isRead
                                    ? 'hover:bg-gray-50'
                                    : 'bg-blue-50/30 hover:bg-blue-100/50'
                                }`}
            >
              {/* Subject and Date */}
              <div className="flex-1 min-w-0 pr-4">
                <div
                  className={`text-base font-medium truncate ${
                    message.isRead ? 'text-gray-900' : 'text-blue-700'
                  }`}
                >
                  {message.subject}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {message.date}
                </div>
              </div>

              {/* Delete Icon (Right Side) */}
              <button
                onClick={(e) => handleDeleteIconClick(e, message)}
                className="text-gray-400 hover:text-red-600 shrink-0 p-1 rounded-full hover:bg-gray-200 transition-colors"
                title="Delete Message"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default MessagesList;
