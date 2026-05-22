'use client';

import { Check, Clock, AlertTriangle, Trash2 } from 'lucide-react';

const PRIORITY_STYLES = {
  high:   'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low:    'bg-green-100 text-green-700',
};

const STATUS_STYLES = {
  pending:     { cls: 'bg-gray-100 text-gray-600',  icon: Clock },
  in_progress: { cls: 'bg-blue-100 text-blue-700',  icon: AlertTriangle },
  done:        { cls: 'bg-green-100 text-green-700', icon: Check },
};

const TYPE_COLORS = {
  cleaning:    'border-l-blue-400',
  maintenance: 'border-l-red-400',
  restocking:  'border-l-yellow-400',
  event:       'border-l-purple-400',
  catering:    'border-l-orange-400',
};

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const s = STATUS_STYLES[task.status] ?? STATUS_STYLES.pending;
  const StatusIcon = s.icon;

  const next = { pending: 'in_progress', in_progress: 'done', done: 'pending' };

  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 border-l-4 ${TYPE_COLORS[task.type] ?? 'border-l-gray-200'} hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{task.title}</h3>
        <div className="flex gap-1.5 flex-shrink-0">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority] ?? 'bg-gray-100 text-gray-500'}`}>
            {task.priority}
          </span>
        </div>
      </div>

      {task.room && <p className="text-xs text-gray-400 mb-1">📍 {task.room}</p>}
      {task.notes && <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.notes}</p>}

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <button
          onClick={() => onStatusChange && onStatusChange(task.id, next[task.status])}
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${s.cls} hover:opacity-80`}
        >
          <StatusIcon size={11} />
          {task.status.replace('_', ' ')}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{task.dueDate}</span>
          {onDelete && (
            <button onClick={() => onDelete(task.id)} className="p-1 text-gray-300 hover:text-red-500 transition-colors">
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
