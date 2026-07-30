/**
 * PokemonCardSkeleton.jsx
 * Shimmer loading placeholder shown while PokeAPI data is in flight.
 */
import React from 'react';
import { motion } from 'framer-motion';

function Bone({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-white/5 ${className}`}>
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent"
        animate={{ translateX: ['−100%', '200%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.2 }}
      />
    </div>
  );
}

export default function PokemonCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Image area */}
      <Bone className="h-44 rounded-none" />
      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="space-y-1.5">
          <Bone className="h-4 w-2/3" />
          <Bone className="h-3 w-1/2" />
        </div>
        <div className="flex gap-2">
          <Bone className="h-5 w-16 rounded-full" />
          <Bone className="h-5 w-14 rounded-full" />
        </div>
        <div className="space-y-1.5 py-2 border-t border-b border-white/6">
          <Bone className="h-2.5" />
          <Bone className="h-2.5" />
          <Bone className="h-2.5 w-4/5" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <Bone className="h-5 w-24" />
          <Bone className="h-9 w-20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
