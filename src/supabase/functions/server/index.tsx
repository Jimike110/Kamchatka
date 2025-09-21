import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from './kv_store.tsx';

const app = new Hono();

// CORS configuration
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Logging
app.use('*', logger(console.log));

// Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// User signup endpoint
app.post('/make-server-8cf9cdf2/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Cart endpoints
app.get('/make-server-8cf9cdf2/cart/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const cartKey = `cart:${userId}`;
    
    const cartData = await kv.get(cartKey);
    const items = cartData ? JSON.parse(cartData) : [];
    
    return c.json({ items });
  } catch (error) {
    console.log('Get cart error:', error);
    return c.json({ error: 'Failed to get cart' }, 500);
  }
});

app.post('/make-server-8cf9cdf2/cart/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const newItem = await c.req.json();
    const cartKey = `cart:${userId}`;
    
    // Get existing cart
    const cartData = await kv.get(cartKey);
    const items = cartData ? JSON.parse(cartData) : [];
    
    // Add new item
    items.push(newItem);
    
    // Save cart
    await kv.set(cartKey, JSON.stringify(items));
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Add to cart error:', error);
    return c.json({ error: 'Failed to add to cart' }, 500);
  }
});

app.put('/make-server-8cf9cdf2/cart/:userId/:itemId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const itemId = c.req.param('itemId');
    const updates = await c.req.json();
    const cartKey = `cart:${userId}`;
    
    // Get existing cart
    const cartData = await kv.get(cartKey);
    const items = cartData ? JSON.parse(cartData) : [];
    
    // Find and update item
    const itemIndex = items.findIndex((item: any) => item.id === itemId);
    if (itemIndex !== -1) {
      items[itemIndex] = { ...items[itemIndex], ...updates };
      await kv.set(cartKey, JSON.stringify(items));
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Update cart error:', error);
    return c.json({ error: 'Failed to update cart' }, 500);
  }
});

app.delete('/make-server-8cf9cdf2/cart/:userId/:itemId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const itemId = c.req.param('itemId');
    const cartKey = `cart:${userId}`;
    
    // Get existing cart
    const cartData = await kv.get(cartKey);
    const items = cartData ? JSON.parse(cartData) : [];
    
    // Remove item
    const filteredItems = items.filter((item: any) => item.id !== itemId);
    await kv.set(cartKey, JSON.stringify(filteredItems));
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Remove from cart error:', error);
    return c.json({ error: 'Failed to remove from cart' }, 500);
  }
});

app.delete('/make-server-8cf9cdf2/cart/:userId/clear', async (c) => {
  try {
    const userId = c.req.param('userId');
    const cartKey = `cart:${userId}`;
    
    await kv.del(cartKey);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Clear cart error:', error);
    return c.json({ error: 'Failed to clear cart' }, 500);
  }
});

// Booking endpoints
app.post('/make-server-8cf9cdf2/bookings', async (c) => {
  try {
    const bookingData = await c.req.json();
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const booking = {
      id: bookingId,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Store booking
    const bookingKey = `booking:${bookingId}`;
    await kv.set(bookingKey, JSON.stringify(booking));
    
    // Add to user's bookings list
    const userBookingsKey = `user_bookings:${bookingData.userId}`;
    const userBookingsData = await kv.get(userBookingsKey);
    const userBookings = userBookingsData ? JSON.parse(userBookingsData) : [];
    userBookings.push(bookingId);
    await kv.set(userBookingsKey, JSON.stringify(userBookings));
    
    console.log('Booking created successfully:', bookingId);
    return c.json({ success: true, bookingId, booking });
  } catch (error) {
    console.log('Create booking error:', error);
    return c.json({ error: 'Failed to create booking' }, 500);
  }
});

app.get('/make-server-8cf9cdf2/bookings/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const userBookingsKey = `user_bookings:${userId}`;
    
    const userBookingsData = await kv.get(userBookingsKey);
    const bookingIds = userBookingsData ? JSON.parse(userBookingsData) : [];
    
    const bookings = [];
    for (const bookingId of bookingIds) {
      const bookingKey = `booking:${bookingId}`;
      const bookingData = await kv.get(bookingKey);
      if (bookingData) {
        bookings.push(JSON.parse(bookingData));
      }
    }
    
    return c.json({ bookings });
  } catch (error) {
    console.log('Get bookings error:', error);
    return c.json({ error: 'Failed to get bookings' }, 500);
  }
});

app.get('/make-server-8cf9cdf2/booking/:bookingId', async (c) => {
  try {
    const bookingId = c.req.param('bookingId');
    const bookingKey = `booking:${bookingId}`;
    
    const bookingData = await kv.get(bookingKey);
    if (!bookingData) {
      return c.json({ error: 'Booking not found' }, 404);
    }
    
    const booking = JSON.parse(bookingData);
    return c.json({ booking });
  } catch (error) {
    console.log('Get booking error:', error);
    return c.json({ error: 'Failed to get booking' }, 500);
  }
});

app.put('/make-server-8cf9cdf2/booking/:bookingId', async (c) => {
  try {
    const bookingId = c.req.param('bookingId');
    const updates = await c.req.json();
    const bookingKey = `booking:${bookingId}`;
    
    const bookingData = await kv.get(bookingKey);
    if (!bookingData) {
      return c.json({ error: 'Booking not found' }, 404);
    }
    
    const booking = JSON.parse(bookingData);
    const updatedBooking = {
      ...booking,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(bookingKey, JSON.stringify(updatedBooking));
    
    return c.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.log('Update booking error:', error);
    return c.json({ error: 'Failed to update booking' }, 500);
  }
});

// Services endpoints (mock data for now)
app.get('/make-server-8cf9cdf2/services', async (c) => {
  try {
    // In a real app, this would come from a database
    const services = [
      {
        id: '1',
        title: 'Brown Bear Hunting Expedition',
        supplier: 'Kamchatka Outfitters',
        location: 'Central Kamchatka',
        duration: '7 days',
        groupSize: '2-4 people',
        price: 4500,
        rating: 4.9,
        reviews: 67,
        available: true,
        featured: true
      }
      // Add more services as needed
    ];
    
    return c.json({ services });
  } catch (error) {
    console.log('Get services error:', error);
    return c.json({ error: 'Failed to get services' }, 500);
  }
});

app.get('/make-server-8cf9cdf2/services/:id', async (c) => {
  try {
    const id = c.req.param('id');
    // Mock service data - in real app this would be from database
    const service = {
      id,
      title: 'Sample Service',
      description: 'Sample description',
      price: 1000,
      available: true
    };
    
    return c.json({ service });
  } catch (error) {
    console.log('Get service error:', error);
    return c.json({ error: 'Failed to get service' }, 500);
  }
});

// Health check
app.get('/make-server-8cf9cdf2/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
Deno.serve(app.fetch);