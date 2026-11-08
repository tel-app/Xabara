import React from 'react';
import { Compass, Hammer, ShieldCheck, Sparkles, Award, Trees, Cpu, CheckCircle } from 'lucide-react';

interface AboutUsSectionProps {
  onExploreCollection: () => void;
  onOpenChat: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  onExploreCollection,
  onOpenChat,
}) => {
  return (
    <section id="about-us" className="py-24 bg-[#08090d] border-t border-white/[0.08] relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-900/10 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-20">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <span>Our Ethos & Origin</span>
            <span aria-hidden="true">·</span>
            <span>LIXIE FURNITURES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display leading-[1.1]">
            Engineering Gravitational Equilibrium in Timber, Glass & Steel
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Founded in 2018 by architect and master furniture maker <strong>Marcus Kern</strong>, LIXIE FURNITURES was born from an uncompromising thesis: that contemporary furniture should not disguise its mechanical joinery, but celebrate tectonic balance as sculptural art.
          </p>
        </div>

        {/* 3 Pillars of Lixie Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 rounded-2xl bg-[#0e1017] border border-white/[0.08] space-y-4 group hover:border-amber-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Living Appalachian Timber</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We exclusively commission sustainably harvested American Black Walnut and European Spessart Oak. Each timber slab is kiln-stabilized over 18 weeks to 7% core equilibrium moisture content, eliminating seasonal warping.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#0e1017] border border-white/[0.08] space-y-4 group hover:border-sky-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">19mm Low-Iron Optical Glass</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our glass panels undergo precision thermal tempering and 45° diamond-wheel edge chamfering. With zero green edge tint, light transmits unhindered, creating the optical illusion of timber elements suspended mid-air.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#0e1017] border border-white/[0.08] space-y-4 group hover:border-purple-400/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Marine 316 CNC Hardware</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Reverse-threaded turnbuckles and pin-joints are machined from solid marine-grade 316 stainless steel billets to 0.05mm tolerances. These active tensile members allow sub-millimeter leveling across uneven gallery floors.
            </p>
          </div>
        </div>

        {/* The Master Makers & Workshop Protocol */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0d14] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-amber-400/10 text-amber-300 border border-amber-400/20">
              Atelier Standards & Protocol
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Hand-Finished Permeance Built for Multi-Generational Longevity
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Every LIXIE FURNITURES commission is stamped with a unique atelier serial number and signed by the presiding craftsman. We reject fast-curing polyurethane lacquers in favor of four coats of hand-rubbed organic hardwax oils derived from carnauba and thistle.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-[10px] block">TOLERANCE</span>
                <span className="text-white font-bold">±0.05 mm</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-[10px] block">TIMBER AGING</span>
                <span className="text-white font-bold">18 Wks Kiln</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 text-[10px] block">WARRANTY</span>
                <span className="text-amber-400 font-bold">50-Year Structural</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onExploreCollection}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-colors shadow-lg shadow-white/10"
              >
                Explore Curated Collection
              </button>
              <button
                onClick={onOpenChat}
                className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white font-medium text-xs transition-colors"
              >
                Consult Marcus Kern (Owner)
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl">
              <img
                src="/src/assets/images/hero_arch_furniture_1791740462910.jpg"
                alt="Lixie Furnitures Atelier Workshop"
                className="w-full h-full object-cover filter contrast-[1.08]"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 p-4 rounded-xl bg-black/90 backdrop-blur-md border border-white/20 text-xs max-w-xs shadow-xl hidden sm:block">
              <p className="font-semibold text-white">Lixie Furnitures Main Atelier</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Where Scandinavian woodcraft meets precision Swiss structural mechanics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
