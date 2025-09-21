export interface TimeSlot {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
  available: boolean;
  capacity: number;
  booked: number;
}

export interface ServiceAvailability {
  date: string;
  timeSlots: TimeSlot[];
  totalCapacity: number;
  booked: number;
}

export interface Service {
  id: string;
  category: 'hunting' | 'fishing' | 'recreation' | 'tours';
  title: string;
  supplier: string;
  location: string;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  tags: string[];
  available: boolean;
  featured: boolean;
  description: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: { day: number; title: string; description: string }[];
  availability: ServiceAvailability[];
  status: 'active' | 'inactive' | 'suspended';
  supplierId: string;
  supplierResponseTime: number; // minutes
  createdAt: string;
  updatedAt: string;
}

export interface BookingStatus {
  id: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
  serviceId: string;
  userId: string;
  supplierId: string;
  dates: {
    startDate: string;
    endDate: string;
  };
  timeSlots: string[];
  guests: number;
  totalPrice: number;
  supplierResponseDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

// Generate availability for next 90 days
const generateAvailability = (serviceId: string): ServiceAvailability[] => {
  const availability: ServiceAvailability[] = [];
  const today = new Date();
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const timeSlots: TimeSlot[] = [
      {
        id: `${serviceId}-${date.toISOString().split('T')[0]}-morning`,
        time: '08:00',
        period: 'morning',
        available: Math.random() > 0.2,
        capacity: 6,
        booked: Math.floor(Math.random() * 3)
      },
      {
        id: `${serviceId}-${date.toISOString().split('T')[0]}-afternoon`,
        time: '14:00',
        period: 'afternoon',
        available: Math.random() > 0.3,
        capacity: 6,
        booked: Math.floor(Math.random() * 4)
      },
      {
        id: `${serviceId}-${date.toISOString().split('T')[0]}-evening`,
        time: '18:00',
        period: 'evening',
        available: Math.random() > 0.4,
        capacity: 4,
        booked: Math.floor(Math.random() * 2)
      }
    ];

    // Some services also have night slots
    if (['1', '3', '4'].includes(serviceId)) {
      timeSlots.push({
        id: `${serviceId}-${date.toISOString().split('T')[0]}-night`,
        time: '22:00',
        period: 'night',
        available: Math.random() > 0.5,
        capacity: 4,
        booked: Math.floor(Math.random() * 2)
      });
    }

    availability.push({
      date: date.toISOString().split('T')[0],
      timeSlots,
      totalCapacity: timeSlots.reduce((sum, slot) => sum + slot.capacity, 0),
      booked: timeSlots.reduce((sum, slot) => sum + slot.booked, 0)
    });
  }
  
  return availability;
};

