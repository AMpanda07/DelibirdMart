import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playClickSound, playHoverSound, playQuestAcceptSound } from '../utils/sound';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, soundEnabled }) {
  const [purchased, setPurchased] = useState(false);

  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleCheckout = () => {
    playQuestAcceptSound(soundEnabled);
    setPurchased(true);
    setTimeout(() => { onClearCart(); setPurchased(false); onClose(); }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => { playClickSound(soundEnabled); onClose(); }}
          />

          <div className="fixed inset-y-0 right-0 flex pl-10 max-w-full">
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-screen max-w-md glass border-l border-cyan-400/35 flex flex-col"
              style={{ boxShadow: '-4px 0 40px rgba(6,182,212,0.15)' }}
            >
              {/* HUD corners */}
              <span className="hud-tl" /><span className="hud-bl" />

              {/* Header */}
              <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-400/40 animate-sys-pulse">
                    <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-pixel text-[9px] text-cyan-300 tracking-widest">[ TRAINER BAG ]</div>
                    <div className="font-vt323 text-base text-slate-400 mt-0.5">{cartItems.length} items loaded</div>
                  </div>
                </div>
                <button
                  onClick={() => { playClickSound(soundEnabled); onClose(); }}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {purchased ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
                    <div className="font-pixel text-[10px] text-emerald-300 leading-snug">TRANSACTION<br />EXECUTED!</div>
                    <div className="font-vt323 text-lg text-slate-400">Items dispatched to your Shadow Storage.</div>
                    <div className="font-pixel text-[8px] text-emerald-400">+ EXP GAINED · STATUS BOOSTED</div>
                  </motion.div>
                ) : cartItems.length > 0 ? (
                  cartItems.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 hover:border-cyan-500/30 transition-all group"
                    >
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-slate-800 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-pixel text-[8px] text-white truncate group-hover:text-cyan-200 transition-colors">{item.name}</div>
                        <div className="font-vt323 text-base text-amber-400 mt-0.5">{item.price.toLocaleString()} G</div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-5 h-5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-bold flex items-center justify-center cursor-pointer">−</button>
                          <span className="font-pixel text-[8px] text-cyan-300 px-1">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-5 h-5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-bold flex items-center justify-center cursor-pointer">+</button>
                        </div>
                      </div>
                      <button onClick={() => onRemoveItem(item.id)} className="p-1.5 text-slate-600 hover:text-rose-400 transition-colors shrink-0 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 space-y-3 text-slate-600">
                    <ShoppingBag className="w-12 h-12 mx-auto text-slate-700" />
                    <div className="font-pixel text-[8px] leading-relaxed">BAG IS EMPTY.</div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && !purchased && (
                <div className="p-6 border-t border-cyan-500/20 bg-[#030712]/90 space-y-4 shrink-0">
                  <div className="space-y-2 font-vt323 text-lg">
                    <div className="flex justify-between text-slate-400">
                      <span>SUBTOTAL:</span>
                      <span className="text-amber-400">{total.toLocaleString()} G</span>
                    </div>
                    <div className="flex justify-between text-white font-bold border-t border-slate-800 pt-2">
                      <span>TOTAL DUE:</span>
                      <span className="text-cyan-400">{total.toLocaleString()} G</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    onMouseEnter={() => playHoverSound(soundEnabled)}
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-pixel text-[9px] tracking-widest text-slate-950
                               bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 border border-emerald-300 cursor-pointer
                               shadow-[0_0_25px_rgba(0,255,204,0.6)] hover:shadow-[0_0_40px_rgba(0,255,204,0.9)] transition-all"
                  >
                    EXECUTE TRANSACTION
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
