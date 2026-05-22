'use client';

import { useEffect, useState } from 'react';
import RoleGate from "@/components/staff/RoleGate"
import { store } from "@/components/staff/store";

export default function ReportsPage() {
  const [data, setData] = useState({ rooms: [], bookings: [], payments: [], tasks: [], guests: [] });

  useEffect(() => {
    setData({
      rooms:    store.rooms.getAll(),
      bookings: store.bookings.getAll(),
      payments: store.payments.getAll(),
      tasks:    store.tasks.getAll(),
      guests:   store.guests.getAll(),
    });
  }, []);

  const revenue   = data.payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const pending$  = data.payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const occupied  = data.rooms.filter(r => r.status === 'occupied').length;
  const available = data.rooms.filter(r => r.status === 'available').length;
  const occupancyPct = data.rooms.length ? Math.round((occupied / data.rooms.length) * 100) : 0;
  const taskDone  = data.tasks.filter(t => t.status === 'done').length;
  const taskTotal = data.tasks.length;

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-5">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );

  const Stat = ({ label, value, sub, color = 'text-gray-900' }) => (
    <div className="text-center p-3">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );

  const Bar = ({ label, value, max, color = 'bg-blue-500' }) => (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-gray-600 mb-1"><span>{label}</span><span className="font-semibold">{value}</span></div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(max ? Math.round((value / max) * 100) : 0, 100)}%` }} />
      </div>
    </div>
  );

  const methodBreakdown = ['Credit Card', 'Cash', 'Bank Transfer'].map(m => ({
    method: m,
    count:  data.payments.filter(p => p.method === m).length,
    total:  data.payments.filter(p => p.method === m).reduce((s, p) => s + p.amount, 0),
  }));

  const statusBreakdown = ['confirmed', 'checked_in', 'checked_out', 'pending'].map(s => ({
    status: s.replace('_', ' '),
    count:  data.bookings.filter(b => b.status === s).length,
  }));

  return (
    <RoleGate section="reports">
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-0.5">Operational summary and performance metrics</p>
        </div>

        <Section title="Financial Summary">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 divide-x divide-gray-100">
            <Stat label="Total Revenue"     value={`$${revenue.toLocaleString()}`}  color="text-green-600" />
            <Stat label="Pending Revenue"   value={`$${pending$.toLocaleString()}`} color="text-yellow-500" />
            <Stat label="Avg. Transaction"  value={data.payments.filter(p => p.status==='completed').length ? `$${Math.round(revenue / data.payments.filter(p=>p.status==='completed').length)}` : '$0'} />
            <Stat label="Transactions"      value={data.payments.length} />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-600 mb-3">Payment Methods</p>
            {methodBreakdown.map(({ method, count, total }) => (
              <Bar key={method} label={`${method} (${count})`} value={`$${total}`} max={revenue || 1} color="bg-blue-500" />
            ))}
          </div>
        </Section>

        <Section title="Room Occupancy">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 divide-x divide-gray-100 mb-4">
            <Stat label="Occupancy Rate" value={`${occupancyPct}%`} color="text-blue-600" />
            <Stat label="Occupied"       value={occupied}           color="text-blue-500" />
            <Stat label="Available"      value={available}          color="text-green-600" />
            <Stat label="Total Rooms"    value={data.rooms.length} />
          </div>
          {['available','occupied','reserved','maintenance'].map(s => (
            <Bar key={s} label={s.charAt(0).toUpperCase()+s.slice(1)} value={data.rooms.filter(r=>r.status===s).length} max={data.rooms.length || 1}
              color={s==='available'?'bg-green-500':s==='occupied'?'bg-blue-500':s==='reserved'?'bg-yellow-400':'bg-red-500'} />
          ))}
        </Section>

        <Section title="Booking Summary">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 divide-x divide-gray-100 mb-4">
            <Stat label="Total"      value={data.bookings.length} />
            <Stat label="Confirmed"  value={data.bookings.filter(b=>b.status==='confirmed').length}   color="text-green-600" />
            <Stat label="In-House"   value={data.bookings.filter(b=>b.status==='checked_in').length}  color="text-blue-600" />
            <Stat label="Checked Out"value={data.bookings.filter(b=>b.status==='checked_out').length} color="text-gray-500" />
          </div>
          {statusBreakdown.map(({ status, count }) => (
            <Bar key={status} label={status.charAt(0).toUpperCase()+status.slice(1)} value={count} max={data.bookings.length || 1} color="bg-indigo-500" />
          ))}
        </Section>

        <Section title="Task Completion">
          <div className="grid grid-cols-3 gap-2 divide-x divide-gray-100 mb-4">
            <Stat label="Completed"    value={taskDone}             color="text-green-600" />
            <Stat label="In Progress"  value={data.tasks.filter(t=>t.status==='in_progress').length} color="text-blue-600" />
            <Stat label="Pending"      value={data.tasks.filter(t=>t.status==='pending').length} color="text-yellow-500" />
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${taskTotal ? Math.round((taskDone/taskTotal)*100) : 0}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right">{taskTotal ? Math.round((taskDone/taskTotal)*100) : 0}% complete</p>
        </Section>
      </div>
    </RoleGate>
  );
}
