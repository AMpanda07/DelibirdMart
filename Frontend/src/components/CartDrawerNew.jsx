/**
 * CartDrawerNew.jsx
 * Slide-over cart drawer with Red, Black and White theme styling.
 * Seamless Light and Dark mode text contrast.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { sound } from '../utils/audio';

const formatPrice = (p) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

export default function CartDrawerNew() {
  const {
    isOpen, setIsOpen,
    items, removeFromCart, updateQuantity, clearCart,
    totalItems, totalPrice,
  } = useCart();
  const { isAuthenticated, adoptPokemons } = useAuth();

  const [purchased, setPurchased] = useState(false);

  const handleCheckout = async () => {
    sound.playSuccess();
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('open-auth-modal'));
      return;
    }
    const success = await adoptPokemons(items);
    if (success) {
      setPurchased(true);
      setTimeout(() => {
        clearCart();
        setPurchased(false);
        setIsOpen(false);
      }, 2800);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
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
            className="absolute right-0 top-0 h-full w-full max-w-md theme-card border-l border-red-600/30 flex flex-col shadow-2xl theme-text"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b theme-border shrink-0 theme-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="font-head text-sm font-bold theme-text">Trainer Adoption Bag</div>
                  <div className="font-body text-xs theme-muted">{totalItems} Pokémon selected</div>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playPop();
                  setIsOpen(false);
                }}
                className="p-2 rounded-xl theme-bg text-slate-400 hover:theme-text transition-colors cursor-pointer border theme-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {purchased ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-head text-lg font-bold theme-text">Adoption Finalized!</h3>
                    <p className="font-body text-xs theme-muted mt-1 max-w-xs">
                      Your companions are now being transferred to your PokéMail in Lumiose Sanctuary.
                    </p>
                  </div>
                </div>
              ) : items.length > 0 ? (
                items.map(({ pokemon, quantity }) => (
                  <div
                    key={pokemon.id}
                    className="flex items-center gap-3 p-3 rounded-xl theme-bg border theme-border"
                  >
                    <img src={pokemon.image} alt={pokemon.name} className="w-14 h-14 object-contain theme-card p-1 rounded-lg border theme-border" />
                    <div className="flex-1 min-w-0">
                      <div className="font-head text-sm font-bold theme-text truncate">{pokemon.name}</div>
                      <div className="font-num text-xs font-bold text-red-500 mt-0.5">{formatPrice(pokemon.price)}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          sound.playPop();
                          updateQuantity(pokemon.id, quantity - 1);
                        }}
                        className="w-7 h-7 rounded-lg theme-card border theme-border flex items-center justify-center theme-text hover:border-red-600 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-num text-xs font-bold theme-text">{quantity}</span>
                      <button
                        onClick={() => {
                          sound.playPop();
                          updateQuantity(pokemon.id, quantity + 1);
                        }}
                        className="w-7 h-7 rounded-lg theme-card border theme-border flex items-center justify-center theme-text hover:border-red-600 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          sound.playPop();
                          removeFromCart(pokemon.id);
                        }}
                        className="w-7 h-7 rounded-lg theme-muted hover:text-red-500 cursor-pointer ml-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-16 theme-muted">
                  <ShoppingBag className="w-12 h-12 theme-muted" />
                  <p className="font-head text-xs font-bold">Your adoption bag is currently empty.</p>
                </div>
              )}
            </div>

            {/* Footer Checkout */}
            {items.length > 0 && !purchased && (
              <div className="p-5 border-t theme-border space-y-4 theme-card">
                <div className="flex justify-between font-head text-sm font-bold theme-text">
                  <span>Total Fee</span>
                  <span className="font-num text-red-500">{formatPrice(totalPrice)}</span>
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
