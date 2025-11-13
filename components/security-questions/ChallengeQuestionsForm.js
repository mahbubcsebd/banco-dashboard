'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

// Mock list of security questions
const securityQuestions = [
  { value: 'mother_maiden', label: "What is your mother's maiden name?" },
  { value: 'first_pet', label: 'What was the name of your first pet?' },
  { value: 'high_school', label: 'What city was your high school in?' },
  { value: 'first_car', label: 'What was the make of your first car?' },
  { value: 'favorite_food', label: 'What is your favorite food?' },
  { value: 'childhood_hero', label: 'Who was your childhood hero?' },
];

// Initial state for 5 question/answer pairs
const initialQuestionsState = Array.from({ length: 5 }, (_, index) => ({
  question: '',
  answer: '',
  id: index + 1,
}));

const ChallengeQuestionsForm = ({ onSubmit, isSubmitting = false }) => {
  const [questions, setQuestions] = useState(initialQuestionsState);
  const [errors, setErrors] = useState([]);

  const handleChange = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
    setErrors((prev) => prev.filter((err) => err.id !== id));
  };

  const validate = () => {
    const newErrors = [];
    const usedQuestions = new Set();

    questions.forEach((q) => {
      let questionError = false;

      // Validate Question Selection
      if (!q.question) {
        newErrors.push({
          id: q.id,
          field: 'question',
          message: 'Please select a question.',
        });
        questionError = true;
      } else if (usedQuestions.has(q.question)) {
        newErrors.push({
          id: q.id,
          field: 'question',
          message: 'Question already selected.',
        });
        questionError = true;
      } else {
        usedQuestions.add(q.question);
      }

      // Validate Answer
      if (!q.answer.trim()) {
        newErrors.push({
          id: q.id,
          field: 'answer',
          message: 'Answer is required.',
        });
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(questions);
      // Reset form locally after submission
      setQuestions(initialQuestionsState);
    }
  };

  const handleCancel = () => {
    setQuestions(initialQuestionsState);
    setErrors([]);
    console.log('Form cancelled/reset.');
  };

  // Helper to find specific error message for a field
  const getError = (id, field) => {
    const errorObj = errors.find((err) => err.id === id && err.field === field);
    return errorObj ? errorObj.message : undefined;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Question Select */}
            <GlobalSelect
              label={q.id === 1 ? `Select Question ${q.id}` : undefined} // Label only on the first row (or explicitly on all)
              placeholder="Select"
              value={q.question}
              onChange={(value) => handleChange(q.id, 'question', value)}
              options={securityQuestions}
              error={getError(q.id, 'question')}
              // Explicitly mark required for the component to show *
              required={true}
              labelClassName={q.id > 1 ? 'sr-only md:not-sr-only' : ''} // Hide label after first row on mobile
            />

            {/* Answer Input */}
            <GlobalInput
              label={q.id === 1 ? `Enter Answer ${q.id}` : undefined} // Label only on the first row
              name={`answer-${q.id}`}
              placeholder={`Enter answer ${q.id}`}
              value={q.answer}
              onChange={(e) => handleChange(q.id, 'answer', e.target.value)}
              error={getError(q.id, 'answer')}
              required={true}
              labelClassName={q.id > 1 ? 'sr-only md:not-sr-only' : ''} // Hide label after first row on mobile
            />
          </div>
        ))}

        {/* Buttons (Cancel/Submit) */}
        <div className="flex justify-start gap-4 pt-4 max-w-xs mx-auto">
          <Button
            variant="outline"
            onClick={handleCancel}
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
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChallengeQuestionsForm;
