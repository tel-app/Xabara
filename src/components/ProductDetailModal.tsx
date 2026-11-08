import React, { useState } from 'react';
import { FurnitureProduct, WoodOption, GlassOption, SteelOption } from '../types';
import { WOOD_OPTIONS, GLASS_OPTIONS, STEEL_OPTIONS } from '../data/products';
import { X, ShoppingBag, Check, MessageSquare, Shield, Layers, Sparkles, Compass } from 'lucide-react';

interface ProductDetailModalProps {
  product: FurnitureProduct;
  initialWood?: WoodOption;
  initialGlass?: GlassOption;
  initialSteel?: SteelOption;
  onClose: () => void;
  onAddToCart: (wood: WoodOption, glass: GlassOption, steel: SteelOption, quantity: number) => void;
  onOpenChat: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialWood = WOOD_OPTIONS[0],
  initialGlass = GLASS_OPTIONS[0],
  initialSteel = STEEL_OPTIONS[0],
  onClose,
  onAddToCart,
  onOpenChat,
}) => {
  const [selectedWood, setSelectedWood] = useState<WoodOption>(initialWood);
  const [selectedGlass, setSelectedGlass] = useState<GlassOption>(initialGlass);
  const [selectedSteel, setSelectedSteel] = useState<SteelOption>(initialSteel);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'materials' | 'specs' | 'features'>('materials');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(selectedWood, selectedGlass, selectedSteel, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 2000);
  };

  const galleryImages = (product.images && product.images.length > 0) ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[94vh] rounded-2xl bg-[#0f1114] border border-white/10 shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-black/60 text-zinc-400 hover:text-white hover:bg-white/10 backdrop-blur-md transition-colors"
          aria-label="Close detail modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: High-Resolution Multi-Image Gallery & Tactile Details */}
        <div className="relative w-full lg:w-1/2 min-h-[360px] sm:min-h-[460px] bg-zinc-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
          <div className="relative flex-1 w-full h-full min-h-[340px] overflow-hidden">
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-[1.05] transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

            {/* In-Image Material Swatch Overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/75 backdrop-blur-md rounded-xl border border-white/15 text-xs flex items-center justify-between text-zinc-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: selectedWood.color }} />
                  <span className="truncate max-w-[100px] text-[11px]">{selectedWood.name}</span>
                </div>
                <span className="text-zinc-600">/</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: selectedGlass.color }} />
                  <span className="truncate max-w-[100px] text-[11px]">{selectedGlass.name}</span>
                </div>
                <span className="text-zinc-600">/</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: selectedSteel.color }} />
                  <span className="truncate max-w-[100px] text-[11px]">{selectedSteel.name}</span>
                </div>
              </div>

              <span className="font-mono text-amber-400 text-[11px]">Bespoke Made-to-Order</span>
            </div>
          </div>

          {/* Multiple Images Thumbnail Gallery Bar */}
          {galleryImages.length > 1 && (
            <div className="p-3 bg-black/80 border-t border-white/10 flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] font-mono uppercase text-zinc-400 mr-1 whitespace-nowrap">Angles:</span>
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border transition-all shrink-0 ${
                    activeImage === img
                      ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/20'
                      : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specification & Purchase Module */}
        <div className="w-full lg:w-1/2 flex flex-col h-full max-h-[94vh] overflow-y-auto p-6 sm:p-8 bg-[#111317]">
          {/* Header & Pricing */}
          <div className="pb-5 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5 font-mono">
              <span className="uppercase tracking-widest text-amber-400">{product.kicker}</span>
              <span aria-hidden="true">·</span>
              <span>{product.category} Collection</span>
              <span aria-hidden="true">·</span>
              <span>{product.leadTimeWeeks} Wks Fabrication</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              {product.name}
            </h1>

            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              {product.tagline}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-semibold text-white font-mono tabular-nums">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-xs text-zinc-400">USD / Custom Configured</span>
            </div>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center gap-1 p-1 bg-black/40 rounded-lg border border-white/10 my-5 text-xs">
            <button
              onClick={() => setActiveTab('materials')}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'materials' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Material Finishes
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'specs' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Architectural Specs
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === 'features' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Tectonic Joinery
            </button>
          </div>

          {/* Tab 1: Materials */}
          {activeTab === 'materials' && (
            <div className="space-y-5 flex-1">
              {/* Hardwood */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                    01. Solid Hardwood Species
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{selectedWood.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {WOOD_OPTIONS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWood(w)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedWood.id === w.id
                          ? 'border-amber-400 bg-amber-500/10'
                          : 'border-white/10 hover:border-white/25 bg-black/30'
                      }`}
                    >
                      <div className="w-full h-6 rounded-md mb-2 border border-white/20" style={{ backgroundColor: w.color }} />
                      <p className="text-xs font-medium text-white truncate">{w.name}</p>
                      <p className="text-[10px] text-zinc-400 truncate">{w.subname}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Glass */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                    02. Architectural Glass Formulation
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{selectedGlass.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {GLASS_OPTIONS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGlass(g)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedGlass.id === g.id
                          ? 'border-amber-400 bg-amber-500/10'
                          : 'border-white/10 hover:border-white/25 bg-black/30'
                      }`}
                    >
                      <div className="w-full h-6 rounded-md mb-2 border border-white/30" style={{ backgroundColor: g.color }} />
                      <p className="text-xs font-medium text-white truncate">{g.name}</p>
                      <p className="text-[10px] text-zinc-400 truncate">{g.thickness}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Structural Steel */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                    03. Structural Steel Hardware
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{selectedSteel.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {STEEL_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSteel(s)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedSteel.id === s.id
                          ? 'border-amber-400 bg-amber-500/10'
                          : 'border-white/10 hover:border-white/25 bg-black/30'
                      }`}
                    >
                      <div className="w-full h-6 rounded-md mb-2 border border-white/25" style={{ backgroundColor: s.color }} />
                      <p className="text-xs font-medium text-white truncate">{s.name}</p>
                      <p className="text-[10px] text-zinc-400 truncate">{s.grade}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Specs */}
          {activeTab === 'specs' && (
            <div className="space-y-4 flex-1 text-xs">
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-2.5 font-mono">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Footprint Dimensions</span>
                  <span className="text-zinc-200">
                    {product.dimensions.width}W x {product.dimensions.depth}D x {product.dimensions.height}H mm
                  </span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Net Weight</span>
                  <span className="text-zinc-200">{product.weightKg} kg</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Distributed Load Capacity</span>
                  <span className="text-zinc-200">{product.architecturalDetails.loadRating}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Timber Sourcing</span>
                  <span className="text-zinc-200">{product.architecturalDetails.environmentalFSC}</span>
                </div>
              </div>

              <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-1">
                <span className="font-semibold text-zinc-200 block uppercase tracking-wider text-[11px]">
                  Precision Joinery System
                </span>
                <p className="text-zinc-300 leading-relaxed text-xs">
                  {product.architecturalDetails.joinery}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Features */}
          {activeTab === 'features' && (
            <div className="space-y-3 flex-1">
              <ul className="space-y-2 text-xs text-zinc-300">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/10">
                    <span className="font-mono text-amber-400 shrink-0 mt-0.5">0{idx + 1}.</span>
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-amber-400 shrink-0" />
                <span>10-Year Structural Guarantee on all stainless hardware and kiln-stabilized hardwood members.</span>
              </div>
            </div>
          )}

          {/* Bottom Purchase Bar */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-white/15 rounded-xl bg-black/40 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono font-medium text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                  addedAnimation ? 'bg-emerald-600 text-white' : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      Add Configuration — ${(product.price * quantity).toLocaleString()} USD
                    </span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenChat();
                }}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discuss Custom Sizing with Lead Artisan</span>
              </button>
              <span className="font-mono text-zinc-500">Ref: {product.id.slice(0, 8).toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
