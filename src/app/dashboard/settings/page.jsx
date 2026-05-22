'use client';

import Settings from '@/components/dashboard/Settings';

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account and hotel preferences</p>
      </div>
      <Settings />
    </div>
  );
}
