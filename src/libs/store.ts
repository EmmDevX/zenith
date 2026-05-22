export interface Room {
  id: string;
  name: string;
  type: "Single" | "Double" | "Suite" | "Deluxe" | "Presidential";
  price: number;
  status: "Available" | "Occupied" | "Maintenance" | "Reserved";
  floor: number;
  capacity: number;
  amenities: string[];
  description: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  status: "Confirmed" | "Pending" | "Checked In" | "Checked Out" | "Cancelled";
  totalAmount: number;
  adults: number;
  children: number;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  description: string;
  price: number;
  createdAt: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  department: "Front Desk" | "Housekeeping" | "Restaurant" | "Security" | "Management" | "Maintenance";
  email: string;
  phone: string;
  status: "Active" | "On Leave" | "Inactive";
  joinDate: string;
  avatar?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  guestName: string;
  amount: number;
  method: "Credit Card" | "Debit Card" | "Cash" | "Bank Transfer" | "Online";
  status: "Completed" | "Pending" | "Refunded" | "Failed";
  date: string;
  reference: string;
  createdAt: string;
}

export interface Review {
  id: string;
  guestName: string;
  roomName: string;
  rating: number;
  comment: string;
  date: string;
  status: "Published" | "Pending" | "Hidden";
  response?: string;
  createdAt: string;
}

function loadData<T>(key: string, defaults: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
  } catch {}
  localStorage.setItem(key, JSON.stringify(defaults));
  return defaults;
}

function saveData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

const defaultRooms: Room[] = [
  { id: "r1", name: "101", type: "Single", price: 89, status: "Available", floor: 1, capacity: 1, amenities: ["WiFi", "AC", "TV"], description: "Cozy single room with garden view", createdAt: "2024-01-10" },
  { id: "r2", name: "102", type: "Double", price: 149, status: "Occupied", floor: 1, capacity: 2, amenities: ["WiFi", "AC", "TV", "Mini Bar"], description: "Spacious double room with city view", createdAt: "2024-01-10" },
  { id: "r3", name: "201", type: "Suite", price: 299, status: "Available", floor: 2, capacity: 3, amenities: ["WiFi", "AC", "TV", "Mini Bar", "Jacuzzi"], description: "Luxury suite with panoramic view", createdAt: "2024-01-10" },
  { id: "r4", name: "301", type: "Deluxe", price: 199, status: "Reserved", floor: 3, capacity: 2, amenities: ["WiFi", "AC", "TV", "Balcony"], description: "Deluxe room with private balcony", createdAt: "2024-01-10" },
  { id: "r5", name: "401", type: "Presidential", price: 599, status: "Available", floor: 4, capacity: 4, amenities: ["WiFi", "AC", "TV", "Mini Bar", "Jacuzzi", "Butler", "Kitchen"], description: "Presidential suite with every luxury", createdAt: "2024-01-10" },
  { id: "r6", name: "203", type: "Double", price: 159, status: "Maintenance", floor: 2, capacity: 2, amenities: ["WiFi", "AC", "TV"], description: "Double room, currently undergoing renovation", createdAt: "2024-01-10" },
];

const defaultBookings: Booking[] = [
  { id: "b1", guestName: "Alice Johnson", guestEmail: "alice@email.com", roomId: "r2", roomName: "Room 102", checkIn: "2025-05-08", checkOut: "2025-05-12", status: "Checked In", totalAmount: 596, adults: 2, children: 0, createdAt: "2025-05-01" },
  { id: "b2", guestName: "Bob Martinez", guestEmail: "bob@email.com", roomId: "r4", roomName: "Room 301", checkIn: "2025-05-14", checkOut: "2025-05-17", status: "Confirmed", totalAmount: 597, adults: 2, children: 1, createdAt: "2025-05-03" },
  { id: "b3", guestName: "Clara Nguyen", guestEmail: "clara@email.com", roomId: "r3", roomName: "Room 201", checkIn: "2025-05-20", checkOut: "2025-05-25", status: "Pending", totalAmount: 1495, adults: 2, children: 0, createdAt: "2025-05-05" },
  { id: "b4", guestName: "David Lee", guestEmail: "david@email.com", roomId: "r1", roomName: "Room 101", checkIn: "2025-04-20", checkOut: "2025-04-23", status: "Checked Out", totalAmount: 267, adults: 1, children: 0, createdAt: "2025-04-18" },
  { id: "b5", guestName: "Emma Wilson", guestEmail: "emma@email.com", roomId: "r5", roomName: "Room 401", checkIn: "2025-05-30", checkOut: "2025-06-02", status: "Confirmed", totalAmount: 1797, adults: 2, children: 2, createdAt: "2025-05-06" },
];

const defaultEvents: Event[] = [
  { id: "e1", title: "Summer Gala Dinner", date: "2025-06-15", time: "19:00", location: "Grand Ballroom", capacity: 200, registered: 145, status: "Upcoming", description: "Annual summer celebration with live music", price: 75, createdAt: "2025-04-01" },
  { id: "e2", title: "Business Conference", date: "2025-05-22", time: "09:00", location: "Conference Hall A", capacity: 100, registered: 88, status: "Upcoming", description: "Annual business networking conference", price: 120, createdAt: "2025-04-05" },
  { id: "e3", title: "Wedding Reception", date: "2025-05-18", time: "16:00", location: "Garden Terrace", capacity: 150, registered: 150, status: "Upcoming", description: "Private wedding reception booking", price: 0, createdAt: "2025-03-20" },
  { id: "e4", title: "Wine Tasting Evening", date: "2025-04-30", time: "18:30", location: "Rooftop Bar", capacity: 50, registered: 50, status: "Completed", description: "Curated wine tasting with sommelier", price: 45, createdAt: "2025-03-15" },
];

