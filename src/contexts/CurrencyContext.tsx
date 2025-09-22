import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type Currency = 'USD' | 'EUR' | 'RUB';

interface ExchangeRates {
  USD: number;
  EUR: number;
  RUB: number;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  rates: ExchangeRates;
  isLoading: boolean;
  formatPrice: (priceInUsd: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_SYMBOLS: { [key in Currency]: string } = {
  USD: '$',
  EUR: '€',
  RUB: '₽'
};

const FALLBACK_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  RUB: 91.50
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('currency');
    return (saved as Currency) || 'USD';
  });

  const [rates, setRates] = useState<ExchangeRates>(FALLBACK_RATES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  useEffect(() => {
    const updateRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('Failed to fetch exchange rates');
        const data = await response.json();
        
        if (data.result === 'success' && data.rates) {
          const newRates = {
            USD: data.rates.USD,
            EUR: data.rates.EUR,
            RUB: data.rates.RUB
          };
          setRates(newRates);
          localStorage.setItem('exchangeRates', JSON.stringify({ rates: newRates, timestamp: Date.now() }));
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error('Failed to update exchange rates:', error);
        toast.error("Could not fetch latest exchange rates. Using cached data.");
        const cached = localStorage.getItem('exchangeRates');
        if (cached) {
          setRates(JSON.parse(cached).rates);
        } else {
          setRates(FALLBACK_RATES);
        }
      } finally {
        setIsLoading(false);
      }
    };

    updateRates();
  }, []);

  const formatPrice = (priceInUsd: number): string => {
    const convertedPrice = priceInUsd * rates[currency];
    
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        setCurrency, 
        rates, 
        isLoading,
        formatPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}