import { Car } from 'lucide-react'; 
import { cn } from './../lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner = ({ className, size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FDF6F0]/90 backdrop-blur-sm">
      <div className="relative flex justify-center items-center">
        <div
          className={cn(
            'rounded-full p-3 bg-[#FDF6F0] shadow-lg ring-2 ring-[#F97362]/40',
            className
          )}
        >
          <Car
            className={cn(
              'text-[#F97362] animate-spin transition-transform duration-300 ease-in-out',
              sizeClasses[size]
            )}
          />
        </div>
        <div className="absolute rounded-full border-2 border-[#F97362] animate-spin-slow" style={{ width: '60px', height: '60px' }} />
      </div>
      <p className="mt-4 text-center text-[#2E2E2E] text-sm">Loading, please wait...</p>
    </div>
  );
};
