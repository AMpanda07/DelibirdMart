/**
 * Home.jsx
 * HopeRise Editorial Inspired Landing Page for Delibird Mart
 * Warm coral accents, midnight emerald backdrop, Web Audio interaction.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Shield, Heart, CheckCircle,
  Award, Users, Star, ChevronDown, Sparkles, Flame
} from 'lucide-react';
import PokemonCard from '../components/PokemonCard';
import PokemonCardSkeleton from '../components/PokemonCardSkeleton';
import { fetchHeroPokemon, fetchPokemonPage } from '../services/pokemonService';
import { sound } from '../utils/audio';

const TYPES = [
  { id: 'fire',     label: 'Fire',     emoji: '🔥' },
  { id: 'water',    label: 'Water',    emoji: '💧' },
  { id: 'grass',    label: 'Grass',    emoji: '🌿' },
  { id: 'electric', label: 'Electric', emoji: '⚡' },
  { id: 'psychic',  label: 'Psychic',  emoji: '🔮' },
  { id: 'fighting', label: 'Fighting', emoji: '🥊' },
  { id: 'dragon',   label: 'Dragon',   emoji: '🐉' },
  { id: 'ghost',    label: 'Ghost',    emoji: '👻' },
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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-head font-bold text-orange-400">
                <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                Lumiose City Sanctuary · Adoption Marketplace
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h1 className="font-head text-4xl sm:text-5xl lg:text-[58px] font-black text-white leading-[1.08] tracking-tight">
                Give a Loyal{' '}
                <span className="gradient-text">Pokémon</span>
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
                <div key={item.label} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-body font-semibold text-slate-300 shadow-sm">
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
                <Shield className="w-4 h-4 text-emerald-400" />
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
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl pokemon-card-container p-6 flex flex-col items-center justify-between border-2 border-orange-500/30">

              <div className="w-full flex items-center justify-between z-10">
                <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-head text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Featured Adoption
                </span>
                <span className="font-num text-xs text-slate-400 font-bold">LUMIOSE #01</span>
              </div>

              {/* Artwork Cycle */}
              <div className="relative w-56 h-56 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/20 to-blue-500/20 blur-2xl animate-pulse" />
                {loading ? (
                  <div className="w-40 h-40 rounded-full bg-slate-800 animate-pulse" />
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
                        className="relative z-10 w-48 h-48 object-contain animate-float drop-shadow-2xl"
                      />
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Info Bottom Bar */}
              {hero && !loading && (
                <div className="w-full bg-slate-950/80 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-head text-lg font-black text-white">{hero.name}</h3>
                    <p className="font-body text-xs text-slate-400">{hero.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-body text-[10px] text-slate-400 block uppercase font-bold">Adoption Fee</span>
                    <span className="font-num text-base font-bold text-amber-400">₹{hero.price.toLocaleString('en-IN')}</span>
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
    <section className="py-10 border-y border-white/10 bg-slate-950/80">
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
              <Icon className="w-6 h-6 text-orange-400 mb-2" />
              <div className="font-num text-2xl sm:text-3xl font-black text-white">{value}</div>
              <div className="font-body text-xs font-semibold text-slate-400 mt-1">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Browse by Type ────────────────────────────────────────────── */
function BrowseByType() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="font-head text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
          Elemental Categories
        </span>
        <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white mt-3">
          Explore by <span className="gradient-text">Type</span>
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {TYPES.map((type, i) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6, scale: 1.05 }}
          >
            <Link
              to={`/marketplace?type=${type.id}`}
              onClick={() => sound.playPop()}
              className="flex flex-col items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900/90 border border-white/15 flex items-center justify-center text-3xl group-hover:border-orange-500 transition-all shadow-lg">
                {type.emoji}
              </div>
              <span className="font-head text-xs font-bold text-slate-300 group-hover:text-orange-400 transition-colors">
                {type.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Featured Pokémon Grid ──────────────────────────────────────── */
function FeaturedSection() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonPage(0, 8)
      .then(res => setPokemon(res.pokemon))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-slate-950/60 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-head text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
              Fresh Listings
            </span>
            <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Ready for <span className="gradient-text">Adoption</span>
            </h2>
          </div>
          <Link
            to="/marketplace"
            onClick={() => sound.playClick()}
            className="hidden sm:inline-flex items-center gap-2 font-head text-sm text-orange-400 hover:text-orange-300 font-bold transition-colors"
          >
            View All Marketplace <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <PokemonCardSkeleton key={i} />)
            : pokemon.map(p => <PokemonCard key={p.id} pokemon={p} />)
          }
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
