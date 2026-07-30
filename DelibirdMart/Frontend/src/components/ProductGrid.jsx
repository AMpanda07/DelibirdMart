import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, AlertTriangle } from 'lucide-react';
import ProductCard from './ProductCard';
import { CATEGORIES, RARITIES } from '../utils/mockProducts';
import { playClickSound, playHoverSound } from '../utils/sound';

export default function ProductGrid({
  products,
  selectedCategory,
  setSelectedCategory,
  selectedRarity,
  setSelectedRarity,
  searchQuery,
  onAddToCart,
  onSelectProduct,
  soundEnabled,
}) {
  const filtered = products.filter(p => {
    const matchCat    = selectedCategory === 'All' || p.category === selectedCategory;
    const matchRarity = selectedRarity   === 'All' || p.rarity   === selectedRarity;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchRarity && matchSearch;
  });

  const btnBase = 'font-pixel text-[8px] tracking-wide rounded px-3 py-1.5 border transition-all cursor-pointer';
  const btnActive = 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.6)]';
  const btnIdle   = 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40';

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Filter Controls ──────────────────────────── */}
      <div className="glass rounded-xl border border-cyan-500/20 p-4 mb-8 space-y-3">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1 text-[10px] font-pixel text-cyan-400/80">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            CATEGORY:
          </div>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { playClickSound(soundEnabled); setSelectedCategory(cat); }}
              onMouseEnter={() => playHoverSound(soundEnabled)}
              className={`${btnBase} ${selectedCategory === cat ? btnActive : btnIdle}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rarities */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="font-pixel text-[9px] text-slate-400/70 mr-1 w-[78px]">RARITY:</div>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded border border-slate-800">
            {RARITIES.map(r => (
              <button
                key={r}
                onClick={() => { playClickSound(soundEnabled); setSelectedRarity(r); }}
                onMouseEnter={() => playHoverSound(soundEnabled)}
                className={`font-pixel text-[8px] px-2.5 py-1 rounded transition-all cursor-pointer ${
                  selectedRarity === r
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-400/60'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Result count */}
          <div className="ml-auto font-vt323 text-lg text-slate-400 shrink-0">
            <span className="text-cyan-400">{filtered.length}</span> items available
          </div>
        </div>
      </div>

      {/* ── Product Grid ──────────────────────────────── */}
      {filtered.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
                soundEnabled={soundEnabled}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="glass rounded-xl border border-slate-800 p-14 text-center max-w-sm mx-auto">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-4 animate-bounce" />
          <h3 className="font-pixel text-[9px] text-white mb-3 leading-snug">NO ITEMS FOUND</h3>
          <p className="font-body text-xs text-slate-400 mb-5">No artifacts match your current filters in the Delibird Vault.</p>
          <button
            onClick={() => { playClickSound(soundEnabled); setSelectedCategory('All'); setSelectedRarity('All'); }}
            className="font-pixel text-[8px] px-4 py-2 rounded glass border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 cursor-pointer"
          >
            RESET FILTERS
          </button>
        </div>
      )}
    </section>
  );
}
