import React from 'react';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
    inline?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
    size = 'md',
    text,
    className = '',
    inline = false,
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const spinnerColor = inline ? 'border-white' : 'border-orange-500';

    if (inline) {
        return (
            <div
                className={`flex items-center justify-center space-x-2 ${className}`}
            >
                <div
                    className={`animate-spin rounded-full border-b-2 ${spinnerColor} ${sizeClasses[size]}`}
                ></div>
                {text && <span className={textSizeClasses[size]}>{text}</span>}
            </div>
        );
    }

    return (
        <div
            className={`flex flex-col items-center justify-center space-y-4 ${className}`}
        >
            <div
                className={`animate-spin rounded-full border-b-2 ${spinnerColor} ${sizeClasses[size]}`}
            ></div>
            {text && (
                <p className={`text-gray-600 ${textSizeClasses[size]}`}>
                    {text}
                </p>
            )}
        </div>
    );
};
