import React, { useState, useEffect } from 'react';
import { FurnitureProduct, WoodOption, GlassOption, SteelOption, CartItem, CommissionOrder } from './types';
import { FURNITURE_PRODUCTS, WOOD_OPTIONS, GLASS_OPTIONS, STEEL_OPTIONS } from './data/products';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { CollectionSection } from './components/CollectionSection';
import { MaterialAnatomySection } from './components/MaterialAnatomySection';
import { AboutUsSection } from './components/AboutUsSection';
import { ClientsShowcaseSection } from './components/ClientsShowcaseSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { AdminPortalScreen } from './components/AdminPortalScreen';
import { ChatSpaceModal } from './components/ChatSpaceModal';
import { MessageSquare, Shield, ArrowRight } from 'lucide-react';

const INITIAL_ORDERS: CommissionOrder[] = [
  {
    id: 'LX-849102',
    clientName: 'Julian Vance',
    clientEmail: 'julian@vanceloft.com',
    date: '2026-10-08',
    total: 10300,
    paymentMethod: 'card',
    paymentDetails: 'Visa ending 8912',
    paymentStatus: 'Completed',
    deliveryStatus: 'In Production',
    items: [
      {
        name: 'Kronos Trestle Dining Table',
        quantity: 1,
        wood: 'American Black Walnut',
        glass: 'Smoked Bronze Glass',
        steel: 'Marine-Grade 316 Stainless',
        price: 6850,
      },
      {
        name: 'Aura Cantilever Lounge Chair',
        quantity: 1,
        wood: 'American Walnut inlays',
        glass: 'Smoked float glides',
        steel: 'Brushed stainless tube',
        price: 3450,
      },
    ],
    shippingAddress: '428 Sansome St, Penthouse 6, San Francisco CA',
    notes: 'Freight elevator reserved for 2.6m timber crating.',
  },
  {
    id: 'LX-712940',
    clientName: 'Claire Dubois',
    clientEmail: 'c.dubois@studioparis.fr',
    date: '2026-10-02',
    total: 8200,
    paymentMethod: 'paypal',
    paymentDetails: 'PayPal Express Verified',
    paymentStatus: 'Completed',
    deliveryStatus: 'In Production',
    items: [
      {
        name: 'Monolith Modular Credenza',
        quantity: 1,
        wood: 'European Smoked Oak',
        glass: 'Architectural Fluted Glass',
        steel: 'Blackened Gunmetal Patina',
        price: 8200,
      },
    ],
    shippingAddress: '14 Rue de Tournon, 75006 Paris, France',
  },
];

