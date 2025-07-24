import { Car, Clock, Gauge } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { StatusBadge } from '../components/StatusBadge';
import type { Vehicle } from '../types/vehicle'; 
import { useNavigate } from 'react-router-dom';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = () => {
    navigate(`/vehicles/${vehicle.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-[#C8E6C9]';
      case 'MAINTENANCE':
        return 'bg-[#FFEB3B]'; 
      case 'INACTIVE':
        return 'bg-[#FFCDD2]';
      default:
        return 'bg-[#FFFFFF]'; 
    }
  };

  return (
    <Card className="group transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-[#F97362]/30 rounded-xl bg-[#FDF6F0]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFF] border border-[#F97362]/30 rounded-lg shadow-sm group-hover:bg-[#FDF6F0] transition">
              <Car className="h-5 w-5 text-[#F97362]" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-[#2E2E2E]">
                {vehicle.name}
              </CardTitle>
            </div>
          </div>
          <StatusBadge status={vehicle.status} className={getStatusColor(vehicle.status)} />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 text-[#2E2E2E]">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-[#8C3D3D]" />
            <div>
              <p className="text-xs text-[#8C3D3D]/80">Speed</p>
              <p className="text-sm font-medium">{vehicle.speed} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#8C3D3D]" />
            <div>
              <p className="text-xs text-[#8C3D3D]/80">Last Update</p>
              <p className="text-sm font-medium text-[#2E2E2E]">
                {formatDate(vehicle.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleViewDetails}
          className="w-full bg-[#F97362] hover:bg-[#A43F3F] text-white text-sm font-medium rounded-md transition-all duration-200"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
