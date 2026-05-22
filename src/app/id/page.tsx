'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { adminStats, revenueData, bookingsByType } from '@/libs/data'
import {
  LayoutDashboard,
  BedDouble,
  Calendar,
  Ticket,
  Users,
  CreditCard,
  Star,
  Settings,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { motion } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: BedDouble, label: 'Rooms', id: 'rooms' },
  { icon: Calendar, label: 'Bookings', id: 'bookings' },
  { icon: Ticket, label: 'Events', id: 'events' },
  { icon: Users, label: 'Users', id: 'users' },
  { icon: CreditCard, label: 'Payments', id: 'payments' },
  { icon: Star, label: 'Reviews', id: 'reviews' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

function StatCard({ label, value, change, positive, prefix = '' }: {
  label: string; value: string | number; change: number; positive: boolean; prefix?: string
}) {
  return (
    <div className="bg-[#13131A] rounded-xl p-5 border border-[#2A2A38]">
      <div className="text-gray-400 text-xs mb-2">{label}</div>
      <div className="text-white text-2xl font-bold mb-2">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div className={`flex items-center gap-1 text-xs ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        +{change}% from last month
      </div>
    </div>
  )
}

const recentBookings = [
  { id: '#BK-1024', guest: 'Sarah Johnson', room: 'Executive Suite', checkIn: 'May 24', checkOut: 'May 26', amount: 440, status: 'Confirmed' },
  { id: '#BK-1023', guest: 'Michael Chen', room: 'Presidential Suite', checkIn: 'May 23', checkOut: 'May 27', amount: 1800, status: 'Confirmed' },
  { id: '#BK-1022', guest: 'Emma Williams', room: 'Deluxe Room', checkIn: 'May 22', checkOut: 'May 24', amount: 240, status: 'Checked In' },
  { id: '#BK-1021', guest: 'James Brown', room: 'Family Room', checkIn: 'May 21', checkOut: 'May 23', amount: 360, status: 'Checked Out' },
  { id: '#BK-1020', guest: 'Olivia Davis', room: 'Ocean View Suite', checkIn: 'May 20', checkOut: 'May 22', amount: 640, status: 'Checked Out' },
]

const statusColor: Record<string, string> = {
  'Confirmed': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'Checked In': 'bg-green-500/10 text-green-400 border-green-500/30',
  'Checked Out': 'bg-gray-500/10 text-gray-400 border-gray-500/30',
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A24] border border-[#2A2A38] rounded-lg p-3">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-[#C9A84C] font-bold text-sm">${payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function AdminPage() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="min-h-screen bg-[#0D0D12] flex">
      {/* Sidebar */}
      <div className="w-56 shrink-0 bg-[#0A0A0F] border-r border-[#2A2A38] min-h-screen fixed left-0 top-0 z-40">
        <div className="p-5 border-b border-[#2A2A38]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#C9A84C] rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs">Z</span>
            </div>
            <div>
              <div className="text-white font-semibold text-xs leading-none">ZENITH</div>
              <div className="text-[#C9A84C] text-[8px] tracking-widest leading-none">ADMIN PANEL</div>
            </div>
          </div>
        </div>
        <nav className="p-3">
          {navItems.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors mb-0.5 ${
                activeNav === id
                  ? 'bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30'
                  : 'text-gray-400 hover:text-white hover:bg-[#13131A]'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <Link href="/" className="block text-center text-gray-500 text-xs hover:text-[#C9A84C] transition-colors py-2">
            ← Back to Website
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="ml-56 flex-1 p-6 min-h-screen">
        <div className="mb-6">
          <h1 className="text-xl font-serif font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 text-xs">Welcome back. Here&apos;s what&apos;s happening today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Bookings" value={adminStats.totalBookings} change={adminStats.bookingsChange} positive />
          <StatCard label="Total Revenue" value={adminStats.totalRevenue} change={adminStats.revenueChange} positive prefix="$" />
          <StatCard label="Rooms Occupied" value={`${adminStats.roomsOccupied}%`} change={adminStats.occupancyChange} positive />
          <StatCard label="Events This Month" value={adminStats.eventsThisMonth} change={adminStats.eventsChange} positive />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-[#13131A] rounded-2xl p-5 border border-[#2A2A38]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">Revenue Overview</h3>
              <select className="bg-[#0D0D12] border border-[#2A2A38] rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none">
                <option>This Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A38" />
                <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1a36d8"
                  strokeWidth={2.5}
                  dot={{ fill: '#077230', r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#c70c79' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-[#13131A] rounded-2xl p-5 border border-[#2A2A38]">
            <h3 className="text-white font-semibold mb-5">Bookings by Type</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={bookingsByType}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {bookingsByType.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  formatter={(value) => <span style={{ color: '#1952b4', fontSize: 11 }}>{value}</span>}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ background: '#1b241a', border: '1px solid #2A2A38', borderRadius: 8 }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-[#13131A] rounded-2xl border border-[#2A2A38] overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-[#2A2A38]">
            <h3 className="text-white font-semibold">Recent Bookings</h3>
            <button className="text-[#C9A84C] text-xs hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2A38]">
                  {['Booking ID', 'Guest', 'Room', 'Check In', 'Check Out', 'Amount', 'Status'].map((h) => (
                    <th key={h} className="text-left text-gray-400 text-xs font-medium px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-[#2A2A38]/50 hover:bg-[#1A1A24] transition-colors">
                    <td className="px-5 py-4 text-[#C9A84C] text-xs font-medium">{b.id}</td>
                    <td className="px-5 py-4 text-white text-xs">{b.guest}</td>
                    <td className="px-5 py-4 text-gray-300 text-xs">{b.room}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs">{b.checkIn}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs">{b.checkOut}</td>
                    <td className="px-5 py-4 text-white text-xs font-medium">${b.amount}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColor[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
