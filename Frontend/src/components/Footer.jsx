/**
 * Footer.jsx
 * Dark, full-width footer with quick links, social icons,
 * region map context, and Phase 2 roadmap preview.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AtSign, Code2, Mail, MapPin, Shield, Zap, Heart } from 'lucide-react';

const LINKS = {
  Marketplace: [
    { label: 'All Pokémon', href: '/marketplace' },
    { label: 'By Type',     href: '/marketplace?filter=type' },
    { label: 'By Rarity',   href: '/marketplace?filter=rarity' },
    { label: 'New Arrivals', href: '/marketplace?sort=newest' },
  ],
  Trainers: [
    { label: 'Sign In',       href: '#' },
    { label: 'Create Account', href: '#' },
    { label: 'Trainer Card',  href: '#' },
    { label: 'My Adoptions',  href: '#' },
  ],
  Company: [
    { label: 'About Us',       href: '/about' },
    { label: 'Safety Policy',  href: '#' },
    { label: 'Pokémon Welfare', href: '#' },
    { label: 'Contact',        href: '#' },
  ],
};

const ROADMAP = [
  { phase: 'Phase 1', label: 'Lumiose Launch',    done: true  },
  { phase: 'Phase 2', label: 'Kalos Expansion',   done: false },
  { phase: 'Phase 3', label: 'Multi-Region Trade', done: false },
  { phase: 'Phase 4', label: 'Pokémon Contests',  done: false },
];

const SOCIALS = [
  { icon: AtSign, label: 'Twitter', href: '#' },
  { icon: Code2,  label: 'GitHub',  href: '#' },
  { icon: Mail,   label: 'Email',   href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#040D1A] border-t border-white/6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top strip ─── */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand col */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-xl">🐦</span>
              </div>
              <div>
                <div className="font-head text-lg font-black text-white">Delibird Mart</div>
                <div className="font-body text-xs text-blue-400/70 tracking-widest">LUMIOSE CITY · KALOS</div>
              </div>
            </div>

            <p className="font-body text-sm text-white/45 leading-relaxed max-w-xs">
              The Kalos Region's most trusted Pokémon adoption marketplace.
              Every Pokémon listed is health-checked and verified by licensed trainers.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-white/40 font-body">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Prism Tower, Lumiose City, Kalos</span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white hover:border-blue-500/50 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group} className="space-y-4">
              <h4 className="font-head text-xs font-bold text-white/70 uppercase tracking-widest">{group}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-white/40 hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Roadmap strip ─── */}
        <div className="py-6 border-t border-white/6 space-y-4">
          <div className="font-head text-xs font-bold text-white/40 uppercase tracking-widest">Platform Roadmap</div>
          <div className="flex flex-wrap gap-3">
            {ROADMAP.map(({ phase, label, done }) => (
              <div
                key={phase}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-body border ${
                  done
                    ? 'bg-blue-500/15 border-blue-500/35 text-blue-300'
                    : 'bg-white/4 border-white/8 text-white/30'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${done ? 'bg-blue-400' : 'bg-white/20'}`} />
                <span className="font-semibold">{phase}:</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom copyright bar ─── */}
        <div className="py-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/25">
            © {new Date().getFullYear()} Delibird Mart. Pokémon and related names are trademarks of Nintendo / Game Freak.
          </p>
          <div className="flex items-center gap-1.5 font-body text-xs text-white/25">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            <span>in Lumiose City</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
