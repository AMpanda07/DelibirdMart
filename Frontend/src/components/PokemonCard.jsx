/**
 * PokemonCard.jsx
 * High-visibility Pokémon card with Red, Black and White theme.
 */
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sound } from '../utils/audio';

/* ── Price Formatter ───────────────────────────────────────────── */
const fmt = (p) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(p);

/* ── Type Badges Lookup ────────────────────────────────────────── */
const TYPE_INFO = {
  fire:     { emoji: '🔥', cls: 'type-fire'     },
  water:    { emoji: '💧', cls: 'type-water'    },
  grass:    { emoji: '🌿', cls: 'type-grass'    },
  electric: { emoji: '⚡', cls: 'type-electric' },
  psychic:  { emoji: '🔮', cls: 'type-psychic'  },
  fighting: { emoji: '🥊', cls: 'type-fighting' },
  dragon:   { emoji: '🐉', cls: 'type-dragon'   },
  ghost:    { emoji: '👻', cls: 'type-ghost'    },
  dark:     { emoji: '🌑', cls: 'type-dark'     },
  fairy:    { emoji: '✨', cls: 'type-fairy'    },
  ice:      { emoji: '❄️', cls: 'type-ice'      },
  steel:    { emoji: '⚙️', cls: 'type-steel'    },
  normal:   { emoji: '⭕', cls: 'type-normal'   },
  flying:   { emoji: '🪶', cls: 'type-flying'   },
  poison:   { emoji: '☠️', cls: 'type-poison'   },
  ground:   { emoji: '🌍', cls: 'type-ground'   },
  rock:     { emoji: '🪨', cls: 'type-rock'     },
  bug:      { emoji: '🐛', cls: 'type-bug'      },
};

/* ── Rarity Styles ─────────────────────────────────────────────── */
const RARITY_CONFIG = {
  Common:    { cls: 'rarity-common',    icon: null,  glow: '#94A3B8' },
  Uncommon:  { cls: 'rarity-uncommon',  icon: '🌱',  glow: '#10B981' },
  Rare:      { cls: 'rarity-rare',      icon: '💎',  glow: '#3B82F6' },
  Epic:      { cls: 'rarity-epic',      icon: '👑',  glow: '#FFB800' },
  Legendary: { cls: 'rarity-legendary', icon: '🔥',  glow: '#EE1515' },
};

/* ── Evolution Stage Config ───────────────────────────────────── */
const EVO_CONFIG = {
  1: { label: 'Stage 1', cls: 'bg-black/80 border-slate-600/50 text-slate-200' },
  2: { label: 'Stage 2', cls: 'bg-red-950/80 border-red-500/60 text-red-200' },
  3: { label: 'Stage 3', cls: 'bg-red-900/90 border-red-400/80 text-white' },
  'Base':    { label: 'Stage 1', cls: 'bg-black/80 border-slate-600/50 text-slate-200' },
  'Stage 1': { label: 'Stage 2', cls: 'bg-red-950/80 border-red-500/60 text-red-200' },
  'Stage 2': { label: 'Stage 3', cls: 'bg-red-900/90 border-red-400/80 text-white' },
};

/* ── Type Accent Glows ─────────────────────────────────────────── */
function getTypeAccent(type) {
  const accents = {
    fire: '#EE1515', water: '#3B82F6', grass: '#10B981', electric: '#EAB308',
    psychic: '#EC4899', dragon: '#6366F1', ghost: '#8B5CF6', dark: '#64748B',
    fairy: '#F472B6', ice: '#06B6D4', steel: '#94A3B8', fighting: '#DC2626',
    poison: '#A855F7', ground: '#D97706', rock: '#78716C', flying: '#38BDF8',
    bug: '#84CC16', normal: '#A1A1AA',
  };
  return accents[type] || '#EE1515';
}

/* ── Stat Bar Component ────────────────────────────────────────── */
function StatBar({ label, value, max = 160, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-body text-[10px] font-semibold text-slate-400 w-6 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-slate-900/90 border border-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min((value / max) * 100, 100)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="font-num text-[10px] font-bold text-slate-300 w-6 text-right shrink-0">{value}</span>
    </div>
  );
}

