export type DietaryType = 'pure-veg' | 'sattvic' | 'jain' | 'non-veg' | 'chef-signature';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'Royal Appetizers' | 'Heritage Mains' | 'Tandoori Specials' | 'Artisanal Desserts' | 'Exotic Mocktails';
  price: number;
  description: string;
  culinaryOrigin: string;
  dietary: DietaryType[];
  image: string;
  allergens?: string[];
  spiceLevel: 1 | 2 | 3 | 4; // 1 mild, 4 royal spicy
  isAvailable: boolean;
  preparationTime: string;
  pairingRecommendation?: string;
  calories?: string;
}

export interface DiningSpace {
  id: string;
  name: string;
  subtitle: string;
  capacity: number;
  timings: string;
  atmosphere: string;
  image: string;
  description: string;
  highlights: string[];
  dressCode: string;
  recommendedFor: string;
  isAvailable: boolean;
}

export type ReservationStatus = 'confirmed' | 'seated' | 'completed' | 'cancelled';

export interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  email: string;
  guestCount: number;
  date: string;
  timeSlot: string;
  spaceId: string;
  seatingPreference: 'Indoor AC' | 'Rooftop River View' | 'Maharaja Private Booth' | 'Courtyard Lawn';
  occasion: 'Casual Dining' | 'Anniversary' | 'Birthday' | 'Business Dinner' | 'Romantic Rendezvous' | 'Family Celebration';
  dietaryNotes: string;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
  totalEstimatedInr?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Ambiance' | 'Culinary' | 'Ganges View' | 'Heritage';
  image: string;
  caption: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string;
  ctaText: string;
  ctaLink: string;
  active: boolean;
  validUntil: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  source: string;
}

// Enterprise Authentication Types
export type StaffRole = 'admin' | 'manager' | 'head_chef';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  employeeCode: string;
  designation: string;
  avatarUrl?: string;
  lastActive?: string;
}

// POS & Billing Types
export interface POSOrderItem {
  menuItem: MenuItem;
  quantity: number;
  specialNotes?: string;
  station: 'Tandoor & Grill' | 'Biryani & Curries' | 'Cold & Desserts' | 'Beverage Bar';
}

export type PaymentMethod = 'cash' | 'card' | 'upi' | 'room_folio';

export interface BillInvoice {
  invoiceNumber: string;
  orderId: string;
  tableNumber: string;
  spaceName: string;
  guestName: string;
  guestPhone?: string;
  serverName: string;
  items: POSOrderItem[];
  subtotal: number;
  gstRate: number; // 0.05
  gstAmount: number;
  serviceChargeRate: number; // 0.10
  serviceChargeAmount: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  isPaid: boolean;
  createdAt: string;
  settledAt?: string;
}

// Kitchen Display System (KDS) Types
export type OrderStatus = 'new' | 'preparing' | 'ready' | 'served' | 'cancelled';
export type KitchenStation = 'All Stations' | 'Tandoor & Grill' | 'Biryani & Curries' | 'Cold & Desserts' | 'Beverage Bar';

export interface KDSOrder {
  id: string;
  orderNumber: string;
  tableNumber: string;
  spaceName: string;
  guestName: string;
  serverName: string;
  items: POSOrderItem[];
  status: OrderStatus;
  primaryStation: KitchenStation;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  priority: 'normal' | 'rush';
}

// Inventory & Stock Control Types
export type InventoryCategory =
  | 'Spices & Saffron'
  | 'Dairy & Fresh'
  | 'Grains & Staples'
  | 'Royal Aromatics & Oils'
  | 'Tableware & Packaging';

export type StockStatus = 'in_stock' | 'low_stock' | 'critical';

export interface InventoryItem {
  id: string;
  name: string;
  category: InventoryCategory;
  currentStock: number;
  minThreshold: number;
  unit: string;
  costPerUnitInr: number;
  status: StockStatus;
  lastRestocked: string;
  supplier: string;
  storageLocation: string;
}

// Analytics & Reporting Types
export interface DailyRevenuePoint {
  date: string;
  dayLabel: string;
  revenue: number;
  covers: number;
  avgSpend: number;
}

export interface PeakHourPoint {
  hour: string;
  covers: number;
  revenue: number;
  occupancyPercent: number;
}

export interface TopSellingDishStat {
  dishId: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  marginPercent: number;
}

