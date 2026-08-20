import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * PokeBallLogo.jsx
 * Dynamic Poké Ball emblem matching the selected color theme:
 *   - Red 🔴: Classic Poké Ball
 *   - Cyan / Blue 🔵: Great Ball
 *   - Green / Emerald 🟢: Dusk Ball
 *   - Purple 🟣: Master Ball
 *   - Yellow 🟡: Ultra Ball
 */
export default function PokeBallLogo({ className = "w-10 h-10", animated = true, forceScheme = null }) {
  let activeScheme = 'red';
  try {
    const themeCtx = useTheme();
    if (themeCtx?.colorScheme) activeScheme = themeCtx.colorScheme;
  } catch (e) {
    activeScheme = 'red';
  }
  const scheme = forceScheme || activeScheme || 'red';

  // Config mapping for each Poké Ball type
  const BALL_CONFIGS = {
    red: {
      name: 'Poké Ball',
      primaryColor: '#EE1515',
      topGradStart: '#FF2E2E',
      topGradEnd: '#B30000',
      bottomGradStart: '#FFFFFF',
      bottomGradEnd: '#CBD5E1',
      strokeColor: '#EE1515',
      glow: 'rgba(238, 21, 21, 0.6)',
      coreButton: '#EE1515',
      accentElements: null
    },
    cyan: {
      name: 'Great Ball',
      primaryColor: '#06B6D4',
      topGradStart: '#0284C7',
      topGradEnd: '#0369A1',
      bottomGradStart: '#FFFFFF',
      bottomGradEnd: '#CBD5E1',
      strokeColor: '#06B6D4',
      glow: 'rgba(6, 182, 212, 0.6)',
      coreButton: '#06B6D4',
      // Red stripes characteristic of Great Ball
      accentElements: (
        <>
          <path d="M 22 18 L 36 28 L 28 36 Z" fill="#EF4444" />
          <path d="M 78 18 L 64 28 L 72 36 Z" fill="#EF4444" />
        </>
      )
    },
    emerald: {
      name: 'Dusk Ball',
      primaryColor: '#10B981',
      topGradStart: '#065F46',
      topGradEnd: '#022C22',
      bottomGradStart: '#111827',
      bottomGradEnd: '#0F172A',
      strokeColor: '#10B981',
      glow: 'rgba(16, 185, 129, 0.6)',
      coreButton: '#10B981',
      // Orange 'X' cross markings characteristic of Dusk Ball
      accentElements: (
        <>
          <path d="M 30 14 L 38 14 L 28 34 L 20 34 Z" fill="#F97316" />
          <path d="M 70 14 L 62 14 L 72 34 L 80 34 Z" fill="#F97316" />
        </>
      )
    },
    purple: {
      name: 'Master Ball',
      primaryColor: '#A855F7',
      topGradStart: '#7E22CE',
      topGradEnd: '#4C1D95',
      bottomGradStart: '#FFFFFF',
      bottomGradEnd: '#CBD5E1',
      strokeColor: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.6)',
      coreButton: '#A855F7',
      // Pink bumps + 'M' characteristic of Master Ball
      accentElements: (
        <>
          <circle cx="28" cy="24" r="8" fill="#EC4899" />
          <circle cx="72" cy="24" r="8" fill="#EC4899" />
          <text x="50" y="32" fontSize="16" fontWeight="bold" fontFamily="monospace" fill="#FFFFFF" textAnchor="middle">M</text>
        </>
      )
    },
    yellow: {
      name: 'Ultra Ball',
      primaryColor: '#EAB308',
      topGradStart: '#18181B',
      topGradEnd: '#09090B',
      bottomGradStart: '#FFFFFF',
      bottomGradEnd: '#CBD5E1',
      strokeColor: '#EAB308',
      glow: 'rgba(234, 179, 8, 0.6)',
      coreButton: '#EAB308',
      // Gold 'H' pattern stripes characteristic of Ultra Ball
      accentElements: (
        <>
          <path d="M 24 10 L 34 10 L 44 44 L 34 44 Z" fill="#EAB308" />
          <path d="M 76 10 L 66 10 L 56 44 L 66 44 Z" fill="#EAB308" />
        </>
      )
    }
  };

  const ball = BALL_CONFIGS[scheme] || BALL_CONFIGS.red;

  return (
    <div className={`relative flex items-center justify-center shrink-0 group ${className}`} title={`${ball.name} Logo`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full ${
          animated ? 'group-hover:rotate-12 transition-transform duration-300' : ''
        }`}
        style={{ filter: `drop-shadow(0 4px 16px ${ball.glow})` }}
      >
        <defs>
          <linearGradient id={`ballTopGrad-${scheme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ball.topGradStart} />
            <stop offset="100%" stopColor={ball.topGradEnd} />
          </linearGradient>

          <linearGradient id={`ballBottomGrad-${scheme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ball.bottomGradStart} />
            <stop offset="100%" stopColor={ball.bottomGradEnd} />
          </linearGradient>
        </defs>

        {/* Outer Border Circle */}
        <circle cx="50" cy="50" r="48" fill="#0B0B0E" stroke={ball.strokeColor} strokeWidth="2.5" />

        {/* Top Half Shell */}
        <path d="M 6.5 46 A 44 44 0 0 1 93.5 46 Z" fill={`url(#ballTopGrad-${scheme})`} />

        {/* Ball Specific Accent Markings */}
        {ball.accentElements}

        {/* Top Shell Gloss Reflection */}
        <path d="M 20 25 A 40 40 0 0 1 80 25 A 44 44 0 0 0 20 25 Z" fill="#FFFFFF" opacity="0.22" />

        {/* Bottom Half Shell */}
        <path d="M 6.5 54 A 44 44 0 0 0 93.5 54 Z" fill={`url(#ballBottomGrad-${scheme})`} />

        {/* Center Dividing Band */}
        <rect x="2" y="45" width="96" height="10" fill="#0B0B0E" />

        {/* Outer Center Ring */}
        <circle cx="50" cy="50" r="16" fill="#0B0B0E" stroke="#FFFFFF" strokeWidth="2" />

        {/* Inner Button */}
        <circle cx="50" cy="50" r="10" fill={`url(#ballBottomGrad-${scheme})`} />
        <circle cx="50" cy="50" r="6" fill="#0B0B0E" />
        <circle cx="50" cy="50" r="4" fill={ball.coreButton} />
      </svg>
    </div>
  );
}