/* ── Pokémon Card Component ────────────────────────────────────── */
export default function PokemonCard({ pokemon, compact = false }) {
  const cardRef = useRef(null);
  const { addToCart, isInCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  /* 3D Motion Spring Tilt */
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 240, damping: 22 });
  const springY = useSpring(rotY, { stiffness: 240, damping: 22 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rotX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8);
    rotY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    sound.playPop();
    setLiked(l => !l);
  };

  const handleAdoptClick = (e) => {
    e.stopPropagation();
    sound.playSuccess();
    addToCart(pokemon);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1400);
  };

  /* Metadata Resolution */
  const primaryType = pokemon.types?.[0] || 'normal';
  const accent = getTypeAccent(primaryType);
  const rarity = RARITY_CONFIG[pokemon.rarity] || RARITY_CONFIG.Common;
  const evoKey = pokemon.evolutionStage ?? pokemon.evolutionLevel ?? 1;
  const evo = EVO_CONFIG[evoKey] || EVO_CONFIG[1];
  const inCart = isInCart(pokemon.id);

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: springX, rotateY: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => sound.playClick()}
      className="pokemon-card-container relative rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
    >
      {/* Top Accent Line */}
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(90deg, ${accent}, #EE1515)` }}
      />

      {/* ── Top Floating Badges ── */}
      <div className="p-3 pb-0 flex items-start justify-between relative z-20">
        <div className="flex flex-col gap-1">
          <span className={`${rarity.cls} text-[10px] font-head font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md`}>
            {rarity.icon && <span className="mr-1">{rarity.icon}</span>}
            {pokemon.rarity}
          </span>
          <span className={`${evo.cls} text-[10px] font-head font-semibold px-2 py-0.5 rounded-full border backdrop-blur-md self-start`}>
            {evo.label}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="w-8 h-8 rounded-full bg-black/80 border border-white/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md"
        >
          <Heart className={`w-4 h-4 transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-slate-400'}`} />
        </button>
      </div>

      {/* ── Pokémon Artwork Display Panel ── */}
      <div className="relative h-44 flex items-center justify-center my-2">
        {/* Glow Sphere */}
        <div
          className="absolute w-28 h-28 rounded-full opacity-35 blur-xl group-hover:scale-125 transition-transform duration-500"
          style={{ background: accent }}
        />
        <div
          className="absolute w-36 h-36 rounded-full border border-white/10 opacity-40 animate-pulse"
        />

        {/* Pokémon Image */}
        <motion.img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative z-10 w-32 h-32 object-contain group-hover:scale-115 transition-transform duration-500"
          style={{ filter: `drop-shadow(0 10px 20px ${accent}60)` }}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.opacity = '0.4';
          }}
        />

        {/* Pokédex Number Tag */}
        {pokemon.pokedexId && (
          <div className="absolute bottom-1 right-4 font-num text-[11px] font-bold text-slate-400 bg-black/80 px-2 py-0.5 rounded-md border border-white/10">
            #{String(pokemon.pokedexId).padStart(3, '0')}
          </div>
        )}
      </div>

      {/* ── Content Section ── */}
      <div className="p-4 pt-2 bg-black/60 border-t border-white/10 flex-1 flex flex-col justify-between space-y-3">
        {/* Title & Rating */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-head text-base font-bold text-white tracking-wide group-hover:text-red-500 transition-colors">
              {pokemon.name}
            </h3>
            {pokemon.rating && (
              <div className="flex items-center gap-1 bg-red-600/10 border border-red-600/30 px-2 py-0.5 rounded-full shrink-0">
                <Star className="w-3 h-3 text-red-500 fill-red-500" />
                <span className="font-num text-xs font-bold text-red-400">{pokemon.rating}</span>
              </div>
            )}
          </div>
          <p className="font-body text-[11px] text-slate-400 mt-0.5">{pokemon.subtitle || 'Verified Companion'}</p>
        </div>

        {/* Type Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(pokemon.types || []).slice(0, 2).map(t => {
            const info = TYPE_INFO[t] || { emoji: '✨', cls: 'type-normal' };
            return (
              <span key={t} className={`${info.cls} text-[10px] font-head font-medium px-2.5 py-0.5 rounded-full`}>
                {info.emoji} {t.toUpperCase()}
              </span>
            );
          })}
          {pokemon.region && (
            <span className="ml-auto font-body text-[10px] text-slate-300 font-semibold bg-slate-900/80 px-2 py-0.5 rounded-md border border-white/10">
              {pokemon.region}
            </span>
          )}
        </div>

        {/* Stat Bars (non-compact mode) */}
        {!compact && pokemon.stats && (
          <div className="space-y-1.5 py-2 border-y border-white/10 bg-black/50 px-2.5 rounded-xl">
            <StatBar label="ATK" value={pokemon.stats.attack} color={accent} />
            <StatBar label="DEF" value={pokemon.stats.defense} color={accent} />
            <StatBar label="SPD" value={pokemon.stats.speed} color={accent} />
          </div>
        )}

        {/* Price & Adopt Button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="font-body text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Adoption Fee</div>
            <div className="font-num text-lg font-bold text-white tracking-tight">
              {fmt(pokemon.price)}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdoptClick}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-head font-bold shadow-lg transition-all cursor-pointer ${
              addedFlash
                ? 'bg-red-600 text-white border border-white/30 shadow-red-600/50'
                : inCart
                ? 'bg-red-950 text-white border border-red-600/60 shadow-red-950/50 hover:bg-red-900'
                : 'btn-primary text-white'
            }`}
          >
            {addedFlash ? (
              <>✓ Added!</>
            ) : inCart ? (
              <><ShoppingBag className="w-3.5 h-3.5" /> Adopted</>
            ) : (
              <><ShoppingBag className="w-3.5 h-3.5" /> Adopt</>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
