import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PageType = 
  | 'home'
  | 'catalog'
  | 'category'
  | 'service'
  | 'search'
  | 'about'
  | 'contact'
  | 'dashboard'
  | 'allServices'
  | 'ourStory'
  | 'team'
  | 'careers'
  | 'press'
  | 'help'
  | 'faq'
  | 'safety'
  | 'terms'
  | 'privacy'
  | 'cookies';

export type ServiceCategory = 'hunting' | 'fishing' | 'recreation' | 'tours';

interface AppState {
  currentPage: PageType;
  selectedCategory?: ServiceCategory;
  selectedServiceId?: string;
  searchQuery?: string;
  searchResults?: any[];
  isLoading: boolean;
}

interface AppContextType {
  state: AppState;
  navigateTo: (page: PageType, params?: { category?: ServiceCategory; serviceId?: string; query?: string }) => void;
  goBack: () => void;
  setLoading: (loading: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultState: AppState = {
  currentPage: 'home',
  isLoading: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [pageHistory, setPageHistory] = useState<PageType[]>(['home']);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) return JSON.parse(saved);
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode to document
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const navigateTo = (
    page: PageType, 
    params?: { category?: ServiceCategory; serviceId?: string; query?: string }
  ) => {
    setState(prev => ({
      ...prev,
      currentPage: page,
      selectedCategory: params?.category,
      selectedServiceId: params?.serviceId,
      searchQuery: params?.query,
    }));

    // Update page history
    setPageHistory(prev => {
      const newHistory = [...prev];
      if (newHistory[newHistory.length - 1] !== page) {
        newHistory.push(page);
      }
      return newHistory.slice(-10); // Keep last 10 pages
    });

    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setPageHistory(prev => {
      if (prev.length > 1) {
        const newHistory = [...prev];
        newHistory.pop(); // Remove current page
        const previousPage = newHistory[newHistory.length - 1];
        
        setState(prevState => ({
          ...prevState,
          currentPage: previousPage,
          selectedCategory: undefined,
          selectedServiceId: undefined,
          searchQuery: undefined,
        }));
        
        return newHistory;
      }
      return prev;
    });
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <AppContext.Provider 
      value={{ 
        state, 
        navigateTo, 
        goBack, 
        setLoading,
        isDarkMode,
        toggleDarkMode 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}