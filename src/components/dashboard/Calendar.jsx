'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function Calendar({ bookingDates = [] }) {
  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();

  const pad = (n) => String(n).padStart(2, '0');
  const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
  const bookingSet = new Set(bookingDates);

  const prev = () => setCurrent(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  const next = () => setCurrent(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">{MONTHS[current.month]} {current.year}</span>
        <div className="flex gap-1">
          <button onClick={prev} className="p-1 rounded hover:bg-gray-100 text-gray-500"><ChevronLeft size={14} /></button>
          <button onClick={next} className="p-1 rounded hover:bg-gray-100 text-gray-500"><ChevronRight size={14} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAYS.map(d => <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} />;
          const isToday = d === today.getDate() && current.month === today.getMonth() && current.year === today.getFullYear();
          const isBooked = bookingSet.has(toKey(current.year, current.month, d));
          return (
            <div key={d} className={`
              text-center text-xs py-1.5 rounded-full leading-none cursor-default
              ${isToday ? 'bg-blue-600 text-white font-bold' : ''}
              ${isBooked && !isToday ? 'bg-blue-100 text-blue-700 font-semibold' : ''}
              ${!isToday && !isBooked ? 'text-gray-600 hover:bg-gray-100' : ''}
            `}>{d}</div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />Today</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-100 inline-block" />Booking</span>
      </div>
    </div>
  );
}