function AtelierApp() {
  const { currentUser, switchRole } = useAuth();

  // Screen Mode: 'storefront' (Client) vs 'admin' (Dedicated Administrator Portal)
  const [currentScreen, setCurrentScreen] = useState<'storefront' | 'admin'>('storefront');

  // Products state with localStorage persistence
  const [products, setProducts] = useState<FurnitureProduct[]>(() => {
    const saved = localStorage.getItem('vk_catalog_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        return FURNITURE_PRODUCTS;
      }
    }
    return FURNITURE_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('vk_catalog_products', JSON.stringify(products));
  }, [products]);

  // Orders state with localStorage persistence
  const [orders, setOrders] = useState<CommissionOrder[]>(() => {
    const saved = localStorage.getItem('vk_commission_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('vk_commission_orders', JSON.stringify(orders));
  }, [orders]);

  const [activeStudioProduct, setActiveStudioProduct] = useState<FurnitureProduct>(products[0]);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartItemId: 'init-kronos-1',
      product: products[0],
      wood: WOOD_OPTIONS[0],
      glass: GLASS_OPTIONS[0],
      steel: STEEL_OPTIONS[0],
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Modals
  const [detailModalProduct, setDetailModalProduct] = useState<FurnitureProduct | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Product management handlers
  const handleAddProduct = (newProduct: FurnitureProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setActiveStudioProduct(newProduct);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => {
      const remaining = prev.filter((p) => p.id !== productId);
      if (activeStudioProduct.id === productId && remaining.length > 0) {
        setActiveStudioProduct(remaining[0]);
      }
      return remaining;
    });
  };

  // Cart Handlers
  const handleAddToCart = (
    product: FurnitureProduct,
    wood: WoodOption = WOOD_OPTIONS[0],
    glass: GlassOption = GLASS_OPTIONS[0],
    steel: SteelOption = STEEL_OPTIONS[0],
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.product.id === product.id &&
          it.wood.id === wood.id &&
          it.glass.id === glass.id &&
          it.steel.id === steel.id
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          cartItemId: `${product.id}-${wood.id}-${glass.id}-${steel.id}-${Date.now()}`,
          product,
          wood,
          glass,
          steel,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => (it.cartItemId === cartItemId ? { ...it, quantity: newQty } : it))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If user is on the dedicated Administrator Screen:
  if (currentScreen === 'admin') {
    return (
      <AdminPortalScreen
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={(updated) => {
          setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        }}
        onDeleteProduct={handleDeleteProduct}
        orders={orders}
        onUpdateOrderStatus={(orderId, deliveryStatus, paymentStatus) => {
          setOrders((prev) =>
            prev.map((o) => {
              if (o.id === orderId) {
                return {
                  ...o,
                  deliveryStatus,
                  paymentStatus: paymentStatus || o.paymentStatus,
                };
              }
              return o;
            })
          );
        }}
        onExitToStorefront={() => setCurrentScreen('storefront')}
      />
    );
  }

  // Otherwise: Pure Luxury Client Storefront Screen
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#f1f3f9] flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Banner if logged in as Admin/Owner to enter Admin Portal */}
      {currentUser?.role === 'admin' && (
        <aside aria-label="Administrator mode status" className="bg-purple-950/40 border-b border-purple-500/20 px-6 py-2.5 text-xs flex items-center justify-between text-purple-200">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>Authenticated as <strong>Marcus Kern (Lixie Furnitures Owner & Admin)</strong>. You are previewing the client-facing storefront.</span>
          </div>
          <button
            onClick={() => setCurrentScreen('admin')}
            className="px-3.5 py-1 bg-gradient-to-r from-purple-500 to-amber-500 text-zinc-950 font-bold rounded-lg hover:opacity-95 transition-all flex items-center gap-1.5 shadow-lg shadow-purple-500/20"
          >
            <span>Open Admin Studio Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* 3-Zone Top Bar with Menu & Integrated Nav */}
      <TopBar
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenChat={() => {
          if (!currentUser) {
            setIsAuthModalOpen(true);
          } else {
            setIsChatModalOpen(true);
          }
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAdminDashboard={() => {
          switchRole('admin');
          setCurrentScreen('admin');
        }}
      />

      {/* Main Client Content */}
      <main className="flex-1">
        {/* 1. Architectural Hero Campaign */}
        <HeroSection
          onExploreCollection={() => handleNavigateSection('collection')}
          onExploreMateriality={() => handleNavigateSection('materiality')}
        />

        {/* 2. Signature Collection Grid */}
        <CollectionSection
          products={products}
          onSelectProduct={(p) => {
            setActiveStudioProduct(p);
            setDetailModalProduct(p);
          }}
          onQuickAdd={(p) => handleAddToCart(p)}
        />

        {/* 3. Tri-Material Anatomy: Wood, Glass, Steel */}
        <MaterialAnatomySection />

        {/* 4. About Us Page / Section: Origin, Material Standards & Ethos */}
        <AboutUsSection
          onExploreCollection={() => handleNavigateSection('collection')}
          onOpenChat={() => {
            if (!currentUser) {
              setIsAuthModalOpen(true);
            } else {
              setIsChatModalOpen(true);
            }
          }}
        />

        {/* 5. Clients & Global Architecture Partners Showcase */}
        <ClientsShowcaseSection
          onOpenChat={() => {
            if (!currentUser) {
              setIsAuthModalOpen(true);
            } else {
              setIsChatModalOpen(true);
            }
          }}
        />
      </main>

      {/* Floating Client Concierge Chat Button (Auth Protected) */}
      <aside aria-label="Concierge Chat" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            if (!currentUser) {
              setIsAuthModalOpen(true);
            } else {
              setIsChatModalOpen(true);
            }
          }}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-zinc-950 font-bold text-xs shadow-2xl transition-all hover:scale-105"
        >
          <MessageSquare className="w-4 h-4 text-zinc-950" />
          <span>Atelier Concierge Chat</span>
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
        </button>
      </aside>

      {/* Quiet Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenAdminPortal={() => {
          switchRole('admin');
          setCurrentScreen('admin');
        }}
      />

      {/* Client/Admin Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(role) => {
          if (role === 'admin') {
            setCurrentScreen('admin');
          }
        }}
      />

      {/* Client Concierge Chat Modal (Auth Protected) */}
      <ChatSpaceModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        products={products}
        activeProduct={activeStudioProduct}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Product Detail & Customizer Modal */}
      {detailModalProduct && (
        <ProductDetailModal
          product={detailModalProduct}
          onClose={() => setDetailModalProduct(null)}
          onAddToCart={(w, g, s, q) => {
            handleAddToCart(detailModalProduct, w, g, s, q);
            setDetailModalProduct(null);
          }}
          onOpenChat={() => {
            setDetailModalProduct(null);
            if (!currentUser) {
              setIsAuthModalOpen(true);
            } else {
              setIsChatModalOpen(true);
            }
          }}
        />
      )}

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onSelectProduct={(productId) => {
          const prod = products.find((p) => p.id === productId);
          if (prod) {
            setActiveStudioProduct(prod);
            setDetailModalProduct(prod);
          }
        }}
      />

      {/* Checkout & Payment Authorization Modal (with Card, Mobile, PayPal, Crypto) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onPaymentSuccess={(newOrder) => {
          setOrders((prev) => [newOrder, ...prev]);
          setCartItems([]);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AtelierApp />
    </AuthProvider>
  );
}
