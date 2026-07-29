/**
 * PokemonCard.jsx
 * Reusable Pokémon listing card. Used in Home (featured grid) and Marketplace.
 * Features: 5-degree hover tilt, magnetic adopt button, stat mini-bars,
 *           type + rarity badges, PokeAPI artwork.
 */
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, Heart, ShoppingBag, Zap, TrendingUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { TYPE_MAP, formatPrice } from '../data/mockData';

/* ── Stat mini bar ─────────────────────────────────────────────── */
function StatBar({ label, value, max = 160, color = '#2B59FF' }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-body text-[10px] text-white/35 w-[22px] shrink-0">{label}</span>
      <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min((value / max) * 100, 100)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="font-num text-[10px] text-white/50 w-[22px] text-right shrink-0">{value}</span>
    </div>
  );
}

/* ── Rarity config ─────────────────────────────────────────────── */
const RARITY_CONFIG = {
  Common:    { cls: 'rarity-common', icon: null },
  Rare:      { cls: 'rarity-rare',   icon: '⭐' },
  Epic:      { cls: 'rarity-epic',   icon: '💎' },
  Legendary: { cls: 'rarity-legendary', icon: '👑' },
};

export default function PokemonCard({ pokemon, compact = false }) {
  const cardRef = useRef(null);
  const { addToCart, isInCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  /* 3D tilt via MotionValues */
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 220, damping: 20 });
  const springY = useSpring(rotY, { stiffness: 220, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    rotX.set(-y * 8);   // max ±4deg vertically
    rotY.set( x * 8);   // max ±4deg horizontally
  };
  const resetTilt = () => { rotX.set(0); rotY.set(0); };

  const handleAdopt = () => {
    addToCart(pokemon);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1400);
  };

  const rarity = RARITY_CONFIG[pokemon.rarity] ?? RARITY_CONFIG.Common;
  const inCart = isInCart(pokemon.id);

  const statColor = pokemon.types[0] === 'fire'
    ? '#f87171'
    : pokemon.types[0] === 'water'
    ? '#60a5fa'
    : pokemon.types[0] === 'electric'
    ? '#facc15'
    : '#6366f1';

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: springX, rotateY: springY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative glass-card rounded-2xl overflow-hidden cursor-default group"
    >
      {/* ── Shimmer overlay on hover ─── */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer rounded-2xl" />

      {/* ── Top: rarity + wishlist ─── */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <span className={`${rarity.cls} border font-body text-[10px] font-semibold px-2 py-0.5 rounded-full`}>
          {rarity.icon && <span className="mr-1">{rarity.icon}</span>}
          {pokemon.rarity}
        </span>
        <button
          onClick={() => setLiked(l => !l)}
          className="w-8 h-8 rounded-full glass flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${liked ? 'text-red-400 fill-red-400' : 'text-white/40'}`}
          />
        </button>
      </div>

      {/* ── Artwork panel ─── */}
      <div className="relative h-44 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-transparent pt-4">
        {/* Radial glow behind Pokémon */}
        <div
          className="absolute w-32 h-32 rounded-full opacity-30 blur-2xl"
          style={{ background: statColor }}
        />
        <motion.img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative z-10 w-[120px] h-[120px] object-contain group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        {/* Stock indicator */}
        {pokemon.stock <= 2 && (
          <div className="absolute bottom-2 right-3 font-body text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
            Only {pokemon.stock} left
          </div>
        )}
      </div>

      {/* ── Card body ─── */}
      <div className="p-4 space-y-3">

        {/* Name + region */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-head text-base font-extrabold text-white leading-tight">{pokemon.name}</h3>
              <p className="font-body text-[11px] text-white/40 mt-0.5">{pokemon.subtitle}</p>
            </div>
            {/* Pokédex number */}
            <span className="font-num text-[11px] text-white/25 shrink-0">#{String(pokemon.pokedexId).padStart(3,'0')}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-num text-xs font-semibold text-white/70">{pokemon.rating}</span>
            <span className="font-body text-[10px] text-white/30">({pokemon.reviewCount})</span>
          </div>
        </div>

        {/* Type badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {pokemon.types.map(t => {
            const info = TYPE_MAP[t];
            return (
              <span key={t} className={`type-${t} border font-body text-[10px] font-medium px-2 py-0.5 rounded-full`}>
                {info?.emoji} {info?.label ?? t}
              </span>
            );
          })}
          <span className="ml-auto font-body text-[10px] text-white/30">{pokemon.region}</span>
        </div>

        {/* Mini stats (only in non-compact mode) */}
        {!compact && (
          <div className="space-y-1 py-2 border-t border-b border-white/6">
            <StatBar label="ATK" value={pokemon.stats.attack}        color={statColor} />
            <StatBar label="DEF" value={pokemon.stats.defense}       color={statColor} />
            <StatBar label="SPD" value={pokemon.stats.speed}         color={statColor} />
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="font-body text-[10px] text-white/30 uppercase tracking-wide">Adoption fee</div>
            <div className="font-num text-base font-bold text-white">{formatPrice(pokemon.price)}</div>
          </div>
          <motion.button
            id={`adopt-btn-${pokemon.id}`}
            onClick={handleAdopt}
            whileTap={{ scale: 0.94 }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-head font-bold transition-all cursor-pointer ${
              addedFlash
                ? 'bg-green-500 text-white border border-green-400 shadow-[0_0_16px_rgba(34,197,94,0.5)]'
                : inCart
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 hover:bg-blue-500/30'
                : 'btn-primary text-white'
            }`}
          >
            {addedFlash ? (
              <>✓ Added!</>
            ) : inCart ? (
              <><ShoppingBag className="w-3.5 h-3.5" />In Bag</>
            ) : (
              <><ShoppingBag className="w-3.5 h-3.5" />Adopt</>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
