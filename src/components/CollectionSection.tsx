import React from 'react';
import { FurnitureProduct } from '../types';
import { ShoppingBag, ArrowUpRight, Sparkles } from 'lucide-react';

interface CollectionSectionProps {
  products: FurnitureProduct[];
  onSelectProduct: (p: FurnitureProduct) => void;
  onQuickAdd: (p: FurnitureProduct) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
}) => {
  return (
    <section id="collection" className="py-24 bg-[#0c0d0e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Signature Architectural Pieces</span>
              <span aria-hidden="true">·</span>
              <span>LIXIE FURNITURES Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Curated Architectural Editions
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-sm">
            Each commission is serialized and individually crafted to order with kiln-stabilized hardwood, low-iron float glass, and marine stainless joints.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-[#111317] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Product Imagery */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs font-medium text-white flex items-center gap-1.5 border border-white/15">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Inspect Finishes & Specs</span>
                  </span>

                  <span className="p-2 rounded-lg bg-black/80 backdrop-blur-md text-white border border-white/15">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mb-2">
                    <span className="uppercase text-amber-400">{product.kicker}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.dimensions.width}x{product.dimensions.depth}mm</span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-xl font-bold text-white tracking-tight cursor-pointer hover:text-amber-300 transition-colors"
                  >
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
                    <span className="text-zinc-300 font-medium">{product.materials.wood.split(' ')[0]} {product.materials.wood.split(' ')[1]}</span>
                    <span aria-hidden="true">/</span>
                    <span className="text-zinc-300 font-medium">{product.materials.glass.split(' ')[0]} Glass</span>
                    <span aria-hidden="true">/</span>
                    <span className="text-zinc-300 font-medium">316 Steel</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-zinc-500 block">Commission Base</span>
                    <span className="text-xl font-bold text-white font-mono tabular-nums">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-zinc-950" />
                    <span>Configure Piece</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
