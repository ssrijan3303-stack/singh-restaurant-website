import React from 'react';
import { ASSETS } from '../data/initialData';
import { Sparkles, Utensils, HeartHandshake, History } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage" className="py-24 bg-[#0E0C0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heritage Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Four Decades of Culinary Royalty</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4F0] leading-tight">
              The Sacred Soul of Banarasi & Awadhi Hospitality
            </h2>

            <p className="text-sm sm:text-base text-[#C5B8A5] font-light leading-relaxed">
              Founded in 1984 overlooking the timeless ghats of Varanasi, Singh Restaurant was established with a singular devotion: to preserve and elevate the palatial recipes of ancient Kashi and the princely Awadhi dastarkhwans.
            </p>

            <p className="text-sm text-[#A89D8E] font-light leading-relaxed">
              Every dish is crafted in allegiance to the sacred ethos of <span className="text-[#D4AF37] italic font-serif">"Atithi Devo Bhava"</span> (The Guest is Sacred). We draw directly from organic Gangetic heirloom farms, press pure mustard oil in-house, and simmer our legendary 36-hour Dal-e-Banaras over fruitwood embers just as royal khansamas did two centuries ago.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#D4AF37]/20 text-center">
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#D4AF37] block tabular-nums">
                  1984
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#A89D8E] mt-1 block">
                  Founding Year
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#D4AF37] block tabular-nums">
                  36h
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#A89D8E] mt-1 block">
                  Charcoal Simmer
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#D4AF37] block tabular-nums">
                  100%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#A89D8E] mt-1 block">
                  Sattvic Integrity
                </span>
              </div>
            </div>
          </div>

          {/* Heritage Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl glass-card p-3">
              <img
                src={ASSETS.hero}
                alt="Singh Restaurant Varanasi Heritage Ambiance"
                className="w-full h-[400px] sm:h-[480px] object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-black/70 backdrop-blur-md border border-[#D4AF37]/30">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-semibold">
                  Architectural Provenance
                </span>
                <p className="font-serif italic text-sm text-[#F0EAE1] mt-0.5">
                  Hand-chiseled Chunar sandstone lattices paired with Belgian chandeliers, echoing the timeless ghat palaces of Varanasi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Master Chefs Showcase */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
              Custodians of the Flame
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-white font-light">
              Master Culinary Virtuosos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Chef 1 */}
            <div className="glass-card rounded-xl p-6 sm:p-8 border border-[#D4AF37]/25 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border border-[#D4AF37] bg-[#221C18] flex items-center justify-center font-serif text-xl font-bold text-[#D4AF37]">
                  VS
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white">Chef Vikramaditya Singh</h4>
                  <span className="text-xs text-[#D4AF37] uppercase tracking-wider block">
                    Executive Chef & Culinary Director
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#CBC0B1] font-light leading-relaxed">
                Trained in the ancestral Awadhi court kitchens and with over 28 years of global haute cuisine experience, Chef Vikramaditya curates our signature potli spice blends and slow-cooked tandoori marinades.
              </p>
              <div className="pt-2 text-[11px] text-[#A89D8E] italic border-t border-white/5 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Specialty: 36-Spice Truffle Galouti Kebab & Royal Dum Biryani</span>
              </div>
            </div>

            {/* Chef 2 */}
            <div className="glass-card rounded-xl p-6 sm:p-8 border border-[#D4AF37]/25 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border border-[#D4AF37] bg-[#221C18] flex items-center justify-center font-serif text-xl font-bold text-[#D4AF37]">
                  PR
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white">Pandit Rameshwar Maharaj</h4>
                  <span className="text-xs text-[#D4AF37] uppercase tracking-wider block">
                    Master Halwai & Confectionery Alchemist
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#CBC0B1] font-light leading-relaxed">
                A 3rd generation Varanasi dessert custodian who holds the sacred formula for winter Malaiyo foam and celestial saffron rabri, prepared exclusively with pure organic Gangetic Gir cow milk.
              </p>
              <div className="pt-2 text-[11px] text-[#A89D8E] italic border-t border-white/5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Specialty: The Sacred Malaiyo Cloud & 24K Shahi Tukda</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
