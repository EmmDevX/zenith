'use client';

export const ROLES = {
  manager: 'Manager',
  receptionist: 'Receptionist',
  housekeeping: 'Housekeeping',
  accountant: 'Accountant',
  kitchen: 'Kitchen',
  security: 'Security',
};

export const ROLE_COLORS = {
  manager: 'bg-purple-100 text-purple-700',
  receptionist: 'bg-blue-100 text-blue-700',
  housekeeping: 'bg-green-100 text-green-700',
  accountant: 'bg-yellow-100 text-yellow-700',
  kitchen: 'bg-orange-100 text-orange-700',
  security: 'bg-red-100 text-red-700',
};

export const ROLE_BADGES = {
  manager: 'bg-purple-600',
  receptionist: 'bg-blue-600',
  housekeeping: 'bg-green-600',
  accountant: 'bg-yellow-500',
  kitchen: 'bg-orange-500',
  security: 'bg-red-600',
};

// Which sections each role can access
export const ROLE_PERMISSIONS = {
  manager:      ['overview', 'checkins', 'bookings', 'rooms', 'tasks', 'payments', 'events', 'guests', 'reports', 'settings'],
  receptionist: ['overview', 'checkins', 'bookings', 'rooms', 'events', 'guests', 'settings'],
  housekeeping: ['overview', 'rooms', 'tasks', 'settings'],
  accountant:   ['overview', 'payments', 'reports', 'settings'],
  kitchen:      ['overview', 'events', 'tasks', 'settings'],
  security:     ['overview', 'guests', 'events', 'settings'],
};

export function hasPermission(role, section) {
  return (ROLE_PERMISSIONS[role] ?? []).includes(section);
}

export function getAllowedSections(role) {
  return ROLE_PERMISSIONS[role] ?? [];
}

// Full nav definition — filtered per role in Sidebar & MobileBottomNav
export const ALL_NAV = [
  { key: 'overview',  href: '/staff',          label: 'Overview',      icon: 'LayoutDashboard' },
  { key: 'checkins',  href: '/staff/checkins',  label: 'Check-In/Out',  icon: 'LogIn' },
  { key: 'bookings',  href: '/staff/bookings',  label: 'Bookings',      icon: 'CalendarCheck' },
  { key: 'rooms',     href: '/staff/rooms',     label: 'Rooms',         icon: 'BedDouble' },
  { key: 'tasks',     href: '/staff/tasks',     label: 'My Tasks',      icon: 'ClipboardList' },
  { key: 'payments',  href: '/staff/payments',  label: 'Payments',      icon: 'CreditCard' },
  { key: 'events',    href: '/staff/events',    label: 'Events',        icon: 'CalendarDays' },
  { key: 'guests',    href: '/staff/guests',    label: 'Guests',        icon: 'Users' },
  { key: 'reports',   href: '/staff/reports',   label: 'Reports',       icon: 'BarChart2' },
  { key: 'settings',  href: '/staff/settings',  label: 'Settings',      icon: 'Settings' },
];
