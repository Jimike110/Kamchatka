import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Search,
  Filter,
  Eye,
  MessageCircle,
  Star
} from 'lucide-react';

// Mock booking data
const mockBookings = [
  {
    id: '1',
    service: 'Brown Bear Hunting Expedition',
    location: 'Kronotsky Nature Reserve',
    date: '2024-10-15',
    endDate: '2024-10-22',
    guests: 2,
    status: 'confirmed',
    price: 3500,
    supplier: 'Wild Kamchatka Adventures',
    image: 'https://images.unsplash.com/photo-1518991669774-f21682f5b2ad?w=400&h=300&fit=crop',
    description: '7-day brown bear hunting expedition in the pristine wilderness of Kamchatka'
  },
  {
    id: '2',
    service: 'Salmon Fishing Tour',
    location: 'Zhupanova River',
    date: '2024-09-28',
    endDate: '2024-09-30',
    guests: 1,
    status: 'completed',
    price: 1200,
    supplier: 'Kamchatka Fishing Co.',
    image: 'https://images.unsplash.com/photo-1534043464124-3be32fe66d66?w=400&h=300&fit=crop',
    description: '3-day salmon fishing adventure on the famous Zhupanova River',
    rating: 5
  },
  {
    id: '3',
    service: 'Volcano Hiking Tour',
    location: 'Mutnovsky Volcano',
    date: '2024-11-02',
    endDate: '2024-11-05',
    guests: 3,
    status: 'pending',
    price: 800,
    supplier: 'Mountain Explorer Tours',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    description: '4-day guided hiking tour to the active Mutnovsky Volcano'
  },
  {
    id: '4',
    service: 'Wildlife Photography Workshop',
    location: 'Valley of Geysers',
    date: '2024-08-15',
    endDate: '2024-08-20',
    guests: 1,
    status: 'completed',
    price: 2200,
    supplier: 'Nature Focus Photography',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=300&fit=crop',
    description: '6-day wildlife photography workshop in the UNESCO World Heritage site',
    rating: 4
  },
  {
    id: '5',
    service: 'Helicopter Tour & Hot Springs',
    location: 'Various Locations',
    date: '2024-07-10',
    endDate: '2024-07-10',
    guests: 2,
    status: 'cancelled',
    price: 950,
    supplier: 'Sky High Adventures',
    image: 'https://images.unsplash.com/photo-1478358161113-b0e11994a36b?w=400&h=300&fit=crop',
    description: 'Scenic helicopter tour with hot springs relaxation'
  }
];

export function BookingsTab() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = mockBookings
    .filter(booking => {
      const matchesSearch = booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'price':
          return b.price - a.price;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-64 h-48 lg:h-auto">
                  <img
                    src={booking.image}
                    alt={booking.service}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{booking.service}</h3>
                      <p className="text-gray-600 mb-2">{booking.description}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.date} - {booking.endDate}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {t(`booking.${booking.status}`)}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(booking.price)}
                      </div>
                      <div className="text-sm text-gray-500">
                        by {booking.supplier}
                      </div>
                      {booking.rating && (
                        <div className="flex items-center space-x-1">
                          {renderStars(booking.rating)}
                          <span className="text-sm text-gray-600 ml-1">({booking.rating}/5)</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        {t('common.view')}
                      </Button>
                      {booking.status === 'confirmed' && (
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      )}
                      {booking.status === 'completed' && !booking.rating && (
                        <Button size="sm">
                          <Star className="h-4 w-4 mr-1" />
                          Rate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : "You haven't made any bookings yet"
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button>Browse Services</Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}