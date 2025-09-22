import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { toast } from 'sonner';
import { 
  Users, 
  Share2, 
  Copy, 
  Mail, 
  MessageCircle,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';

// Mock referral data
const mockReferrals = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    joinDate: '2024-09-10',
    status: 'active',
    bookings: 2,
    earnedAmount: 50,
    avatar: null
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    joinDate: '2024-08-25',
    status: 'active',
    bookings: 1,
    earnedAmount: 50,
    avatar: null
  },
  {
    id: '3',
    name: 'David Kim',
    email: 'david.kim@email.com',
    joinDate: '2024-08-15',
    status: 'pending',
    bookings: 0,
    earnedAmount: 0,
    avatar: null
  }
];

export function ReferralsTab() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [referralCode] = useState('KAMCHATKA-USER123'); // In production, this would be user-specific
  const [inviteEmail, setInviteEmail] = useState('');

  const totalEarnings = mockReferrals.reduce((sum, referral) => sum + referral.earnedAmount, 0);
  const activeReferrals = mockReferrals.filter(r => r.status === 'active').length;
  const pendingReferrals = mockReferrals.filter(r => r.status === 'pending').length;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied to clipboard!');
  };

  const handleCopyLink = () => {
    const referralLink = `https://kamchatka-tours.com/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  };

  const handleSendInvite = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }
    
    // In production, this would send an actual email
    toast.success(`Invitation sent to ${inviteEmail}!`);
    setInviteEmail('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <Clock className="h-4 w-4 text-yellow-500" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatPrice(totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">
              From {mockReferrals.length} referrals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeReferrals}</div>
            <p className="text-xs text-muted-foreground">
              {pendingReferrals} pending signup{pendingReferrals !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(50)}</div>
            <p className="text-xs text-muted-foreground">
              1 new referral
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Share Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Referral Code</label>
            <div className="flex space-x-2">
              <Input value={referralCode} readOnly className="font-mono" />
              <Button onClick={handleCopyCode} variant="outline">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={handleCopyLink} variant="outline" className="flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Copy Referral Link</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Share on Social</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Send Invitation */}
      <Card>
        <CardHeader>
          <CardTitle>Invite a Friend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="email"
              placeholder="Enter friend's email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button onClick={handleSendInvite}>
              <Mail className="h-4 w-4 mr-2" />
              Send Invite
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Your friend will receive an invitation email with your referral code.
          </p>
        </CardContent>
      </Card>

      {/* Referral List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReferrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={referral.avatar} />
                    <AvatarFallback>
                      {referral.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{referral.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{referral.email}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(referral.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    {getStatusIcon(referral.status)}
                    <Badge className={getStatusColor(referral.status)}>
                      {referral.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {referral.bookings} booking{referral.bookings !== 1 ? 's' : ''}
                  </div>
                  <div className="font-medium text-green-600">
                    {formatPrice(referral.earnedAmount)} earned
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mockReferrals.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals yet</h3>
              <p className="text-gray-600 mb-4">
                Start sharing your referral code to earn rewards!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Referrals Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">1. Share Your Code</h4>
              <p className="text-sm text-gray-600">
                Share your unique referral code with friends and family
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">2. They Sign Up</h4>
              <p className="text-sm text-gray-600">
                Your friend creates an account using your referral code
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">3. You Both Earn</h4>
              <p className="text-sm text-gray-600">
                You get $50, they get 10% off their first booking
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}