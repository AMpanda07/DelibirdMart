import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Shield, Award, LogOut, Sun, Moon, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { trainer, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

            {/* Redesigned Pokémon Logo with High-Visibility Text */}
            <Link
              to="/"
              onClick={() => sound.playClick()}
              className="flex items-center gap-3 shrink-0 group"
            >
              <PokeBallLogo className="w-10 h-10" />
              <div className="leading-none">
                <div className="font-head text-lg font-black tracking-tight theme-text group-hover:text-red-500 transition-colors flex items-center gap-1">
                  Delibird <span className="text-red-600">Mart</span>
                </div>
                <div className="font-body text-[10px] theme-muted tracking-widest uppercase mt-0.5 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-ping" />
                  Pokémon Sanctuary
                </div>
              </div>
            </Link>

            {/* Nav Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1 theme-bg p-1.5 rounded-2xl border theme-border">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => sound.playPop()}
                  className={`relative px-4 py-2 rounded-xl font-head text-xs font-bold transition-all ${isActive(link.href)
                    ? 'bg-red-600 text-white shadow-[0_4px_16px_rgba(238,21,21,0.5)]'
                    : 'theme-muted hover:theme-text hover:bg-slate-500/10'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2.5 shrink-0">

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

              {/* Search Bar Beside Bag Button */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3 w-3.5 h-3.5 theme-muted" />
                <input
                  type="text"
                  placeholder="Search Pokémon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-28 sm:w-40 md:w-52 theme-input border theme-border rounded-xl pl-8 pr-3 py-1.5 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner transition-all"
                />
              </form>

              {/* Cart Drawer Button */}
              <button
                id="cart-btn"
                onClick={() => {
                  sound.playPop();
                  setCartOpen(true);
                }}
                className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 text-white font-head text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Bag</span>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="min-w-[18px] h-[18px] px-1 rounded-full bg-white text-red-600 font-num text-[10px] font-bold flex items-center justify-center shadow-sm"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Trainer Pass Card / Sign In */}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    sound.playClick();
                    setTrainerModalOpen(true);
                  }}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl theme-card border theme-border hover:border-red-600/60 transition-all cursor-pointer shadow-md"
                >
                  <img
                    src={trainer?.avatar || '/avatar.png'}
                    alt="Trainer"
                    className="w-6 h-6 rounded-full object-cover border border-red-500"
                  />
                  <span className="hidden md:inline font-head text-xs font-bold theme-text truncate max-w-[90px]">
                    {trainer?.displayName || 'Trainer'}
                  </span>
                  <Award className="w-3.5 h-3.5 text-red-500 hidden sm:inline" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    sound.playClick();
                    setAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl theme-card border theme-border hover:border-red-600/60 text-xs font-head font-bold theme-text transition-all cursor-pointer shadow-md"
                >
                  <Shield className="w-4 h-4 text-red-500" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => {
                  sound.playPop();
                  setMobileOpen(o => !o);
                }}
                className="md:hidden p-2 rounded-xl theme-card border theme-border theme-text transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-4 right-4 z-30 p-4 rounded-2xl glass-strong border border-red-600/40 md:hidden space-y-3 shadow-2xl theme-text"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => {
                    sound.playPop();
                    setMobileOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl font-head text-xs font-bold transition-all ${isActive(link.href)
                    ? 'bg-red-600 text-white'
                    : 'theme-muted hover:theme-text'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {isAuthenticated ? (
              <div className="pt-2 border-t theme-border flex items-center justify-between">
                <button
                  onClick={() => {
                    sound.playClick();
                    setMobileOpen(false);
                    setTrainerModalOpen(true);
                  }}
                  className="flex items-center gap-2 text-xs font-head font-bold theme-text"
                >
                  <Award className="w-4 h-4 text-red-500" />
                  View Trainer Pass
                </button>
                <button
                  onClick={() => {
                    sound.playPop();
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-xs font-head font-bold text-red-500 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileOpen(false);
                  setAuthModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl btn-primary text-white font-head text-xs font-bold text-center block"
              >
                Sign In / Register Pass
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawerNew />
      <TrainerCardModal isOpen={trainerModalOpen} onClose={() => setTrainerModalOpen(false)} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}