'use client';

const KEYS = {
  staffUser: 'staff_current_user',
  rooms: 'staff_rooms',
  bookings: 'staff_bookings',
  tasks: 'staff_tasks',
  events: 'staff_events',
  guests: 'staff_guests',
  payments: 'staff_payments',
};

function uid() { return Math.random().toString(36).slice(2, 10); }

function load(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; } catch { return fallback; }
}
function save(key, val) { if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(val)); }
function seedIfEmpty(key, data) { if (!load(key, null)) save(key, data); }

const SEED_STAFF_USER = {
  id: uid(), name: 'John Williams', role: 'receptionist', department: 'Reception',
  email: 'john@hotel.com', phone: '+1-555-1001', avatar: '', shift: 'Morning (07:00–15:00)',
  hotelName: 'Azure Hotel',
};

const SEED_ROOMS = [
  { id: uid(), number: '101', type: 'Single', status: 'available',   floor: 1, cleanStatus: 'clean',   guest: '',             checkOut: '' },
  { id: uid(), number: '102', type: 'Double', status: 'occupied',    floor: 1, cleanStatus: 'clean',   guest: 'Alice Johnson', checkOut: '2025-05-12' },
  { id: uid(), number: '201', type: 'Suite',  status: 'available',   floor: 2, cleanStatus: 'dirty',   guest: '',             checkOut: '' },
  { id: uid(), number: '202', type: 'Double', status: 'reserved',    floor: 2, cleanStatus: 'clean',   guest: 'Bob Martinez', checkOut: '2025-05-14' },
  { id: uid(), number: '301', type: 'Single', status: 'available',   floor: 3, cleanStatus: 'inspect', guest: '',             checkOut: '' },
  { id: uid(), number: '302', type: 'Suite',  status: 'maintenance', floor: 3, cleanStatus: 'dirty',   guest: '',             checkOut: '' },
];

const SEED_BOOKINGS = [
  { id: uid(), guestName: 'Alice Johnson', room: '102', checkIn: '2025-05-08', checkOut: '2025-05-12', status: 'checked_in',  total: 596,  email: 'alice@example.com', phone: '+1-555-0101', adults: 1, children: 0 },
  { id: uid(), guestName: 'Bob Martinez',  room: '202', checkIn: '2025-05-10', checkOut: '2025-05-14', status: 'confirmed',   total: 596,  email: 'bob@example.com',   phone: '+1-555-0102', adults: 2, children: 0 },
  { id: uid(), guestName: 'Carol Smith',   room: '201', checkIn: '2025-05-13', checkOut: '2025-05-17', status: 'confirmed',   total: 1196, email: 'carol@example.com', phone: '+1-555-0103', adults: 2, children: 1 },
  { id: uid(), guestName: 'David Lee',     room: '101', checkIn: '2025-05-11', checkOut: '2025-05-13', status: 'checked_out', total: 198,  email: 'david@example.com', phone: '+1-555-0104', adults: 1, children: 0 },
];

const today = new Date().toISOString().split('T')[0];
const SEED_TASKS = [
  { id: uid(), title: 'Clean Room 201',       room: '201', type: 'cleaning',     priority: 'high',   status: 'pending',     assignee: 'Housekeeping', dueDate: today,   notes: 'Guest checked out, deep clean needed' },
  { id: uid(), title: 'Clean Room 301',       room: '301', type: 'cleaning',     priority: 'medium', status: 'in_progress', assignee: 'Housekeeping', dueDate: today,   notes: 'Regular turnover' },
  { id: uid(), title: 'Fix AC in Room 302',   room: '302', type: 'maintenance',  priority: 'high',   status: 'pending',     assignee: 'Maintenance',  dueDate: today,   notes: 'AC unit not cooling properly' },
  { id: uid(), title: 'Restock Minibar 102',  room: '102', type: 'restocking',   priority: 'low',    status: 'pending',     assignee: 'Housekeeping', dueDate: today,   notes: '' },
  { id: uid(), title: 'Prepare Wedding Setup',room: 'Ballroom', type: 'event',   priority: 'high',   status: 'pending',     assignee: 'Kitchen',      dueDate: today,   notes: 'Catering for 150 guests' },
  { id: uid(), title: 'Dinner Prep – Event',  room: 'Kitchen', type: 'catering', priority: 'high',   status: 'in_progress', assignee: 'Kitchen',      dueDate: today,   notes: 'Corporate dinner for 40 guests' },
];

const SEED_EVENTS = [
  { id: uid(), name: 'Wedding Reception',  date: today, time: '18:00', location: 'Grand Ballroom', capacity: 200, booked: 150, status: 'upcoming', catering: true,  description: 'Full catering package included' },
  { id: uid(), name: 'Corporate Seminar',  date: today, time: '09:00', location: 'Conference A',   capacity: 50,  booked: 40,  status: 'upcoming', catering: false, description: 'Tea & coffee service only' },
  { id: uid(), name: 'Birthday Party',     date: today, time: '19:00', location: 'Sky Lounge',     capacity: 80,  booked: 80,  status: 'full',     catering: true,  description: 'Private celebration, 3-course meal' },
];

