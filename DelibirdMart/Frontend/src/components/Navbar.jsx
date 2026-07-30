/**
 * Navbar.jsx
 * Sticky HopeRise inspired glassmorphic navbar with audio interaction.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, MapPin, Shield, Sparkles, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { sound } from '../utils/audio';
import CartDrawerNew from './CartDrawerNew';

const NAV_LINKS = [
  { href: '/',            label: 'Home' },
  { href: '/marketplace', label: 'Marketplace' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { trainer, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = useCallback(
    (href) => href === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(href),
    [location.pathname]
  );

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          animate={{
            paddingTop: scrolled ? '10px' : '16px',
            paddingBottom: scrolled ? '10px' : '16px',
          }}
          transition={{ duration: 0.3 }}
          className={`mx-4 mt-3 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'glass-strong shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
              : 'glass shadow-[0_6px_30px_rgba(0,0,0,0.4)]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">

            {/* Logo */}
            <Link
              to="/"
              onClick={() => sound.playClick()}
              className="flex items-center gap-3 shrink-0 group"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-rose-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-xl">🐦</span>
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="leading-none">
                <div className="font-head text-base font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">
                  Delibird <span className="text-rose-500">Mart</span>
                </div>
                <div className="font-body text-[10px] text-slate-400 tracking-widest uppercase mt-0.5 font-semibold">
                  Lumiose Sanctuary
                </div>
              </div>
            </Link>

            {/* Nav Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-white/10">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => sound.playPop()}
                  className={`relative px-5 py-2 rounded-xl font-head text-xs font-bold transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 shadow-md"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-3 shrink-0">

              {/* Lumiose Tag */}
              <div className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-body font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Lumiose City</span>
              </div>

              {/* Cart Drawer Button */}
              <button
                id="cart-btn"
                onClick={() => {
                  sound.playPop();
                  setCartOpen(true);
                }}
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-white/15 hover:border-orange-500/50 text-white font-head text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-orange-400" />
                <span className="hidden sm:inline">Bag</span>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="min-w-[20px] h-[20px] px-1 rounded-full bg-rose-500 text-white font-num text-[11px] font-bold flex items-center justify-center shadow-lg"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Trainer Card / Sign In */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-white/10 cursor-pointer">
                  <img
                    src={trainer.avatar}
                    alt={trainer.displayName}
                    className="w-7 h-7 rounded-lg"
                  />
                  <div className="hidden sm:block leading-none">
                    <div className="font-head text-[11px] text-white font-bold">{trainer.displayName}</div>
                    <div className="font-body text-[10px] text-amber-400 font-semibold">{trainer.badge}</div>
                  </div>
                </div>
              ) : (
                <button
                  id="signin-btn"
                  onClick={() => sound.playClick()}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl btn-primary text-white text-xs font-head font-bold cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Sign In
                </button>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => {
                  sound.playPop();
                  setMobileOpen(o => !o);
                }}
                className="md:hidden p-2 rounded-xl bg-slate-800/80 border border-white/10 text-white/80 hover:text-white"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden md:hidden border-t border-white/10 mt-3 pt-2 px-4 pb-4 space-y-2"
              >
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => sound.playPop()}
                    className={`block px-4 py-3 rounded-xl font-head text-sm font-bold transition-all ${
                      isActive(link.href)
                        ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      <CartDrawerNew />
    </>
  );
}
