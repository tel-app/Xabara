import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User as UserIcon, Building, ShieldCheck, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  onLoginSuccess?: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
  onLoginSuccess,
}) => {
  const { login, signup, switchRole, currentUser } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email) throw new Error('Please enter your email address.');
        await login(email, password);
        const resolvedRole = email.toLowerCase().includes('admin') ? 'admin' : 'client';
        if (onLoginSuccess) onLoginSuccess(resolvedRole);
        onClose();
      } else {
        if (!name || !email) throw new Error('Please provide your name and email.');
        await signup(name, email, password, company, role);
        if (onLoginSuccess) onLoginSuccess(role);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (targetRole: UserRole) => {
    switchRole(targetRole);
    if (onLoginSuccess) onLoginSuccess(targetRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-[#111317] border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <span className="font-display font-bold text-lg text-white tracking-wider">VALT & KERN</span>
          <p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-wider">
            {mode === 'login' ? 'Client & Admin Portal' : 'Create Atelier Client Account'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10 mb-6 text-xs">
          <button
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2 font-medium rounded-lg transition-colors ${
              mode === 'login' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`flex-1 py-2 font-medium rounded-lg transition-colors ${
              mode === 'signup' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="mb-6 p-3 bg-black/50 rounded-xl border border-white/10 space-y-2">
          <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 text-center">
            Instant Demo Profiles
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLogin('client')}
              className="px-2.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-left transition-colors truncate"
            >
              <span className="font-semibold text-amber-400 block text-[11px]">Client Mode</span>
              <span className="text-[10px] text-zinc-400 truncate block">Julian Vance (Architect)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="px-2.5 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-zinc-200 border border-amber-500/30 text-left transition-colors truncate"
            >
              <span className="font-semibold text-amber-400 block text-[11px]">Owner / Admin</span>
              <span className="text-[10px] text-zinc-400 truncate block">Marcus Kern (Lead Director)</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-xs text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-zinc-400 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-zinc-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="client@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-zinc-400 mb-1">Architectural Firm / Residence (Optional)</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. Studio Vance Architecture"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Account Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`py-2 px-3 rounded-lg border text-left transition-colors ${
                      role === 'client'
                        ? 'border-amber-400 bg-amber-500/10 text-white font-medium'
                        : 'border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>Client / Buyer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-2 px-3 rounded-lg border text-left transition-colors ${
                      role === 'admin'
                        ? 'border-amber-400 bg-amber-500/10 text-white font-medium'
                        : 'border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>Seller / Owner Admin</span>
                  </button>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl font-medium text-sm text-zinc-950 bg-white hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg mt-2"
          >
            <span>{mode === 'login' ? 'Sign In to Atelier' : 'Register Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          <span>Encrypted atelier authentication & private communications</span>
        </div>
      </div>
    </div>
  );
};
