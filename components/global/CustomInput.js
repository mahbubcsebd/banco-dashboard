'use client';

import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

export default function Input({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  errorMessage,
  className,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name]?.message;

  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 select-none"
        >
          {label}{' '}
          {required && <span className="text-red-500 font-semibold">*</span>}
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: required
            ? errorMessage || `${label || name} is required`
            : false,
        })}
        className={cn(
          'w-full px-3 py-2 border border-orange-500 rounded-md outline-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all',
          fieldError &&
            'border-red-500 focus:ring-red-500 focus:border-red-500',
          className
        )}
      />

      {fieldError && <p className="text-sm text-red-500 mt-1">{fieldError}</p>}
    </div>
  );
}
