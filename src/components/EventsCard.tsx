import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin } from 'lucide-react'

interface Event {
  id: number
  name: string
  date: string
  time: string
  venue: string
  category: string
  price: number
  image: string
}

export default function EventCard({ event, variant = 'default' }: { event: Event; variant?: 'default' | 'list' }) {
  const parts = event.date.split(' ')
  const day = parts[1]?.replace(',', '')
  const month = parts[0]?.slice(0, 3).toUpperCase()

  return (
    <div className=" rounded-xl overflow-hidden card-hover gold-border group relative">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 bg-[#0D0D12] rounded-lg p-2 text-center min-w-[44px]">
          <div className="text-blue-700 text-lg font-bold leading-none">{day}</div>
          <div className="text-white text-[9px] tracking-widest">{month}</div>
        </div>
        <div className="absolute top-3 right-3 bg-blue-700/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs px-2 py-1 rounded">
          {event.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 font-semibold mb-2 leading-tight">{event.name}</h3>
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 text-gray-900 text-xs">
            <Clock size={11} />
            <span>{event.date}, {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-900 text-xs">
            <MapPin size={11} />
            <span>{event.venue}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-400 text-xs">From </span>
            <span className="text-blue-700 font-bold">${event.price}</span>
          </div>
          <Link
            href={`/events/${event.id}`}
            className="bg-blue-700 hover:bg-blue-300 text-white font-semibold text-xs px-4 py-2 rounded transition-colors"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </div>
  )
}
