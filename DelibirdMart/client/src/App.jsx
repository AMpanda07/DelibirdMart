import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles } from 'lucide-react';

import Navbar from './components/Navbar';
import SystemNotificationLanding from './components/SystemNotificationLanding';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import PlayerStatusModal from './components/PlayerStatusModal';
import { PRODUCTS } from './utils/mockProducts';
import apiClient from './api/axios.client';
import { playClickSound, playHoverSound } from './utils/sound';

/* ── Shop Shell ──────────────────────────────────────────── */
function ShopShell({
  cartItems, setCartItems,
  soundEnabled, setSoundEnabled,
  serverStatus,
  onReturnToLanding,
}) {
  const [isCartOpen,      setIsCartOpen]      = useState(false);
  const [isStatusOpen,    setIsStatusOpen]    = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery,     setSearchQuery]     = useState('');
  const [selectedCat,     setSelectedCat]     = useState('All');
  const [selectedRarity,  setSelectedRarity]  = useState('All');
  const [activeRegion,    setActiveRegion]    = useState('Kalos Z-A');

  const addToCart = (product) => {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { setCartItems(prev => prev.filter(i => i.id !== id)); return; }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#030712] bg-system-grid flex flex-col">
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        serverStatus={serverStatus}
        onOpenStatusModal={() => setIsStatusOpen(true)}
        onReturnToLanding={onReturnToLanding}
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion}
      />

      {/* ── Hero Shop Banner ───────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative glass rounded-2xl border border-cyan-400/30 p-6 overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(6,182,212,0.12)' }}
        >
          <span className="hud-tl" /><span className="hud-tr" />
          <span className="hud-bl" /><span className="hud-br" />

          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/6 rounded-full blur-3xl" />
          </div>

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-sys-pulse" />
                <span className="font-pixel text-[8px] text-cyan-400 tracking-widest">[ DAILY QUEST: EQUIP KALOS-GRADE ARTIFACTS ]</span>
              </div>
              <h2 className="font-pixel text-[13px] sm:text-[16px] text-white leading-snug text-glow-white">
                DELIBIRD MART<br />LUMIOSE VAULT
              </h2>
              <p className="font-body text-sm text-slate-400 max-w-xl leading-relaxed">
                Browse S-Rank Mega Stones, Dragon relics, and rare Delibird artifacts from the Kalos Z-A excavation sites.
                Filter by item class or rarity to prepare for your next Red Gate incursion.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <div className="font-vt323 text-lg px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                STATUS: <strong className="text-emerald-400">RAID READY</strong>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Product Grid ─────────────────────────── */}
      <main className="flex-1">
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCat}
          setSelectedCategory={setSelectedCat}
          selectedRarity={selectedRarity}
          setSelectedRarity={setSelectedRarity}
          searchQuery={searchQuery}
          onAddToCart={addToCart}
          onSelectProduct={setSelectedProduct}
          soundEnabled={soundEnabled}
        />
      </main>

      {/* ── Footer ────────────────────────────────── */}
      <footer className="border-t border-cyan-500/15 bg-[#030712]/95 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400/60" />
            <span className="font-pixel text-[8px] text-cyan-400/60 tracking-wide">DELIBIRD MART SYSTEM v1.0.4 — KALOS Z-A EDITION</span>
          </div>
          <div className="font-vt323 text-base text-slate-600">
            API: <span className="text-cyan-500/70">localhost:5000/api/v1</span>
          </div>
        </div>
      </footer>

      {/* ── Modals & Drawers ───────────────────────── */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQty}
        onRemoveItem={id => setCartItems(prev => prev.filter(i => i.id !== id))}
        onClearCart={() => setCartItems([])}
        soundEnabled={soundEnabled}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        soundEnabled={soundEnabled}
      />

      <PlayerStatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}

/* ── Root App ────────────────────────────────────────────── */
// NOTE: <BrowserRouter> is declared in main.jsx — do NOT add it here.
export default function App() {
  const [view,         setView]         = useState('landing'); // 'landing' | 'shop'
  const [cartItems,    setCartItems]    = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [serverStatus, setServerStatus] = useState('checking');

  // Backend health check
  useEffect(() => {
    (async () => {
      try {
        const data = await apiClient.get('/health');
        // apiClient response interceptor returns response.data directly
        setServerStatus('online');
      } catch {
        // Retry once
        setTimeout(async () => {
          try { await apiClient.get('/health'); setServerStatus('online'); }
          catch { setServerStatus('offline'); }
        }, 2500);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35 }}>
            <SystemNotificationLanding
              onEnterShop={() => setView('shop')}
              soundEnabled={soundEnabled}
            />
          </motion.div>
        ) : (
          <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <ShopShell
              cartItems={cartItems}
              setCartItems={setCartItems}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              serverStatus={serverStatus}
              onReturnToLanding={() => setView('landing')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}