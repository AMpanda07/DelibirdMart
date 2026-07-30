/**
 * CartDrawerNew.jsx
 * Slide-over cart drawer with HopeRise aesthetics and Web Audio feedback.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sound } from '../utils/audio';

const formatPrice = (p) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

export default function CartDrawerNew() {
  const {
    isOpen, setIsOpen,
    items, removeFromCart, updateQuantity, clearCart,
    totalItems, totalPrice,
  } = useCart();

  const [purchased, setPurchased] = useState(false);

  const handleCheckout = () => {
    sound.playSuccess();
    setPurchased(true);
    setTimeout(() => {
      clearCart();
      setPurchased(false);
      setIsOpen(false);
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => {
              sound.playClick();
              setIsOpen(false);
            }}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-slate-950 border-l border-white/15 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="font-head text-sm font-bold text-white">Trainer Adoption Bag</div>
                  <div className="font-body text-xs text-slate-400">{totalItems} Pokémon selected</div>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playPop();
                  setIsOpen(false);
                }}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {purchased ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-head text-lg font-bold text-white">Adoption Finalized!</h3>
                    <p className="font-body text-xs text-slate-400 mt-1 max-w-xs">
                      Your companions are now being transferred to your PokéMail in Lumiose Sanctuary.
                    </p>
                  </div>
                </div>
              ) : items.length > 0 ? (
                items.map(({ pokemon, quantity }) => (
                  <div
                    key={pokemon.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-white/10"
                  >
                    <img src={pokemon.image} alt={pokemon.name} className="w-14 h-14 object-contain bg-slate-950 p-1 rounded-lg border border-white/5" />
                    <div className="flex-1 min-w-0">
                      <div className="font-head text-sm font-bold text-white truncate">{pokemon.name}</div>
                      <div className="font-num text-xs font-bold text-orange-400 mt-0.5">{formatPrice(pokemon.price)}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          sound.playPop();
                          updateQuantity(pokemon.id, quantity - 1);
                        }}
                        className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-num text-xs font-bold text-white">{quantity}</span>
                      <button
                        onClick={() => {
                          sound.playPop();
                          updateQuantity(pokemon.id, quantity + 1);
                        }}
                        className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          sound.playPop();
                          removeFromCart(pokemon.id);
                        }}
                        className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-400 cursor-pointer ml-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-16 text-slate-500">
                  <ShoppingBag className="w-12 h-12 text-slate-700" />
                  <p className="font-head text-xs font-bold">Your adoption bag is currently empty.</p>
                </div>
              )}
            </div>

            {/* Footer Checkout */}
            {items.length > 0 && !purchased && (
              <div className="p-5 border-t border-white/10 space-y-4 bg-slate-900">
                <div className="flex justify-between font-head text-sm font-bold text-white">
                  <span>Total Fee</span>
                  <span className="font-num text-orange-400">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-xl btn-primary text-white font-head font-bold text-sm cursor-pointer shadow-xl flex items-center justify-center gap-2"
                >
                  Complete Adoption
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
