'use client';

import { useEffect, useState, useRef } from 'react';
import { Plus, Search } from 'lucide-react';
import StaffCard from '@/components/dashboard/StaffCard';
import { store } from '@/components/dashboard/store';

const DEPTS = ['Reception', 'Housekeeping', 'Kitchen', 'Security', 'Management', 'Maintenance'];
const STATUSES = ['active', 'on_leave', 'inactive'];
const EMPTY = { name: '', role: '', department: 'Reception', email: '', phone: '', status: 'active', avatar: '', joinDate: '', salary: '' };

export default function StaffsPage() {
  const [staff, setStaff] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const fileRef = useRef(null);

  const load = () => setStaff(store.staff.getAll());
  useEffect(() => { load(); }, []);

  const filtered = staff.filter(s => {
    const matchFilter = filter === 'all' || s.status === filter || s.department === filter;
    const matchSearch = !search || s.name?.toLowerCase().includes(search.toLowerCase()) || s.role?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditing(s.id); setModal(true); };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const data = { ...form, salary: Number(form.salary) };
    if (editing) store.staff.update(editing, data);
    else store.staff.add(data);
    load(); setModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Remove this staff member?')) { store.staff.remove(id); load(); }
  };

  const allFilters = ['all', ...STATUSES, ...DEPTS];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Her Staffs</h1>
          <p className="text-sm text-gray-500 mt-0.5">{staff.length} team members</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={16} /> Add Staff
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm flex-1">
          <Search size={14} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search staff..." className="text-sm outline-none bg-transparent w-full text-gray-700 placeholder-gray-400" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm">
          {allFilters.map(f => <option key={f} value={f}>{f === 'all' ? 'All' : f.replace('_', ' ')}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => <StaffCard key={s.id} staff={s} onEdit={openEdit} onDelete={handleDelete} />)}
        {filtered.length === 0 && <p className="col-span-3 text-center text-gray-400 text-sm py-10">No staff found</p>}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{editing ? 'Edit Staff' : 'Add Staff'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col items-center gap-2 mb-2">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 font-bold text-2xl flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors" onClick={() => fileRef.current?.click()}>
                  {form.avatar ? <img src={form.avatar} alt="" className="w-full h-full object-cover" /> : (form.name?.charAt(0) || '+')}
                </div>
                <button type="button" onClick={() => fileRef.current?.click()} className="text-xs text-blue-600 font-medium">Upload Photo</button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Full Name', type: 'text', span: 2 },
                  { key: 'role', label: 'Job Title', type: 'text', span: 2 },
                  { key: 'email', label: 'Email', type: 'email' },
                  { key: 'phone', label: 'Phone', type: 'tel' },
                  { key: 'joinDate', label: 'Join Date', type: 'date' },
                  { key: 'salary', label: 'Salary ($)', type: 'number' },
                ].map(({ key, label, type, span }) => (
                  <div key={key} className={span === 2 ? 'col-span-2' : ''}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                    <input type={type} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Department</label>
                  <select value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {DEPTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
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
