'use client'
import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RoomCard from '@/components/Roomcard'
import { rooms } from '@/libs/data'
import { Search, SlidersHorizontal } from 'lucide-react'

const types = ['All', 'Deluxe', 'Suite', 'Presidential', 'Family', 'Villa']

export default function RoomsPage() {
  const [selected, setSelected] = useState('All')
  const [search, setSearch] = useState('')
  const [priceRange, setPriceRange] = useState(500)

  const filtered = rooms.filter((r) => {
    const matchType = selected === 'All' || r.type === selected
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchPrice = r.price <= priceRange
    return matchType && matchSearch && matchPrice
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Hero */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80"
          alt="Rooms"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0D0D12]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">
          <div className="text-gray-400 text-xs mb-2">
            <span className="hover:text-blue-700 cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="text-white">Terms and Conditions</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white">Ours Terms</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className=" rounded-xl p-6 border border-blue-700 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search rooms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full  border  rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-600/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelected(t)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    selected === t
                      ? 'bg-blue-700 text-black'
                      : 'bg-blue-600 border border-blue-600 text-white hover:border-[#C9A84C]/40 hover:text-blue-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <SlidersHorizontal size={16} className="text-gray-400" />
              <div>
                <div className="text-gray-400 text-xs mb-1">Max Price: <span className="text-blue-700">${priceRange}</span></div>
                <input
                  type="range"
                  min={50}
                  max={500}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-32 accent-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-6">{filtered.length} room{filtered.length !== 1 ? 's' : ''} found</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No rooms match your criteria.</p>
            <button onClick={() => { setSelected('All'); setSearch(''); setPriceRange(500) }} className="mt-4 text-[#C9A84C] hover:underline text-sm">Clear filters</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
