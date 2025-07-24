import { create } from 'zustand';
import type { Vehicle, VehicleDetail, VehicleStore } from '../types/vehicle'; 

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Avanza",
    status: "ACTIVE",
    speed: 60,
    updated_at: "2025-01-23T10:00:00Z"
  },
  {
    id: 2,
    name: "Daihatsu Xenia",
    status: "ACTIVE",
    speed: 70,
    updated_at: "2025-01-23T09:45:00Z"
  },
  {
    id: 3,
    name: "Honda Brio",
    status: "ACTIVE",
    speed: 50,
    updated_at: "2025-01-23T08:30:00Z"
  },
  {
    id: 4,
    name: "Toyota Innova Reborn",
    status: "MAINTENANCE",
    speed: 0,
    updated_at: "2025-01-23T07:15:00Z"
  },
  {
    id: 5,
    name: "Mitsubishi Xpander",
    status: "INACTIVE",
    speed: 0,
    updated_at: "2025-01-23T10:30:00Z"
  },
  {
    id: 6,
    name: "Suzuki Ertiga",
    status: "ACTIVE",
    speed: 45,
    updated_at: "2025-01-23T10:30:00Z"
  },
  {
    id: 7,
    name: "Honda Jazz",
    status: "ACTIVE",
    speed: 55,
    updated_at: "2025-01-23T10:30:00Z"
  },
  {
    id: 8,
    name: "Wuling Almaz",
    status: "ACTIVE",
    speed: 65,
    updated_at: "2025-01-23T10:30:00Z"
  },
  {
    id: 9,
    name: "Toyota Rush",
    status: "ACTIVE",
    speed: 60,
    updated_at: "2025-01-23T10:30:00Z"
  },
  {
    id: 10,
    name: "Daihatsu Terios",
    status: "INACTIVE",
    speed: 0,
    updated_at: "2025-01-23T10:30:00Z"
  },
  {
    id: 11,
    name: "Nissan X-Trail",
    status: "ACTIVE",
    speed: 65,
    updated_at: "2025-01-23T10:30:00Z"
  },
  {
    id: 12,
    name: "Mazda CX-5",
    status: "MAINTENANCE",
    speed: 0,
    updated_at: "2025-01-23T10:30:00Z"
  }
];

const mockVehicleDetails: { [key: number]: VehicleDetail } = {
  1: {
    vehicleId: 1,
    name: "Toyota Avanza",
    odometer: 123456.78,
    fuel_level: 70.2,
    timestamp: "2025-01-23T10:00:00Z",
    latitude: -6.12,
    longitude: 106.85,
    speed: 60,
    status: "ACTIVE"
  },
  2: {
    vehicleId: 2,
    name: "Daihatsu Xenia",
    odometer: 98765.43,
    fuel_level: 85.5,
    timestamp: "2025-01-23T09:45:00Z",
    latitude: -6.20,
    longitude: 106.90,
    speed: 70,
    status: "ACTIVE"
  },
  3: {
    vehicleId: 3,
    name: "Honda Brio",
    odometer: 156789.12,
    fuel_level: 45.8,
    timestamp: "2025-01-23T08:30:00Z",
    latitude: -6.15,
    longitude: 106.75,
    speed: 50,
    status: "ACTIVE"
  },
  4: {
    vehicleId: 4,
    name: "Toyota Innova Reborn",
    odometer: 87654.32,
    fuel_level: 25.3,
    timestamp: "2025-01-23T07:15:00Z",
    latitude: -6.25,
    longitude: 106.95,
    speed: 0,
    status: "MAINTENANCE"
  },
  5: {
    vehicleId: 5,
    name: "Mitsubishi Xpander",
    odometer: 134567.89,
    fuel_level: 92.1,
    timestamp: "2025-01-23T10:30:00Z",
    latitude: -6.18,
    longitude: 106.82,
    speed: 0,
    status: "INACTIVE"
  },
  6: {
    vehicleId: 6,
    name: "Suzuki Ertiga",
    odometer: 123456.78,
    fuel_level: 70.2,
    timestamp: "2025-01-23T10:00:00Z",
    latitude: -6.12,
    longitude: 106.85,
    speed: 45,
    status: "ACTIVE"
  },
  7: {
    vehicleId: 7,
    name: "Honda Jazz",
    odometer: 98765.43,
    fuel_level: 85.5,
    timestamp: "2025-01-23T09:45:00Z",
    latitude: -6.20,
    longitude: 106.90,
    speed: 55,
    status: "ACTIVE"
  },
  8: {
    vehicleId: 8,
    name: "Wuling Almaz",
    odometer: 156789.12,
    fuel_level: 45.8,
    timestamp: "2025-01-23T08:30:00Z",
    latitude: -6.15,
    longitude: 106.75,
    speed: 65,
    status: "ACTIVE"
  },
  9: {
    vehicleId: 9,
    name: "Toyota Rush",
    odometer: 87654.32,
    fuel_level: 25.3,
    timestamp: "2025-01-23T07:15:00Z",
    latitude: -6.25,
    longitude: 106.95,
    speed: 60,
    status: "ACTIVE"
  },
  10: {
    vehicleId: 10,
    name: "Daihatsu Terios",
    odometer: 134567.89,
    fuel_level: 92.1,
    timestamp: "2025-01-23T10:30:00Z",
    latitude: -6.18,
    longitude: 106.82,
    speed: 0,
    status: "INACTIVE"
  },
  11: {
    vehicleId: 11,
    name: "Nissan X-Trail",
    odometer: 50000.00,
    fuel_level: 60.0,
    timestamp: "2025-01-23T10:30:00Z",
    latitude: -6.10,
    longitude: 106.80,
    speed: 65,
    status: "ACTIVE"
  },
  12: {
    vehicleId: 12,
    name: "Mazda CX-5",
    odometer: 30000.00,
    fuel_level: 40.0,
    timestamp: "2025-01-23T10:30:00Z",
    latitude: -6.15,
    longitude: 106.85,
    speed: 0,
    status: "MAINTENANCE"
  }
};

const fetchVehiclesAPI = (): Promise<Vehicle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVehicles);
    }, 800);
  });
};

const fetchVehicleByIdAPI = (id: number): Promise<VehicleDetail> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const vehicle = mockVehicleDetails[id];
      if (vehicle) {
        resolve(vehicle);
      } else {
        reject(new Error(`Vehicle with ID ${id} not found`));
      }
    }, 600);
  });
};

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  isLoading: false,
  error: null,

  fetchVehicles: async () => {
    set({ isLoading: true, error: null });
    try {
      const vehicles = await fetchVehiclesAPI();
      set({ vehicles, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch vehicles',
        isLoading: false 
      });
    }
  },

  fetchVehicleById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const vehicle = await fetchVehicleByIdAPI(id);
      set({ selectedVehicle: vehicle, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch vehicle details',
        isLoading: false 
      });
    }
  },

  clearError: () => set({ error: null })
}));
