'use client';

const KEYS = {
  rooms: 'hotel_rooms',
  bookings: 'hotel_bookings',
  events: 'hotel_events',
  staff: 'hotel_staff',
  payments: 'hotel_payments',
  reviews: 'hotel_reviews',
  users: 'hotel_users',
  profile: 'hotel_profile',
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function load(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

const SEED_ROOMS = [
  { id: uid(), number: '101', type: 'Single', status: 'available', price: 99, floor: 1, amenities: ['WiFi', 'AC'], capacity: 1, image: '' },
  { id: uid(), number: '102', type: 'Double', status: 'occupied', price: 149, floor: 1, amenities: ['WiFi', 'AC', 'TV'], capacity: 2, image: '' },
  { id: uid(), number: '201', type: 'Suite', status: 'available', price: 299, floor: 2, amenities: ['WiFi', 'AC', 'TV', 'Minibar', 'Jacuzzi'], capacity: 2, image: '' },
  { id: uid(), number: '202', type: 'Double', status: 'reserved', price: 149, floor: 2, amenities: ['WiFi', 'AC', 'TV'], capacity: 2, image: '' },
  { id: uid(), number: '301', type: 'Single', status: 'available', price: 99, floor: 3, amenities: ['WiFi', 'AC'], capacity: 1, image: '' },
  { id: uid(), number: '302', type: 'Suite', status: 'maintenance', price: 299, floor: 3, amenities: ['WiFi', 'AC', 'TV', 'Minibar'], capacity: 4, image: '' },
];

const SEED_BOOKINGS = [
  { id: uid(), guestName: 'Alice Johnson', room: '102', checkIn: '2025-05-01', checkOut: '2025-05-05', status: 'confirmed', total: 596, email: 'alice@example.com', phone: '+1-555-0101' },
  { id: uid(), guestName: 'Bob Martinez', room: '301', checkIn: '2025-05-03', checkOut: '2025-05-07', status: 'confirmed', total: 396, email: 'bob@example.com', phone: '+1-555-0102' },
  { id: uid(), guestName: 'Carol Smith', room: '201', checkIn: '2025-05-10', checkOut: '2025-05-14', status: 'pending', total: 1196, email: 'carol@example.com', phone: '+1-555-0103' },
];

const SEED_EVENTS = [
  { id: uid(), name: 'Wedding Reception', date: '2025-06-15', time: '18:00', location: 'Grand Ballroom', capacity: 200, booked: 150, status: 'upcoming', price: 5000, description: 'Elegant wedding reception setup' },
  { id: uid(), name: 'Corporate Seminar', date: '2025-05-20', time: '09:00', location: 'Conference Room A', capacity: 50, booked: 40, status: 'upcoming', price: 1200, description: 'Annual corporate strategy seminar' },
  { id: uid(), name: 'Birthday Party', date: '2025-05-25', time: '19:00', location: 'Sky Lounge', capacity: 80, booked: 80, status: 'full', price: 2000, description: 'Private birthday celebration' },
];

const SEED_STAFF = [
  { id: uid(), name: 'John Williams', role: 'Front Desk Manager', department: 'Reception', email: 'john@hotel.com', phone: '+1-555-1001', status: 'active', avatar: '', joinDate: '2022-01-15', salary: 4500 },
  { id: uid(), name: 'Maria Garcia', role: 'Housekeeping Lead', department: 'Housekeeping', email: 'maria@hotel.com', phone: '+1-555-1002', status: 'active', avatar: '', joinDate: '2021-06-10', salary: 3800 },
  { id: uid(), name: 'David Chen', role: 'Chef', department: 'Kitchen', email: 'david@hotel.com', phone: '+1-555-1003', status: 'on_leave', avatar: '', joinDate: '2020-03-22', salary: 5200 },
  { id: uid(), name: 'Sara Lee', role: 'Concierge', department: 'Reception', email: 'sara@hotel.com', phone: '+1-555-1004', status: 'active', avatar: '', joinDate: '2023-02-01', salary: 3500 },
  { id: uid(), name: 'Tom Brown', role: 'Security', department: 'Security', email: 'tom@hotel.com', phone: '+1-555-1005', status: 'active', avatar: '', joinDate: '2019-11-05', salary: 3200 },
];

const SEED_PAYMENTS = [
  { id: uid(), guest: 'Alice Johnson', amount: 596, method: 'Credit Card', status: 'completed', date: '2025-05-08', reference: 'TXN-001', room: '102', type: 'room' },
  { id: uid(), guest: 'Bob Martinez', amount: 396, method: 'Cash', status: 'completed', date: '2025-05-03', reference: 'TXN-002', room: '301', type: 'room' },
  { id: uid(), guest: 'Carol Smith', amount: 1196, method: 'Bank Transfer', status: 'pending', date: '2025-05-10', reference: 'TXN-003', room: '201', type: 'room' },
];

const SEED_REVIEWS = [
  { id: uid(), guest: 'Alice Johnson', room: '102', rating: 5, comment: 'Absolutely fantastic stay! The room was spotless and staff were incredibly helpful.', date: '2025-05-06', status: 'published', reply: '' },
  { id: uid(), guest: 'Bob Martinez', room: '301', rating: 4, comment: 'Great value for money. Would definitely come back.', date: '2025-05-08', status: 'published', reply: '' },
  { id: uid(), guest: 'Sam Wilson', room: '201', rating: 3, comment: 'Room was okay but service could be improved.', date: '2025-04-20', status: 'pending', reply: '' },
  { id: uid(), guest: 'Emily Davis', room: '102', rating: 5, comment: 'Perfect in every way. Best hotel experience ever!', date: '2025-04-15', status: 'published', reply: 'Thank you so much, Emily!' },
];

const SEED_USERS = [
  { id: uid(), name: 'Alice Johnson', email: 'alice@example.com', role: 'guest', status: 'active', joined: '2024-01-10', bookings: 3, avatar: '' },
  { id: uid(), name: 'Bob Martinez', email: 'bob@example.com', role: 'guest', status: 'active', joined: '2024-03-22', bookings: 1, avatar: '' },
  { id: uid(), name: 'Carol Smith', email: 'carol@example.com', role: 'vip', status: 'active', joined: '2023-11-05', bookings: 7, avatar: '' },
];

const DEFAULT_PROFILE = {
  name: 'Admin User',
  role: 'General Manager',
  email: 'admin@azurehotel.com',
  phone: '+1-555-0000',
  avatar: '',
  hotelName: 'Azure Hotel',
};

function seedIfEmpty(key, seed) {
  const existing = load(key, null);
  if (!existing) save(key, seed);
}

export function initStore() {
  seedIfEmpty(KEYS.rooms, SEED_ROOMS);
  seedIfEmpty(KEYS.bookings, SEED_BOOKINGS);
  seedIfEmpty(KEYS.events, SEED_EVENTS);
  seedIfEmpty(KEYS.staff, SEED_STAFF);
  seedIfEmpty(KEYS.payments, SEED_PAYMENTS);
  seedIfEmpty(KEYS.reviews, SEED_REVIEWS);
  seedIfEmpty(KEYS.users, SEED_USERS);
  seedIfEmpty(KEYS.profile, DEFAULT_PROFILE);
}

export const store = {
  rooms: {
    getAll: () => load(KEYS.rooms, []),
    add: (item) => { const list = load(KEYS.rooms, []); const n = { ...item, id: uid() }; save(KEYS.rooms, [...list, n]); return n; },
    update: (id, data) => { const list = load(KEYS.rooms, []).map(r => r.id === id ? { ...r, ...data } : r); save(KEYS.rooms, list); },
    remove: (id) => { save(KEYS.rooms, load(KEYS.rooms, []).filter(r => r.id !== id)); },
  },
  bookings: {
    getAll: () => load(KEYS.bookings, []),
    add: (item) => { const list = load(KEYS.bookings, []); const n = { ...item, id: uid() }; save(KEYS.bookings, [...list, n]); return n; },
    update: (id, data) => { const list = load(KEYS.bookings, []).map(r => r.id === id ? { ...r, ...data } : r); save(KEYS.bookings, list); },
    remove: (id) => { save(KEYS.bookings, load(KEYS.bookings, []).filter(r => r.id !== id)); },
  },
  events: {
    getAll: () => load(KEYS.events, []),
    add: (item) => { const list = load(KEYS.events, []); const n = { ...item, id: uid() }; save(KEYS.events, [...list, n]); return n; },
    update: (id, data) => { const list = load(KEYS.events, []).map(r => r.id === id ? { ...r, ...data } : r); save(KEYS.events, list); },
    remove: (id) => { save(KEYS.events, load(KEYS.events, []).filter(r => r.id !== id)); },
  },
  staff: {
    getAll: () => load(KEYS.staff, []),
    add: (item) => { const list = load(KEYS.staff, []); const n = { ...item, id: uid() }; save(KEYS.staff, [...list, n]); return n; },
    update: (id, data) => { const list = load(KEYS.staff, []).map(r => r.id === id ? { ...r, ...data } : r); save(KEYS.staff, list); },
    remove: (id) => { save(KEYS.staff, load(KEYS.staff, []).filter(r => r.id !== id)); },
  },
  payments: {
    getAll: () => load(KEYS.payments, []),
    add: (item) => { const list = load(KEYS.payments, []); const n = { ...item, id: uid() }; save(KEYS.payments, [...list, n]); return n; },
    update: (id, data) => { const list = load(KEYS.payments, []).map(r => r.id === id ? { ...r, ...data } : r); save(KEYS.payments, list); },
    remove: (id) => { save(KEYS.payments, load(KEYS.payments, []).filter(r => r.id !== id)); },
  },
  reviews: {
    getAll: () => load(KEYS.reviews, []),
    update: (id, data) => { const list = load(KEYS.reviews, []).map(r => r.id === id ? { ...r, ...data } : r); save(KEYS.reviews, list); },
    remove: (id) => { save(KEYS.reviews, load(KEYS.reviews, []).filter(r => r.id !== id)); },
  },
  users: {
    getAll: () => load(KEYS.users, []),
    add: (item) => { const list = load(KEYS.users, []); const n = { ...item, id: uid() }; save(KEYS.users, [...list, n]); return n; },
    update: (id, data) => { const list = load(KEYS.users, []).map(r => r.id === id ? { ...r, ...data } : r); save(KEYS.users, list); },
    remove: (id) => { save(KEYS.users, load(KEYS.users, []).filter(r => r.id !== id)); },
  },
  profile: {
    get: () => load(KEYS.profile, DEFAULT_PROFILE),
    update: (data) => { save(KEYS.profile, { ...load(KEYS.profile, DEFAULT_PROFILE), ...data }); },
  },
};
