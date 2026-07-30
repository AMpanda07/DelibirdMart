import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Check, Zap } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';
import { TYPE_COLORS } from '../utils/mockProducts';

export default function ProductModal({ product, onClose, onAddToCart, soundEnabled }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    playClickSound(soundEnabled);
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const typeCls = TYPE_COLORS[product.type] ?? 'type-normal';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <div className="absolute inset-0" onClick={() => { playClickSound(soundEnabled); onClose(); }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
          className="relative max-w-2xl w-full glass rounded-2xl border border-cyan-400/45 z-10"
          style={{ boxShadow: '0 0 60px rgba(6,182,212,0.25), 0 32px 80px rgba(0,0,0,0.7)' }}
        >
          {/* HUD corners */}
          <span className="hud-tl" /><span className="hud-tr" />
          <span className="hud-bl" /><span className="hud-br" />

          {/* Close */}
          <button
            onClick={() => { playClickSound(soundEnabled); onClose(); }}
            onMouseEnter={() => playHoverSound(soundEnabled)}
            className="absolute top-4 right-4 z-20 p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header chip */}
          <div className="px-6 pt-6 pb-0 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400 animate-sys-pulse" />
            <span className="font-pixel text-[8px] text-cyan-400 tracking-widest">[ SYSTEM INSPECTION WINDOW ]</span>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 h-64">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className={`${typeCls} border font-pixel text-[7px] px-1.5 py-0.5 rounded`}>
                  {product.typeLabel}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="font-pixel text-[8px] text-cyan-400/70 mb-1">{product.category} · {product.region}</div>
                <h2 className="font-pixel text-[12px] sm:text-[14px] text-white leading-snug">{product.name}</h2>
                <p className="font-vt323 text-lg text-slate-400 mt-0.5">{product.subtitle}</p>
              </div>

              <div className="font-body text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {product.description}
              </div>

              {/* Stats */}
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 space-y-2">
                <div className="font-pixel text-[8px] text-slate-500 uppercase mb-1">Stat Attributes</div>
                {Object.entries(product.stats).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs">
                    <span className="font-pixel text-[8px] text-slate-500 uppercase">{k}:</span>
                    <span className="font-vt323 text-base text-cyan-400 leading-none">{v}</span>
                  </div>
                ))}
              </div>

              {/* Price + Qty */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-pixel text-[7px] text-slate-500 mb-0.5">PRICE</div>
                  <div className="font-pixel text-[12px] text-amber-400 text-glow-gold">
                    {product.price.toLocaleString()}<span className="text-[9px] text-amber-500/70 ml-1">G</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-950 rounded-lg border border-slate-800 p-1">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 rounded bg-slate-900 text-slate-300 hover:text-cyan-400 font-bold text-sm cursor-pointer">−</button>
                  <span className="w-5 text-center font-pixel text-[9px] text-cyan-300">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-7 h-7 rounded bg-slate-900 text-slate-300 hover:text-cyan-400 font-bold text-sm cursor-pointer">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-6 pb-6 flex items-center justify-end gap-3 border-t border-slate-800/60 pt-4">
            <button
              onClick={() => { playClickSound(soundEnabled); onClose(); }}
              className="font-pixel text-[8px] px-4 py-2.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800 hover:text-white cursor-pointer"
            >
              CLOSE
            </button>
            <button
              onClick={handleAdd}
              className={`flex items-center gap-2 font-pixel text-[8px] px-5 py-2.5 rounded-lg border transition-all cursor-pointer ${
                added
                  ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[0_0_18px_#10b981]'
                  : 'bg-cyan-500 text-slate-950 border-cyan-300 hover:bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]'
              }`}
            >
              {added ? <><Check className="w-3.5 h-3.5" />ADDED!</> : <><ShoppingBag className="w-3.5 h-3.5" />ADD TO BAG</>}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
