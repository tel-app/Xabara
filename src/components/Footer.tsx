import React from 'react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenAdminPortal }) => {
  return (
    <footer className="py-16 bg-[#090a0c] border-t border-white/10 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <span className="text-xl font-bold tracking-tight text-white font-display">
              Xabara Wood Works
            </span>
            <p className="mt-1 text-zinc-500 max-w-sm text-xs leading-relaxed">
              Architectural Wood, Glass & Steel Furniture Atelier. Handcrafted in Brooklyn & Munich.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-xs font-medium text-zinc-300">
            <button
              onClick={() => onNavigateSection('collection')}
              className="hover:text-white transition-colors"
            >
              Collection
            </button>
            <button
              onClick={() => onNavigateSection('materiality')}
              className="hover:text-white transition-colors"
            >
              Material Science
            </button>
            <button
              onClick={() => onNavigateSection('atelier-story')}
              className="hover:text-white transition-colors"
            >
              Atelier Method
            </button>
            {onOpenAdminPortal && (
              <button
                onClick={onOpenAdminPortal}
                className="text-amber-400/80 hover:text-amber-300 transition-colors font-mono"
              >
                Owner / Admin Portal
              </button>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <p>© {new Date().getFullYear()} Lixie Furnitures Atelier Inc. All architectural designs and joinery rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>FSC-C012345 Certified</span>
            <span>·</span>
            <span>AISI 316 Marine Stainless</span>
            <span>·</span>
            <span>EN 12150 Tempered Glass</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
