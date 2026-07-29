import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Heart, ArrowRight, Activity, CheckCircle2, Server } from 'lucide-react';
import { fadeIn, staggerContainer } from '../animations/motionVariants';
import apiClient from '../api/axios.client';

const HomePage = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch backend system health status
    apiClient.get('/health')
      .then((data) => {
        setHealthData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Backend health check connection:', err.message);
        setHealthData({ success: false, message: 'Backend server initializing...' });
        setLoading(false);
      });
  }, []);

  return (
    <motion.div 
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="space-y-16 py-4"
    >
      {/* Hero Section */}
      <motion.section 
        variants={fadeIn('up', 0.2)}
        className="relative overflow-hidden rounded-3xl glass-card border border-red-500/30 p-8 md:p-14 bg-radial-hero"
      >
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wide uppercase shadow-red-glow">
            <Sparkles className="w-4 h-4 text-amber-400" /> Lumiose City Marketplace • Phase 1 Scaffolding
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Find Your Perfect <br />
            <span className="bg-gradient-to-r from-red-500 via-amber-300 to-red-400 bg-clip-text text-transparent">
              Pokémon Companion.
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Welcome to <strong className="text-red-400">Delibird Mart</strong>. Inspired by Pokémon Legends: Z-A, 
            discover, adopt, and build a lifelong bond with companions across the Kalos region.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold px-6 py-3.5 rounded-xl shadow-red-glow transition-all duration-300 transform hover:scale-[1.02]">
              Explore Marketplace <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="#backend-status"
              className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-gray-200 font-semibold px-6 py-3.5 rounded-xl border border-gray-700 transition-all"
            >
              <Server className="w-5 h-5 text-amber-400" /> API Health Status
            </a>
          </div>
        </div>

        {/* Ambient Floating Elements */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center opacity-80 pointer-events-none">
          <span className="text-9xl animate-float drop-shadow-[0_0_35px_rgba(230,57,70,0.4)]">🎁</span>
        </div>
      </motion.section>

      {/* Backend Status Section */}
      <motion.section 
        id="backend-status"
        variants={fadeIn('up', 0.4)}
        className="glass-card rounded-2xl p-6 border border-amber-500/20"
      >
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Phase 1 Infrastructure Verification</h3>
              <p className="text-xs text-gray-400">Live test connecting Express REST API to Vite Client</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-gray-900/90 border border-gray-800 text-gray-300">
            <span>GET /api/v1/health</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#03060C] border border-gray-800 font-mono text-xs text-gray-300 overflow-x-auto">
          {loading ? (
            <div className="flex items-center gap-2 text-amber-400">
              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
              Testing API Connection...
            </div>
          ) : healthData ? (
            <pre className="text-emerald-400 whitespace-pre-wrap">{JSON.stringify(healthData, null, 2)}</pre>
          ) : (
            <span className="text-red-400">Backend server offline or starting on port 5000</span>
          )}
        </div>
      </motion.section>

      {/* Architecture Highlights */}
      <motion.section variants={fadeIn('up', 0.6)} className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-red-500" /> Foundational Architecture Specs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Layered Express MVC</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Clean separation of concerns with controllers, routes, validators, services, and middlewares.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Repository Pattern</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              `BaseRepository` abstracts database queries from controller business logic for high maintainability.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-white">React + Tailwind v4</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Vite powered frontend featuring Axios client, Framer Motion animations, and custom dark mode system.
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;
