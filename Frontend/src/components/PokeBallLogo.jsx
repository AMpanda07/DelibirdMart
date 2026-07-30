import React from 'react';

/**
 * PokeBallLogo.jsx
 * High-definition vector Poké Ball + Delibird logo emblem in official Pokémon Red, Black & White.
 */
export default function PokeBallLogo({ className = "w-10 h-10", animated = true }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 group ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full drop-shadow-[0_4px_16px_rgba(238,21,21,0.5)] ${
          animated ? 'group-hover:rotate-12 transition-transform duration-300' : ''
        }`}
      >
        <defs>
          {/* Poké Red Top Gradient */}
          <linearGradient id="pokeRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1E1E" />
            <stop offset="60%" stopColor="#EE1515" />
            <stop offset="100%" stopColor="#B30000" />
          </linearGradient>

          {/* Bottom White Shell Gradient */}
          <linearGradient id="pokeWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Outer Ring Glow */}
          <radialGradient id="buttonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#EE1515" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Black Border Circle */}
        <circle cx="50" cy="50" r="48" fill="#0B0B0E" stroke="#EE1515" strokeWidth="2.5" />

        {/* Top Half Red Shell */}
        <path
          d="M 6.5 46 A 44 44 0 0 1 93.5 46 Z"
          fill="url(#pokeRedGrad)"
        />

        {/* Top Shell Gloss Reflection */}
        <path
          d="M 20 25 A 40 40 0 0 1 80 25 A 44 44 0 0 0 20 25 Z"
          fill="#FFFFFF"
          opacity="0.25"
        />

        {/* Bottom Half White Shell */}
        <path
          d="M 6.5 54 A 44 44 0 0 0 93.5 54 Z"
          fill="url(#pokeWhiteGrad)"
        />

        {/* Black Center Dividing Band */}
        <rect x="2" y="45" width="96" height="10" fill="#0B0B0E" />

        {/* Outer Center Ring */}
        <circle cx="50" cy="50" r="16" fill="#0B0B0E" stroke="#FFFFFF" strokeWidth="2" />

        {/* Inner Button */}
        <circle cx="50" cy="50" r="10" fill="url(#pokeWhiteGrad)" />
        <circle cx="50" cy="50" r="6" fill="#0B0B0E" />
        <circle cx="50" cy="50" r="4" fill="#EE1515" />
      </svg>
    </div>
  );
}
