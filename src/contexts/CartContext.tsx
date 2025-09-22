import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import api from "../utils/api";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  serviceId: string;
  title: string;
  supplier: string;
  image: string;
  price: number;
  duration: string;
  groupSize: string;
  location: string;
  dates: {
    startDate: string;
    endDate: string;
  };
  guests: number;
  totalPrice: number;
  addedAt: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  loading: boolean;
  addToCart: (item: CartItem) => Promise<void>;
  updateCartItem: (itemId: string, data: Partial<CartItem>) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const itemCount = items.length;
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const refreshCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.getCart(user.id);
      if (response.success) {
        setItems(response.data?.items || []);
      } else {
        console.error("Failed to fetch cart:", response.error);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item: CartItem) => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    try {
      const response = await api.addToCart(user.id, item);
      if (response.success) {
        await refreshCart();
        toast.success("Added to cart");
      } else {
        toast.error(response.error || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart");
    }
  };

  const updateCartItem = async (itemId: string, data: Partial<CartItem>) => {
    if (!user) return;

    try {
      const response = await api.updateCartItem(user.id, itemId, data);
      if (response.success) {
        await refreshCart();
        toast.success("Cart updated");
      } else {
        toast.error(response.error || "Failed to update cart");
      }
    } catch (error) {
      console.error("Update cart error:", error);
      toast.error("Failed to update cart");
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!user) return;

    try {
      const response = await api.removeFromCart(user.id, itemId);
      if (response.success) {
        await refreshCart();
        toast.success("Removed from cart");
      } else {
        toast.error(response.error || "Failed to remove from cart");
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast.error("Failed to remove from cart");
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const response = await api.clearCart(user.id);
      if (response.success) {
        setItems([]);
        toast.success("Cart cleared");
      } else {
        toast.error(response.error || "Failed to clear cart");
      }
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Failed to clear cart");
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const value = {
    items,
    itemCount,
    totalAmount,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
