'use client';

import { useState, useEffect, useRef } from 'react';
import { Camera, Save, User, Bell, Shield, Globe, Palette } from 'lucide-react';
import { store } from './store';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'localization', label: 'Localization', icon: Globe },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export default function Settings() {
  const [tab, setTab] = useState('profile');
  const [profile, setProfile] = useState({ name: '', role: '', email: '', phone: '', avatar: '', hotelName: '' });
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ bookings: true, payments: true, reviews: false, maintenance: true });
  const fileRef = useRef(null);

  useEffect(() => {
    setProfile(store.profile.get());
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfile(prev => ({ ...prev, avatar: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    store.profile.update(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible lg:w-48 flex-shrink-0 pb-2 lg:pb-0">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              tab === id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </aside>

      <div className="flex-1 max-w-2xl">
        {tab === 'profile' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Profile Settings</h2>

            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 font-bold text-3xl flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                  {profile.avatar
                    ? <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                    : (profile.name?.charAt(0) || 'A')
                  }
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
                >
                  <Camera size={14} />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Click the camera icon to change photo</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text' },
                { key: 'role', label: 'Job Title', type: 'text' },
                { key: 'email', label: 'Email Address', type: 'email' },
                { key: 'phone', label: 'Phone Number', type: 'tel' },
                { key: 'hotelName', label: 'Hotel Name', type: 'text' },
              ].map(({ key, label, type }) => (
                <div key={key} className={key === 'hotelName' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={profile[key] || ''}
                    onChange={e => setProfile(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                saved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Save size={15} />
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        )}

        {tab === 'notifications' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { key: 'bookings', label: 'New Bookings', desc: 'Get notified when a new booking is made' },
                { key: 'payments', label: 'Payments', desc: 'Get notified for payment transactions' },
                { key: 'reviews', label: 'New Reviews', desc: 'Get notified when guests leave reviews' },
                { key: 'maintenance', label: 'Maintenance Alerts', desc: 'Get notified for room maintenance issues' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifs(n => ({ ...n, [key]: !n[key] }))}
                    className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${notifs[key] ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifs[key] ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'security' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Security Settings</h2>
            <div className="space-y-4">
              {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                  <input type="password" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
                </div>
              ))}
              <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Update Password
              </button>
            </div>
          </div>
        )}

        {tab === 'localization' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Localization</h2>
            <div className="space-y-4">
              {[
                { label: 'Language', options: ['English', 'Spanish', 'French', 'German', 'Arabic'] },
                { label: 'Timezone', options: ['UTC', 'America/New_York', 'Europe/London', 'Asia/Dubai', 'Asia/Tokyo'] },
                { label: 'Currency', options: ['USD ($)', 'EUR (€)', 'GBP (£)', 'AED (د.إ)', 'JPY (¥)'] },
                { label: 'Date Format', options: ['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY'] },
              ].map(({ label, options }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                  <select className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">Save</button>
            </div>
          </div>
        )}

        {tab === 'appearance' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Appearance</h2>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-3">Theme Mode</p>
                <div className="flex gap-3">
                  {['Light', 'Dark', 'System'].map(t => (
                    <button key={t} className={`flex-1 py-2.5 text-sm font-medium rounded-lg border transition-colors ${t === 'Light' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-3">Accent Color</p>
                <div className="flex gap-3">
                  {['bg-blue-600','bg-indigo-600','bg-purple-600','bg-green-600','bg-rose-600'].map(c => (
                    <button key={c} className={`w-9 h-9 rounded-full ${c} ${c === 'bg-blue-600' ? 'ring-2 ring-offset-2 ring-blue-600' : ''} transition-all hover:scale-110`} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2">Sidebar Style</p>
                <div className="flex gap-3">
                  {['Compact', 'Default'].map(s => (
                    <button key={s} className={`flex-1 py-2.5 text-sm font-medium rounded-lg border transition-colors ${s === 'Default' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
