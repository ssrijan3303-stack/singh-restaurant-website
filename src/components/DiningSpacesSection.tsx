import React, { useState } from 'react';
import { DiningSpace } from '../types/restaurant';
import { Clock, Users, Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface DiningSpacesSectionProps {
  spaces: DiningSpace[];
  onSelectSpaceForBooking: (spaceId: string) => void;
}

export const DiningSpacesSection: React.FC<DiningSpacesSectionProps> = ({
  spaces,
  onSelectSpaceForBooking,
}) => {
  const [activeSpaceId, setActiveSpaceId] = useState(spaces[0]?.id || 'grand-dining-room');

  const currentSpace = spaces.find((s) => s.id === activeSpaceId) || spaces[0];

  return (
    <section id="spaces" className="py-24 bg-[#0E0C0B] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3A2A1A]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Three Distinctive Sanctuaries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4F0] tracking-tight">
            Curated Dining Experiences
          </h2>
          <p className="text-sm sm:text-base text-[#BDB2A2] font-light leading-relaxed">
            From the gilded splendor of our palatial hall to the starlit serenity of the Ganges terrace, every space offers a bespoke dimension of Varanasi luxury.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-lg bg-[#181412] border border-[#D4AF37]/20 shadow-inner">
            {spaces.map((space) => (
              <button
                key={space.id}
                onClick={() => setActiveSpaceId(space.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-md text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
                  activeSpaceId === space.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black shadow-md font-semibold'
                    : 'text-[#C5B8A5] hover:text-white hover:bg-white/5'
                }`}
              >
                {space.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Space Spotlight Feature */}
        {currentSpace && (
          <div className="glass-card rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-2xl transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image Frame with Scrim and Badges */}
              <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[500px]">
                <img
                  src={currentSpace.image}
                  alt={currentSpace.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120F0D] via-transparent to-black/30" />

                {/* Status and Capacity Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] rounded">
                    {currentSpace.isAvailable ? 'Reservations Open' : 'Private Function Only'}
                  </span>
                  <span className="text-[11px] font-medium px-3 py-1 bg-black/60 backdrop-blur-md text-[#E0D7C9] rounded flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-[#D4AF37]" />
                    Capacity: {currentSpace.capacity} Guests
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-serif italic text-lg sm:text-xl text-[#F2ECE1]">
                    "{currentSpace.atmosphere}"
                  </p>
                </div>
              </div>

              {/* Space Information & Details Column */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#161210] to-[#0E0C0B]">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                      {currentSpace.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FAF6F0]">
                      {currentSpace.name}
                    </h3>
                  </div>

                  <p className="text-sm text-[#C9BFB1] leading-relaxed font-light">
                    {currentSpace.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                      Signature Elements:
                    </h4>
                    <div className="space-y-2">
                      {currentSpace.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2.5 text-xs text-[#D8CFBF]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata Specs */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-white/40 block text-[10px] uppercase tracking-wider">Service Hours</span>
                      <span className="text-[#E0D7C9] font-medium flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        {currentSpace.timings}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px] uppercase tracking-wider">Dress Code</span>
                      <span className="text-[#E0D7C9] font-medium flex items-center gap-1 mt-0.5">
                        <Compass className="w-3 h-3 text-[#D4AF37]" />
                        {currentSpace.dressCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action for this Space */}
                <div className="pt-4">
                  <button
                    onClick={() => onSelectSpaceForBooking(currentSpace.id)}
                    className="w-full py-3.5 px-6 rounded text-xs font-semibold uppercase tracking-[0.15em] bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black hover:opacity-95 transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 group"
                  >
                    <span>Reserve a Table in {currentSpace.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
