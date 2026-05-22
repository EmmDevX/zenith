'use client';

import { useEffect, useState } from 'react';
import { Plus, MapPin, Clock, Users, Pencil, Trash2 } from 'lucide-react';
import { store } from "@/components/dashboard/store";

const STATUS_STYLES = {
  upcoming: 'bg-blue-100 text-blue-700',
  full: 'bg-red-100 text-red-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-500',
};

const EMPTY = { name: '', date: '', time: '', location: '', capacity: '', booked: 0, status: 'upcoming', price: '', description: '' };

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);

  const load = () => setEvents(store.events.getAll());
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal(true); };
  const openEdit = (e) => { setForm({ ...e }); setEditing(e.id); setModal(true); };

  const handleSave = () => {
    const data = { ...form, capacity: Number(form.capacity), booked: Number(form.booked), price: Number(form.price) };
    if (editing) store.events.update(editing, data);
    else store.events.add(data);
    load(); setModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this event?')) { store.events.remove(id); load(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Events</h1>
          <p className="text-sm text-gray-500 mt-0.5">{events.length} scheduled events</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(ev => {
          const pct = ev.capacity ? Math.round((ev.booked / ev.capacity) * 100) : 0;
          return (
            <div key={ev.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 leading-tight">{ev.name}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${STATUS_STYLES[ev.status] || 'bg-gray-100 text-gray-600'}`}>{ev.status}</span>
              </div>
              {ev.description && <p className="text-xs text-gray-500 mb-3 line-clamp-2">{ev.description}</p>}
              <div className="space-y-1.5 mb-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5"><Clock size={12} />{ev.date} at {ev.time}</div>
                <div className="flex items-center gap-1.5"><MapPin size={12} />{ev.location}</div>
                <div className="flex items-center gap-1.5"><Users size={12} />{ev.booked} / {ev.capacity} guests</div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Capacity</span><span>{pct}%</span></div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${pct >= 100 ? 'bg-red-500' : pct > 75 ? 'bg-yellow-400' : 'bg-blue-500'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="font-bold text-blue-600">${Number(ev.price).toLocaleString()}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(ev)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(ev.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{editing ? 'Edit Event' : 'New Event'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
              {[
                { key: 'name', label: 'Event Name', type: 'text', span: 2 },
                { key: 'date', label: 'Date', type: 'date' },
                { key: 'time', label: 'Time', type: 'time' },
                { key: 'location', label: 'Location', type: 'text', span: 2 },
                { key: 'capacity', label: 'Capacity', type: 'number' },
                { key: 'price', label: 'Price ($)', type: 'number' },
                { key: 'description', label: 'Description', type: 'textarea', span: 2 },
              ].map(({ key, label, type, span }) => (
                <div key={key} className={span === 2 ? 'col-span-2' : ''}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                  {type === 'textarea'
                    ? <textarea rows={2} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    : <input type={type} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  }
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  {['upcoming', 'full', 'completed', 'cancelled'].map(s => <option key={s}>{s}</option>)}
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
