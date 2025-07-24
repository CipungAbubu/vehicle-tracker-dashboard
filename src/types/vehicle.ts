export interface Vehicle {
  id: number;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  speed: number;
  updated_at: string;
}

export interface VehicleDetail {
  vehicleId: number;
  name: string;
  odometer: number;
  fuel_level: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
}

export interface VehicleStore {
  vehicles: Vehicle[];
  selectedVehicle: VehicleDetail | null;
  isLoading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  fetchVehicleById: (id: number) => Promise<void>;
  clearError: () => void;
}