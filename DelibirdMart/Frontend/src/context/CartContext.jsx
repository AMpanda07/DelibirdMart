/**
 * CartContext.jsx
 * Global cart state: add, remove, update quantity, clear, totals.
 * Schema mirrors the Pokémon document shape so the Phase 2 checkout
 *   API (POST /api/v1/orders) can consume cart items directly.
 */
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

/* ── Shape ─────────────────────────────────────────────────────── */
const CartContext = createContext(null);

/* ── Provider ──────────────────────────────────────────────────── */
export function CartProvider({ children }) {
  /** @type {[Array<{pokemon, quantity}>, Function]} */
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  /* Add a Pokémon to cart (or increment if already present) */
  const addToCart = useCallback((pokemon) => {
    setItems(prev => {
      const existing = prev.find(i => i.pokemon.id === pokemon.id);
      if (existing) {
        return prev.map(i =>
          i.pokemon.id === pokemon.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { pokemon, quantity: 1 }];
    });
    setIsOpen(true); // open drawer on add
  }, []);

  /* Decrement or remove */
  const removeFromCart = useCallback((pokemonId) => {
    setItems(prev => prev.filter(i => i.pokemon.id !== pokemonId));
  }, []);

  /* Set explicit quantity (removes item if qty → 0) */
  const updateQuantity = useCallback((pokemonId, qty) => {
    if (qty <= 0) {
      removeFromCart(pokemonId);
      return;
    }
    setItems(prev =>
      prev.map(i => i.pokemon.id === pokemonId ? { ...i, quantity: qty } : i)
    );
  }, [removeFromCart]);

  /* Clear everything */
  const clearCart = useCallback(() => setItems([]), []);

  /* Derived totals */
  const { totalItems, totalPrice } = useMemo(() => ({
    totalItems: items.reduce((s, i) => s + i.quantity, 0),
    totalPrice: items.reduce((s, i) => s + i.pokemon.price * i.quantity, 0),
  }), [items]);

  const isInCart = useCallback(
    (pokemonId) => items.some(i => i.pokemon.id === pokemonId),
    [items]
  );

  return (
    <CartContext.Provider value={{
      items, isOpen, setIsOpen,
      addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, totalPrice, isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────────────────── */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
