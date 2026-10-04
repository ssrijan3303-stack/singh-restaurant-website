import React, { useState } from 'react';
import {
  MenuItem,
  DiningSpace,
  Reservation,
  GalleryItem,
  PromoBanner,
  ReviewItem,
  CartItem,
  ReservationStatus,
} from './types/restaurant';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_DINING_SPACES,
  INITIAL_RESERVATIONS,
  INITIAL_GALLERY_ITEMS,
  INITIAL_BANNER,
  INITIAL_REVIEWS,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { FestiveBanner } from './components/FestiveBanner';
import { HeroSection } from './components/HeroSection';
import { DiningSpacesSection } from './components/DiningSpacesSection';
import { MenuSection } from './components/MenuSection';
import { TastingTrayDrawer } from './components/TastingTrayDrawer';
import { ReservationSection } from './components/ReservationSection';
import { HeritageSection } from './components/HeritageSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  // Central State with Live Synchronization
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [diningSpaces, setDiningSpaces] = useState<DiningSpace[]>(INITIAL_DINING_SPACES);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [banner, setBanner] = useState<PromoBanner>(INITIAL_BANNER);
  const [reviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  // Cart / Tasting Tray State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Admin Mode Switcher State
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Reservation Interactivity State
  const [preselectedSpaceId, setPreselectedSpaceId] = useState<string>('grand-dining-room');
  const [quickReserveParams, setQuickReserveParams] = useState<{
    date: string;
    time: string;
    guests: number;
    space: string;
  } | null>(null);

  // Cart Handlers
  const handleAddToCart = (dish: MenuItem, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.menuItem.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.menuItem.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { menuItem: dish, quantity }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.menuItem.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.menuItem.id !== dishId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Quick Reserve from Hero Bar
  const handleQuickReserve = (params: {
    date: string;
    time: string;
    guests: number;
    space: string;
  }) => {
    setQuickReserveParams(params);
    setPreselectedSpaceId(params.space);
    const reservationElement = document.getElementById('reservation');
    if (reservationElement) {
      reservationElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Space select from Dining Spaces section
  const handleSelectSpaceForBooking = (spaceId: string) => {
    setPreselectedSpaceId(spaceId);
    const reservationElement = document.getElementById('reservation');
    if (reservationElement) {
      reservationElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Guest submits new table reservation
  const handleNewReservation = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
  };

  // Admin CMS Handlers
  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleAddMenuItem = (newItem: MenuItem) => {
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateSpace = (updatedSpace: DiningSpace) => {
    setDiningSpaces((prev) =>
      prev.map((s) => (s.id === updatedSpace.id ? updatedSpace : s))
    );
  };

  const handleUpdateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleAddReservation = (res: Reservation) => {
    setReservations((prev) => [res, ...prev]);
  };

  const handleAddGalleryItem = (item: GalleryItem) => {
    setGalleryItems((prev) => [item, ...prev]);
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateBanner = (newBanner: PromoBanner) => {
    setBanner(newBanner);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F3EFEA] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* If Admin Mode is Active, show the dedicated Owner Management CMS Dashboard */}
      {isAdminMode ? (
        <AdminDashboard
          menuItems={menuItems}
          spaces={diningSpaces}
          reservations={reservations}
          galleryItems={galleryItems}
          banner={banner}
          onUpdateMenuItem={handleUpdateMenuItem}
          onAddMenuItem={handleAddMenuItem}
          onDeleteMenuItem={handleDeleteMenuItem}
          onUpdateSpace={handleUpdateSpace}
          onUpdateReservationStatus={handleUpdateReservationStatus}
          onAddReservation={handleAddReservation}
          onAddGalleryItem={handleAddGalleryItem}
          onDeleteGalleryItem={handleDeleteGalleryItem}
          onUpdateBanner={handleUpdateBanner}
          onCloseAdmin={() => setIsAdminMode(false)}
        />
      ) : (
        /* Guest Public Experience */
        <>
          {/* Top Promotional / Seasonal Festive Announcement Banner */}
          <FestiveBanner
            banner={banner}
            onCtaClick={() => {
              const resElem = document.getElementById('reservation');
              if (resElem) resElem.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Luxury 3-Zone Sticky Navigation Bar */}
          <Navbar
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenReservation={() => {
              const resElem = document.getElementById('reservation');
              if (resElem) resElem.scrollIntoView({ behavior: 'smooth' });
            }}
            isAdminMode={isAdminMode}
            onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
          />

          <main className="flex-1">
            {/* 1. Full-Screen Cinematic Hero Section with Quick Reservation Bar */}
            <HeroSection
              onQuickReserve={handleQuickReserve}
              onExploreMenu={() => {
                const menuElem = document.getElementById('menu');
                if (menuElem) menuElem.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Distinctive Multi-Experience Dining Spaces Showcase */}
            <DiningSpacesSection
              spaces={diningSpaces}
              onSelectSpaceForBooking={handleSelectSpaceForBooking}
            />

            {/* 3. Interactive Categorized Digital Menu Page with Tray Integration */}
            <MenuSection
              menuItems={menuItems}
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
            />

            {/* 4. Luxury Multi-Step Table Reservation & Instant Confirmation System */}
            <ReservationSection
              spaces={diningSpaces}
              cartItems={cartItems}
              onNewReservation={handleNewReservation}
              preselectedSpaceId={preselectedSpaceId}
              prefilledParams={quickReserveParams}
            />

            {/* 5. About Us & Our Varanasi Culinary Heritage (Master Chefs) */}
            <HeritageSection />

            {/* 6. Visual Experience & Ambiance Gallery with Lightbox */}
            <GallerySection galleryItems={galleryItems} />

            {/* 7. Live Patron Reviews & Prestigious Accolades */}
            <ReviewsSection reviews={reviews} />

            {/* 8. Contact & Location Hub with Varanasi Proximity Guide */}
            <ContactLocationSection />
          </main>

          {/* Slide-Over Tasting Tray Drawer */}
          <TastingTrayDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onProceedToReservation={() => {
              const resElem = document.getElementById('reservation');
              if (resElem) resElem.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Royal Footer with Monogram & Concierge Hub */}
          <Footer
            onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
            isAdminMode={isAdminMode}
          />
        </>
      )}
    </div>
  );
}
