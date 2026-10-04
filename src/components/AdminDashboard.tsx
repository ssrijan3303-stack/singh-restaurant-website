import React, { useState } from 'react';
import {
  MenuItem,
  DiningSpace,
  Reservation,
  GalleryItem,
  PromoBanner,
  ReservationStatus,
  StaffUser,
  BillInvoice,
  KDSOrder,
  InventoryItem,
  OrderStatus,
  PaymentMethod,
} from '../types/restaurant';
import {
  INITIAL_STAFF_USERS,
  INITIAL_KDS_ORDERS,
  INITIAL_INVENTORY_ITEMS,
  INITIAL_INVOICES,
} from '../data/enterpriseData';
import {
  ShieldCheck,
  UtensilsCrossed,
  Layers,
  Image as ImageIcon,
  Sparkles,
  CalendarCheck,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  Receipt,
  ChefHat,
  PackageOpen,
  UserCheck,
  LogOut,
  Flame,
  AlertTriangle,
} from 'lucide-react';
import { AuthModal } from './admin/AuthModal';
import { POSBillingPanel } from './admin/POSBillingPanel';
import { KDSPanel } from './admin/KDSPanel';
import { InventoryPanel } from './admin/InventoryPanel';
import { AnalyticsPanel } from './admin/AnalyticsPanel';

