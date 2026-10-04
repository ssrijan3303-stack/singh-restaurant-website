import React, { useState } from 'react';
import { GalleryItem } from '../types/restaurant';
import { Sparkles, Maximize2, X } from 'lucide-react';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Ambiance', 'Culinary', 'Ganges View', 'Heritage'];

  const filteredItems = galleryItems.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-24 bg-[#0B0A09] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Visual Odyssey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4F0] tracking-tight">
            Visual Experience & Ambiance
          </h2>
          <p className="text-sm sm:text-base text-[#BDB2A2] font-light leading-relaxed">
            Immerse yourself in our candlelit dining salons, master plating artistry, and twilight vistas along the sacred river Ganga.
          </p>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1 rounded-lg bg-[#161210] border border-[#D4AF37]/20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-md text-xs font-medium tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-black font-semibold shadow'
                    : 'text-[#C5B8A5] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative h-72 sm:h-80 rounded-xl overflow-hidden cursor-pointer border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white/80 group-hover:text-[#D4AF37] flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Text Info */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg text-white font-medium">
                  {item.title}
                </h3>
                <p className="text-xs text-[#CBC0B1] font-light line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#14100E] border border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-[60vh] max-h-[500px] w-full bg-black">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-[#161210] border-t border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  {activeLightboxItem.category}
                </span>
                <h3 className="font-serif text-2xl text-white font-medium mt-0.5">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs text-[#CBC0B1] mt-1 max-w-xl">
                  {activeLightboxItem.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
