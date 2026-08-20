/**
 * Marketplace.jsx
 * Pokémon Red, Black and White Aesthetic Browsing Interface
 * Mandatory Sign-In Protection for Marketplace Access
 */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal, Search, X, ChevronDown, ChevronUp,
  Loader2, Dna, Sparkles, Shield, Lock, LogIn
} from 'lucide-react';
import PokemonCard from '../components/PokemonCard';
import PokemonCardSkeleton from '../components/PokemonCardSkeleton';
import { usePokemonInfinite } from '../hooks/usePokemon';
import { useAuth } from '../context/AuthContext';
import {
  applyFilters, sortPokemon,
  EVOLUTION_STAGES, GENERATIONS, RARITIES,
} from '../services/pokemonService';
import { sound } from '../utils/audio';
import { formatPokéCoins } from '../utils/formatCurrency';

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
    <div className="border-b theme-border py-3.5">
      <button
        onClick={() => {
          sound.playFilter();
          setOpen(o => !o);
        }}
        className="w-full flex items-center gap-2 font-head text-xs font-bold theme-text hover:text-red-500 transition-colors cursor-pointer uppercase tracking-wider"
      >
        {Icon && <Icon className="w-3.5 h-3.5 text-red-500 shrink-0" />}
        <span className="flex-1 text-left">{title}</span>
        {open ? <ChevronUp className="w-3.5 h-3.5 theme-muted" /> : <ChevronDown className="w-3.5 h-3.5 theme-muted" />}
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
  const { isAuthenticated } = useAuth();
  const { allPokemon, total, hasMore, loading, loadMore } = usePokemonInfinite(20);

  const [searchQuery,      setSearchQuery]      = useState(() => searchParams.get('search') || '');
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

  // Trigger Auth Modal automatically if accessing marketplace while unauthenticated
  useEffect(() => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('open-auth-modal'));
    }
  }, [isAuthenticated]);

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

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-36 pb-20 bg-lumiose theme-text flex items-center justify-center px-4">
        <div className="max-w-md w-full pokemon-card-container rounded-3xl p-8 text-center space-y-6 shadow-2xl border-2 border-red-600/40">
          <div className="w-16 h-16 rounded-3xl bg-red-600/20 border border-red-600/50 flex items-center justify-center text-red-500 mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="font-head text-xs font-bold text-red-500 uppercase tracking-widest">
              RESTRICTED DIRECTORY
            </span>
            <h2 className="font-head text-2xl font-black theme-text uppercase">
              TRAINER SIGN IN <span className="gradient-text-red">REQUIRED</span>
            </h2>
            <p className="font-body text-xs theme-muted leading-relaxed">
              Accessing the Lumiose Sanctuary Pokémon Marketplace requires an official verified Trainer Pass account.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              window.dispatchEvent(new CustomEvent('open-auth-modal'));
            }}
            className="w-full py-3.5 rounded-2xl btn-primary text-white font-head font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xl"
          >
            <LogIn className="w-4 h-4" />
            Sign In / Register Pass
          </button>
        </div>
      </main>
    );
  }

  const SidebarContent = () => (
    <div className="space-y-1 theme-text">
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
                    ? `type-${t.id} border-red-500/80 shadow-md`
                    : 'theme-card border theme-border theme-muted hover:theme-text'
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
                    ? 'bg-red-600/20 border-red-500 theme-text shadow-md'
                    : 'theme-card border theme-border theme-muted hover:theme-text'
                }`}
              >
                <span>{label} <span className="text-[10px] font-normal theme-muted">({description})</span></span>
                <span className="font-num text-xs theme-muted">{count}</span>
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
                    ? 'bg-red-600/30 border-red-500 theme-text'
                    : 'theme-card border theme-border theme-muted hover:theme-text'
                }`}
              >
                <span>{r}</span>
                <span className="font-num text-xs theme-muted">
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
                  ? 'bg-red-600/20 border-red-500 text-red-500'
                  : 'theme-card border theme-border theme-muted hover:theme-text'
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
          <div className="flex justify-between font-num text-xs font-bold theme-muted">
            <span>{formatPokéCoins(0)}</span>
            <span className="text-red-500">{formatPokéCoins(maxPrice)}</span>
          </div>
        </div>
      </FilterSection>

      {hasFilters && (
        <div className="pt-3">
          <button
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 border border-red-600/40 text-red-500 hover:bg-red-600/30 text-xs font-head font-bold cursor-pointer"
          >
            <X className="w-4 h-4" /> Reset Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen pt-36 pb-20 bg-lumiose theme-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <span className="font-head text-xs font-bold text-red-500 uppercase tracking-widest bg-red-600/10 px-3.5 py-1.5 rounded-full border border-red-600/20">
            Lumiose Sanctuary Catalog
          </span>
          <h1 className="font-head text-3xl sm:text-4xl font-extrabold theme-text mt-3">
            Adopt a <span className="gradient-text-red">Companion</span>
          </h1>
          <p className="font-body theme-muted text-sm mt-1">
            {filtered.length} shown · {allPokemon.length} loaded of {total.toLocaleString()} PokéDex entries
          </p>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 theme-muted" />
            <input
              type="text"
              placeholder="Search Pokémon by name, type, or region..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl theme-input border theme-border theme-text placeholder-slate-400 font-body text-sm focus:outline-none focus:border-red-600 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-36 pokemon-card-container rounded-2xl p-5 max-h-[calc(100vh-160px)] overflow-y-auto">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b theme-border">
                <SlidersHorizontal className="w-4 h-4 text-red-500" />
                <span className="font-head text-sm font-bold theme-text">Filter Directory</span>
              </div>
              <SidebarContent />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm font-bold theme-text">
                Showing {filtered.length} Pokémon
              </span>
              <select
                value={sortBy}
                onChange={e => {
                  sound.playFilter();
                  setSortBy(e.target.value);
                }}
                className="theme-input border theme-border rounded-xl px-4 py-2 text-xs font-head font-bold theme-text focus:outline-none focus:border-red-600"
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
                <h3 className="font-head text-lg font-bold theme-text">No Matching Pokémon</h3>
                <p className="font-body text-xs theme-muted max-w-xs mx-auto">
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
