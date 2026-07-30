import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, ExternalLink, Code2, Globe, Heart, Award, Terminal } from 'lucide-react';
import PokeBallLogo from '../components/PokeBallLogo';
import { sound } from '../utils/audio';

const CREATOR = {
  name: 'Ayushman Panda',
  handle: 'ErrorGeko',
  role: 'Founder & Full-Stack Architect',
  company: 'CWAN',
  avatar: '/avatar.png',
  bio: 'Passionate software engineer and creator of Delibird Mart. Building high-performance, futuristic web experiences with modern full-stack architectures.',
  socials: [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/curiodynam',
      handle: '@curiodynam',
      color: 'from-pink-600 to-rose-600',
      icon: Globe
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/errorgeko',
      handle: '@errorgeko',
      color: 'from-slate-800 to-slate-900',
      icon: Terminal
    },
    {
      name: 'GitHub',
      url: 'https://github.com/AMpanda07',
      handle: 'AMpanda07',
      color: 'from-red-600 to-rose-700',
      icon: Code2
    }
  ]
};

const TECH_STACK = [
  { name: 'React 19', desc: 'Modern UI Components' },
  { name: 'Vite', desc: 'Lightning Fast Build System' },
  { name: 'Tailwind CSS', desc: 'Custom Red & Obsidian Design System' },
  { name: 'Node.js & Express', desc: 'RESTful API Server' },
  { name: 'MongoDB Atlas', desc: 'Cloud Database Storage' },
  { name: 'JWT & bcrypt', desc: 'Native Password Security' },
];

export default function About() {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-lumiose theme-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── Page Header ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-xs font-head font-bold text-red-500"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            Lumiose Sanctuary Project · CWAN Ecosystem
          </motion.div>

          <h1 className="font-head text-4xl sm:text-5xl font-black tracking-tight theme-text">
            About <span className="gradient-text-red">Delibird Mart</span>
          </h1>
          <p className="font-body theme-muted text-base sm:text-lg leading-relaxed">
            A next-generation Pokémon adoption platform built by <strong className="theme-text">CWAN</strong> and architected by <strong className="text-red-500">ErrorGeko (Ayushman Panda)</strong>. Dedicated to connecting Pokémon trainers across the Kalos region with health-certified, verified companions.
          </p>
        </div>

        {/* ── Creator Profile Card (Pixel Art Avatar & Social Links) ── */}
        <section className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pokemon-card-container rounded-3xl p-8 sm:p-10 border-2 border-red-600/40 relative overflow-hidden shadow-[0_0_60px_rgba(238,21,21,0.2)]"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">

              {/* Pixel Art Avatar Box */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-red-600 to-rose-600 blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-36 h-36 rounded-3xl p-1 theme-bg border-2 border-red-600 overflow-hidden shadow-2xl flex items-center justify-center">
                    <img
                      src={CREATOR.avatar}
                      alt={CREATOR.name}
                      className="w-full h-full object-contain image-rendering-pixelated group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-red-600 text-white font-head text-[10px] font-extrabold uppercase shadow-lg flex items-center gap-1">
                    <Award className="w-3 h-3" /> Creator
                  </span>
                </div>

                <div>
                  <h3 className="font-head text-xl font-black theme-text">{CREATOR.name}</h3>
                  <p className="font-head text-xs font-bold text-red-500">@{CREATOR.handle}</p>
                </div>
              </div>

              {/* Creator Bio & Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl theme-card border theme-border text-xs font-head font-bold theme-text">
                    <Globe className="w-3.5 h-3.5 text-red-500" />
                    <span>Company: <strong className="text-red-500">{CREATOR.company}</strong></span>
                  </div>
                  <h2 className="font-head text-2xl font-bold theme-text tracking-wide">
                    {CREATOR.role}
                  </h2>
                  <p className="font-body text-sm theme-muted leading-relaxed">
                    {CREATOR.bio}
                  </p>
                </div>

                {/* Social Channels List */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-head text-xs font-bold theme-muted uppercase tracking-widest">
                    Official Contact Channels
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CREATOR.socials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playPop()}
                          className="flex items-center justify-between p-3 rounded-2xl theme-card border theme-border hover:border-red-600 transition-all duration-300 group cursor-pointer shadow-md hover:translate-y-[-2px]"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`p-2 rounded-xl bg-gradient-to-br ${social.color} text-white shadow-md`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-head text-xs font-bold theme-text block group-hover:text-red-500 transition-colors">
                                {social.name}
                              </span>
                              <span className="font-body text-[10px] theme-muted truncate block">
                                {social.handle}
                              </span>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 theme-muted group-hover:text-red-500 transition-colors shrink-0 ml-1" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* ── Company Mission & Architecture ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="pokemon-card-container rounded-3xl p-7 border theme-border space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500">
              <PokeBallLogo className="w-8 h-8" />
            </div>
            <h3 className="font-head text-xl font-bold theme-text">CWAN Mission Statement</h3>
            <p className="font-body text-sm theme-muted leading-relaxed">
              CWAN strives to deliver innovative, high-impact web and application ecosystems. Delibird Mart showcases an editorial Pokémon experience, combining Web Audio interaction, real-time database persistence, and a custom Red & Obsidian design system.
            </p>
          </div>

          <div className="pokemon-card-container rounded-3xl p-7 border theme-border space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-head text-xl font-bold theme-text">Verified Companion Welfare</h3>
            <p className="font-body text-sm theme-muted leading-relaxed">
              Every Pokémon listed in our Lumiose Sanctuary undergoes mandatory health evaluations by certified Poké-Vets. Trainers are issued official holographic Trainer Pass Cards linked to MongoDB Atlas.
            </p>
          </div>
        </section>

        {/* ── Tech Stack Grid ── */}
        <section className="max-w-5xl mx-auto space-y-6">
          <div className="text-center">
            <h3 className="font-head text-2xl font-bold theme-text">Architecture & Technology</h3>
            <p className="font-body text-xs theme-muted mt-1">Built with modern web standards and high performance tooling</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded-2xl theme-card border theme-border flex flex-col justify-between hover:border-red-600 transition-colors"
              >
                <div className="font-head text-sm font-bold theme-text flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  {tech.name}
                </div>
                <div className="font-body text-xs theme-muted mt-1">{tech.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer Quote ── */}
        <div className="text-center pt-8 border-t theme-border">
          <p className="font-body text-xs theme-muted flex items-center justify-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            <span>by ErrorGeko (Ayushman Panda) · CWAN © {new Date().getFullYear()}</span>
          </p>
        </div>

      </div>
    </main>
  );
}
