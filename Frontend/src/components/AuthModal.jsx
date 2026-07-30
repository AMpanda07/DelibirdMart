import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, LogIn, Shield, UserPlus, KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState('signin'); // 'signin' | 'signup' | 'forgot'
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
  const [resetData, setResetData] = useState({
    identifier: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { loginWithEmail, signupWithEmail, resetPassword, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    sound.playClick();
    try {
      await loginWithEmail(signInData.identifier, signInData.password);
      sound.playPop();
      onClose();
    } catch (err) {
      // Errors handled by toast in AuthContext
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
      // Errors handled by toast in AuthContext
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    sound.playClick();
    if (resetData.newPassword !== resetData.confirmPassword) {
      alert('Passwords do not match. Please verify your new password.');
      return;
    }
    try {
      const success = await resetPassword(resetData.identifier, resetData.newPassword);
      if (success) {
        sound.playSuccess();
        setViewMode('signin');
        setSignInData(prev => ({ ...prev, identifier: resetData.identifier }));
        setResetData({ identifier: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      // Errors handled by toast in AuthContext
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div
          className="absolute inset-0"
          onClick={() => { sound.playClick(); onClose(); }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-md w-full rounded-3xl overflow-hidden theme-card border border-red-600/40 z-10 shadow-2xl theme-text"
        >
          {/* Header */}
          <div className="relative p-6 theme-card border-b theme-border text-center">
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="absolute top-4 right-4 p-2 rounded-xl theme-bg border theme-border theme-muted hover:theme-text transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="inline-flex p-3 rounded-2xl bg-red-600/20 border border-red-600/40 text-red-500 mb-2">
              {viewMode === 'forgot' ? <KeyRound size={24} /> : <Shield size={24} />}
            </div>

            <h2 className="text-xl font-bold font-head tracking-wide theme-text uppercase">
              {viewMode === 'signup'
                ? 'REGISTER TRAINER PASS'
                : viewMode === 'forgot'
                ? 'RESET TRAINER PASSWORD'
                : 'TRAINER SIGN IN'}
            </h2>
            <p className="text-xs font-body theme-muted mt-0.5">
              {viewMode === 'signup'
                ? 'Create your Lumiose Sanctuary credentials'
                : viewMode === 'forgot'
                ? 'Enter your account details to update your password'
                : 'Access your official Pokémon Trainer account'}
            </p>

            {/* Mode Switcher Tabs */}
            {viewMode !== 'forgot' && (
              <div className="grid grid-cols-2 gap-1 p-1 theme-bg rounded-xl border theme-border mt-4">
                <button
                  type="button"
                  onClick={() => { sound.playPop(); setViewMode('signin'); }}
                  className={`py-2 rounded-lg font-head text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'signin'
                      ? 'bg-red-600 text-white shadow-[0_4px_16px_rgba(238,21,21,0.5)]'
                      : 'theme-muted hover:theme-text'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { sound.playPop(); setViewMode('signup'); }}
                  className={`py-2 rounded-lg font-head text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'signup'
                      ? 'bg-red-600 text-white shadow-[0_4px_16px_rgba(238,21,21,0.5)]'
                      : 'theme-muted hover:theme-text'
                  }`}
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {viewMode === 'signin' && (
              /* Sign In Form */
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-head font-bold uppercase theme-muted mb-1">
                    Username or Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 theme-muted" size={16} />
                    <input
                      type="text"
                      required
                      value={signInData.identifier}
                      onChange={(e) => setSignInData({ ...signInData, identifier: e.target.value })}
                      placeholder="trainer_username or email"
                      className="w-full theme-input border theme-border rounded-xl pl-10 pr-4 py-2.5 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-head font-bold uppercase theme-muted">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => { sound.playPop(); setViewMode('forgot'); }}
                      className="text-[11px] font-head font-bold text-red-500 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 theme-muted" size={16} />
                    <input
                      type="password"
                      required
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full theme-input border theme-border rounded-xl pl-10 pr-4 py-2.5 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner"
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
            )}

            {viewMode === 'signup' && (
              /* Register Form */
              <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-head font-bold uppercase theme-muted mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      required
                      value={signUpData.displayName}
                      onChange={(e) => setSignUpData({ ...signUpData, displayName: e.target.value })}
                      placeholder="Red"
                      className="w-full theme-input border theme-border rounded-xl px-3 py-2 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-head font-bold uppercase theme-muted mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={signUpData.username}
                      onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                      placeholder="red_champion"
                      className="w-full theme-input border theme-border rounded-xl px-3 py-2 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-bold uppercase theme-muted mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-2.5 theme-muted" size={15} />
                    <input
                      type="email"
                      required
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      placeholder="trainer@kalos.com"
                      className="w-full theme-input border theme-border rounded-xl pl-9 pr-3 py-2 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-bold uppercase theme-muted mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-2.5 theme-muted" size={15} />
                    <input
                      type="password"
                      required
                      minLength="6"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      placeholder="At least 6 characters"
                      className="w-full theme-input border theme-border rounded-xl pl-9 pr-3 py-2 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-head font-bold uppercase theme-muted mb-1">
                      Profession
                    </label>
                    <select
                      value={signUpData.profession}
                      onChange={(e) => setSignUpData({ ...signUpData, profession: e.target.value })}
                      className="w-full theme-input border theme-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-red-600 font-body"
                    >
                      {PROFESSIONS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-head font-bold uppercase theme-muted mb-1">
                      Home Region
                    </label>
                    <select
                      value={signUpData.region}
                      onChange={(e) => setSignUpData({ ...signUpData, region: e.target.value })}
                      className="w-full theme-input border theme-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-red-600 font-body"
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

            {viewMode === 'forgot' && (
              /* Reset Password Form */
              <form onSubmit={handleResetSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-head font-bold uppercase theme-muted mb-1">
                    Username or Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 theme-muted" size={16} />
                    <input
                      type="text"
                      required
                      value={resetData.identifier}
                      onChange={(e) => setResetData({ ...resetData, identifier: e.target.value })}
                      placeholder="Enter registered username or email"
                      className="w-full theme-input border theme-border rounded-xl pl-10 pr-4 py-2.5 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-bold uppercase theme-muted mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 theme-muted" size={16} />
                    <input
                      type="password"
                      required
                      minLength="6"
                      value={resetData.newPassword}
                      onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                      placeholder="At least 6 characters"
                      className="w-full theme-input border theme-border rounded-xl pl-10 pr-4 py-2.5 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-head font-bold uppercase theme-muted mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 theme-muted" size={16} />
                    <input
                      type="password"
                      required
                      minLength="6"
                      value={resetData.confirmPassword}
                      onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                      placeholder="Re-enter new password"
                      className="w-full theme-input border theme-border rounded-xl pl-10 pr-4 py-2.5 text-xs placeholder-slate-400 focus:outline-none focus:border-red-600 font-body shadow-inner"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 btn-primary text-white font-head text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-3 cursor-pointer"
                >
                  <KeyRound size={16} />
                  {isLoading ? 'Updating...' : 'Update & Reset Password'}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => { sound.playPop(); setViewMode('signin'); }}
                    className="inline-flex items-center gap-1 text-xs font-head font-bold theme-muted hover:theme-text transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={14} /> Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}