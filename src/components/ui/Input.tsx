import React from 'react';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, ...props }, ref) => {
        return (
            <div className='space-y-1'>
                {label && (
                    <label className='block text-sm font-medium text-gray-700'>
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                        error ? 'border-red-500 focus:ring-red-500' : ''
                    } ${className || ''}`}
                    ref={ref}
                    {...props}
                />
                {error && <p className='text-sm text-red-600'>{error}</p>}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
