'use client';

import { Pencil, Trash2, Check, Clock, X } from 'lucide-react';

const STATUS_STYLES = {
  confirmed: { cls: 'bg-green-100 text-green-700', icon: Check },
  pending: { cls: 'bg-yellow-100 text-yellow-700', icon: Clock },
  cancelled: { cls: 'bg-red-100 text-red-700', icon: X },
  checked_in: { cls: 'bg-blue-100 text-blue-700', icon: Check },
  checked_out: { cls: 'bg-gray-100 text-gray-600', icon: Check },
};

export default function BookingTable({ bookings, onEdit, onDelete }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg font-medium">No bookings found</p>
        <p className="text-sm mt-1">Add a booking to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Guest</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Room</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Check-In</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Check-Out</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Total</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {bookings.map((b) => {
            const s = STATUS_STYLES[b.status] || STATUS_STYLES.pending;
            const Icon = s.icon;
            return (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <p className="font-medium text-gray-900">{b.guestName}</p>
                  <p className="text-xs text-gray-400">{b.email}</p>
                </td>
                <td className="py-3 px-4 font-medium text-blue-600">#{b.room}</td>
                <td className="py-3 px-4 text-gray-600 hidden sm:table-cell">{b.checkIn}</td>
                <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{b.checkOut}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${s.cls}`}>
                    <Icon size={10} />
                    {b.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-gray-900 hidden sm:table-cell">${b.total}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-1 justify-end">
                    {onEdit && (
                      <button onClick={() => onEdit(b)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil size={14} />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(b.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
