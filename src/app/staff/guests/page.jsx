'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import RoleGate from '@/components/staff/RoleGate';
import GuestCard from '@/components/staff/GuestCard';
import { store } from '@/components/staff/store';

const FILTERS = ['all', 'in_house', 'arriving', 'departed'];

export default function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { setGuests(store.guests.getAll()); }, []);

  const filtered = guests.filter(g => {
    const matchFilter = filter === 'all' || g.status === filter;
    const matchSearch = !search || g.name?.toLowerCase().includes(search.toLowerCase()) || g.room?.includes(search);
    return matchFilter && matchSearch;
  });

  const counts = FILTERS.slice(1).reduce((acc, s) => {
    acc[s] = guests.filter(g => g.status === s).length;
    return acc;
  }, {});

  return (
    <RoleGate section="guests">
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Guests</h1>
          <p className="text-sm text-gray-500 mt-0.5">{guests.length} total guests</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{counts.in_house ?? 0}</p>
            <p className="text-xs text-gray-500 mt-0.5">In-House</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{counts.arriving ?? 0}</p>
            <p className="text-xs text-gray-500 mt-0.5">Arriving</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
            <p className="text-2xl font-bold text-gray-500">{counts.departed ?? 0}</p>
            <p className="text-xs text-gray-500 mt-0.5">Departed</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm flex-1">
            <Search size={14} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or room..." className="text-sm outline-none bg-transparent w-full text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex gap-1.5">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}>
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(g => <GuestCard key={g.id} guest={g} onView={setSelected} />)}
          {filtered.length === 0 && <p className="col-span-3 text-center text-gray-400 text-sm py-10">No guests found</p>}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-lg flex items-center justify-center flex-shrink-0">{selected.name?.charAt(0)}</div>
                <div><p className="font-bold text-gray-900">{selected.name}</p><p className="text-sm text-gray-500">Room {selected.room}</p></div>
              </div>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Nationality', selected.nationality],
                ['ID Type', selected.idType],
                ['ID Number', selected.idNumber],
                ['Check-In', selected.checkIn],
                ['Check-Out', selected.checkOut],
                ['Status', selected.status.replace('_', ' ')],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="text-gray-800 font-semibold capitalize">{v}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-100">
              <button onClick={() => setSelected(null)} className="w-full py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </RoleGate>
  );
}
