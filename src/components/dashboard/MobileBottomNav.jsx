'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, CalendarCheck, CalendarDays, CreditCard,
  MoreHorizontal, BedDouble, Star, Users, UserCircle, Settings, X
} from 'lucide-react';

const PRIMARY_NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/dashboard/events', label: 'Events', icon: CalendarDays },
  { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
];

const MORE_NAV = [
  { href: '/dashboard/rooms', label: 'Rooms', icon: BedDouble },
  { href: '/dashboard/reviews', label: 'Reviews', icon: Star },
  { href: '/dashboard/staffs', label: 'Staffs', icon: UserCircle },
  { href: '/dashboard/users', label: 'Users', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const isActive = (href) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  const moreIsActive = MORE_NAV.some(n => isActive(n.href));

  return (
    <>
      {showMore && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setShowMore(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="absolute bottom-16 left-0 right-0 bg-white border-t border-gray-200 rounded-t-2xl shadow-xl px-4 py-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-700">More Navigation</p>
              <button onClick={() => setShowMore(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {MORE_NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setShowMore(false)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors ${
                    isActive(href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={22} />
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 flex items-stretch">
        {PRIMARY_NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
              isActive(href)
                ? 'text-blue-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
            {isActive(href) && <span className="absolute bottom-0 w-8 h-0.5 bg-blue-600 rounded-t-full" />}
          </Link>
        ))}

        <button
          onClick={() => setShowMore(!showMore)}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
            moreIsActive || showMore ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <MoreHorizontal size={20} />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </nav>
    </>
  );
}