const SEED_GUESTS = [
  { id: uid(), name: 'Alice Johnson', room: '102', checkIn: '2025-05-08', checkOut: '2025-05-12', status: 'in_house',  email: 'alice@example.com', phone: '+1-555-0101', nationality: 'US', idType: 'Passport', idNumber: 'US123456', vip: false },
  { id: uid(), name: 'Bob Martinez',  room: '202', checkIn: '2025-05-10', checkOut: '2025-05-14', status: 'arriving',  email: 'bob@example.com',   phone: '+1-555-0102', nationality: 'MX', idType: 'Passport', idNumber: 'MX789012', vip: false },
  { id: uid(), name: 'Carol Smith',   room: '201', checkIn: '2025-05-13', checkOut: '2025-05-17', status: 'arriving',  email: 'carol@example.com', phone: '+1-555-0103', nationality: 'GB', idType: 'Passport', idNumber: 'GB345678', vip: true  },
  { id: uid(), name: 'David Lee',     room: '101', checkIn: '2025-05-11', checkOut: '2025-05-13', status: 'departed',  email: 'david@example.com', phone: '+1-555-0104', nationality: 'CA', idType: 'ID Card',  idNumber: 'CA901234', vip: false },
];

const SEED_PAYMENTS = [
  { id: uid(), guest: 'Alice Johnson', room: '102', amount: 596,  method: 'Credit Card',  status: 'completed', date: '2025-05-08', reference: 'TXN-001', type: 'room' },
  { id: uid(), guest: 'David Lee',     room: '101', amount: 198,  method: 'Cash',          status: 'completed', date: '2025-05-11', reference: 'TXN-002', type: 'room' },
  { id: uid(), guest: 'Bob Martinez',  room: '202', amount: 596,  method: 'Bank Transfer', status: 'pending',   date: '2025-05-10', reference: 'TXN-003', type: 'room' },
  { id: uid(), guest: 'Carol Smith',   room: '201', amount: 1196, method: 'Credit Card',   status: 'pending',   date: '2025-05-13', reference: 'TXN-004', type: 'room' },
];

export function initStore() {
  seedIfEmpty(KEYS.staffUser, SEED_STAFF_USER);
  seedIfEmpty(KEYS.rooms,     SEED_ROOMS);
  seedIfEmpty(KEYS.bookings,  SEED_BOOKINGS);
  seedIfEmpty(KEYS.tasks,     SEED_TASKS);
  seedIfEmpty(KEYS.events,    SEED_EVENTS);
  seedIfEmpty(KEYS.guests,    SEED_GUESTS);
  seedIfEmpty(KEYS.payments,  SEED_PAYMENTS);
}

export const store = {
  staffUser: {
    get: ()         => load(KEYS.staffUser, SEED_STAFF_USER),
    update: (data)  => save(KEYS.staffUser, { ...load(KEYS.staffUser, SEED_STAFF_USER), ...data }),
  },
  rooms: {
    getAll: ()           => load(KEYS.rooms, []),
    update: (id, data)   => save(KEYS.rooms, load(KEYS.rooms, []).map(r => r.id === id ? { ...r, ...data } : r)),
  },
  bookings: {
    getAll: ()           => load(KEYS.bookings, []),
    add: (item)          => { const list = load(KEYS.bookings, []); const n = { ...item, id: uid() }; save(KEYS.bookings, [...list, n]); return n; },
    update: (id, data)   => save(KEYS.bookings, load(KEYS.bookings, []).map(r => r.id === id ? { ...r, ...data } : r)),
  },
  tasks: {
    getAll: ()           => load(KEYS.tasks, []),
    add: (item)          => { const list = load(KEYS.tasks, []); const n = { ...item, id: uid() }; save(KEYS.tasks, [...list, n]); return n; },
    update: (id, data)   => save(KEYS.tasks, load(KEYS.tasks, []).map(r => r.id === id ? { ...r, ...data } : r)),
    remove: (id)         => save(KEYS.tasks, load(KEYS.tasks, []).filter(r => r.id !== id)),
  },
  events: {
    getAll: ()           => load(KEYS.events, []),
    update: (id, data)   => save(KEYS.events, load(KEYS.events, []).map(r => r.id === id ? { ...r, ...data } : r)),
  },
  guests: {
    getAll: ()           => load(KEYS.guests, []),
    add: (item)          => { const list = load(KEYS.guests, []); const n = { ...item, id: uid() }; save(KEYS.guests, [...list, n]); return n; },
    update: (id, data)   => save(KEYS.guests, load(KEYS.guests, []).map(r => r.id === id ? { ...r, ...data } : r)),
  },
  payments: {
    getAll: ()           => load(KEYS.payments, []),
    add: (item)          => { const list = load(KEYS.payments, []); const n = { ...item, id: uid() }; save(KEYS.payments, [...list, n]); return n; },
    update: (id, data)   => save(KEYS.payments, load(KEYS.payments, []).map(r => r.id === id ? { ...r, ...data } : r)),
  },
};
