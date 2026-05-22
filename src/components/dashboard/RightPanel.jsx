'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import Calendar from './Calendar';
import RecentActivity from './RecentActivity';
import { store } from './store';

export default function RightPanel() {
  const [profile, setProfile] = useState({ name: 'Admin User', role: 'General Manager', avatar: '' });
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setProfile(store.profile.get());
    setBookings(store.bookings.getAll());
    setPayments(store.payments.getAll());
    setReviews(store.reviews.getAll());
  }, []);

  const bookingDates = bookings.map(b => b.checkIn).filter(Boolean);
  const revenue = payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const occupiedRooms = store.rooms.getAll().filter(r => r.status === 'occupied').length;
  const totalRooms = store.rooms.getAll().length;

  return (
    <aside className="hidden xl:flex w-72 flex-col bg-gray-50 border-l border-gray-100 overflow-y-auto flex-shrink-0">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400">Welcome back,</p>
            <p className="font-bold text-gray-900">{profile.name}</p>
          </div>
          <button className="relative p-2 rounded-lg bg-white border border-gray-100 text-gray-500 hover:bg-gray-100 transition-colors">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg overflow-hidden flex-shrink-0">
              {profile.avatar
                ? <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                : (profile.name?.charAt(0) || 'A')
              }
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{profile.name}</p>
              <p className="text-xs text-gray-500">{profile.role}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 shadow-sm">
          <Calendar bookingDates={bookingDates} />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center">
            <p className="text-xl font-bold text-blue-600">{occupiedRooms}/{totalRooms}</p>
            <p className="text-xs text-gray-500 mt-0.5">Occupied</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center">
            <p className="text-xl font-bold text-green-600">${revenue.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-0.5">Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <RecentActivity bookings={bookings} payments={payments} reviews={reviews} />
        </div>
      </div>
    </aside>
  );
}
