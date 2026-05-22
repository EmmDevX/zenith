'use client';

import { Pencil, Trash2, Phone, Mail } from 'lucide-react';

const STATUS_STYLES = {
  active: 'bg-green-100 text-green-700',
  on_leave: 'bg-yellow-100 text-yellow-700',
  inactive: 'bg-gray-100 text-gray-500',
};

const DEPT_COLORS = {
  Reception: 'bg-blue-100 text-blue-700',
  Housekeeping: 'bg-purple-100 text-purple-700',
  Kitchen: 'bg-orange-100 text-orange-700',
  Security: 'bg-red-100 text-red-700',
  Management: 'bg-indigo-100 text-indigo-700',
};

export default function StaffCard({ staff, onEdit, onDelete }) {
  const statusCls = STATUS_STYLES[staff.status] || STATUS_STYLES.inactive;
  const deptCls = DEPT_COLORS[staff.department] || 'bg-gray-100 text-gray-600';
  const initial = staff.name?.charAt(0) || 'S';

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xl flex-shrink-0 overflow-hidden">
          {staff.avatar ? <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" /> : initial}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{staff.name}</h3>
          <p className="text-sm text-gray-500 truncate">{staff.role}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${deptCls}`}>{staff.department}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusCls}`}>{staff.status.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Mail size={12} className="flex-shrink-0" />
          <span className="truncate">{staff.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Phone size={12} className="flex-shrink-0" />
          <span>{staff.phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">Since {staff.joinDate}</span>
        <div className="flex gap-1">
          {onEdit && (
            <button onClick={() => onEdit(staff)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Pencil size={14} />
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(staff.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
