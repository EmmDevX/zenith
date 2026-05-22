import Image from 'next/image'
import Link from 'next/link'
import { Star, Users, BedDouble, Maximize } from 'lucide-react'

interface Room {
  id: number
  name: string
  price: number
  rating: number
  reviews: number
  guests: number
  beds: string
  size: string
  image: string
  type: string
}

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="rounded-xl overflow-hidden card-hover gold-border group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded">
          {room.type}
        </div>
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Star size={10} className="text-white fill-blue-200" />
          {room.rating}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-800 font-semibold">{room.name}</h3>
          <div className="text-right">
            <span className="text-blue-700 font-bold">${room.price}</span>
            <span className="text-gray-400 text-xs">/night</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-400 text-xs mb-4">
          <span className="flex items-center gap-1"><Users size={11} />{room.guests} Guests</span>
          <span className="flex items-center gap-1"><BedDouble size={11} />{room.beds}</span>
          <span className="flex items-center gap-1"><Maximize size={11} />{room.size}</span>
        </div>
        <Link
          href={`/rooms/${room.id}`}
          className="block w-full text-center bg-blue-950/5 hover:bg-blue-700 border border-blue-500/50 hover:border-gray-300 text-blue-600 hover:text-white font-medium text-sm py-2 rounded transition-all duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
