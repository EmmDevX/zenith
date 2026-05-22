import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoomCard from "@/components/Roomcard";
import EventCard from "@/components/EventsCard";
import { rooms, events } from "@/libs/data";
import {
  Play,
  Star,
  ChevronRight,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Wine,
  Users,
  Search,
  Icon,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="relative min-h-screen  overflow-hidden">
        <div>
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Zenith Hotel"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        {/* Hero Section  */}
        <div className="relative z-10 max-w-7xl ml-5 mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="max-w-4xl ml-16 mt-15">
            <h1 className=" py-5 text-2xl md:text-3xl lg:text-5xl font-sans-serif font-bold text-white leading-tight">
               Where Luxury Meets
              <br />
              <span className="text-white">the Heart of Abeokuta</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              Discover one of the best five-star hotel in Abeokuta
            </p>
            <div className="flex items-center gap-4 flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/rooms"
                className="bg-blue-900 hover:bg-blue-500 font-semibold px-8 py-3 rounded transition-colors"
              >
                Explore Rooms
              </Link>
              <button className=" group flex items-center gap-3 text-white  group-hover:text-blue-500 ">
                <div className="w-10 h-10 rounded-full border border-blue-500 flex items-center justify-center">
                  <Play size={14} className="ml-0.5 text-black font-bold font-xl" />
                </div>
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Booking Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-5xl mx-auto px-4 pb-0 ">
            <div className="bg-[#13131A]/95 backdrop-blur border border-[#2A2A38] rounded-t-2xl px-6 py-5">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                {[
                  { label: "Check In", value: "May 04, 2026" },
                  { label: "Check Out", value: "May 24, 2026" },
                  { label: "Guests", value: "2 Adults · 1 Child" },
                  { label: "Room", value: "1 Room" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-r border-[#2A2A38] last:border-0 pr-4"
                  >
                    <div className="text-gray-400 text-xs mb-1">
                      {item.label}
                    </div>

                    <div className="text-white text-sm font-medium">
                      {item.value}
                    </div>
                  </div>
                ))}

                {/* Search Button */}
                <Link
                  href="/rooms"
                  className="col-span-2 md:col-span-1 w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-500 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-300"
                >
                  <Search size={18} />
                  <span>Search</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Rooms Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" >
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-blue-500 text-xs font-medium tracking-widest uppercase mb-2">Accommodations</p>
            <h2 className="text-3xl font-serif font-bold text-blue-600">Featured Rooms</h2>
            </div>
            <Link href="/rooms" className="flex items-center gap-1 text-blue-700 hover:text-blue-300 text-sm font-medium transition-colors">
            View All Rooms
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white">
            {
              rooms.slice(0,4).map((room) => (
                <RoomCard key={room.id} room={room} />
              ))
            }
          </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-700 text-xs font-medium  tracking-widest uppercase mb-2">Our pecularity</p>
            <h2 className="text-blue-600 text-2xl font-serif font-bold">Why Choose Zenith Hotel & Suites</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" >
            {[
              {icon : Wifi, label: 'Free Wifi'},
              {icon : Wind, label: 'Air Conditioner'},
              {icon: Tv, label: 'Smart Tv with HD Graphics'},
              {icon: Coffee, label: 'Milky coffee to be offered '},
              {icon: Wine, label: 'Mini Bar'},
              {icon: Users, label: 'Concierge'},
              ].map(
                (
                  {icon:Icon, label}) => (
                    <div key={label} className="flex flex-col items-center gap-3 p-4 bg-gray-100 rounded-xl border border-blue-400 hover:border-blue-700/40 transition-colors hover:translate-x-1 translate-y-1">
                      <div className="w-12 h-12  bg-blue-700 rounded-xl flex items-center justify-center">
                        <Icon size={20} className="text-white"></Icon>
                        </div>
                        <span className="text-gray-600 text-center font-bold">{label}</span>
                      </div>
                )
              )
              }
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-blue-700 text-xs font-medium tracking-widest uppercase mb-2">What&apos;s On</p>
              <h2 className="text-2xl font-serif font-bond text-blue-500">Upcoming Events</h2>
            </div>
            <Link href="/events" className="flex items-center gap-1 text-blue-700 hover:text-blue-300 sm:font-medium transition-colors">
            View All Events <ChevronRight size={16} /> </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0,4).map((event) =>(
              <EventCard key={event.id} event={event} />
            )
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="py-14 bg-blue-600 border-y border-blue-300/20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {value: '200+', label: 'Luxury Rooms'},
              {value: '50+', label:'Event Space'},
              {value: '98%', label: 'Guest Satisfaction'},
              {value: '25+', label: 'Years of Excellence'},
            ].map((stat)=>(
              <div key={stat.label} className="py-3 hover:translate-x-2 translate-y-2 cursor-pointer">
                 <div className="text-4xl font-serif font-bold tracking-widest mb-2">{stat.value}</div>
                 <div className="text-sm font-500 tracking-widest uppercase">{stat.label}</div>
                 </div>
            )
            )}
            </div> 
            <div>
              
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-blue-700 text-xs font-medium tracking-widest uppercase mb-2">Taste some Lively Parts of Zenith Hotel & Events</p>
              <h2 className="text-blue-500 text-sm font-serif font-bold">Zenith Hotel Gallery</h2>
            </div>
            <Link href="/gallery" className="flex items-center gap-2 text-blue-700 hover:text-blue-300">
            View All<ChevronRight size={16}/>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {
              [
                {src:'https://images.unsplash.com/photo-1530440516251-9ced1fd5e76e?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall:false},
                {src:'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=449&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall:false},
                {src: 'https://images.unsplash.com/photo-1602081115720-72e5b0a254b8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall: false},
                {src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall: false},
                {src:'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=889&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall:false},
                {src:'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall:false},
                {src: 'https://images.unsplash.com/photo-1590675560125-0d832b9d719e?q=80&w=389&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall: false},
                {src: 'https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall: false},
                {src:'https://images.unsplash.com/photo-1631049422186-4b0569fed517?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall:false},
                {src:'https://images.unsplash.com/photo-1572177215152-32f247303126?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall:false},
                {src: 'https://images.unsplash.com/photo-1631901589746-219fcffbdd29?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall: false},
                {src: 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall: false},
                {src:'https://plus.unsplash.com/premium_photo-1698505302151-b205d6484ba2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall:false},
                {src:'https://images.unsplash.com/photo-1660557989695-14fac79c086d?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall:false},
                {src: 'https://plus.unsplash.com/premium_photo-1682089290752-2bd553508b29?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall: false},
                {src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall: false},
                {src:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall:false},
                {src:'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall:false},
                {src: 'https://plus.unsplash.com/premium_photo-1677687191072-8b3156d30888?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall: false},
                {src: 'https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', tall: false},
              ].map((img,i) => (
                <div key={i} className={`relative overflow-hidden rounded-sm ${img.tall ? 'row-span-2' : ''} h-48 md:h-56 group`}>
                  <Image src={img.src} alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-500 unoptimized"/>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                  </div>
              ))}
          </div>
          </section>

      <Footer />
    </main>
  );
}
