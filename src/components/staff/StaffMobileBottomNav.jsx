'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, LogIn, CalendarCheck, BedDouble, ClipboardList,
  CreditCard, CalendarDays, Users, BarChart2, Settings, MoreHorizontal, X
} from 'lucide-react';
import { useRole } from './RoleProvider';
import { getAllowedSections, ALL_NAV } from './permissions';

const ICON_MAP = { LayoutDashboard, LogIn, CalendarCheck, BedDouble, ClipboardList, CreditCard, CalendarDays, Users, BarChart2, Settings };

export default function StaffMobileBottomNav() {
  const pathname = usePathname();
  const { role } = useRole();
  const [showMore, setShowMore] = useState(false);

  const allowed = getAllowedSections(role);
  const nav = ALL_NAV.filter(n => allowed.includes(n.key));
  const primary = nav.slice(0, 4);
  const more = nav.slice(4);

  const isActive = (href) => href === '/staff' ? pathname === '/staff' : pathname.startsWith(href);
  const moreActive = more.some(n => isActive(n.href));

  return (
    <>
      {showMore && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setShowMore(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-16 left-0 right-0 bg-white border-t border-gray-200 rounded-t-2xl shadow-xl px-4 py-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-700">More</p>
              <button onClick={() => setShowMore(false)} className="p-1 rounded-full hover:bg-gray-100"><X size={16} className="text-gray-500" /></button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {more.map(({ key, href, label, icon }) => {
                const Icon = ICON_MAP[icon];
                return (
                  <Link key={key} href={href} onClick={() => setShowMore(false)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors ${isActive(href) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {Icon && <Icon size={22} />}
                    <span className="text-xs font-medium">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 flex items-stretch">
        {primary.map(({ key, href, label, icon }) => {
          const Icon = ICON_MAP[icon];
          const active = isActive(href);
          return (
            <Link key={key} href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 relative transition-colors ${active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {Icon && <Icon size={20} />}
              <span className="text-[10px] font-medium">{label}</span>
              {active && <span className="absolute bottom-0 w-8 h-0.5 bg-blue-600 rounded-t-full" />}
            </Link>
          );
        })}

        {more.length > 0 && (
          <button onClick={() => setShowMore(!showMore)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors ${moreActive || showMore ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <MoreHorizontal size={20} />
            <span className="text-[10px] font-medium">More</span>
          </button>
        )}
      </nav>
    </>
  );
}
