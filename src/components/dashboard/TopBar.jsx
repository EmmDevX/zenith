'use client';

import { Bell, Menu, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { store } from './store';

export default function TopBar({ onMenuClick }) {
  const [profile, setProfile] = useState({ name: 'Admin User', hotelName: 'Azure Hotel', avatar: '' });
  const [notifCount] = useState(3);

  useEffect(() => {
    setProfile(store.profile.get());
  }, []);

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-56">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell size={18} />
          {notifCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {notifCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm overflow-hidden flex-shrink-0">
            {profile.avatar
              ? <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              : (profile.name?.charAt(0) || 'A')
            }
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">{profile.name}</p>
            <p className="text-xs text-gray-400">{profile.role || 'Admin'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
