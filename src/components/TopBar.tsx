import React, { useState } from 'react';
import {
  ShoppingBag,
  MessageSquare,
  Shield,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Compass,
  Sparkles,
  Layers,
  Users,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TopBarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenChat: () => void;
  onOpenAuth: () => void;
  onOpenAdminDashboard: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  cartItemCount,
  onOpenCart,
  onNavigateSection,
  onOpenChat,
  onOpenAuth,
  onOpenAdminDashboard,
}) => {
  const { currentUser, logout, switchRole } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuNavigate = (sectionId: string) => {
    setIsMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0c0d0e]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-8">
          {/* Left Zone: Brand Wordmark & Menu Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Menu Button for Integrating Across Views */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/15 text-zinc-300 hover:text-white transition-all text-xs font-semibold cursor-pointer"
              title="Open Navigation Menu"
            >
              {isMenuOpen ? <X className="w-4 h-4 text-amber-400" /> : <Menu className="w-4 h-4 text-amber-400" />}
              <span className="hidden sm:inline">Menu</span>
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display whitespace-nowrap hover:text-amber-300 transition-colors"
            >
              LIXIE FURNITURES
            </a>
          </div>

          {/* Center Zone: Direct Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-300">
            <button
              onClick={() => onNavigateSection('collection')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Collection
            </button>
            <button
              onClick={() => onNavigateSection('materiality')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Materiality
            </button>
            <button
              onClick={() => onNavigateSection('about-us')}
              className="hover:text-white transition-colors cursor-pointer text-amber-300/90 hover:text-amber-300 font-semibold"
            >
              About Us
            </button>
            <button
              onClick={() => onNavigateSection('clients-showcase')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Clients</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                5.4k
              </span>
            </button>
            <button
              onClick={() => onNavigateSection('atelier-story')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Atelier
            </button>
          </nav>

          {/* Right Zone: Actions (Concierge Chat + Account + Cart) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Atelier Concierge Chat Action (Auth gated) */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-black/60 hover:bg-black/90 border border-white/15 rounded-xl transition-colors whitespace-nowrap shrink-0 relative"
              title="Chat directly with Atelier Owner Marcus Kern"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Concierge Chat</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </button>

            {/* Admin Dashboard shortcut (if user is admin) */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={onOpenAdminDashboard}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-colors whitespace-nowrap shrink-0"
                title="Open Atelier Administrator Console"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Admin Console</span>
              </button>
            )}

            {/* User Account / Profile Dropdown */}
            <div className="relative">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 px-2.5 sm:px-3 py-2 text-xs font-medium text-zinc-200 bg-black/60 hover:bg-black border border-white/15 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 text-[10px] font-bold">
                      {currentUser.name[0]}
                    </div>
                    <span className="hidden sm:inline truncate max-w-[110px]">{currentUser.name.split(' ')[0]}</span>
                    <span className="text-[10px] font-mono text-amber-400 uppercase hidden md:inline">
                      ({currentUser.role})
                    </span>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#14161a] border border-white/15 shadow-2xl p-2 z-50 text-xs">
                      <div className="px-3 py-2 border-b border-white/10">
                        <p className="font-semibold text-white">{currentUser.name}</p>
                        <p className="text-zinc-400 text-[11px] truncate">{currentUser.email}</p>
                        <span className="mt-1 inline-block text-[10px] font-mono uppercase text-amber-400">
                          Role: {currentUser.role}
                        </span>
                      </div>

                      <div className="py-1">
                        {currentUser.role === 'admin' && (
                          <button
                            onClick={() => {
                              setShowUserDropdown(false);
                              onOpenAdminDashboard();
                            }}
                            className="w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2"
                          >
                            <Shield className="w-3.5 h-3.5 text-amber-400" />
                            <span>Admin Console</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            switchRole(currentUser.role === 'admin' ? 'client' : 'admin');
                          }}
                          className="w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2"
                        >
                          <User className="w-3.5 h-3.5 text-sky-400" />
                          <span>Switch to {currentUser.role === 'admin' ? 'Client' : 'Admin'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            logout();
                          }}
                          className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-black/60 hover:bg-black border border-white/15 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-sm"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-zinc-950" />
              <span className="hidden sm:inline font-semibold">Bag</span>
              {cartItemCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-bold font-mono">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* INTEGRATED NAVIGATION DRAWER MENU (ACROSS ALL CLIENT & ADMIN VIEWS) */}
      {/* ============================================================== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-start animate-fade-in">
          <div className="w-full max-w-sm bg-[#0e1017] border-r border-white/15 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white">
                    LX
                  </div>
                  <span className="font-display font-bold text-base text-white tracking-tight">
                    LIXIE FURNITURES
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items Across Views */}
              <div className="space-y-1.5 text-xs font-medium">
                <span className="text-[10px] font-mono uppercase text-zinc-500 px-3 tracking-wider block mb-2">
                  Atelier Navigation
                </span>

                <button
                  onClick={() => handleMenuNavigate('collection')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-200 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Signature Collection</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>

                <button
                  onClick={() => handleMenuNavigate('materiality')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-200 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span>Material Science (Wood, Glass, Steel)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>

                <button
                  onClick={() => handleMenuNavigate('about-us')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-amber-300 hover:text-amber-200 transition-colors bg-amber-500/10 border border-amber-500/20"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span className="font-bold">About Us & Atelier Ethos</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">New</span>
                </button>

                <button
                  onClick={() => handleMenuNavigate('clients-showcase')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-200 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span>5,420+ Clients & Architecture Partners</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">5.4k</span>
                </button>

                <button
                  onClick={() => handleMenuNavigate('atelier-story')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-200 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-emerald-400" />
                    <span>Workshop Protocol & Permanence</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>

                <div className="pt-4 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 px-3 tracking-wider block mb-2">
                    Direct Client Services
                  </span>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenChat();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-200 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Atelier Concierge Chat</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Owner Direct</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenCart();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-200 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>Shopping Bag & Multi-Payment Checkout</span>
                    </div>
                    {cartItemCount > 0 && (
                      <span className="text-[10px] font-mono font-bold bg-amber-400 text-zinc-950 px-2 py-0.5 rounded-full">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenAdminDashboard();
                }}
                className="w-full py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-purple-300" />
                <span>Admin Studio Console</span>
              </button>

              {currentUser ? (
                <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                  <span>Signed in as <strong className="text-white">{currentUser.name.split(' ')[0]}</strong></span>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="text-red-400 hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-colors"
                >
                  Sign In or Register
                </button>
              )}
            </div>
          </div>

          <div className="flex-1" onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </>
  );
};
