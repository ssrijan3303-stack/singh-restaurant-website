import React, { useState } from 'react';
import { PromoBanner } from '../types/restaurant';
import { Sparkles, X, ChevronRight } from 'lucide-react';

interface FestiveBannerProps {
  banner: PromoBanner;
  onCtaClick: () => void;
}

export const FestiveBanner: React.FC<FestiveBannerProps> = ({ banner, onCtaClick }) => {
  const [dismissed, setDismissed] = useState(false);

  if (!banner.active || dismissed) return null;

  return (
    <div className="relative z-40 bg-gradient-to-r from-[#1E1812] via-[#2A2118] to-[#1E1812] border-b border-[#D4AF37]/30 text-[#F5EFEB] py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="font-semibold text-[#D4AF37] uppercase tracking-wider text-[11px] shrink-0">
            {banner.badgeText}:
          </span>
          <span className="font-serif italic text-[#E5DCCF] truncate">
            {banner.title}
          </span>
          <span className="hidden md:inline text-white/50 text-xs">
            — {banner.subtitle}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onCtaClick}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#D4AF37] hover:text-white transition-colors uppercase tracking-wider underline underline-offset-4 decoration-[#D4AF37]/50"
          >
            {banner.ctaText}
            <ChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/40 hover:text-white p-1 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
