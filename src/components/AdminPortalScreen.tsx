import React, { useState } from 'react';
import { FurnitureProduct, CommissionOrder, ChatMessage, ClientProfile, ClientConversationThread, PaymentStatus, DeliveryStatus, PaymentMethodType } from '../types';
import { useAuth } from '../context/AuthContext';
import { generateScalableClients, INITIAL_CONVERSATION_THREADS } from '../data/mockClients';
import {
  Package,
  Plus,
  Trash2,
  Edit3,
  Clock,
  MessageSquare,
  Users,
  Layers,
  ArrowLeft,
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Shield,
  Send,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Filter,
  CreditCard,
  Smartphone,
  Globe,
  Coins,
  Check,
  X,
  Sparkles,
  UserCheck,
  Building,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Truck,
  Eye,
  CheckCheck,
} from 'lucide-react';

interface AdminPortalScreenProps {
  products: FurnitureProduct[];
  onAddProduct: (p: FurnitureProduct) => void;
  onUpdateProduct: (p: FurnitureProduct) => void;
  onDeleteProduct: (id: string) => void;
  orders: CommissionOrder[];
  onUpdateOrderStatus: (orderId: string, deliveryStatus: DeliveryStatus, paymentStatus?: PaymentStatus) => void;
  onExitToStorefront: () => void;
}

