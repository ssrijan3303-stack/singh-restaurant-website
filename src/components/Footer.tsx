import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Sparkles } from 'lucide-react';

interface FooterProps {
  onToggleAdmin: () => void;
  isAdminMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onToggleAdmin, isAdminMode }) => {
  return (
    <footer className="bg-[#070605] border-t border-[#D4AF37]/20 text-[#C9BFB1] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand Identity & Monogram */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center bg-gradient-to-br from-[#1C1815] to-[#0E0C0B] shadow-sm">
                <span className="font-serif text-xl font-bold tracking-wider text-[#D4AF37]">SR</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white block">
                  SINGH RESTAURANT
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] block">
                  Varanasi · Uttar Pradesh · Est. 1984
                </span>
              </div>
            </div>

            <p className="text-xs text-[#9E9182] font-light leading-relaxed max-w-sm">
              An epicurean sanctuary on the sacred banks of the Ganges. Honoring the noble traditions of Awadhi and Banarasi culinary heritage with 5-star hospitality and Michelin-caliber finesse.
            </p>

            <div className="pt-1 flex items-center gap-4 text-xs text-[#D4AF37]">
              <span>Pure Veg & Sattvic</span>
              <span>·</span>
              <span>Halal & Awadhi</span>
              <span>·</span>
              <span>Valet Parking</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              The Experience
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#spaces" className="hover:text-[#D4AF37] transition-colors">
                  The Grand Dining Room
                </a>
              </li>
              <li>
                <a href="#spaces" className="hover:text-[#D4AF37] transition-colors">
                  The Ganges Rooftop
                </a>
              </li>
              <li>
                <a href="#spaces" className="hover:text-[#D4AF37] transition-colors">
                  Singh Botanical Lounge
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D4AF37] transition-colors">
                  Imperial Tasting Menu
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-[#D4AF37] transition-colors">
                  Our Culinary Lineage
                </a>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Service Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-white block font-medium">Lunch Dastarkhwan</span>
                <span className="text-[#A89D8E]">12:30 PM — 3:00 PM</span>
              </div>
              <div>
                <span className="text-white block font-medium">Dinner & Rooftop</span>
                <span className="text-[#A89D8E]">7:00 PM — 11:45 PM</span>
              </div>
              <div>
                <span className="text-white block font-medium">Lounge & Mocktails</span>
                <span className="text-[#A89D8E]">2:00 PM — 12:30 AM</span>
              </div>
            </div>
          </div>

          {/* Contact & Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Concierge Hub
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Cantonment & Ghat Rd, Varanasi, UP 221002</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <a href="tel:+915422509890" className="hover:text-[#D4AF37] transition-colors">
                  +91 542 250 9890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <a href="mailto:concierge@singhrestaurant.in" className="hover:text-[#D4AF37] transition-colors">
                  concierge@singhrestaurant.in
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onToggleAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-medium border border-[#D4AF37]/30 bg-[#161210] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isAdminMode ? 'Exit Admin View' : 'Owner & Staff Portal'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            © {new Date().getFullYear()} Singh Restaurant, Varanasi. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Guest Etiquette</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Bespoke Catering</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
