"use client";
import { useState } from "react";
import Image from "next/image";
import {
  BedDouble,
  Calendar,
  Bell,
  MessageCircle,
  LogOut,
  CreditCard,
  LayoutDashboard,
  Settings,
  Star,
  Ticket,
  Users,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", href="" },
  { icon: BedDouble, label: "Rooms", id: "rooms" },
  { icon: Calendar, label: "Bookings", id: "bookings" },
  { icon: Ticket, label: "Events", id: "events" },
  { icon: Users, label: "Staffs", id: "Staffs" },
  { icon: CreditCard, label: "Payments", id: "payments" },
  { icon: Star, label: "Reviews", id: "reviews" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const date = new Date();

  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });

  const year = date.getFullYear();
  const dayNumber = date.getDate();

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";

    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  

  const formattedDate = `${day}, ${dayNumber}${getOrdinal(dayNumber)} ${month} ${year}`;
   const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  return (
    <main
      style={{
        backgroundColor: "white",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* Admin Dashboard App */}
      <div className="min-h-screen flex">
        {/* Side-bar Component */}
        <div className="w-54 shrink-0 bg-white border-r border-blue-600 min-h-screen fixed left-0 top-0 z-40">
          <div className="p-1 border-b border-blue-500 px-4 mx-auto hover:text-3xl text-blue-300">
            <div className="flex items-center gap-0 py-4">
              <div className="w-15 h-15 rounded-sm flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={190}
                  height={190}
                  className=" mx-auto py-3 object-cover"
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="text-blue-700 font-bold text-[18px] hover:text-blue-300">
                  Zenith Admin
                </div>
              </div>
            </div>
          </div>
          {/* Navigation Links */}

          <nav className="p-3">
            {navItems.map(({ icon: Icon, label, id }) => (
              <button
                key={id}
                onClick={() => setActiveNav(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors mb-0.5 ${
                  activeNav === id
                    ? "bg-blue-700/10 text-blue-700 border border-blue-400/30"
                    : "text-blue-600 hover:text-white hover:bg-blue-700"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </nav>
          <div className=" absolute bottom-4 w-full  items-center gap-2 px-6 py-2.5 ">
            <Link
              href="/"
              className="block text-center text-gray-500 text-xs hover:text-gray-300 bg-blue-600 rounded-sm items-center justify-center text-white transition-colors py-2 px-4"
            >
              <LogOut
                size={14}
                className=" bottom -4  absolute flex justify-between"
              />
              Logout
            </Link>
          </div>
        </div>

        {/*Main Body */}
        <div className="ml-54 flex-1 p-6 min-h-screen">
          <div className="mb-6 flex justify-between">
            <div>
              <h1 className="text-xl font-serif font-bold text-zinc-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 text-xs">{formattedDate}</p>
            </div>
            <div className="flex gap-3">
              <div className="w-9 h-9  bg-slate-300 flex items-center justify-center rounded-sm  hover:translate-y-1">
                <Bell
                  size={20}
                  className= "  text-blue-700 text-xs text-semibold"
                />

                {showNotifications && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "0",
              width: "250px",
              background: "white",
              color: "gray",
              borderRadius: "12px",
              padding: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              zIndex: 100,
            }}
          >
            <div className="text-gray-300" >
                 <h4>Notifications</h4>
            <p>New assignment uploaded</p>
            <p>Your subscription expires soon</p>
            <p>Study reminder</p>
              </div>
         
          </div>
        )}
              </div>
              <div className="w-9 h-9 rounded-sm  bg-slate-300 flex items-center justify-center  hover:translate-y-1" onClick={() => {
            setShowMessages(!showMessages);
            setShowNotifications(false);
          }}>
                <MessageCircle size={20} className="text-blue-700 text-xs text-semibold " />
                 {showMessages && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "0",
              width: "250px",
              background: "white",
              color: "gray",
              borderRadius: "12px",
              padding: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              zIndex: 100,
            }}
          >
            <h4>Messages</h4>
            <p>John: Are you joining class?</p>
            <p>Sarah: Meeting starts soon</p>
            <p>Admin: Welcome back!</p>
          </div>
        )}
              </div>
            </div>
          </div>

          {/* Name Section */}
          <div className="flex">
             <div className="bg-blue-600 rounded-sm p-8">
            <h2>Hello</h2>
            <p>View the Hotel Dashboard to track bookings and payments</p>
            <div>
              <button>
                Bookings
              </button>
            </div>
          </div>

          <div>

          </div>
          </div>
         
        </div>

        {/* Right-side Nav */}
        <div className="w-60 border-l border-blue-400">
          <div>
            <h3 className="text-black">Hello</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
