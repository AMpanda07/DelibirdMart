import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Shield, Award, LogOut, Sun, Moon, Search, User, ChevronDown } from 'lucide-react';
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
  const [trainerModalOpen, setTrainerModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);

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

  /* Listen for global sign-in modal triggers */
  useEffect(() => {
    const handleGlobalAuthReq = () => setAuthModalOpen(true);
    window.addEventListener('open-auth-modal', handleGlobalAuthReq);
    return () => window.removeEventListener('open-auth-modal', handleGlobalAuthReq);
  }, []);

  /* Close user menu on click outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6">
          <motion.div
            animate={{
              paddingTop: scrolled ? '8px' : '12px',
              paddingBottom: scrolled ? '8px' : '12px',
            }}
            transition={{ duration: 0.3 }}
            className={`mt-2 sm:mt-3 rounded-2xl transition-all duration-300 ${scrolled
              ? 'glass-strong shadow-[0_12px_40px_rgba(0,0,0,0.85)] border-red-600/30'
              : 'glass shadow-[0_6px_30px_rgba(0,0,0,0.4)]'
              }`}
          >
            <div className="px-3 sm:px-6 space-y-2">

              {/* Top Main Navbar Row */}
              <div className="flex items-center justify-between gap-2 sm:gap-4">

                {/* Logo */}
                <Link
                  to="/"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-2 sm:gap-3 shrink-0 group"
                >
                  <PokeBallLogo className="w-8 h-8 sm:w-10 sm:h-10" />
                  <div className="leading-none">
                    <div className="font-head text-base sm:text-lg font-black tracking-tight theme-text group-hover:text-red-500 transition-colors flex items-center gap-1">
                      Delibird <span className="text-red-600">Mart</span>
                    </div>
                    <div className="font-body text-[9px] sm:text-[10px] theme-muted tracking-widest uppercase mt-0.5 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
                      Sanctuary
                    </div>
                  </div>
                </Link>

                {/* Center/Right Controls Row */}
                <div className="flex items-center gap-2 shrink-0">

                  {/* Search Bar Beside Bag Button */}
                  <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                    <Search className="absolute left-2.5 sm:left-3 w-3.5 h-3.5 theme-muted pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-24 sm:w-40 md:w-56 theme-input border theme-border rounded-xl pl-7 sm:pl-8 pr-2 py-1.5 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner transition-all"
                    />
                  </form>

                  {/* Cart Drawer Button */}
                  <button
                    id="cart-btn"
                    onClick={() => {
                      sound.playPop();
                      setCartOpen(true);
                    }}
                    className="relative flex items-center gap-1 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-red-600 text-white font-head text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
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

                </div>
              </div>

              {/* Sub-Navigation Bar Below Main Row (Home, Marketplace, About, and Interactive Icon Menu Beside About) */}
              <div className="flex items-center justify-center pt-1 border-t theme-border">
                <nav className="flex items-center gap-1 sm:gap-2">
                  {NAV_LINKS.map(link => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => sound.playPop()}
                      className={`px-3 sm:px-5 py-1 rounded-xl font-head text-xs font-bold transition-all ${isActive(link.href)
                        ? 'bg-red-600 text-white shadow-[0_4px_16px_rgba(238,21,21,0.4)]'
                        : 'theme-muted hover:theme-text hover:bg-slate-500/10'
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Interactive Icon Menu Button Placed Directly Beside About Button (Clean Icon-Only Trigger) */}
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => {
                        sound.playPop();
                        setUserMenuOpen(o => !o);
                      }}
                      title="User Settings & Theme Menu"
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl theme-card border theme-border hover:border-red-600/60 transition-all cursor-pointer shadow-sm text-xs font-head font-bold theme-text"
                    >
                      {isAuthenticated ? (
                        <img
                          src={trainer?.avatar || '/avatar.png'}
                          alt="Trainer"
                          className="w-4 h-4 rounded-full object-cover border border-red-500"
                        />
                      ) : (
                        <User className="w-3.5 h-3.5 text-red-500" />
                      )}
                      <ChevronDown className={`w-3.5 h-3.5 theme-muted transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Hidden Menu Popover Placed Directly Below Trigger Button */}
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-56 rounded-2xl theme-card border border-red-600/40 p-2.5 shadow-2xl z-50 space-y-1.5 theme-text backdrop-blur-xl"
                        >
                          <div className="px-3 py-1.5 border-b theme-border">
                            <span className="font-head text-[10px] uppercase tracking-widest text-red-500 font-bold block">
                              {isAuthenticated ? 'TRAINER SESSION' : 'GUEST SESSION'}
                            </span>
                            <p className="font-body text-xs font-bold theme-text truncate">
                              {isAuthenticated ? trainer?.displayName || 'Logged Trainer' : 'Welcome to Delibird Mart'}
                            </p>
                          </div>

                          {/* Theme Switcher Button */}
                          <button
                            onClick={() => {
                              sound.playPop();
                              toggleTheme();
                            }}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-red-600/10 text-xs font-head font-bold theme-text transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              {isDark ? <Sun className="w-4 h-4 text-red-500" /> : <Moon className="w-4 h-4 text-red-500" />}
                              <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                            </div>
                            <span className="text-[10px] theme-muted uppercase">{isDark ? 'Dark' : 'Light'}</span>
                          </button>

                          {/* Trainer Pass / Sign In Button */}
                          {isAuthenticated ? (
                            <>
                              <button
                                onClick={() => {
                                  sound.playClick();
                                  setUserMenuOpen(false);
                                  setTrainerModalOpen(true);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-red-600/10 text-xs font-head font-bold theme-text transition-colors cursor-pointer"
                              >
                                <Award className="w-4 h-4 text-red-500" />
                                <span>View Holographic Pass</span>
                              </button>

                              <button
                                onClick={() => {
                                  sound.playPop();
                                  setUserMenuOpen(false);
                                  logout();
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-red-600/10 text-xs font-head font-bold text-red-500 transition-colors cursor-pointer"
                              >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                sound.playClick();
                                setUserMenuOpen(false);
                                setAuthModalOpen(true);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl btn-primary text-white text-xs font-head font-bold cursor-pointer shadow-md"
                            >
                              <Shield className="w-4 h-4 text-white" />
                              <span>Sign In / Register</span>
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </nav>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.header>

      <CartDrawerNew />
      <TrainerCardModal isOpen={trainerModalOpen} onClose={() => setTrainerModalOpen(false)} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}