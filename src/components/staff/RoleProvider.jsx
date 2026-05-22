'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { store } from "@/components/staff/store";

const RoleContext = createContext({ user: null, role: 'receptionist', refresh: () => {} });

export function RoleProvider({ children }) {
  const [user, setUser] = useState(null);

  const refresh = () => setUser(store.staffUser.get());

  useEffect(() => { refresh(); }, []);

  return (
    <RoleContext.Provider value={{ user, role: user?.role ?? 'receptionist', refresh }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() { return useContext(RoleContext); }
