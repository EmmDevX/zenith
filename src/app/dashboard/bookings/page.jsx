'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import BookingTable from '@/components/dashboard/BookingTable';
import { store } from "@/components/dashboard/store";

const STATUSES = ['all', 'confirmed', 'pending', 'checked_in', 'checked_out', 'cancelled'];

const EMPTY = { guestName: '', room: '', checkIn: '', checkOut: '', status: 'pending', total: '', email: '', phone: '' };

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);

  const load = () => setBookings(store.bookings.getAll());
  useEffect(() => { load(); }, []);

  const filtered = bookings.filter(b => {
    const matchStatus = filter === 'all' || b.status === filter;
    const matchSearch = !search || b.guestName?.toLowerCase().includes(search.toLowerCase()) || b.room?.includes(search);
    return matchStatus && matchSearch;
  });

  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal(true); };
  const openEdit = (b) => { setForm({ ...b }); setEditing(b.id); setModal(true); };

  const handleSave = () => {
    const data = { ...form, total: Number(form.total) || 0 };
    if (editing) store.bookings.update(editing, data);
    else store.bookings.add(data);
    load();
    setModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this booking?')) { store.bookings.remove(id); load(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Bookings</h1>
          <p className="text-sm text-gray-500 mt-0.5">{bookings.length} total reservations</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={16} /> Add Booking
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 flex-1">
            <Search size={14} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by guest or room..." className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {STATUSES.map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >{s}</button>
            ))}
          </div>
        </div>
        <BookingTable bookings={filtered} onEdit={openEdit} onDelete={handleDelete} />
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{editing ? 'Edit Booking' : 'New Booking'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                { key: 'guestName', label: 'Guest Name', type: 'text', span: 2 },
                { key: 'email', label: 'Email', type: 'email', span: 2 },
                { key: 'phone', label: 'Phone', type: 'tel' },
                { key: 'room', label: 'Room No.', type: 'text' },
                { key: 'checkIn', label: 'Check-In', type: 'date' },
                { key: 'checkOut', label: 'Check-Out', type: 'date' },
                { key: 'total', label: 'Total ($)', type: 'number' },
              ].map(({ key, label, type, span }) => (
                <div key={key} className={span === 2 ? 'col-span-2' : ''}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                  <input type={type} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  {STATUSES.filter(s => s !== 'all').map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
