import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserCheck, Plus } from 'lucide-react';
import { playClickSound, playHoverSound, playLevelUpSound } from '../utils/sound';

const ATTRS = ['STRENGTH', 'AGILITY', 'INTELLECT', 'VITALITY', 'PERCEPTION'];

export default function PlayerStatusModal({ isOpen, onClose, soundEnabled }) {
  const [pts, setPts] = useState(15);
  const [stats, setStats] = useState({ STRENGTH: 284, AGILITY: 290, INTELLECT: 270, VITALITY: 250, PERCEPTION: 265 });

  if (!isOpen) return null;

  const addStat = (k) => {
    if (pts <= 0) return;
    playLevelUpSound(soundEnabled);
    setPts(p => p - 1);
    setStats(s => ({ ...s, [k]: s[k] + 1 }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <div className="absolute inset-0" onClick={() => { playClickSound(soundEnabled); onClose(); }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          className="relative max-w-md w-full glass rounded-2xl border border-cyan-400/45 z-10 p-6 sm:p-8 space-y-5"
          style={{ boxShadow: '0 0 60px rgba(6,182,212,0.2), 0 32px 80px rgba(0,0,0,0.7)' }}
        >
          <span className="hud-tl" /><span className="hud-tr" />
          <span className="hud-bl" /><span className="hud-br" />

          <button
            onClick={() => { playClickSound(soundEnabled); onClose(); }}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-pixel text-[9px] text-cyan-400 tracking-widest">[ PLAYER STATUS WINDOW ]</span>
          </div>

          {/* Identity */}
          <div className="bg-slate-950 rounded-xl p-4 border border-cyan-500/20 space-y-2">
            {[
              ['NAME', 'Red (Champion)'],
              ['REGION', 'Kalos Z-A'],
              ['RANK', 'S-Rank Trainer'],
              ['LEVEL', '99'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="font-pixel text-[8px] text-slate-500 uppercase">{k}:</span>
                <span className={`font-vt323 text-base ${k === 'LEVEL' ? 'text-cyan-400 text-glow-cyan' : 'text-white'}`}>{v}</span>
              </div>
            ))}
          </div>

          {/* Stat points */}
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[8px] text-slate-400 uppercase">Attribute Points:</span>
            <span className="font-pixel text-[9px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">{pts} PTS</span>
          </div>

          {/* Attributes */}
          <div className="space-y-2.5">
            {ATTRS.map(attr => (
              <div key={attr} className="flex items-center justify-between bg-slate-900/80 px-3 py-2.5 rounded-lg border border-slate-800">
                <span className="font-pixel text-[8px] text-slate-300">{attr}:</span>
                <div className="flex items-center gap-3">
                  <span className="font-vt323 text-lg text-cyan-300">{stats[attr]}</span>
                  {pts > 0 && (
                    <button
                      onClick={() => addStat(attr)}
                      onMouseEnter={() => playHoverSound(soundEnabled)}
                      className="p-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { playClickSound(soundEnabled); onClose(); }}
            className="w-full font-pixel text-[8px] py-3 rounded-xl glass border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:glow-cyan transition-all cursor-pointer"
          >
            CONFIRM & CLOSE
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
