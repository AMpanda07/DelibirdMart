/**
 * Navbar.jsx
 * Sticky glassmorphic navbar with:
 *  - Brand logo (left)
 *  - Nav links (center, desktop)
 *  - Cart badge + Trainer avatar (right)
 *  - Shrinks/thickens on scroll (Framer Motion)
 *  - Mobile hamburger drawer
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, User, Menu, X, ChevronDown,
  MapPin, Sparkles, Shield
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartDrawerNew from './CartDrawerNew';

/* ── Nav links ──────────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: '/',            label: 'Home' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/about',       label: 'About' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { totalItems, isOpen: cartOpen, setIsOpen: setCartOpen } = useCart();
  const { trainer, isAuthenticated } = useAuth();
  const location = useLocation();

  /* Shrink on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

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
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          animate={{
            paddingTop:    scrolled ? '10px' : '16px',
            paddingBottom: scrolled ? '10px' : '16px',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`mx-4 mt-3 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
              : 'glass shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">

            {/* ── Logo ─── */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-lg">🐦</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/30 to-transparent" />
              </div>
              <div className="leading-none">
                <div className="font-head text-[13px] font-black text-white tracking-tight group-hover:text-blue-300 transition-colors">
                  Delibird
                </div>
                <div className="font-body text-[10px] text-blue-400/80 tracking-widest uppercase">
                  Mart
                </div>
              </div>
            </Link>

            {/* ── Center Nav (desktop) ─── */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 rounded-xl font-body text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-xl bg-white/10 border border-white/12"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* ── Right Icons ─── */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Location chip */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-white/50 border border-white/8 font-body">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>Lumiose City</span>
              </div>

              {/* Cart */}
              <button
                id="cart-btn"
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl btn-ghost text-sm font-medium text-white/80 hover:text-white transition-all"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span className="hidden sm:inline font-body text-sm">Cart</span>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-500 text-white font-num text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(43,89,255,0.7)]"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Trainer profile / Sign In */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl btn-ghost cursor-pointer">
                  <img
                    src={trainer.avatar}
                    alt={trainer.displayName}
                    className="w-7 h-7 rounded-lg"
                  />
                  <div className="hidden sm:block leading-none">
                    <div className="font-body text-[11px] text-white font-medium">{trainer.displayName}</div>
                    <div className="font-body text-[10px] text-blue-400">{trainer.badge}</div>
                  </div>
                </div>
              ) : (
                <button
                  id="signin-btn"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl btn-primary text-white text-sm font-medium font-body cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Sign In
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileOpen(o => !o)}
                className="md:hidden p-2 rounded-xl btn-ghost text-white/70 hover:text-white transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen
                    ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5" /></motion.div>
                    : <motion.div key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-5 h-5" /></motion.div>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* ── Mobile Menu Drawer ─── */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden md:hidden border-t border-white/10 mt-2"
              >
                <div className="px-4 py-4 space-y-1">
                  {NAV_LINKS.map(link => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`flex items-center px-4 py-3 rounded-xl font-body text-sm font-medium transition-all ${
                        isActive(link.href)
                          ? 'bg-blue-500/20 text-white border border-blue-500/30'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {!isAuthenticated && (
                    <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-primary text-white text-sm font-medium font-body cursor-pointer">
                      <Shield className="w-4 h-4" />
                      Sign In as Trainer
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      {/* Cart Drawer */}
      <CartDrawerNew />
    </>
  );
}
