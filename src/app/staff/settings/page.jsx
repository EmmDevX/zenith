'use client';

import { useState, useEffect, useRef } from 'react';
import { Camera, Save } from 'lucide-react';
import RoleGate from "@/components/staff/RoleGate";
import { store } from "@/components/staff/store";
import { useRole } from "@/components/staff/RoleProvider";
import { ROLES, ROLE_COLORS } from "@/components/staff/permissions";

const SHIFTS = ['Morning (07:00–15:00)', 'Afternoon (15:00–23:00)', 'Night (23:00–07:00)', 'Full Day (08:00–20:00)'];

export default function SettingsPage() {
  const { refresh } = useRole();
  const [form, setForm]     = useState({ name: '', role: 'receptionist', department: '', email: '', phone: '', shift: '', avatar: '', hotelName: '' });
  const [saved, setSaved]   = useState(false);
  const [tab, setTab]       = useState('profile');
  const fileRef             = useRef(null);

  useEffect(() => { setForm(store.staffUser.get()); }, []);

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    store.staffUser.update(form);
    refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <RoleGate section="settings">
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">My Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your staff profile and preferences</p>
        </div>

        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {[{ id: 'profile', label: 'My Profile' }, { id: 'role', label: 'Role & Access' }, { id: 'notifications', label: 'Notifications' }].map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${tab === id ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}>{label}</button>
          ))}
        </div>

        {tab === 'profile' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-2xl">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 font-bold text-3xl flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                  {form.avatar ? <img src={form.avatar} alt="Avatar" className="w-full h-full object-cover" /> : (form.name?.charAt(0) || 'S')}
                </div>
                <button onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors">
                  <Camera size={14} />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Click camera to update photo</p>
              <span className={`mt-2 text-xs font-bold px-3 py-1 rounded-full ${ROLE_COLORS[form.role] ?? 'bg-gray-100 text-gray-600'}`}>
                {ROLES[form.role] ?? form.role}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {[
                { key: 'name',        label: 'Full Name',    type: 'text' },
                { key: 'department',  label: 'Department',   type: 'text' },
                { key: 'email',       label: 'Email',        type: 'email' },
                { key: 'phone',       label: 'Phone',        type: 'tel' },
                { key: 'hotelName',   label: 'Hotel Name',   type: 'text' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                  <input type={type} value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Shift</label>
                <select value={form.shift || ''} onChange={e => setForm(f => ({ ...f, shift: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select shift...</option>
                  {SHIFTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              <Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        )}

        {tab === 'role' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-2xl">
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Current Role</h2>
            <p className="text-xs text-gray-400 mb-5">Your role controls which sections of the portal you can access.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {Object.entries(ROLES).map(([key, label]) => (
                <button key={key} onClick={() => setForm(f => ({ ...f, role: key }))}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${form.role === key ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${ROLE_COLORS[key]}`}>{label}</span>
                  <p className="text-xs text-gray-500 leading-snug">
                    {key === 'manager'      ? 'Full access to all sections' :
                     key === 'receptionist' ? 'Check-in, bookings, rooms, events, guests' :
                     key === 'housekeeping' ? 'Room status and cleaning tasks' :
                     key === 'accountant'   ? 'Payments and financial reports' :
                     key === 'kitchen'      ? 'Events and catering tasks' :
                     'Guest list and event security'}
                  </p>
                </button>
              ))}
            </div>

            <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              <Save size={15} /> {saved ? 'Role Updated!' : 'Apply Role'}
            </button>
            <p className="text-xs text-gray-400 mt-2">Changing role updates the navigation instantly. In production, roles should be set by your admin.</p>
          </div>
        )}

        {tab === 'notifications' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-2xl">
            <h2 className="text-sm font-semibold text-gray-900 mb-5">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { label: 'New Task Assigned',  desc: 'Get notified when a task is assigned to you' },
                { label: 'Guest Arriving',     desc: 'Notify when a guest is due to check in' },
                { label: 'Room Status Change', desc: 'Notify when a room status is updated' },
                { label: 'Shift Reminders',    desc: 'Reminder 30 minutes before your shift starts' },
              ].map(({ label, desc }, i) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <button className="w-11 h-6 rounded-full bg-blue-600 relative flex-shrink-0">
                    <span className="absolute top-1 left-6 w-4 h-4 bg-white rounded-full shadow transition-all" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </RoleGate>
  );
}
