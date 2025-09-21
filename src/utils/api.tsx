import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-8cf9cdf2`;

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error(`API Error [${endpoint}]:`, data);
      return { success: false, error: data.error || 'Request failed' };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Network Error [${endpoint}]:`, error);
    return { success: false, error: 'Network error' };
  }
}

export const api = {
  // Services
  getServices: () => apiRequest('/services'),
  getService: (id: string) => apiRequest(`/services/${id}`),
  
  // Cart
  getCart: (userId: string) => apiRequest(`/cart/${userId}`),
  addToCart: (userId: string, item: any) => 
    apiRequest(`/cart/${userId}`, {
      method: 'POST',
      body: JSON.stringify(item)
    }),
  updateCartItem: (userId: string, itemId: string, data: any) =>
    apiRequest(`/cart/${userId}/${itemId}`, {
      method: 'PUT', 
      body: JSON.stringify(data)
    }),
  removeFromCart: (userId: string, itemId: string) =>
    apiRequest(`/cart/${userId}/${itemId}`, {
      method: 'DELETE'
    }),
  clearCart: (userId: string) =>
    apiRequest(`/cart/${userId}/clear`, {
      method: 'DELETE'
    }),

  // Bookings
  createBooking: (userId: string, booking: any) =>
    apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify({ userId, ...booking })
    }),
  getBookings: (userId: string) => apiRequest(`/bookings/${userId}`),
  getBooking: (bookingId: string) => apiRequest(`/booking/${bookingId}`),
  updateBooking: (bookingId: string, data: any) =>
    apiRequest(`/booking/${bookingId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // User signup
  signup: (userData: any) =>
    apiRequest('/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
};

export default api;