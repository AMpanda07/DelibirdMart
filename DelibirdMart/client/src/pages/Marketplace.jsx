/**
 * Marketplace.jsx
 * Full browsing page with:
 *  - Sidebar: Type filter, Rarity filter, Price slider, Region filter
 *  - Header: Sort + result count
 *  - Responsive product grid using PokemonCard
 *  - URL search param sync (?type=, ?rarity=)
 *  - Animated filter state
 */
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Search, X, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import PokemonCard from '../components/PokemonCard';
import { POKEMON_LIST, TYPES, RARITIES, TYPE_MAP } from '../data/mockData';

/* ── Sidebar section accordion ────────────────────────────────── */
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/6 py-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between font-head text-sm font-bold text-white/70 hover:text-white transition-colors cursor-pointer"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Sort options ─────────────────────────────────────────────── */
const SORT_OPTIONS = [
  { value: 'featured',  label: 'Featured'     },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc',label: 'Price: High → Low' },
  { value: 'rating',    label: 'Top Rated'    },
  { value: 'newest',    label: 'Newest First' },
];

const REGIONS = ['All', 'Kalos', 'Kanto', 'Hoenn', 'Sinnoh', 'Paldea'];

/* ── MAX_PRICE ────────────────────────────────────────────────── */
const MAX_PRICE = 100000;

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ── Filter state ── */
  const [searchQuery,    setSearchQuery]    = useState('');
  const [selectedTypes,  setSelectedTypes]  = useState(() => {
    const t = searchParams.get('type');
    return t ? [t] : [];
  });
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [selectedRegion,   setSelectedRegion]   = useState('All');
  const [maxPrice,         setMaxPrice]         = useState(MAX_PRICE);
  const [sortBy,           setSortBy]           = useState('featured');
  const [sidebarOpen,      setSidebarOpen]      = useState(false); // mobile

  /* ── Sync URL param on mount ── */
  useEffect(() => {
    const t = searchParams.get('type');
    if (t) setSelectedTypes([t]);
  }, []); // eslint-disable-line

  /* ── Toggle helpers ── */
  const toggleType = (typeId) => {
    setSelectedTypes(prev =>
      prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]
    );
  };
  const toggleRarity = (r) => {
    setSelectedRarities(prev =>
      prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
    );
  };
  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedRarities([]);
    setSelectedRegion('All');
    setMaxPrice(MAX_PRICE);
    setSearchQuery('');
    setSortBy('featured');
  };
  const hasFilters = selectedTypes.length > 0 || selectedRarities.length > 0
    || selectedRegion !== 'All' || maxPrice < MAX_PRICE || searchQuery;

  /* ── Filtered + sorted list ── */
  const filtered = useMemo(() => {
    let list = POKEMON_LIST.filter(p => {
      const matchType   = selectedTypes.length === 0 || selectedTypes.some(t => p.types.includes(t));
      const matchRarity = selectedRarities.length === 0 || selectedRarities.includes(p.rarity);
      const matchRegion = selectedRegion === 'All' || p.region === selectedRegion;
      const matchPrice  = p.price <= maxPrice;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.types.some(t => t.includes(q));
      return matchType && matchRarity && matchRegion && matchPrice && matchSearch;
    });

    switch (sortBy) {
      case 'price-asc':  return [...list].sort((a,b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a,b) => b.price - a.price);
      case 'rating':     return [...list].sort((a,b) => b.rating - a.rating);
      case 'newest':     return [...list].reverse();
      default:           return list; // featured = default order
    }
  }, [selectedTypes, selectedRarities, selectedRegion, maxPrice, searchQuery, sortBy]);

  /* ── Sidebar panel (shared desktop/mobile) ── */
  const SidebarContent = () => (
    <div className="space-y-0">
      {/* Types */}
      <FilterSection title="Pokémon Type">
        <div className="grid grid-cols-2 gap-1.5">
          {TYPES.map(type => {
            const active = selectedTypes.includes(type.id);
            return (
              <button
                key={type.id}
                onClick={() => toggleType(type.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-body font-medium transition-all cursor-pointer border ${
                  active
                    ? `type-${type.id} border-opacity-60`
                    : 'glass border-white/8 text-white/50 hover:text-white hover:border-white/15'
                }`}
              >
                <span>{type.emoji}</span>
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Rarity */}
      <FilterSection title="Rarity">
        <div className="space-y-1.5">
          {RARITIES.map(r => {
            const active = selectedRarities.includes(r);
            const cls = `rarity-${r.toLowerCase()}`;
            return (
              <button
                key={r}
                onClick={() => toggleRarity(r)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-body font-medium border transition-all cursor-pointer ${
                  active ? `${cls} border-opacity-60 glass` : 'glass border-white/8 text-white/50 hover:text-white'
                }`}
              >
                <span>{r}</span>
                <span className="font-num text-[11px] text-white/30">
                  {POKEMON_LIST.filter(p => p.rarity === r).length}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Region */}
      <FilterSection title="Region">
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map(reg => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1 rounded-full text-xs font-body border transition-all cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                  : 'glass border-white/8 text-white/40 hover:text-white'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price slider */}
      <FilterSection title="Max Adoption Fee" defaultOpen>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={MAX_PRICE}
            step={1000}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="w-full"
            style={{ '--val': `${(maxPrice / MAX_PRICE) * 100}%` }}
          />
          <div className="flex justify-between font-num text-xs text-white/40">
            <span>₹0</span>
            <span className="text-blue-400 font-semibold">₹{maxPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </FilterSection>

      {/* Clear */}
      {hasFilters && (
        <div className="pt-3">
          <button
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass border border-red-500/25 text-red-400 hover:bg-red-500/10 transition-all text-xs font-body font-semibold cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen pt-24 pb-16 bg-lumiose">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 space-y-1"
        >
          <p className="font-body text-xs text-blue-400 uppercase tracking-widest font-medium">Lumiose City Marketplace</p>
          <h1 className="font-head text-3xl sm:text-4xl font-extrabold text-white">
            Find Your <span className="gradient-text">Companion</span>
          </h1>
          <p className="font-body text-white/45 text-sm">{POKEMON_LIST.length} Pokémon available for adoption</p>
        </motion.div>

        {/* ── Search + mobile filter toggle ── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Pokémon by name or type…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-white/10 font-body text-sm text-white placeholder-white/30
                         focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all"
            />
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl btn-ghost text-white/70 font-body text-sm cursor-pointer shrink-0"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
          </button>
        </div>

        <div className="flex gap-7">

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-28 glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/8">
                <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                <span className="font-head text-sm font-bold text-white">Filters</span>
                {hasFilters && (
                  <span className="ml-auto text-[10px] font-body text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded-full border border-blue-500/25">Active</span>
                )}
              </div>
              <SidebarContent />
            </div>
          </aside>

          {/* ── Mobile Sidebar Overlay ── */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                  className="fixed left-0 top-0 h-full w-72 glass-strong border-r border-white/10 z-50 overflow-y-auto p-6 lg:hidden"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-head text-sm font-bold text-white flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                      Filters
                    </span>
                    <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-xl glass text-white/50 hover:text-white cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <SidebarContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── Main product area ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Sort bar */}
            <div className="flex items-center justify-between">
              <p className="font-body text-sm text-white/40">
                Showing <span className="text-white font-semibold">{filtered.length}</span> Pokémon
              </p>
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-white/40 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="glass border border-white/10 rounded-xl px-3 py-1.5 font-body text-sm text-white bg-transparent
                             focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none pr-8"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6,9 12,15 18,9'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value} className="bg-[#0C1B30]">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter pills */}
            <AnimatePresence>
              {hasFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-wrap gap-2 overflow-hidden"
                >
                  {selectedTypes.map(t => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass border border-white/12 text-xs font-body text-white/70"
                    >
                      {TYPE_MAP[t]?.emoji} {TYPE_MAP[t]?.label}
                      <button onClick={() => toggleType(t)} className="text-white/40 hover:text-white cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedRarities.map(r => (
                    <span
                      key={r}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass border border-white/12 text-xs font-body text-white/70"
                    >
                      {r}
                      <button onClick={() => toggleRarity(r)} className="text-white/40 hover:text-white cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedRegion !== 'All' && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass border border-white/12 text-xs font-body text-white/70">
                      {selectedRegion}
                      <button onClick={() => setSelectedRegion('All')} className="text-white/40 hover:text-white cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid */}
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map(pokemon => (
                    <motion.div
                      key={pokemon.id}
                      layout
                      initial={{ opacity: 0, scale: 0.93 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.93 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PokemonCard pokemon={pokemon} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass-card rounded-2xl p-14 text-center space-y-4"
              >
                <div className="text-4xl">🔍</div>
                <h3 className="font-head text-lg font-bold text-white">No Pokémon Found</h3>
                <p className="font-body text-sm text-white/40 max-w-xs mx-auto">
                  No Pokémon match your current filters. Try adjusting or clearing them.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-white font-body text-sm font-medium cursor-pointer"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
