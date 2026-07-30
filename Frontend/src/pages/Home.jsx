/**
 * Home.jsx
 * Redesigned Pokémon Red, Black & White Aesthetic Landing Page
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Shield, Heart, CheckCircle,
  Users, Star, Sparkles, Flame, Zap, Award, Filter
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
  { id: 'all',      label: '⚡ All Featured' },
  { id: 'fire',     label: '🔥 Fire Specials' },
  { id: 'water',    label: '💧 Water Elite' },
  { id: 'electric', label: '⚡ High Energy' },
  { id: 'dragon',   label: '🐉 Dragon Rares' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = (d = 0.1) => ({
  hidden: {},
  show:   { transition: { staggerChildren: d } },
});

/* ── Hero Section ─────────────────────────────────────────────── */
function HeroSection() {
  const [heroPokemon, setHeroPokemon] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-lumiose pt-28 pb-16">
      <div className="absolute inset-0 bg-city-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Hero Content */}
          <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="space-y-7">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-xs font-head font-bold text-red-500">
                <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                Official Pokémon Sanctuary · Adoption League
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h1 className="font-head text-4xl sm:text-5xl lg:text-[58px] font-black text-white leading-[1.08] tracking-tight">
                Give a Loyal{' '}
                <span className="gradient-text-red">Pokémon</span>
                <br />
                a Forever <span className="text-white">Home.</span>
              </h1>
            </motion.div>

            <motion.p variants={fadeUp} className="font-body text-base sm:text-lg text-slate-300 leading-relaxed max-w-[480px]">
              Every Pokémon listed in our Lumiose sanctuary is health-checked, temperament-verified, and cared for by certified Kalos trainers.
            </motion.p>

            {/* Badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {[
                { label: '1,240+ Successful Adoptions', icon: '❤️' },
                { label: 'Licensed Kalos Vets', icon: '🩺' },
                { label: '4.9★ Sanctuary Rating', icon: '⭐' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 text-xs font-body font-semibold text-slate-200 shadow-sm">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/marketplace"
                onClick={() => sound.playSuccess()}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-primary text-white font-head font-bold text-sm shadow-xl"
              >
                Adopt a Companion
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/marketplace"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl btn-ghost text-slate-200 font-head font-bold text-sm cursor-pointer"
              >
                <Shield className="w-4 h-4 text-red-500" />
                Sanctuary Welfare
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Hero Feature Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl pokemon-card-container p-6 flex flex-col items-center justify-between border-2 border-red-600/40">

              <div className="w-full flex items-center justify-between z-10">
                <span className="bg-red-600/20 border border-red-500/40 text-red-400 font-head text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  Featured Adoption
                </span>
                <span className="font-num text-xs text-slate-400 font-bold">LUMIOSE #01</span>
              </div>

              {/* Artwork Cycle */}
              <div className="relative w-56 h-56 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600/25 to-slate-100/10 blur-2xl animate-pulse" />
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
                        className="relative z-10 w-48 h-48 object-contain animate-float drop-shadow-[0_12px_24px_rgba(238,21,21,0.4)]"
                      />
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Info Bottom Bar */}
              {hero && !loading && (
                <div className="w-full bg-black/90 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-head text-lg font-black text-white">{hero.name}</h3>
                    <p className="font-body text-xs text-slate-400">{hero.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-body text-[10px] text-slate-400 block uppercase font-bold">Adoption Fee</span>
                    <span className="font-num text-base font-bold text-red-500">₹{hero.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ── Stats Bar ─────────────────────────────────────────────────── */
const STATS = [
  { value: '1,240+', label: 'Successful Adoptions', icon: Heart },
  { value: '340+',   label: 'Licensed Caretakers', icon: Users },
  { value: '100%',   label: 'Health & Vet Certified', icon: CheckCircle },
  { value: '4.9 ⭐', label: 'Lumiose Trust Score', icon: Star },
];

function StatsBar() {
  return (
    <section className="py-10 border-y border-white/10 bg-black/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-3"
            >
              <Icon className="w-6 h-6 text-red-500 mb-2" />
              <div className="font-num text-2xl sm:text-3xl font-black text-white">{value}</div>
              <div className="font-body text-xs font-semibold text-slate-400 mt-1">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Redesigned Browse by Type (Futuristic Selection Grid) ─────────── */
function BrowseByType() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="font-head text-xs font-bold text-red-500 uppercase tracking-widest bg-red-600/10 px-4 py-1.5 rounded-full border border-red-600/30">
          Elemental Categories
        </span>
        <h2 className="font-head text-3xl sm:text-5xl font-black text-white tracking-tight">
          Explore by <span className="gradient-text-red">Type</span>
        </h2>
        <p className="font-body text-xs sm:text-sm text-slate-400">
          Select an elemental class to inspect available companions in our Lumiose Sanctuary
        </p>
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
              {/* LED Corner Glow */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-red-600/10 rounded-full blur-xl group-hover:bg-red-600/30 transition-all" />

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
    </section>
  );
}

/* ── Redesigned Featured Selection Options Grid ──────────────────────── */
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
    <section className="py-24 relative overflow-hidden bg-black/80 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header & Filter Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="font-head text-xs font-bold text-red-500 uppercase tracking-widest bg-red-600/10 px-4 py-1.5 rounded-full border border-red-600/30 inline-block">
              Sanctuary Selection
            </span>
            <h2 className="font-head text-3xl sm:text-4xl font-black text-white">
              Featured <span className="gradient-text-red">Companions</span>
            </h2>
          </div>

          {/* Interactive Selection Options Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-white/10">
            {FEATURED_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => {
                  sound.playPop();
                  setActiveFilter(f.id);
                }}
                className={`px-4 py-2 rounded-xl font-head text-xs font-bold transition-all cursor-pointer ${
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

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <PokemonCardSkeleton key={i} />)
          ) : filteredPokemon.length > 0 ? (
            filteredPokemon.map(p => <PokemonCard key={p.id} pokemon={p} />)
          ) : (
            <div className="col-span-full py-12 text-center text-slate-400 space-y-2">
              <p className="font-head text-sm font-bold">No companions available in this featured selection.</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="text-xs text-red-500 hover:underline font-bold"
              >
                Reset Selection Filter
              </button>
            </div>
          )}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/marketplace"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl btn-ghost text-white font-head font-bold text-sm cursor-pointer border border-white/15 hover:border-red-600/60"
          >
            Explore Complete Marketplace <ArrowRight className="w-4 h-4 text-red-500" />
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ── Home Export ───────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <BrowseByType />
      <FeaturedSection />
    </main>
  );
}
