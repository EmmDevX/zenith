'use client';

import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import RoomCard from '@/components/dashboard/RoomCard';
import { store } from '@/components/dashboard/store';

const STATUSES = ['all', 'available', 'occupied', 'reserved', 'maintenance'];
const TYPES = ['Single', 'Double', 'Suite', 'Deluxe', 'Family'];
const AMENITIES = ['WiFi', 'AC', 'TV', 'Minibar', 'Jacuzzi', 'Balcony', 'Safe', 'Coffee Maker'];

const EMPTY = { number: '', type: 'Single', status: 'available', price: '', floor: '', capacity: 1, amenities: [], image: '' };

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);

  const load = () => setRooms(store.rooms.getAll());
  useEffect(() => { load(); }, []);

  const filtered = rooms.filter(r => {
    const matchStatus = filter === 'all' || r.status === filter;
    const matchSearch = !search || r.number?.includes(search) || r.type?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal(true); };
  const openEdit = (r) => { setForm({ ...r, amenities: [...(r.amenities || [])] }); setEditing(r.id); setModal(true); };

  const toggleAmenity = (a) => {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a]
    }));
  };

  const handleSave = () => {
    const data = { ...form, price: Number(form.price), floor: Number(form.floor), capacity: Number(form.capacity) };
    if (editing) store.rooms.update(editing, data);
    else store.rooms.add(data);
    load(); setModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this room?')) { store.rooms.remove(id); load(); }
  };

  const counts = STATUSES.slice(1).reduce((acc, s) => {
    acc[s] = rooms.filter(r => r.status === s).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Rooms</h1>
          <p className="text-sm text-gray-500 mt-0.5">{rooms.length} total rooms</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={16} /> Add Room
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm flex-1 min-w-[160px]">
          <Search size={14} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rooms..." className="text-sm outline-none bg-transparent w-full text-gray-700 placeholder-gray-400" />
        </div>
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-2 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === s ? 'bg-blue-600 text-white' : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50 shadow-sm'}`}>
            {s}{s !== 'all' && counts[s] !== undefined ? ` (${counts[s]})` : ''}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => <RoomCard key={r.id} room={r} onEdit={openEdit} onDelete={handleDelete} />)}
        {filtered.length === 0 && <p className="col-span-3 text-center text-gray-400 text-sm py-10">No rooms found</p>}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{editing ? 'Edit Room' : 'Add Room'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'number', label: 'Room Number', type: 'text' },
                  { key: 'floor', label: 'Floor', type: 'number' },
                  { key: 'price', label: 'Price/night ($)', type: 'number' },
                  { key: 'capacity', label: 'Capacity', type: 'number' },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                    <input type={type} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {STATUSES.filter(s => s !== 'all').map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map(a => (
                    <button key={a} type="button" onClick={() => toggleAmenity(a)} className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${form.amenities?.includes(a) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                      {a}
                    </button>
                  ))}
                </div>
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