export const services: Service[] = [
  {
    id: '1',
    category: 'hunting',
    title: 'Brown Bear Hunting Expedition',
    supplier: 'Kamchatka Outfitters',
    location: 'Central Kamchatka',
    duration: '7 days',
    groupSize: '2-4 people',
    price: 4500,
    originalPrice: 5200,
    rating: 4.9,
    reviews: 67,
    images: [
      'https://images.unsplash.com/photo-1612257460705-e0d24b7a4808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyJTIwd2lsZGxpZmUlMjBrYW1jaGF0a2F8ZW58MXx8fHwxNzU4MjEwNTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1738778703204-af2bfbb62a5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW50aW5nJTIwd2lsZGVybmVzcyUyMHJ1c3NpYXxlbnwxfHx8fDE3NTgyMTA1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1704739410998-564ae85cc537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW1jaGF0a2ElMjB2b2xjYW5vJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1ODIxMDUyNnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    tags: ['Premium', 'All-Inclusive', 'Expert Guide'],
    available: true,
    featured: true,
    description: 'Experience the ultimate wilderness adventure in Kamchatka\'s pristine landscape. Our expert guides ensure your safety while providing an unforgettable journey through one of Earth\'s last frontiers.',
    highlights: [
      'Expert local guides with 15+ years experience',
      'All necessary equipment and safety gear included',
      'Meals and accommodation provided',
      'Small group sizes for personalized experience',
      'Professional photography opportunities'
    ],
    included: [
      'Professional guide services',
      'All meals during expedition',
      'Accommodation in wilderness lodges',
      'Transportation to/from base camp',
      'All necessary equipment',
      'Safety briefings and training'
    ],
    notIncluded: [
      'International flights to Kamchatka',
      'Personal equipment and clothing',
      'Travel insurance',
      'Alcoholic beverages',
      'Tips for guides and staff'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Orientation', description: 'Arrive in Petropavlovsk-Kamchatsky, meet your guide, equipment check and safety briefing.' },
      { day: 2, title: 'Journey to Base Camp', description: 'Helicopter transfer to remote wilderness location, set up camp and begin adventure.' },
      { day: 3, title: 'Full Day Adventure', description: 'Full day of activities with expert guidance and stunning wilderness views.' }
    ],
    availability: generateAvailability('1'),
    status: 'active',
    supplierId: 'supplier-1',
    supplierResponseTime: 10,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: '2',
    category: 'fishing',
    title: 'Salmon Run Fishing Tour',
    supplier: 'Pacific Adventures',
    location: 'Kronotsky River',
    duration: '3 days',
    groupSize: '4-8 people',
    price: 890,
    rating: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1719754521965-c54b6aa1f34d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwYm9hdCUyMGFyY3RpY3xlbnwxfHx8fDE3NTgyMTA1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1612257460705-e0d24b7a4808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyJTIwd2lsZGxpZmUlMjBrYW1jaGF0a2F8ZW58MXx8fHwxNzU4MjEwNTM4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    tags: ['Popular', 'Equipment Included'],
    available: true,
    featured: false,
    description: 'Join us for the spectacular salmon run in Kamchatka\'s pristine rivers. Experience world-class fishing in one of the most remote and beautiful locations on Earth.',
    highlights: [
      'World-class salmon fishing',
      'Professional fishing guides',
      'All equipment provided',
      'Remote wilderness location',
      'Small group experience'
    ],
    included: [
      'Professional fishing guide',
      'All fishing equipment',
      'Meals and accommodation',
      'Transportation to fishing sites',
      'Fishing licenses'
    ],
    notIncluded: [
      'International flights',
      'Personal clothing',
      'Travel insurance',
      'Alcoholic beverages'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Setup', description: 'Arrive at fishing camp, equipment check and first fishing session.' },
      { day: 2, title: 'Full Day Fishing', description: 'Early morning and evening fishing sessions at prime locations.' },
      { day: 3, title: 'Final Session & Departure', description: 'Morning fishing and departure back to city.' }
    ],
    availability: generateAvailability('2'),
    status: 'active',
    supplierId: 'supplier-2',
    supplierResponseTime: 15,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: '3',
    category: 'recreation',
    title: 'Luxury Wilderness Lodge',
    supplier: 'Kamchatka Retreats',
    location: 'Valley of Geysers',
    duration: '5 days',
    groupSize: '2-6 people',
    price: 1850,
    rating: 4.9,
    reviews: 43,
    images: [
      'https://images.unsplash.com/photo-1690120634477-b83d4ca63ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc1ODIxMDUzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1704739410998-564ae85cc537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW1jaGF0a2ElMjB2b2xjYW5vJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1ODIxMDUyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1612257460705-e0d24b7a4808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyJTIwd2lsZGxpZmUlMjBrYW1jaGF0a2F8ZW58MXx8fHwxNzU4MjEwNTM4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    tags: ['Luxury', 'Spa Services', 'All-Inclusive'],
    available: true,
    featured: true,
    description: 'Unwind in luxury while surrounded by Kamchatka\'s volcanic landscape. Our exclusive lodge offers world-class amenities in pristine wilderness.',
    highlights: [
      'Luxury wilderness accommodation',
      'Spa and wellness services',
      'Gourmet dining experience',
      'Private hot springs access',
      'Helicopter excursions included'
    ],
    included: [
      'Luxury lodge accommodation',
      'All meals and beverages',
      'Spa services',
      'Guided excursions',
      'Helicopter transfers'
    ],
    notIncluded: [
      'International flights',
      'Personal expenses',
      'Travel insurance',
      'Premium alcoholic beverages'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Welcome', description: 'Helicopter transfer to lodge, welcome dinner and orientation.' },
      { day: 2, title: 'Spa & Relaxation', description: 'Spa treatments, hot springs, and guided nature walks.' },
      { day: 3, title: 'Adventure Day', description: 'Helicopter excursion to Valley of Geysers and volcano viewing.' }
    ],
    availability: generateAvailability('3'),
    status: 'active',
    supplierId: 'supplier-3',
    supplierResponseTime: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: '4',
    category: 'tours',
    title: 'Volcano Helicopter Tour',
    supplier: 'Sky Adventures',
    location: 'Multiple Volcanoes',
    duration: '1 day',
    groupSize: '2-6 people',
    price: 1200,
    rating: 4.7,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1704739410998-564ae85cc537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW1jaGF0a2ElMjB2b2xjYW5vJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1ODIxMDUyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1690120634477-b83d4ca63ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc1ODIxMDUzNXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    tags: ['Adventure', 'Photography'],
    available: false,
    featured: false,
    description: 'Soar above Kamchatka\'s active volcanoes in this breathtaking helicopter tour. Witness the raw power of nature from a bird\'s eye view.',
    highlights: [
      'Helicopter tour of active volcanoes',
      'Professional pilot and guide',
      'Aerial photography opportunities',
      'Multiple volcano viewing',
      'Safety equipment included'
    ],
    included: [
      'Helicopter tour',
      'Professional pilot',
      'Safety equipment',
      'Photography guidance',
      'Light refreshments'
    ],
    notIncluded: [
      'Hotel pickup/dropoff',
      'Personal equipment',
      'Travel insurance',
      'Additional flights'
    ],
    itinerary: [
      { day: 1, title: 'Helicopter Tour', description: 'Full day helicopter tour visiting multiple active volcanoes with landing opportunities.' }
    ],
    availability: generateAvailability('4'),
    status: 'active',
    supplierId: 'supplier-4',
    supplierResponseTime: 12,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: '5',
    category: 'hunting',
    title: 'Wild Boar Hunting',
    supplier: 'Taiga Hunters',
    location: 'Southern Kamchatka',
    duration: '4 days',
    groupSize: '2-6 people',
    price: 2100,
    rating: 4.6,
    reviews: 31,
    images: [
      'https://images.unsplash.com/photo-1738778703204-af2bfbb62a5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW50aW5nJTIwd2lsZGVybmVzcyUyMHJ1c3NpYXxlbnwxfHx8fDE3NTgyMTA1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1612257460705-e0d24b7a4808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyJTIwd2lsZGxpZmUlMjBrYW1jaGF0a2F8ZW58MXx8fHwxNzU4MjEwNTM4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    tags: ['Moderate', 'Equipment Included'],
    available: true,
    featured: false,
    description: 'Experience traditional wild boar hunting in Kamchatka\'s southern forests. Perfect for hunters of all skill levels.',
    highlights: [
      'Wild boar hunting experience',
      'Expert hunting guides',
      'Equipment provided',
      'Traditional hunting methods',
      'Trophy preparation included'
    ],
    included: [
      'Professional hunting guide',
      'Hunting equipment',
      'Accommodation',
      'All meals',
      'Trophy preparation'
    ],
    notIncluded: [
      'Hunting licenses',
      'International flights',
      'Personal equipment',
      'Travel insurance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Preparation', description: 'Arrive at hunting camp, equipment check and safety briefing.' },
      { day: 2, title: 'First Hunt', description: 'Early morning hunt with experienced guides.' },
      { day: 3, title: 'Main Hunting Day', description: 'Full day hunting expedition in prime locations.' }
    ],
    availability: generateAvailability('5'),
    status: 'active',
    supplierId: 'supplier-5',
    supplierResponseTime: 8,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: '6',
    category: 'fishing',
    title: 'Arctic Char Expedition',
    supplier: 'Northern Waters',
    location: 'Kamchatka River',
    duration: '6 days',
    groupSize: '3-5 people',
    price: 1650,
    rating: 4.8,
    reviews: 56,
    images: [
      'https://images.unsplash.com/photo-1719754521965-c54b6aa1f34d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwYm9hdCUyMGFyY3RpY3xlbnwxfHx8fDE3NTgyMTA1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1704739410998-564ae85cc537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW1jaGF0a2ElMjB2b2xjYW5vJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1ODIxMDUyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1690120634477-b83d4ca63ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc1ODIxMDUzNXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    tags: ['Premium', 'Fly Fishing', 'Expert Guide'],
    available: true,
    featured: false,
    description: 'Target Arctic char in Kamchatka\'s crystal-clear rivers. This premium fly fishing expedition offers unparalleled angling opportunities.',
    highlights: [
      'Arctic char fly fishing',
      'Expert fly fishing guides',
      'Premium equipment included',
      'Remote fishing locations',
      'Photography opportunities'
    ],
    included: [
      'Professional guide',
      'Fly fishing equipment',
      'Accommodation',
      'All meals',
      'Transportation'
    ],
    notIncluded: [
      'International flights',
      'Personal clothing',
      'Travel insurance',
      'Fishing licenses'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Setup', description: 'Arrive at fishing lodge, equipment setup and first casting.' },
      { day: 2, title: 'River Exploration', description: 'Explore different river sections for Arctic char.' },
      { day: 3, title: 'Prime Fishing', description: 'Visit the best fishing spots with expert guidance.' }
    ],
    availability: generateAvailability('6'),
    status: 'active',
    supplierId: 'supplier-6',
    supplierResponseTime: 7,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  }
];

export const categories = [
  { id: 'all', label: 'All Services', icon: 'Mountain', count: services.length },
  { id: 'hunting', label: 'Hunting', icon: 'Target', count: services.filter(s => s.category === 'hunting').length },
  { id: 'fishing', label: 'Fishing', icon: 'Fish', count: services.filter(s => s.category === 'fishing').length },
  { id: 'recreation', label: 'Recreation', icon: 'TreePine', count: services.filter(s => s.category === 'recreation').length },
  { id: 'tours', label: 'Tours', icon: 'Mountain', count: services.filter(s => s.category === 'tours').length }
];

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export function getServicesByCategory(category: string): Service[] {
  if (category === 'all') return services;
  return services.filter(service => service.category === category);
}

export function searchServices(query: string): Service[] {
  const lowercaseQuery = query.toLowerCase();
  return services.filter(service => 
    service.title.toLowerCase().includes(lowercaseQuery) ||
    service.supplier.toLowerCase().includes(lowercaseQuery) ||
    service.location.toLowerCase().includes(lowercaseQuery) ||
    service.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getAvailableTimeSlots(serviceId: string, date: string): TimeSlot[] {
  const service = getServiceById(serviceId);
  if (!service) return [];
  
  const availability = service.availability.find(a => a.date === date);
  return availability?.timeSlots.filter(slot => slot.available) || [];
}

export function getFavoriteServices(favoriteIds: string[]): Service[] {
  return services.filter(service => favoriteIds.includes(service.id));
}