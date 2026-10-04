import React, { useState } from 'react';
import {
  DailyRevenuePoint,
  PeakHourPoint,
  TopSellingDishStat,
  BillInvoice,
} from '../../types/restaurant';
import {
  DAILY_REVENUE_HISTORY,
  PEAK_HOURS_DATA,
  TOP_SELLING_DISHES,
} from '../../data/enterpriseData';
import {
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  Download,
  Calendar,
  Award,
  Sparkles,
  ArrowUpRight,
  Printer,
  Compass,
} from 'lucide-react';

interface AnalyticsPanelProps {
  invoices: BillInvoice[];
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ invoices }) => {
  const [timeframe, setTimeframe] = useState<'7days' | '30days' | 'year'>('7days');
  const [hoveredDay, setHoveredDay] = useState<DailyRevenuePoint | null>(null);
  const [hoveredHour, setHoveredHour] = useState<PeakHourPoint | null>(null);

  // Financial summary aggregations
  const total7DayRevenue = DAILY_REVENUE_HISTORY.reduce((acc, d) => acc + d.revenue, 0);
  const todayRevenue = DAILY_REVENUE_HISTORY[DAILY_REVENUE_HISTORY.length - 1]?.revenue || 472500;
  const todayCovers = DAILY_REVENUE_HISTORY[DAILY_REVENUE_HISTORY.length - 1]?.covers || 178;
  const avgSpendToday = Math.round(todayRevenue / todayCovers);
  const monthlyRevenue = 2845000;

  // Max revenue for SVG bar scale
  const maxDayRevenue = Math.max(...DAILY_REVENUE_HISTORY.map((d) => d.revenue));
  const maxHourCovers = Math.max(...PEAK_HOURS_DATA.map((h) => h.covers));

  // CSV Export Action
  const handleExportCSV = () => {
    const headers = 'Date,Day,Gross_Revenue_INR,Covers_Served,Average_Spend_INR\n';
    const rows = DAILY_REVENUE_HISTORY.map(
      (d) => `${d.date},${d.dayLabel},${d.revenue},${d.covers},${d.avgSpend}`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Singh_Restaurant_Revenue_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-2xl text-white">Analytics & Business Intelligence</h3>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#D4AF37] text-black">
              Executive Briefing
            </span>
          </div>
          <p className="text-xs text-[#C5B8A5]">
            Daily and monthly gross revenues, peak hour footfall curves, top-selling Awadhi delicacies, and space performance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 rounded-lg bg-[#14110F] border border-white/10 text-xs">
            <button
              onClick={() => setTimeframe('7days')}
              className={`px-3 py-1 rounded transition-colors ${
                timeframe === '7days' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-white/60'
              }`}
            >
              Past 7 Days
            </button>
            <button
              onClick={() => setTimeframe('30days')}
              className={`px-3 py-1 rounded transition-colors ${
                timeframe === '30days' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-white/60'
              }`}
            >
              This Month
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-lg bg-[#181412] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metric KPI Snapshot Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Gross Revenue */}
        <div className="glass-card p-5 rounded-xl border border-[#D4AF37]/35 space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider text-white/50 block font-medium">
              Today's Gross Sales
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center">
              <ArrowUpRight className="w-3 h-3" />
              +18.4%
            </span>
          </div>
          <div className="font-serif text-3xl font-bold text-white tabular-nums">
            ₹{todayRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-[#C5B8A5]">
            Target: ₹4,50,000 · <span className="text-emerald-400">105% achieved</span>
          </p>
        </div>

        {/* Monthly Revenue */}
        <div className="glass-card p-5 rounded-xl border border-[#D4AF37]/20 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider text-white/50 block font-medium">
              Month-to-Date Revenue
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#D4AF37] tabular-nums">
            ₹{monthlyRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-white/50">
            October 2026 Forecast: ₹42,00,000
          </p>
        </div>

        {/* Today's Covers Served */}
        <div className="glass-card p-5 rounded-xl border border-white/10 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider text-white/50 block font-medium">
              Guests / Covers Today
            </span>
            <Users className="w-4 h-4 text-white/50" />
          </div>
          <div className="font-serif text-3xl font-bold text-white tabular-nums">
            {todayCovers}{' '}
            <span className="text-xs font-normal font-sans text-white/50">patrons</span>
          </div>
          <p className="text-[11px] text-[#C5B8A5]">
            Table Turn Rate: <span className="text-white font-mono">1.8 turns/shift</span>
          </p>
        </div>

        {/* Average Table Spend */}
        <div className="glass-card p-5 rounded-xl border border-white/10 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider text-white/50 block font-medium">
              Average Spend Per Cover
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-white tabular-nums">
            ₹{avgSpendToday.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-[#C5B8A5]">
            Beverage Attachment: <span className="text-white font-mono">68%</span>
          </p>
        </div>
      </div>

      {/* 2-COLUMN SECTION: REVENUE TRENDS & PEAK HOURS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Revenue Interactive Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-xl p-5 border border-[#D4AF37]/25 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-serif text-lg font-bold text-white">Daily Revenue Trajectory</h4>
              <span className="text-xs text-[#C5B8A5]">
                Week total: <strong className="text-white font-mono">₹{total7DayRevenue.toLocaleString('en-IN')}</strong>
              </span>
            </div>
            {hoveredDay && (
              <div className="text-right text-xs bg-[#1A1613] px-3 py-1.5 rounded-lg border border-[#D4AF37]/40">
                <span className="text-white font-bold block">{hoveredDay.dayLabel} ({hoveredDay.date}):</span>
                <span className="text-[#D4AF37] font-mono font-bold">
                  ₹{hoveredDay.revenue.toLocaleString('en-IN')}
                </span>{' '}
                · <span className="text-white/60 font-mono">{hoveredDay.covers} covers</span>
              </div>
            )}
          </div>

          {/* SVG Bar Chart */}
          <div className="h-64 w-full pt-4">
            <svg viewBox="0 0 560 220" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="goldBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8C6D1F" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="goldBarGradHover" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>

              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                const y = 180 - pct * 150;
                const value = Math.round((maxDayRevenue * pct) / 1000) * 1000;
                return (
                  <g key={idx}>
                    <line
                      x1="45"
                      y1={y}
                      x2="550"
                      y2={y}
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="2,3"
                    />
                    <text
                      x="40"
                      y={y + 3}
                      fill="rgba(255,255,255,0.3)"
                      fontSize="9"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      ₹{(value / 1000).toFixed(0)}k
                    </text>
                  </g>
                );
              })}

              {/* Bars */}
              {DAILY_REVENUE_HISTORY.map((day, idx) => {
                const barWidth = 46;
                const spacing = 72;
                const x = 65 + idx * spacing;
                const barHeight = (day.revenue / maxDayRevenue) * 150;
                const y = 180 - barHeight;
                const isHovered = hoveredDay?.date === day.date;

                return (
                  <g
                    key={day.date}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {/* Bar Rectangle */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="4"
                      fill={isHovered ? 'url(#goldBarGradHover)' : 'url(#goldBarGrad)'}
                      className="transition-all duration-200"
                      filter={isHovered ? 'drop-shadow(0 0 8px rgba(212,175,55,0.5))' : undefined}
                    />

                    {/* Value on top of bar */}
                    <text
                      x={x + barWidth / 2}
                      y={y - 6}
                      fill={isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.7)'}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      ₹{(day.revenue / 1000).toFixed(0)}k
                    </text>

                    {/* X-axis label */}
                    <text
                      x={x + barWidth / 2}
                      y="198"
                      fill={isHovered ? '#D4AF37' : 'rgba(255,255,255,0.6)'}
                      fontSize="10"
                      fontWeight={isHovered ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {day.dayLabel.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Peak Hours Occupancy Analysis (5 Cols) */}
        <div className="lg:col-span-5 glass-card rounded-xl p-5 border border-white/10 space-y-4">
          <div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="font-serif text-lg font-bold text-white">Peak Dining Hours Curve</h4>
            </div>
            <p className="text-xs text-[#C5B8A5]">
              Varanasi riverfront table occupancy spikes during Ganga Aarti (7:30 - 9:30 PM).
            </p>
          </div>

          {/* Peak hour mini curve / list */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {PEAK_HOURS_DATA.map((ph) => {
              const isPeak = ph.occupancyPercent >= 90;
              return (
                <div
                  key={ph.hour}
                  className={`p-2 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                    isPeak
                      ? 'border-amber-500/40 bg-amber-950/20 text-white'
                      : 'border-white/5 bg-[#14110F] text-white/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-medium text-white w-16">{ph.hour}</span>
                    <div className="w-24 bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isPeak ? 'bg-[#D4AF37]' : 'bg-white/40'
                        }`}
                        style={{ width: `${ph.occupancyPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-white/60">{ph.covers} covers</span>
                    <span className="font-bold text-[#D4AF37] w-18 text-right">
                      ₹{(ph.revenue / 1000).toFixed(0)}k
                    </span>
                    {isPeak && (
                      <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-900/60 px-1 rounded">
                        Rush
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2-COLUMN SECTION: TOP DISHES LEADERBOARD & DINING SPACE REVENUE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top-Selling Dishes Leaderboard (8 Cols) */}
        <div className="lg:col-span-8 glass-card rounded-xl border border-[#D4AF37]/20 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="font-serif text-lg font-bold text-white">Top-Selling Delicacies</h4>
            </div>
            <span className="text-xs text-[#C5B8A5]">Sales Leaderboard & Profit Margins</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#181412] text-[#D4AF37] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Rank & Delicacy</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4 text-center">Portions Sold</th>
                  <th className="py-2.5 px-4 text-right">Gross Sales (₹)</th>
                  <th className="py-2.5 px-4 text-right">Margin %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#E0D7C9]">
                {TOP_SELLING_DISHES.map((dish, idx) => (
                  <tr key={dish.dishId} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-serif font-semibold text-white block text-sm">
                          {dish.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-[#D4AF37]">{dish.category}</td>

                    <td className="py-3 px-4 text-center font-mono font-bold text-white tabular-nums">
                      {dish.unitsSold}
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-[#D4AF37] tabular-nums">
                      ₹{dish.revenue.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      <span className="text-emerald-400 font-bold">{dish.marginPercent}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Space Distribution (4 Cols) */}
        <div className="lg:col-span-4 glass-card rounded-xl p-5 border border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-serif text-lg font-bold text-white">Space Revenue Share</h4>
          </div>

          <div className="space-y-3 text-xs">
            {/* Ganges Rooftop */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium text-white">The Ganges Rooftop</span>
                <span className="font-mono text-[#D4AF37] font-bold">45% (₹12.8L)</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#E5C365] h-full rounded-full w-[45%]" />
              </div>
            </div>

            {/* Grand Dining Room */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium text-white">The Grand Dining Room</span>
                <span className="font-mono text-[#D4AF37] font-bold">38% (₹10.8L)</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#8C6D1F] to-[#D4AF37] h-full rounded-full w-[38%]" />
              </div>
            </div>

            {/* Botanical Bar */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium text-white">Botanical Lounge & Bar</span>
                <span className="font-mono text-[#D4AF37] font-bold">17% (₹4.8L)</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-700 to-amber-500 h-full rounded-full w-[17%]" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-[11px] text-[#C5B8A5]">
            Rooftop tables yield 28% higher beverage attachment due to sunset riverside dining.
          </div>
        </div>
      </div>
    </div>
  );
};
