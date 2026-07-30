/**
 * Marketplace.jsx
 * HopeRise Inspired Browsing Interface
 * Features:
 *   – Sound synthesized audio effects on every filter toggle & page jump
 *   – High visibility filters (Type, Evolution Stage 1/2/3, Rarity, Region, Price)
 *   – Paginated infinite scroll via usePokemonInfinite
 */
import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal, Search, X, ChevronDown, ChevronUp,
  Filter, Loader2, AlertCircle, RefreshCw, Dna, Sparkles
} from 'lucide-react';
import PokemonCard from '../components/PokemonCard';
import PokemonCardSkeleton from '../components/PokemonCardSkeleton';
import { usePokemonInfinite } from '../hooks/usePokemon';
import {
  applyFilters, sortPokemon,
  EVOLUTION_STAGES, GENERATIONS, RARITIES,
} from '../services/pokemonService';
import { sound } from '../utils/audio';

const TYPES = [
  { id: 'fire',     emoji: '🔥', label: 'Fire'     },
  { id: 'water',    emoji: '💧', label: 'Water'    },
  { id: 'grass',    emoji: '🌿', label: 'Grass'    },
  { id: 'electric', emoji: '⚡', label: 'Electric' },
  { id: 'psychic',  emoji: '🔮', label: 'Psychic'  },
  { id: 'fighting', emoji: '🥊', label: 'Fighting' },
  { id: 'dragon',   emoji: '🐉', label: 'Dragon'   },
  { id: 'ghost',    emoji: '👻', label: 'Ghost'    },
  { id: 'dark',     emoji: '🌑', label: 'Dark'     },
  { id: 'fairy',    emoji: '✨', label: 'Fairy'    },
  { id: 'ice',      emoji: '❄️', label: 'Ice'      },
  { id: 'steel',    emoji: '⚙️', label: 'Steel'    },
  { id: 'normal',   emoji: '⭕', label: 'Normal'   },
  { id: 'flying',   emoji: '🪶', label: 'Flying'   },
  { id: 'poison',   emoji: '☠️', label: 'Poison'   },
  { id: 'ground',   emoji: '🌍', label: 'Ground'   },
  { id: 'rock',     emoji: '🪨', label: 'Rock'     },
  { id: 'bug',      emoji: '🐛', label: 'Bug'      },
];

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured'            },
  { value: 'price-asc',  label: 'Price: Low → High'   },
  { value: 'price-desc', label: 'Price: High → Low'   },
  { value: 'rating',     label: 'Top Rated'           },
  { value: 'bst-desc',   label: 'Strongest (BST)'     },
  { value: 'name',       label: 'A → Z'               },
];

const MAX_PRICE = 260000;

