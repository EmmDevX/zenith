'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-50/90 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8  rounded-sm flex items-center justify-center">
               <Image
    src="/zenith.png"
    alt="Logo"
    width={100}
    height={100}
    className="object-cover"
  />
            </div>
            <div>
              <div className="text-blue-900 font-semibold text-sm leading-none">ZENITH</div>
              <div className="text-slate-500 text-[9px] tracking-widest leading-none">HOTEL & EVENTS</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Rooms', 'Events', 'Contact', 'About',  'Dining', ].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : item === 'Rooms' ? '/rooms' : item === 'Events' ? '/events' :  item === 'Contact' ? '/contact' : item === 'About' ? '/about' :  item === 'Dining' ? '/gallery':'#'}
                className="group relative text-slate-800 hover:text-blue-900"
              >
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
                {item}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
       
            <Link href="/rooms" className="bg-blue-700 hover:bg-slate-500 text-white font-semibold text-sm px-5 py-2 rounded transition-colors">
              Book Now
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-[#2A2A38] space-y-3">
            {['Home', 'Rooms', 'Events', 'Gallery', 'Dashboard', 'Admin'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="block text-slate-800 hover:text-slate-500 text-sm py-2"
                onClick={() => setOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link href="/rooms" className="block bg-slate-800 text-slate-500 font-semibold text-sm px-5 py-2 rounded text-center mt-2">
              Book Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
