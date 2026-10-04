import {
  StaffUser,
  KDSOrder,
  InventoryItem,
  DailyRevenuePoint,
  PeakHourPoint,
  TopSellingDishStat,
  BillInvoice,
} from '../types/restaurant';
import { INITIAL_MENU_ITEMS } from './initialData';

// Pre-seeded Staff Accounts for 1-Click Evaluation and Manual Credentials
export const INITIAL_STAFF_USERS: StaffUser[] = [
  {
    id: 'staff-admin-1',
    name: 'Thakur Ranvijay Singh',
    email: 'ranvijay@singhrestaurant.in',
    role: 'admin',
    employeeCode: 'EMP-1984-ADM',
    designation: 'Patron Proprietor & Owner',
    lastActive: 'Just now',
  },
  {
    id: 'staff-mgr-1',
    name: 'Vikramaditya Roy',
    email: 'v.roy@singhrestaurant.in',
    role: 'manager',
    employeeCode: 'EMP-1984-MGR',
    designation: 'General Operations Manager',
    lastActive: '10 mins ago',
  },
  {
    id: 'staff-chef-1',
    name: 'Ustad Shamsher Ali',
    email: 'shamsher@singhrestaurant.in',
    role: 'head_chef',
    employeeCode: 'EMP-1984-CHF',
    designation: 'Executive Grand Khansama',
    lastActive: 'Active in Kitchen',
  },
];

// Luxury Tables Layout (Varanasi Fine Dining Architecture)
export interface RestaurantTable {
  id: string;
  tableNumber: string;
  spaceId: string;
  spaceName: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'billed';
  activeGuestName?: string;
  activeOrderId?: string;
}

export const RESTAURANT_TABLES: RestaurantTable[] = [
  {
    id: 'tbl-gdr-1',
    tableNumber: 'T-01',
    spaceId: 'grand-dining-room',
    spaceName: 'Grand Dining Room',
    capacity: 4,
    status: 'occupied',
    activeGuestName: 'Rajesh & Meera Agarwal',
    activeOrderId: 'KDS-8841',
  },
  {
    id: 'tbl-gdr-2',
    tableNumber: 'T-02',
    spaceId: 'grand-dining-room',
    spaceName: 'Grand Dining Room',
    capacity: 2,
    status: 'available',
  },
  {
    id: 'tbl-gdr-mb',
    tableNumber: 'MB-01',
    spaceId: 'grand-dining-room',
    spaceName: 'Maharaja Private Booth',
    capacity: 8,
    status: 'occupied',
    activeGuestName: 'Maharaja Digvijay Singh',
    activeOrderId: 'KDS-8842',
  },
  {
    id: 'tbl-gdr-3',
    tableNumber: 'T-03',
    spaceId: 'grand-dining-room',
    spaceName: 'Grand Dining Room',
    capacity: 4,
    status: 'available',
  },
  {
    id: 'tbl-roof-1',
    tableNumber: 'R-01',
    spaceId: 'ganges-rooftop',
    spaceName: 'The Ganges Rooftop',
    capacity: 2,
    status: 'occupied',
    activeGuestName: 'Dr. Evelyn Montgomery',
    activeOrderId: 'KDS-8843',
  },
  {
    id: 'tbl-roof-2',
    tableNumber: 'R-02',
    spaceId: 'ganges-rooftop',
    spaceName: 'The Ganges Rooftop',
    capacity: 4,
    status: 'available',
  },
  {
    id: 'tbl-roof-3',
    tableNumber: 'R-03',
    spaceId: 'ganges-rooftop',
    spaceName: 'The Ganges Rooftop (River Edge)',
    capacity: 2,
    status: 'reserved',
    activeGuestName: 'Ambassador S. Jaishankar party',
  },
  {
    id: 'tbl-roof-4',
    tableNumber: 'R-04',
    spaceId: 'ganges-rooftop',
    spaceName: 'The Ganges Rooftop',
    capacity: 6,
    status: 'available',
  },
  {
    id: 'tbl-bar-1',
    tableNumber: 'B-01',
    spaceId: 'singh-lounge-bar',
    spaceName: 'Botanical Bar & Lounge',
    capacity: 2,
    status: 'available',
  },
  {
    id: 'tbl-bar-2',
    tableNumber: 'B-02',
    spaceId: 'singh-lounge-bar',
    spaceName: 'Botanical Bar & Lounge',
    capacity: 4,
    status: 'available',
  },
];

