import React from 'react';
import { Compass, Hammer, ShieldCheck, Truck } from 'lucide-react';

export const AtelierStorySection: React.FC = () => {
  return (
    <section id="atelier-story" className="py-24 bg-[#0a0c0e] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <span>03. The Atelier Method</span>
              <span aria-hidden="true">·</span>
              <span>Joinery & Tension</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Built Once. Engineered for Multi-Generational Permanence.
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Most furniture relies on cheap mechanical brackets concealed beneath thin veneers. LIXIE FURNITURES rejects concealment. Our structural joints are exposed as the primary architectural ornamentation.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Every timber member is kiln-dried down to 8% internal moisture content, stabilizing the cell structure against warp and shrinkage. Stainless steel turnbuckles are machined on 5-axis Swiss lathes from marine-grade 316 bar stock, then threaded with reverse pitch so tension can be calibrated by turning a single barrel by hand.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10 text-xs">
              <div>
                <p className="font-mono text-2xl font-bold text-white tabular-nums">4–6</p>
                <p className="text-zinc-400 mt-1">Weeks bespoke fabrication time per commission</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-white tabular-nums">10 Yrs</p>
                <p className="text-zinc-400 mt-1">Comprehensive structural warranty on joints & frame</p>
              </div>
            </div>
          </div>

          {/* Right Column: Workshop Protocol Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Hammer className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">01. Timber Selection</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Single-flitch logs matched for grain orientation, preventing asymmetric seasonal movement across changing room humidity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">02. CNC Tensile Machining</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tension barrels turned with ±0.02mm aerospace tolerances to ensure frictionless thread engagement under heavy static loads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">03. Optical Float Glass</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Low-iron float formulation baked at 650°C and rapidly chilled with high-pressure air for 4x tensile surface compression.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">04. White-Glove Crate</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Padded architectural timber crating delivered by two master specialists with laser level verification inside your residence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
