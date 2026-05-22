'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import RoleGate from "@/components/staff/RoleGate";
import TaskCard from "@/components/staff/TaskCard";
import { store } from "@/components/staff/store";
import { useRole } from "@/components/staff/RoleProvider";

const TYPES = ['cleaning', 'maintenance', 'restocking', 'event', 'catering'];
const PRIORITIES = ['high', 'medium', 'low'];
const EMPTY = { title: '', room: '', type: 'cleaning', priority: 'medium', status: 'pending', assignee: '', dueDate: '', notes: '' };

export default function TasksPage() {
  const { role } = useRole();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const load = () => setTasks(store.tasks.getAll());
  useEffect(() => { load(); }, []);

  const filtered = tasks.filter(t => filter === 'all' || t.status === filter);
  const pending   = tasks.filter(t => t.status === 'pending').length;
  const inProg    = tasks.filter(t => t.status === 'in_progress').length;
  const done      = tasks.filter(t => t.status === 'done').length;

  const handleStatus = (id, status) => { store.tasks.update(id, { status }); load(); };
  const handleDelete = (id) => { if (confirm('Remove task?')) { store.tasks.remove(id); load(); } };
  const handleAdd    = () => { store.tasks.add(form); load(); setModal(false); setForm(EMPTY); };

  return (
    <RoleGate section="tasks">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-sm text-gray-500 mt-0.5">Track and update your assigned tasks</p>
          </div>
          {(role === 'manager') && (
            <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Plus size={16} /> Add Task
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { label: 'Pending',     count: pending, color: 'text-yellow-600' },
            { label: 'In Progress', count: inProg,  color: 'text-blue-600'  },
            { label: 'Done',        count: done,    color: 'text-green-600' },
          ].map(({ label, count, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <p className={`text-2xl font-bold ${color}`}>{count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          {['all', 'pending', 'in_progress', 'done'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}
            >{f.replace('_', ' ')}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(t => (
            <TaskCard key={t.id} task={t} onStatusChange={handleStatus} onDelete={role === 'manager' ? handleDelete : null} />
          ))}
          {filtered.length === 0 && <p className="col-span-3 text-center text-gray-400 text-sm py-10">No tasks found</p>}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Add Task</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              {[{ key: 'title', label: 'Task Title', type: 'text' }, { key: 'room', label: 'Room / Location', type: 'text' }, { key: 'assignee', label: 'Assignee', type: 'text' }, { key: 'dueDate', label: 'Due Date', type: 'date' }, { key: 'notes', label: 'Notes', type: 'text' }].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                  <input type={type} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Priority</label>
                  <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Add Task</button>
            </div>
          </div>
        </div>
      )}
    </RoleGate>
  );
}
