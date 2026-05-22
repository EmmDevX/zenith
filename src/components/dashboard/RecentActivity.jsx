'use client';

import ActivityCard from './ActivityCard';

export default function RecentActivity({ bookings = [], payments = [], reviews = [] }) {
  const activities = [
    ...reviews.slice(0, 2).map(r => ({
      id: r.id + '_rv',
      type: 'review',
      message: `${r.guest} left a ${r.rating}★ review`,
      date: r.date,
    })),
    ...payments.slice(0, 2).map(p => ({
      id: p.id + '_pay',
      type: 'payment',
      message: `Payment of $${p.amount} received`,
      date: p.date,
    })),
    ...bookings.slice(0, 3).map(b => ({
      id: b.id + '_bk',
      type: 'booking',
      message: `${b.guestName} booked Room ${b.room}`,
      date: b.checkIn,
    })),
  ].sort((a, b) => (b.date > a.date ? 1 : -1)).slice(0, 7);

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Activity</h3>
      <div className="divide-y divide-gray-50">
        {activities.length === 0 ? (
          <p className="text-xs text-gray-400 py-3">No recent activity</p>
        ) : (
          activities.map(a => <ActivityCard key={a.id} activity={a} />)
        )}
      </div>
    </div>
  );
}
