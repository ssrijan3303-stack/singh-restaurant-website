import React from 'react';
import { CartItem } from '../types/restaurant';
import { X, Trash2, Plus, Minus, Send, Calendar, Sparkles } from 'lucide-react';

interface TastingTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  onProceedToReservation: () => void;
}

export const TastingTrayDrawer: React.FC<TastingTrayDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToReservation,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const serviceCharge = Math.round(subtotal * 0.05); // 5% hospitality service
  const grandTotal = subtotal + gst + serviceCharge;

  const handleWhatsAppInquiry = () => {
    const dishList = cartItems
      .map(
        (item) => `• ${item.menuItem.name} (x${item.quantity}) — ₹${(item.menuItem.price * item.quantity).toLocaleString('en-IN')}`
      )
      .join('%0A');

    const message = `Namaste Singh Restaurant Varanasi Concierge,%0A%0AI would like to place an inquiry/pre-order for an upcoming dining experience:%0A%0A${dishList}%0A%0AEstimated Total: ₹${grandTotal.toLocaleString('en-IN')}%0A%0APlease advise on availability and chef pairing recommendations. Thank you!`;

    window.open(`https://wa.me/915422509890?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#120F0D] border-l border-[#D4AF37]/25 shadow-2xl flex flex-col justify-between text-[#F5EFEB]">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#181412]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <h2 className="font-serif text-xl font-medium tracking-wide text-white">
                Your Tasting Tray
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-white/40 hover:text-red-400 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-full text-white/60 hover:text-white transition-colors"
                aria-label="Close tray"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-12 h-12 rounded-full border border-dashed border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="font-serif text-lg text-[#E0D7C9]">Your tray is empty</p>
                <p className="text-xs text-[#9E9182] max-w-xs mx-auto">
                  Browse our Royal Appetizers, Heritage Mains, and Artisanal Desserts to curate your fine-dining experience.
                </p>
              </div>
            ) : (
              cartItems.map(({ menuItem, quantity }) => (
                <div
                  key={menuItem.id}
                  className="p-3.5 rounded-xl bg-[#1A1613] border border-[#D4AF37]/15 flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-sm font-medium text-white truncate">
                      {menuItem.name}
                    </h4>
                    <span className="text-xs text-[#D4AF37] block mt-0.5 tabular-nums">
                      ₹{menuItem.price.toLocaleString('en-IN')} each
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-[#120F0D] border border-white/10 rounded px-2 py-1">
                    <button
                      onClick={() => onUpdateQuantity(menuItem.id, -1)}
                      className="text-white/60 hover:text-[#D4AF37] p-0.5"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold tabular-nums text-white px-1">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(menuItem.id, 1)}
                      className="text-white/60 hover:text-[#D4AF37] p-0.5"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="text-right flex items-center gap-2">
                    <span className="text-xs font-serif font-medium text-white tabular-nums">
                      ₹{(menuItem.price * quantity).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => onRemoveItem(menuItem.id)}
                      className="text-white/40 hover:text-red-400 p-1 transition-colors"
                      aria-label={`Remove ${menuItem.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Actions */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#D4AF37]/20 bg-[#161210] space-y-4">
              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-[#BDB2A2] pb-2 border-b border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white tabular-nums font-medium">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="text-white tabular-nums font-medium">
                    ₹{gst.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hospitality Service (5%)</span>
                  <span className="text-white tabular-nums font-medium">
                    ₹{serviceCharge.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-1">
                  <span className="font-serif">Estimated Total</span>
                  <span className="text-[#D4AF37] tabular-nums font-serif text-base">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToReservation();
                  }}
                  className="w-full py-3 px-4 rounded text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Attach to Table Reservation</span>
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-2.5 px-4 rounded text-xs font-medium tracking-wide bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/40 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Inquire / Pre-Order via WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
