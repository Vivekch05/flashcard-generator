import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/solid';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...', fullScreen = false }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  const containerClasses = fullScreen 
    ? 'min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="relative mb-4">
          <div className={`${sizeClasses[size]} mx-auto`}>
            <div className="animate-spin rounded-full h-full w-full border-4 border-blue-200 dark:border-blue-800"></div>
            <div className="animate-spin rounded-full h-full w-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 absolute top-0 left-0"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AcademicCapIcon className={`${sizeClasses[size]} text-blue-600 dark:text-blue-400 animate-pulse`} />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className={`${textSizeClasses[size]} font-medium text-gray-700 dark:text-gray-300`}>
            {text}
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
