export type WoodFinishId = 'walnut' | 'smoked_oak' | 'white_ash';
export type GlassFinishId = 'smoked_bronze' | 'clear_fluted' | 'frosted_mist';
export type SteelFinishId = 'brushed_steel' | 'blackened_patina' | 'champagne_nickel';

export interface WoodOption {
  id: WoodFinishId;
  name: string;
  subname: string;
  color: string;
  roughness: number;
  description: string;
  origin: string;
}

export interface GlassOption {
  id: GlassFinishId;
  name: string;
  subname: string;
  color: string;
  opacity: number;
  transmission: number;
  roughness: number;
  description: string;
  thickness: string;
}

export interface SteelOption {
  id: SteelFinishId;
  name: string;
  subname: string;
  color: string;
  metalness: number;
  roughness: number;
  description: string;
  grade: string;
}

export interface ProductDimensions {
  width: number; // mm
  depth: number; // mm
  height: number; // mm
}

export interface FurnitureProduct {
  id: string;
  name: string;
  kicker: string;
  category: 'Dining' | 'Seating' | 'Storage' | 'Living';
  price: number;
  image: string;
  images?: string[];
  tagline: string;
  description: string;
  dimensions: ProductDimensions;
  weightKg: number;
  leadTimeWeeks: number;
  materials: {
    wood: string;
    glass: string;
    steel: string;
  };
  architecturalDetails: {
    joinery: string;
    tensileHardware: string;
    loadRating: string;
    environmentalFSC: string;
  };
  features: string[];
}

export interface CartItem {
  cartItemId: string;
  product: FurnitureProduct;
  wood: WoodOption;
  glass: GlassOption;
  steel: SteelOption;
  quantity: number;
  customEngraving?: string;
}

// Authentication & Accounts
export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title?: string;
  company?: string;
  phone?: string;
  avatar?: string;
}

// Payment Methods
export type PaymentMethodType = 'card' | 'mobile' | 'paypal' | 'crypto';
export type CryptoCoin = 'USDT (TRC20)' | 'Bitcoin (BTC)' | 'Ethereum (ETH)' | 'Solana (SOL)';
export type MobileProvider = 'Apple Pay' | 'Google Pay' | 'M-Pesa / Mobile Wallet';

export type PaymentStatus = 'Pending' | 'Completed' | 'Failed';
export type DeliveryStatus = 'Pending' | 'In Production' | 'Crated & Dispatched' | 'Delivered';

// Order / Purchase
export interface CommissionOrder {
  id: string;
  clientName: string;
  clientEmail: string;
  date: string;
  total: number;
  paymentMethod: PaymentMethodType;
  paymentDetails?: string;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  items: {
    name: string;
    quantity: number;
    wood: string;
    glass: string;
    steel: string;
    price: number;
  }[];
  shippingAddress: string;
  notes?: string;
}

// Client Profile in 5,000+ User Directory
export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  tier: 'VIP Platinum' | 'Architect Partner' | 'Private Client' | 'Commercial Developer';
  joinedDate: string;
  avatar: string;
  totalPurchasesCount: number;
  totalSpent: number;
  lastActive: string;
  country: string;
  city: string;
  purchases: CommissionOrder[];
}

// Chat between Clients and Admin
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId?: string;
  timestamp: number;
  text: string;
  productRef?: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
}

export interface ClientConversationThread {
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientAvatar: string;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: number;
  messages: ChatMessage[];
}
