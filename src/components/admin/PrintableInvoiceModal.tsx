import React, { useState } from 'react';
import { BillInvoice, PaymentMethod } from '../../types/restaurant';
import { Printer, Share2, CheckCircle2, X, CreditCard, Banknote, QrCode, Building, MessageSquare, Download } from 'lucide-react';

interface PrintableInvoiceModalProps {
  invoice: BillInvoice;
  onClose: () => void;
  onMarkPaid: (invoiceNumber: string, method: PaymentMethod) => void;
}

export const PrintableInvoiceModal: React.FC<PrintableInvoiceModalProps> = ({
  invoice,
  onClose,
  onMarkPaid,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    invoice.paymentMethod || 'upi'
  );
  const [isCopied, setIsCopied] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [guestWhatsAppNumber, setGuestWhatsAppNumber] = useState(
    invoice.guestPhone || '+91 98200 44123'
  );
  const [whatsAppSuccess, setWhatsAppSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSettle = () => {
    onMarkPaid(invoice.invoiceNumber, selectedMethod);
  };

  // Generate formatted WhatsApp Bill Text
  const generateWhatsAppMessage = () => {
    const itemsList = invoice.items
      .map((it) => `• ${it.quantity}x ${it.menuItem.name} - ₹${(it.menuItem.price * it.quantity).toLocaleString('en-IN')}`)
      .join('\n');

    return `🏛️ *SINGH RESTAURANT - VARANASI (Est. 1984)*\n_Official Guest Dining Tax Invoice_\n\n*Invoice No:* ${invoice.invoiceNumber}\n*Table:* ${invoice.tableNumber} (${invoice.spaceName})\n*Guest:* ${invoice.guestName}\n*Date:* ${new Date(invoice.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}\n\n*Ordered Delicacies:*\n${itemsList}\n\n━━━━━━━━━━━━━━━\n*Subtotal:* ₹${invoice.subtotal.toLocaleString('en-IN')}\n*GST (5%):* ₹${invoice.gstAmount.toLocaleString('en-IN')}\n*Service Charge (10%):* ₹${invoice.serviceChargeAmount.toLocaleString('en-IN')}\n*GRAND TOTAL:* ₹${invoice.grandTotal.toLocaleString('en-IN')}\n*Payment Status:* ${invoice.isPaid ? 'PAID ✅' : 'PENDING ⏳'}\n━━━━━━━━━━━━━━━\nThank you for dining with us at the sacred riverfront of Varanasi.\n_Atithi Devo Bhava!_`;
  };

  const handleSendWhatsApp = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    const cleanPhone = guestWhatsAppNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    setWhatsAppSuccess(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setWhatsAppModalOpen(false);
      setWhatsAppSuccess(false);
    }, 700);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#14110F] border border-[#D4AF37]/50 rounded-2xl shadow-2xl text-[#F3EFEA] flex flex-col max-h-[92vh]">
        {/* Top Control Bar (Hidden on print) */}
        <div className="p-4 sm:p-5 border-b border-[#D4AF37]/25 flex items-center justify-between bg-[#1A1613] rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37]">
              Tax Invoice Generator
            </span>
            <span className="text-white/30">·</span>
            <span className="font-mono text-xs font-bold text-white">
              {invoice.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWhatsAppModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-colors text-xs font-semibold flex items-center gap-1.5"
              title="Share via WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black hover:opacity-90 transition-opacity text-xs font-bold flex items-center gap-1.5 shadow"
              title="Print Tax Invoice"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Bill</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors ml-1"
              aria-label="Close invoice preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Bill Paper Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 font-sans printable-invoice bg-[#0D0B0A]">
          <div className="max-w-2xl mx-auto bg-[#181412] border border-[#D4AF37]/35 rounded-xl p-6 sm:p-8 text-[#E2DACB] shadow-inner space-y-6">
            {/* Fine Dining Letterhead */}
            <div className="text-center space-y-1 border-b border-[#D4AF37]/25 pb-5">
              <div className="inline-block px-3 py-0.5 rounded border border-[#D4AF37]/40 text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-1">
                Authentic Awadhi & Banarasi Fine Dining
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-[#F5EFEB]">
                SINGH RESTAURANT
              </h1>
              <p className="text-xs text-[#C5B8A5]">
                Dashashwamedh Ghat Sanctuary, Godowlia, Varanasi - 221001, UP
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 text-[10px] text-white/50 pt-1">
                <span>GSTIN: 09AAACS1984R1Z8</span>
                <span>·</span>
                <span>FSSAI Lic. No: 12718001000492</span>
                <span>·</span>
                <span>Ph: +91 542 240 1984</span>
              </div>
            </div>

            {/* Bill Meta Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-white/10 pb-4">
              <div>
                <span className="text-white/40 block text-[10px] uppercase tracking-wider">
                  Invoice Number
                </span>
                <span className="font-mono font-bold text-white">{invoice.invoiceNumber}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase tracking-wider">
                  Table & Space
                </span>
                <span className="font-semibold text-[#D4AF37]">
                  {invoice.tableNumber} · {invoice.spaceName}
                </span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase tracking-wider">
                  Guest Name
                </span>
                <span className="font-medium text-white">{invoice.guestName}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase tracking-wider">
                  Date & Time
                </span>
                <span className="tabular-nums text-white">
                  {new Date(invoice.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  ·{' '}
                  {new Date(invoice.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-wider text-[10px]">
                    <th className="py-2">Delicacy Offering</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Price (₹)</th>
                    <th className="py-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoice.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01]">
                      <td className="py-2.5">
                        <span className="font-medium text-white block">
                          {item.menuItem.name}
                        </span>
                        {item.specialNotes && (
                          <span className="text-[10px] text-white/40 block">
                            Note: {item.specialNotes}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 text-center font-mono font-medium tabular-nums">
                        {item.quantity}
                      </td>
                      <td className="py-2.5 text-right font-mono tabular-nums text-white/70">
                        ₹{item.menuItem.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 text-right font-mono font-semibold tabular-nums text-white">
                        ₹{(item.menuItem.price * item.quantity).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tax & Financial Computation Breakdown */}
            <div className="border-t border-[#D4AF37]/30 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-white/70">
                <span>Subtotal (F&B)</span>
                <span className="font-mono tabular-nums font-medium text-white">
                  ₹{invoice.subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between text-xs text-white/60">
                <span>Goods & Services Tax (GST 5% - CGST 2.5% + SGST 2.5%)</span>
                <span className="font-mono tabular-nums">
                  ₹{invoice.gstAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between text-xs text-white/60">
                <span>Luxury Dining Service Charge (10%)</span>
                <span className="font-mono tabular-nums">
                  ₹{invoice.serviceChargeAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="border-t border-dashed border-white/20 pt-3 flex justify-between items-baseline">
                <div>
                  <span className="font-serif text-lg font-bold text-white block">
                    GRAND TOTAL
                  </span>
                  <span className="text-[10px] text-[#C5B8A5]">
                    Inclusive of all statutory taxes and gratuity
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] font-mono tabular-nums">
                    ₹{invoice.grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Settlement Status & Payment Seal */}
            <div className="p-4 rounded-lg bg-[#14110F] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                {invoice.isPaid ? (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[11px] bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/40">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Paid & Settled via {invoice.paymentMethod?.toUpperCase()}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px] bg-amber-950/60 px-2.5 py-1 rounded border border-amber-500/40">
                    <span>Payment Pending</span>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-white/50 text-right">
                Served by {invoice.serverName || 'Captain Rameshwar'} · Terminal 1
              </div>
            </div>

            {/* Traditional Hospitality Footer Message */}
            <div className="text-center text-[10px] text-white/40 pt-2 border-t border-white/5">
              Thank you for gracing Singh Restaurant with your regal presence.
              <br />
              <span className="italic">"Kashi’s culinary warmth since 1984."</span>
            </div>
          </div>
        </div>

        {/* Bottom Settlement Controls (Interactive) */}
        {!invoice.isPaid && (
          <div className="p-4 sm:p-5 border-t border-[#D4AF37]/25 bg-[#181412] rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">Choose Payment Tender:</span>
              <div className="flex gap-1.5">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: QrCode },
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'cash', label: 'Cash', icon: Banknote },
                  { id: 'room_folio', label: 'Room Charge', icon: Building },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id as PaymentMethod)}
                      className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 border transition-colors ${
                        selectedMethod === m.id
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-semibold'
                          : 'bg-[#14110F] text-white/60 border-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handleSettle}
                className="px-5 py-2 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Bill as Settled (₹{invoice.grandTotal.toLocaleString('en-IN')})</span>
              </button>
            </div>
          </div>
        )}

        {/* WhatsApp Sharing Dialog Modal */}
        {whatsAppModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="w-full max-w-md bg-[#181412] border border-[#25D366]/40 rounded-2xl p-6 text-white space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-[#25D366]">
                  <MessageSquare className="w-5 h-5" />
                  <h3 className="font-serif text-lg font-medium text-white">
                    Send Bill via WhatsApp
                  </h3>
                </div>
                <button
                  onClick={() => setWhatsAppModalOpen(false)}
                  className="text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <label className="text-white/70 block">Patron's Mobile Number</label>
                <input
                  type="text"
                  value={guestWhatsAppNumber}
                  onChange={(e) => setGuestWhatsAppNumber(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3 py-2 rounded-lg bg-[#120F0D] border border-white/20 text-xs text-white focus:outline-none focus:border-[#25D366]"
                />
                <span className="text-[10px] text-white/40 block">
                  Includes country code (e.g. +91 for India)
                </span>
              </div>

              {/* Message Preview */}
              <div className="p-3 rounded-lg bg-[#100D0B] border border-white/10 text-[11px] font-mono text-[#D7CEBE] max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {generateWhatsAppMessage()}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded text-xs text-white/70 border border-white/20 hover:text-white hover:bg-white/5 flex items-center gap-1"
                >
                  {isCopied ? 'Copied!' : 'Copy Text'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setWhatsAppModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-white/50 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendWhatsApp}
                    className="px-4 py-1.5 rounded text-xs font-semibold bg-[#25D366] text-black hover:bg-[#20ba59] transition-colors flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{whatsAppSuccess ? 'Opening...' : 'Send WhatsApp'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
