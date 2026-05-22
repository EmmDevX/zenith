'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import PaymentCard from "@/components/dashboard/PaymentCard";
import { store } from "@/components/dashboard/store";

const STATUSES = ['all', 'completed', 'pending', 'failed', 'refunded'];
const EMPTY = { guest: '', amount: '', method: 'Credit Card', status: 'pending', date: '', reference: '', room: '', type: 'room' };

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const load = () => setPayments(store.payments.getAll());
  useEffect(() => { load(); }, []);

  const filtered = payments.filter(p => {
    const matchStatus = filter === 'all' || p.status === filter;
    const matchSearch = !search || p.guest?.toLowerCase().includes(search.toLowerCase()) || p.reference?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const completed = payments.filter(p => p.status === 'completed');
  const revenue = completed.reduce((s, p) => s + Number(p.amount), 0);
  const pending = payments.filter(p => p.status === 'pending');

  const handleSave = () => {
    store.payments.add({ ...form, amount: Number(form.amount) });
    load(); setModal(false); setForm(EMPTY);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500 mt-0.5">{payments.length} total transactions</p>
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={16} /> Record Payment
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Revenue', value: `$${revenue.toLocaleString()}`, icon: DollarSign, cls: 'text-green-600 bg-green-50' },
          { label: 'Completed', value: completed.length, icon: CheckCircle, cls: 'text-blue-600 bg-blue-50' },
          { label: 'Pending', value: pending.length, icon: Clock, cls: 'text-yellow-600 bg-yellow-50' },
          { label: 'Avg. Transaction', value: completed.length ? `$${Math.round(revenue / completed.length)}` : '$0', icon: TrendingUp, cls: 'text-purple-600 bg-purple-50' },
        ].map(({ label, value, icon: Icon, cls }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`p-2.5 rounded-lg flex-shrink-0 ${cls}`}><Icon size={18} /></div>
            <div><p className="text-xs text-gray-500">{label}</p><p className="font-bold text-gray-900 mt-0.5">{value}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 flex-1">
            <Search size={14} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by guest or reference..." className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {STATUSES.map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-50 px-4">
          {filtered.length === 0
            ? <p className="text-center text-gray-400 text-sm py-10">No payments found</p>
            : filtered.map(p => <PaymentCard key={p.id} payment={p} />)
          }
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Record Payment</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { key: 'guest', label: 'Guest Name', type: 'text' },
                { key: 'amount', label: 'Amount ($)', type: 'number' },
                { key: 'reference', label: 'Reference', type: 'text' },
                { key: 'room', label: 'Room No.', type: 'text' },
                { key: 'date', label: 'Date', type: 'date' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                  <input type={type} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Method</label>
                <select value={form.method} onChange={e => setForm(p => ({ ...p, method: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  {['Credit Card', 'Cash', 'Bank Transfer', 'Online'].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  {STATUSES.filter(s => s !== 'all').map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
