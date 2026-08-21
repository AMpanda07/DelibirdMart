import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, User, Image, Sun, Moon, Palette, MapPin, Check, Sparkles, Shield, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';

const AVATAR_PRESETS = [
  { id: 'pixel',     name: 'Pixel Trainer', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Trainer' },
  { id: 'red',       name: 'Red (Kanto)',   url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Red' },
  { id: 'ash',       name: 'Ash (Pallet)',  url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Ash' },
  { id: 'serena',    name: 'Serena (Kalos)',url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Serena' },
  { id: 'cynthia',   name: 'Cynthia',       url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Cynthia' },
  { id: 'pikachu',   name: 'Pikachu',       url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
  { id: 'lucario',   name: 'Lucario',       url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png' },
  { id: 'delibird',  name: 'Delibird',      url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/225.png' },
];

const COLOR_SCHEMES = [
  { id: 'red',     name: 'Electric Red',    color: '#EE1515', border: 'border-red-500' },
  { id: 'blue',    name: 'Royal Blue',      color: '#2563EB', border: 'border-blue-500' },
  { id: 'cyan',    name: 'Neon Cyan',       color: '#06B6D4', border: 'border-cyan-500' },
  { id: 'yellow',  name: 'Thunder Yellow',  color: '#EAB308', border: 'border-yellow-500' },
  { id: 'emerald', name: 'Emerald Grass',   color: '#10B981', border: 'border-emerald-500' },
  { id: 'purple',  name: 'Psychic Purple',  color: '#A855F7', border: 'border-purple-500' },
];

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

export default function SettingsModal({ isOpen, onClose }) {
  const { trainer, updateTrainerProfile, isAuthenticated } = useAuth();
  const { theme, isDark, toggleTheme, colorScheme, setColorScheme } = useTheme();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'avatar' | 'theme' | 'region'
  const [formData, setFormData] = useState({
    displayName: '',
    profession: 'Pokémon Trainer',
    region: 'Kalos',
    age: 18,
    avatar: ''
  });

  useEffect(() => {
    if (trainer) {
      setFormData({
        displayName: trainer.displayName || '',
        profession: trainer.profession || 'Pokémon Trainer',
        region: trainer.region || 'Kalos',
        age: trainer.age || 18,
        avatar: trainer.avatar || ''
      });
    }
  }, [trainer, isOpen]);

  const handleSave = async () => {
    sound.playClick();
    if (isAuthenticated) {
      await updateTrainerProfile(formData);
    }
    sound.playSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className="absolute inset-0"
            onClick={() => { sound.playClick(); onClose(); }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative max-w-lg w-full rounded-3xl overflow-hidden theme-card border border-red-600/40 z-10 shadow-2xl theme-text"
          >
          {/* Header */}
          <div className="p-6 border-b theme-border flex items-center justify-between theme-card relative">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-red-600/20 border border-red-600/40 text-red-500">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <span className="font-head text-[10px] uppercase tracking-widest text-red-500 font-bold block">
                  SYSTEM & TRAINER SETTINGS
                </span>
                <h3 className="font-head text-lg font-bold theme-text tracking-wide">
                  Application Preferences
                </h3>
              </div>
            </div>

            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-2 rounded-xl theme-bg border theme-border theme-muted hover:theme-text transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Bar Tabs */}
          <div className="p-2 border-b theme-border flex items-center gap-1.5 overflow-x-auto theme-bg">
            <button
              onClick={() => { sound.playPop(); setActiveTab('profile'); }}
              className={`px-3 py-1.5 rounded-xl font-head text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'profile' ? 'bg-red-600 text-white shadow-md' : 'theme-muted hover:theme-text'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Profile Details
            </button>

            <button
              onClick={() => { sound.playPop(); setActiveTab('avatar'); }}
              className={`px-3 py-1.5 rounded-xl font-head text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'avatar' ? 'bg-red-600 text-white shadow-md' : 'theme-muted hover:theme-text'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              Profile Logo
            </button>

            <button
              onClick={() => { sound.playPop(); setActiveTab('theme'); }}
              className={`px-3 py-1.5 rounded-xl font-head text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'theme' ? 'bg-red-600 text-white shadow-md' : 'theme-muted hover:theme-text'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Theme & Color
            </button>

            <button
              onClick={() => { sound.playPop(); setActiveTab('region'); }}
              className={`px-3 py-1.5 rounded-xl font-head text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'region' ? 'bg-red-600 text-white shadow-md' : 'theme-muted hover:theme-text'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Region
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-5 max-h-96 overflow-y-auto">
            {/* Tab 1: Profile Details */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-head theme-muted uppercase font-bold mb-1">
                    Trainer Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    placeholder="Enter trainer handle..."
                    className="w-full px-3.5 py-2.5 rounded-xl theme-input border theme-border text-sm font-body focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-head theme-muted uppercase font-bold mb-1">
                      Profession
                    </label>
                    <select
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl theme-input border theme-border text-xs font-body focus:outline-none focus:border-red-600"
                    >
                      {PROFESSIONS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-head theme-muted uppercase font-bold mb-1">
                      Trainer Age
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="99"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl theme-input border theme-border text-xs font-body focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Profile Logo / Avatar Selector */}
            {activeTab === 'avatar' && (
              <div className="space-y-4">
                <span className="text-[11px] font-head theme-muted uppercase font-bold block">
                  Select Trainer Logo Preset
                </span>

                <div className="grid grid-cols-4 gap-3">
                  {AVATAR_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        sound.playPop();
                        setFormData({ ...formData, avatar: preset.url });
                      }}
                      className={`p-2 rounded-2xl theme-card border flex flex-col items-center gap-1.5 transition-all cursor-pointer relative ${
                        formData.avatar === preset.url
                          ? 'border-red-600 bg-red-600/10 shadow-md'
                          : 'theme-border hover:border-red-600/50'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-12 h-12 rounded-xl object-cover" />
                      <span className="text-[9px] font-head font-bold theme-text truncate w-full text-center">
                        {preset.name}
                      </span>
                      {formData.avatar === preset.url && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] font-head theme-muted uppercase font-bold mb-1">
                    Custom Avatar Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="https://example.com/avatar.png"
                    className="w-full px-3 py-2 rounded-xl theme-input border theme-border text-xs font-body focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Theme Mode & Color Scheme */}
            {activeTab === 'theme' && (
              <div className="space-y-5">
                {/* Dark / Light Toggle */}
                <div className="space-y-2">
                  <span className="text-[11px] font-head theme-muted uppercase font-bold block">
                    Display Mode
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        sound.playPop();
                        if (isDark) toggleTheme();
                      }}
                      className={`p-3.5 rounded-2xl theme-card border flex items-center gap-3 transition-all cursor-pointer ${
                        !isDark ? 'border-red-600 bg-red-600/10' : 'theme-border'
                      }`}
                    >
                      <Sun className="w-5 h-5 text-amber-500" />
                      <div className="text-left">
                        <div className="font-head text-xs font-bold theme-text">Snow Pearl Light</div>
                        <div className="font-body text-[10px] theme-muted">Clean Day Aesthetic</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        sound.playPop();
                        if (!isDark) toggleTheme();
                      }}
                      className={`p-3.5 rounded-2xl theme-card border flex items-center gap-3 transition-all cursor-pointer ${
                        isDark ? 'border-red-600 bg-red-600/10' : 'theme-border'
                      }`}
                    >
                      <Moon className="w-5 h-5 text-red-500" />
                      <div className="text-left">
                        <div className="font-head text-xs font-bold theme-text">Pitch Obsidian Dark</div>
                        <div className="font-body text-[10px] theme-muted">High-Contrast Night</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Color Accent Scheme */}
                <div className="space-y-2 pt-2 border-t theme-border">
                  <span className="text-[11px] font-head theme-muted uppercase font-bold block">
                    Primary Brand Color Scheme
                  </span>
                  <div className="grid grid-cols-5 gap-2">
                    {COLOR_SCHEMES.map(c => (
                      <button
                        key={c.id}
                        onClick={() => {
                          sound.playPop();
                          setColorScheme(c.id);
                        }}
                        className={`p-2.5 rounded-2xl theme-card border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          colorScheme === c.id ? `${c.border} bg-white/5` : 'theme-border'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-white/20 shadow-md"
                          style={{ backgroundColor: c.color }}
                        />
                        <span className="text-[9px] font-head font-bold theme-text truncate w-full text-center">
                          {c.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Home Region Setting */}
            {activeTab === 'region' && (
              <div className="space-y-3">
                <span className="text-[11px] font-head theme-muted uppercase font-bold block">
                  Select Trainer Home Region
                </span>

                <div className="grid grid-cols-3 gap-2.5">
                  {REGIONS.map(r => (
                    <button
                      key={r}
                      onClick={() => {
                        sound.playPop();
                        setFormData({ ...formData, region: r });
                      }}
                      className={`p-3 rounded-2xl theme-card border flex items-center justify-between transition-all cursor-pointer ${
                        formData.region === r
                          ? 'border-red-600 bg-red-600/10 text-red-500 font-bold'
                          : 'theme-border theme-text'
                      }`}
                    >
                      <span className="font-head text-xs">{r}</span>
                      {formData.region === r && <Check className="w-3.5 h-3.5 text-red-500" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-5 border-t theme-border flex items-center justify-between theme-card">
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="px-4 py-2.5 rounded-xl theme-bg border theme-border text-xs font-head font-bold theme-muted hover:theme-text cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl btn-primary text-white text-xs font-head font-bold flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
            >
              <Check className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </motion.div>
      </div>
      ) : null}
    </AnimatePresence>
  );
}
