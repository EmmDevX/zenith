'use client';

import { ShieldX } from 'lucide-react';
import { useRole } from "@/components/staff/RoleProvider";
import { hasPermission, ROLE_COLORS, ROLES } from './permissions';

export default function RoleGate({ section, children }) {
  const { role } = useRole();

  if (!hasPermission(role, section)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[55vh] text-center px-6">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <ShieldX size={30} className="text-red-400" />
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Access Restricted</h2>
        <p className="text-sm text-gray-500 max-w-xs mb-4">
          Your role <strong>{ROLES[role] ?? role}</strong> does not have access to this section.
          Please contact your manager if you need access.
        </p>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${ROLE_COLORS[role] ?? 'bg-gray-100 text-gray-600'}`}>
          {ROLES[role] ?? role}
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
