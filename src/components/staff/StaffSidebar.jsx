'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, LogIn, CalendarCheck, BedDouble, ClipboardList,
  CreditCard, CalendarDays, Users, BarChart2, Settings, Hotel, X
} from 'lucide-react';
import { useRole } from './RoleProvider';
import { getAllowedSections, ALL_NAV, ROLE_COLORS, ROLES, ROLE_BADGES } from './permissions';

const ICON_MAP = { LayoutDashboard, LogIn, CalendarCheck, BedDouble, ClipboardList, CreditCard, CalendarDays, Users, BarChart2, Settings };

export default function StaffSidebar({ open, onClose }) {
  const pathname = usePathname();
  const { user, role } = useRole();
  const allowed = getAllowedSections(role);
  const nav = ALL_NAV.filter(n => allowed.includes(n.key));
   const router = useRouter();
  const isActive = (href) => href === '/staff' ? pathname === '/staff' : pathname.startsWith(href);

  return (
    <>
      {open && <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={onClose} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col bg-slate-900 text-white transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Hotel size={16} />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{user?.hotelName ?? 'Azure Hotel'}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Staff Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-white/10"><X size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">Navigation</p>
          <nav className="space-y-0.5">
            {nav.map(({ key, href, label, icon }) => {
              const Icon = ICON_MAP[icon];
              const active = isActive(href);
              return (
                <Link key={key} href={href} onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? 'bg-blue-600 text-white shadow-sm' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
                >
                  {Icon && <Icon size={17} className="flex-shrink-0" />}
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
              {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : (user?.name?.charAt(0) ?? 'S')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name ?? 'Staff Member'}</p>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${ROLE_COLORS[role] ?? 'bg-gray-700 text-gray-300'}`}>
                {ROLES[role] ?? role}
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
