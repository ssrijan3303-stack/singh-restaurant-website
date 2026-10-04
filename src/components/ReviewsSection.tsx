import React from 'react';
import { ReviewItem } from '../types/restaurant';
import { Star, Quote, Award } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section className="py-20 bg-[#0E0C0B] border-y border-[#D4AF37]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Patron Accolades</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F7F4F0]">
              Reflections of Distinguished Guests
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#C5B8A5]">
            <span className="text-[#D4AF37] font-semibold text-base font-serif">4.9 / 5.0</span>
            <div className="flex text-[#D4AF37]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
              ))}
            </div>
            <span>(Over 1,200 Verified Reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card rounded-xl p-6 sm:p-7 border border-[#D4AF37]/20 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-[#D4AF37]/40" />
                <p className="text-xs sm:text-sm text-[#CBC0B1] font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-medium text-white">{rev.author}</h4>
                  <p className="text-[11px] text-[#A89D8E]">{rev.role}</p>
                  <p className="text-[10px] text-[#D4AF37]/80">{rev.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                    {rev.source}
                  </span>
                  <span className="text-[10px] text-white/30">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
