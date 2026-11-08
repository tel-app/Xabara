import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, FurnitureProduct, User } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Send,
  Paperclip,
  CheckCheck,
  Shield,
  User as UserIcon,
  Sparkles,
  ArrowRight,
  Clock,
  Box,
} from 'lucide-react';

interface ChatSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: FurnitureProduct[];
  activeProduct?: FurnitureProduct;
  onOpenAuth: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'admin-marcus',
    senderName: 'Marcus Kern (Owner & Master Artisan)',
    senderRole: 'admin',
    timestamp: Date.now() - 3600000 * 2,
    text: 'Welcome to Lixie Furnitures Atelier. I am Marcus Kern, lead director. If you have any inquiries regarding custom timber spans, glass finishes, or structural steel tolerances for your project, please message me directly here.',
  },
  {
    id: 'msg-2',
    senderId: 'client-julian',
    senderName: 'Julian Vance (Architect)',
    senderRole: 'client',
    timestamp: Date.now() - 3600000,
    text: 'Hello Marcus, we are specifying the Kronos Trestle Dining Table for a penthouse in San Francisco. Can the American Walnut trestle base be customized to 3200mm span to seat 12 guests?',
    productRef: {
      id: 'kronos-dining-table',
      name: 'Kronos Trestle Dining Table',
      image: '/src/assets/images/prod_arch_dining_table_1791740474537.jpg',
      price: 6850,
    },
  },
  {
    id: 'msg-3',
    senderId: 'admin-marcus',
    senderName: 'Marcus Kern (Owner & Master Artisan)',
    senderRole: 'admin',
    timestamp: Date.now() - 1800000,
    text: 'Absolutely Julian. For 3200mm spans, we engineer an additional central reverse-thread turnbuckle in 316 stainless steel to eliminate mid-span deflection. The 19mm smoked glass is then cut as a single monolithic float panel.',
  },
];

