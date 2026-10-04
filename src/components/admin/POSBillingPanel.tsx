import React, { useState } from 'react';
import {
  MenuItem,
  POSOrderItem,
  BillInvoice,
  KDSOrder,
  Reservation,
  PaymentMethod,
} from '../../types/restaurant';
import { RESTAURANT_TABLES, RestaurantTable } from '../../data/enterpriseData';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Receipt,
  Utensils,
  CheckCircle2,
  Clock,
  Printer,
  Share2,
  User,
  Coffee,
  Sparkles,
} from 'lucide-react';
import { PrintableInvoiceModal } from './PrintableInvoiceModal';

interface POSBillingPanelProps {
  menuItems: MenuItem[];
  reservations: Reservation[];
  invoices: BillInvoice[];
  onGenerateInvoice: (invoice: BillInvoice) => void;
  onSendToKDS: (kdsOrder: KDSOrder) => void;
  onSettleInvoice: (invoiceNumber: string, method: PaymentMethod) => void;
}

export const POSBillingPanel: React.FC<POSBillingPanelProps> = ({
  menuItems,
  reservations,
  invoices,
  onGenerateInvoice,
  onSendToKDS,
  onSettleInvoice,
}) => {
  const [tables] = useState<RestaurantTable[]>(RESTAURANT_TABLES);
  const [selectedTable, setSelectedTable] = useState<RestaurantTable>(tables[0]);
  const [guestName, setGuestName] = useState(tables[0]?.activeGuestName || 'Shri Anand Mishra');
  const [guestPhone, setGuestPhone] = useState('+91 98200 44123');
  const [serverName, setServerName] = useState('Captain Rameshwar');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [menuSearch, setMenuSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'billing' | 'history'>('billing');

  // Active POS Order Cart
  const [orderItems, setOrderItems] = useState<POSOrderItem[]>([
    {
      menuItem: menuItems[0], // Galouti Kebab
      quantity: 2,
      specialNotes: 'Extra truffle oil mist',
      station: 'Tandoor & Grill',
    },
    {
      menuItem: menuItems[4] || menuItems[1], // Dum Biryani
      quantity: 2,
      station: 'Biryani & Curries',
    },
    {
      menuItem: menuItems[14] || menuItems[2], // Saffron Cooler
      quantity: 2,
      station: 'Beverage Bar',
    },
  ]);

  // Invoice view modal
  const [activeInvoiceForModal, setActiveInvoiceForModal] = useState<BillInvoice | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showNotification = (text: string, type: 'success' | 'info' = 'success') => {
    setNotificationMsg({ text, type });
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Table selection handler
  const handleSelectTable = (tbl: RestaurantTable) => {
    setSelectedTable(tbl);
    if (tbl.activeGuestName) {
      setGuestName(tbl.activeGuestName);
    } else {
      // Find if table has reservation
      const res = reservations.find(
        (r) => r.status === 'seated' || r.status === 'confirmed'
      );
      if (res && tbl.status === 'available') {
        setGuestName(res.guestName);
        setGuestPhone(res.phone);
      } else {
        setGuestName('Guest at ' + tbl.tableNumber);
      }
    }
  };

  // Add dish to ticket
  const handleAddDish = (dish: MenuItem) => {
    const stationMap: Record<MenuItem['category'], POSOrderItem['station']> = {
      'Royal Appetizers': 'Tandoor & Grill',
      'Heritage Mains': 'Biryani & Curries',
      'Tandoori Specials': 'Tandoor & Grill',
      'Artisanal Desserts': 'Cold & Desserts',
      'Exotic Mocktails': 'Beverage Bar',
    };

    setOrderItems((prev) => {
      const existing = prev.find((it) => it.menuItem.id === dish.id);
      if (existing) {
        return prev.map((it) =>
          it.menuItem.id === dish.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [
        ...prev,
        {
          menuItem: dish,
          quantity: 1,
          station: stationMap[dish.category] || 'Biryani & Curries',
        },
      ];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((it) => {
          if (it.menuItem.id === dishId) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as POSOrderItem[]
    );
  };

  const handleUpdateNotes = (dishId: string, notes: string) => {
    setOrderItems((prev) =>
      prev.map((it) => (it.menuItem.id === dishId ? { ...it, specialNotes: notes } : it))
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setOrderItems((prev) => prev.filter((it) => it.menuItem.id !== dishId));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  // Automated Statutory & Financial Calculations
  const subtotal = orderItems.reduce(
    (acc, it) => acc + it.menuItem.price * it.quantity,
    0
  );
  const gstRate = 0.05; // 5% GST (2.5% CGST + 2.5% SGST)
  const gstAmount = Math.round(subtotal * gstRate);
  const serviceChargeRate = 0.1; // 10% Service Charge
  const serviceChargeAmount = Math.round(subtotal * serviceChargeRate);
  const grandTotal = subtotal + gstAmount + serviceChargeAmount;

  // Punch to Kitchen Display System (KDS)
  const handlePunchToKitchen = () => {
    if (orderItems.length === 0) {
      showNotification('Please add at least one delicacy to the ticket', 'info');
      return;
    }

    const newKdsOrder: KDSOrder = {
      id: `kds-${Date.now()}`,
      orderNumber: `KDS-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNumber: selectedTable.tableNumber,
      spaceName: selectedTable.spaceName,
      guestName: guestName.trim() || 'Patron',
      serverName: serverName,
      items: [...orderItems],
      status: 'new',
      primaryStation: 'Biryani & Curries',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      priority: 'normal',
    };

    onSendToKDS(newKdsOrder);
    showNotification(`Order ${newKdsOrder.orderNumber} punched to Kitchen Display System (Table ${selectedTable.tableNumber})`);
  };

  // Generate & Print Bill
  const handleGenerateAndPrintBill = () => {
    if (orderItems.length === 0) {
      showNotification('Ticket is empty. Add menu items to generate invoice.', 'info');
      return;
    }

    const invoice: BillInvoice = {
      invoiceNumber: `INV-SR-1984-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: `ORD-${Date.now().toString().slice(-4)}`,
      tableNumber: selectedTable.tableNumber,
      spaceName: selectedTable.spaceName,
      guestName: guestName.trim() || 'Distinguished Guest',
      guestPhone: guestPhone,
      serverName: serverName,
      items: [...orderItems],
      subtotal,
      gstRate,
      gstAmount,
      serviceChargeRate,
      serviceChargeAmount,
      grandTotal,
      paymentMethod: 'upi',
      isPaid: false,
      createdAt: new Date().toISOString(),
    };

    onGenerateInvoice(invoice);
    setActiveInvoiceForModal(invoice);
    showNotification(`Invoice ${invoice.invoiceNumber} generated! Ready to print or share.`);
  };

  // Filtered menu items
  const filteredDishes = menuItems.filter((dish) => {
    const matchesCategory =
      selectedCategory === 'All' || dish.category === selectedCategory;
    const matchesSearch =
      dish.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      (dish.hindiName && dish.hindiName.includes(menuSearch)) ||
      dish.category.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* POS Sub-Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-2xl text-white">Instant POS & Bill Generator</h3>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#D4AF37] text-black">
              Terminal 1
            </span>
          </div>
          <p className="text-xs text-[#C5B8A5]">
            Select tables, punch live orders to KDS, calculate automated 5% GST & 10% Service Charge, and generate royal tax invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 rounded-lg bg-[#14110F] border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('billing')}
              className={`px-3 py-1.5 rounded transition-all font-semibold ${
                activeTab === 'billing'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Live Billing Console
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded transition-all font-semibold ${
                activeTab === 'history'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Invoices Ledger ({invoices.length})
            </button>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notificationMsg && (
        <div
          className={`p-3 rounded-lg border text-xs flex items-center justify-between transition-all ${
            notificationMsg.type === 'success'
              ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
              : 'bg-blue-950/70 border-blue-500/50 text-blue-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notificationMsg.text}</span>
          </div>
          <button
            onClick={() => setNotificationMsg(null)}
            className="text-white/50 hover:text-white text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {activeTab === 'billing' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 7 COLS: TABLE SELECTION & MENU ITEMS PICKER */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Quick Table Selection Bar */}
            <div className="glass-card rounded-xl p-4 border border-[#D4AF37]/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  Select Floor Table
                </span>
                <span className="text-[11px] text-white/40">
                  Active: <strong className="text-white font-mono">{selectedTable.tableNumber}</strong> ({selectedTable.spaceName})
                </span>
              </div>

              {/* Table Badges Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {tables.map((tbl) => {
                  const isSelected = selectedTable.id === tbl.id;
                  const isOccupied = tbl.status === 'occupied';

                  return (
                    <button
                      key={tbl.id}
                      onClick={() => handleSelectTable(tbl)}
                      className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold shadow-md shadow-[#D4AF37]/20 scale-105'
                          : isOccupied
                          ? 'border-amber-500/40 bg-amber-950/20 text-amber-300 hover:border-amber-400'
                          : 'border-white/10 bg-[#161210] text-[#D8CEBE] hover:border-white/30'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">{tbl.tableNumber}</span>
                      <span className="text-[9px] opacity-75">{tbl.capacity}p</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Guest & Server Info Card */}
            <div className="glass-card rounded-xl p-4 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-white/50 block mb-1 text-[11px]">Guest Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Guest name"
                    className="w-full pl-8 pr-2.5 py-1.5 rounded bg-[#14110F] border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/50 block mb-1 text-[11px]">Contact Mobile</label>
                <input
                  type="text"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-2.5 py-1.5 rounded bg-[#14110F] border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-white/50 block mb-1 text-[11px]">Service Server / Captain</label>
                <select
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#14110F] border border-white/15 text-white focus:outline-none"
                >
                  <option value="Captain Rameshwar">Captain Rameshwar (Floor 1)</option>
                  <option value="Head Butler Devvrat">Head Butler Devvrat (Maharaja Booths)</option>
                  <option value="Captain Anand">Captain Anand (Rooftop)</option>
                  <option value="Sommelier Aditya">Sommelier Aditya (Bar Lounge)</option>
                </select>
              </div>
            </div>

            {/* 3. Menu Delicacy Selector */}
            <div className="glass-card rounded-xl p-4 border border-[#D4AF37]/20 space-y-4">
              {/* Category Segmented Control & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Quick search dish by name or category..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#14110F] border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex overflow-x-auto gap-1 pb-1 scrollbar-none">
                  {[
                    'All',
                    'Royal Appetizers',
                    'Heritage Mains',
                    'Tandoori Specials',
                    'Artisanal Desserts',
                    'Exotic Mocktails',
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-[#D4AF37] text-black font-semibold'
                          : 'bg-[#181412] text-white/60 hover:text-white border border-white/10'
                      }`}
                    >
                      {cat.replace('Special', '').replace('Artisanal', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dishes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[480px] overflow-y-auto pr-1">
                {filteredDishes.map((dish) => {
                  return (
                    <button
                      key={dish.id}
                      onClick={() => handleAddDish(dish)}
                      className="p-3 rounded-lg border border-white/10 bg-[#161311] hover:border-[#D4AF37]/50 hover:bg-[#1E1916] transition-all text-left flex items-start justify-between gap-3 group active:scale-[0.99]"
                    >
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              dish.dietary.includes('non-veg')
                                ? 'bg-red-400'
                                : 'bg-emerald-400'
                            }`}
                            title={dish.dietary.join(', ')}
                          />
                          <h4 className="font-serif text-sm font-medium text-white truncate group-hover:text-[#D4AF37] transition-colors">
                            {dish.name}
                          </h4>
                        </div>
                        <p className="text-[10px] text-white/40 truncate">{dish.culinaryOrigin}</p>
                        <span className="text-[10px] text-[#D4AF37]/80 block font-medium">
                          {dish.category}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono text-sm font-bold text-white tabular-nums">
                          ₹{dish.price.toLocaleString('en-IN')}
                        </span>
                        <div className="mt-1 flex items-center justify-end text-[10px] font-semibold text-[#D4AF37] group-hover:underline">
                          + Add
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: ACTIVE BILL TICKET & AUTOMATED TAX COMPUTATION */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-xl p-5 border border-[#D4AF37]/35 shadow-2xl space-y-4 sticky top-24">
              {/* Ticket Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/25">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-black flex items-center justify-center font-bold">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white leading-tight">
                      Table {selectedTable.tableNumber} Ticket
                    </h4>
                    <span className="text-[10px] text-[#C5B8A5]">
                      {guestName} · {selectedTable.spaceName}
                    </span>
                  </div>
                </div>

                {orderItems.length > 0 && (
                  <button
                    onClick={handleClearOrder}
                    className="text-[10px] text-white/40 hover:text-red-400 transition-colors uppercase font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Ordered Items List */}
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {orderItems.length === 0 ? (
                  <div className="text-center py-10 text-white/30 text-xs space-y-1">
                    <Utensils className="w-6 h-6 mx-auto opacity-30 mb-1" />
                    <span>No dishes added to this table yet.</span>
                    <p className="text-[10px]">Select delicacies from the menu on the left to add.</p>
                  </div>
                ) : (
                  orderItems.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="p-2.5 rounded-lg bg-[#14110F] border border-white/10 space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-xs text-white block truncate">
                            {item.menuItem.name}
                          </span>
                          <span className="text-[10px] text-white/40 font-mono">
                            ₹{item.menuItem.price.toLocaleString('en-IN')} each
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center rounded border border-white/20 bg-black/40">
                            <button
                              onClick={() => handleUpdateQuantity(item.menuItem.id, -1)}
                              className="px-2 py-0.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold text-white tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.menuItem.id, 1)}
                              className="px-2 py-0.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs font-bold text-white tabular-nums w-16 text-right">
                            ₹{(item.menuItem.price * item.quantity).toLocaleString('en-IN')}
                          </span>

                          <button
                            onClick={() => handleRemoveItem(item.menuItem.id)}
                            className="text-white/30 hover:text-red-400 p-0.5 transition-colors"
                            title="Remove delicacy"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Kitchen Special Note Input */}
                      <input
                        type="text"
                        placeholder="Add kitchen note (e.g. less spicy, strict Jain)..."
                        value={item.specialNotes || ''}
                        onChange={(e) => handleUpdateNotes(item.menuItem.id, e.target.value)}
                        className="w-full px-2 py-1 rounded bg-[#0F0C0A] border border-white/5 text-[10px] text-white/80 placeholder-white/20 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Automated Tax Calculation Ledger */}
              <div className="border-t border-[#D4AF37]/25 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal (F&B)</span>
                  <span className="font-mono font-medium text-white tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-white/50 text-[11px]">
                  <span>GST @ 5% (CGST 2.5% + SGST 2.5%)</span>
                  <span className="font-mono tabular-nums text-white/80">
                    ₹{gstAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-white/50 text-[11px]">
                  <span>Statutory Service Charge (10%)</span>
                  <span className="font-mono tabular-nums text-white/80">
                    ₹{serviceChargeAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="border-t border-dashed border-white/20 pt-2 flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-base font-bold text-white block">
                      Grand Total
                    </span>
                    <span className="text-[9px] text-[#C5B8A5]">All inclusive statutory amount</span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#D4AF37] font-mono tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handlePunchToKitchen}
                  disabled={orderItems.length === 0}
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#221C18] text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#2C241F] transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Punch Order to Kitchen (KDS)</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerateAndPrintBill}
                  disabled={orderItems.length === 0}
                  className="w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] via-[#E2BE5E] to-[#AA8222] text-black hover:opacity-95 transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99]"
                >
                  <Printer className="w-4 h-4" />
                  <span>Generate & Print Bill</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* INVOICES SETTLEMENT LEDGER */
        <div className="glass-card rounded-xl border border-[#D4AF37]/20 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-serif text-lg font-medium text-white">
                Archived & Live Billing Invoices
              </h4>
              <p className="text-xs text-white/50">
                Complete financial record of all generated bills with instant reprint and WhatsApp sharing.
              </p>
            </div>
            <span className="text-xs text-[#D4AF37] font-mono font-semibold">
              Total Recorded: {invoices.length} Bills
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#181412] text-[#D4AF37] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Invoice No.</th>
                  <th className="py-3 px-4">Table & Space</th>
                  <th className="py-3 px-4">Guest Name</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4 text-right">Subtotal</th>
                  <th className="py-3 px-4 text-right">GST (5%)</th>
                  <th className="py-3 px-4 text-right">Grand Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#E0D7C9]">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-white/40">
                      No invoices recorded in this shift yet.
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.invoiceNumber} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono font-bold text-white">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[#D4AF37] block">{inv.tableNumber}</span>
                        <span className="text-[10px] text-white/40">{inv.spaceName}</span>
                      </td>
                      <td className="py-3 px-4 font-medium text-white">
                        {inv.guestName}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-white/70">
                        {inv.items.map((it) => `${it.quantity}x ${it.menuItem.name}`).join(', ')}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums">
                        ₹{inv.subtotal.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-white/60">
                        ₹{inv.gstAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-white tabular-nums">
                        ₹{inv.grandTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                            inv.isPaid
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-700/50'
                              : 'bg-amber-950/60 text-amber-400 border border-amber-700/50'
                          }`}
                        >
                          {inv.isPaid ? 'Settled' : 'Unpaid'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setActiveInvoiceForModal(inv)}
                            className="px-2.5 py-1 rounded bg-[#241F1B] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30 transition-colors text-[10px] font-semibold flex items-center gap-1"
                          >
                            <Printer className="w-3 h-3" />
                            <span>View / Print</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {activeInvoiceForModal && (
        <PrintableInvoiceModal
          invoice={activeInvoiceForModal}
          onClose={() => setActiveInvoiceForModal(null)}
          onMarkPaid={(invNum, method) => {
            onSettleInvoice(invNum, method);
            setActiveInvoiceForModal((prev) =>
              prev ? { ...prev, isPaid: true, paymentMethod: method } : null
            );
            showNotification(`Invoice ${invNum} marked as paid via ${method.toUpperCase()}`);
          }}
        />
      )}
    </div>
  );
};
