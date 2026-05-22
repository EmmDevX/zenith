'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, BedDouble, CalendarCheck, CalendarDays,
  UserCircle, CreditCard, Star, Settings, Users, X, Hotel
} from 'lucide-react';
import { store } from './store';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/rooms', label: 'Rooms', icon: BedDouble },
  { href: '/dashboard/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/dashboard/events', label: 'Events', icon: CalendarDays },
  { href: '/dashboard/staffs', label: 'Staffs', icon: UserCircle },
  { href: '/dashboard/users', label: 'Users', icon: Users },
  { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/reviews', label: 'Reviews', icon: Star },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
   const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState({ name: 'Admin User', role: 'General Manager', hotelName: 'Zenith Hotel', avatar: '' });

  useEffect(() => {
    setProfile(store.profile.get());
  }, []);

  const isActive = (href) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  return (
    <>
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col bg-slate-900 text-white transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Hotel size={16} />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{profile.hotelName}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-white/10">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">Main Menu</p>
          <nav className="space-y-0.5">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={17} className="flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-white/70" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-4 py-4 border-t border-white/10" onClick={() => router.push('/')}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500/30 text-blue-300 font-bold flex items-center justify-center text-sm overflow-hidden flex-shrink-0">
              {profile.avatar
                ? <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                : (profile.name?.charAt(0) || 'A')
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{profile.name}</p>
              <p className="text-xs text-white/40 truncate">{profile.role}</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
