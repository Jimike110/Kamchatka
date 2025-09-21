import React, { createContext, useContext, useState, useEffect } from 'react';

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
  convertPrice: (price: number, fromCurrency?: Currency) => number;
  formatPrice: (price: number, fromCurrency?: Currency) => string;
  updateRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  RUB: '₽'
};

// Fallback exchange rates if API fails
const FALLBACK_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.85,
  RUB: 95.50
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('currency');
    return (saved as Currency) || 'USD';
  });

  const [rates, setRates] = useState<ExchangeRates>(FALLBACK_RATES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  useEffect(() => {
    // Update rates on mount and then every 5 minutes
    updateRates();
    const interval = setInterval(updateRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const updateRates = async () => {
    try {
      setIsLoading(true);
      
      // Fetch from real exchange rate API
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();
      
      if (data.result === 'success' && data.rates) {
        setRates({
          USD: 1, // USD is base currency
          EUR: data.rates.EUR || FALLBACK_RATES.EUR,
          RUB: data.rates.RUB || FALLBACK_RATES.RUB
        });
        
        // Cache rates to localStorage for offline use
        localStorage.setItem('exchangeRates', JSON.stringify({
          rates: {
            USD: 1,
            EUR: data.rates.EUR || FALLBACK_RATES.EUR,
            RUB: data.rates.RUB || FALLBACK_RATES.RUB
          },
          lastUpdated: Date.now()
        }));
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Failed to update exchange rates:', error);
      
      // Try to load cached rates
      try {
        const cached = localStorage.getItem('exchangeRates');
        if (cached) {
          const cachedData = JSON.parse(cached);
          const oneHour = 60 * 60 * 1000;
          
          // Use cached rates if they're less than 1 hour old
          if (Date.now() - cachedData.lastUpdated < oneHour) {
            setRates(cachedData.rates);
            return;
          }
        }
      } catch (cacheError) {
        console.error('Failed to load cached rates:', cacheError);
      }
      
      // Fallback to default rates
      setRates(FALLBACK_RATES);
    } finally {
      setIsLoading(false);
    }
  };

  const convertPrice = (price: number, fromCurrency: Currency = 'USD'): number => {
    // Convert from source currency to USD first, then to target currency
    const usdPrice = price / rates[fromCurrency];
    return usdPrice * rates[currency];
  };

  const formatPrice = (price: number, fromCurrency: Currency = 'USD'): string => {
    const convertedPrice = convertPrice(price, fromCurrency);
    const symbol = CURRENCY_SYMBOLS[currency];
    
    // Format based on currency
    switch (currency) {
      case 'RUB':
        return `${Math.round(convertedPrice).toLocaleString('ru-RU')} ${symbol}`;
      case 'EUR':
        return `${symbol}${convertedPrice.toFixed(2)}`;
      default: // USD
        return `${symbol}${convertedPrice.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        setCurrency, 
        rates, 
        isLoading,
        convertPrice, 
        formatPrice, 
        updateRates 
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