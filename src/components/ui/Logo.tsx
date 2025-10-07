import React from 'react';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
    return (
        <h1
            className={`font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent text-4xl ${className}`}
        >
            FlavorAI
        </h1>
    );
};
