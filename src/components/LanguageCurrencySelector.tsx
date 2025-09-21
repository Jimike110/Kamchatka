import React from 'react';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './ui/dropdown-menu';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { Globe, DollarSign } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' }
];

export function LanguageCurrencySelector() {
  const { language, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();

  const currentLanguage = languages.find(lang => lang.code === language);
  const currentCurrency = currencies.find(curr => curr.code === currency);

  return (
    <div className="flex items-center space-x-2">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{currentLanguage?.flag}</span>
            <span className="hidden md:inline">{currentLanguage?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code as 'en' | 'ru' | 'de')}
              className={language === lang.code ? 'bg-accent' : ''}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Currency Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">{currentCurrency?.symbol}</span>
            <span className="hidden md:inline">{currentCurrency?.code}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {currencies.map((curr) => (
            <DropdownMenuItem
              key={curr.code}
              onClick={() => setCurrency(curr.code as 'USD' | 'EUR' | 'RUB')}
              className={currency === curr.code ? 'bg-accent' : ''}
            >
              <span className="mr-2">{curr.symbol}</span>
              {curr.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}