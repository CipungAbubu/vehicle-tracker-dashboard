import { Badge } from '../components/ui/badge';
import { cn } from './../lib/utils';

interface StatusBadgeProps {
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-[#C8E6C9] text-[#388E3C] border-[#388E3C] hover:bg-[#C8E6C9]/10'; 
      case 'INACTIVE':
        return 'bg-[#FFCDD2] text-[#E57373] border-[#E57373] hover:bg-[#E57373]/10'; 
      case 'MAINTENANCE':
        return 'bg-[#FFEB3B] text-[#FBC02D] border-[#FBC02D] hover:bg-[#FBC02D]/10'; 
      default:
        return 'bg-[#FFFFFF] text-[#2E2E2E] border-[#E5E7EB]';
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        'rounded-full text-sm font-medium px-3 py-1 transition-colors duration-200 ease-in-out',
        getStatusStyles(),
        className
      )}
    >
      {status}
    </Badge>
  );
};
