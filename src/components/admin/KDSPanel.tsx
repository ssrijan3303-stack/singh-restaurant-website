import React, { useState } from 'react';
import { KDSOrder, OrderStatus, KitchenStation, MenuItem } from '../../types/restaurant';
import {
  ChefHat,
  Clock,
  CheckCircle2,
  AlertCircle,
  Flame,
  Utensils,
  BellRing,
  Filter,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface KDSPanelProps {
  orders: KDSOrder[];
  menuItems: MenuItem[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onAddNewOrder: (order: KDSOrder) => void;
}

export const KDSPanel: React.FC<KDSPanelProps> = ({
  orders,
  menuItems,
  onUpdateOrderStatus,
  onAddNewOrder,
}) => {
  const [selectedStation, setSelectedStation] = useState<KitchenStation>('All Stations');
  const [statusFilter, setStatusFilter] = useState<'active' | 'completed' | 'all'>('active');
  const [soundAlertEnabled, setSoundAlertEnabled] = useState(true);
  const [chimeTriggered, setChimeTriggered] = useState(false);

  // Filter orders by station and status
  const filteredOrders = orders.filter((ord) => {
    const matchesStation =
      selectedStation === 'All Stations' ||
      ord.primaryStation === selectedStation ||
      ord.items.some((it) => it.station === selectedStation);

    const matchesStatus =
      statusFilter === 'active'
        ? ord.status === 'new' || ord.status === 'preparing' || ord.status === 'ready'
        : statusFilter === 'completed'
        ? ord.status === 'served'
        : true;

    return matchesStation && matchesStatus;
  });

  // Calculate elapsed minutes from order creation
  const getElapsedMinutes = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    return Math.max(1, Math.floor(diffMs / (60 * 1000)));
  };

  // Quick simulated ticket punch for testing
  const handleSimulateIncomingTicket = () => {
    const tables = ['T-02', 'R-03', 'MB-02', 'T-05'];
    const randomTable = tables[Math.floor(Math.random() * tables.length)];
    const randomDish1 = menuItems[Math.floor(Math.random() * 4)];
    const randomDish2 = menuItems[4 + Math.floor(Math.random() * 4)];

    const newOrder: KDSOrder = {
      id: `kds-live-${Date.now()}`,
      orderNumber: `KDS-${Math.floor(2000 + Math.random() * 7000)}`,
      tableNumber: randomTable,
      spaceName: randomTable.startsWith('R')
        ? 'The Ganges Rooftop'
        : randomTable.startsWith('MB')
        ? 'Maharaja Private Booth'
        : 'Grand Dining Room',
      guestName: 'Varanasi Royal Guest',
      serverName: 'Captain Rameshwar',
      status: 'new',
      primaryStation: 'Biryani & Curries',
      priority: Math.random() > 0.5 ? 'rush' : 'normal',
      notes: 'Fresh table seating · Guest requested medium royal spice level.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [
        {
          menuItem: randomDish1 || menuItems[0],
          quantity: 2,
          station: 'Tandoor & Grill',
          specialNotes: 'Crisp hot presentation',
        },
        {
          menuItem: randomDish2 || menuItems[4],
          quantity: 1,
          station: 'Biryani & Curries',
        },
      ],
    };

    onAddNewOrder(newOrder);
    setChimeTriggered(true);
    setTimeout(() => setChimeTriggered(false), 2500);
  };

  // Pipeline Status counts
  const newCount = orders.filter((o) => o.status === 'new').length;
  const prepCount = orders.filter((o) => o.status === 'preparing').length;
  const readyCount = orders.filter((o) => o.status === 'ready').length;

  return (
    <div className="space-y-6">
      {/* Top KDS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-2xl text-white">Kitchen Display System (KDS)</h3>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500 text-black">
              Executive Expeditor Console
            </span>
          </div>
          <p className="text-xs text-[#C5B8A5]">
            Real-time order pipeline categorized by floor table numbers. Manage order status from firing to the hot pass.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Sound Alert Toggle */}
          <button
            onClick={() => setSoundAlertEnabled(!soundAlertEnabled)}
            className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
              soundAlertEnabled
                ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400'
                : 'border-white/10 bg-[#161210] text-white/40'
            }`}
            title="Toggle kitchen chime simulation"
          >
            <BellRing className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chime Alerts</span>
          </button>

          {/* Simulate New Ticket Button */}
          <button
            onClick={handleSimulateIncomingTicket}
            className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Incoming Ticket</span>
          </button>
        </div>
      </div>

      {/* Chime Animation Banner when order lands */}
      {chimeTriggered && (
        <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-200 text-xs flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-400" />
            <span>*DING-DING!* New table order received from Floor Server! Ticket added to pipeline.</span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-amber-400 text-black px-2 py-0.5 rounded font-bold">
            Kitchen Alert
          </span>
        </div>
      )}

      {/* Station Navigation & Status KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Stations Filter */}
        <div className="md:col-span-8 flex overflow-x-auto gap-1 pb-1 scrollbar-none">
          {(
            [
              'All Stations',
              'Biryani & Curries',
              'Tandoor & Grill',
              'Cold & Desserts',
              'Beverage Bar',
            ] as KitchenStation[]
          ).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStation(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                selectedStation === st
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-sm'
                  : 'bg-[#14110F] text-white/60 border-white/10 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Status Pipeline Filter */}
        <div className="md:col-span-4 flex justify-end gap-1.5">
          <div className="inline-flex p-1 rounded-lg bg-[#14110F] border border-white/10 text-xs">
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded transition-colors ${
                statusFilter === 'active'
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Active ({newCount + prepCount + readyCount})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 rounded transition-colors ${
                statusFilter === 'completed'
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Served / Past
            </button>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded transition-colors ${
                statusFilter === 'all'
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              All
            </button>
          </div>
        </div>
      </div>

      {/* Operational Stage Summary Chips */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-3.5 rounded-xl border border-blue-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-blue-300 font-bold block">
              1. New Orders
            </span>
            <span className="font-serif text-2xl font-bold text-white tabular-nums">
              {newCount}
            </span>
          </div>
          <AlertCircle className="w-5 h-5 text-blue-400" />
        </div>

        <div className="glass-card p-3.5 rounded-xl border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">
              2. Preparing / On Ember
            </span>
            <span className="font-serif text-2xl font-bold text-amber-400 tabular-nums">
              {prepCount}
            </span>
          </div>
          <Flame className="w-5 h-5 text-amber-400" />
        </div>

        <div className="glass-card p-3.5 rounded-xl border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block">
              3. Ready on Hot Pass
            </span>
            <span className="font-serif text-2xl font-bold text-emerald-400 tabular-nums">
              {readyCount}
            </span>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>
      </div>

      {/* Live Order Cards Grid (Grouped by Table Number) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.length === 0 ? (
          <div className="col-span-full text-center py-16 text-white/30 text-xs glass-card rounded-xl border border-white/10 space-y-2">
            <ChefHat className="w-10 h-10 mx-auto opacity-30 text-[#D4AF37]" />
            <h4 className="font-serif text-base text-white/70">All Station Orders Cleared</h4>
            <p className="text-[11px] max-w-sm mx-auto">
              No orders currently in this status pipeline. Use the "Simulate Incoming Ticket" or punch orders from POS to see live tickets.
            </p>
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const elapsedMins = getElapsedMinutes(ord.createdAt);
            const isUrgent = elapsedMins > 20 || ord.priority === 'rush';

            return (
              <div
                key={ord.id}
                className={`glass-card rounded-xl border flex flex-col justify-between overflow-hidden shadow-xl transition-all ${
                  ord.status === 'ready'
                    ? 'border-emerald-500/60 shadow-emerald-950/20'
                    : ord.status === 'preparing'
                    ? 'border-amber-500/60 shadow-amber-950/20'
                    : isUrgent
                    ? 'border-red-500/70 shadow-red-950/30'
                    : 'border-white/15'
                }`}
              >
                {/* Card Header (Categorized by Table Number) */}
                <div
                  className={`p-3.5 border-b flex items-center justify-between ${
                    ord.status === 'ready'
                      ? 'bg-emerald-950/40 border-emerald-500/30'
                      : ord.status === 'preparing'
                      ? 'bg-amber-950/30 border-amber-500/30'
                      : 'bg-[#181412] border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-extrabold px-2.5 py-0.5 rounded bg-black/60 border border-white/20 text-[#D4AF37] tabular-nums">
                      Table {ord.tableNumber}
                    </span>
                    <div>
                      <span className="font-serif text-sm font-semibold text-white block leading-tight">
                        {ord.orderNumber}
                      </span>
                      <span className="text-[10px] text-white/40 block truncate max-w-[120px]">
                        {ord.spaceName}
                      </span>
                    </div>
                  </div>

                  {/* Elapsed Timer & Priority */}
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        elapsedMins > 20
                          ? 'bg-red-900/60 text-red-300 border border-red-700/60 animate-pulse'
                          : elapsedMins > 12
                          ? 'bg-amber-900/60 text-amber-300 border border-amber-700/60'
                          : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/60'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{elapsedMins}m</span>
                    </div>
                    {ord.priority === 'rush' && (
                      <span className="block text-[9px] uppercase font-bold text-red-400 tracking-wider mt-0.5">
                        RUSH VIP
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body: Items & Chef Notes */}
                <div className="p-4 space-y-3 flex-1 text-xs">
                  {/* Server & Guest subline */}
                  <div className="flex justify-between text-[11px] text-white/50 border-b border-white/5 pb-2">
                    <span>Guest: {ord.guestName}</span>
                    <span>Server: {ord.serverName}</span>
                  </div>

                  {/* Ordered Items List */}
                  <div className="space-y-2">
                    {ord.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between gap-2 p-1.5 rounded bg-[#14110F] border border-white/5"
                      >
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-extrabold text-sm text-[#D4AF37] tabular-nums">
                            {item.quantity}×
                          </span>
                          <div>
                            <span className="font-medium text-white block">
                              {item.menuItem.name}
                            </span>
                            {item.specialNotes && (
                              <span className="text-[10px] text-amber-300 font-sans block bg-amber-950/40 px-1 rounded mt-0.5">
                                Note: {item.specialNotes}
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="text-[9px] uppercase tracking-wider text-white/40 shrink-0">
                          {item.station.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* General Order Ticket Notes */}
                  {ord.notes && (
                    <div className="p-2 rounded bg-black/40 border border-white/10 text-[11px] text-[#C5B8A5]">
                      <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-bold block mb-0.5">
                        Expeditor Instructions:
                      </span>
                      {ord.notes}
                    </div>
                  )}
                </div>

                {/* Card Actions Footer: Status Stepper */}
                <div className="p-3 bg-[#120F0D] border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="text-[10px] uppercase font-bold tracking-wider">
                    {ord.status === 'new' && (
                      <span className="text-blue-400">Status: New Order</span>
                    )}
                    {ord.status === 'preparing' && (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400" />
                        Cooking
                      </span>
                    )}
                    {ord.status === 'ready' && (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Ready to Serve
                      </span>
                    )}
                    {ord.status === 'served' && (
                      <span className="text-white/40">Status: Delivered</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {ord.status === 'new' && (
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'preparing')}
                        className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1 shadow"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Start Prep</span>
                      </button>
                    )}

                    {ord.status === 'preparing' && (
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'ready')}
                        className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1 shadow"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Ready to Serve</span>
                      </button>
                    )}

                    {ord.status === 'ready' && (
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'served')}
                        className="px-3 py-1.5 rounded bg-[#D4AF37] hover:bg-[#E5C365] text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1 shadow"
                      >
                        <Utensils className="w-3 h-3" />
                        <span>Mark Served</span>
                      </button>
                    )}

                    {ord.status === 'served' && (
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'ready')}
                        className="px-2 py-1 rounded bg-white/5 text-white/50 hover:text-white text-[10px]"
                        title="Reopen order to Ready"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
