import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShieldCheck, Box, Plus, Minus } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
  onSelectProduct: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const whiteGloveShipping = subtotal > 5000 ? 0 : 350;
  const estimatedTax = subtotal * 0.0825;
  const grandTotal = subtotal + whiteGloveShipping + estimatedTax;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md h-full bg-[#101215] border-l border-white/10 shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight">Atelier Shopping Bag</h2>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
              <span>{items.reduce((s, i) => s + i.quantity, 0)} Items Selected</span>
              <span aria-hidden="true">·</span>
              <span>Made to Order</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-zinc-400">
              <Box className="w-12 h-12 stroke-[1.2] text-zinc-600 mb-3" />
              <p className="text-sm font-medium text-zinc-300">Your bespoke cart is empty</p>
              <p className="text-xs text-zinc-500 max-w-xs mt-1 mb-6">
                Explore our signature architectural collection of solid wood, smoked glass, and structural steel pieces.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-3 group hover:border-white/20 transition-all"
              >
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      onSelectProduct(item.product.id);
                      onClose();
                    }}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0 cursor-pointer"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          onClick={() => {
                            onSelectProduct(item.product.id);
                            onClose();
                          }}
                          className="text-sm font-semibold text-white truncate cursor-pointer hover:text-amber-400 transition-colors"
                        >
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-zinc-500 hover:text-red-400 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Clean Unboxed Material Metadata */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400 mt-1">
                        <span>{item.wood.name}</span>
                        <span aria-hidden="true">/</span>
                        <span>{item.glass.name}</span>
                        <span aria-hidden="true">/</span>
                        <span>{item.steel.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-white/15 rounded-lg bg-black/60">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-medium text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-mono font-medium text-white tabular-nums">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0d0f12] space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-mono text-white tabular-nums">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>White-Glove Crated Freight</span>
                <span className="font-mono text-emerald-400">
                  {whiteGloveShipping === 0 ? 'Complimentary' : `$${whiteGloveShipping}`}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Architectural Sales Tax (8.25%)</span>
                <span className="font-mono text-white tabular-nums">${Math.round(estimatedTax).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-semibold text-white">
                <span>Total Amount Due</span>
                <span className="font-mono tabular-nums text-base">${Math.round(grandTotal).toLocaleString()}</span>
              </div>
            </div>

            <div className="p-2.5 bg-zinc-900 rounded-lg border border-white/10 flex items-center gap-2 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Complimentary insured shipping & placement in your room of choice.</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 px-6 rounded-xl font-medium text-sm text-zinc-950 bg-white hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
