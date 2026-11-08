import React from 'react';
import { Users, Building, ShieldCheck, MapPin, ArrowRight, Star, Award, ExternalLink } from 'lucide-react';
import { INITIAL_CLIENTS } from '../data/mockClients';

interface ClientsShowcaseSectionProps {
  onOpenClientDossier?: (clientId: string) => void;
  onOpenChat: () => void;
}

export const ClientsShowcaseSection: React.FC<ClientsShowcaseSectionProps> = ({
  onOpenChat,
}) => {
  return (
    <section id="clients-showcase" className="py-24 bg-[#0a0b10] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        {/* Section Header with live metrics */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400">
              <Users className="w-3.5 h-3.5" />
              <span>5,420+ Registered Global Clients</span>
              <span aria-hidden="true">·</span>
              <span>Architecture & Interior Partners</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Specified by Leading Architecture Studios & Curators
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              From private penthouse residences in San Francisco to contemporary salons in Paris, Mayfair, and Tokyo — discover the architects and design practices who trust LIXIE FURNITURES for bespoke commissions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#12131e] border border-purple-500/30 flex items-center gap-6 text-xs font-mono shrink-0 shadow-lg">
            <div>
              <span className="text-zinc-500 text-[10px] block">TOTAL NETWORK</span>
              <span className="text-2xl font-bold text-white">5,420+</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-zinc-500 text-[10px] block">RETENTION RATE</span>
              <span className="text-2xl font-bold text-emerald-400">94.2%</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-zinc-500 text-[10px] block">GLOBAL HUBS</span>
              <span className="text-2xl font-bold text-amber-400">42 Cities</span>
            </div>
          </div>
        </div>

        {/* Featured Partner Studios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_CLIENTS.slice(0, 6).map((client) => (
            <div
              key={client.id}
              className="p-6 rounded-2xl bg-[#0f1019] border border-white/[0.08] hover:border-purple-500/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {client.tier}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{client.city}, {client.country}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-12 h-12 rounded-full object-cover border border-purple-500/30 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-xs text-zinc-400">{client.company}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Lifetime Commissions:</span>
                    <span className="font-mono text-white font-semibold">{client.totalPurchasesCount} Pieces</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Total Valuation:</span>
                    <span className="font-mono text-amber-400 font-semibold">${client.totalSpent.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Partner Since:</span>
                    <span className="font-mono text-zinc-300">{client.joinedDate}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">Verified Architectural Partner</span>
                <button
                  onClick={onOpenChat}
                  className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Inquire Consultation</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Client Testimonials Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#121320] via-[#0d0e17] to-[#121320] border border-white/10 text-center max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <blockquote className="text-base sm:text-lg text-white font-serif italic max-w-2xl mx-auto">
            "The Kronos Trestle and Monolith Credenza established the entire tectonic identity of our Pacific Heights project. Marcus Kern's joinery tolerances and reverse-thread turnbuckles are without equal in modern high-end furniture."
          </blockquote>
          <p className="text-xs font-mono text-zinc-400">
            Julian Vance · Principal at Vance Loft Architects (San Francisco, CA)
          </p>
        </div>
      </div>
    </section>
  );
};