// Live Initial Kitchen Display System (KDS) Tickets
export const INITIAL_KDS_ORDERS: KDSOrder[] = [
  {
    id: 'kds-ord-1',
    orderNumber: 'KDS-8841',
    tableNumber: 'T-01',
    spaceName: 'Grand Dining Room',
    guestName: 'Rajesh & Meera Agarwal',
    serverName: 'Captain Rameshwar',
    status: 'preparing',
    primaryStation: 'Biryani & Curries',
    priority: 'normal',
    notes: 'Strict Jain preparation. No onion or garlic, low oil in Dal-e-Banaras.',
    createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(), // 14 mins ago
    updatedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[5], // Dal-e-Banaras
        quantity: 2,
        specialNotes: 'Jain preparation with white butter',
        station: 'Biryani & Curries',
      },
      {
        menuItem: INITIAL_MENU_ITEMS[6], // Subz Shahi Nawabi Handi
        quantity: 2,
        specialNotes: 'Extra saffron gravy',
        station: 'Biryani & Curries',
      },
      {
        menuItem: INITIAL_MENU_ITEMS[8], // Truffle Naan
        quantity: 4,
        specialNotes: 'Crispy clay oven finish',
        station: 'Tandoor & Grill',
      },
      {
        menuItem: INITIAL_MENU_ITEMS[15], // Royal Banaras Thandai
        quantity: 4,
        specialNotes: 'Chilled clay kulhars',
        station: 'Beverage Bar',
      },
    ],
  },
  {
    id: 'kds-ord-2',
    orderNumber: 'KDS-8842',
    tableNumber: 'MB-01',
    spaceName: 'Maharaja Private Booth',
    guestName: 'Maharaja Digvijay Singh',
    serverName: 'Head Butler Devvrat',
    status: 'new',
    primaryStation: 'Tandoor & Grill',
    priority: 'rush',
    notes: 'Royal VIP Table. Serve in heirloom silver and warm brass cloches.',
    createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(), // 4 mins ago
    updatedAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[0], // Truffle Galouti Kebab
        quantity: 3,
        specialNotes: 'Extra winter black truffle mist',
        station: 'Tandoor & Grill',
      },
      {
        menuItem: INITIAL_MENU_ITEMS[4], // Royal Awadhi Dum Biryani
        quantity: 2,
        specialNotes: 'Break dough seal at the table side',
        station: 'Biryani & Curries',
      },
      {
        menuItem: INITIAL_MENU_ITEMS[14], // Ganga Aarti Smoked Saffron Cooler
        quantity: 3,
        specialNotes: 'Dry ice smoke presentation',
        station: 'Beverage Bar',
      },
    ],
  },
  {
    id: 'kds-ord-3',
    orderNumber: 'KDS-8843',
    tableNumber: 'R-01',
    spaceName: 'The Ganges Rooftop',
    guestName: 'Dr. Evelyn Montgomery',
    serverName: 'Captain Anand',
    status: 'ready',
    primaryStation: 'Cold & Desserts',
    priority: 'normal',
    notes: 'Patron requesting riverside dining view. Nut allergy confirmed.',
    createdAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(), // 22 mins ago
    updatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[1], // Banarasi Tamatar Chaat Tartlet
        quantity: 2,
        specialNotes: 'No nut garnish',
        station: 'Cold & Desserts',
      },
      {
        menuItem: INITIAL_MENU_ITEMS[11], // Sacred Malaiyo Cloud
        quantity: 2,
        specialNotes: '24K gold foil crown',
        station: 'Cold & Desserts',
      },
    ],
  },
];

