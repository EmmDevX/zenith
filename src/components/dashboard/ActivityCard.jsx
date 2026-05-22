'use client';

import { Star, CreditCard, CalendarCheck, LogIn, LogOut, UserPlus } from 'lucide-react';

const ICONS = {
  review: { icon: Star, color: 'text-yellow-500 bg-yellow-50' },
  payment: { icon: CreditCard, color: 'text-green-500 bg-green-50' },
  booking: { icon: CalendarCheck, color: 'text-blue-500 bg-blue-50' },
  checkin: { icon: LogIn, color: 'text-purple-500 bg-purple-50' },
  checkout: { icon: LogOut, color: 'text-gray-500 bg-gray-50' },
  user: { icon: UserPlus, color: 'text-indigo-500 bg-indigo-50' },
};

export default function ActivityCard({ activity }) {
  const { icon: Icon, color } = ICONS[activity.type] || ICONS.booking;
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className={`p-2 rounded-lg flex-shrink-0 ${color}`}>
        <Icon size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 font-medium leading-tight">{activity.message}</p>
        <p className="text-xs text-gray-400 mt-0.5">{activity.date}</p>
      </div>
    </div>
  );
}
