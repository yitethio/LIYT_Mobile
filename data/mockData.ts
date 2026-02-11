import { Job, DriverStats, Transaction, DriverProfile } from '@/types';

export const mockJobs: Job[] = [
    {
        id: '1',
        pickupLocation: 'Pickup',
        pickupAddress: 'Downtown Fulfillment Center',
        dropoffLocation: 'Drop-off',
        dropoffAddress: 'North Suburbs Residence',
        distance: '5.2 miles',
        estimatedTime: '~15 min',
        price: 24.50,
        tags: ['Urgent', 'Fragile'],
        status: 'available',
    },
    {
        id: '2',
        pickupLocation: 'Pickup',
        pickupAddress: 'Downtown Fulfillment Center',
        dropoffLocation: 'Drop-off',
        dropoffAddress: 'North Suburbs Residence',
        distance: '5.2 miles',
        estimatedTime: '~15 min',
        price: 24.50,
        tags: ['Urgent', 'Fragile'],
        status: 'available',
    },
    {
        id: '3',
        pickupLocation: 'Pickup',
        pickupAddress: 'Downtown Fulfillment Center',
        dropoffLocation: 'Drop-off',
        dropoffAddress: 'North Suburbs Residence',
        distance: '5.2 miles',
        estimatedTime: '~15 min',
        price: 24.50,
        tags: ['Urgent', 'Fragile'],
        status: 'available',
    },
];

export const mockDriverStats: DriverStats = {
    todayEarnings: 142.80,
    onlineTime: '5h 22m',
    totalJobs: 156,
    completedJobs: 148,
    rating: 4.8,
};

export const mockTransactions: Transaction[] = [
    {
        id: '1',
        amount: 24.50,
        date: '2026-02-10T10:30:00',
        type: 'earning',
        description: 'Delivery to North Suburbs',
        status: 'completed',
    },
    {
        id: '2',
        amount: 32.00,
        date: '2026-02-10T09:15:00',
        type: 'earning',
        description: 'Delivery to Downtown',
        status: 'completed',
    },
    {
        id: '3',
        amount: 18.50,
        date: '2026-02-10T08:00:00',
        type: 'earning',
        description: 'Delivery to East Side',
        status: 'completed',
    },
];

export const mockDriverProfile: DriverProfile = {
    id: 'driver-001',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 123-4567',
    rating: 4.8,
    totalTrips: 156,
    vehicleInfo: {
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        licensePlate: 'ABC-1234',
    },
};