export const AdminPortalScreen: React.FC<AdminPortalScreenProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  onExitToStorefront,
}) => {
  const { currentUser } = useAuth();

  // Navigation tab state (Dribbble Imagine AI Studio layout)
  const [activeTab, setActiveTab] = useState<'catalog' | 'clients' | 'orders' | 'chats'>('catalog');

  // 5,000+ Clients state & pagination
  const [clients] = useState<ClientProfile[]>(() => generateScalableClients(5420));
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClientProfile, setSelectedClientProfile] = useState<ClientProfile | null>(null);
  const [clientTierFilter, setClientTierFilter] = useState<string>('all');
  const [clientPage, setClientPage] = useState<number>(1);
  const pageSize = 12;

  // Catalog search & edit state
  const [catalogSearch, setCatalogSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<FurnitureProduct | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Orders filter (pending, delivered, completed payments)
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'completed' | 'delivered'>('all');

  // Multi-Client Chat Dashboard State
  const [threads, setThreads] = useState<ClientConversationThread[]>(() => {
    const saved = localStorage.getItem('vk_admin_conversation_threads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CONVERSATION_THREADS;
      }
    }
    return INITIAL_CONVERSATION_THREADS;
  });

  const [activeThreadClientId, setActiveThreadClientId] = useState<string>(threads[0]?.clientId || 'client-julian');
  const [adminReplyText, setAdminReplyText] = useState('');
  const [chatSearch, setChatSearch] = useState('');

  // Upload Form State with Multiple Images Support
  const [uploadForm, setUploadForm] = useState({
    name: '',
    kicker: 'Bespoke Atelier Piece',
    category: 'Dining' as FurnitureProduct['category'],
    price: 5400,
    tagline: 'Handcrafted architectural timber balanced with structural tension fittings.',
    description: 'Quarter-sawn solid hardwood with precision CNC reverse-thread 316 turnbuckles and thermal tempered float glass.',
    image: '/src/assets/images/prod_arch_dining_table_1791740474537.jpg',
    images: [
      '/src/assets/images/prod_arch_dining_table_1791740474537.jpg',
      '/src/assets/images/hero_arch_furniture_1791740462910.jpg',
    ],
    width: 2400,
    depth: 1050,
    height: 750,
    weightKg: 110,
    leadTimeWeeks: 5,
    wood: 'American Black Walnut',
    glass: '19mm Smoked Bronze Tempered Glass',
    steel: 'Marine-Grade 316 Stainless Steel',
    joinery: 'Mortise and tenon timber joints reinforced by internal steel shear-gussets.',
    tensileHardware: 'Precision CNC-turned tensioning barrel with dual M14 reverse threads.',
    loadRating: '260 kg distributed load capacity.',
    environmentalFSC: '100% Certified Sustainable Forestry (FSC-C012345).',
    feature1: 'Hand-rubbed organic hardwax oil finish resilient to spills',
    feature2: 'Floating acoustic dampening silicone isolators between glass and wood',
    feature3: 'Structural turnbuckles allow micro-leveling across uneven flooring',
  });

  // Multiple Image Upload handlers
  const handleUploadMultipleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setUploadForm((prev) => {
            const nextImages = [...prev.images, result];
            return {
              ...prev,
              images: nextImages,
              image: nextImages[0],
            };
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveUploadImage = (idxToRemove: number) => {
    setUploadForm((prev) => {
      const nextImages = prev.images.filter((_, idx) => idx !== idxToRemove);
      return {
        ...prev,
        images: nextImages,
        image: nextImages[0] || '/src/assets/images/prod_arch_dining_table_1791740474537.jpg',
      };
    });
  };

  const handleSetPrimaryUploadImage = (idxToPrimary: number) => {
    setUploadForm((prev) => {
      const target = prev.images[idxToPrimary];
      const rest = prev.images.filter((_, idx) => idx !== idxToPrimary);
      const nextImages = [target, ...rest];
      return {
        ...prev,
        images: nextImages,
        image: target,
      };
    });
  };

  const handleAddPresetImage = (presetUrl: string) => {
    setUploadForm((prev) => {
      if (prev.images.includes(presetUrl)) return prev;
      const nextImages = [...prev.images, presetUrl];
      return {
        ...prev,
        images: nextImages,
        image: nextImages[0],
      };
    });
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.name) return;

    const primaryImg = uploadForm.images[0] || uploadForm.image || '/src/assets/images/prod_arch_dining_table_1791740474537.jpg';
    const created: FurnitureProduct = {
      id: `prod-${Date.now()}-${uploadForm.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: uploadForm.name,
      kicker: uploadForm.kicker,
      category: uploadForm.category,
      price: Number(uploadForm.price),
      tagline: uploadForm.tagline,
      description: uploadForm.description,
      image: primaryImg,
      images: uploadForm.images.length > 0 ? uploadForm.images : [primaryImg],
      dimensions: {
        width: Number(uploadForm.width),
        depth: Number(uploadForm.depth),
        height: Number(uploadForm.height),
      },
      weightKg: Number(uploadForm.weightKg),
      leadTimeWeeks: Number(uploadForm.leadTimeWeeks),
      materials: {
        wood: uploadForm.wood,
        glass: uploadForm.glass,
        steel: uploadForm.steel,
      },
      architecturalDetails: {
        joinery: uploadForm.joinery,
        tensileHardware: uploadForm.tensileHardware,
        loadRating: uploadForm.loadRating,
        environmentalFSC: uploadForm.environmentalFSC,
      },
      features: [uploadForm.feature1, uploadForm.feature2, uploadForm.feature3].filter(Boolean),
    };

    onAddProduct(created);
    setShowUploadModal(false);
  };

  // Filter 5,000+ clients
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.company.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.city.toLowerCase().includes(clientSearch.toLowerCase());
    const matchesTier = clientTierFilter === 'all' || c.tier === clientTierFilter;
    return matchesSearch && matchesTier;
  });

  const totalClientPages = Math.ceil(filteredClients.length / pageSize) || 1;
  const currentPagedClients = filteredClients.slice((clientPage - 1) * pageSize, clientPage * pageSize);

  // Filter orders (Pending, Delivered, Completed Payments)
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'pending') return o.paymentStatus === 'Pending' || o.deliveryStatus === 'Pending';
    if (orderStatusFilter === 'completed') return o.paymentStatus === 'Completed';
    if (orderStatusFilter === 'delivered') return o.deliveryStatus === 'Delivered';
    return true;
  });

  // Active chat thread for Admin Client Concierge Dashboard
  const currentActiveThread =
    threads.find((t) => t.clientId === activeThreadClientId) || threads[0] || null;

  // Jump to chat tab and select client
  const handleSelectClientToChat = (clientId: string) => {
    // If thread exists, activate it; otherwise create a placeholder thread
    const existingThread = threads.find((t) => t.clientId === clientId);
    if (!existingThread) {
      const client = clients.find((c) => c.id === clientId);
      if (client) {
        const newThread: ClientConversationThread = {
          clientId: client.id,
          clientName: client.name,
          clientEmail: client.email,
          clientCompany: client.company,
          clientAvatar: client.avatar,
          unreadCount: 0,
          lastMessage: `Connected with ${client.name} for inquiry consultation.`,
          lastTimestamp: Date.now(),
          messages: [
            {
              id: `msg-${Date.now()}`,
              senderId: 'admin-marcus',
              senderName: 'Marcus Kern (Lixie Furnitures Director)',
              senderRole: 'admin',
              text: `Hello ${client.name}, thank you for your interest in Lixie Furnitures. How may we assist your architectural commission today?`,
              timestamp: Date.now(),
            },
          ],
        };
        const updatedThreads = [newThread, ...threads];
        setThreads(updatedThreads);
        localStorage.setItem('vk_admin_conversation_threads', JSON.stringify(updatedThreads));
      }
    }
    setActiveThreadClientId(clientId);
    setActiveTab('chats');
    setSelectedClientProfile(null);
  };

  const handleAdminSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim() || !currentActiveThread) return;

    const newReply: ChatMessage = {
      id: `admin-msg-${Date.now()}`,
      senderId: 'admin-marcus',
      senderName: 'Marcus Kern (Lixie Furnitures Director)',
      senderRole: 'admin',
      text: adminReplyText.trim(),
      timestamp: Date.now(),
    };

    const updatedThreads = threads.map((t) => {
      if (t.clientId === currentActiveThread.clientId) {
        return {
          ...t,
          lastMessage: newReply.text,
          lastTimestamp: newReply.timestamp,
          messages: [...t.messages, newReply],
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    localStorage.setItem('vk_admin_conversation_threads', JSON.stringify(updatedThreads));
    setAdminReplyText('');
  };

  const handleQuickCannedReply = (text: string) => {
    if (!currentActiveThread) return;
    const newReply: ChatMessage = {
      id: `admin-msg-${Date.now()}`,
      senderId: 'admin-marcus',
      senderName: 'Marcus Kern (Lixie Furnitures Director)',
      senderRole: 'admin',
      text,
      timestamp: Date.now(),
    };

    const updatedThreads = threads.map((t) => {
      if (t.clientId === currentActiveThread.clientId) {
        return {
          ...t,
          lastMessage: newReply.text,
          lastTimestamp: newReply.timestamp,
          messages: [...t.messages, newReply],
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    localStorage.setItem('vk_admin_conversation_threads', JSON.stringify(updatedThreads));
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    onUpdateProduct(editingProduct);
    setEditingProduct(null);
  };

  const totalGMV = orders.reduce((sum, o) => sum + o.total, 0);
  const deliveredCount = orders.filter((o) => o.deliveryStatus === 'Delivered').length;
  const pendingPaymentCount = orders.filter((o) => o.paymentStatus === 'Pending').length;
  const completedPaymentCount = orders.filter((o) => o.paymentStatus === 'Completed').length;

  return (
    <div className="min-h-screen bg-[#07080c] text-[#f1f3f9] flex flex-col lg:flex-row font-sans antialiased selection:bg-purple-500/30 selection:text-purple-200">
      {/* ============================================================== */}
      {/* 1. DRIBBLE "IMAGINE AI" INSPIRED DARK SIDEBAR NAVIGATION     */}
      {/* ============================================================== */}
      <aside className="w-full lg:w-72 bg-[#0c0d15] border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between shrink-0 z-30">
        <div>
          {/* Atelier Brand Header */}
          <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-500 to-amber-400 p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-[#0c0d15] rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-black text-amber-400 text-sm tracking-tighter">LX</span>
                </div>
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white font-display block leading-tight">
                  LIXIE FURNITURES
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Studio Console
                </span>
              </div>
            </div>
          </div>

          {/* Main Navigation Menu */}
          <nav className="p-4 space-y-1.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'catalog'
                  ? 'bg-gradient-to-r from-purple-500/20 to-purple-500/5 text-white border border-purple-500/30 shadow-md shadow-purple-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className={`w-4 h-4 ${activeTab === 'catalog' ? 'text-amber-400' : 'text-zinc-400'}`} />
                <span>Catalog & Uploads</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-zinc-300">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'clients'
                  ? 'bg-gradient-to-r from-purple-500/20 to-purple-500/5 text-white border border-purple-500/30 shadow-md shadow-purple-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className={`w-4 h-4 ${activeTab === 'clients' ? 'text-purple-400' : 'text-zinc-400'}`} />
                <span>5,420+ Clients</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                5.4k
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-purple-500/20 to-purple-500/5 text-white border border-purple-500/30 shadow-md shadow-purple-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className={`w-4 h-4 ${activeTab === 'orders' ? 'text-sky-400' : 'text-zinc-400'}`} />
                <span>Purchases & Status</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('chats')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'chats'
                  ? 'bg-gradient-to-r from-purple-500/20 to-purple-500/5 text-white border border-purple-500/30 shadow-md shadow-purple-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className={`w-4 h-4 ${activeTab === 'chats' ? 'text-emerald-400' : 'text-zinc-400'}`} />
                <span>Client Chats Desk</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {threads.length}
              </span>
            </button>
          </nav>

          {/* Studio Quick Stats Widget in Sidebar */}
          <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-b from-[#121320] to-[#0d0e17] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span className="font-semibold text-zinc-300">Scale Metrics</span>
              <span className="font-mono text-emerald-400">LIVE</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Registered Users</span>
                <span className="font-mono font-bold text-white">5,420 Clients</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Payment Modes</span>
                <span className="font-mono text-purple-300">Card, Mobile, PayPal, Crypto</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Escrow Cleared</span>
                <span className="font-mono text-amber-400 font-semibold">${totalGMV.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom User Profile & Switcher */}
        <div className="p-4 border-t border-white/[0.06] space-y-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              MK
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Marcus Kern</p>
              <p className="text-[10px] text-zinc-400 truncate">Atelier Owner & Director</p>
            </div>
          </div>

          <button
            onClick={onExitToStorefront}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-zinc-950" />
            <span>Switch to Client Storefront</span>
          </button>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 2. MAIN STUDIO WORKSPACE (RIGHT CONTENT AREA)                 */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-[#07080c]/90 backdrop-blur-xl border-b border-white/[0.08] px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full text-xs">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search pieces, 5,420 clients, order IDs, messages... (⌘K)"
                value={activeTab === 'catalog' ? catalogSearch : activeTab === 'clients' ? clientSearch : chatSearch}
                onChange={(e) => {
                  if (activeTab === 'catalog') setCatalogSearch(e.target.value);
                  else if (activeTab === 'clients') {
                    setClientSearch(e.target.value);
                    setClientPage(1);
                  } else setChatSearch(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#10111a] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 text-xs shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 transition-all shadow-lg shadow-amber-400/20 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-zinc-950" />
              <span>Upload New Piece</span>
            </button>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-6 lg:p-8 space-y-8 flex-1">
          {/* Top Metric Cards Strip (Dribbble Glassmorphic Aesthetics) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0f101a] border border-white/[0.08] relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-xl">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Total Clients Joined</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <p className="font-mono text-3xl font-bold text-white mt-2">5,420</p>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                <span>+18.4%</span>
                <span className="text-zinc-500">this month across 42 studios</span>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f101a] border border-white/[0.08] relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-xl">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Total Purchases Escrow</span>
                <DollarSign className="w-4 h-4 text-amber-400" />
              </div>
              <p className="font-mono text-3xl font-bold text-white mt-2">${totalGMV.toLocaleString()} USD</p>
              <p className="text-[11px] text-zinc-400 mt-1 font-mono">
                {completedPaymentCount} Paid · {pendingPaymentCount} Pending Clearance
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f101a] border border-white/[0.08] relative overflow-hidden group hover:border-sky-500/40 transition-all shadow-xl">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Delivery Pipeline</span>
                <Truck className="w-4 h-4 text-sky-400" />
              </div>
              <p className="font-mono text-3xl font-bold text-white mt-2">{orders.length} Crated Orders</p>
              <p className="text-[11px] text-emerald-400 mt-1 font-mono">
                {deliveredCount} Delivered & Verified
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f101a] border border-white/[0.08] relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-xl">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Active Client Dialogues</span>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="font-mono text-3xl font-bold text-white mt-2">{threads.length} Threads</p>
              <p className="text-[11px] text-zinc-400 mt-1 font-mono">
                Direct master artisan consultations
              </p>
            </div>
          </div>

          {/* ============================================================== */}
          {/* TAB 1: CATALOG INVENTORY, UPLOADS & EDIT PIECE DESCRIPTIONS    */}
          {/* ============================================================== */}
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Catalog Management & Uploads</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Upload new pieces, edit descriptions and specifications post-upload, or delete pieces from the catalog.
                  </p>
                </div>

                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Piece</span>
                </button>
              </div>

              {/* Catalog Grid with Edit and Delete options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products
                  .filter(
                    (p) =>
                      p.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                      p.category.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                      p.description.toLowerCase().includes(catalogSearch.toLowerCase())
                  )
                  .map((p) => (
                    <div
                      key={p.id}
                      className="p-5 rounded-2xl bg-[#0f101a] border border-white/[0.08] hover:border-white/20 transition-all flex gap-4 group"
                    >
                      <div className="w-32 h-32 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                                {p.category} · {p.kicker}
                              </span>
                              <h3 className="text-base font-bold text-white truncate">{p.name}</h3>
                            </div>

                            <div className="flex items-center gap-1">
                              {/* Edit Piece Description and Specs */}
                              <button
                                onClick={() => setEditingProduct(p)}
                                className="p-2 text-zinc-400 hover:text-amber-400 rounded-lg hover:bg-white/5 transition-colors border border-white/5"
                                title="Edit piece description and specs"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              {/* Delete piece with confirm */}
                              {deleteConfirmId === p.id ? (
                                <div className="flex items-center gap-1 bg-red-950/90 p-1 rounded-lg border border-red-500/40">
                                  <span className="text-[10px] text-red-200">Delete?</span>
                                  <button
                                    onClick={() => {
                                      onDeleteProduct(p.id);
                                      setDeleteConfirmId(null);
                                    }}
                                    className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px]"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="px-1.5 py-0.5 text-zinc-400 text-[10px]"
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmId(p.id)}
                                  className="p-2 text-zinc-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors border border-white/5"
                                  title="Delete this piece"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5">{p.description}</p>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                          <span className="font-mono text-amber-400 font-bold tabular-nums">
                            ${p.price.toLocaleString()} USD
                          </span>
                          <span className="font-mono text-[11px] text-zinc-500">
                            {p.dimensions.width}x{p.dimensions.depth}x{p.dimensions.height}mm
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: 5,000+ CLIENTS DIRECTORY & PURCHASES PROFILES SUMMARY  */}
          {/* ============================================================== */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Clients & Architectural Directory (5,420 Users)</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Manage 5,000+ registered clients, filter tiers, and view complete purchase profile summaries.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select
                    value={clientTierFilter}
                    onChange={(e) => {
                      setClientTierFilter(e.target.value);
                      setClientPage(1);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#10111a] border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-purple-400"
                  >
                    <option value="all">All Tiers (5,420)</option>
                    <option value="VIP Platinum">VIP Platinum</option>
                    <option value="Architect Partner">Architect Partner</option>
                    <option value="Commercial Developer">Commercial Developer</option>
                    <option value="Private Client">Private Client</option>
                  </select>
                </div>
              </div>

              {/* Clients Table */}
              <div className="rounded-2xl bg-[#0f101a] border border-white/[0.08] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-black/40 border-b border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase">
                      <tr>
                        <th className="p-4">Client Profile</th>
                        <th className="p-4">Studio / Firm</th>
                        <th className="p-4">Tier Status</th>
                        <th className="p-4">Joined Date</th>
                        <th className="p-4">Purchases</th>
                        <th className="p-4">Lifetime Spend</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {currentPagedClients.map((cl) => (
                        <tr key={cl.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={cl.avatar}
                                alt={cl.name}
                                className="w-9 h-9 rounded-full object-cover border border-purple-500/30"
                              />
                              <div>
                                <p className="font-semibold text-white">{cl.name}</p>
                                <p className="text-[11px] text-zinc-500">{cl.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-zinc-300 font-medium">
                            {cl.company}
                            <span className="block text-[10px] text-zinc-500">{cl.city}, {cl.country}</span>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                              {cl.tier}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-zinc-400">{cl.joinedDate}</td>
                          <td className="p-4 font-mono text-zinc-200">{cl.totalPurchasesCount} orders</td>
                          <td className="p-4 font-mono font-bold text-amber-400">
                            ${cl.totalSpent.toLocaleString()} USD
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedClientProfile(cl)}
                                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-[11px] transition-colors flex items-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Profile & Purchases</span>
                              </button>
                              <button
                                onClick={() => handleSelectClientToChat(cl.id)}
                                className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-colors"
                                title="Chat with this client"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="p-4 bg-black/40 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>
                    Showing {Math.min((clientPage - 1) * pageSize + 1, filteredClients.length)}-
                    {Math.min(clientPage * pageSize, filteredClients.length)} of {filteredClients.length} registered clients
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setClientPage((prev) => Math.max(prev - 1, 1))}
                      disabled={clientPage === 1}
                      className="px-3 py-1.5 rounded-lg bg-[#141522] border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                      Page {clientPage} of {totalClientPages}
                    </span>

                    <button
                      onClick={() => setClientPage((prev) => Math.min(prev + 1, totalClientPages))}
                      disabled={clientPage === totalClientPages}
                      className="px-3 py-1.5 rounded-lg bg-[#141522] border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 flex items-center gap-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: PURCHASES, CLEARANCE & STATUSES (CARD, MOBILE, PAYPAL, CRYPTO) */}
          {/* ============================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Purchases Clearance & Multi-Payment Settlement</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Clearance across Credit/Debit, Mobile Money, PayPal, and Crypto wallets with pending, delivered, completed statuses.
                  </p>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-black/50 rounded-xl border border-white/10 text-xs">
                  <button
                    onClick={() => setOrderStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      orderStatusFilter === 'all' ? 'bg-[#1e1f2b] text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    All ({orders.length})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('completed')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      orderStatusFilter === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Payment Completed ({completedPaymentCount})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('pending')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      orderStatusFilter === 'pending'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Pending ({pendingPaymentCount})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('delivered')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      orderStatusFilter === 'delivered'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Delivered ({deliveredCount})
                  </button>
                </div>
              </div>

              {/* Orders Feed */}
              <div className="space-y-4">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-[#0f101a] border border-white/[0.08] hover:border-white/15 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-xl"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-sm font-bold text-amber-400">{ord.id}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-sm font-bold text-white">{ord.clientName}</span>
                        <span className="text-xs text-zinc-400">({ord.clientEmail})</span>
                        <span className="text-zinc-600">·</span>
                        <span className="font-mono text-xs text-zinc-500">{ord.date}</span>
                      </div>

                      <div className="text-xs text-zinc-300 space-y-1">
                        {ord.items.map((it, idx) => (
                          <p key={idx} className="flex items-center gap-2">
                            <span className="text-amber-400 font-mono">0{idx + 1}.</span>
                            <span className="font-semibold text-white">{it.quantity}x {it.name}</span>
                            <span className="text-zinc-400">· {it.wood} / {it.glass} / {it.steel}</span>
                          </p>
                        ))}
                      </div>

                      <p className="text-[11px] text-zinc-500">
                        Destination: {ord.shippingAddress} {ord.notes ? `· Notes: ${ord.notes}` : ''}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {/* Amount & Multi-Payment Method Pill */}
                      <div className="text-right">
                        <span className="font-mono text-lg font-bold text-white block tabular-nums">
                          ${ord.total.toLocaleString()} USD
                        </span>
                        <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 inline-block mt-0.5">
                          Method: {ord.paymentMethod} {ord.paymentDetails ? `(${ord.paymentDetails})` : ''}
                        </span>
                      </div>

                      {/* Payment Status Dropdown */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Payment Status</span>
                        <select
                          value={ord.paymentStatus}
                          onChange={(e) =>
                            onUpdateOrderStatus(ord.id, ord.deliveryStatus, e.target.value as PaymentStatus)
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold focus:outline-none border ${
                            ord.paymentStatus === 'Completed'
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          <option value="Completed">Completed</option>
                          <option value="Pending">Pending</option>
                          <option value="Failed">Failed</option>
                        </select>
                      </div>

                      {/* Delivery Status Dropdown */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Delivery Status</span>
                        <select
                          value={ord.deliveryStatus}
                          onChange={(e) =>
                            onUpdateOrderStatus(ord.id, e.target.value as DeliveryStatus, ord.paymentStatus)
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold focus:outline-none border ${
                            ord.deliveryStatus === 'Delivered'
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : ord.deliveryStatus === 'Crated & Dispatched'
                              ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Production">In Production</option>
                          <option value="Crated & Dispatched">Crated & Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: CLIENT CHATS DASHBOARD (SELECT CLIENT & PREVIOUS CHATS) */}
          {/* ============================================================== */}
          {activeTab === 'chats' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Client Concierge & Inquiry Dashboard</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Select any registered client from the left pane to review full previous chat dialogues and reply in real-time.
                </p>
              </div>

              {/* Split Screen Chat Dashboard */}
              <div className="rounded-2xl bg-[#0f101a] border border-white/[0.08] h-[640px] grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl">
                {/* Left Client Threads Panel */}
                <div className="md:col-span-4 border-r border-white/[0.08] flex flex-col bg-black/40">
                  <div className="p-3.5 border-b border-white/[0.08] text-xs font-semibold text-zinc-300 flex items-center justify-between">
                    <span>Registered Inquiries ({threads.length})</span>
                    <span className="text-[10px] font-mono text-purple-400">Synced</span>
                  </div>

                  <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                    {threads.map((thread) => {
                      const isSelected = thread.clientId === activeThreadClientId;
                      return (
                        <div
                          key={thread.clientId}
                          onClick={() => setActiveThreadClientId(thread.clientId)}
                          className={`p-3.5 cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-purple-500/20 border-l-4 border-purple-400'
                              : 'hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-white text-xs truncate">{thread.clientName}</p>
                            <span className="text-[10px] font-mono text-zinc-500">
                              {new Date(thread.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">{thread.clientCompany}</p>
                          <p className="text-[11px] text-zinc-500 line-clamp-1 mt-1 font-sans">{thread.lastMessage}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Conversation View */}
                <div className="md:col-span-8 flex flex-col h-full bg-[#090a10]">
                  {/* Active Client Chat Header */}
                  <div className="p-4 border-b border-white/[0.08] bg-black/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentActiveThread?.clientAvatar}
                        alt={currentActiveThread?.clientName}
                        className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-white">{currentActiveThread?.clientName}</h3>
                        <p className="text-[11px] text-zinc-400">
                          {currentActiveThread?.clientCompany} · {currentActiveThread?.clientEmail}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Active Inquirer
                    </span>
                  </div>

                  {/* Previous Messages Thread */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-[#090a10] to-[#06070a]">
                    {currentActiveThread?.messages.map((m: ChatMessage) => {
                      const isOwner = m.senderRole === 'admin';
                      return (
                        <div
                          key={m.id}
                          className={`flex flex-col ${isOwner ? 'items-end' : 'items-start'} max-w-xl ${
                            isOwner ? 'ml-auto' : 'mr-auto'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1 text-[11px] text-zinc-500">
                            <span className={isOwner ? 'text-amber-400 font-semibold' : 'text-zinc-300 font-medium'}>
                              {m.senderName}
                            </span>
                            <span>·</span>
                            <span className="font-mono">
                              {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div
                            className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 shadow-md ${
                              isOwner
                                ? 'bg-amber-500/20 text-white border border-amber-500/40 rounded-tr-sm'
                                : 'bg-[#141522] text-zinc-200 border border-white/10 rounded-tl-sm'
                            }`}
                          >
                            {m.productRef && (
                              <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex items-center gap-3">
                                <img
                                  src={m.productRef.image}
                                  alt={m.productRef.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                                <div>
                                  <p className="font-semibold text-xs text-white">{m.productRef.name}</p>
                                  <p className="text-[11px] font-mono text-amber-400">
                                    ${m.productRef.price.toLocaleString()} USD
                                  </p>
                                </div>
                              </div>
                            )}
                            <p className="whitespace-pre-wrap">{m.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick Canned Architectural Response Chips */}
                  <div className="px-4 py-2 bg-black/40 border-t border-white/[0.05] flex items-center gap-2 overflow-x-auto text-[11px]">
                    <span className="text-zinc-500 whitespace-nowrap">Quick Responses:</span>
                    <button
                      onClick={() =>
                        handleQuickCannedReply(
                          'We can mill those custom dimensions with reverse-thread 316 stainless tensioning barrels. Lead time is 4-5 weeks.'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 whitespace-nowrap"
                    >
                      Custom Dimensions
                    </button>
                    <button
                      onClick={() =>
                        handleQuickCannedReply(
                          'A material sample kit featuring solid American Walnut, Smoked Bronze Glass, and 316 steel has been dispatched.'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 whitespace-nowrap"
                    >
                      Dispatch Swatch Kit
                    </button>
                    <button
                      onClick={() =>
                        handleQuickCannedReply(
                          'White-glove crated delivery is scheduled with pneumatic air-ride suspension and indoor placement.'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 whitespace-nowrap"
                    >
                      White Glove Delivery
                    </button>
                  </div>

                  {/* Reply Form */}
                  <form
                    onSubmit={handleAdminSendReply}
                    className="p-4 bg-black/60 border-t border-white/[0.08] flex items-center gap-3"
                  >
                    <input
                      type="text"
                      placeholder={`Reply to ${currentActiveThread?.clientName} as Marcus Kern (Lixie Furnitures Director)...`}
                      value={adminReplyText}
                      onChange={(e) => setAdminReplyText(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      disabled={!adminReplyText.trim()}
                      className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-40 shadow-lg shadow-amber-400/20"
                    >
                      <Send className="w-4 h-4 text-zinc-950" />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================== */}
      {/* 3. EDIT PIECE DESCRIPTIONS & SPECS MODAL (IN & POST UPLOAD)     */}
      {/* ============================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#10111a] border border-white/15 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Edit Piece Descriptions & Specifications</h3>
                <p className="text-xs text-zinc-400">
                  Update descriptive copy, pricing, dimensions, and architectural specs for {editingProduct.name}.
                </p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 mb-1">Piece Title</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value as FurnitureProduct['category'],
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white"
                  >
                    <option value="Dining">Dining</option>
                    <option value="Seating">Seating</option>
                    <option value="Storage">Storage</option>
                    <option value="Living">Living</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Base Price ($ USD)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Lead Time (Weeks)</label>
                  <input
                    type="number"
                    value={editingProduct.leadTimeWeeks}
                    onChange={(e) => setEditingProduct({ ...editingProduct, leadTimeWeeks: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Editorial Kicker</label>
                  <input
                    type="text"
                    value={editingProduct.kicker}
                    onChange={(e) => setEditingProduct({ ...editingProduct, kicker: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Architectural Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Full Architectural Description Narrative</label>
                <textarea
                  rows={4}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Width (mm)</label>
                  <input
                    type="number"
                    value={editingProduct.dimensions.width}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        dimensions: { ...editingProduct.dimensions, width: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Depth (mm)</label>
                  <input
                    type="number"
                    value={editingProduct.dimensions.depth}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        dimensions: { ...editingProduct.dimensions, depth: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Height (mm)</label>
                  <input
                    type="number"
                    value={editingProduct.dimensions.height}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        dimensions: { ...editingProduct.dimensions, height: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Wood Material</label>
                  <input
                    type="text"
                    value={editingProduct.materials.wood}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        materials: { ...editingProduct.materials, wood: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Glass Material</label>
                  <input
                    type="text"
                    value={editingProduct.materials.glass}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        materials: { ...editingProduct.materials, glass: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Steel Material</label>
                  <input
                    type="text"
                    value={editingProduct.materials.steel}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        materials: { ...editingProduct.materials, steel: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white"
                  />
                </div>
              </div>

              {/* Product Photos Gallery in Edit Mode */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-zinc-400">
                    Piece Photographs ({(editingProduct.images || [editingProduct.image]).length} Angles)
                  </label>
                  <label className="cursor-pointer text-[11px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>+ Add More Angles</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          Array.from(files).forEach((file) => {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const result = reader.result as string;
                              setEditingProduct((prev) => {
                                if (!prev) return null;
                                const currentImgs = prev.images || [prev.image];
                                return {
                                  ...prev,
                                  images: [...currentImgs, result],
                                };
                              });
                            };
                            reader.readAsDataURL(file);
                          });
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto p-2 rounded-xl bg-black/40 border border-white/10">
                  {(editingProduct.images || [editingProduct.image]).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/15 shrink-0 group"
                    >
                      <img src={img} alt={`Edit img ${idx}`} className="w-full h-full object-cover" />
                      {(editingProduct.images || [editingProduct.image]).length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const currentImgs = editingProduct.images || [editingProduct.image];
                            const remaining = currentImgs.filter((_, i) => i !== idx);
                            setEditingProduct({
                              ...editingProduct,
                              images: remaining,
                              image: remaining[0] || editingProduct.image,
                            });
                          }}
                          className="absolute top-1 right-1 p-0.5 rounded-full bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl border border-white/15 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. CLIENT PURCHASES PROFILE SUMMARY MODAL                      */}
      {/* ============================================================== */}
      {selectedClientProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#10111a] border border-white/15 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedClientProfile.avatar}
                  alt={selectedClientProfile.name}
                  className="w-12 h-12 rounded-full object-cover border border-purple-500/40"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{selectedClientProfile.name}</h3>
                  <p className="text-xs text-zinc-400">
                    {selectedClientProfile.company} · {selectedClientProfile.city}, {selectedClientProfile.country}
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedClientProfile(null)} className="p-1.5 text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-black/40 p-4 rounded-xl border border-white/5">
              <div>
                <span className="text-zinc-500 text-[10px] block">Tier</span>
                <span className="text-purple-300 font-semibold">{selectedClientProfile.tier}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">Joined Date</span>
                <span className="text-white">{selectedClientProfile.joinedDate}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">Total Orders</span>
                <span className="text-white">{selectedClientProfile.totalPurchasesCount} orders</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">Lifetime Value</span>
                <span className="text-amber-400 font-bold">${selectedClientProfile.totalSpent.toLocaleString()} USD</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2">Itemized Purchases History</h4>
              {selectedClientProfile.purchases.length === 0 ? (
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-center text-xs text-zinc-500">
                  Client is in custom specification dialogue; no online cart checkout placed yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedClientProfile.purchases.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 bg-black/40 rounded-xl border border-white/10 text-xs flex justify-between items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-amber-400 font-semibold">{p.id}</span>
                          <span className="text-zinc-500">({p.date})</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/15 text-purple-300">
                            {p.paymentMethod}
                          </span>
                        </div>
                        <p className="text-zinc-300 mt-1">{p.items.map((i) => i.name).join(', ')}</p>
                      </div>
                      <div className="text-right font-mono">
                        <span className="font-bold text-white block">${p.total.toLocaleString()} USD</span>
                        <span className="text-[10px] text-emerald-400">{p.paymentStatus} · {p.deliveryStatus}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => handleSelectClientToChat(selectedClientProfile.id)}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4 text-zinc-950" />
                <span>Open Direct Chat with {selectedClientProfile.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. UPLOAD NEW PIECE MODAL                                      */}
      {/* ============================================================== */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#10111a] border border-white/15 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Upload New Architectural Design</h3>
                <p className="text-xs text-zinc-400">Add a new wooden, glass, and steel piece to the Lixie Furnitures catalog.</p>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="p-1.5 text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Solis Cantilever Console"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white"
                  >
                    <option value="Dining">Dining</option>
                    <option value="Seating">Seating</option>
                    <option value="Storage">Storage</option>
                    <option value="Living">Living</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Base Price ($ USD)</label>
                  <input
                    type="number"
                    value={uploadForm.price}
                    onChange={(e) => setUploadForm({ ...uploadForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Lead Time (Weeks)</label>
                  <input
                    type="number"
                    value={uploadForm.leadTimeWeeks}
                    onChange={(e) => setUploadForm({ ...uploadForm, leadTimeWeeks: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-zinc-400">Multiple Product Photographs ({uploadForm.images.length} Selected)</label>
                  <span className="text-[10px] font-mono text-purple-300">First image will serve as primary catalog cover</span>
                </div>

                {/* Multi-Image Action Bar */}
                <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-black/40 border border-white/10 mb-3">
                  <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium flex items-center gap-2 text-xs transition-colors shadow-md shadow-purple-600/20">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Multiple Images</span>
                    <input type="file" multiple accept="image/*" onChange={handleUploadMultipleImageFiles} className="hidden" />
                  </label>

                  <button
                    type="button"
                    onClick={() => handleAddPresetImage('/src/assets/images/hero_arch_furniture_1791740462910.jpg')}
                    className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs border border-white/5 transition-colors"
                  >
                    + Add Atelier Showroom Angle
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddPresetImage('/src/assets/images/prod_sculptural_coffee_table_1791740505199.jpg')}
                    className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs border border-white/5 transition-colors"
                  >
                    + Add Close-up Joinery Angle
                  </button>
                </div>

                {/* Multiple Images Thumbnail Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {uploadForm.images.map((imgUrl, imgIdx) => (
                    <div
                      key={imgIdx}
                      className={`relative rounded-xl overflow-hidden border bg-black/50 p-1 flex flex-col justify-between group ${
                        imgIdx === 0 ? 'border-amber-400 shadow-md shadow-amber-400/10' : 'border-white/15'
                      }`}
                    >
                      <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-zinc-900">
                        <img src={imgUrl} alt={`Uploaded ${imgIdx + 1}`} className="w-full h-full object-cover" />
                      </div>

                      <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] font-mono">
                        {imgIdx === 0 ? (
                          <span className="text-amber-400 font-bold uppercase tracking-wider">Primary Cover</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryUploadImage(imgIdx)}
                            className="text-zinc-400 hover:text-amber-300 underline"
                          >
                            Set Cover
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveUploadImage(imgIdx)}
                          className="p-1 text-zinc-400 hover:text-red-400 rounded transition-colors"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/15 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
