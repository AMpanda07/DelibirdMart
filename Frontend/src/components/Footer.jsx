/**
 * Footer.jsx
 * High-visibility theme-aware footer.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { AtSign, Code2, Mail, MapPin, Heart } from 'lucide-react';
import PokeBallLogo from './PokeBallLogo';

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
    { label: 'Trainer Pass',  href: '#' },
    { label: 'My Adoptions',  href: '#' },
  ],
  Company: [
    { label: 'About Us',       href: '/about' },
    { label: 'Safety Policy',  href: '#' },
    { label: 'Pokémon Welfare', href: '#' },
    { label: 'Contact',        href: '/about' },
  ],
};

const ROADMAP = [
  { phase: 'Phase 1', label: 'Lumiose Launch',    done: true  },
  { phase: 'Phase 2', label: 'Kalos Expansion',   done: true },
  { phase: 'Phase 3', label: 'Multi-Region Trade', done: false },
  { phase: 'Phase 4', label: 'Pokémon Contests',  done: false },
];

const SOCIALS = [
  { icon: AtSign, label: 'Twitter',   href: 'https://x.com/errorgeko' },
  { icon: Code2,  label: 'GitHub',    href: 'https://github.com/AMpanda07' },
  { icon: Mail,   label: 'Instagram', href: 'https://www.instagram.com/curiodynam' },
];

export default function Footer() {
  return (
    <footer className="relative theme-bg border-t theme-border overflow-hidden theme-text">
      {/* Red ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-red-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top strip ─── */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand col */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <PokeBallLogo className="w-10 h-10" />
              <div>
                <div className="font-head text-xl font-black theme-text tracking-tight">
                  Delibird <span className="text-red-600">Mart</span>
                </div>
                <div className="font-body text-xs text-red-500 font-bold tracking-widest uppercase">
                  LUMIOSE CITY · KALOS REGION
                </div>
              </div>
            </div>

            <p className="font-body text-sm theme-muted leading-relaxed max-w-xs">
              The Kalos Region's most trusted Pokémon adoption marketplace.
              Every Pokémon listed is health-checked and verified by licensed trainers.
            </p>

            <div className="flex items-center gap-1.5 text-xs theme-muted font-body">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Prism Tower, Lumiose City, Kalos</span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl theme-card border theme-border flex items-center justify-center theme-muted hover:theme-text hover:border-red-600 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group} className="space-y-4">
              <h4 className="font-head text-xs font-bold theme-text uppercase tracking-widest">{group}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body text-sm theme-muted hover:text-red-500 transition-colors duration-200 inline-block"
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
        <div className="py-6 border-t theme-border space-y-4">
          <div className="font-head text-xs font-bold theme-muted uppercase tracking-widest">Platform Roadmap</div>
          <div className="flex flex-wrap gap-3">
            {ROADMAP.map(({ phase, label, done }) => (
              <div
                key={phase}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-body border ${
                  done
                    ? 'bg-red-600/15 border-red-600/40 text-red-500'
                    : 'theme-card border theme-border theme-muted'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${done ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
                <span className="font-bold">{phase}:</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom copyright bar ─── */}
        <div className="py-6 border-t theme-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs theme-muted">
            © {new Date().getFullYear()} Delibird Mart. CWAN & ErrorGeko. All Pokémon trademarks belong to Nintendo / Game Freak.
          </p>
          <div className="flex items-center gap-1.5 font-body text-xs theme-muted">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            <span>in Lumiose City</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
