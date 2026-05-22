'use client';

import { useEffect, useState } from 'react';

import BookingTable from "@/components/dashboard/BookingTable"
export default function DashboardPage() {
 const [recentBookings] = useState([]);

  useEffect(() => {
    // Fetch or set your bookings data here
    // Example: setRecentBookings(await fetchBookings());
  }, []);


  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back — here&apos;s what&apos;s happening today.</p>
      </div>

   

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Recent Bookings</h2>
            <p className="text-xs text-gray-400 mt-0.5">Latest {recentBookings.length} reservations</p>
          </div>
          <a href="/dashboard/bookings" className="text-xs font-semibold text-blue-600 hover:text-blue-700">View all →</a>
        </div>
        <BookingTable bookings={recentBookings} />
      </div>
    </div>
  );
}
