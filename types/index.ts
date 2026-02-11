export interface Job {
    id: string;
    pickupLocation: string;
    pickupAddress: string;
    dropoffLocation: string;
    dropoffAddress: string;
    distance: string;
    estimatedTime: string;
    price: number;
    tags: string[];
    status: 'available' | 'current' | 'completed' | 'cancelled';
}

export interface DriverStats {
    todayEarnings: number;
    onlineTime: string;
    totalJobs: number;
    completedJobs: number;
    rating: number;
}

export interface Transaction {
    id: string;
    amount: number;
    date: string;
    type: 'earning' | 'withdrawal' | 'bonus';
    description: string;
    status: 'completed' | 'pending';
}

export interface DriverProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    rating: number;
    totalTrips: number;
    vehicleInfo: {
        make: string;
        model: string;
        year: number;
        licensePlate: string;
    };
}