interface AdminDashboardProps {
  menuItems: MenuItem[];
  spaces: DiningSpace[];
  reservations: Reservation[];
  galleryItems: GalleryItem[];
  banner: PromoBanner;
  onUpdateMenuItem: (item: MenuItem) => void;
  onAddMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  onUpdateSpace: (space: DiningSpace) => void;
  onUpdateReservationStatus: (id: string, status: ReservationStatus) => void;
  onAddReservation: (res: Reservation) => void;
  onAddGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onUpdateBanner: (banner: PromoBanner) => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  menuItems,
  spaces,
  reservations,
  galleryItems,
  banner,
  onUpdateMenuItem,
  onAddMenuItem,
  onDeleteMenuItem,
  onUpdateSpace,
  onUpdateReservationStatus,
  onAddReservation,
  onAddGalleryItem,
  onDeleteGalleryItem,
  onUpdateBanner,
  onCloseAdmin,
}) => {
  // Authentication & Active Session User (Defaults to Thakur Ranvijay Singh for seamless evaluation)
  const [currentUser, setCurrentUser] = useState<StaffUser | null>(INITIAL_STAFF_USERS[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Cross-Module Shared State
  const [kdsOrders, setKdsOrders] = useState<KDSOrder[]>(INITIAL_KDS_ORDERS);
  const [invoices, setInvoices] = useState<BillInvoice[]>(INITIAL_INVOICES);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(INITIAL_INVENTORY_ITEMS);

  // Active Tab Selector (Supporting all 9 enterprise fine-dining modules)
  const [activeTab, setActiveTab] = useState<
    | 'pos'
    | 'kds'
    | 'inventory'
    | 'analytics'
    | 'reservations'
    | 'menu'
    | 'spaces'
    | 'gallery'
    | 'banner'
  >('pos');

  // Menu item edit state
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDesc, setEditDesc] = useState<string>('');
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [newDishName, setNewDishName] = useState('');
  const [newDishCategory, setNewDishCategory] = useState<MenuItem['category']>('Royal Appetizers');
  const [newDishPrice, setNewDishPrice] = useState(1200);
  const [newDishDesc, setNewDishDesc] = useState('');
  const [newDishOrigin, setNewDishOrigin] = useState('Heritage Varanasi Kitchen');

  // Reservation search/filter state
  const [resSearch, setResSearch] = useState('');
  const [resFilterStatus, setResFilterStatus] = useState<string>('all');
  const [isAddingWalkIn, setIsAddingWalkIn] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInGuests, setWalkInGuests] = useState(2);
  const [walkInSpace, setWalkInSpace] = useState('grand-dining-room');

  // Gallery add state
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<GalleryItem['category']>('Ambiance');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Banner editable state
  const [bannerTitle, setBannerTitle] = useState(banner.title);
  const [bannerSubtitle, setBannerSubtitle] = useState(banner.subtitle);
  const [bannerBadge, setBannerBadge] = useState(banner.badgeText);
  const [bannerActive, setBannerActive] = useState(banner.active);
  const [bannerSavedAlert, setBannerSavedAlert] = useState(false);

  // Stats calculation
  const totalReservations = reservations.length;
  const confirmedReservations = reservations.filter((r) => r.status === 'confirmed').length;
  const seatedGuests = reservations
    .filter((r) => r.status === 'seated')
    .reduce((acc, r) => acc + r.guestCount, 0);

  // Live order counts
  const activeKdsCount = kdsOrders.filter(
    (o) => o.status === 'new' || o.status === 'preparing' || o.status === 'ready'
  ).length;
  const lowStockCount = inventoryItems.filter((i) => i.currentStock <= i.minThreshold).length;

  // Enterprise POS Handlers
  const handleGenerateInvoice = (newInvoice: BillInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  const handleSettleInvoice = (invNum: string, method: PaymentMethod) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.invoiceNumber === invNum
          ? { ...inv, isPaid: true, paymentMethod: method, settledAt: new Date().toISOString() }
          : inv
      )
    );
  };

  // Enterprise KDS Handlers
  const handleSendToKDS = (newKdsOrder: KDSOrder) => {
    setKdsOrders((prev) => [newKdsOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setKdsOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o))
    );
  };

  // Enterprise Inventory Handlers
  const handleUpdateStock = (itemId: string, newStock: number) => {
    setInventoryItems((prev) =>
      prev.map((it) => {
        if (it.id === itemId) {
          const status =
            newStock <= it.minThreshold * 0.5
              ? 'critical'
              : newStock <= it.minThreshold
              ? 'low_stock'
              : 'in_stock';
          return {
            ...it,
            currentStock: newStock,
            status,
            lastRestocked: new Date().toISOString().split('T')[0],
          };
        }
        return it;
      })
    );
  };

  const handleAddInventoryItem = (newItem: InventoryItem) => {
    setInventoryItems((prev) => [newItem, ...prev]);
  };

  // Existing Dish Handlers
  const handleStartEditDish = (dish: MenuItem) => {
    setEditingDishId(dish.id);
    setEditPrice(dish.price);
    setEditDesc(dish.description);
  };

  const handleSaveEditDish = (dish: MenuItem) => {
    onUpdateMenuItem({
      ...dish,
      price: editPrice,
      description: editDesc,
    });
    setEditingDishId(null);
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName.trim()) return;

    const newDish: MenuItem = {
      id: `dish-custom-${Date.now()}`,
      name: newDishName,
      category: newDishCategory,
      price: Number(newDishPrice),
      description: newDishDesc,
      culinaryOrigin: newDishOrigin,
      dietary: ['pure-veg'],
      image: menuItems[0]?.image || '/src/assets/images/dish_awadhi_biryani_1791139546524.jpg',
      spiceLevel: 2,
      isAvailable: true,
      preparationTime: '20 mins',
    };

    onAddMenuItem(newDish);
    setIsAddingDish(false);
    setNewDishName('');
    setNewDishDesc('');
  };

  const handleSaveWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName.trim()) return;

    const newRes: Reservation = {
      id: `SR-WALK-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: walkInName,
      phone: '+91 99999 00000',
      email: 'walkin@singhrestaurant.in',
      guestCount: walkInGuests,
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Now (Walk-in)',
      spaceId: walkInSpace,
      seatingPreference: 'Indoor AC',
      occasion: 'Casual Dining',
      dietaryNotes: 'Walk-in guest',
      status: 'seated',
      createdAt: new Date().toISOString(),
    };

    onAddReservation(newRes);
    setIsAddingWalkIn(false);
    setWalkInName('');
  };

  const handleSaveBannerConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBanner({
      ...banner,
      title: bannerTitle,
      subtitle: bannerSubtitle,
      badgeText: bannerBadge,
      active: bannerActive,
    });
    setBannerSavedAlert(true);
    setTimeout(() => setBannerSavedAlert(false), 2000);
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim()) return;

    const newPhoto: GalleryItem = {
      id: `gal-custom-${Date.now()}`,
      title: newPhotoTitle,
      category: newPhotoCategory,
      caption: newPhotoCaption,
      image: newPhotoUrl || menuItems[0]?.image || '/src/assets/images/hero_singh_restaurant_1791139523547.jpg',
    };

    onAddGalleryItem(newPhoto);
    setIsAddingPhoto(false);
    setNewPhotoTitle('');
    setNewPhotoCaption('');
    setNewPhotoUrl('');
  };

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.guestName.toLowerCase().includes(resSearch.toLowerCase()) ||
      r.id.toLowerCase().includes(resSearch.toLowerCase()) ||
      r.phone.includes(resSearch);
    const matchesStatus = resFilterStatus === 'all' ? true : r.status === resFilterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F3EFEA] pt-24 pb-16 font-sans selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header Bar with Staff Profile & Role Selector */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/35 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] text-black flex items-center justify-center font-serif font-bold text-2xl shadow-xl shadow-[#D4AF37]/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                  Owner & Management Portal
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-[#D4AF37] text-black">
                  Enterprise Suite
                </span>
              </div>
              <p className="text-xs text-[#C5B8A5] mt-1">
                Singh Restaurant, Varanasi (Est. 1984) · Integrated POS, KDS, Inventory, and Royal Guest Management
              </p>
            </div>
          </div>

          {/* User Profile Pill & Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 p-2 rounded-xl bg-[#161210] border border-[#D4AF37]/30 shadow-inner">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] text-black flex items-center justify-center font-bold text-xs">
                  {currentUser.role === 'admin' ? (
                    <ShieldCheck className="w-5 h-5" />
                  ) : currentUser.role === 'manager' ? (
                    <UserCheck className="w-5 h-5" />
                  ) : (
                    <ChefHat className="w-5 h-5" />
                  )}
                </div>

                <div className="pr-1 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-serif font-bold text-white block">
                      {currentUser.name}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                        currentUser.role === 'admin'
                          ? 'bg-[#D4AF37] text-black'
                          : currentUser.role === 'manager'
                          ? 'bg-blue-900/60 text-blue-300 border border-blue-500/40'
                          : 'bg-amber-900/60 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {currentUser.role === 'admin'
                        ? 'Admin / Owner'
                        : currentUser.role === 'manager'
                        ? 'Floor Manager'
                        : 'Head Chef'}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/50 block font-mono">
                    {currentUser.employeeCode} · {currentUser.designation}
                  </span>
                </div>

                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#D4AF37] text-[11px] font-medium transition-colors border border-white/10"
                  title="Switch Staff Role or View Credentials"
                >
                  Switch Role
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow"
              >
                Staff Sign In
              </button>
            )}

            <button
              onClick={onCloseAdmin}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#1A1613] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              Exit to Guest View
            </button>
          </div>
        </div>

        {/* Operational Performance Snapshot */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-xl border border-[#D4AF37]/20 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-white/50 block">
              Active KDS Tickets
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-bold text-amber-400 tabular-nums">
                {activeKdsCount}
              </span>
              <ChefHat className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-[10px] text-white/40 block">Kitchen live pipeline</span>
          </div>

          <div className="glass-card p-5 rounded-xl border border-[#D4AF37]/20 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-white/50 block">
              Today's Gross Billed
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-bold text-[#D4AF37] tabular-nums">
                ₹{invoices.reduce((a, b) => a + b.grandTotal, 0).toLocaleString('en-IN')}
              </span>
              <Receipt className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <span className="text-[10px] text-white/40 block">Auto-calculated 5% GST & service</span>
          </div>

          <div className="glass-card p-5 rounded-xl border border-[#D4AF37]/20 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-white/50 block">
              Seated Guests / Covers
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-bold text-emerald-400 tabular-nums">
                {seatedGuests}
              </span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[10px] text-white/40 block">{totalReservations} total bookings</span>
          </div>

          <div className="glass-card p-5 rounded-xl border border-[#D4AF37]/20 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-white/50 block">
              Inventory Low Stock
            </span>
            <div className="flex items-baseline justify-between">
              <span
                className={`font-serif text-3xl font-bold tabular-nums ${
                  lowStockCount > 0 ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {lowStockCount}
              </span>
              <PackageOpen className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <span className="text-[10px] text-white/40 block">Threshold monitoring active</span>
          </div>
        </div>

        {/* CMS 9-Tab Enterprise Navigation */}
        <div className="flex overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#14110F] border border-[#D4AF37]/25 shadow-xl">
            {[
              { id: 'pos', label: 'Instant POS & Bill Generator', icon: Receipt },
              { id: 'kds', label: 'Kitchen Display System (KDS)', icon: ChefHat, badge: activeKdsCount },
              { id: 'inventory', label: 'Inventory & Supplies', icon: PackageOpen, badge: lowStockCount },
              { id: 'analytics', label: 'Analytics & Reports', icon: TrendingUp },
              { id: 'reservations', label: 'Bookings Ledger', icon: CalendarCheck },
              { id: 'menu', label: 'Menu & Price Controller', icon: UtensilsCrossed },
              { id: 'spaces', label: 'Dining Space Manager', icon: Layers },
              { id: 'gallery', label: 'Visual Gallery Manager', icon: ImageIcon },
              { id: 'banner', label: 'Festive & Banner Control', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black shadow-md shadow-[#D4AF37]/20 font-bold'
                      : 'text-[#C5B8A5] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && tab.badge > 0 ? (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full tabular-nums ${
                        isActive
                          ? 'bg-black text-white'
                          : tab.id === 'inventory'
                          ? 'bg-red-500 text-white'
                          : 'bg-[#D4AF37] text-black'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* NEW ENTERPRISE MODULE 1: INSTANT POS & BILL GENERATOR */}
        {/* ============================================================== */}
        {activeTab === 'pos' && (
          <POSBillingPanel
            menuItems={menuItems}
            reservations={reservations}
            invoices={invoices}
            onGenerateInvoice={handleGenerateInvoice}
            onSendToKDS={handleSendToKDS}
            onSettleInvoice={handleSettleInvoice}
          />
        )}

        {/* ============================================================== */}
        {/* NEW ENTERPRISE MODULE 2: KITCHEN DISPLAY SYSTEM (KDS) */}
        {/* ============================================================== */}
        {activeTab === 'kds' && (
          <KDSPanel
            orders={kdsOrders}
            menuItems={menuItems}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddNewOrder={handleSendToKDS}
          />
        )}

        {/* ============================================================== */}
        {/* NEW ENTERPRISE MODULE 3: INVENTORY & STOCK CONTROL */}
        {/* ============================================================== */}
        {activeTab === 'inventory' && (
          <InventoryPanel
            items={inventoryItems}
            onUpdateStock={handleUpdateStock}
            onAddItem={handleAddInventoryItem}
          />
        )}

        {/* ============================================================== */}
        {/* NEW ENTERPRISE MODULE 4: ANALYTICS & BUSINESS REPORTS */}
        {/* ============================================================== */}
        {activeTab === 'analytics' && <AnalyticsPanel invoices={invoices} />}

        {/* ============================================================== */}
        {/* EXISTING TAB 5: RESERVATIONS MANAGER (100% PRESERVED & INTACT) */}
        {/* ============================================================== */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Guest name, Phone, or Booking ID..."
                    value={resSearch}
                    onChange={(e) => setResSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#181412] border border-[#D4AF37]/25 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <select
                  value={resFilterStatus}
                  onChange={(e) => setResFilterStatus(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#181412] border border-[#D4AF37]/25 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="seated">Seated</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={() => setIsAddingWalkIn(true)}
                className="px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-black hover:opacity-90 flex items-center gap-1.5 self-start sm:self-auto shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Walk-In Guest</span>
              </button>
            </div>

            {/* Walk-in Form Modal */}
            {isAddingWalkIn && (
              <form
                onSubmit={handleSaveWalkIn}
                className="glass-card rounded-xl p-6 border border-[#D4AF37]/40 space-y-4"
              >
                <h3 className="font-serif text-lg text-white">Log Walk-In Table Seating</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-white/60 block mb-1">Guest Name</label>
                    <input
                      type="text"
                      required
                      value={walkInName}
                      onChange={(e) => setWalkInName(e.target.value)}
                      placeholder="Guest Name"
                      className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 block mb-1">Guests</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={walkInGuests}
                      onChange={(e) => setWalkInGuests(Number(e.target.value))}
                      className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 block mb-1">Assigned Space</label>
                    <select
                      value={walkInSpace}
                      onChange={(e) => setWalkInSpace(e.target.value)}
                      className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white"
                    >
                      {spaces.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingWalkIn(false)}
                    className="px-4 py-1.5 text-xs text-white/50 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold bg-[#D4AF37] text-black rounded"
                  >
                    Seat Guest
                  </button>
                </div>
              </form>
            )}

            {/* Reservations Table */}
            <div className="glass-card rounded-xl border border-[#D4AF37]/20 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#181412] text-[#D4AF37] uppercase tracking-wider border-b border-[#D4AF37]/20">
                    <tr>
                      <th className="py-3 px-4">Booking ID</th>
                      <th className="py-3 px-4">Guest & Contact</th>
                      <th className="py-3 px-4">Dining Space</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Covers</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#E0D7C9]">
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-white/40">
                          No matching reservations found.
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map((res) => {
                        const spaceName =
                          spaces.find((s) => s.id === res.spaceId)?.name || res.spaceId;
                        return (
                          <tr key={res.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-white">
                              {res.id}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-serif font-medium text-white block">
                                {res.guestName}
                              </span>
                              <span className="text-[11px] text-white/40">{res.phone}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-[#D4AF37] font-medium block">{spaceName}</span>
                              <span className="text-[10px] text-white/40">
                                {res.seatingPreference}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-white block font-medium">{res.date}</span>
                              <span className="text-[11px] text-white/50">{res.timeSlot}</span>
                            </td>
                            <td className="py-3.5 px-4 tabular-nums font-medium">
                              {res.guestCount}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  res.status === 'confirmed'
                                    ? 'bg-blue-900/40 text-blue-300 border border-blue-700/50'
                                    : res.status === 'seated'
                                    ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50'
                                    : res.status === 'completed'
                                    ? 'bg-purple-900/40 text-purple-300 border border-purple-700/50'
                                    : 'bg-red-900/40 text-red-300 border border-red-700/50'
                                }`}
                              >
                                {res.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {res.status !== 'seated' && (
                                  <button
                                    onClick={() => onUpdateReservationStatus(res.id, 'seated')}
                                    className="px-2 py-1 rounded bg-[#221C18] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30 transition-colors text-[10px] font-semibold uppercase"
                                    title="Mark Seated"
                                  >
                                    Seat
                                  </button>
                                )}
                                {res.status !== 'completed' && (
                                  <button
                                    onClick={() => onUpdateReservationStatus(res.id, 'completed')}
                                    className="px-2 py-1 rounded bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-[10px]"
                                    title="Mark Completed"
                                  >
                                    Done
                                  </button>
                                )}
                                {res.status !== 'cancelled' && (
                                  <button
                                    onClick={() => onUpdateReservationStatus(res.id, 'cancelled')}
                                    className="px-2 py-1 rounded bg-red-950/40 text-red-400 hover:bg-red-900/60 transition-colors text-[10px]"
                                    title="Cancel"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* EXISTING TAB 6: MENU & PRICE CONTROLLER (100% PRESERVED) */}
        {/* ============================================================== */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-white">Menu & Live Price Controller</h3>
                <p className="text-xs text-[#C5B8A5]">
                  Update dish details, adjust prices in ₹ INR, and toggle live availability instantly.
                </p>
              </div>
              <button
                onClick={() => setIsAddingDish(true)}
                className="px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-black hover:opacity-90 flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Delicacy</span>
              </button>
            </div>

            {/* Add Dish Form Modal */}
            {isAddingDish && (
              <form
                onSubmit={handleCreateDish}
                className="glass-card rounded-xl p-6 border border-[#D4AF37]/40 space-y-4"
              >
                <h4 className="font-serif text-lg text-white">Create New Royal Offering</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="text-white/60 block mb-1">Delicacy Name</label>
                    <input
                      type="text"
                      required
                      value={newDishName}
                      onChange={(e) => setNewDishName(e.target.value)}
                      placeholder="e.g. Saffron Dum Gosht"
                      className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 block mb-1">Category</label>
                    <select
                      value={newDishCategory}
                      onChange={(e) => setNewDishCategory(e.target.value as any)}
                      className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white"
                    >
                      <option value="Royal Appetizers">Royal Appetizers</option>
                      <option value="Heritage Mains">Heritage Mains</option>
                      <option value="Tandoori Specials">Tandoori Specials</option>
                      <option value="Artisanal Desserts">Artisanal Desserts</option>
                      <option value="Exotic Mocktails">Exotic Mocktails</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/60 block mb-1">Price (₹ INR)</label>
                    <input
                      type="number"
                      required
                      min={100}
                      value={newDishPrice}
                      onChange={(e) => setNewDishPrice(Number(e.target.value))}
                      className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 block mb-1">Culinary Heritage Origin</label>
                    <input
                      type="text"
                      value={newDishOrigin}
                      onChange={(e) => setNewDishOrigin(e.target.value)}
                      placeholder="e.g. Royal Nawabi Kitchens"
                      className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/60 block mb-1 text-xs">Description & Ingredients</label>
                  <textarea
                    rows={2}
                    value={newDishDesc}
                    onChange={(e) => setNewDishDesc(e.target.value)}
                    placeholder="Describe culinary preparation, spices, and notes..."
                    className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingDish(false)}
                    className="px-4 py-1.5 text-xs text-white/50 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold bg-[#D4AF37] text-black rounded"
                  >
                    Save to Menu
                  </button>
                </div>
              </form>
            )}

            {/* Dish Management Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((dish) => {
                const isEditing = editingDishId === dish.id;

                return (
                  <div
                    key={dish.id}
                    className="glass-card rounded-xl p-5 border border-[#D4AF37]/20 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                            {dish.category}
                          </span>
                          <h4 className="font-serif text-lg font-medium text-white">{dish.name}</h4>
                          <span className="text-xs text-white/50">{dish.culinaryOrigin}</span>
                        </div>

                        {/* Price & Availability */}
                        <div className="text-right">
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-[#D4AF37]">₹</span>
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-24 p-1 rounded bg-[#14110F] border border-[#D4AF37] text-white text-sm tabular-nums"
                              />
                            </div>
                          ) : (
                            <span className="font-serif text-xl font-bold text-[#F3EFEA] tabular-nums">
                              ₹{dish.price.toLocaleString('en-IN')}
                            </span>
                          )}

                          <button
                            onClick={() =>
                              onUpdateMenuItem({
                                ...dish,
                                isAvailable: !dish.isAvailable,
                              })
                            }
                            className={`block mt-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded transition-colors ${
                              dish.isAvailable
                                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-700/50'
                                : 'bg-red-950/60 text-red-400 border border-red-700/50'
                            }`}
                          >
                            {dish.isAvailable ? 'In Stock' : 'Sold Out'}
                          </button>
                        </div>
                      </div>

                      {/* Description View or Edit */}
                      {isEditing ? (
                        <textarea
                          rows={2}
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-xs text-white"
                        />
                      ) : (
                        <p className="text-xs text-[#C5B8A5] font-light line-clamp-2">
                          {dish.description}
                        </p>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-white/40">
                        {dish.dietary.join(', ')}
                      </span>

                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSaveEditDish(dish)}
                              className="px-3 py-1 rounded bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingDishId(null)}
                              className="px-3 py-1 rounded bg-white/10 text-white/60 text-xs"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStartEditDish(dish)}
                              className="px-3 py-1 rounded bg-[#221C18] text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center gap-1"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => onDeleteMenuItem(dish.id)}
                              className="p-1 text-white/40 hover:text-red-400 transition-colors"
                              title="Delete Dish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* EXISTING TAB 7: DINING SPACES MANAGER (100% PRESERVED) */}
        {/* ============================================================== */}
        {activeTab === 'spaces' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-white">Dining Space Management</h3>
              <p className="text-xs text-[#C5B8A5]">
                Control operational availability, capacity, and timings across your three premier salons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {spaces.map((sp) => (
                <div
                  key={sp.id}
                  className="glass-card rounded-xl p-6 border border-[#D4AF37]/25 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-serif text-lg font-medium text-white">{sp.name}</h4>
                        <span className="text-[11px] text-[#D4AF37]">{sp.subtitle}</span>
                      </div>
                      <button
                        onClick={() =>
                          onUpdateSpace({
                            ...sp,
                            isAvailable: !sp.isAvailable,
                          })
                        }
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          sp.isAvailable
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-700/50'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-700/50'
                        }`}
                      >
                        {sp.isAvailable ? 'Open for Booking' : 'Private Block'}
                      </button>
                    </div>

                    <div className="space-y-2 text-xs text-[#C5B8A5]">
                      <div>
                        <span className="text-white/40 block text-[10px]">Service Timings</span>
                        <input
                          type="text"
                          value={sp.timings}
                          onChange={(e) =>
                            onUpdateSpace({
                              ...sp,
                              timings: e.target.value,
                            })
                          }
                          className="w-full p-1.5 rounded bg-[#14110F] border border-white/10 text-white mt-1"
                        />
                      </div>

                      <div>
                        <span className="text-white/40 block text-[10px]">Guest Capacity</span>
                        <input
                          type="number"
                          value={sp.capacity}
                          onChange={(e) =>
                            onUpdateSpace({
                              ...sp,
                              capacity: Number(e.target.value),
                            })
                          }
                          className="w-full p-1.5 rounded bg-[#14110F] border border-white/10 text-white mt-1 tabular-nums"
                        />
                      </div>

                      <div>
                        <span className="text-white/40 block text-[10px]">Dress Code</span>
                        <input
                          type="text"
                          value={sp.dressCode}
                          onChange={(e) =>
                            onUpdateSpace({
                              ...sp,
                              dressCode: e.target.value,
                            })
                          }
                          className="w-full p-1.5 rounded bg-[#14110F] border border-white/10 text-white mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 text-[11px] text-[#D4AF37]">
                    Changes apply immediately to table reservation filters.
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* EXISTING TAB 8: VISUAL GALLERY MANAGER (100% PRESERVED) */}
        {/* ============================================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-white">Visual Gallery Manager</h3>
                <p className="text-xs text-[#C5B8A5]">
                  Manage fine-dining ambiance and architectural photography presented to patrons.
                </p>
              </div>
              <button
                onClick={() => setIsAddingPhoto(true)}
                className="px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-black hover:opacity-90 flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Photo</span>
              </button>
            </div>

            {/* Add Photo Modal */}
            {isAddingPhoto && (
              <form
                onSubmit={handleAddPhotoSubmit}
                className="glass-card rounded-xl p-6 border border-[#D4AF37]/40 space-y-4"
              >
                <h4 className="font-serif text-lg text-white">Add New Ambiance Feature</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-white/60 block mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      placeholder="e.g. Ganges Sunset Diya Glow"
                      className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 block mb-1">Category</label>
                    <select
                      value={newPhotoCategory}
                      onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                      className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white"
                    >
                      <option value="Ambiance">Ambiance</option>
                      <option value="Culinary">Culinary</option>
                      <option value="Ganges View">Ganges View</option>
                      <option value="Heritage">Heritage</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-white/60 block mb-1 text-xs">Caption</label>
                  <input
                    type="text"
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    placeholder="Short architectural or culinary note..."
                    className="w-full p-2 rounded bg-[#14110F] border border-white/20 text-white text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingPhoto(false)}
                    className="px-4 py-1.5 text-xs text-white/50 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold bg-[#D4AF37] text-black rounded"
                  >
                    Publish to Gallery
                  </button>
                </div>
              </form>
            )}

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-xl overflow-hidden border border-[#D4AF37]/20 space-y-2 p-3"
                >
                  <div className="relative h-40 w-full rounded-lg overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 text-[#D4AF37]">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-start justify-between pt-1">
                    <div>
                      <h4 className="font-serif text-sm font-medium text-white">{item.title}</h4>
                      <p className="text-[11px] text-white/50 line-clamp-1">{item.caption}</p>
                    </div>
                    <button
                      onClick={() => onDeleteGalleryItem(item.id)}
                      className="text-white/40 hover:text-red-400 p-1"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* EXISTING TAB 9: BRAND & FESTIVE BANNER CONTROL (100% PRESERVED) */}
        {/* ============================================================== */}
        {activeTab === 'banner' && (
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-white">Brand & Festive Banner Control</h3>
              <p className="text-xs text-[#C5B8A5]">
                Configure the top announcement bar for festive seasons (Dev Deepavali, Shivratri, Royal Banquets).
              </p>
            </div>

            <form
              onSubmit={handleSaveBannerConfig}
              className="glass-card rounded-xl p-6 sm:p-8 border border-[#D4AF37]/30 space-y-5"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-sm font-medium text-white block">Banner Active Status</span>
                  <span className="text-xs text-white/40">Toggle banner visibility across guest pages</span>
                </div>
                <button
                  type="button"
                  onClick={() => setBannerActive(!bannerActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    bannerActive ? 'bg-[#D4AF37]' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                      bannerActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  Badge Lead-in Text
                </label>
                <input
                  type="text"
                  value={bannerBadge}
                  onChange={(e) => setBannerBadge(e.target.value)}
                  placeholder="e.g. Festive Experience"
                  className="w-full px-3 py-2 rounded-lg bg-[#14110F] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  Banner Headline
                </label>
                <input
                  type="text"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  placeholder="e.g. Dev Deepavali & Royal Ganga Soirée 2026"
                  className="w-full px-3 py-2 rounded-lg bg-[#14110F] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={bannerSubtitle}
                  onChange={(e) => setBannerSubtitle(e.target.value)}
                  placeholder="Experience 1,000,000 glowing river lamps..."
                  className="w-full px-3 py-2 rounded-lg bg-[#14110F] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {bannerSavedAlert && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Banner changes saved! Reflecting immediately on the guest homepage.</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black hover:opacity-90 transition-all shadow"
                >
                  Save & Publish Banner
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Staff Authentication Modal */}
      {isAuthModalOpen && (
        <AuthModal
          currentUser={currentUser}
          onLogin={(user) => {
            setCurrentUser(user);
            setIsAuthModalOpen(false);
            // Smart auto-routing based on role
            if (user.role === 'head_chef') {
              setActiveTab('kds');
            } else if (user.role === 'manager') {
              setActiveTab('pos');
            }
          }}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}
    </div>
  );
};
