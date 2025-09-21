import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { 
  User, 
  Calendar, 
  DollarSign, 
  Users, 
  Settings, 
  MapPin, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Heart
} from 'lucide-react';
import { ProfileTab } from './dashboard/ProfileTab';
import { BookingsTab } from './dashboard/BookingsTab';
import { BalanceTab } from './dashboard/BalanceTab';
import { ReferralsTab } from './dashboard/ReferralsTab';
import { SettingsTab } from './dashboard/SettingsTab';
import { FavoritesTab } from './dashboard/FavoritesTab';

export function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return null;
  }

  // Mock user data - in production, fetch from API
  const userStats = {
    balance: 1250, // USD
    totalBookings: 8,
    activeBookings: 2,
    completedBookings: 6,
    referrals: 3
  };

  const recentBookings = [
    {
      id: '1',
      service: 'Brown Bear Hunting',
      date: '2024-10-15',
      status: 'confirmed',
      price: 3500,
      location: 'Kronotsky Nature Reserve'
    },
    {
      id: '2',
      service: 'Salmon Fishing Tour',
      date: '2024-09-28',
      status: 'completed',
      price: 1200,
      location: 'Zhupanova River'
    },
    {
      id: '3',
      service: 'Volcano Hiking Tour',
      date: '2024-11-02',
      status: 'pending',
      price: 800,
      location: 'Mutnovsky Volcano'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback>
                {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">
                {t('dashboard.welcome')}, {user.user_metadata?.full_name || user.email}!
              </h1>
              <p className="text-muted-foreground">
                {userStats.balance} {t('dashboard.points')} • {userStats.totalBookings} {t('dashboard.totalBookings')}
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dashboard.title')}</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dashboard.bookings')}</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dashboard.favorites')}</span>
            </TabsTrigger>
            <TabsTrigger value="balance" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dashboard.balance')}</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dashboard.referrals')}</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dashboard.settings')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('dashboard.balance')}</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(userStats.balance)}</div>
                  <p className="text-xs text-muted-foreground">
                    {userStats.balance} {t('dashboard.points')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('dashboard.totalBookings')}</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">
                    {userStats.activeBookings} {t('dashboard.activeBookings')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('dashboard.completedBookings')}</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.completedBookings}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('dashboard.referrals')}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.referrals}</div>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(userStats.referrals * 50)} earned
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(booking.status)}
                        <div>
                          <h4 className="font-medium">{booking.service}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatPrice(booking.price)}</div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{booking.date}</span>
                          <Badge className={getStatusColor(booking.status)}>
                            {t(`booking.${booking.status}`)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View All Bookings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsTab />
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesTab />
          </TabsContent>

          <TabsContent value="balance">
            <BalanceTab />
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralsTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}