'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { events } from '@/libs/data'
import { Calendar, Clock, MapPin, Minus, Plus, Star } from 'lucide-react'

const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const seatsPerRow = 12

type SeatStatus = 'available;'| 'vip;' | 'selected;' | 'sold;'

function generateSeats(): Record<string, SeatStatus> {
  const seats: Record<string, SeatStatus> = {}
  seatRows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const key = `${row}${i}`
      if (row === 'A' || row === 'B') seats[key] = 'vip'
      else if (Math.random() < 0.25) seats[key] = 'sold'
      else seats[key] = 'available'
    }
  })
  return seats
}

const initialSeats = generateSeats()

export default function EventDetailPage() {
  const { id } = useParams()
  const event = events.find((e) => e.id === Number(id))
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [seats, setSeats] = useState(initialSeats)
  const [selectedTicketType, setSelectedTicketType] = useState(0)

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0D0D12] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Event Not Found</h2>
          <Link href="/events" className="text-[#C9A84C] hover:underline">Back to Events</Link>
        </div>
      </div>
    )
  }

  const updateQty = (type: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [type]: Math.max(0, (prev[type] || 0) + delta) }))
  }

  const toggleSeat = (key: string) => {
    setSeats((prev) => {
      if (prev[key] === 'sold') return prev
      if (prev[key] === 'selected') return { ...prev, [key]: 'available' }
      if (prev[key] === 'available') return { ...prev, [key]: 'selected' }
      if (prev[key] === 'vip') return { ...prev, [key]: 'selected' }
      return prev
    })
  }

  const totalQty = Object.values(quantities).reduce((a, b) => a + b, 0)
  const totalPrice = event.ticketTypes.reduce((sum, tt) => sum + tt.price * (quantities[tt.type] || 0), 0)

  const seatColor = (status: SeatStatus) => {
    if (status === 'vip') return 'bg-[#C9A84C] border-[#C9A84C]'
    if (status === 'selected') return 'bg-green-500 border-green-500'
    if (status === 'sold') return 'bg-gray-700 border-gray-700 cursor-not-allowed opacity-50'
    return 'bg-[#1A1A24] border-[#2A2A38] hover:border-[#C9A84C]/60 cursor-pointer'
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-gray-400 text-xs mb-6">
            <Link href="/" className="hover:text-[#C9A84C]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/events" className="hover:text-[#C9A84C]">Events</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{event.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image src={event.image} alt={event.name} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#C9A84C] text-black text-xs font-semibold px-2 py-1 rounded">{event.category}</span>
                </div>
              </div>

              <div className="bg-[#13131A] rounded-2xl p-6 border border-[#2A2A38]">
                <h1 className="text-2xl font-serif font-bold text-white mb-4">{event.name}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar size={14} className="text-[#C9A84C]" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock size={14} className="text-[#C9A84C]" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin size={14} className="text-[#C9A84C]" />
                    {event.venue}
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
              </div>

              {/* Ticket Types */}
              <div className="bg-[#13131A] rounded-2xl p-6 border border-[#2A2A38]">
                <h3 className="text-white font-semibold mb-4">Ticket Types</h3>
                <div className="space-y-3">
                  {event.ticketTypes.map((tt, i) => (
                    <div
                      key={tt.type}
                      onClick={() => setSelectedTicketType(i)}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedTicketType === i ? 'border-[#C9A84C] bg-[#C9A84C]/5' : 'border-[#2A2A38] hover:border-[#C9A84C]/40'
                      }`}
                    >
                      <div>
                        <div className="text-white text-sm font-medium">{tt.type}</div>
                        <div className="text-gray-400 text-xs">{tt.available} available</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#C9A84C] font-bold">${tt.price}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); updateQty(tt.type, -1) }} className="w-7 h-7 rounded-full bg-[#2A2A38] hover:bg-[#C9A84C] hover:text-black flex items-center justify-center transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="text-white text-sm w-6 text-center">{quantities[tt.type] || 0}</span>
                          <button onClick={(e) => { e.stopPropagation(); updateQty(tt.type, 1) }} className="w-7 h-7 rounded-full bg-[#2A2A38] hover:bg-[#C9A84C] hover:text-black flex items-center justify-center transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seat Selection */}
              <div className="bg-[#13131A] rounded-2xl p-6 border border-[#2A2A38]">
                <h3 className="text-white font-semibold mb-4">Seat Selection</h3>
                <div className="bg-[#0D0D12] rounded-xl p-4 mb-4">
                  <div className="w-full h-6 bg-[#C9A84C]/30 rounded mb-6 flex items-center justify-center">
                    <span className="text-[#C9A84C] text-xs font-medium tracking-widest">STAGE</span>
                  </div>
                  <div className="space-y-2 overflow-x-auto">
                    {seatRows.map((row) => (
                      <div key={row} className="flex items-center gap-1.5">
                        <span className="text-gray-500 text-xs w-4 shrink-0">{row}</span>
                        <div className="flex gap-1">
                          {Array.from({ length: seatsPerRow }, (_, i) => {
                            const key = `${row}${i + 1}`
                            const status = seats[key]
                            return (
                              <button
                                key={key}
                                onClick={() => toggleSeat(key)}
                                className={`w-5 h-5 rounded-sm border text-[8px] transition-all ${seatColor(status as SeatStatus)}`}
                                disabled={status === 'sold'}
                              />
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { color: 'bg-[#C9A84C]', label: 'VIP' },
                    { color: 'bg-green-500', label: 'Selected' },
                    { color: 'bg-[#1A1A24] border border-[#2A2A38]', label: 'Regular' },
                    { color: 'bg-gray-700 opacity-50', label: 'Sold' },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-sm ${l.color}`} />
                      <span className="text-gray-400 text-xs">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#13131A] rounded-2xl p-6 border border-[#2A2A38] sticky top-20">
                <h3 className="text-white font-semibold mb-6">Order Summary</h3>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2A2A38]">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                    <Image src={event.image} alt={event.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{event.name}</div>
                    <div className="text-gray-400 text-xs">{event.date}, {event.time}</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {event.ticketTypes.map((tt) => quantities[tt.type] > 0 && (
                    <div key={tt.type} className="flex justify-between text-sm">
                      <span className="text-gray-400">{tt.type} × {quantities[tt.type]}</span>
                      <span className="text-white">${tt.price * quantities[tt.type]}</span>
                    </div>
                  ))}
                  {totalQty === 0 && <p className="text-gray-500 text-xs">No tickets selected</p>}
                </div>

                {totalQty > 0 && (
                  <div className="border-t border-[#2A2A38] pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Total ({totalQty} tickets)</span>
                      <span className="text-[#C9A84C] font-bold">${totalPrice}</span>
                    </div>
                  </div>
                )}

                <button
                  disabled={totalQty === 0}
                  className="w-full bg-[#C9A84C] hover:bg-[#E2C278] disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-colors"
                >
                  Continue to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