export const ChatSpaceModal: React.FC<ChatSpaceModalProps> = ({
  isOpen,
  onClose,
  products,
  activeProduct,
  onOpenAuth,
}) => {
  const { currentUser, switchRole } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('vk_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });

  const [inputMessage, setInputMessage] = useState('');
  const [attachProduct, setAttachProduct] = useState<FurnitureProduct | null>(activeProduct || null);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem('vk_chat_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  // AUTHENTICATION GATE: Limit chat features strictly for logged-in users
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
        <div className="relative w-full max-w-md bg-[#101217] border border-white/15 rounded-2xl shadow-2xl p-6 text-center space-y-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Shield className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white font-display">Client Authentication Required</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Atelier Concierge direct chat is reserved for registered clients and architectural partners. Please sign in or create a complimentary dossier to consult directly with Marcus Kern.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-400/20 transition-all"
            >
              Sign In or Register Account
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-400 text-xs transition-colors"
            >
              Continue Browsing Collection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isClient = currentUser?.role === 'client';
  const isAdmin = currentUser?.role === 'admin';

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() && !attachProduct) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser?.id || (isClient ? 'client-julian' : 'admin-marcus'),
      senderName: currentUser ? `${currentUser.name} (${currentUser.role === 'admin' ? 'Owner / Admin' : 'Client'})` : (isClient ? 'Julian Vance (Client)' : 'Marcus Kern (Owner)'),
      senderRole: currentUser?.role || 'client',
      timestamp: Date.now(),
      text: inputMessage.trim(),
      productRef: attachProduct
        ? {
            id: attachProduct.id,
            name: attachProduct.name,
            image: attachProduct.image,
            price: attachProduct.price,
          }
        : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setAttachProduct(null);

    // If client sent a message and admin is offline, simulate intelligent response after 1.8s
    if (isClient) {
      setTimeout(() => {
        const replies = [
          'Thank you for the message. I have reviewed your architectural inquiry and can confirm our 5-axis lathe can machine those custom hardware specs within the standard 4-6 week window.',
          'Understood. I will prepare the technical 2D joinery section drawings and dispatch physical timber swatches to your studio.',
          'Noted. Our structural engineers have verified this configuration against the 280kg static load requirement. Feel free to proceed with checkout or let me know if you require a formal PDF pro-forma invoice.',
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const autoReply: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          senderId: 'admin-marcus',
          senderName: 'Marcus Kern (Owner & Master Artisan)',
          senderRole: 'admin',
          timestamp: Date.now(),
          text: randomReply,
        };
        setMessages((prev) => [...prev, autoReply]);
      }, 1600);
    }
  };

  const handleQuickPreset = (presetText: string) => {
    setInputMessage(presetText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl h-[86vh] bg-[#101215] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-display">
                LX
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {isAdmin ? 'Client Inquiries & Concierge Desk' : 'Direct Atelier Concierge & Owner Chat'}
                </h2>
                <span className="text-zinc-600">·</span>
                <span className="text-[11px] font-mono text-emerald-400">Online</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {isAdmin
                  ? 'Messaging with Client: Julian Vance (Vance Loft Architects)'
                  : 'Speaking with Marcus Kern · Founder & Lead Artisan'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Perspective Role Switcher */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 bg-black/40 rounded-lg border border-white/10 text-[11px]">
              <span className="text-zinc-500 px-1">Role:</span>
              <button
                onClick={() => switchRole('client')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  isClient ? 'bg-white text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Client
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  isAdmin ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Owner/Admin
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canned Quick Responses Bar (Helpful for rapid testing) */}
        <div className="px-6 py-2 bg-black/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] text-zinc-400">
          <span className="text-zinc-500 whitespace-nowrap">Suggested:</span>
          {isClient ? (
            <>
              <button
                onClick={() => handleQuickPreset('Can the timber trestle be customized for an outdoor covered terrace?')}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 whitespace-nowrap"
              >
                Terrace durability?
              </button>
              <button
                onClick={() => handleQuickPreset('What is the lead time for 6 Aura Cantilever chairs in Smoked Oak?')}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 whitespace-nowrap"
              >
                Lead time inquiry
              </button>
              <button
                onClick={() => handleQuickPreset('Can you share 3D CAD files (.STEP / .OBJ) for space planning?')}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 whitespace-nowrap"
              >
                Request 3D CAD files
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleQuickPreset('Yes, we can prepare custom 3D drawings and timber swatches for your client review.')}
                className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap"
              >
                Send swatches & CAD
              </button>
              <button
                onClick={() => handleQuickPreset('We have verified your custom dimensions against structural deflection standards. We are ready to queue the commission.')}
                className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap"
              >
                Confirm custom dimensions
              </button>
            </>
          )}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#101215] to-[#0c0d0f]">
          {messages.map((msg) => {
            const isMe =
              (isClient && msg.senderRole === 'client') || (isAdmin && msg.senderRole === 'admin');

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-xl ${
                  isMe ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[11px] text-zinc-500">
                  <span className={msg.senderRole === 'admin' ? 'text-amber-400 font-semibold' : 'text-zinc-300'}>
                    {msg.senderName}
                  </span>
                  <span>·</span>
                  <span className="font-mono">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2.5 shadow-md ${
                    isMe
                      ? msg.senderRole === 'admin'
                        ? 'bg-amber-500/20 text-white border border-amber-500/40 rounded-tr-sm'
                        : 'bg-zinc-800 text-white border border-white/15 rounded-tr-sm'
                      : 'bg-[#181a1f] text-zinc-200 border border-white/10 rounded-tl-sm'
                  }`}
                >
                  {/* Product Attachment Card */}
                  {msg.productRef && (
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/15 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                        <img
                          src={msg.productRef.image}
                          alt={msg.productRef.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-amber-400 uppercase font-mono block">Commission Reference</span>
                        <p className="font-semibold text-white truncate text-xs">{msg.productRef.name}</p>
                        <p className="font-mono text-zinc-400 text-[11px]">
                          ${msg.productRef.price.toLocaleString()} USD
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Product Attachment Picker Tray */}
        {showProductPicker && (
          <div className="p-4 bg-black/80 border-t border-white/10 flex items-center gap-3 overflow-x-auto text-xs">
            <span className="text-zinc-400 shrink-0">Attach Design:</span>
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setAttachProduct(p);
                  setShowProductPicker(false);
                }}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 shrink-0 transition-colors"
              >
                <img src={p.image} alt={p.name} className="w-6 h-6 rounded object-cover" />
                <span className="truncate max-w-[140px]">{p.name}</span>
              </button>
            ))}
            <button
              onClick={() => setShowProductPicker(false)}
              className="p-1 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Selected Attachment Banner */}
        {attachProduct && !showProductPicker && (
          <div className="px-6 py-2 bg-amber-500/10 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4" />
              <span>Attached: {attachProduct.name} (${attachProduct.price.toLocaleString()})</span>
            </div>
            <button
              onClick={() => setAttachProduct(null)}
              className="text-zinc-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 bg-black/70 border-t border-white/10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowProductPicker(!showProductPicker)}
            className="p-2.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            title="Attach a furniture product reference"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder={
              isClient
                ? "Inquire about custom dimensions, wood finishes, or shipping to your studio..."
                : "Reply to client as Marcus Kern (Owner & Lead Artisan)..."
            }
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() && !attachProduct}
            className="p-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-400/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
