import React from 'react';
import { ArrowRight, Shield, Sparkles, Layers } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onExploreMateriality: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onExploreMateriality,
}) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden bg-[#0c0d0e]">
      {/* Background Architectural Canvas */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Lixie Furnitures architectural interior featuring walnut, glass, and steel"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.08]"
        />
        {/* Measured Scrim for WCAG AA compliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/60 to-black/40" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 sm:pt-28 pb-16 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Natural human editorial kicker */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-300">
            <span>LIXIE FURNITURES</span>
            <span aria-hidden="true">·</span>
            <span>Architectural Wood, Glass & Steel Atelier</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.08]"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Tectonic Purity in Timber, Glass, and Structural Steel
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
            Bespoke furnishings crafted through opposing physical forces: the organic compression of solid American hardwood, the optical levitation of 19mm tempered glass, and the tensile permanence of marine-grade 316 stainless steel.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreCollection}
              className="px-6 py-3.5 rounded-xl font-medium text-sm text-zinc-950 bg-white hover:bg-zinc-200 transition-colors flex items-center gap-2.5 shadow-xl"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreMateriality}
              className="px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-black/60 hover:bg-black/80 border border-white/20 backdrop-blur-md transition-colors flex items-center gap-2.5"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Material Science & Provenance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Proof Strip */}
      <div className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-zinc-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">100% Certified Sustainable Timber</p>
              <p className="text-zinc-400 text-[11px]">Kiln-dried Appalachian Black Walnut & Spessart Oak</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">19mm Low-Iron Architectural Glass</p>
              <p className="text-zinc-400 text-[11px]">Thermal tempered with 45° chamfered polished edges</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Marine-Grade 316 Stainless Hardware</p>
              <p className="text-zinc-400 text-[11px]">Precision CNC reverse-thread tension turnbuckles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
