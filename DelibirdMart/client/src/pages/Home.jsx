/**
 * Home.jsx
 * Narrative landing page for Delibird Mart:
 *   1. Hero (100vh) — floating Pokémon + headline + CTA
 *   2. Trust stats bar
 *   3. Browse by Type — circular hover cards
 *   4. Featured Pokémon — grid (→ Marketplace on "View All")
 *   5. Why Choose Us — 4 premium glass cards
 *   6. CTA banner
 */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Shield, Heart, CheckCircle,
  Zap, Award, Users, Star, ChevronDown, Globe
} from 'lucide-react';
import PokemonCard from '../components/PokemonCard';
import { FEATURED_POKEMON, POKEMON_LIST, TYPES } from '../data/mockData';

/* ── Animation variants ───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = (delayIncrement = 0.1) => ({
  hidden: {},
  show:   { transition: { staggerChildren: delayIncrement } },
});

/* ── Particle dots component ─────────────────────────────────── */
function Particle({ style, delay = 0 }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-blue-400/50"
      style={style}
      animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── HERO SECTION ─────────────────────────────────────────────── */
function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY  = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* hero Pokémon — Greninja for dramatic effect */
  const hero = POKEMON_LIST.find(p => p.id === 'pkmn-658') ?? POKEMON_LIST[0];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-lumiose"
    >
      {/* City dot grid */}
      <div className="absolute inset-0 bg-city-grid opacity-40" />

      {/* Floating particles */}
      {[
        { left:'12%', top:'22%' }, { left:'80%', top:'15%' }, { left:'35%', top:'75%' },
        { left:'65%', top:'60%' }, { left:'20%', top:'55%' }, { left:'90%', top:'40%' },
      ].map((s, i) => <Particle key={i} style={s} delay={i * 0.8} />)}

      {/* Parallax wrapper */}
      <motion.div style={{ y: heroY, opacity: heroOp }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Headline ─── */}
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            animate="show"
            className="space-y-7"
          >
            {/* Location badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/30 font-body text-xs text-blue-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                Lumiose City · Pokémon Legends: Z-A Era
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.div variants={fadeUp} className="space-y-2">
              <h1 className="font-head text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight">
                Find Your{' '}
                <span className="gradient-text">Perfect</span>
                <br />
                Pokémon{' '}
                <span className="text-white">Companion.</span>
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p variants={fadeUp} className="font-body text-base sm:text-lg text-white/55 leading-relaxed max-w-[460px]">
              Adopt verified Pokémon from trusted trainers across Kalos.
              Every companion is health-checked, well-cared-for, and ready to bond.
            </motion.p>

            {/* Stats pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {[
                { label: '1,200+ Listings',  icon: '🎴' },
                { label: 'Verified Trainers', icon: '✅' },
                { label: '4.9★ Average',     icon: '⭐' },
              ].map(s => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 font-body text-sm text-white/70"
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl btn-primary text-white font-head font-bold text-sm"
              >
                Explore Pokémon
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl btn-ghost text-white/80 font-head font-semibold text-sm cursor-pointer">
                <Shield className="w-4 h-4 text-blue-400" />
                How It Works
              </button>
            </motion.div>
          </motion.div>

          {/* ── Right: Floating hero Pokémon ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Glow rings */}
            <div className="absolute w-[340px] h-[340px] rounded-full border border-blue-500/12 animate-spin-slow" />
            <div className="absolute w-[420px] h-[420px] rounded-full border border-purple-500/8 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
            <div className="absolute w-[240px] h-[240px] rounded-full bg-blue-600/12 blur-3xl animate-breathe" />

            {/* Pokémon image */}
            <motion.img
              src={hero.image}
              alt={hero.name}
              className="relative z-10 w-[280px] sm:w-[340px] lg:w-[380px] h-auto object-contain animate-float drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 48px rgba(43,89,255,0.55))' }}
            />

            {/* Floating info card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute bottom-4 left-0 sm:left-4 lg:-left-8 glass-card rounded-2xl p-4 w-[180px]"
            >
              <div className="font-head text-sm font-extrabold text-white">{hero.name}</div>
              <div className="font-body text-[10px] text-white/40 mt-0.5">{hero.subtitle}</div>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="font-num text-xs text-white/70">{hero.rating} · {hero.reviewCount} reviews</span>
              </div>
              <div className="mt-3 pt-2 border-t border-white/8">
                <div className="font-body text-[10px] text-white/40">Adoption fee</div>
                <div className="font-num text-sm font-bold text-blue-300">
                  ₹{hero.price.toLocaleString('en-IN')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25"
        >
          <span className="font-body text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── TRUST STATS BAR ───────────────────────────────────────────── */
const STATS = [
  { value: '1,240+', label: 'Happy Adoptions',  icon: Heart },
  { value: '340+',   label: 'Verified Trainers', icon: Users },
  { value: '8',      label: 'Kalos Regions',     icon: Globe },
  { value: '4.9 ⭐', label: 'Platform Rating',   icon: Star },
];

function StatsBar() {
  return (
    <section className="py-10 border-y border-white/6 bg-[#050F1C]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <Icon className="w-5 h-5 text-blue-400 mb-1" />
              <div className="font-num text-2xl font-bold text-white">{value}</div>
              <div className="font-body text-xs text-white/40">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── BROWSE BY TYPE ────────────────────────────────────────────── */
function BrowseByType() {
  const displayed = TYPES.slice(0, 8);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="font-body text-xs text-blue-400 uppercase tracking-widest mb-3 font-medium">Browse by Type</p>
        <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white">
          What's Your <span className="gradient-text">Battle Style?</span>
        </h2>
        <p className="font-body text-white/45 text-base mt-3 max-w-md mx-auto">
          Explore Pokémon by elemental type. From fiery fighters to psychic strategists.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {displayed.map((type, i) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            whileHover={{ y: -8, scale: 1.08 }}
            className="cursor-pointer"
          >
            <Link to={`/marketplace?type=${type.id}`}>
              <div className="flex flex-col items-center gap-2.5 group">
                <div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-card flex items-center justify-center text-2xl sm:text-3xl
                             group-hover:border-opacity-70 transition-all duration-300"
                  style={{ boxShadow: `0 0 0 0 ${type.color}00`, transition: 'box-shadow 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 24px ${type.color}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; }}
                >
                  {type.emoji}
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ boxShadow: `inset 0 0 0 1px ${type.color}60` }} />
                </div>
                <span className="font-head text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                  {type.label}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── FEATURED POKÉMON ──────────────────────────────────────────── */
function FeaturedSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Section bg glow */}
      <div className="absolute inset-0 bg-[#050F1C]/50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-600/8 blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <p className="font-body text-xs text-blue-400 uppercase tracking-widest mb-3 font-medium">Featured Companions</p>
            <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white">
              Meet Our <span className="gradient-text">Top Picks</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            <Link
              to="/marketplace"
              className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {FEATURED_POKEMON.map(pokemon => (
            <motion.div key={pokemon.id} variants={fadeUp}>
              <PokemonCard pokemon={pokemon} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile "View All" */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/marketplace" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-ghost text-blue-400 font-body text-sm font-medium">
            View All Pokémon <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── WHY CHOOSE US ─────────────────────────────────────────────── */
const WHY_CARDS = [
  {
    icon: Shield,
    title: 'Verified & Safe',
    body:  'Every Pokémon listing passes our 3-step verification: health check, temperament assessment, and trainer background review.',
    accent: '#2B59FF',
    emoji:  '🛡️',
  },
  {
    icon: CheckCircle,
    title: 'Healthy & Happy',
    body:  'All listings include recent Pokémon Centre health reports, vaccination history, and ongoing diet plans from licensed Pokémon nutritionists.',
    accent: '#22c55e',
    emoji:  '💚',
  },
  {
    icon: Heart,
    title: 'Compassionate Matching',
    body:  'Our AI-assisted Aura Matching system connects trainers with Pokémon based on personality, battle style, and lifestyle preferences.',
    accent: '#ec4899',
    emoji:  '💖',
  },
  {
    icon: Award,
    title: 'Champion Trainers',
    body:  'Listings from Kalos Gym Leaders, Elite Four members, and Pokémon Rangers are verified with elite trainer badges for maximum trust.',
    accent: '#f59e0b',
    emoji:  '🏆',
  },
];

function WhyChooseUs() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <p className="font-body text-xs text-blue-400 uppercase tracking-widest mb-3 font-medium">Why Trainers Choose Us</p>
        <h2 className="font-head text-3xl sm:text-4xl font-extrabold text-white">
          Adoption You Can <span className="gradient-text">Trust</span>
        </h2>
        <p className="font-body text-white/45 text-base mt-3 max-w-lg mx-auto">
          Built on the values of the Pokémon bond — safety, compassion, and lifelong partnership.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {WHY_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16,1,0.3,1] }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-6 space-y-4 group"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                style={{ background: `${card.accent}20`, border: `1px solid ${card.accent}35` }}
              >
                {card.emoji}
              </div>
              <h3 className="font-head text-base font-extrabold text-white">{card.title}</h3>
              <p className="font-body text-sm text-white/50 leading-relaxed">{card.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ── CTA BANNER ────────────────────────────────────────────────── */
function CTABanner() {
  /* pick Lucario for the side art */
  const lucario = POKEMON_LIST.find(p => p.id === 'pkmn-448');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card rounded-3xl overflow-hidden border border-blue-500/20 p-8 sm:p-12"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/8 to-transparent pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center gap-8">
            {/* Text */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <h2 className="font-head text-2xl sm:text-3xl font-black text-white">
                Ready to Begin Your{' '}
                <span className="gradient-text">Pokémon Journey?</span>
              </h2>
              <p className="font-body text-white/50 text-base leading-relaxed max-w-lg">
                Join over 1,200 trainers who found their Pokémon partners on Delibird Mart.
                Your perfect companion is waiting in Lumiose City.
              </p>
              <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                <Link
                  to="/marketplace"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-white font-head font-bold text-sm"
                >
                  Start Exploring
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-ghost text-white/70 font-body text-sm cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>

            {/* Hero Pokémon accent art */}
            {lucario && (
              <div className="relative w-48 h-48 shrink-0">
                <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-3xl" />
                <img
                  src={lucario.image}
                  alt="Lucario"
                  className="relative z-10 w-full h-full object-contain animate-float"
                  style={{ filter: 'drop-shadow(0 0 32px rgba(43,89,255,0.5))' }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── PAGE EXPORT ───────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <BrowseByType />
      <FeaturedSection />
      <WhyChooseUs />
      <CTABanner />
    </main>
  );
}
