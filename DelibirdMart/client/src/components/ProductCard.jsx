import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';
import { TYPE_COLORS } from '../utils/mockProducts';

function RarityBadge({ rarity }) {
  const cls = {
    'EX':     'rarity-ex',
    'S-Rank': 'rarity-s',
    'A-Rank': 'rarity-a',
    'B-Rank': 'rarity-b',
  }[rarity] ?? 'rarity-b';

  return (
    <span className={`${cls} border font-pixel text-[8px] px-2 py-0.5 rounded`}>
      {rarity}
    </span>
  );
}

function TypeBadge({ type, label }) {
  const cls = TYPE_COLORS[type] ?? 'type-normal';
  return (
    <span className={`${cls} border font-pixel text-[7px] px-1.5 py-0.5 rounded`}>
      {label}
    </span>
  );
}

export default function ProductCard({ product, onAddToCart, onSelectProduct, soundEnabled }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => playHoverSound(soundEnabled)}
      className="relative flex flex-col glass glass-hover hud-corners rounded-xl overflow-hidden border border-cyan-500/25 group"
    >
      {/* ── Product Image ─────────────────── */}
      <div className="relative h-52 overflow-hidden bg-slate-950 shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-transparent to-black/30" />

        {/* Top badges row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <RarityBadge rarity={product.rarity} />
          <TypeBadge type={product.type} label={product.typeLabel} />
        </div>

        {/* Region label */}
        <div className="absolute bottom-3 left-3 font-pixel text-[7px] text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
          {product.region}
        </div>

        {/* Inspect overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/50 backdrop-blur-sm">
          <button
            onClick={() => { playClickSound(soundEnabled); onSelectProduct(product); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-cyan-400/60
                       text-cyan-300 font-pixel text-[8px] hover:border-cyan-200 hover:glow-cyan transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            INSPECT
          </button>
        </div>
      </div>

      {/* ── Card Body ────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-pixel text-[10px] text-white leading-snug group-hover:text-cyan-200 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="font-vt323 text-base text-slate-400 mt-0.5 leading-none">{product.subtitle}</p>
        </div>

        <p className="font-body text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Stat block */}
        <div className="bg-slate-950/80 rounded-lg p-2.5 border border-slate-800/80 grid grid-cols-2 gap-1.5">
          {Object.entries(product.stats).slice(0, 2).map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <span className="font-pixel text-[7px] text-slate-500 uppercase">{k}</span>
              <span className="font-vt323 text-base text-cyan-400 leading-tight">{v}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 mt-auto">
          <div>
            <div className="font-pixel text-[7px] text-slate-500 uppercase mb-0.5">Price</div>
            <div className="font-pixel text-[11px] text-amber-400 text-glow-gold">
              {product.price.toLocaleString()}<span className="text-[8px] text-amber-500/70 ml-1">G</span>
            </div>
          </div>

          <button
            onClick={() => { playClickSound(soundEnabled); onAddToCart(product); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-950 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950
                       border border-cyan-500/40 hover:border-cyan-300 hover:glow-cyan transition-all font-pixel text-[8px] cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            EQUIP
          </button>
        </div>
      </div>
    </motion.div>
  );
}
