/**
 * App.jsx
 * Root application shell.
 *
 * IMPORTANT: <BrowserRouter> is declared in main.jsx.
 * DO NOT add BrowserRouter or Router here.
 * This file only uses <Routes> and <Route>.
 *
 * Context providers wrap the layout so all pages and
 * components can access AuthContext and CartContext.
 */
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// ── Context providers ─────────────────────────────────────────────
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// ── Layout components ─────────────────────────────────────────────
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';

// ── Pages (lazy-loaded for code-splitting) ────────────────────────
const Home        = lazy(() => import('./pages/Home'));
const Marketplace = lazy(() => import('./pages/Marketplace'));

/* ── Page transition wrapper ─────────────────────────────────────── */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

/* ── Loading fallback ────────────────────────────────────────────── */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#07111F]">
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 rounded-full border-2 border-blue-500/30 border-t-blue-500"
      />
      <p className="font-body text-sm text-white/30">Loading Delibird Mart…</p>
    </div>
  </div>
);

/* ── 404 page ────────────────────────────────────────────────────── */
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-lumiose gap-6 text-center px-4 pt-24">
    <div className="text-6xl">🚫</div>
    <h1 className="font-head text-5xl font-black text-white">404</h1>
    <p className="font-body text-lg text-white/50">
      Lost somewhere in Lumiose City? This route doesn't exist.
    </p>
    <a
      href="/"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-white font-body font-semibold text-sm"
    >
      Return to Delibird Mart
    </a>
  </div>
);

/* ── Animated routes ─────────────────────────────────────────────── */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/marketplace"
          element={
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Marketplace />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/* ── Root export ─────────────────────────────────────────────────── */
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#07111F] text-slate-100">
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0F172A',
                color: '#F8FAFC',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '0.75rem',
                fontSize: '0.875rem'
              }
            }}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}