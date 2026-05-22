'use client';

import { useEffect, useState } from 'react';
import { BedDouble, CalendarCheck, ClipboardList, CreditCard, Users, Clock } from 'lucide-react';
import { useRole } from "@/components/staff/RoleProvider";
import { store } from "@/components/staff/store";

function StatBox({ label, value, sub, icon: Icon, color = 'blue' }) {
  const colors = { blue: 'bg-blue-50 text-blue-600', green: 'bg-green-50 text-green-600', yellow: 'bg-yellow-50 text-yellow-600', red: 'bg-red-50 text-red-600', purple: 'bg-purple-50 text-purple-600' };
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
      <div className={`p-3 rounded-xl flex-shrink-0 ${colors[color]}`}><Icon size={20} /></div>
      <div><p className="text-2xl font-bold text-gray-900">{value}</p><p className="text-xs font-medium text-gray-500">{label}</p>{sub && <p className="text-xs text-gray-400">{sub}</p>}</div>
    </div>
  );
}

const ROLE_WELCOME = {
  manager:      'Full operational overview for today.',
  receptionist: "Here's your front-desk summary for today.",
  housekeeping: "Here are your cleaning assignments for today.",
  accountant:   "Here's your financial summary for today.",
  kitchen:      "Here are today's catering & task assignments.",
  security:     "Here's your shift overview for today.",
};

