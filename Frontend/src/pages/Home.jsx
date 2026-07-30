/**
 * Home.jsx
 * High-Editorial E-Commerce Homepage inspired by Stella Fashion Layout
 * Customized with Official Pokémon Red, Black & White Theme + Light/Dark Theme System & Web Audio Feedback
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ArrowRight, Shield, Heart, CheckCircle,
  Users, Star, Sparkles, Flame, Award, ArrowUpRight
} from 'lucide-react';
import PokemonCard from '../components/PokemonCard';
import PokemonCardSkeleton from '../components/PokemonCardSkeleton';
import { fetchHeroPokemon, fetchPokemonPage } from '../services/pokemonService';
import { sound } from '../utils/audio';

const TYPES = [
  { id: 'fire',     label: 'Fire',     emoji: '🔥', count: '14+' },
  { id: 'water',    label: 'Water',    emoji: '💧', count: '18+' },
  { id: 'grass',    label: 'Grass',    emoji: '🌿', count: '12+' },
  { id: 'electric', label: 'Electric', emoji: '⚡', count: '10+' },
  { id: 'psychic',  label: 'Psychic',  emoji: '🔮', count: '9+'  },
  { id: 'fighting', label: 'Fighting', emoji: '🥊', count: '8+'  },
  { id: 'dragon',   label: 'Dragon',   emoji: '🐉', count: '7+'  },
  { id: 'ghost',    label: 'Ghost',    emoji: '👻', count: '6+'  },
];

const FEATURED_FILTERS = [
  { id: 'all',      label: 'All Companions' },
  { id: 'fire',     label: '🔥 Fire Specials' },
  { id: 'water',    label: '💧 Water Elite' },
  { id: 'electric', label: '⚡ High Energy' },
  { id: 'dragon',   label: '🐉 Dragon Rares' },
];

const QUICK_TAGS = ['Charizard', 'Greninja', 'Lucario', 'Fire', 'Electric', 'Dragon'];

/* ── 1. Hero Section (Stella Editorial Style + Live Search) ─────────────── */
function HeroSection() {
  const [heroPokemon, setHeroPokemon] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHeroPokemon([658, 448, 149, 6])
      .then(data => { setHeroPokemon(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!heroPokemon.length) return;
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroPokemon.length), 5000);
    return () => clearInterval(t);
  }, [heroPokemon.length]);

  const hero = heroPokemon[heroIndex];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-lumiose text-white">
      {/* Background Editorial Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black text-slate-500/[0.04] tracking-tighter uppercase pointer-events-none select-none">
        DELIBIRD
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Editorial Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-head font-bold uppercase tracking-widest text-slate-400">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            LUMIOSE SANCTUARY · AUTUMN / WINTER 2026
          </div>
          <div className="flex items-center gap-4 text-xs font-num text-slate-400">
            <span>VERIFIED ADOPTION MARKETPLACE</span>
            <span>·</span>
            <span className="text-red-500 font-bold">1,240+ HOMED</span>
          </div>
        </div>

        {/* Main Title & Search Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          
          {/* Big Bold Editorial Title (Stella Style) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-head text-4xl sm:text-6xl lg:text-[72px] font-black leading-[0.98] tracking-tight uppercase"
            >
              FIND YOUR <br />
              <span className="gradient-text-red">
                FAVORITE
              </span>{' '}
              COMPANION.
            </motion.h1>

            <p className="font-body text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed">
              Discover health-checked, temperament-verified Pokémon from licensed Kalos caretakers. Complete with official holographic Poké Pass ID.
            </p>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearchSubmit} className="space-y-3 pt-2">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Pokémon by name, type, or region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/80 border-2 border-white/20 rounded-2xl pl-12 pr-32 py-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-600 transition-all font-body shadow-2xl"
                />
                <button
                  type="submit"
                  onClick={() => sound.playClick()}
                  className="absolute right-2 px-6 py-2.5 rounded-xl btn-primary text-white text-xs font-head font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <span>Search</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-head font-semibold text-slate-400">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Trending:</span>
                {QUICK_TAGS.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setSearchQuery(tag);
                      navigate(`/marketplace?search=${tag}`);
                    }}
                    className="px-3 py-1 rounded-full bg-black border border-white/10 hover:border-red-600/60 hover:text-white transition-all cursor-pointer text-[11px]"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Right Hero Editorial Showcase Box */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[380px] rounded-3xl pokemon-card-container p-6 border-2 border-red-600/50 shadow-[0_0_60px_rgba(238,21,21,0.2)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs font-head font-bold z-10">
                <span className="px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-500" />
                  SPOTLIGHT #01
                </span>
                <span className="text-slate-400 font-num">LUMIOSE VET CERTIFIED</span>
              </div>

              {/* Centered Artwork Display */}
              <div className="relative h-60 flex items-center justify-center my-4">
                <div className="absolute w-44 h-44 rounded-full bg-red-600/20 blur-2xl animate-pulse" />
                {loading ? (
                  <div className="w-40 h-40 rounded-full bg-slate-900 animate-pulse" />
                ) : (
                  <AnimatePresence mode="wait">
                    {hero && (
                      <motion.img
                        key={hero.id}
                        src={hero.image}
                        alt={hero.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="relative z-10 w-48 h-48 object-contain animate-float drop-shadow-[0_12px_24px_rgba(238,21,21,0.5)]"
                      />
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Bottom Details Card */}
              {hero && !loading && (
                <div className="bg-black/90 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-head text-base font-bold text-white">{hero.name}</h3>
                    <p className="font-body text-xs text-slate-400">{hero.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-body text-[9px] text-slate-400 block uppercase font-bold">Adoption Fee</span>
                    <span className="font-num text-base font-bold text-red-500">₹{hero.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* ── 2. Editorial Ticker Marquee Bar ──────────────────────────────────────── */
function TickerMarquee() {
  return (
    <div className="py-4 bg-red-600 text-white overflow-hidden border-y border-white/20 select-none">
      <div className="flex whitespace-nowrap animate-spin-slow space-x-8 font-head text-xs font-black uppercase tracking-widest">
        <span>⚡ LUMIOSE SANCTUARY ADOPTIONS</span>
        <span>·</span>
        <span>❤️ 1,240+ COMPANIONS HOMED</span>
        <span>·</span>
        <span>🩺 HEALTH CHECKED BY LICENSED VETS</span>
        <span>·</span>
        <span>✨ OFFICIAL POKÉ PASS PERSISTENCE</span>
        <span>·</span>
        <span>⚡ LUMIOSE SANCTUARY ADOPTIONS</span>
        <span>·</span>
        <span>❤️ 1,240+ COMPANIONS HOMED</span>
        <span>·</span>
        <span>🩺 HEALTH CHECKED BY LICENSED VETS</span>
      </div>
    </div>
  );
}

/* ── 3. Redesigned Featured Companion Options (Stella Grid Style) ────────── */
function FeaturedSection() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchPokemonPage(0, 12)
      .then(res => setPokemon(res.pokemon))
      .finally(() => setLoading(false));
  }, []);

  const filteredPokemon = useMemo(() => {
    if (activeFilter === 'all') return pokemon.slice(0, 8);
    return pokemon.filter(p => p.types?.includes(activeFilter)).slice(0, 8);
  }, [pokemon, activeFilter]);

  return (
    <section className="py-24 bg-black border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="font-head text-xs font-bold text-red-500 uppercase tracking-widest">
              CURATED SELECTIONS · 2026
            </span>
            <h2 className="font-head text-3xl sm:text-5xl font-black uppercase tracking-tight">
              FEATURED <span className="gradient-text-red">COMPANIONS</span>
            </h2>
          </div>

          {/* Dribbble Stella Style Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-white/15">
            {FEATURED_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => {
                  sound.playPop();
                  setActiveFilter(f.id);
                }}
                className={`px-5 py-2.5 rounded-xl font-head text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-red-600 text-white shadow-[0_4px_16px_rgba(238,21,21,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <PokemonCardSkeleton key={i} />)
          ) : filteredPokemon.length > 0 ? (
            filteredPokemon.map(p => <PokemonCard key={p.id} pokemon={p} />)
          ) : (
            <div className="col-span-full py-16 text-center text-slate-400 space-y-3">
              <p className="font-head text-base font-bold">No companions available in this category.</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="text-xs text-red-500 hover:underline font-bold"
              >
                Reset Filter Selection
              </button>
            </div>
          )}
        </div>

        <div className="text-center pt-6">
          <Link
            to="/marketplace"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-primary text-white font-head font-bold text-sm shadow-xl"
          >
            Browse Full Marketplace <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ── 4. Editorial Element Showcase (Explore By Type) ──────────────────────── */
function BrowseByType() {
  return (
    <section className="py-24 bg-lumiose text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-head text-xs font-bold text-red-500 uppercase tracking-widest">
              ELEMENTAL CATEGORIES
            </span>
            <h2 className="font-head text-3xl sm:text-4xl font-black uppercase tracking-tight mt-1">
              EXPLORE BY <span className="gradient-text-red">TYPE</span>
            </h2>
          </div>
          <Link
            to="/marketplace"
            onClick={() => sound.playClick()}
            className="text-xs font-head font-bold text-red-500 hover:text-red-400 flex items-center gap-1"
          >
            View All Types <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {TYPES.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <Link
                to={`/marketplace?type=${type.id}`}
                onClick={() => sound.playPop()}
                className="group relative flex flex-col items-center p-5 rounded-3xl bg-black border border-white/10 hover:border-red-600/70 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
              >
                <div className="relative w-16 h-16 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center text-3xl group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(238,21,21,0.4)] transition-all">
                  {type.emoji}
                </div>

                <div className="text-center mt-3 space-y-0.5">
                  <span className="font-head text-xs font-bold text-white group-hover:text-red-500 transition-colors block">
                    {type.label}
                  </span>
                  <span className="font-num text-[10px] text-slate-500 block font-semibold">
                    {type.count}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── 5. PokéMail Trainer Club Subscription Banner (Stella Newsletter) ──── */
function PokeMailNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <section className="py-20 bg-lumiose text-white border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <span className="font-head text-xs font-bold text-red-500 uppercase tracking-widest bg-red-600/10 px-4 py-1.5 rounded-full border border-red-600/30 inline-block">
          JOIN THE TRAINER CLUB
        </span>
        <h2 className="font-head text-3xl sm:text-5xl font-black uppercase">
          RECEIVE EXCLUSIVE <span className="gradient-text-red">ADOPTION ALERTS</span>
        </h2>
        <p className="font-body text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Subscribe to Lumiose Sanctuary PokéMail for early access to rare & legendary Pokémon listings.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-2xl bg-red-600/20 border border-red-500 text-red-400 font-head text-sm font-bold flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle className="w-5 h-5 text-red-500" />
            <span>Subscribed to Lumiose PokéMail! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your trainer email..."
              className="w-full px-4 py-3.5 rounded-2xl bg-black border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-600 font-body"
            />
            <button
              type="submit"
              onClick={() => sound.playClick()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl btn-primary text-white font-head font-bold text-xs shrink-0 cursor-pointer shadow-lg"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── 6. Sanctuary Standards (Trust & Welfare Editorial) ─────────────────── */
function SanctuaryStandards() {
  const BENEFITS = [
    {
      title: 'Health & Vet Certified',
      desc: 'Every companion undergoes a full medical evaluation by licensed Kalos veterinarians.',
      icon: Shield
    },
    {
      title: 'Holographic Poké Pass',
      desc: 'Digital ownership credentials backed by MongoDB Atlas cloud architecture.',
      icon: Award
    },
    {
      title: 'Direct Companion Transfer',
      desc: 'Instant PokéMail transfer to your adoption bag with real-time status updates.',
      icon: CheckCircle
    }
  ];

  return (
    <section className="py-24 bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-head text-xs font-bold text-red-500 uppercase tracking-widest">
            SANCTUARY STANDARDS
          </span>
          <h2 className="font-head text-3xl sm:text-4xl font-black uppercase">
            WHY TRAINERS TRUST <span className="gradient-text-red">DELIBIRD MART</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-8 rounded-3xl pokemon-card-container border border-white/10 space-y-4 hover:border-red-600/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-head text-lg font-bold text-white">{item.title}</h3>
                <p className="font-body text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Home Page Export ─────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <TickerMarquee />
      <FeaturedSection />
      <BrowseByType />
      <PokeMailNewsletter />
      <SanctuaryStandards />
    </main>
  );
}
