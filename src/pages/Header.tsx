import { Car, RotateCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useVehicleStore } from '../store/vehicleStore';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

interface HeaderProps {
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh }) => {
  const { clearError } = useVehicleStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    clearError();
    setIsLoading(true);
    try {
      await onRefresh(); 
    } finally {
      setTimeout(() => setIsLoading(false), 1000); 
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm shadow-md z-10 p-4 flex items-center justify-between flex-wrap md:flex-row flex-col gap-y-4">
      <div className="flex items-center gap-3">
        <div className="relative p-3 bg-[#F97362] rounded-xl shadow-lg">
          <Car className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-wide text-[#2E2E2E] drop-shadow-sm">
          Vehicle <span className="text-[#A43F3F]">Tracker</span>
        </h1>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2 border-[#F97362] text-[#F97362] hover:bg-[#FDF6F0] hover:text-[#8C3D3D] hover:shadow-md transition-all duration-300 group"
            >
              <RotateCw
                className={`h-4 w-4 transition-transform duration-500 ${
                  isLoading ? 'animate-spin' : 'group-hover:rotate-180'
                }`}
              />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to reload the vehicle list</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
};
