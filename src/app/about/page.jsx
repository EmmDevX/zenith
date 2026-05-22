"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gem, UtensilsCrossed, CalendarDays, HeartHandshake, } from "lucide-react";
import { motion } from "framer-motion";

export default function aboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
          <div className="relative h-64 overflow-hidden">
               <Image
                 src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80"
                 alt="Gallery"
                 fill
                 className="object-cover"
                 unoptimized
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#0D0D12]" />
               <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">
                 <div className="text-gray-400 text-xs mb-2">
                   <span>Home</span>
                   <span className="mx-2">/</span>
                   <span className="text-white">About Us</span>
                 </div>
                 <h1 className="text-4xl font-serif font-bold text-white">About Us</h1>
               </div>
             </div>
             <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1637730827702-de34e9ae4ede?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <p className="text-[#C9A84C] uppercase tracking-[0.3em] text-sm mb-6">
              About Us
            </p>

            <h1 className="text-6xl font-serif leading-tight mb-8">
              Redefining <span className="text-[#C9A84C]">Luxury.</span>
              <br />
              Creating Memories.
            </h1>

            <p className="text-gray-300 text-lg leading-8 mb-10">
              At Zenith Hotel & Events, we blend world-class hospitality
              with elegant comfort; creating unforgettable experiences
              for every guest.
            </p>

            <button className="border border-[#C9A84C] text-[#C9A84C] px-8 py-4 rounded-2xl hover:bg-[#C9A84C] hover:text-black transition-all">
              Discover Our Story
            </button>

          </div>

          {/* IMAGE */}
          <div>
            <img
              src="https://plus.unsplash.com/premium_photo-1674815329400-f17578e2b03b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="rounded-[32px] border border-white/10"
            />
          </div>

        </div>
      </section>

      {/* STORY */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          <img
            src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="rounded-[32px] border border-white/10"
          />

          <div>

            <p className="text-[#C9A84C] uppercase tracking-[0.3em] text-sm mb-6">
              Our Story
            </p>

            <h2 className="text-5xl font-serif mb-8">
              Driven by Passion.
              <br />
              Defined by Excellence.
            </h2>

            <p className="text-gray-400 leading-8 mb-12">
              Founded with a vision to set a new standard in hospitality,
              Zenith Hotel & Events has become a destination where luxury
              meets genuine care.
            </p>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="flex gap-4">
                <Gem className="text-[#C9A84C]" />
                <div>
                  <h3 className="text-xl mb-2">Luxury Redefined</h3>
                  <p className="text-gray-400">
                    Premium comfort and elegance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <HeartHandshake className="text-[#C9A84C]" />
                <div>
                  <h3 className="text-xl mb-2">Exceptional Service</h3>
                  <p className="text-gray-400">
                    Unforgettable guest experiences.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <UtensilsCrossed className="text-[#C9A84C]" />
                <div>
                  <h3 className="text-xl mb-2">Fine Dining</h3>
                  <p className="text-gray-400">
                    Culinary excellence every day.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CalendarDays className="text-[#C9A84C]" />
                <div>
                  <h3 className="text-xl mb-2">Events</h3>
                  <p className="text-gray-400">
                    Beautiful weddings and conferences.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="px-6 pb-24">

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">

          {[
            ["120+", "Luxury Rooms"],
            ["50K+", "Happy Guests"],
            ["4.9", "Guest Rating"],
            ["200+", "Events Hosted"],
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-[28px] p-10 text-center"
            >
              <h2 className="text-5xl text-[#C9A84C] font-bold mb-4">
                {item[0]}
              </h2>

              <p className="text-gray-300 text-lg">
                {item[1]}
              </p>
            </div>
          ))}

        </div>

      </section>

    </div>
             
    

      <Footer />
    </div>
  );
}
