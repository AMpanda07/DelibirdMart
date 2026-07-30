import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Shield, Award, LogOut, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';
import CartDrawerNew from './CartDrawerNew';
import TrainerCardModal from './TrainerCardModal';
import AuthModal from './AuthModal';
import PokeBallLogo from './PokeBallLogo';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trainerModalOpen, setTrainerModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { trainer, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
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
        className="fixed top-0 left-0 right-0 z-40"
      >
        <motion.div
          animate={{
            paddingTop: scrolled ? '10px' : '16px',
            paddingBottom: scrolled ? '10px' : '16px',
          }}
          transition={{ duration: 0.3 }}
          className={`mx-4 mt-3 rounded-2xl transition-all duration-300 ${scrolled
            ? 'glass-strong shadow-[0_12px_40px_rgba(0,0,0,0.85)] border-red-600/30'
            : 'glass shadow-[0_6px_30px_rgba(0,0,0,0.6)]'
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">

            {/* Redesigned Pokémon Logo */}
            <Link
              to="/"
              onClick={() => sound.playClick()}
              className="flex items-center gap-3 shrink-0 group"
            >
              <PokeBallLogo className="w-10 h-10" />
              <div className="leading-none">
                <div className="font-head text-lg font-black tracking-tight text-white group-hover:text-red-500 transition-colors flex items-center gap-1">
                  Delibird <span className="text-red-600">Mart</span>
                </div>
                <div className="font-body text-[10px] text-slate-400 tracking-widest uppercase mt-0.5 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-ping" />
                  Pokémon Sanctuary
                </div>
              </div>
            </Link>

            {/* Nav Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1 bg-black/80 p-1.5 rounded-2xl border border-white/10">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => sound.playPop()}
                  className={`relative px-5 py-2 rounded-xl font-head text-xs font-bold transition-all duration-200 ${isActive(link.href)
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 shadow-[0_4px_16px_rgba(238,21,21,0.4)]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-3 shrink-0">

              {/* Official Sanctuary Tag */}
              <div className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-xs font-body font-bold text-red-500">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>Lumiose League</span>
              </div>

              {/* Theme Switcher Toggle */}
              <button
                onClick={() => {
                  sound.playPop();
                  toggleTheme();
                }}
                title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                className="p-2.5 rounded-xl glass hover:border-red-600/60 transition-all cursor-pointer shadow-md text-red-500 flex items-center justify-center active:scale-95"
              >
                {isDark ? <Sun className="w-4 h-4 text-red-500" /> : <Moon className="w-4 h-4 text-red-500" />}
              </button>

              {/* Cart Drawer Button */}
              <button
                id="cart-btn"
                onClick={() => {
                  sound.playPop();
                  setCartOpen(true);
                }}
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-black/80 border border-white/15 hover:border-red-600/60 text-white font-head text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-red-500" />
                <span className="hidden sm:inline">Bag</span>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="min-w-[20px] h-[20px] px-1 rounded-full bg-red-600 text-white font-num text-[11px] font-bold flex items-center justify-center shadow-[0_0_12px_rgba(238,21,21,0.6)]"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Trainer Pass Card / Sign In */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playPop();
                      setTrainerModalOpen(true);
                    }}
                    title="Click to view & edit Official Trainer Card"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 border border-red-600/40 hover:border-red-500 cursor-pointer transition-all group shadow-md active:scale-95"
                  >
                    <img
                      src={trainer.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${trainer.id}`}
                      alt={trainer.displayName || 'Trainer Avatar'}
                      className="w-7 h-7 rounded-lg object-cover border border-red-600/50"
                    />
                    <div className="hidden sm:block leading-none text-left">
                      <div className="font-head text-[11px] text-white font-bold group-hover:text-red-500 transition-colors">
                        {trainer.displayName}
                      </div>
                      <div className="font-body text-[10px] text-red-500 font-semibold flex items-center gap-1 mt-0.5">
                        <Award className="w-2.5 h-2.5" />
                        {trainer.badge || 'Explorer'}
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      logout();
                    }}
                    title="Sign Out"
                    className="hidden sm:flex p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-600/10 transition-all cursor-pointer border border-transparent hover:border-red-600/30"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  id="signin-btn"
                  onClick={() => {
                    sound.playClick();
                    setAuthModalOpen(true);
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl btn-primary text-white text-xs font-head font-bold cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Sign In / Access
                </button>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => {
                  sound.playPop();
                  setMobileOpen(o => !o);
                }}
                className="md:hidden p-2 rounded-xl bg-black/80 border border-white/10 text-white/80 hover:text-white"
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
                className="overflow-hidden md:hidden border-t border-white/10 mt-3 pt-2 px-4 pb-4 space-y-2 bg-black/90 rounded-b-2xl"
              >
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => sound.playPop()}
                    className={`block px-4 py-3 rounded-xl font-head text-sm font-bold transition-all ${isActive(link.href)
                      ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-900'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Authentication Controls */}
                <div className="pt-2 border-t border-white/10 sm:hidden">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          sound.playPop();
                          setMobileOpen(false);
                          setTrainerModalOpen(true);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-red-600/10 border border-red-600/30 text-red-500 font-head text-sm font-bold"
                      >
                        <span className="flex items-center gap-2">
                          <img
                            src={trainer.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${trainer.id}`}
                            alt={trainer.displayName || 'Avatar'}
                            className="w-6 h-6 rounded-md object-cover"
                          />
                          Trainer Pass ({trainer.displayName})
                        </span>
                        <Award className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          sound.playPop();
                          setMobileOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-red-600/10 border border-red-600/30 text-red-400 font-head text-xs font-bold"
                      >
                        <span>Sign Out</span>
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        sound.playClick();
                        setMobileOpen(false);
                        setAuthModalOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-primary text-white font-head text-sm font-bold"
                    >
                      <Shield className="w-4 h-4" />
                      Sign In / Register
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      {/* Trainer Pass Card Modal */}
      <TrainerCardModal
        isOpen={trainerModalOpen}
        onClose={() => setTrainerModalOpen(false)}
      />

      {/* Auth Sign In / Registration Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <CartDrawerNew />
    </>
  );
}