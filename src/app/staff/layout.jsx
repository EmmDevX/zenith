'use client';

import { useState, useEffect } from 'react';
import { RoleProvider } from "@/components/staff/RoleProvider";
import StaffSidebar from "@/components/staff/StaffSidebar";
import StaffMobileBottomNav from "@/components/staff/StaffMobileBottomNav";
import { initStore } from "@/components/staff/store";
import StaffTopBar from "@/components/staff/StaffTopBar"

export default function StaffLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { initStore(); }, []);

  return (
    <RoleProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <StaffSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <StaffTopBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6">
            {children}
          </main>
        </div>

        <StaffMobileBottomNav />
      </div>
    </RoleProvider>
  );
}
