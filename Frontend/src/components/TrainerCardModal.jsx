import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, MapPin, Award, User, Sparkles, LogOut, Edit3, Check, Calendar, Heart } from 'lucide-react';
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

export default function TrainerCardModal({ isOpen, onClose }) {
  const { trainer, logout, updateTrainerProfile } = useAuth();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'companions'
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    profession: 'Pokémon Trainer',
    region: 'Kalos',
    age: 18
  });

  useEffect(() => {
    if (trainer) {
      setFormData({
        displayName: trainer.displayName || '',
        profession: trainer.profession || 'Pokémon Trainer',
        region: trainer.region || 'Kalos',
        age: trainer.age || 18
      });
    }
  }, [trainer]);

  const handleSave = async () => {
    sound.playClick();
    const success = await updateTrainerProfile(formData);
    if (success) {
      sound.playPop();
      setIsEditing(false);
    }
  };

  const formattedJoinDate = trainer.joinedAt
    ? new Date(trainer.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '2026';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
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
          {/* Header Banner */}
          <div className="relative h-28 theme-card p-6 flex items-center justify-between border-b theme-border">
            {/* Holographic Watermark */}
            <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 w-32 h-32 rounded-full bg-red-600/10 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 z-10">
              <div className="p-2 rounded-xl bg-red-600/20 border border-red-600/40 text-red-500">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-head text-[10px] uppercase tracking-widest text-red-500 font-bold block">
                  OFFICIAL TRAINER PASS
                </span>
                <h3 className="font-head text-lg theme-text font-bold tracking-wide">
                  DELIBIRD MART ID
                </h3>
              </div>
            </div>

            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="z-10 p-2 rounded-xl theme-bg border theme-border theme-muted hover:theme-text transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Trainer Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Identity Card Section */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl theme-bg border theme-border relative">
              <div className="relative">
                <img
                  src={trainer.avatar || localStorage.getItem('trainer_avatar') || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${trainer.id || 'Trainer'}`}
                  alt={trainer.displayName || 'Trainer Avatar'}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-red-600/60 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-red-600 text-white font-head text-[9px] font-extrabold flex items-center gap-1 shadow-md">
                  <Sparkles className="w-2.5 h-2.5" />
                  {trainer.badge || 'Explorer'}
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <h4 className="font-head text-xl font-bold theme-text tracking-wide">
                  {trainer.displayName || 'Trainer'}
                </h4>
                <p className="font-body text-xs theme-muted">
                  {trainer.email || 'Registered Trainer'}
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-600/10 border border-red-600/30 text-red-500 text-xs font-head font-semibold mt-1">
                  <Award className="w-3.5 h-3.5" />
                  {formData.profession}
                </div>
              </div>
            </div>

            {/* Navigation Tabs (Profile Overview vs Adopted Companions) */}
            <div className="flex items-center gap-2 p-1 rounded-2xl theme-bg border theme-border">
              <button
                onClick={() => { sound.playPop(); setActiveTab('profile'); }}
                className={`flex-1 py-2 rounded-xl font-head text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'theme-muted hover:theme-text'
                }`}
              >
                Pass Details
              </button>
              <button
                onClick={() => { sound.playPop(); setActiveTab('companions'); }}
                className={`flex-1 py-2 rounded-xl font-head text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'companions'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'theme-muted hover:theme-text'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Adopted Companions</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                  {(trainer.adoptedPokemons || []).length || trainer.adoptions || 0}
                </span>
              </button>
            </div>

            {/* Tab 1: Editable Profile Details */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-head text-xs uppercase tracking-wider theme-muted font-bold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-500" />
                    Trainer Statistics & Details
                  </h5>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsEditing(!isEditing);
                    }}
                    className="px-3 py-1 rounded-xl theme-card border theme-border text-xs font-head font-bold theme-text hover:text-red-500 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-3 p-4 rounded-2xl theme-card border border-red-600/40">
                    <div>
                      <label className="block text-[11px] font-head theme-muted uppercase font-bold mb-1">
                        Trainer Name
                      </label>
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl theme-input border theme-border text-sm focus:outline-none focus:border-red-600"
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
                          className="w-full px-3 py-2 rounded-xl theme-input border theme-border text-xs focus:outline-none focus:border-red-600"
                        >
                          {PROFESSIONS.map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-head theme-muted uppercase font-bold mb-1">
                          Home Region
                        </label>
                        <select
                          value={formData.region}
                          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl theme-input border theme-border text-xs focus:outline-none focus:border-red-600"
                        >
                          {REGIONS.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-head theme-muted uppercase font-bold mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="99"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl theme-input border theme-border text-xs focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <button
                      onClick={handleSave}
                      className="w-full py-2.5 rounded-xl btn-primary text-white text-xs font-head font-bold flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                    >
                      <Check className="w-4 h-4" />
                      Save Trainer Card
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl theme-card border theme-border space-y-1">
                      <span className="text-[10px] font-head theme-muted uppercase font-bold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500" />
                        Home Region
                      </span>
                      <p className="font-head text-sm font-bold theme-text">{trainer.region || 'Kalos'}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl theme-card border theme-border space-y-1">
                      <span className="text-[10px] font-head theme-muted uppercase font-bold flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-red-500" />
                        Member Since
                      </span>
                      <p className="font-head text-sm font-bold theme-text">{formattedJoinDate}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl theme-card border theme-border space-y-1">
                      <span className="text-[10px] font-head theme-muted uppercase font-bold flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        Adoptions
                      </span>
                      <p className="font-head text-sm font-bold text-red-500">
                        {(trainer.adoptedPokemons || []).length || trainer.adoptions || 0} Companions
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl theme-card border theme-border space-y-1">
                      <span className="text-[10px] font-head theme-muted uppercase font-bold flex items-center gap-1">
                        <Shield className="w-3 h-3 text-red-500" />
                        Trainer Age
                      </span>
                      <p className="font-head text-sm font-bold theme-text">{trainer.age || 18} Years</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Adopted Pokémon Companions Grid */}
            {activeTab === 'companions' && (
              <div className="space-y-3">
                <h5 className="font-head text-xs uppercase tracking-wider theme-muted font-bold flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  Adopted Pokémon Companions
                </h5>

                {trainer.adoptedPokemons && trainer.adoptedPokemons.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-1">
                    {trainer.adoptedPokemons.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl theme-card border theme-border flex flex-col items-center text-center space-y-1.5 shadow-sm hover:border-red-600/50 transition-all"
                      >
                        <img
                          src={p.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.pokemonId || 25}.png`}
                          alt={p.name}
                          className="w-14 h-14 object-contain"
                        />
                        <span className="font-head text-xs font-bold theme-text capitalize truncate w-full">
                          {p.name}
                        </span>
                        <div className="flex flex-wrap items-center justify-center gap-1">
                          {(p.types || ['Normal']).map(t => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 rounded-md bg-red-600/10 border border-red-600/30 text-red-500 text-[9px] font-head font-bold uppercase"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="font-body text-[9px] theme-muted">
                          {p.adoptedAt ? new Date(p.adoptedAt).toLocaleDateString() : 'Adopted'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl theme-bg border theme-border text-center space-y-3">
                    <Sparkles className="w-8 h-8 text-red-500 mx-auto opacity-60" />
                    <p className="font-head text-xs font-bold theme-text">No adopted companions yet!</p>
                    <p className="font-body text-[11px] theme-muted">
                      Explore the Kalos region marketplace to adopt your first Pokémon companion.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Footer Action */}
            <div className="pt-2 flex items-center justify-between border-t theme-border">
              <button
                onClick={() => {
                  sound.playPop();
                  onClose();
                  logout();
                }}
                className="px-4 py-2.5 rounded-xl bg-red-600/10 border border-red-600/30 hover:bg-red-600/20 text-red-500 text-xs font-head font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>

              <button
                onClick={() => { sound.playClick(); onClose(); }}
                className="px-5 py-2.5 rounded-xl theme-bg border theme-border hover:border-red-600 text-xs font-head font-bold theme-text cursor-pointer"
              >
                Close Pass
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
