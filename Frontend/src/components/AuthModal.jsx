import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Sparkles, LogIn, Shield, MapPin, Award, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sound } from '../utils/audio';

const PROFESSIONS = [
  'Pokémon Trainer',
  'Gym Leader',
  'Researcher',
  'Business Owner',
  'Pokémon Pet Owner'
];

const REGIONS = [
  'Kalos',
  'Kanto',
  'Johto',
  'Hoenn',
  'Sinnoh',
  'Unova',
  'Alola',
  'Galar',
  'Paldea'
];

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInData, setSignInData] = useState({
    identifier: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
    profession: 'Pokémon Trainer',
    region: 'Kalos',
    age: 18
  });

  const { loginWithEmail, signupWithEmail, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    sound.playClick();
    try {
      await loginWithEmail(signInData.identifier, signInData.password);
      sound.playPop();
      onClose();
    } catch (err) {
      // Errors toast notification handled in AuthContext
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    sound.playClick();
    try {
      await signupWithEmail(signUpData);
      sound.playPop();
      onClose();
    } catch (err) {
      // Errors toast notification handled in AuthContext
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div
          className="absolute inset-0"
          onClick={() => { sound.playClick(); onClose(); }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-md w-full rounded-3xl overflow-hidden glass-strong border border-amber-500/30 z-10 shadow-[0_0_80px_rgba(245,158,11,0.15)] text-white"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-amber-500/20 text-center">
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
              <Shield size={24} />
            </div>
            <h2 className="text-xl font-bold font-head tracking-wide">
              {isSignUp ? 'REGISTER TRAINER PASS' : 'TRAINER SIGN IN'}
            </h2>
            <p className="text-xs font-body text-slate-400 mt-0.5">
              {isSignUp
                ? 'Create your Lumisose Sanctuary credentials'
                : 'Access your official Pokémon Trainer account'}
            </p>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950/80 rounded-xl border border-white/10 mt-4">
              <button
                type="button"
                onClick={() => { sound.playPop(); setIsSignUp(false); }}
                className={`py-2 rounded-lg font-head text-xs font-bold transition-all cursor-pointer ${
                  !isSignUp
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { sound.playPop(); setIsSignUp(true); }}
                className={`py-2 rounded-lg font-head text-xs font-bold transition-all cursor-pointer ${
                  isSignUp
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {!isSignUp ? (
              /* Sign In Form */
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-head font-bold uppercase text-slate-400 mb-1">
                    Username or Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 text-slate-500" size={16} />
                    <input
                      type="text"
                      required
                      value={signInData.identifier}
                      onChange={(e) => setSignInData({ ...signInData, identifier: e.target.value })}
                      placeholder="trainer_username or email"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-bold uppercase text-slate-400 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 text-slate-500" size={16} />
                    <input
                      type="password"
                      required
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 font-body"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 btn-primary text-white font-head text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <LogIn size={16} />
                  {isLoading ? 'Verifying...' : 'Sign In as Trainer'}
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-head font-bold uppercase text-slate-400 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      required
                      value={signUpData.displayName}
                      onChange={(e) => setSignUpData({ ...signUpData, displayName: e.target.value })}
                      placeholder="Red"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 font-body"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-head font-bold uppercase text-slate-400 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={signUpData.username}
                      onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                      placeholder="red_champion"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-bold uppercase text-slate-400 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-2.5 text-slate-500" size={15} />
                    <input
                      type="email"
                      required
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      placeholder="trainer@kalos.com"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-bold uppercase text-slate-400 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-2.5 text-slate-500" size={15} />
                    <input
                      type="password"
                      required
                      minlength="6"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      placeholder="At least 6 characters"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 font-body"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-head font-bold uppercase text-slate-400 mb-1">
                      Profession
                    </label>
                    <select
                      value={signUpData.profession}
                      onChange={(e) => setSignUpData({ ...signUpData, profession: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/60 font-body"
                    >
                      {PROFESSIONS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-head font-bold uppercase text-slate-400 mb-1">
                      Home Region
                    </label>
                    <select
                      value={signUpData.region}
                      onChange={(e) => setSignUpData({ ...signUpData, region: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/60 font-body"
                    >
                      {REGIONS.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 btn-primary text-white font-head text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-3 cursor-pointer"
                >
                  <UserPlus size={16} />
                  {isLoading ? 'Creating Pass...' : 'Register Trainer Pass'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}