import React, { useState } from 'react';
import { Reservation, DiningSpace, CartItem } from '../types/restaurant';
import {
  Calendar,
  Clock,
  Users,
  Compass,
  CheckCircle2,
  Sparkles,
  Printer,
  CalendarCheck,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
} from 'lucide-react';

interface ReservationSectionProps {
  spaces: DiningSpace[];
  cartItems: CartItem[];
  onNewReservation: (reservation: Reservation) => void;
  preselectedSpaceId?: string;
  prefilledParams?: {
    date: string;
    time: string;
    guests: number;
    space: string;
  } | null;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  spaces,
  cartItems,
  onNewReservation,
  preselectedSpaceId,
  prefilledParams,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [spaceId, setSpaceId] = useState(
    prefilledParams?.space || preselectedSpaceId || 'grand-dining-room'
  );
  const [seatingPreference, setSeatingPreference] = useState<Reservation['seatingPreference']>('Indoor AC');
  const [date, setDate] = useState(
    prefilledParams?.date || (() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    })()
  );
  const [timeSlot, setTimeSlot] = useState(prefilledParams?.time || '8:00 PM');
  const [guestCount, setGuestCount] = useState(prefilledParams?.guests || 2);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState<Reservation['occasion']>('Romantic Rendezvous');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmed Reservation details
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);

  const selectedSpace = spaces.find((s) => s.id === spaceId) || spaces[0];

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `SR-VNS-${randomSuffix}`;

    const newBooking: Reservation = {
      id: bookingId,
      guestName,
      phone,
      email,
      guestCount,
      date,
      timeSlot,
      spaceId,
      seatingPreference,
      occasion,
      dietaryNotes: dietaryNotes || (cartItems.length > 0 ? `Pre-selected: ${cartItems.map((c) => c.menuItem.name).join(', ')}` : 'Standard Fine Dining'),
      specialRequests,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      totalEstimatedInr: cartItems.reduce((acc, c) => acc + c.menuItem.price * c.quantity, 0),
    };

    onNewReservation(newBooking);
    setConfirmedBooking(newBooking);
    setStep(4);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="reservation" className="py-24 bg-[#0A0908] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Table Reservations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4F0] tracking-tight">
            Reserve Your Sanctuary
          </h2>
          <p className="text-sm sm:text-base text-[#BDB2A2] font-light leading-relaxed">
            Due to our high staff-to-guest ratio and intimate seating, early reservations are cordially recommended.
          </p>
        </div>

        {/* Multi-step Container */}
        <div className="glass-card rounded-2xl border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-10">
          {/* Progress Indicator */}
          {step < 4 && (
            <div className="mb-10">
              <div className="flex items-center justify-between text-xs tracking-wider text-[#A89D8E] font-medium mb-3">
                <span className={step >= 1 ? 'text-[#D4AF37]' : ''}>1. Dining Space</span>
                <span className={step >= 2 ? 'text-[#D4AF37]' : ''}>2. Date & Time</span>
                <span className={step >= 3 ? 'text-[#D4AF37]' : ''}>3. Guest Details</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C365] transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: Space & Seating Preference */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-white">Select Your Dining Space</h3>
                <p className="text-xs text-[#C5B8A5]">
                  Choose from our regal hall, starlit Ganges terrace, or the botanical lounge.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {spaces.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSpaceId(s.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between space-y-3 ${
                      spaceId === s.id
                        ? 'bg-[#221C18] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                        : 'bg-[#14110F] border-white/10 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div>
                      <h4 className="font-serif text-base font-medium text-white">{s.name}</h4>
                      <p className="text-[11px] text-[#D4AF37] mt-0.5">{s.subtitle}</p>
                      <p className="text-xs text-[#A89D8E] font-light mt-2 line-clamp-2">
                        {s.atmosphere}
                      </p>
                    </div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest pt-2 border-t border-white/5">
                      Max {s.capacity} Guests
                    </div>
                  </button>
                ))}
              </div>

              {/* Seating Preference Selector */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  Seating Style Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    'Indoor AC',
                    'Rooftop River View',
                    'Maharaja Private Booth',
                    'Courtyard Lawn',
                  ].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setSeatingPreference(pref as any)}
                      className={`py-2.5 px-3 rounded text-xs font-medium text-center border transition-all ${
                        seatingPreference === pref
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-semibold'
                          : 'bg-[#181412] text-[#C5B8A5] border-white/10 hover:border-[#D4AF37]/40'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date, Time & Guests */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-white">Date & Service Time</h3>
                <p className="text-xs text-[#C5B8A5]">
                  Select the date of your visit and your desired time slot.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Date of Dining
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#181412] border border-[#D4AF37]/30 text-white text-sm focus:outline-none focus:border-[#D4AF37] [color-scheme:dark]"
                    required
                  />
                </div>

                {/* Party Size */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Number of Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg bg-[#181412] border border-[#D4AF37]/30 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16].map((num) => (
                      <option key={num} value={num} className="bg-[#181412]">
                        {num} {num === 1 ? 'Guest (Solo Tasting)' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-3 pt-2">
                <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Available Service Slots
                </label>

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] text-white/50 uppercase tracking-widest block mb-2">
                      Lunch Service (12:30 PM - 3:00 PM)
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['12:30 PM', '1:15 PM', '2:00 PM'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTimeSlot(t)}
                          className={`py-2.5 px-3 rounded text-xs font-medium text-center border transition-all ${
                            timeSlot === t
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-semibold'
                              : 'bg-[#181412] text-[#C5B8A5] border-white/10 hover:border-[#D4AF37]/40'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] text-white/50 uppercase tracking-widest block mb-2">
                      Dinner Service (7:00 PM - 11:45 PM)
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                      {['7:00 PM', '7:45 PM', '8:30 PM', '9:15 PM', '10:00 PM'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTimeSlot(t)}
                          className={`py-2.5 px-3 rounded text-xs font-medium text-center border transition-all ${
                            timeSlot === t
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-semibold'
                              : 'bg-[#181412] text-[#C5B8A5] border-white/10 hover:border-[#D4AF37]/40'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 rounded text-xs font-medium text-[#C5B8A5] hover:text-white border border-white/10 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Contact & Special Requests */}
          {step === 3 && (
            <form onSubmit={handleCompleteBooking} className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-white">Guest Information</h3>
                <p className="text-xs text-[#C5B8A5]">
                  Please furnish your contact details to ensure seamless concierge welcoming and confirmation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Maharaja Vikramaditya Singh"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#181412] border border-[#D4AF37]/30 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    Contact Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 XXXXX"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#181412] border border-[#D4AF37]/30 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@luxurytravel.in"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#181412] border border-[#D4AF37]/30 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    Dining Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#181412] border border-[#D4AF37]/30 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Romantic Rendezvous">Romantic Rendezvous</option>
                    <option value="Anniversary">Anniversary Celebration</option>
                    <option value="Birthday">Birthday Gathering</option>
                    <option value="Business Dinner">Executive / Dignitary Dinner</option>
                    <option value="Family Celebration">Family Sacred Pilgrimage Gathering</option>
                    <option value="Casual Dining">Epicurean Exploration</option>
                  </select>
                </div>
              </div>

              {/* Dietary Requirements */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  Dietary Highlights or Allergies
                </label>
                <input
                  type="text"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder="e.g. Sattvic / No onion-garlic, Jain preparation, Nut allergy, etc."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#181412] border border-[#D4AF37]/30 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  Concierge Requests
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Waterfront terrace table, private sitar dedication, valet parking needed..."
                  className="w-full px-4 py-2 rounded-lg bg-[#181412] border border-[#D4AF37]/30 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Linked Tasting Items Preview */}
              {cartItems.length > 0 && (
                <div className="p-3.5 rounded-lg bg-[#1C1714] border border-[#D4AF37]/20 text-xs">
                  <span className="text-[#D4AF37] font-semibold block uppercase tracking-wider text-[10px]">
                    Attached Pre-Order from Tasting Tray ({cartItems.length} items):
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-white/80">
                    {cartItems.map((c) => (
                      <span key={c.menuItem.id} className="bg-black/40 px-2 py-0.5 rounded text-[11px]">
                        {c.menuItem.name} (x{c.quantity})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded text-xs font-medium text-[#C5B8A5] hover:text-white border border-white/10 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-9 py-3.5 rounded text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black hover:opacity-95 transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2"
                >
                  <span>Confirm Table Reservation</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Instant Confirmation & Royal Voucher */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-8 text-center animate-in zoom-in-95 duration-400">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  Reservation Confirmed · Singh Restaurant
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white">
                  We Await Your Presence, {confirmedBooking.guestName}
                </h3>
                <p className="text-xs sm:text-sm text-[#C9BFB1] max-w-lg mx-auto">
                  Your table reservation has been recorded in our maître d' concierge ledger. A confirmation has been transmitted to your phone.
                </p>
              </div>

              {/* Royal Voucher Card */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-[#1C1714] to-[#120F0D] border border-[#D4AF37]/40 text-left max-w-lg mx-auto shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]">
                      Booking Reference
                    </span>
                    <span className="font-serif text-xl font-bold text-white block tracking-wider">
                      {confirmedBooking.id}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-white/50">Status</span>
                    <span className="text-xs font-semibold text-emerald-400 block uppercase">
                      Guaranteed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 text-xs border-b border-[#D4AF37]/20">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">Space & Seating</span>
                    <span className="text-[#F5EFEB] font-medium mt-0.5 block">
                      {selectedSpace.name} ({confirmedBooking.seatingPreference})
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">Date & Time</span>
                    <span className="text-[#F5EFEB] font-medium mt-0.5 block">
                      {confirmedBooking.date} at {confirmedBooking.timeSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">Party Size</span>
                    <span className="text-[#F5EFEB] font-medium mt-0.5 block">
                      {confirmedBooking.guestCount} Guests ({confirmedBooking.occasion})
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">Location</span>
                    <span className="text-[#F5EFEB] font-medium mt-0.5 block">
                      Varanasi Ghats, Uttar Pradesh
                    </span>
                  </div>
                </div>

                <div className="pt-3 text-[11px] text-[#A89D8E] space-y-1">
                  <p>• Complimentary valet parking & riverboat mooring assistance included.</p>
                  <p>• Tables are held for 20 minutes past reservation time.</p>
                </div>
              </div>

              {/* Confirmation Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded text-xs font-medium tracking-wide bg-[#1C1714] text-[#E0D7C9] border border-white/20 hover:border-[#D4AF37] hover:text-white transition-colors flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Print Voucher</span>
                </button>

                <button
                  onClick={() => {
                    const text = `Namaste Singh Restaurant! I have booking reference ${confirmedBooking.id} on ${confirmedBooking.date} at ${confirmedBooking.timeSlot} under ${confirmedBooking.guestName}. Looking forward to our visit.`;
                    window.open(`https://wa.me/915422509890?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="px-5 py-2.5 rounded text-xs font-medium tracking-wide bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366]/30 transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send to WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setStep(1);
                    setConfirmedBooking(null);
                  }}
                  className="px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:underline"
                >
                  Make Another Reservation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