export default function StaffOverviewPage() {
  const { user, role } = useRole();
  const [data, setData] = useState({ rooms: [], bookings: [], tasks: [], payments: [], events: [], guests: [] });

  useEffect(() => {
    setData({
      rooms:    store.rooms.getAll(),
      bookings: store.bookings.getAll(),
      tasks:    store.tasks.getAll(),
      payments: store.payments.getAll(),
      events:   store.events.getAll(),
      guests:   store.guests.getAll(),
    });
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const arrivingToday  = data.bookings.filter(b => b.checkIn === today && b.status === 'confirmed');
  const departingToday = data.bookings.filter(b => b.checkOut === today && b.status === 'checked_in');
  const pendingTasks   = data.tasks.filter(t => t.status !== 'done');
  const dirtyRooms     = data.rooms.filter(r => r.cleanStatus === 'dirty');
  const pendingPayments = data.payments.filter(p => p.status === 'pending');
  const todayEvents    = data.events.filter(e => e.date === today);
  const inHouseGuests  = data.guests.filter(g => g.status === 'in_house');
  const revenue        = data.payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);

  const ROLE_STATS = {
    manager:      [
      { label: 'Arriving Today',   value: arrivingToday.length,   icon: CalendarCheck, color: 'blue'   },
      { label: 'Departing Today',  value: departingToday.length,  icon: CalendarCheck, color: 'yellow' },
      { label: 'Pending Tasks',    value: pendingTasks.length,    icon: ClipboardList, color: 'red'    },
      { label: 'Revenue',          value: `$${revenue.toLocaleString()}`, icon: CreditCard, color: 'green' },
    ],
    receptionist: [
      { label: 'Arriving Today',   value: arrivingToday.length,   icon: CalendarCheck, color: 'blue'   },
      { label: 'Departing Today',  value: departingToday.length,  icon: CalendarCheck, color: 'yellow' },
      { label: 'In-House Guests',  value: inHouseGuests.length,   icon: Users,         color: 'green'  },
      { label: "Today's Events",   value: todayEvents.length,     icon: Clock,         color: 'purple' },
    ],
    housekeeping: [
      { label: 'Dirty Rooms',      value: dirtyRooms.length,      icon: BedDouble,     color: 'red'    },
      { label: 'My Tasks',         value: pendingTasks.filter(t => t.type === 'cleaning' || t.type === 'restocking').length, icon: ClipboardList, color: 'blue' },
      { label: 'Available Rooms',  value: data.rooms.filter(r => r.status === 'available').length, icon: BedDouble, color: 'green' },
      { label: 'Total Rooms',      value: data.rooms.length,      icon: BedDouble,     color: 'yellow' },
    ],
    accountant:   [
      { label: 'Revenue',          value: `$${revenue.toLocaleString()}`, icon: CreditCard, color: 'green' },
      { label: 'Pending Payments', value: pendingPayments.length, icon: CreditCard,    color: 'yellow' },
      { label: 'Completed',        value: data.payments.filter(p => p.status === 'completed').length, icon: CreditCard, color: 'blue' },
      { label: 'Total Transactions',value: data.payments.length, icon: CreditCard,    color: 'purple' },
    ],
    kitchen:      [
      { label: "Today's Events",   value: todayEvents.length,     icon: Clock,         color: 'blue'   },
      { label: 'Catering Events',  value: todayEvents.filter(e => e.catering).length, icon: Clock, color: 'orange' },
      { label: 'My Tasks',         value: pendingTasks.filter(t => t.type === 'catering' || t.type === 'event').length, icon: ClipboardList, color: 'red' },
      { label: 'Total Guests',     value: todayEvents.reduce((s, e) => s + (e.booked || 0), 0), icon: Users, color: 'green' },
    ],
    security:     [
      { label: 'In-House Guests',  value: inHouseGuests.length,   icon: Users,         color: 'blue'   },
      { label: 'Arriving Today',   value: arrivingToday.length,   icon: Users,         color: 'green'  },
      { label: "Today's Events",   value: todayEvents.length,     icon: Clock,         color: 'purple' },
      { label: 'Total Guests',     value: data.guests.length,     icon: Users,         color: 'yellow' },
    ],
  };

  const stats = ROLE_STATS[role] ?? ROLE_STATS.receptionist;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Welcome, {user?.name?.split(' ')[0] ?? 'Staff'} 👋</h1>
        <p className="text-sm text-gray-500 mt-0.5">{ROLE_WELCOME[role] ?? ''}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => <StatBox key={i} {...s} />)}
      </div>

      {(role === 'receptionist' || role === 'manager') && arrivingToday.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Arriving Today</h2>
            <a href="/staff/checkins" className="text-xs text-blue-600 font-semibold">Manage →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {arrivingToday.map(b => (
              <div key={b.id} className="flex items-center gap-4 px-5 py-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">{b.guestName?.charAt(0)}</div>
                <div className="flex-1 min-w-0"><p className="font-medium text-sm text-gray-900">{b.guestName}</p><p className="text-xs text-gray-400">Room {b.room} · {b.adults} adult{b.adults !== 1 ? 's' : ''}</p></div>
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex-shrink-0">Arriving</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(role === 'housekeeping' || role === 'manager') && dirtyRooms.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Rooms Needing Attention</h2>
            <a href="/staff/rooms" className="text-xs text-blue-600 font-semibold">View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {dirtyRooms.map(r => (
              <div key={r.id} className="flex items-center gap-4 px-5 py-3">
                <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 font-bold text-sm flex items-center justify-center flex-shrink-0"><BedDouble size={16} /></div>
                <div className="flex-1 min-w-0"><p className="font-medium text-sm text-gray-900">Room {r.number}</p><p className="text-xs text-gray-400">{r.type} · Floor {r.floor}</p></div>
                <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full flex-shrink-0">Dirty</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(role === 'kitchen' || role === 'manager') && todayEvents.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Today's Events</h2>
            <a href="/staff/events" className="text-xs text-blue-600 font-semibold">View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {todayEvents.map(e => (
              <div key={e.id} className="flex items-center gap-4 px-5 py-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 font-bold text-sm flex items-center justify-center flex-shrink-0"><Clock size={16} /></div>
                <div className="flex-1 min-w-0"><p className="font-medium text-sm text-gray-900">{e.name}</p><p className="text-xs text-gray-400">{e.time} · {e.location} · {e.booked} guests</p></div>
                {e.catering && <span className="text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-1 rounded-full flex-shrink-0">Catering</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
