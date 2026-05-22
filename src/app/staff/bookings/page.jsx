'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import RoleGate from "@/components/staff/RoleGate";
import { store } from "@/components/staff/store";

const STATUS_STYLES = {
  confirmed:   'bg-green-100 text-green-700',
  checked_in:  'bg-blue-100 text-blue-700',
  checked_out: 'bg-gray-100 text-gray-500',
  pending:     'bg-yellow-100 text-yellow-700',
  cancelled:   'bg-red-100 text-red-700',
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('all');

  useEffect(() => { setBookings(store.bookings.getAll()); }, []);

  const filtered = bookings.filter(b => {
    const matchFilter = filter === 'all' || b.status === filter;
    const matchSearch = !search || b.guestName?.toLowerCase().includes(search.toLowerCase()) || b.room?.includes(search);
    return matchFilter && matchSearch;
  });

  return (
    <RoleGate section="bookings">
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Bookings</h1>
          <p className="text-sm text-gray-500 mt-0.5">{bookings.length} total reservations</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 flex-1">
              <Search size={14} className="text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by guest or room..." className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full" />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {['all', 'confirmed', 'checked_in', 'checked_out', 'pending'].map(s => (
                <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {s.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Guest', 'Room', 'Check-In', 'Check-Out', 'Adults', 'Status', 'Total'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{b.guestName}</p>
                      <p className="text-xs text-gray-400">{b.email}</p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-blue-600">#{b.room}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{b.checkIn}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{b.checkOut}</td>
                    <td className="py-3 px-4 text-gray-600">{b.adults}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLES[b.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {b.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">${b.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="text-center text-gray-400 text-sm py-10">No bookings found</p>}
          </div>
        </div>
      </div>
    </RoleGate>
  );
}
