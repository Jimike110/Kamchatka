import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { 
  DollarSign, 
  Plus, 
  Minus, 
  CreditCard, 
  Gift,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';

// Mock transaction data
const mockTransactions = [
  {
    id: '1',
    type: 'credit',
    amount: 50,
    description: 'Referral bonus - New user signup',
    date: '2024-09-15',
    status: 'completed'
  },
  {
    id: '2',
    type: 'debit',
    amount: 1200,
    description: 'Payment for Salmon Fishing Tour',
    date: '2024-09-10',
    status: 'completed'
  },
  {
    id: '3',
    type: 'credit',
    amount: 500,
    description: 'Account top-up via credit card',
    date: '2024-09-05',
    status: 'completed'
  },
  {
    id: '4',
    type: 'credit',
    amount: 25,
    description: 'Loyalty bonus - 5th booking milestone',
    date: '2024-08-28',
    status: 'completed'
  },
  {
    id: '5',
    type: 'debit',
    amount: 800,
    description: 'Payment for Volcano Hiking Tour',
    date: '2024-08-20',
    status: 'completed'
  },
  {
    id: '6',
    type: 'credit',
    amount: 1000,
    description: 'Initial account funding',
    date: '2024-08-15',
    status: 'completed'
  }
];

export function BalanceTab() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [topUpAmount, setTopUpAmount] = useState('');
  const [showTopUp, setShowTopUp] = useState(false);

  // Calculate current balance
  const currentBalance = mockTransactions.reduce((acc, transaction) => {
    return transaction.type === 'credit' 
      ? acc + transaction.amount 
      : acc - transaction.amount;
  }, 0);

  const handleTopUp = () => {
    // In production, this would integrate with payment processing
    console.log('Top up amount:', topUpAmount);
    setShowTopUp(false);
    setTopUpAmount('');
  };

  const getTransactionIcon = (type: string) => {
    return type === 'credit' ? (
      <ArrowUpRight className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowDownLeft className="h-4 w-4 text-red-500" />
    );
  };

  const getTransactionColor = (type: string) => {
    return type === 'credit' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(currentBalance)}</div>
            <p className="text-xs text-muted-foreground">
              {currentBalance} {t('dashboard.points')} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatPrice(75)}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lifetime Earned</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatPrice(1575)}</div>
            <p className="text-xs text-muted-foreground">
              From referrals & bonuses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              onClick={() => setShowTopUp(true)}
              className="flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Funds</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <Gift className="h-4 w-4" />
              <span>Refer a Friend</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Up Modal */}
      {showTopUp && (
        <Card>
          <CardHeader>
            <CardTitle>Add Funds to Your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Amount (USD)</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                min="10"
                max="5000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum: $10, Maximum: $5,000 per transaction
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[50, 100, 250, 500].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setTopUpAmount(amount.toString())}
                >
                  ${amount}
                </Button>
              ))}
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleTopUp} disabled={!topUpAmount || Number(topUpAmount) < 10}>
                <CreditCard className="h-4 w-4 mr-2" />
                Add {topUpAmount ? formatPrice(Number(topUpAmount)) : 'Funds'}
              </Button>
              <Button variant="outline" onClick={() => setShowTopUp(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <h4 className="font-medium">{transaction.description}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${getTransactionColor(transaction.type)}`}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatPrice(transaction.amount)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">Load More Transactions</Button>
          </div>
        </CardContent>
      </Card>

      {/* Balance Information */}
      <Card>
        <CardHeader>
          <CardTitle>How Points Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Earning Points</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 1 point = $1 USD</li>
                <li>• Earn 5% back on every booking</li>
                <li>• Get $50 for each successful referral</li>
                <li>• Milestone bonuses for frequent travelers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Using Points</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pay for any service with points</li>
                <li>• Combine points with other payment methods</li>
                <li>• Points never expire</li>
                <li>• Instant application at checkout</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}