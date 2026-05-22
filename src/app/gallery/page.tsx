'use client'
import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { galleryImages } from '@/libs/data'
import { X } from 'lucide-react'

const categories = ['All', 'Hotel', 'Rooms', 'Pool', 'Dining', 'Spa', 'Events', 'Bar']

export default function GalleryPage() {
  const [selected, setSelected] = useState('All')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = selected === 'All' ? galleryImages : galleryImages.filter((g) => g.category === selected)

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
            <span className="text-white">Gallery</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white">Hotel Gallery</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-2 flex-wrap mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                selected === cat
                  ? 'bg-blue-700 text-black'
                  : 'bg-gray-300 border border-[#2A2A38] text-gray-400 hover:border-[#C9A84C]/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              onClick={() => setLightbox(img.src)}
              className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
            >
              <Image
                src={img.src}
                alt={img.title}
                width={600}
                height={400}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <div className="text-white font-medium text-sm">{img.title}</div>
                  <div className="text-[#C9A84C] text-xs">{img.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No images in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-[#C9A84C]" onClick={() => setLightbox(null)}>
            <X size={28} />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox} alt="Gallery" fill className="object-contain" unoptimized />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
