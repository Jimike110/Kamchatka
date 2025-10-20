import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { getFavoriteServices, type Service } from "../utils/servicesData";

interface FavoritesContextType {
  toggleFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;
  favoriteServices: (serviceIds: string[]) => Service[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  let [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  // Load favorites from localStorage when user changes
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`favorites-${user.id}`);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (user && favorites.length >= 0) {
      localStorage.setItem(`favorites-${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const toggleFavorite = (serviceId: string) => {
    if (!user) {
      toast.error("Please log in to save favorites");
      return;
    }

    setFavorites((prev) => {
      const isFavorite = prev.includes(serviceId);
      if (isFavorite) {
        toast.success("Removed from favorites");
        return prev.filter((id) => id !== serviceId);
      } else {
        toast.success("Added to favorites");
        return [...prev, serviceId];
      }
    });
  };

  const isFavorite = (serviceId: string) => {
    return favorites.includes(serviceId);
  };

  const favoriteServices = (): Service[] => {
    return getFavoriteServices(favorites);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteServices,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
