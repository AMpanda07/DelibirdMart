import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Award, Cpu, Sparkles, Zap } from 'lucide-react';
import { playClickSound, playHoverSound, playQuestAcceptSound } from '../utils/sound';

const QUEST_PARAMS = [
  { label: 'OBJECTIVE', value: 'Access Lumiose Marketplace', icon: '⚔️' },
  { label: 'REWARD',    value: '+100,000 Pokégold & Mega Ring', icon: '🏆' },
  { label: 'REGION',    value: 'Kalos Z-A — Lumiose City', icon: '🗺️' },
  { label: 'RANK REQ',  value: 'S-Rank Trainer Clearance', icon: '🛡️' },
];

export default function SystemNotificationLanding({ onEnterShop, soundEnabled }) {

  const handleEnter = () => {
    playQuestAcceptSound(soundEnabled);
    onEnterShop?.();
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
  };
  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } }
  };

  return (
    <div className="relative min-h-screen bg-system-grid bg-radial-hero flex flex-col items-center justify-center overflow-hidden px-4 py-12">

      {/* ── Ambient background orbs ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="absolute bottom-16 right-8 w-80 h-80 rounded-full bg-blue-600/8 blur-[100px]" />
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-emerald-500/6 blur-[80px]" />
      </div>

      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-2xl w-full"
      >
        {/* ── System Header Chip ─────────────── */}
        <motion.div variants={itemVars} className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-400/40 glow-cyan">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-pixel text-[9px] text-cyan-300 tracking-widest">SYSTEM NOTIFICATION — QUEST #9982-S</span>
          </div>
        </motion.div>

        {/* ── Main Quest Window Card ─────────── */}
        <motion.div
          variants={itemVars}
          className="relative glass rounded-2xl border border-cyan-400/40 scanlines"
          style={{ boxShadow: '0 0 60px rgba(6,182,212,0.2), 0 32px 80px rgba(0,0,0,0.6)' }}
        >
          {/* HUD corner brackets */}
          <span className="hud-tl" /><span className="hud-tr" />
          <span className="hud-bl" /><span className="hud-br" />

          <div className="p-6 sm:p-10 space-y-7">

            {/* Header Band */}
            <div className="border-b border-cyan-500/20 pb-5 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-pixel text-[9px] text-cyan-400/80 tracking-widest uppercase">Emergency System Quest</p>
                <h1 className="font-pixel text-[13px] sm:text-[16px] text-white leading-snug text-glow-white">
                  ENTER DELIBIRD<br />MART
                </h1>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1.5">
                <span className="font-pixel text-[8px] px-2 py-1 rounded rarity-ex border">EX QUEST</span>
                <span className="font-vt323 text-sm text-emerald-400 tracking-widest">[ GATE OPEN ]</span>
              </div>
            </div>

            {/* Lore Text */}
            <div className="glass rounded-xl p-4 border border-slate-700/50 font-body text-sm text-slate-300 leading-relaxed">
              <span className="font-pixel text-[8px] text-cyan-400 mr-2">BRIEFING:</span>
              A dimensional rift has opened a direct link between the 
              {' '}<strong className="text-white">Lumiose City Marketplace</strong> and the System.
              Elite Trainers may now access <strong className="text-cyan-300">S-Rank Kalos artifacts</strong>, Mega Stones,
              and rare Delibird relics recovered from the Z-A Urban Redevelopment excavation sites.
            </div>

            {/* Quest Parameters Grid */}
            <div className="grid grid-cols-2 gap-3">
              {QUEST_PARAMS.map(q => (
                <div key={q.label} className="flex items-start gap-2.5 bg-slate-900/60 rounded-lg p-3 border border-slate-800/80">
                  <span className="text-lg shrink-0 mt-0.5">{q.icon}</span>
                  <div>
                    <div className="font-pixel text-[8px] text-slate-500 uppercase mb-0.5">{q.label}</div>
                    <div className="font-body text-xs text-slate-200 font-medium">{q.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Player Status Bar */}
            <div className="flex items-center justify-between bg-slate-900/80 rounded-lg px-4 py-2.5 border border-slate-800 font-vt323 text-lg">
              <span className="text-slate-400">PLAYER: <strong className="text-white">TRAINER</strong></span>
              <div className="flex items-center gap-4 text-slate-400">
                <span>HP: <strong className="text-emerald-400">100%</strong></span>
                <span>MP: <strong className="text-cyan-400">100%</strong></span>
                <span>RANK: <strong className="text-cyan-300">S</strong></span>
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-800/60">
              <div className="flex items-center gap-2 font-pixel text-[8px] text-cyan-400/70">
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                <span>[ PORTAL READY ]</span>
              </div>

              <motion.button
                onClick={handleEnter}
                onMouseEnter={() => playHoverSound(soundEnabled)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-pixel text-[10px] tracking-widest text-slate-950
                           bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500
                           border border-emerald-300 cursor-pointer transition-all
                           shadow-[0_0_30px_rgba(0,255,204,0.65)] hover:shadow-[0_0_50px_rgba(0,255,204,0.95)]"
              >
                ENTER SHOP
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </motion.button>
            </div>

          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div variants={itemVars} className="flex justify-center mt-8">
          <div className="flex flex-col items-center gap-2 text-slate-600 animate-float">
            <ChevronDown className="w-5 h-5" />
            <span className="font-pixel text-[7px] tracking-widest">SCROLL TO EXPLORE</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
