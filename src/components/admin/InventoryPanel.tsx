import React, { useState } from 'react';
import { InventoryItem, InventoryCategory, StockStatus } from '../../types/restaurant';
import {
  PackageOpen,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  TrendingDown,
  Warehouse,
  Boxes,
  ArrowUpDown,
  X,
} from 'lucide-react';

interface InventoryPanelProps {
  items: InventoryItem[];
  onUpdateStock: (itemId: string, newStock: number) => void;
  onAddItem: (item: InventoryItem) => void;
}

export const InventoryPanel: React.FC<InventoryPanelProps> = ({
  items,
  onUpdateStock,
  onAddItem,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [restockModalItem, setRestockModalItem] = useState<InventoryItem | null>(null);
  const [restockAmount, setRestockAmount] = useState<number>(10);

  // New Item Form State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<InventoryCategory>('Spices & Saffron');
  const [newStock, setNewStock] = useState<number>(100);
  const [newMinThreshold, setNewMinThreshold] = useState<number>(50);
  const [newUnit, setNewUnit] = useState('kg');
  const [newCost, setNewCost] = useState<number>(450);
  const [newSupplier, setNewSupplier] = useState('');
  const [newLocation, setNewLocation] = useState('Dry Storage Room 1');

  // Low stock & Critical count
  const criticalItems = items.filter(
    (it) => it.currentStock <= it.minThreshold * 0.5
  );
  const lowStockItems = items.filter(
    (it) => it.currentStock <= it.minThreshold && it.currentStock > it.minThreshold * 0.5
  );

  // Filtered Inventory
  const filteredItems = items.filter((it) => {
    const matchesCat = categoryFilter === 'All' || it.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'All'
        ? true
        : statusFilter === 'low_stock'
        ? it.currentStock <= it.minThreshold
        : it.status === statusFilter;
    const matchesSearch =
      it.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      it.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      it.storageLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesStatus && matchesSearch;
  });

  const handleQuickRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restockModalItem) return;
    const nextStock = restockModalItem.currentStock + Number(restockAmount);
    onUpdateStock(restockModalItem.id, nextStock);
    setRestockModalItem(null);
  };

  const handleCreateItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const status: StockStatus =
      newStock <= newMinThreshold * 0.5
        ? 'critical'
        : newStock <= newMinThreshold
        ? 'low_stock'
        : 'in_stock';

    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      currentStock: Number(newStock),
      minThreshold: Number(newMinThreshold),
      unit: newUnit.trim(),
      costPerUnitInr: Number(newCost),
      status,
      lastRestocked: new Date().toISOString().split('T')[0],
      supplier: newSupplier.trim() || 'Varanasi Heritage Supplier Guild',
      storageLocation: newLocation.trim() || 'Central Storage Vault',
    };

    onAddItem(newItem);
    setIsAddingItem(false);
    setNewName('');
    setNewSupplier('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-2xl text-white">Inventory & Stock Control</h3>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#D4AF37] text-black">
              Pantry & Cellar
            </span>
          </div>
          <p className="text-xs text-[#C5B8A5]">
            Real-time stock monitoring of rare Kashmiri saffron, royal Awadhi spices, dairy, and culinary supplies with automated threshold alerts.
          </p>
        </div>

        <button
          onClick={() => setIsAddingItem(true)}
          className="px-4 py-2 rounded-lg bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-1.5 self-start sm:self-auto shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Raw Material</span>
        </button>
      </div>

      {/* Low Stock Emergency Banner */}
      {(criticalItems.length > 0 || lowStockItems.length > 0) && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/70 via-amber-950/40 to-black/60 border border-amber-500/40 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>
                Low-Stock Attention Required: {criticalItems.length + lowStockItems.length} items below minimum safety threshold
              </span>
            </div>
            <button
              onClick={() => setStatusFilter('low_stock')}
              className="text-[11px] text-[#D4AF37] hover:underline uppercase font-bold tracking-wide"
            >
              Filter Low Stock
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {criticalItems.map((it) => (
              <span
                key={it.id}
                className="px-2.5 py-1 rounded bg-red-900/60 border border-red-500/60 text-red-200 font-medium text-[11px] flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                <strong>{it.name}:</strong> {it.currentStock} {it.unit} (Min: {it.minThreshold})
              </span>
            ))}
            {lowStockItems.map((it) => (
              <span
                key={it.id}
                className="px-2.5 py-1 rounded bg-amber-900/50 border border-amber-500/50 text-amber-200 font-medium text-[11px]"
              >
                {it.name}: {it.currentStock} {it.unit}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-white/10 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-white/50 block">
            Total Monitored SKUs
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-2xl font-bold text-white tabular-nums">
              {items.length}
            </span>
            <Boxes className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-emerald-500/20 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 block">
            Healthy Stock Levels
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-2xl font-bold text-emerald-400 tabular-nums">
              {items.filter((i) => i.currentStock > i.minThreshold).length}
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-amber-500/20 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-amber-400/80 block">
            Low Stock Warnings
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-2xl font-bold text-amber-400 tabular-nums">
              {lowStockItems.length}
            </span>
            <TrendingDown className="w-4 h-4 text-amber-400" />
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-red-500/30 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-red-400 block">
            Critical Depletion
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-2xl font-bold text-red-400 tabular-nums">
              {criticalItems.length}
            </span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search raw material, supplier, or vault location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#181412] border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            'All',
            'Spices & Saffron',
            'Dairy & Fresh',
            'Grains & Staples',
            'Royal Aromatics & Oils',
            'Tableware & Packaging',
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                categoryFilter === cat
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-semibold shadow'
                  : 'bg-[#14110F] text-white/60 border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="glass-card rounded-xl border border-[#D4AF37]/20 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181412] text-[#D4AF37] uppercase tracking-wider text-[10px] border-b border-[#D4AF37]/20">
              <tr>
                <th className="py-3 px-4">Raw Material & Spec</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Threshold</th>
                <th className="py-3 px-4">Unit Cost</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Storage Vault</th>
                <th className="py-3 px-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#E0D7C9]">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-white/40">
                    No matching ingredients found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isLow = item.currentStock <= item.minThreshold;
                  const isCrit = item.currentStock <= item.minThreshold * 0.5;

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-serif font-semibold text-white block text-sm">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-white/40">
                          Supplier: {item.supplier}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-xs text-[#D4AF37]">{item.category}</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-sm tabular-nums">
                        <span
                          className={
                            isCrit
                              ? 'text-red-400 font-extrabold'
                              : isLow
                              ? 'text-amber-400'
                              : 'text-white'
                          }
                        >
                          {item.currentStock.toLocaleString('en-IN')}{' '}
                          <span className="text-xs font-normal text-white/50">{item.unit}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono tabular-nums text-white/60">
                        {item.minThreshold} {item.unit}
                      </td>

                      <td className="py-3.5 px-4 font-mono tabular-nums">
                        ₹{item.costPerUnitInr.toLocaleString('en-IN')}/{item.unit.split(' ')[0]}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                            isCrit
                              ? 'bg-red-950/70 text-red-300 border border-red-700/60 animate-pulse'
                              : isLow
                              ? 'bg-amber-950/70 text-amber-300 border border-amber-700/60'
                              : 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50'
                          }`}
                        >
                          {isCrit ? 'Critical' : isLow ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[11px] text-white/60">
                        {item.storageLocation}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onUpdateStock(item.id, item.currentStock + 5)}
                            className="px-2 py-1 rounded bg-[#201B17] hover:bg-[#D4AF37] hover:text-black border border-white/10 text-[10px] font-mono font-semibold transition-colors"
                            title="Quick add +5"
                          >
                            +5
                          </button>
                          <button
                            onClick={() => onUpdateStock(item.id, item.currentStock + 25)}
                            className="px-2 py-1 rounded bg-[#201B17] hover:bg-[#D4AF37] hover:text-black border border-white/10 text-[10px] font-mono font-semibold transition-colors"
                            title="Quick add +25"
                          >
                            +25
                          </button>
                          <button
                            onClick={() => {
                              setRestockModalItem(item);
                              setRestockAmount(item.minThreshold);
                            }}
                            className="px-2.5 py-1 rounded bg-[#D4AF37] text-black text-[10px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                          >
                            Restock
                          </button>
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

      {/* Restock Quantity Modal */}
      {restockModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <form
            onSubmit={handleQuickRestockSubmit}
            className="w-full max-w-md bg-[#161210] border border-[#D4AF37]/50 rounded-2xl p-6 text-white space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-lg text-white">
                Restock {restockModalItem.name}
              </h3>
              <button
                type="button"
                onClick={() => setRestockModalItem(null)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-white/60 block">
                Current Stock: {restockModalItem.currentStock} {restockModalItem.unit} (Safety Minimum: {restockModalItem.minThreshold})
              </span>
              <label className="text-xs text-white/80 block pt-2">Units to Add ({restockModalItem.unit})</label>
              <input
                type="number"
                required
                min={1}
                value={restockAmount}
                onChange={(e) => setRestockAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-[#100D0B] border border-white/20 text-sm font-mono text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRestockModalItem(null)}
                className="px-4 py-2 text-xs text-white/50 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-black"
              >
                Confirm Restock
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add New Raw Material Modal */}
      {isAddingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <form
            onSubmit={handleCreateItemSubmit}
            className="w-full max-w-xl bg-[#161210] border border-[#D4AF37]/50 rounded-2xl p-6 text-white space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-lg text-white">Add New Raw Material SKU</h3>
              <button
                type="button"
                onClick={() => setIsAddingItem(false)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-white/60 block">Ingredient / SKU Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Kashmiri Walnuts"
                  className="w-full px-3 py-2 rounded bg-[#100D0B] border border-white/20 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded bg-[#100D0B] border border-white/20 text-white"
                >
                  <option value="Spices & Saffron">Spices & Saffron</option>
                  <option value="Dairy & Fresh">Dairy & Fresh</option>
                  <option value="Grains & Staples">Grains & Staples</option>
                  <option value="Royal Aromatics & Oils">Royal Aromatics & Oils</option>
                  <option value="Tableware & Packaging">Tableware & Packaging</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">Initial Quantity</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={newStock}
                  onChange={(e) => setNewStock(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded bg-[#100D0B] border border-white/20 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">Min Threshold (Alert Trigger)</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={newMinThreshold}
                  onChange={(e) => setNewMinThreshold(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded bg-[#100D0B] border border-white/20 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">Measurement Unit</label>
                <input
                  type="text"
                  required
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  placeholder="kg, grams, Liters, sheets"
                  className="w-full px-3 py-2 rounded bg-[#100D0B] border border-white/20 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">Cost Per Unit (₹ INR)</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded bg-[#100D0B] border border-white/20 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">Supplier Name</label>
                <input
                  type="text"
                  value={newSupplier}
                  onChange={(e) => setNewSupplier(e.target.value)}
                  placeholder="e.g. Kashmir Agritech Hub"
                  className="w-full px-3 py-2 rounded bg-[#100D0B] border border-white/20 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">Storage Chamber / Vault</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Spice Vault A-2"
                  className="w-full px-3 py-2 rounded bg-[#100D0B] border border-white/20 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsAddingItem(false)}
                className="px-4 py-2 text-xs text-white/50 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-black"
              >
                Save Ingredient SKU
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
