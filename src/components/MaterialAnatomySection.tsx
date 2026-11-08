import React, { useState } from 'react';
import { Layers, Shield, Sparkles, Compass } from 'lucide-react';

export const MaterialAnatomySection: React.FC = () => {
  const [activeMaterial, setActiveMaterial] = useState<'wood' | 'glass' | 'steel'>('wood');

  return (
    <section id="materiality" className="py-24 border-t border-white/10 bg-[#0c0e11]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
            <span>Materiality & Tectonic Science</span>
            <span aria-hidden="true">·</span>
            <span>Tri-Material Synthesis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            The Dialogue Between Timber, Glass, and Structural Steel
          </h2>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Our atelier builds exclusively at the intersection of three elemental materials. Each component is engineered to counteract the physical tensions of the others.
          </p>
        </div>

        {/* Interactive Material Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-black/60 rounded-xl border border-white/10 max-w-md mb-8">
          <button
            onClick={() => setActiveMaterial('wood')}
            className={`flex-1 py-2.5 text-xs font-medium rounded-lg transition-all ${
              activeMaterial === 'wood'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            01. Solid Timber
          </button>
          <button
            onClick={() => setActiveMaterial('glass')}
            className={`flex-1 py-2.5 text-xs font-medium rounded-lg transition-all ${
              activeMaterial === 'glass'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            02. Architectural Glass
          </button>
          <button
            onClick={() => setActiveMaterial('steel')}
            className={`flex-1 py-2.5 text-xs font-medium rounded-lg transition-all ${
              activeMaterial === 'steel'
                ? 'bg-zinc-700 text-white border border-white/30 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            03. Marine 316 Steel
          </button>
        </div>

        {/* Active Material Deep-Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {activeMaterial === 'wood' && (
            <>
              <div className="lg:col-span-7 p-8 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                    <span>Compressive Strength: 52 MPa</span>
                    <span>·</span>
                    <span>Moisture Content: 8% Kiln-Stabilized</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Appalachian Walnut & Spessart Oak</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Timber provides warmth, acoustic dampening, and flexural compliance. We harvest only mature, sustainably managed trees with tight vertical growth rings. Kiln-dried over 90 days to prevent warping under climatic swings, each slab is hand-finished with non-toxic botanical wax that breathes with the living wood.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Joinery</span>
                    <span className="text-white font-medium">Mortise & Tenon Steel-Pinned</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Certification</span>
                    <span className="text-emerald-400 font-medium">100% FSC Forest Verified</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Tactile Feel</span>
                    <span className="text-white font-medium">Ultra-Matte Velvet Oil</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 rounded-2xl bg-gradient-to-br from-amber-950/30 to-black/60 border border-amber-500/20 flex flex-col justify-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-white">Grain Continuity Engineering</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Every adjacent trestle limb and drawer face is cut sequentially from a single continuous timber log, ensuring waterfall grain match across all bevels and joints.
                </p>
              </div>
            </>
          )}

          {activeMaterial === 'glass' && (
            <>
              <div className="lg:col-span-7 p-8 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                    <span>Thickness: Up to 19mm Solid</span>
                    <span>·</span>
                    <span>Surface Stress: 120 MPa Tempered</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Low-Iron Smoked & Reeded Glass</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Glass delivers visual levitation and architectural clarity. By eliminating iron oxides, our glass achieves true neutral transparency without the sickly greenish tint common in commercial furniture. Thermally tempered to withstand heavy point loads, with 45° chamfered diamond-polished edges that invite the hand.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Impact Rating</span>
                    <span className="text-white font-medium">EN 12150 Safety Spec</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Edge Profile</span>
                    <span className="text-sky-300 font-medium">45° Chamfered & Felt-Buffed</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Acoustics</span>
                    <span className="text-white font-medium">Silicone Isolator Decoupled</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 rounded-2xl bg-gradient-to-br from-sky-950/30 to-black/60 border border-sky-500/20 flex flex-col justify-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-white">Optical Refraction Control</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Our bronze and grey tints are mineral-infused through the molten melt rather than coated with film, providing permanent solar tone and scratch-proof integrity for generations.
                </p>
              </div>
            </>
          )}

          {activeMaterial === 'steel' && (
            <>
              <div className="lg:col-span-7 p-8 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                    <span>Grade: AISI 316 Marine Stainless</span>
                    <span>·</span>
                    <span>Tensile Yield: 290 MPa</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Structural Stainless & Gunmetal Steel</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Steel is the skeleton of our architecture. We specify marine-grade 316 austenitic stainless steel with molybdenum addition to resist atmospheric oxidation in coastal penthouses. Hand-brushed with directional 240-grit linear abrasives, or chemically cold-blackened for an architectural slate-oxide patina.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Tension Hardware</span>
                    <span className="text-white font-medium">CNC Reverse-Thread Turnbuckles</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Weld Purity</span>
                    <span className="text-zinc-300 font-medium">TIG Argon Purge Seamless</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Corrosion Rating</span>
                    <span className="text-emerald-400 font-medium">Zero-Corrosion 50-Year Guarantee</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 rounded-2xl bg-gradient-to-br from-zinc-800/40 to-black/60 border border-white/20 flex flex-col justify-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-white">Suspension Bridge Physics</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Just as suspension bridges rely on opposing tension cables, our turnbuckles triangulate wood compression with steel tensile forces, allowing 2.6-meter spans without center sagging.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
