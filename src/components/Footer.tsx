import Link from 'next/link'
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-[#2A2A38] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-slate-500 rounded-sm flex items-center justify-center">
                         <Image
                     src="/zenith.png"
                     alt="Logo"
                     width={120}
                     height={120}
                     className="object-cover"
                   />
              </div>
              <div>
                <div className="text-white font-semibold text-sm leading-none">ZENITH</div>
                <div className="text-slate-500 text-[9px] tracking-widest leading-none">HOTEL & EVENTS</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience one of the best hotel in Nigeria
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Rooms', 'Events', 'Gallery', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : item === 'Rooms' ? '/rooms' : item === 'Events' ? '/events' : item === 'Gallery' ? '/gallery' : '#'} className="text-gray-400 hover:text-[#17507e] text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {['Room Booking', 'Event Tickets', 'Fine Dining', 'Spa & Wellness', 'Airport Transfer', 'Concierge'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm hover:text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Block B, Adjacent to Ogun State Secratariat </li>
              <li>Oke-Mosan, Abeokuta</li>
              <li className="mt-3">+234 (702) 545-0100</li>
              <li>info@zenithhotels.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A2A38] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 Zenith Hotel & Events. All rights reserved.</p>
         <div className="flex gap-6">
  {[
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Staff Portal", href: "/staff" },
    { name: "Admin Portal", href: "/admin" },
  ].map((item) => (
    <Link
      key={item.name}
      href={item.href}
      className="text-gray-500 hover:text-slate-600 text-sm transition-colors"
    >
      {item.name}
    </Link>
  ))}
</div>
  
        </div>
      </div>
    </footer>
  )
}
