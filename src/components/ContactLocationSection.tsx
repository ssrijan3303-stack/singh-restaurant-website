import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Car,
  Anchor,
  Compass,
  Sparkles,
} from 'lucide-react';

export const ContactLocationSection: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-[#0A0908] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Finding The Sanctuary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4F0] tracking-tight">
            Location & Concierge Services
          </h2>
          <p className="text-sm sm:text-base text-[#BDB2A2] font-light leading-relaxed">
            Conveniently positioned between the serene Cantonment gardens and the historic riverfront ghats of Varanasi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact & Hours Card */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 sm:p-10 border border-[#D4AF37]/25 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#1D1714] flex items-center justify-center text-[#D4AF37] shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                    Address & Landmark
                  </span>
                  <p className="font-serif text-lg text-white font-medium">
                    Singh Heritage Pavilion, Cantonment & Ghat Road
                  </p>
                  <p className="text-xs text-[#CBC0B1]">
                    Varanasi, Uttar Pradesh 221002, India (Within 12 minutes of Dashashwamedh Ghat & Kashi Vishwanath Corridor).
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#1D1714] flex items-center justify-center text-[#D4AF37] shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                    Operating Hours
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-lg bg-[#14100E] border border-white/5">
                      <span className="text-white font-medium block">Lunch Service</span>
                      <span className="text-[#D4AF37] mt-0.5 block">12:30 PM — 3:00 PM</span>
                      <span className="text-white/40 text-[10px] mt-0.5 block">Royal Awadhi Thali & Ala Carte</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#14100E] border border-white/5">
                      <span className="text-white font-medium block">Dinner Service</span>
                      <span className="text-[#D4AF37] mt-0.5 block">7:00 PM — 11:45 PM</span>
                      <span className="text-white/40 text-[10px] mt-0.5 block">Full Dastarkhwan & Rooftop</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Valet & Boat Mooring Services */}
              <div className="p-4 rounded-xl bg-[#181310] border border-[#D4AF37]/15 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                  Signature Arrival Services
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#C5B8A5]">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Complimentary Valet Parking & EV Charging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Private Bajra Riverboat Mooring Transfer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
              <a
                href="tel:+915422509890"
                className="flex-1 py-3 px-4 rounded text-xs font-semibold uppercase tracking-wider bg-[#1C1714] text-[#E5DDCF] hover:text-white border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Concierge: +91 542 250 9890</span>
              </a>

              <a
                href="https://wa.me/915422509890?text=Namaste%20Singh%20Restaurant%20Concierge,%20I%20would%20like%20to%20inquire%20about%20table%20availability."
                target="_blank"
                rel="noreferrer"
                className="py-3 px-5 rounded text-xs font-semibold uppercase tracking-wider bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366]/30 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Interactive Styled Map & Ghat Proximity Guide */}
          <div className="lg:col-span-6 glass-card rounded-2xl overflow-hidden border border-[#D4AF37]/25 flex flex-col justify-between">
            {/* Map Canvas Representation */}
            <div className="relative h-72 sm:h-80 w-full bg-[#161311] overflow-hidden p-6 flex flex-col justify-between">
              {/* Map grid aesthetic */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Varanasi Historic District</span>
                </div>
                <span className="text-[10px] text-white/50 bg-black/60 px-2 py-0.5 rounded">
                  25.3176° N, 82.9739° E
                </span>
              </div>

              {/* Pin Center */}
              <div className="relative z-10 my-auto text-center space-y-2">
                <div className="inline-flex flex-col items-center animate-bounce duration-1000">
                  <div className="p-3 rounded-full bg-[#D4AF37] text-black shadow-2xl">
                    <MapPin className="w-6 h-6 fill-black" />
                  </div>
                  <span className="w-3 h-1 bg-black/40 rounded-full blur-[1px] mt-1" />
                </div>
                <div className="bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 rounded-lg p-3 max-w-xs mx-auto shadow-xl">
                  <h4 className="font-serif text-sm font-semibold text-white">Singh Restaurant</h4>
                  <p className="text-[11px] text-[#D4AF37]">Palatial Dining & River Terrace</p>
                </div>
              </div>

              <div className="relative z-10 text-[11px] text-white/60 bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm self-start">
                River Ganga Riverfront: 350 Meters East
              </div>
            </div>

            {/* Proximity Transit Times */}
            <div className="p-6 bg-[#120F0D] border-t border-[#D4AF37]/20 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                Proximity To Varanasi Landmarks:
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded bg-[#181412] border border-white/5">
                  <span className="text-white/40 block text-[10px]">Dashashwamedh Ghat</span>
                  <span className="text-white font-medium">10 mins (3.2 km)</span>
                </div>
                <div className="p-2.5 rounded bg-[#181412] border border-white/5">
                  <span className="text-white/40 block text-[10px]">Kashi Vishwanath Corridor</span>
                  <span className="text-white font-medium">12 mins (3.8 km)</span>
                </div>
                <div className="p-2.5 rounded bg-[#181412] border border-white/5">
                  <span className="text-white/40 block text-[10px]">Varanasi Cantt Station</span>
                  <span className="text-white font-medium">8 mins (2.4 km)</span>
                </div>
                <div className="p-2.5 rounded bg-[#181412] border border-white/5">
                  <span className="text-white/40 block text-[10px]">Lal Bahadur Shastri Airport</span>
                  <span className="text-white font-medium">35 mins (22 km)</span>
                </div>
                <div className="p-2.5 rounded bg-[#181412] border border-white/5">
                  <span className="text-white/40 block text-[10px]">Assi Ghat / BHU</span>
                  <span className="text-white font-medium">15 mins (5.1 km)</span>
                </div>
                <div className="p-2.5 rounded bg-[#181412] border border-white/5">
                  <span className="text-white/40 block text-[10px]">Sarnath Buddhist Ruins</span>
                  <span className="text-white font-medium">20 mins (9.5 km)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
