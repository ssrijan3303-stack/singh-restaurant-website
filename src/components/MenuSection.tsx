import React, { useState, useMemo } from 'react';
import { MenuItem, DietaryType } from '../types/restaurant';
import { DishDetailModal } from './DishDetailModal';
import { Search, Sparkles, Plus, Check } from 'lucide-react';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onAddToCart: (dish: MenuItem, quantity: number) => void;
  onOpenCart: () => void;
}

const CATEGORIES: MenuItem['category'][] = [
  'Royal Appetizers',
  'Heritage Mains',
  'Tandoori Specials',
  'Artisanal Desserts',
  'Exotic Mocktails',
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuItem['category']>('Royal Appetizers');
  const [selectedDietary, setSelectedDietary] = useState<'all' | DietaryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDish, setActiveModalDish] = useState<MenuItem | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Filtered menu logic
  const filteredDishes = useMemo(() => {
    return menuItems.filter((dish) => {
      const matchesCategory = dish.category === selectedCategory;
      const matchesDietary =
        selectedDietary === 'all'
          ? true
          : selectedDietary === 'chef-signature'
          ? dish.dietary.includes('chef-signature')
          : dish.dietary.includes(selectedDietary as DietaryType);

      const matchesSearch =
        searchQuery.trim() === '' ||
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dish.hindiName && dish.hindiName.includes(searchQuery));

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [menuItems, selectedCategory, selectedDietary, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    onAddToCart(dish, 1);
    setRecentlyAddedId(dish.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1500);
  };

  return (
    <section id="menu" className="py-24 bg-[#0B0908] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Imperial Dastarkhwan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4F0] tracking-tight">
            Interactive Digital Menu
          </h2>
          <p className="text-sm sm:text-base text-[#BDB2A2] font-light leading-relaxed">
            Recipes handed down across generations, prepared with cold-pressed mustard oil, clotted Banaras cream, and rare botanical spices.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1 rounded-xl bg-[#161210] border border-[#D4AF37]/20 shadow-lg">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8922E] text-black shadow-md font-semibold'
                    : 'text-[#C5B8A5] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#D4AF37]/15">
          {/* Dietary Filter Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Offerings' },
              { id: 'pure-veg', label: 'Pure Veg' },
              { id: 'sattvic', label: 'Sattvic (No Onion/Garlic)' },
              { id: 'jain', label: 'Jain Friendly' },
              { id: 'chef-signature', label: 'Chef Signature' },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setSelectedDietary(diet.id as any)}
                className={`px-3 py-1.5 rounded text-xs font-medium tracking-wider transition-colors whitespace-nowrap ${
                  selectedDietary === diet.id
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/60'
                    : 'text-[#A89D8E] hover:text-white border border-transparent'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#D4AF37]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or spices..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#181412] border border-[#D4AF37]/25 text-xs text-[#EAE2D5] placeholder-[#7E7365] focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        {/* Dish Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-xl border border-dashed border-[#D4AF37]/30 max-w-md mx-auto">
            <p className="font-serif text-lg text-[#D4AF37]">No dishes found</p>
            <p className="text-xs text-[#9E9182] mt-1">Try resetting your search query or dietary filter.</p>
            <button
              onClick={() => {
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 text-xs font-semibold text-[#D4AF37] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => {
              const isAdded = recentlyAddedId === dish.id;

              return (
                <div
                  key={dish.id}
                  onClick={() => setActiveModalDish(dish)}
                  className="group glass-card rounded-xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-[#D4AF37]/5"
                >
                  {/* Dish Visual Header */}
                  <div>
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#161210]">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-transparent to-black/20" />

                      {/* Clean Unboxed Dietary Metadata */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-[#FAF6F0] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                        {dish.dietary.includes('pure-veg') && (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                            Pure Veg
                          </span>
                        )}
                        {dish.dietary.includes('non-veg') && (
                          <span className="flex items-center gap-1 text-amber-400">
                            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                            Gourmet Meat
                          </span>
                        )}
                        {dish.dietary.includes('sattvic') && (
                          <>
                            <span className="text-white/40">·</span>
                            <span className="text-[#D4AF37]">Sattvic</span>
                          </>
                        )}
                      </div>

                      {dish.dietary.includes('chef-signature') && (
                        <div className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#D4AF37] text-black shadow">
                          Chef's Pick
                        </div>
                      )}
                    </div>

                    {/* Dish Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-lg sm:text-xl font-medium text-[#FAF5ED] group-hover:text-[#D4AF37] transition-colors leading-snug">
                            {dish.name}
                          </h3>
                          {dish.hindiName && (
                            <span className="font-serif text-xs text-[#D4AF37]/80 block mt-0.5">
                              {dish.hindiName}
                            </span>
                          )}
                        </div>

                        {/* Price in INR */}
                        <div className="text-right shrink-0">
                          <span className="font-serif text-xl font-semibold text-[#F7F2E7] tabular-nums">
                            ₹{dish.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Clean Unboxed Origin & Metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#A89C8C]">
                        <span>{dish.culinaryOrigin}</span>
                        <span aria-hidden="true">·</span>
                        <span>{dish.preparationTime}</span>
                      </div>

                      {/* Description with Truncate */}
                      <p className="text-xs text-[#CBC0B1] font-light line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA Strip */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-white/5">
                    <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] group-hover:underline underline-offset-4">
                      Explore Flavors & Notes
                    </span>

                    <button
                      onClick={(e) => handleQuickAdd(e, dish)}
                      className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                        isAdded
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-[#1D1714] text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]'
                      }`}
                      aria-label={`Add ${dish.name} to tasting tray`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={activeModalDish}
        onClose={() => setActiveModalDish(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
