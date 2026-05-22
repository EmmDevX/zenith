"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock3, ArrowRight,} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section>
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
              <span className="text-white">Contact Us</span>
            </div>
           
          </div>
          </div>
              <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT */}
          <div>
            <p className="text-[#C9A84C] uppercase tracking-[0.3em] text-sm mb-6">
              Contact Us
            </p>

            <h1 className="text-6xl font-serif leading-tight mb-8">
              Get In <span className="text-[#C9A84C]">Touch</span>
            </h1>

            <p className="text-gray-300 text-lg leading-8 mb-12 max-w-xl">
              We'd love to hear from you. Whether you have a question
              about our rooms, events, or services, our team is ready
              to assist you.
            </p>

            <div className="grid md:grid-cols-2 gap-6">

              {/* CARD */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <Phone className="text-[#C9A84C] mb-5" size={34} />

                <h3 className="text-2xl font-serif mb-4">
                  Phone
                </h3>

                <p className="text-gray-300 leading-8">
                  +234 901 234 5678
                  <br />
                  +234 803 456 7890
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <Mail className="text-[#C9A84C] mb-5" size={34} />

                <h3 className="text-2xl font-serif mb-4">
                  Email
                </h3>

                <p className="text-gray-300 leading-8">
                  reservations@zenithhotel.com
                  <br />
                  info@zenithhotel.com
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <MapPin className="text-[#C9A84C] mb-5" size={34} />

                <h3 className="text-2xl font-serif mb-4">
                  Location
                </h3>

                <p className="text-gray-300 leading-8">
                  Zenith Hotel & Events
                  <br />
                  Victoria Island,
                  <br />
                  Lagos, Nigeria
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <Clock3 className="text-[#C9A84C] mb-5" size={34} />

                <h3 className="text-2xl font-serif mb-4">
                  Working Hours
                </h3>

                <p className="text-gray-300 leading-8">
                  Monday - Sunday
                  <br />
                  24 Hours
                </p>
              </div>

            </div>
          </div>

          {/* FORM */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-sm">

            <h2 className="text-5xl font-serif mb-10">
              Send Us a Message
            </h2>

            <form className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                />

              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none"
              />

              <textarea
                rows="7"
                placeholder="Your Message"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none resize-none"
              />

              <button className="bg-[#C9A84C] hover:bg-[#b9973e] text-black px-10 py-5 rounded-2xl font-semibold flex items-center gap-4 transition-all">
                Send Message
                <ArrowRight size={20} />
              </button>

            </form>
          </div>

        </div>
      </section>
      {/* MAP SECTION */}
<section className="px-6 pb-24">
  <div className="max-w-7xl mx-auto">

    <div className="rounded-[32px] overflow-hidden border border-white/10">

      <iframe
        src="https://maps.google.com/maps?q=Oke-Mosan,Abeokuta,Nigeria&z=15&output=embed"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

    </div>

  </div>
</section>

    </div>

         
         
          
      </section>

      <Footer />
    </div>
  );
}
