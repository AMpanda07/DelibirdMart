/**
 * CartDrawerNew.jsx
 * Slide-over cart panel with item management, totals, and checkout CTA.
 * Reads from CartContext; dispatches to CartContext.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/mockData';

export default function CartDrawerNew() {
  const {
    isOpen, setIsOpen,
    items, removeFromCart, updateQuantity, clearCart,
    totalItems, totalPrice,
  } = useCart();

  const [purchased, setPurchased] = React.useState(false);

  const handleCheckout = () => {
    // TODO: POST /api/v1/orders
    setPurchased(true);
    setTimeout(() => {
      clearCart();
      setPurchased(false);
      setIsOpen(false);
    }, 2600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="absolute right-0 top-0 h-full w-full max-w-md glass-strong border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/8 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <ShoppingBag className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <div>
                  <div className="font-head text-sm font-bold text-white">Trainer Bag</div>
                  <div className="font-body text-xs text-white/40">{totalItems} Pokémon selected</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl glass text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {purchased ? (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center gap-4 text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <div className="font-head text-lg font-bold text-white">Adoption Complete!</div>
                    <div className="font-body text-sm text-white/50 mt-1">
                      Your Pokémon are being prepared for delivery to Lumiose City.
                    </div>
                  </div>
                  <div className="font-body text-xs text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                    Confirmation sent via PokéMail ✉️
                  </div>
                </motion.div>
              ) : items.length > 0 ? (
                items.map(({ pokemon, quantity }) => (
                  <motion.div
                    key={pokemon.id}
                    layout
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    className="flex items-center gap-3 p-3 rounded-xl glass border border-white/8 group"
                  >
                    {/* Pokémon image */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-14 h-14 object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-head text-sm font-bold text-white truncate">{pokemon.name}</div>
                      <div className="font-body text-xs text-white/40 mt-0.5">{pokemon.subtitle}</div>
                      <div className="font-num text-sm font-semibold text-blue-400 mt-1">
                        {formatPrice(pokemon.price)}
                      </div>
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => updateQuantity(pokemon.id, quantity - 1)}
                        className="w-7 h-7 rounded-lg glass flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-num text-sm font-semibold text-white">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(pokemon.id, quantity + 1)}
                        className="w-7 h-7 rounded-lg glass flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(pokemon.id)}
                        className="w-7 h-7 rounded-lg text-white/30 hover:text-red-400 transition-colors cursor-pointer ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
                    <ShoppingBag className="w-7 h-7 text-white/20" />
                  </div>
                  <div>
                    <div className="font-head text-sm font-bold text-white/30">Your bag is empty</div>
                    <div className="font-body text-xs text-white/20 mt-1">Find a Pokémon companion to adopt</div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer total + CTA */}
            {items.length > 0 && !purchased && (
              <div className="p-5 border-t border-white/8 space-y-4 shrink-0 bg-[#07111F]/60">
                <div className="space-y-2 font-body text-sm">
                  <div className="flex justify-between text-white/50">
                    <span>Subtotal ({totalItems} Pokémon)</span>
                    <span className="font-num text-white/70">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold border-t border-white/10 pt-2">
                    <span>Total</span>
                    <span className="font-num text-blue-400">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl btn-primary text-white font-head font-bold text-sm cursor-pointer"
                >
                  Adopt Pokémon
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
