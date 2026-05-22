'use client';

import { useEffect, useState } from 'react';
import RoleGate from '@/components/staff/RoleGate';
import RoomStatusCard from '@/components/staff/RoomStatusCard';
import { store } from '@/components/staff/store';

const FILTERS = ['all', 'available', 'occupied', 'reserved', 'maintenance'];
const CLEAN_FILTERS = ['all', 'clean', 'dirty', 'inspect'];

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [cleanFilter, setCleanFilter] = useState('all');

  const load = () => setRooms(store.rooms.getAll());
  useEffect(() => { load(); }, []);

  const filtered = rooms.filter(r => {
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchClean  = cleanFilter  === 'all' || r.cleanStatus === cleanFilter;
    return matchStatus && matchClean;
  });

  const handleClean  = (id, val) => { store.rooms.update(id, { cleanStatus: val }); load(); };
  const handleStatus = (id, val) => { store.rooms.update(id, { status: val }); load(); };

  const summary = [
    { label: 'Available',   count: rooms.filter(r => r.status === 'available').length,   color: 'text-green-600' },
    { label: 'Occupied',    count: rooms.filter(r => r.status === 'occupied').length,    color: 'text-blue-600'  },
    { label: 'Dirty',       count: rooms.filter(r => r.cleanStatus === 'dirty').length,  color: 'text-red-500'   },
    { label: 'Maintenance', count: rooms.filter(r => r.status === 'maintenance').length, color: 'text-yellow-600'},
  ];

  return (
    <RoleGate section="rooms">
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Room Status</h1>
          <p className="text-sm text-gray-500 mt-0.5">View and update room availability and cleanliness</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {summary.map(({ label, count, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
              <p className={`text-2xl font-bold ${color}`}>{count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex gap-1.5 flex-wrap">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${statusFilter === f ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
              >{f}</button>
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap ml-auto">
            {CLEAN_FILTERS.map(f => (
              <button key={f} onClick={() => setCleanFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${cleanFilter === f ? 'bg-slate-700 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
              >{f}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => (
            <RoomStatusCard key={r.id} room={r} onCleanStatusChange={handleClean} onRoomStatusChange={handleStatus} />
          ))}
          {filtered.length === 0 && <p className="col-span-3 text-center text-gray-400 text-sm py-10">No rooms match the selected filters</p>}
        </div>
      </div>
    </RoleGate>
  );
}
