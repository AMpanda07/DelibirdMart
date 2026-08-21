import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertTriangle, ArrowRight, ArrowLeft, CheckCircle2, Compass, Search, ShoppingBag, Award, Moon } from 'lucide-react';
import { sound } from '../utils/audio';
import PokeBallLogo from './PokeBallLogo';

export default function DisclaimerGuideModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Disclaimer, 2: App Guide

  const handleClose = () => {
    try { localStorage.setItem('hasSeenDisclaimer', 'true'); } catch (e) {}
    onClose();
  };

  const handleNext = () => {
    sound.playClick();
    setStep(2);
  };

  const handleBack = () => {
    sound.playPop();
    setStep(1);
  };

  const handleFinish = () => {
    sound.playSuccess();
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        {/* Backdrop click optional exit */}
        <div
          className="absolute inset-0"
          onClick={() => {
            sound.playPop();
            handleClose();
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative max-w-lg w-full rounded-3xl overflow-hidden theme-card border border-red-600/50 z-10 shadow-2xl theme-text"
        >
          {/* Top Right Cross Exit Button (Always Available) */}
          <button
            onClick={() => {
              sound.playPop();
              handleClose();
            }}
            title="Exit Disclaimer & Enter App"
            className="absolute top-4 right-4 z-20 p-2 rounded-xl theme-bg border theme-border theme-muted hover:theme-text hover:border-red-600 transition-all cursor-pointer shadow-md"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>

          {/* Header Banner */}
          <div className="relative p-6 sm:p-7 border-b theme-border theme-card">
            <div className="absolute top-0 right-12 w-28 h-28 rounded-full bg-red-600/10 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 pr-8">
              <PokeBallLogo className="w-10 h-10 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-red-600/20 border border-red-600/40 font-head text-[9px] font-extrabold text-red-500 uppercase tracking-widest flex items-center gap-1">
                    {step === 1 ? (
                      <>
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        FANTASY DISCLAIMER
                      </>
                    ) : (
                      <>
                        <Compass className="w-3 h-3 text-red-500" />
                        APPLICATION GUIDE
                      </>
                    )}
                  </span>
                  <span className="font-head text-[10px] theme-muted font-bold">
                    Step {step} of 2
                  </span>
                </div>
                <h3 className="font-head text-lg sm:text-xl font-bold theme-text mt-1">
                  {step === 1 ? 'Delibird Mart — World Disclaimer' : 'How to Use Delibird Mart'}
                </h3>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-7 space-y-5">
            {step === 1 ? (
              /* Step 1: Fantasy & In-Development Disclaimer */
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                {/* Disclaimer Box 1: Fantasy Setting */}
                <div className="p-4 rounded-2xl bg-red-600/10 border border-red-600/30 space-y-2">
                  <div className="flex items-center gap-2 text-red-500 font-head text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    Fictional & Fantasy Setting
                  </div>
                  <p className="font-body text-xs theme-text leading-relaxed">
                    This platform is an editorial, fan-made interactive experience set entirely in the fictional Pokémon universe (<strong>Kalos Region / Lumiose City</strong>). All Pokémon, regions, adoption items, and badges are <strong>100% fictional</strong> and <strong>not related to any real-world entities, locations, or live transactions</strong>.
                  </p>
                </div>

                {/* Disclaimer Box 2: In-Development Notice */}
                <div className="p-4 rounded-2xl theme-bg border theme-border space-y-2">
                  <div className="flex items-center gap-2 theme-text font-head text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Active Development Notice
                  </div>
                  <p className="font-body text-xs theme-muted leading-relaxed">
                    Delibird Mart is currently under <strong>active development</strong>. Core marketplace features, Trainer Pass persistence, and dual light/dark themes are live, while additional features, sanctuary quests, and expanded Pokédex entries will be released in upcoming updates!
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-between text-[11px] font-head theme-muted pt-1">
                  <span>Click "Next" to view the application user guide.</span>
                  <span className="font-bold text-red-500">1 / 2</span>
                </div>
              </motion.div>
            ) : (
              /* Step 2: User Guide */
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-3"
              >
                <p className="font-body text-xs theme-muted mb-2">
                  Follow these quick tips to get the most out of your Delibird Mart experience:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                  {/* Guide Item 1 */}
                  <div className="p-3 rounded-2xl theme-bg border theme-border space-y-1">
                    <div className="flex items-center gap-1.5 font-head text-xs font-bold text-red-500">
                      <Search className="w-3.5 h-3.5" />
                      1. Marketplace & Search
                    </div>
                    <p className="font-body text-[11px] theme-muted leading-tight">
                      Search Pokémon by name, filter by Type, Evolution Stage, Region, and Rarity tier.
                    </p>
                  </div>

                  {/* Guide Item 2 */}
                  <div className="p-3 rounded-2xl theme-bg border theme-border space-y-1">
                    <div className="flex items-center gap-1.5 font-head text-xs font-bold text-red-500">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      2. Adoption Bag
                    </div>
                    <p className="font-body text-[11px] theme-muted leading-tight">
                      Add companions to your Bag and complete adoptions to save them to your account.
                    </p>
                  </div>

                  {/* Guide Item 3 */}
                  <div className="p-3 rounded-2xl theme-bg border theme-border space-y-1">
                    <div className="flex items-center gap-1.5 font-head text-xs font-bold text-red-500">
                      <Award className="w-3.5 h-3.5" />
                      3. Holographic Pass
                    </div>
                    <p className="font-body text-[11px] theme-muted leading-tight">
                      Sign in to unlock your Trainer Pass ID and inspect your saved adopted companions.
                    </p>
                  </div>

                  {/* Guide Item 4 */}
                  <div className="p-3 rounded-2xl theme-bg border theme-border space-y-1">
                    <div className="flex items-center gap-1.5 font-head text-xs font-bold text-red-500">
                      <Moon className="w-3.5 h-3.5" />
                      4. Themes & Web Audio
                    </div>
                    <p className="font-body text-[11px] theme-muted leading-tight">
                      Toggle Light/Dark modes anytime and enjoy synthesized futuristic UI sound effects.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Navigation Controls */}
          <div className="p-5 border-t theme-border flex items-center justify-between theme-card">
            {step === 1 ? (
              <>
                <button
                  onClick={() => {
                    sound.playPop();
                    handleClose();
                  }}
                  className="px-4 py-2.5 rounded-xl theme-bg border theme-border text-xs font-head font-bold theme-muted hover:theme-text cursor-pointer transition-all"
                >
                  Skip & Enter
                </button>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl btn-primary text-white text-xs font-head font-bold flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                >
                  <span>Next: App Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl theme-bg border theme-border text-xs font-head font-bold theme-text hover:border-red-600 cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-xl btn-primary text-white text-xs font-head font-bold flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Explore Delibird Mart!</span>
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
