'use client';

import { useEffect, useState } from 'react';
import { CreditCard, Banknote, Building2, Search } from 'lucide-react';
import RoleGate from "@/components/staff/RoleGate";
import { store } from "@/components/staff/store";

const METHOD_ICONS = { 'Credit Card': CreditCard, 'Cash': Banknote, 'Bank Transfer': Building2 };
const STATUS_STYLES = { completed: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', failed: 'bg-red-100 text-red-700' };

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter]     = useState('all');
  const [search, setSearch]     = useState('');

  const load = () => setPayments(store.payments.getAll());
  useEffect(() => { load(); }, []);

  const filtered = payments.filter(p => {
    const matchFilter = filter === 'all' || p.status === filter;
    const matchSearch = !search || p.guest?.toLowerCase().includes(search.toLowerCase()) || p.reference?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const completed = payments.filter(p => p.status === 'completed');
  const revenue   = completed.reduce((s, p) => s + Number(p.amount), 0);

  const markPaid = (id) => { store.payments.update(id, { status: 'completed' }); load(); };

  return (
    <RoleGate section="payments">
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500 mt-0.5">View and manage guest transactions</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-green-600">${revenue.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-0.5">Total Revenue</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{completed.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Completed</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center col-span-2 sm:col-span-1">
            <p className="text-2xl font-bold text-yellow-500">{payments.filter(p => p.status === 'pending').length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Pending</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 flex-1">
              <Search size={14} className="text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by guest or reference..." className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full" />
            </div>
            <div className="flex gap-1.5">
              {['all', 'completed', 'pending', 'failed'].map(s => (
                <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {filtered.length === 0
              ? <p className="text-center text-gray-400 text-sm py-10">No payments found</p>
              : filtered.map(p => {
                  const Icon = METHOD_ICONS[p.method] ?? CreditCard;
                  return (
                    <div key={p.id} className="flex items-center gap-4 px-5 py-3.5">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0"><Icon size={16} /></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm">{p.guest}</p>
                        <p className="text-xs text-gray-400">{p.reference} · Room {p.room} · {p.date}</p>
                      </div>
                      <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                        <p className="font-bold text-gray-900">${p.amount}</p>
                        {p.status === 'pending' ? (
                          <button onClick={() => markPaid(p.id)} className="text-xs font-semibold bg-green-600 text-white px-2.5 py-1 rounded-lg hover:bg-green-700 transition-colors">Mark Paid</button>
                        ) : (
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[p.status] ?? 'bg-gray-100 text-gray-500'}`}>{p.status}</span>
                        )}
                      </div>
                    </div>
                  );
                })
            }
          </div>
        </div>
      </div>
    </RoleGate>
  );
}
