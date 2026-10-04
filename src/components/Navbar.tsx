import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShieldCheck, Menu as MenuIcon, X, Calendar } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  isAdminMode: boolean;
  onToggleAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  isAdminMode,
  onToggleAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Spaces', href: '#spaces' },
    { label: 'Menu', href: '#menu' },
    { label: 'Reservations', href: '#reservation' },
    { label: 'Heritage', href: '#heritage' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0E0C0B]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-[#0B0A09]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single Brand Wordmark with Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            aria-label="Singh Restaurant Home"
          >
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-gradient-to-br from-[#1C1815] to-[#0E0C0B] group-hover:border-[#D4AF37] transition-colors shadow-sm">
              <span className="font-serif text-lg font-bold tracking-wider text-[#D4AF37]">SR</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#F5EFEB] group-hover:text-[#D4AF37] transition-colors whitespace-nowrap">
                SINGH RESTAURANT
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]/80 -mt-1 hidden sm:block">
                Varanasi · Est. 1984
              </span>
            </div>
          </a>

          {/* Zone 2: Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wider text-[#D7CEBE]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 transition-colors hover:text-[#D4AF37] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Owner CMS Switcher Button */}
            <button
              onClick={onToggleAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium tracking-wide transition-all border ${
                isAdminMode
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 font-semibold'
                  : 'bg-[#181412] text-[#C5B8A5] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#F3EFEA]'
              }`}
              title={isAdminMode ? 'Exit Admin Dashboard' : 'Open Owner & Manager Portal'}
              aria-label="Toggle Owner Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAdminMode ? 'Exit CMS' : 'Owner Portal'}</span>
            </button>

            {/* Tasting Tray / Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full border border-[#D4AF37]/30 bg-[#161311] hover:border-[#D4AF37] text-[#E0D8CB] hover:text-[#D4AF37] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              aria-label={`View tasting tray with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Reservation CTA Button */}
            <button
              onClick={onOpenReservation}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded text-xs font-semibold uppercase tracking-[0.15em] bg-gradient-to-r from-[#D4AF37] via-[#E5C365] to-[#C5A059] text-black hover:opacity-95 transition-all shadow-md shadow-[#D4AF37]/20 whitespace-nowrap active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              Reserve Table
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#D7CEBE] hover:text-[#D4AF37] focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#120F0D]/98 border-b border-[#D4AF37]/20 px-6 py-5 mt-2 space-y-4 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-serif tracking-wider text-[#E2DACB] hover:text-[#D4AF37] py-1 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 px-4 rounded text-center text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#AA8222] text-black shadow-md"
            >
              Book Your Table
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onToggleAdmin();
              }}
              className="w-full py-2 px-4 rounded text-center text-xs font-medium tracking-wider bg-[#1B1715] text-[#C5B8A5] border border-[#D4AF37]/30 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              {isAdminMode ? 'Exit Admin CMS' : 'Owner Management CMS'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