function FilterSection({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/10 py-3.5">
      <button
        onClick={() => {
          sound.playFilter();
          setOpen(o => !o);
        }}
        className="w-full flex items-center gap-2 font-head text-xs font-bold text-slate-300 hover:text-orange-400 transition-colors cursor-pointer uppercase tracking-wider"
      >
        {Icon && <Icon className="w-3.5 h-3.5 text-orange-400 shrink-0" />}
        <span className="flex-1 text-left">{title}</span>
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-1.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Marketplace() {
  const [searchParams] = useSearchParams();
  const { allPokemon, total, hasMore, loading, error, loadMore, reset } = usePokemonInfinite(20);

  const [searchQuery,      setSearchQuery]      = useState('');
  const [selectedTypes,    setSelectedTypes]    = useState(() => {
    const t = searchParams.get('type'); return t ? [t] : [];
  });
  const [selectedStages,   setSelectedStages]   = useState(() => {
    const s = searchParams.get('stage'); return s ? [Number(s)] : [];
  });
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [selectedRegions,  setSelectedRegions]  = useState([]);
  const [maxPrice,         setMaxPrice]         = useState(MAX_PRICE);
  const [sortBy,           setSortBy]           = useState('featured');
  const [sidebarOpen,      setSidebarOpen]      = useState(false);

  const filtered = useMemo(() => {
    const filters = {
      types:           selectedTypes,
      rarities:        selectedRarities,
      evolutionStages: selectedStages,
      regions:         selectedRegions,
      maxPrice:        maxPrice < MAX_PRICE ? maxPrice : undefined,
      searchQuery,
    };
    return sortPokemon(applyFilters(allPokemon, filters), sortBy);
  }, [allPokemon, selectedTypes, selectedRarities, selectedStages, selectedRegions, maxPrice, searchQuery, sortBy]);

  const makeToggle = setter => val => {
    sound.playFilter();
    setter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  const toggleType   = useCallback(makeToggle(setSelectedTypes), []);
  const toggleStage  = useCallback(makeToggle(setSelectedStages), []);
  const toggleRarity = useCallback(makeToggle(setSelectedRarities), []);
  const toggleRegion = useCallback(makeToggle(setSelectedRegions), []);

  const hasFilters =
    selectedTypes.length > 0  || selectedStages.length > 0  ||
    selectedRarities.length > 0 || selectedRegions.length > 0 ||
    maxPrice < MAX_PRICE        || Boolean(searchQuery);

  const clearFilters = () => {
    sound.playPop();
    setSelectedTypes([]);
    setSelectedStages([]);
    setSelectedRarities([]);
    setSelectedRegions([]);
    setMaxPrice(MAX_PRICE);
    setSearchQuery('');
    setSortBy('featured');
  };

  const SidebarContent = () => (
    <div className="space-y-1">
      {/* Type */}
      <FilterSection title="Pokémon Type">
        <div className="grid grid-cols-2 gap-1.5">
          {TYPES.map(t => {
            const active = selectedTypes.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggleType(t.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-head font-semibold border transition-all cursor-pointer ${
                  active
                    ? `type-${t.id} border-orange-500/80 shadow-md`
                    : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Evolution Stage */}
      <FilterSection title="Evolution Stage" icon={Dna}>
        <div className="space-y-2">
          {EVOLUTION_STAGES.map(({ value, label, description }) => {
            const active = selectedStages.includes(value);
            const count  = allPokemon.filter(p => p.evolutionStage === value).length;
            return (
              <button
                key={value}
                onClick={() => toggleStage(value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-head font-bold border transition-all cursor-pointer ${
                  active
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow-md'
                    : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <span>{label} <span className="text-[10px] font-normal text-slate-400">({description})</span></span>
                <span className="font-num text-xs text-slate-400">{count}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Rarity */}
      <FilterSection title="Rarity Tier">
        <div className="space-y-1.5">
          {RARITIES.map(r => {
            const active = selectedRarities.includes(r);
            return (
              <button
                key={r}
                onClick={() => toggleRarity(r)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-head font-bold border transition-all cursor-pointer ${
                  active
                    ? 'bg-blue-600/30 border-blue-400 text-blue-200'
                    : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <span>{r}</span>
                <span className="font-num text-xs text-slate-400">
                  {allPokemon.filter(p => p.rarity === r).length}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Region */}
      <FilterSection title="Region" defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {GENERATIONS.map(gen => (
            <button
              key={gen}
              onClick={() => toggleRegion(gen)}
              className={`px-3 py-1 rounded-full text-xs font-head font-bold border transition-all cursor-pointer ${
                selectedRegions.includes(gen)
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {gen}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Slider */}
      <FilterSection title="Max Adoption Fee">
        <div className="space-y-3">
          <input
            type="range" min={0} max={MAX_PRICE} step={5000}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="w-full"
            style={{ '--val': `${(maxPrice / MAX_PRICE) * 100}%` }}
          />
          <div className="flex justify-between font-num text-xs font-bold text-slate-400">
            <span>₹0</span>
            <span className="text-orange-400">₹{maxPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </FilterSection>

      {hasFilters && (
        <div className="pt-3">
          <button
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 text-xs font-head font-bold cursor-pointer"
          >
            <X className="w-4 h-4" /> Reset Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen pt-28 pb-20 bg-lumiose">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <span className="font-head text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            Lumiose Sanctuary Catalog
          </span>
          <h1 className="font-head text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Adopt a <span className="gradient-text">Companion</span>
          </h1>
          <p className="font-body text-slate-400 text-sm mt-1">
            {filtered.length} shown · {allPokemon.length} loaded of {total.toLocaleString()} PokéDex entries
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Pokémon by name, type, or region..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-white placeholder-slate-400 font-body text-sm focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>
          <button
            onClick={() => {
              sound.playPop();
              setSidebarOpen(o => !o);
            }}
            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl btn-ghost text-white font-head text-xs font-bold shrink-0"
          >
            <Filter className="w-4 h-4 text-orange-400" /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 pokemon-card-container rounded-2xl p-5 max-h-[calc(100vh-140px)] overflow-y-auto">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
                <SlidersHorizontal className="w-4 h-4 text-orange-400" />
                <span className="font-head text-sm font-bold text-white">Filter Directory</span>
              </div>
              <SidebarContent />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm font-bold text-slate-300">
                Showing {filtered.length} Pokémon
              </span>
              <select
                value={sortBy}
                onChange={e => {
                  sound.playFilter();
                  setSortBy(e.target.value);
                }}
                className="bg-slate-900 border border-white/15 rounded-xl px-4 py-2 text-xs font-head font-bold text-white focus:outline-none focus:border-orange-500"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Product Cards */}
            {filtered.length > 0 || (loading && allPokemon.length === 0) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(p => <PokemonCard key={p.id} pokemon={p} />)}
                {loading && allPokemon.length === 0 &&
                  Array.from({ length: 20 }).map((_, i) => <PokemonCardSkeleton key={i} />)
                }
              </div>
            ) : (
              <div className="pokemon-card-container rounded-2xl p-12 text-center space-y-4">
                <div className="text-5xl">🔎</div>
                <h3 className="font-head text-lg font-bold text-white">No Matching Pokémon</h3>
                <p className="font-body text-xs text-slate-400 max-w-xs mx-auto">
                  Try broadening your search filters to find available Pokémon.
                </p>
                <button onClick={clearFilters} className="px-5 py-2.5 rounded-xl btn-primary text-white font-head text-xs font-bold cursor-pointer">
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Load More Pagination */}
            {hasMore && filtered.length > 0 && (
              <div className="flex flex-col items-center gap-3 pt-8">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    sound.playPop();
                    loadMore();
                  }}
                  className="px-8 py-3.5 rounded-2xl btn-primary text-white font-head font-bold text-sm cursor-pointer shadow-xl flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Load Next 20 Pokémon
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
