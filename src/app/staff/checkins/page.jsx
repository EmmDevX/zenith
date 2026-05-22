'use client';

import { useEffect, useState } from 'react';
import { LogIn, LogOut, Check } from 'lucide-react';
import RoleGate from "@/components/staff/RoleGate";
import { store } from "@/components/staff/store";

const today = new Date().toISOString().split('T')[0];

export default function CheckInsPage() {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState('arriving');

  const load = () => setBookings(store.bookings.getAll());
  useEffect(() => { load(); }, []);

  const arriving  = bookings.filter(b => b.checkIn  === today && b.status === 'confirmed');
  const departing = bookings.filter(b => b.checkOut === today && b.status === 'checked_in');
  const inHouse   = bookings.filter(b => b.status === 'checked_in');

  const doCheckIn  = (id) => { store.bookings.update(id, { status: 'checked_in' });  load(); };
  const doCheckOut = (id) => { store.bookings.update(id, { status: 'checked_out' }); load(); };

  const list = tab === 'arriving' ? arriving : tab === 'departing' ? departing : inHouse;

  return (
    <RoleGate section="checkins">
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Check-In / Check-Out</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage today's arrivals and departures</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { key: 'arriving',  label: 'Arriving Today',  count: arriving.length,  color: 'blue'  },
            { key: 'departing', label: 'Departing Today', count: departing.length, color: 'yellow'},
            { key: 'inhouse',   label: 'In-House',        count: inHouse.length,   color: 'green' },
          ].map(({ key, label, count, color }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`p-4 rounded-xl border text-center transition-all ${tab === key ? 'border-blue-500 bg-blue-50 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200'}`}
            >
              <p className={`text-2xl font-bold ${tab === key ? 'text-blue-600' : 'text-gray-900'}`}>{count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              {tab === 'arriving' ? 'Guests Arriving Today' : tab === 'departing' ? 'Guests Departing Today' : 'Currently In-House'}
            </h2>
          </div>

          {list.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-10">No guests in this category</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {list.map(b => (
                <div key={b.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {b.guestName?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{b.guestName}</p>
                    <p className="text-xs text-gray-400">Room {b.room} · {b.adults} adult{b.adults !== 1 ? 's' : ''}{b.children > 0 ? `, ${b.children} child` : ''}</p>
                    <p className="text-xs text-gray-400">{b.email} · {b.phone}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400 mb-2">
                      {tab === 'arriving' ? `Check-in: ${b.checkIn}` : `Check-out: ${b.checkOut}`}
                    </p>
                    {tab === 'arriving' && (
                      <button onClick={() => doCheckIn(b.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        <LogIn size={13} /> Check In
                      </button>
                    )}
                    {tab === 'departing' && (
                      <button onClick={() => doCheckOut(b.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors">
                        <LogOut size={13} /> Check Out
                      </button>
                    )}
                    {tab === 'inhouse' && (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                        <Check size={12} /> In-House
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </RoleGate>
  );
}
