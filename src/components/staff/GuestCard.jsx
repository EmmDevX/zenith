'use client';

import { Phone, Mail, Star, BedDouble, LogIn, LogOut } from 'lucide-react';

const STATUS_STYLES = {
  in_house: 'bg-green-100 text-green-700',
  arriving: 'bg-blue-100 text-blue-700',
  departed: 'bg-gray-100 text-gray-500',
};

export default function GuestCard({ guest, onView }) {
  const statusCls = STATUS_STYLES[guest.status] ?? 'bg-gray-100 text-gray-500';

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm flex-shrink-0">
          {guest.name?.charAt(0) ?? 'G'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 text-sm">{guest.name}</h3>
            {guest.vip && <span className="flex items-center gap-0.5 text-[10px] font-bold bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full"><Star size={9} className="fill-yellow-500 text-yellow-500" />VIP</span>}
          </div>
          <span className={`inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusCls}`}>
            {guest.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <BedDouble size={12} className="flex-shrink-0" />
          <span>Room {guest.room} · {guest.nationality}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <LogIn size={12} className="flex-shrink-0" />
          <span>In: {guest.checkIn}</span>
          <LogOut size={12} className="flex-shrink-0 ml-2" />
          <span>Out: {guest.checkOut}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Mail size={12} className="flex-shrink-0" />
          <span className="truncate">{guest.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Phone size={12} className="flex-shrink-0" />
          <span>{guest.phone}</span>
        </div>
      </div>

      {onView && (
        <button onClick={() => onView(guest)} className="w-full py-1.5 text-xs font-semibold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
          View Details
        </button>
      )}
    </div>
  );
}
