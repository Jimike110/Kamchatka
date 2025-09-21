import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Calendar,
  MapPin,
  Users,
  Clock,
  CreditCard
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface CartModalProps {
  children: React.ReactNode;
  onCheckout?: () => void;
  onAuthRequired?: () => void;
}

export function CartModal({ children, onCheckout, onAuthRequired }: CartModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { items, itemCount, totalAmount, removeFromCart, updateCartItem, clearCart, loading } = useCart();
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return start === end ? start : `${start} - ${end}`;
  };

  const handleCheckout = () => {
    if (!user) {
      onAuthRequired?.();
      return;
    }
    if (onCheckout) {
      onCheckout();
      setIsOpen(false);
    }
  };

  const updateGuests = async (itemId: string, newGuests: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const newTotalPrice = item.price * newGuests;
    await updateCartItem(itemId, { 
      guests: newGuests, 
      totalPrice: newTotalPrice 
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
            {itemCount > 0 && (
              <Badge variant="secondary">{itemCount}</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Review your selected adventures
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground">Loading cart...</div>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover amazing adventures to add to your cart
                </p>
                <Button onClick={() => setIsOpen(false)} variant="outline">
                  Browse Adventures
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1 truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          by {item.supplier}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDateRange(item.dates.startDate, item.dates.endDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {item.guests} guests
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateGuests(item.id, Math.max(1, item.guests - 1))}
                              disabled={item.guests <= 1}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-xs w-8 text-center">{item.guests}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateGuests(item.id, item.guests + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              ${item.totalPrice}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="text-xl font-bold">${totalAmount}</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button 
                  onClick={handleCheckout}
                  className="w-full" 
                  size="lg"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Button>
                
                <div className="text-xs text-center text-muted-foreground">
                  Free cancellation • Secure payment • ATOL protected
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}