// Initial Realistic Inventory & Raw Materials Stock
export const INITIAL_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Kashmiri Mongra Saffron (Grade A1)',
    category: 'Spices & Saffron',
    currentStock: 180,
    minThreshold: 250,
    unit: 'grams',
    costPerUnitInr: 380,
    status: 'low_stock',
    lastRestocked: '2026-09-28',
    supplier: 'Pampore Royal Saffron Syndicate',
    storageLocation: 'Vault Spice Humidor A-1',
  },
  {
    id: 'inv-2',
    name: '2-Year Aged Dehradun Dum Basmati',
    category: 'Grains & Staples',
    currentStock: 420,
    minThreshold: 150,
    unit: 'kg',
    costPerUnitInr: 210,
    status: 'in_stock',
    lastRestocked: '2026-10-01',
    supplier: 'Doon Valley Estate Mills',
    storageLocation: 'Grain Silo B-3',
  },
  {
    id: 'inv-3',
    name: 'Organic Gir Cow A2 Milk & Clotted Malai',
    category: 'Dairy & Fresh',
    currentStock: 35,
    minThreshold: 80,
    unit: 'Liters',
    costPerUnitInr: 120,
    status: 'critical',
    lastRestocked: '2026-10-04 (Morning)',
    supplier: 'Vedic Gangetic Dairy Gaushala',
    storageLocation: 'Cold Chamber 4°C',
  },
  {
    id: 'inv-4',
    name: 'Italian Black Winter Truffle Olive Oil',
    category: 'Royal Aromatics & Oils',
    currentStock: 14,
    minThreshold: 10,
    unit: 'Bottles (500ml)',
    costPerUnitInr: 4500,
    status: 'in_stock',
    lastRestocked: '2026-09-20',
    supplier: 'Urbani Truffles Import Corp',
    storageLocation: 'Chef Specialty Reserve',
  },
  {
    id: 'inv-5',
    name: 'Handcrafted Sandstone & Terracotta Kulhars',
    category: 'Tableware & Packaging',
    currentStock: 650,
    minThreshold: 300,
    unit: 'units',
    costPerUnitInr: 18,
    status: 'in_stock',
    lastRestocked: '2026-10-02',
    supplier: 'Chunar Pottery Guild, Mirzapur',
    storageLocation: 'Crockery Bay 2',
  },
  {
    id: 'inv-6',
    name: 'Awadhi 36-Spice Potli Secret Blend',
    category: 'Spices & Saffron',
    currentStock: 22,
    minThreshold: 15,
    unit: 'kg',
    costPerUnitInr: 1650,
    status: 'in_stock',
    lastRestocked: '2026-09-25',
    supplier: 'Singh Heritage Family Formulary',
    storageLocation: 'Secret Spice Locker',
  },
  {
    id: 'inv-7',
    name: 'Himalayan Wild Morels (Tandoori Guchhi)',
    category: 'Grains & Staples',
    currentStock: 3.5,
    minThreshold: 5.0,
    unit: 'kg',
    costPerUnitInr: 28000,
    status: 'low_stock',
    lastRestocked: '2026-09-15',
    supplier: 'Kashmir Forest Botanical Foragers',
    storageLocation: 'Dehydrator Safe 1',
  },
  {
    id: 'inv-8',
    name: '24K Edible Pure Gold Vark Sheets',
    category: 'Royal Aromatics & Oils',
    currentStock: 48,
    minThreshold: 100,
    unit: 'sheets',
    costPerUnitInr: 420,
    status: 'low_stock',
    lastRestocked: '2026-09-22',
    supplier: 'Jaipur Royal Goldsmiths Guild',
    storageLocation: 'Vault Box 04',
  },
  {
    id: 'inv-9',
    name: 'Fresh Gangetic Lotus Stems (Nadru)',
    category: 'Dairy & Fresh',
    currentStock: 65,
    minThreshold: 40,
    unit: 'kg',
    costPerUnitInr: 140,
    status: 'in_stock',
    lastRestocked: '2026-10-03',
    supplier: 'Ganges Riparian Farmers Coop',
    storageLocation: 'Vegetable Cool Crisper',
  },
  {
    id: 'inv-10',
    name: 'Assi Maghai Betel Leaves & Damask Rose Gulkand',
    category: 'Spices & Saffron',
    currentStock: 12,
    minThreshold: 20,
    unit: 'kg',
    costPerUnitInr: 850,
    status: 'low_stock',
    lastRestocked: '2026-09-30',
    supplier: 'Chowk Paan Heritage Traders',
    storageLocation: 'Herb Humidor 2',
  },
];

// Realistic Analytics Data (Varanasi Fine Dining 5-Star Performance)
export const DAILY_REVENUE_HISTORY: DailyRevenuePoint[] = [
  { date: '2026-09-28', dayLabel: 'Mon', revenue: 284500, covers: 114, avgSpend: 2495 },
  { date: '2026-09-29', dayLabel: 'Tue', revenue: 312000, covers: 128, avgSpend: 2437 },
  { date: '2026-09-30', dayLabel: 'Wed', revenue: 345600, covers: 136, avgSpend: 2541 },
  { date: '2026-10-01', dayLabel: 'Thu', revenue: 398200, covers: 152, avgSpend: 2619 },
  { date: '2026-10-02', dayLabel: 'Fri', revenue: 512800, covers: 194, avgSpend: 2643 },
  { date: '2026-10-03', dayLabel: 'Sat', revenue: 648000, covers: 238, avgSpend: 2722 },
  { date: '2026-10-04', dayLabel: 'Sun (Today)', revenue: 472500, covers: 178, avgSpend: 2654 },
];

