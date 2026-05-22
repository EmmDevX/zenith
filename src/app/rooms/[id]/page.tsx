'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { rooms } from '@/libs/data'
import { Star, Users, BedDouble, Maximize, Wifi, Wind, Tv, Coffee, Wine, ShowerHead, ChevronLeft, ChevronRight } from 'lucide-react'

const amenityIcons: Record<string, React.ReactNode> = {
  'Free WiFi': <Wifi size={16} />,
  'Air Conditioner': <Wind size={16} />,
  'Flat Screen TV': <Tv size={16} />,
  'Mini Bar': <Wine size={16} />,
  'Room Service': <Coffee size={16} />,
  'Bathroom': <ShowerHead size={16} />,
  'Jacuzzi': <ShowerHead size={16} />,
  'Private Pool': <ShowerHead size={16} />,
  'Kids Area': <Users size={16} />,
  'Ocean View': <Wind size={16} />,
  'Private Garden': <Wind size={16} />,
}

export default function RoomDetailPage() {
  const { id } = useParams()
  const room = rooms.find((r) => r.id === Number(id))
  const [currentImg, setCurrentImg] = useState(0)
  const [checkIn, setCheckIn] = useState('2025-05-24')
  const [checkOut, setCheckOut] = useState('2025-05-26')
  const [guests, setGuests] = useState(2)

  if (!room) {
    return (
      <div className="min-h-screen bg-[#0D0D12] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Room Not Found</h2>
          <Link href="/rooms" className="text-[#C9A84C] hover:underline">Back to Rooms</Link>
        </div>
      </div>
    )
  }

  const nights = Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-gray-400 text-xs">
            <Link href="." className="hover:text-">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/rooms" className="hover:text-blue-700">Rooms</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{room.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Images + Details */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="relative h-80 md:h-[420px] rounded-2xl overflow-hidden mb-3 group">
                <Image
                  src={room.images[currentImg]}
                  alt={room.name}
                  fill
                  className="object-cover transition-all duration-500"
                  unoptimized
                />
                <button
                  onClick={() => setCurrentImg((p) => (p - 1 + room.images.length) % room.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentImg((p) => (p + 1) % room.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10  hover:bg-black/80 rounded-full flex items-center justify-center text-blue-900 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2 mb-8">
                {room.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`relative h-20 rounded-xl overflow-hidden transition-all ${currentImg === i ? 'ring-2 ring-[#C9A84C]' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>

              {/* Room Info */}
              <div className=" rounded-2xl p-6 border border-[#2A2A38] mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-serif font-bold text-blue-600 mb-2">{room.name}</h1>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} size={12} className={i <= Math.floor(room.rating) ? 'text-blue-600 fill-blue-500' : 'text-blue-700'} />
                        ))}
                      </div>
                      <span className="text-blue-300 font-semibold text-sm">{room.rating}</span>
                      <span className="text-gray-400 text-xs">({room.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-700 text-2xl font-bold">${room.price}</div>
                    <div className="text-gray-400 text-xs">/night</div>
                  </div>
                </div>

                <div className="flex gap-6 py-4 border-y border-[#2A2A38] mb-4">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Users size={14} className="text-blue-600" />
                    {room.guests} Guests
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <BedDouble size={14} className="text-blue-600" />
                    {room.beds}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Maximize size={14} className="text-blue-600" />
                    {room.size}
                  </div>
                </div>

                <h3 className="text-white font-semibold mb-2">About Room</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{room.description}</p>
              </div>

              {/* Amenities */}
              <div className=" rounded-2xl p-6 border border-[#2A2A38]">
                <h3 className="text-blue-700 font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 bg-white rounded-lg p-3">
                      <div className="text-blue-700">{amenityIcons[amenity] || <Wifi size={16} />}</div>
                      <span className="text-blue-800 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Booking */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl p-6 border border-[#2A2A38] sticky top-20">
                <h3 className="text-blue-700 font-semibold mb-6">Check Availability</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-gray-400 text-xs block mb-2">Check In</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-blue-400 border border-[#2A2A38] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A84C]/50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs block mb-2">Check Out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-blue-400 border border-[#2A2A38] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A84C]/50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs block mb-2">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-blue-400 border border-[#2A2A38] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C9A84C]/50"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-[#2A2A38] py-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">${room.price} × {nights} night{nights > 1 ? 's' : ''}</span>
                    <span className="text-white">${room.price * nights}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Taxes & fees</span>
                    <span className="text-white">${Math.round(room.price * nights * 0.12)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-[#2A2A38] pt-2">
                    <span className="text-white">Total</span>
                    <span className="text-blue-700">${Math.round(room.price * nights * 1.12)}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-700 hover:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors">
                  Book Now
                </button>
                <p className="text-gray-500 text-xs text-center mt-3">Free cancellation up to 48 hours before check-in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
