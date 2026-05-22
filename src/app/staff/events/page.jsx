'use client';

import { useEffect, useState } from 'react';
import { MapPin, Clock, Users } from 'lucide-react';
import RoleGate from "@/components/staff/RoleGate";
import { store } from '@/components/staff/store';
import { useRole } from '@/components/staff/RoleProvider';

const STATUS_STYLES = {
  upcoming: 'bg-blue-100 text-blue-700',
  full:     'bg-red-100 text-red-700',
  completed:'bg-green-100 text-green-700',
  cancelled:'bg-gray-100 text-gray-500',
};

export default function EventsPage() {
  const { role } = useRole();
  const [events, setEvents] = useState([]);
  const load = () => setEvents(store.events.getAll());
  useEffect(() => { load(); }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayEvents = events.filter(e => e.date === today);
  const upcoming    = events.filter(e => e.date > today);

  return (
    <RoleGate section="events">
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Events</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {role === 'kitchen' ? 'Your catering assignments' : role === 'security' ? 'Events requiring security presence' : 'All scheduled events'}
          </p>
        </div>

        {todayEvents.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Today</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayEvents.map(ev => <EventCard key={ev.id} ev={ev} role={role} highlight />)}
            </div>
          </div>
        )}

        {upcoming.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Upcoming</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map(ev => <EventCard key={ev.id} ev={ev} role={role} />)}
            </div>
          </div>
        )}

        {events.length === 0 && <p className="text-center text-gray-400 text-sm py-10">No events scheduled</p>}
      </div>
    </RoleGate>
  );
}

function EventCard({ ev, role, highlight }) {
  const pct = ev.capacity ? Math.round((ev.booked / ev.capacity) * 100) : 0;
  return (
    <div className={`bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow ${highlight ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-100'}`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 leading-tight text-sm">{ev.name}</h3>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${STATUS_STYLES[ev.status] ?? 'bg-gray-100 text-gray-600'}`}>{ev.status}</span>
      </div>
      <div className="space-y-1.5 mb-3 text-xs text-gray-500">
        <div className="flex items-center gap-1.5"><Clock size={12} />{ev.date} at {ev.time}</div>
        <div className="flex items-center gap-1.5"><MapPin size={12} />{ev.location}</div>
        <div className="flex items-center gap-1.5"><Users size={12} />{ev.booked} / {ev.capacity} guests</div>
      </div>
      <div className="mb-3">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${pct >= 100 ? 'bg-red-500' : pct > 75 ? 'bg-yellow-400' : 'bg-blue-500'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
      </div>
      {ev.catering && (
        <span className="inline-block text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
          {role === 'kitchen' ? '🍽 Catering Required' : 'Catering Included'}
        </span>
      )}
      {ev.description && <p className="text-xs text-gray-400 mt-2 line-clamp-2">{ev.description}</p>}
    </div>
  );
}