export const PEAK_HOURS_DATA: PeakHourPoint[] = [
  { hour: '12:00 PM', covers: 22, revenue: 55000, occupancyPercent: 42 },
  { hour: '1:00 PM', covers: 58, revenue: 145000, occupancyPercent: 88 },
  { hour: '2:00 PM', covers: 48, revenue: 120000, occupancyPercent: 74 },
  { hour: '3:00 PM', covers: 18, revenue: 45000, occupancyPercent: 28 },
  { hour: '4:00 PM', covers: 12, revenue: 26000, occupancyPercent: 18 },
  { hour: '5:00 PM', covers: 16, revenue: 38000, occupancyPercent: 24 },
  { hour: '6:00 PM', covers: 32, revenue: 84000, occupancyPercent: 50 },
  { hour: '7:00 PM', covers: 68, revenue: 182000, occupancyPercent: 92 },
  { hour: '8:00 PM', covers: 86, revenue: 242000, occupancyPercent: 100 }, // Ganga Aarti Peak
  { hour: '9:00 PM', covers: 92, revenue: 265000, occupancyPercent: 100 },
  { hour: '10:00 PM', covers: 74, revenue: 198000, occupancyPercent: 86 },
  { hour: '11:00 PM', covers: 34, revenue: 92000, occupancyPercent: 46 },
];

export const TOP_SELLING_DISHES: TopSellingDishStat[] = [
  {
    dishId: 'dish-1',
    name: 'Truffle Galouti Kebab',
    category: 'Royal Appetizers',
    unitsSold: 342,
    revenue: 495900,
    marginPercent: 74,
  },
  {
    dishId: 'dish-5',
    name: 'Royal Awadhi Dum Biryani',
    category: 'Heritage Mains',
    unitsSold: 288,
    revenue: 532800,
    marginPercent: 68,
  },
  {
    dishId: 'dish-6',
    name: 'Dal-e-Banaras (Simmered 36h)',
    category: 'Heritage Mains',
    unitsSold: 412,
    revenue: 403760,
    marginPercent: 82,
  },
  {
    dishId: 'dish-12',
    name: 'The Sacred Malaiyo Cloud',
    category: 'Artisanal Desserts',
    unitsSold: 365,
    revenue: 310250,
    marginPercent: 78,
  },
  {
    dishId: 'dish-15',
    name: 'Ganga Aarti Smoked Saffron Cooler',
    category: 'Exotic Mocktails',
    unitsSold: 440,
    revenue: 286000,
    marginPercent: 86,
  },
  {
    dishId: 'dish-8',
    name: 'Paneer Lababdar-e-Kashi',
    category: 'Heritage Mains',
    unitsSold: 215,
    revenue: 275200,
    marginPercent: 71,
  },
];

// Sample Initial Invoices History
export const INITIAL_INVOICES: BillInvoice[] = [
  {
    invoiceNumber: 'INV-SR-1984-0491',
    orderId: 'KDS-8840',
    tableNumber: 'T-04',
    spaceName: 'Grand Dining Room',
    guestName: 'Sanjoy K. Roy',
    guestPhone: '+91 98110 55432',
    serverName: 'Captain Rameshwar',
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[0], // Galouti Kebab
        quantity: 2,
        station: 'Tandoor & Grill',
      },
      {
        menuItem: INITIAL_MENU_ITEMS[4], // Awadhi Biryani
        quantity: 2,
        station: 'Biryani & Curries',
      },
      {
        menuItem: INITIAL_MENU_ITEMS[12], // Shahi Tukda
        quantity: 2,
        station: 'Cold & Desserts',
      },
    ],
    subtotal: 8440,
    gstRate: 0.05,
    gstAmount: 422,
    serviceChargeRate: 0.1,
    serviceChargeAmount: 844,
    grandTotal: 9706,
    paymentMethod: 'card',
    isPaid: true,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    settledAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
  },
];
