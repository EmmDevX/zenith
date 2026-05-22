'use client';

import { BedDouble, Wrench, CheckCircle, AlertCircle } from 'lucide-react';

const STATUS_STYLES = {
  available:   { cls: 'bg-green-50 border-green-200',  badge: 'bg-green-100 text-green-700',  dot: 'bg-green-400' },
  occupied:    { cls: 'bg-blue-50 border-blue-200',    badge: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-400' },
  reserved:    { cls: 'bg-yellow-50 border-yellow-200',badge: 'bg-yellow-100 text-yellow-700',dot: 'bg-yellow-400' },
  maintenance: { cls: 'bg-red-50 border-red-200',      badge: 'bg-red-100 text-red-700',      dot: 'bg-red-400' },
};

const CLEAN_STYLES = {
  clean:   { cls: 'text-green-600', icon: CheckCircle, label: 'Clean' },
  dirty:   { cls: 'text-red-500',   icon: AlertCircle, label: 'Dirty' },
  inspect: { cls: 'text-yellow-500',icon: AlertCircle, label: 'Inspect' },
};

export default function RoomStatusCard({ room, onCleanStatusChange, onRoomStatusChange }) {
  const s = STATUS_STYLES[room.status] ?? STATUS_STYLES.available;
  const cs = CLEAN_STYLES[room.cleanStatus] ?? CLEAN_STYLES.dirty;
  const CleanIcon = cs.icon;

  return (
    <div className={`rounded-xl border p-4 ${s.cls} hover:shadow-sm transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`} />
            <h3 className="font-bold text-gray-900">Room {room.number}</h3>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{room.type} · Floor {room.floor}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>
          {room.status}
        </span>
      </div>

      {room.guest && (
        <div className="text-xs text-gray-600 mb-2 font-medium">
          👤 {room.guest}
          {room.checkOut && <span className="text-gray-400 font-normal"> · Out: {room.checkOut}</span>}
        </div>
      )}

      <div className="flex items-center gap-1.5 mb-3">
        <CleanIcon size={13} className={cs.cls} />
        <span className={`text-xs font-semibold ${cs.cls}`}>{cs.label}</span>
      </div>

      <div className="flex gap-2">
        {onCleanStatusChange && (
          <select
            value={room.cleanStatus}
            onChange={e => onCleanStatusChange(room.id, e.target.value)}
            className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="clean">Clean</option>
            <option value="dirty">Dirty</option>
            <option value="inspect">Inspect</option>
          </select>
        )}
        {onRoomStatusChange && (
          <select
            value={room.status}
            onChange={e => onRoomStatusChange(room.id, e.target.value)}
            className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="maintenance">Maintenance</option>
          </select>
        )}
      </div>
    </div>
  );
}