const defaultStaff: Staff[] = [
  { id: "s1", name: "Sarah Thompson", role: "General Manager", department: "Management", email: "sarah@hotel.com", phone: "+1 555-0101", status: "Active", joinDate: "2019-03-15", createdAt: "2019-03-15" },
  { id: "s2", name: "James Okafor", role: "Front Desk Supervisor", department: "Front Desk", email: "james@hotel.com", phone: "+1 555-0102", status: "Active", joinDate: "2021-06-01", createdAt: "2021-06-01" },
  { id: "s3", name: "Maria Santos", role: "Head Housekeeper", department: "Housekeeping", email: "maria@hotel.com", phone: "+1 555-0103", status: "Active", joinDate: "2020-09-12", createdAt: "2020-09-12" },
  { id: "s4", name: "Kevin Park", role: "Security Officer", department: "Security", email: "kevin@hotel.com", phone: "+1 555-0104", status: "On Leave", joinDate: "2022-01-20", createdAt: "2022-01-20" },
  { id: "s5", name: "Linda Brown", role: "Chef", department: "Restaurant", email: "linda@hotel.com", phone: "+1 555-0105", status: "Active", joinDate: "2020-05-30", createdAt: "2020-05-30" },
  { id: "s6", name: "Carlos Rivera", role: "Maintenance Tech", department: "Maintenance", email: "carlos@hotel.com", phone: "+1 555-0106", status: "Active", joinDate: "2023-02-14", createdAt: "2023-02-14" },
];

const defaultPayments: Payment[] = [
  { id: "p1", bookingId: "b1", guestName: "Alice Johnson", amount: 596, method: "Credit Card", status: "Completed", date: "2025-05-08", reference: "TXN-2025-001", createdAt: "2025-05-08" },
  { id: "p2", bookingId: "b2", guestName: "Bob Martinez", amount: 597, method: "Online", status: "Completed", date: "2025-05-03", reference: "TXN-2025-002", createdAt: "2025-05-03" },
  { id: "p3", bookingId: "b3", guestName: "Clara Nguyen", amount: 1495, method: "Bank Transfer", status: "Pending", date: "2025-05-05", reference: "TXN-2025-003", createdAt: "2025-05-05" },
  { id: "p4", bookingId: "b4", guestName: "David Lee", amount: 267, method: "Cash", status: "Completed", date: "2025-04-20", reference: "TXN-2025-004", createdAt: "2025-04-20" },
  { id: "p5", bookingId: "b5", guestName: "Emma Wilson", amount: 1797, method: "Credit Card", status: "Pending", date: "2025-05-06", reference: "TXN-2025-005", createdAt: "2025-05-06" },
];

const defaultReviews: Review[] = [
  { id: "rv1", guestName: "Alice Johnson", roomName: "Room 102", rating: 5, comment: "Absolutely wonderful stay! The room was spotless and the staff were incredibly helpful.", date: "2025-05-13", status: "Published", response: "Thank you so much, Alice!", createdAt: "2025-05-13" },
  { id: "rv2", guestName: "David Lee", roomName: "Room 101", rating: 4, comment: "Great value for money. Clean and comfortable. Would stay again.", date: "2025-04-25", status: "Published", createdAt: "2025-04-25" },
  { id: "rv3", guestName: "Robert Kim", roomName: "Room 201", rating: 3, comment: "Room was nice but check-in took a while. Overall acceptable experience.", date: "2025-04-10", status: "Pending", createdAt: "2025-04-10" },
  { id: "rv4", guestName: "Sophie Turner", roomName: "Room 401", rating: 5, comment: "Presidential suite was beyond expectations. Best hotel experience of my life!", date: "2025-03-28", status: "Published", response: "We're thrilled to hear that, Sophie!", createdAt: "2025-03-28" },
];

export const store = {
  getRooms: () => loadData<Room>("hotel_rooms", defaultRooms),
  saveRooms: (d: Room[]) => saveData("hotel_rooms", d),
  getBookings: () => loadData<Booking>("hotel_bookings", defaultBookings),
  saveBookings: (d: Booking[]) => saveData("hotel_bookings", d),
  getEvents: () => loadData<Event>("hotel_events", defaultEvents),
  saveEvents: (d: Event[]) => saveData("hotel_events", d),
  getStaff: () => loadData<Staff>("hotel_staff", defaultStaff),
  saveStaff: (d: Staff[]) => saveData("hotel_staff", d),
  getPayments: () => loadData<Payment>("hotel_payments", defaultPayments),
  savePayments: (d: Payment[]) => saveData("hotel_payments", d),
  getReviews: () => loadData<Review>("hotel_reviews", defaultReviews),
  saveReviews: (d: Review[]) => saveData("hotel_reviews", d),
};
