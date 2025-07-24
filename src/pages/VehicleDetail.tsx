import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Fuel, Gauge, MapPin, Clock, Activity } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { StatusBadge } from '../components/StatusBadge'; 
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import { useVehicleStore } from '../store/vehicleStore';
import { formatDistanceToNow } from 'date-fns';
import CountUp from 'react-countup';

export const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedVehicle, isLoading, error, fetchVehicleById, clearError } = useVehicleStore();

  useEffect(() => {
    if (id) {
      fetchVehicleById(parseInt(id));
    }
  }, [id, fetchVehicleById]);

  const handleBack = () => {
    navigate('/');
  };

  const handleRetry = () => {
    if (id) {
      clearError();
      fetchVehicleById(parseInt(id));
    }
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF6F0] flex items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="text-center text-[#2E2E2E] mt-4">Loading vehicle details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDF6F0]">
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className="mb-6 flex items-center gap-2 text-[#2E2E2E] border-[#2E2E2E]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicles
          </Button>
          <ErrorAlert error={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  if (!selectedVehicle) {
    return (
      <div className="min-h-screen bg-[#FDF6F0]">
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className="mb-6 flex items-center gap-2 text-[#2E2E2E] border-[#2E2E2E]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vehicles
          </Button>
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">Vehicle not found</h3>
            <p className="text-[#2E2E2E]">The requested vehicle could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      <div className="container mx-auto px-4 py-8">
        {/* Main Card */}
        <Card className="bg-white shadow-lg rounded-lg p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 bg-[#F97362] p-4 rounded-lg flex-wrap">
            <Button
              onClick={handleBack}
              variant="outline"
              size="icon"
              className="shrink-0 text-[#2E2E2E] border-[#2E2E2E]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 bg-[#F97362] rounded-xl">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-white">{selectedVehicle.name}</h1>
                  {/* Use StatusBadge component here */}
                  <StatusBadge status={selectedVehicle.status} />
                </div>
                <p className="text-white">Vehicle ID: {selectedVehicle.vehicleId}</p>
              </div>
            </div>
          </div>
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-[#F9F9F9] border-[#F97362] shadow-lg transition-all hover:scale-105">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-orange-500" />
                      Current Speed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-4xl font-bold mb-1 ${selectedVehicle.speed > 80 ? 'text-red-500' : 'text-[#2E2E2E]'}`}>
                      {selectedVehicle.speed} km/h
                    </div>
                    <p className="text-sm text-[#2E2E2E]">
                      {selectedVehicle.speed > 0 ? 'Moving' : 'Stationary'}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#F9F9F9] border-[#F97362] shadow-lg transition-all hover:scale-105">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Fuel className="h-5 w-5 text-blue-500" />
                      Fuel Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-[#2E2E2E] mb-1">
                      {selectedVehicle.fuel_level}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          selectedVehicle.fuel_level > 50
                            ? 'bg-green-500'
                            : selectedVehicle.fuel_level > 25
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedVehicle.fuel_level}%` }}
                      ></div>
                    </div>
                    <p className={`text-sm text-[#2E2E2E] ${selectedVehicle.fuel_level > 50 ? 'text-green-600' : selectedVehicle.fuel_level > 25 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {selectedVehicle.fuel_level > 50
                        ? 'Good level'
                        : selectedVehicle.fuel_level > 25
                          ? 'Consider refueling'
                          : 'Low fuel!'}
                    </p>
                  </CardContent>
                </Card>
              </div>
              {/* Odometer */}
              <Card className="bg-[#F9F9F9] border-[#F97362] shadow-lg transition-all hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-500" />
                    Odometer Reading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#2E2E2E] mb-2">
                    <CountUp end={selectedVehicle.odometer} duration={2} /> km
                  </div>
                  <p className="text-[#2E2E2E]">Total distance traveled</p>
                </CardContent>
              </Card>
            </div>
            {/* Right Column - Location & Time */}
            <div className="space-y-6">
              <Card className="bg-[#F9F9F9] border-[#F97362] shadow-lg transition-all hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    Current Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-[#2E2E2E] mb-1">Latitude</p>
                      <p className="font-mono text-[#2E2E2E]">{selectedVehicle.latitude}°</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#2E2E2E] mb-1">Longitude</p>
                      <p className="font-mono text-[#2E2E2E]">{selectedVehicle.longitude}°</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => {
                        const url = `https://www.google.com/maps/search/?api=1&query=${selectedVehicle.latitude},${selectedVehicle.longitude}`;
                        window.open(url, '_blank');
                      }}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#F9F9F9] border-[#F97362] shadow-lg transition-all hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    Last Update
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-[#2E2E2E] leading-relaxed">
                    {formatDate(selectedVehicle.timestamp)}
                  </div>
                  <p className="text-sm text-[#2E2E2E] mt-2">
                    Data synchronized from vehicle
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
