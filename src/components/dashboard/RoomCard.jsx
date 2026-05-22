'use client';

import { Pencil, Trash2, Wifi, Tv, Coffee, Wind, Star } from 'lucide-react';

const STATUS_STYLES = {
  available: 'bg-green-100 text-green-700',
  occupied: 'bg-blue-100 text-blue-700',
  reserved: 'bg-yellow-100 text-yellow-700',
  maintenance: 'bg-red-100 text-red-700',
};

const AMENITY_ICONS = { WiFi: Wifi, TV: Tv, Minibar: Coffee, AC: Wind };

export default function RoomCard({ room, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative">
        {room.image ? (
          <img src={room.image} alt={`Room ${room.number}`} className="w-full h-full object-cover" />
        ) : (
          <div className="text-blue-300 text-4xl font-bold">#{room.number}</div>
        )}
        <span className={`absolute top-2 right-2 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[room.status] || 'bg-gray-100 text-gray-600'}`}>
          {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">Room {room.number}</h3>
            <p className="text-sm text-gray-500">{room.type} · Floor {room.floor}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-blue-600">${room.price}</p>
            <p className="text-xs text-gray-400">/night</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {(room.amenities || []).map((a) => {
            const Icon = AMENITY_ICONS[a];
            return (
              <span key={a} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {Icon && <Icon size={10} />} {a}
              </span>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Capacity: {room.capacity} guest{room.capacity > 1 ? 's' : ''}</span>
          <div className="flex gap-2">
            {onEdit && (
              <button onClick={() => onEdit(room)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Pencil size={14} />
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(room.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
