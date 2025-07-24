import { useEffect, useState } from 'react';
import { Car } from 'lucide-react';
import { VehicleCard } from '../components/VehicleCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import { useVehicleStore } from '../store/vehicleStore';
import { Header } from './Header'; 
import { Button } from '../components/ui/button';
import type { Vehicle } from '../types/vehicle';

export const VehicleList = () => {
  const { vehicles, isLoading, error, fetchVehicles } = useVehicleStore();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesStatus = filter === 'All' || vehicle.status === filter;
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleRefresh = () => {
    fetchVehicles();
  };

  if (isLoading && vehicles.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF6F0]">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner size="lg" />
          <p className="text-center text-[#2E2E2E] mt-4">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <Header onRefresh={handleRefresh} /> {/* Pass refresh handler */}

      <div className="container mx-auto px-4 py-16 pt-20 mt-16">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-center sm:text-center">
          <h2 className="text-4xl font-bold text-[#2E2E2E]">Welcome to Vehicle Tracker</h2>
          <p className="text-gray-600 mt-2">Monitor your vehicles efficiently and effectively.</p>
        </div>

        {/* Filter + Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
          >
            <option value="All">All</option>
            <option value="ACTIVE">Active</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="INACTIVE">Inactive</option>
          </select>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md p-2 pl-10 w-full"
            />
            <Car className="absolute left-2 top-2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Error Alert */}
        {error && <ErrorAlert error={error} onRetry={fetchVehicles} />}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Vehicles Card */}
          <div className="bg-[#E0F7FA] rounded-lg p-4 shadow-md border border-[#0097A7] mb-4 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2E2E2E]">Total Vehicles</p>
                <p className="text-2xl font-bold text-[#2E2E2E]">{vehicles.length}</p>
              </div>
              <Car className="h-8 w-8 text-[#0097A7]" />
            </div>
          </div>

          {/* Active Card */}
          <div className="bg-[#C8E6C9] rounded-lg p-4 shadow-md border border-[#388E3C] mb-4 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2E2E2E]">Active</p>
                <p className="text-2xl font-bold text-[#388E3C]">
                  {vehicles.filter((v: Vehicle) => v.status === 'ACTIVE').length}
                </p>
              </div>
              <div className="w-3 h-3 bg-[#388E3C] rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Maintenance Card */}
          <div className="bg-[#FFEB3B] rounded-lg p-4 shadow-md border border-[#FBC02D] mb-4 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2E2E2E]">Maintenance</p>
                <p className="text-2xl font-bold text-[#e7c05d]">
                  {vehicles.filter((v: Vehicle) => v.status === 'MAINTENANCE').length}
                </p>
              </div>
              <div className="w-3 h-3 bg-[#FBC02D] rounded-full"></div>
            </div>
          </div>

          {/* Inactive Card */}
          <div className="bg-[#FFCDD2] rounded-lg p-4 shadow-md border border-[#E57373] mb-4 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2E2E2E]">Inactive</p>
                <p className="text-2xl font-bold text-[#E57373]">
                  {vehicles.filter((v: Vehicle) => v.status === 'INACTIVE').length}
                </p>
              </div>
              <div className="w-3 h-3 bg-[#E57373] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle: Vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Empty State */}
        {filteredVehicles.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#2E2E2E] mb-2">No vehicles found</h3>
            <p className="text-[#2E2E2E] mb-4">There are no vehicles to display at the moment.</p>
            <Button onClick={fetchVehicles} variant="outline" className="hover:bg-orange-500">
              Try Again
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#F8F9FA] text-center py-4">
        <p className="text-[#2E2E2E]">© 2025 VehicleTracker App</p>
        <p className="text-[#2E2E2E]">Monitor your vehicles, safer every day.</p>
      </footer>
    </div>
  );
};
