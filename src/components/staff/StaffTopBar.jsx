'use client';

import { Bell, Menu } from 'lucide-react';
import { useRole } from "@/components/staff/RoleProvider";
import { ROLE_COLORS, ROLES } from "@/components/staff/permissions";

export default function StaffTopBar({ onMenuClick }) {
  const { user, role } = useRole();

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <Menu size={20} />
        </button>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            {user?.hotelName ?? 'Azure Hotel'} <span className="text-gray-400 font-normal">· Staff Portal</span>
          </p>
          <p className="text-xs text-gray-400">{user?.shift ?? ''}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm overflow-hidden flex-shrink-0">
            {user?.avatar ? <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" /> : (user?.name?.charAt(0) ?? 'S')}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">{user?.name ?? 'Staff Member'}</p>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${ROLE_COLORS[role] ?? 'bg-gray-100'}`}>
              {ROLES[role] ?? role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
