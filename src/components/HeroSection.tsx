import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { Calendar, Users, Clock, Award, Compass, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onQuickReserve: (params: { date: string; time: string; guests: number; space: string }) => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onQuickReserve, onExploreMenu }) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('8:00 PM');
  const [guestCount, setGuestCount] = useState(2);
  const [seatingArea, setSeatingArea] = useState('grand-dining-room');

  const handleBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickReserve({
      date: selectedDate,
      time: selectedTime,
      guests: guestCount,
      space: seatingArea,
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 overflow-hidden bg-[#0A0908]">
      {/* Background Image Container with Measured Luxury Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.hero}
          alt="Singh Restaurant Varanasi luxury dining hall overlooking the Ganges"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrims per frontend design constitution */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/75 to-[#0A0908]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908]/90 via-[#0A0908]/40 to-transparent" />
      </div>

      {/* Main Hero Content Frame */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-3xl space-y-6">
          {/* Subtle Editorial Kicker */}
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#D4AF37]">
              Sacred City of Varanasi · Est. 1984
            </span>
          </div>

          {/* Majestic Serif Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#F7F4F0] leading-[1.1] tracking-tight">
            Where Sacred Heritage Meets{' '}
            <span className="italic font-normal gold-gradient-text block mt-1 sm:mt-2">
              Michelin-Caliber
            </span>{' '}
            Fine Dining
          </h1>

          {/* Balanced Subheading */}
          <p className="text-base sm:text-lg text-[#D0C5B4] font-light max-w-2xl leading-relaxed">
            Perched along the historic ghats, Singh Restaurant invites you to experience royal Awadhi dastarkhwans, centuries-old Banarasi culinary secrets, and panoramic Ganges vistas under starlit skies.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#reservation"
              className="px-7 py-3.5 rounded text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#C5A059] text-black hover:opacity-90 transition-all shadow-xl shadow-[#D4AF37]/25"
            >
              Reserve an Experience
            </a>
            <button
              onClick={onExploreMenu}
              className="px-7 py-3.5 rounded text-xs font-semibold uppercase tracking-[0.2em] bg-[#1A1614]/80 text-[#E8DFD1] hover:text-white border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all backdrop-blur-md"
            >
              Explore Royal Menu
            </button>
          </div>
        </div>
      </div>

      {/* Floating Quick Reservation Bar */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <form
          onSubmit={handleBarSubmit}
          className="glass-card rounded-xl p-3 sm:p-5 shadow-2xl border border-[#D4AF37]/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center"
        >
          {/* Seating Space Selector */}
          <div className="flex flex-col space-y-1 px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-[#D4AF37]/15">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] flex items-center gap-1 font-semibold">
              <Compass className="w-3 h-3" /> Dining Space
            </span>
            <select
              value={seatingArea}
              onChange={(e) => setSeatingArea(e.target.value)}
              className="bg-transparent text-sm font-medium text-[#F4ECE1] focus:outline-none cursor-pointer"
            >
              <option value="grand-dining-room" className="bg-[#181412] text-[#F4ECE1]">Grand Dining Room</option>
              <option value="ganges-rooftop" className="bg-[#181412] text-[#F4ECE1]">The Ganges Rooftop</option>
              <option value="singh-lounge-bar" className="bg-[#181412] text-[#F4ECE1]">Singh Lounge & Bar</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col space-y-1 px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-[#D4AF37]/15">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] flex items-center gap-1 font-semibold">
              <Calendar className="w-3 h-3" /> Date
            </span>
            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-sm font-medium text-[#F4ECE1] focus:outline-none cursor-pointer [color-scheme:dark]"
            />
          </div>

          {/* Time Slot */}
          <div className="flex flex-col space-y-1 px-3 py-1.5 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/15">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] flex items-center gap-1 font-semibold">
              <Clock className="w-3 h-3" /> Preferred Time
            </span>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="bg-transparent text-sm font-medium text-[#F4ECE1] focus:outline-none cursor-pointer"
            >
              <optgroup label="Lunch Service" className="bg-[#181412] text-[#D4AF37]">
                <option value="12:30 PM" className="bg-[#181412] text-[#F4ECE1]">12:30 PM</option>
                <option value="1:15 PM" className="bg-[#181412] text-[#F4ECE1]">1:15 PM</option>
                <option value="2:00 PM" className="bg-[#181412] text-[#F4ECE1]">2:00 PM</option>
              </optgroup>
              <optgroup label="Dinner Service" className="bg-[#181412] text-[#D4AF37]">
                <option value="7:00 PM" className="bg-[#181412] text-[#F4ECE1]">7:00 PM</option>
                <option value="7:45 PM" className="bg-[#181412] text-[#F4ECE1]">7:45 PM</option>
                <option value="8:30 PM" className="bg-[#181412] text-[#F4ECE1]">8:30 PM</option>
                <option value="9:15 PM" className="bg-[#181412] text-[#F4ECE1]">9:15 PM</option>
                <option value="10:00 PM" className="bg-[#181412] text-[#F4ECE1]">10:00 PM</option>
              </optgroup>
            </select>
          </div>

          {/* Guest Count */}
          <div className="flex flex-col space-y-1 px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-[#D4AF37]/15">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] flex items-center gap-1 font-semibold">
              <Users className="w-3 h-3" /> Party Size
            </span>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="bg-transparent text-sm font-medium text-[#F4ECE1] focus:outline-none cursor-pointer tabular-nums"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                <option key={num} value={num} className="bg-[#181412] text-[#F4ECE1]">
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Find Table CTA */}
          <div className="px-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#B38A28] text-black hover:opacity-90 transition-all shadow-md active:scale-95"
            >
              Find Table
            </button>
          </div>
        </form>
      </div>

      {/* Verified Accolades Ribbon */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 pt-4 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#BDB2A2]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-medium tracking-wide">UP Tourism Heritage Dining Award 2025</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[#D4AF37]">✦</span>
            <span>Michelin Guide India Recommended Selection</span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[#D4AF37]">✦</span>
            <span>Varanasi Premier Waterfront Fine Dining</span>
          </div>
          <div className="flex items-center gap-1 text-[#D4AF37] font-serif italic text-sm">
            <span>Prices in ₹ INR · Pure Veg & Sattvic Curations Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};
