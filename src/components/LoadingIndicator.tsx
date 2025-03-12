
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingIndicatorProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  className, 
  size = 'md',
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative">
        <div className={cn(
          'rounded-full border-t-transparent border-solid animate-spin',
          sizeClasses[size],
          {
            'border-2': size === 'sm',
            'border-3': size === 'md',
            'border-4': size === 'lg',
          },
          'border-primary'
        )}></div>
        <div className={cn(
          'absolute top-0 left-0 rounded-full animate-pulse opacity-50',
          sizeClasses[size],
          'border border-primary'
        )}></div>
      </div>
      {text && (
        <p className="mt-2 text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingIndicator;
