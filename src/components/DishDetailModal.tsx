import React, { useState } from 'react';
import { MenuItem } from '../types/restaurant';
import { X, Sparkles, Flame, Plus, Minus, Wine, AlertCircle, Clock } from 'lucide-react';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#14100E] border border-[#D4AF37]/35 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white flex items-center justify-center border border-white/20 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Media Frame */}
        <div className="relative h-64 sm:h-72 w-full shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14100E] via-transparent to-black/30" />

          {/* Price Badge */}
          <div className="absolute bottom-4 left-6">
            <span className="font-serif text-3xl font-bold text-[#F5EFEB] tabular-nums tracking-wide">
              ₹{dish.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-[#D4AF37] block font-sans tracking-widest uppercase">
              Exclusive of taxes
            </span>
          </div>

          <div className="absolute top-4 left-6 flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37]">
              {dish.category}
            </span>
            {dish.dietary.includes('chef-signature') && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#D4AF37] text-black flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3" /> Chef’s Signature
              </span>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#E0D7C9]">
          {/* Title & Origin */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                {dish.name}
              </h3>
              {dish.hindiName && (
                <span className="font-serif text-lg text-[#D4AF37]/80">
                  {dish.hindiName}
                </span>
              )}
            </div>
            <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-medium flex items-center gap-1.5">
              <span>Origin:</span>
              <span className="text-[#C5B8A5]">{dish.culinaryOrigin}</span>
            </p>
          </div>

          {/* Detailed Narrative */}
          <p className="text-sm leading-relaxed text-[#CBC0B1] font-light">
            {dish.description}
          </p>

          {/* Culinary Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#D4AF37]/15 text-xs">
            <div>
              <span className="text-white/40 block text-[10px] uppercase">Spice Rating</span>
              <div className="flex items-center gap-1 mt-1 text-[#D4AF37]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Flame
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < dish.spiceLevel ? 'text-[#E55B3C] fill-[#E55B3C]' : 'text-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="text-white/40 block text-[10px] uppercase">Prep Time</span>
              <span className="text-[#F3EFEA] font-medium flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                {dish.preparationTime}
              </span>
            </div>

            <div>
              <span className="text-white/40 block text-[10px] uppercase">Energy Value</span>
              <span className="text-[#F3EFEA] font-medium mt-1 block">
                {dish.calories || '450 kcal'}
              </span>
            </div>

            <div>
              <span className="text-white/40 block text-[10px] uppercase">Dietary Class</span>
              <span className="text-[#D4AF37] font-semibold mt-1 block uppercase tracking-wider text-[11px]">
                {dish.dietary.filter((d) => d !== 'chef-signature').join(' · ') || 'Royal Selection'}
              </span>
            </div>
          </div>

          {/* Beverage Pairing Recommendation */}
          {dish.pairingRecommendation && (
            <div className="p-3.5 rounded-lg bg-[#1D1714] border border-[#D4AF37]/20 flex items-start gap-3 text-xs">
              <Wine className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#D4AF37] block uppercase tracking-wider text-[10px]">
                  Sommelier Pairing Note
                </span>
                <span className="text-[#DFD7CB]">{dish.pairingRecommendation}</span>
              </div>
            </div>
          )}

          {/* Allergens Warning */}
          {dish.allergens && dish.allergens.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-white/50">
              <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]/70" />
              <span>Contains allergen traces: {dish.allergens.join(', ')}. Please advise our service steward of dietary strictness.</span>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 sm:p-6 bg-[#0E0C0B] border-t border-[#D4AF37]/20 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-[#1C1714] border border-[#D4AF37]/25 rounded-md px-3 py-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-[#C5B8A5] hover:text-[#D4AF37] transition-colors p-1"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-semibold text-white tabular-nums px-2">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-[#C5B8A5] hover:text-[#D4AF37] transition-colors p-1"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Tray CTA */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded text-xs font-semibold uppercase tracking-[0.15em] bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Add to Tasting Tray</span>
            <span className="tabular-nums">· ₹{(dish.price * quantity).toLocaleString('en-IN')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
