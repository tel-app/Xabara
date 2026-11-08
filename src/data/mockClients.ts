import { ClientProfile, ClientConversationThread, CommissionOrder } from '../types';

export const INITIAL_CLIENTS: ClientProfile[] = [
  {
    id: 'client-julian',
    name: 'Julian Vance',
    email: 'julian@vanceloft.com',
    phone: '+1 (415) 890-3421',
    company: 'Vance Loft Architects',
    tier: 'VIP Platinum',
    joinedDate: 'Jan 14, 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    totalPurchasesCount: 4,
    totalSpent: 26800,
    lastActive: '10 mins ago',
    country: 'United States',
    city: 'San Francisco',
    purchases: [
      {
        id: 'VK-849102',
        clientName: 'Julian Vance',
        clientEmail: 'julian@vanceloft.com',
        date: '2026-10-08',
        total: 10300,
        paymentMethod: 'card',
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
        notes: 'Freight elevator access reserved.',
      },
      {
        id: 'VK-620194',
        clientName: 'Julian Vance',
        clientEmail: 'julian@vanceloft.com',
        date: '2026-06-22',
        total: 16500,
        paymentMethod: 'crypto',
        paymentDetails: 'USDT (TRC20)',
        paymentStatus: 'Completed',
        deliveryStatus: 'Delivered',
        items: [
          {
            name: 'Monolith Modular Credenza',
            quantity: 2,
            wood: 'American Walnut',
            glass: 'Fluted Reeded Glass',
            steel: 'Blackened Patina',
            price: 8250,
          },
        ],
        shippingAddress: '428 Sansome St, Penthouse 6, San Francisco CA',
      },
    ],
  },
  {
    id: 'client-claire',
    name: 'Claire Dubois',
    email: 'c.dubois@studioparis.fr',
    phone: '+33 1 42 68 55 00',
    company: 'Studio Dubois Paris',
    tier: 'Architect Partner',
    joinedDate: 'Mar 02, 2024',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    totalPurchasesCount: 2,
    totalSpent: 16400,
    lastActive: '2 hours ago',
    country: 'France',
    city: 'Paris',
    purchases: [
      {
        id: 'VK-712940',
        clientName: 'Claire Dubois',
        clientEmail: 'c.dubois@studioparis.fr',
        date: '2026-10-02',
        total: 8200,
        paymentMethod: 'paypal',
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
    ],
  },
  {
    id: 'client-sophia',
    name: 'Sophia Lin',
    email: 'sophia@linoak.design',
    phone: '+1 (206) 555-8910',
    company: 'Lin Design Collective',
    tier: 'VIP Platinum',
    joinedDate: 'Nov 19, 2023',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    totalPurchasesCount: 5,
    totalSpent: 34200,
    lastActive: '1 day ago',
    country: 'United States',
    city: 'Seattle',
    purchases: [
      {
        id: 'VK-930412',
        clientName: 'Sophia Lin',
        clientEmail: 'sophia@linoak.design',
        date: '2026-09-15',
        total: 13700,
        paymentMethod: 'mobile',
        paymentDetails: 'Apple Pay',
        paymentStatus: 'Completed',
        deliveryStatus: 'Delivered',
        items: [
          {
            name: 'Kronos Trestle Dining Table',
            quantity: 2,
            wood: 'Nordic White Ash',
            glass: 'Ultra-Clear Fluted',
            steel: 'Champagne Nickel',
            price: 6850,
          },
        ],
        shippingAddress: '1201 3rd Ave, Suite 440, Seattle WA',
      },
    ],
  },
  {
    id: 'client-marcus-thorne',
    name: 'Marcus Thorne',
    email: 'm.thorne@thorneinteriors.co.uk',
    phone: '+44 20 7946 0912',
    company: 'Thorne Interiors Mayfair',
    tier: 'Commercial Developer',
    joinedDate: 'Feb 10, 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    totalPurchasesCount: 3,
    totalSpent: 19800,
    lastActive: '3 hours ago',
    country: 'United Kingdom',
    city: 'London',
    purchases: [
      {
        id: 'VK-558291',
        clientName: 'Marcus Thorne',
        clientEmail: 'm.thorne@thorneinteriors.co.uk',
        date: '2026-10-10',
        total: 9200,
        paymentMethod: 'card',
        paymentStatus: 'Pending',
        deliveryStatus: 'Pending',
        items: [
          {
            name: 'Strata Sculptural Coffee Table',
            quantity: 2,
            wood: 'American Walnut',
            glass: 'Clear Disk',
            steel: 'Brushed Steel Cylinder',
            price: 4600,
          },
        ],
        shippingAddress: '8 Berkeley Square, Mayfair, London W1J 6ER',
      },
    ],
  },
  {
    id: 'client-elena',
    name: 'Elena Rostova',
    email: 'elena@nordicresidences.se',
    phone: '+46 8 123 4567',
    company: 'Nordic Timber Residences',
    tier: 'Architect Partner',
    joinedDate: 'Apr 28, 2024',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    totalPurchasesCount: 2,
    totalSpent: 11650,
    lastActive: '5 hours ago',
    country: 'Sweden',
    city: 'Stockholm',
    purchases: [],
  },
  {
    id: 'client-david',
    name: 'David Sterling',
    email: 'david@sterlingcap.com',
    phone: '+1 (212) 555-4921',
    company: 'Sterling Capital Assets',
    tier: 'Commercial Developer',
    joinedDate: 'May 12, 2024',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    totalPurchasesCount: 6,
    totalSpent: 48900,
    lastActive: 'Just now',
    country: 'United States',
    city: 'New York',
    purchases: [],
  },
];

// Helper to simulate 5,000+ scalable client user directory
export function generateScalableClients(count = 5420): ClientProfile[] {
  const base = [...INITIAL_CLIENTS];
  const cities = ['New York', 'London', 'Tokyo', 'Zurich', 'Milan', 'Los Angeles', 'Berlin', 'Dubai', 'Singapore', 'Copenhagen', 'Toronto', 'Sydney'];
  const countries = ['United States', 'United Kingdom', 'Japan', 'Switzerland', 'Italy', 'Germany', 'UAE', 'Singapore', 'Denmark', 'Canada', 'Australia'];
  const firstNames = ['Liam', 'Emma', 'Oliver', 'Charlotte', 'Amelia', 'James', 'Alexander', 'Isabella', 'Benjamin', 'Mia', 'Henry', 'Evelyn', 'Lucas', 'Harper', 'Sebastian'];
  const lastNames = ['Kaufmann', 'Mendoza', 'Sato', 'Vogel', 'Moretti', 'Lindqvist', 'Al-Mansoor', 'Chen', 'Dupont', 'Blackwood', 'Nakamura', 'Hansen', 'Castillo'];
  const tiers: ClientProfile['tier'][] = ['VIP Platinum', 'Architect Partner', 'Private Client', 'Commercial Developer'];
  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
  ];

  for (let i = base.length; i < 75; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const city = cities[i % cities.length];
    const country = countries[i % countries.length];
    const spend = Math.floor(6500 + (i * 840) % 68000);
    const purchasesCount = Math.floor(1 + (i % 5));
    const clientId = `client-${i + 100}`;
    const clientName = `${fn} ${ln}`;
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@architects.io`;

    const samplePurchases: CommissionOrder[] = [
      {
        id: `LX-${400000 + i * 17}`,
        clientName,
        clientEmail: email,
        date: `2026-0${(i % 9) + 1}-14`,
        total: Math.round(spend / purchasesCount),
        paymentMethod: (['card', 'crypto', 'mobile', 'paypal'] as const)[i % 4],
        paymentStatus: i % 3 === 0 ? 'Pending' : 'Completed',
        deliveryStatus: i % 2 === 0 ? 'Delivered' : 'In Production',
        items: [
          {
            name: i % 2 === 0 ? 'Kronos Trestle Dining Table' : 'Monolith Modular Credenza',
            quantity: 1,
            wood: 'American Black Walnut',
            glass: 'Smoked Bronze Tempered Glass',
            steel: 'Marine-Grade 316 Stainless',
            price: Math.round(spend / purchasesCount),
          },
        ],
        shippingAddress: `${100 + i} Grand Ave, Suite ${(i % 20) + 1}, ${city}, ${country}`,
      },
    ];

    base.push({
      id: clientId,
      name: clientName,
      email,
      phone: `+1 (555) ${100 + i}-${2000 + i}`,
      company: `${ln} & Partners Atelier`,
      tier: tiers[i % tiers.length],
      joinedDate: `2024-0${(i % 9) + 1}-15`,
      avatar: avatars[i % avatars.length],
      totalPurchasesCount: purchasesCount,
      totalSpent: spend,
      lastActive: `${(i % 24) + 1}h ago`,
      country,
      city,
      purchases: samplePurchases,
    });
  }

  return base;
}

// Initial Client Conversation Threads for the Admin Chat Dashboard
export const INITIAL_CONVERSATION_THREADS: ClientConversationThread[] = [
  {
    clientId: 'client-julian',
    clientName: 'Julian Vance',
    clientEmail: 'julian@vanceloft.com',
    clientCompany: 'Vance Loft Architects',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    unreadCount: 0,
    lastMessage: 'The 19mm smoked glass is cut as a single monolithic float panel.',
    lastTimestamp: Date.now() - 1800000,
    messages: [
      {
        id: 'msg-j1',
        senderId: 'admin-marcus',
        senderName: 'LIXIE FURNITURES Master Atelier',
        senderRole: 'admin',
        timestamp: Date.now() - 3600000 * 4,
        text: 'Welcome to LIXIE FURNITURES. I am Marcus Kern, lead director. If you have custom dimension requests or timber seasoning queries, please reach out directly here.',
      },
      {
        id: 'msg-j2',
        senderId: 'client-julian',
        senderName: 'Julian Vance (Architect)',
        senderRole: 'client',
        timestamp: Date.now() - 3600000 * 3,
        text: 'Hello Marcus, we are specifying the Kronos Trestle Dining Table for our Sansome Street project. Can the American Walnut trestle base span 3200mm for 12 guests?',
        productRef: {
          id: 'kronos-dining-table',
          name: 'Kronos Trestle Dining Table',
          image: '/src/assets/images/prod_arch_dining_table_1791740474537.jpg',
          price: 6850,
        },
      },
      {
        id: 'msg-j3',
        senderId: 'admin-marcus',
        senderName: 'Marcus Kern (Owner)',
        senderRole: 'admin',
        timestamp: Date.now() - 3600000 * 2,
        text: 'Absolutely Julian. For 3200mm spans, we engineer an additional central reverse-thread turnbuckle in 316 stainless steel to eliminate mid-span deflection. The 19mm smoked glass is cut as a single monolithic float panel.',
      },
      {
        id: 'msg-j4',
        senderId: 'client-julian',
        senderName: 'Julian Vance (Architect)',
        senderRole: 'client',
        timestamp: Date.now() - 3600000,
        text: 'That is outstanding engineering. We have completed the authorization via our corporate card. Please dispatch the finish swatches for client signoff.',
      },
    ],
  },
  {
    clientId: 'client-claire',
    clientName: 'Claire Dubois',
    clientEmail: 'c.dubois@studioparis.fr',
    clientCompany: 'Studio Dubois Paris',
    clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    unreadCount: 1,
    lastMessage: 'Are the fluted glass panels on the Monolith Credenza laminated for acoustics?',
    lastTimestamp: Date.now() - 3600000 * 5,
    messages: [
      {
        id: 'msg-c1',
        senderId: 'client-claire',
        senderName: 'Claire Dubois',
        senderRole: 'client',
        timestamp: Date.now() - 3600000 * 6,
        text: 'Bonjour Marcus, are the fluted glass panels on the Monolith Credenza laminated for acoustic isolation in a high-end audio listening salon?',
        productRef: {
          id: 'monolith-modular-credenza',
          name: 'Monolith Modular Credenza',
          image: '/src/assets/images/prod_modular_credenza_1791740495107.jpg',
          price: 8200,
        },
      },
    ],
  },
  {
    clientId: 'client-sophia',
    clientName: 'Sophia Lin',
    clientEmail: 'sophia@linoak.design',
    clientCompany: 'Lin Design Collective',
    clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    unreadCount: 0,
    lastMessage: 'Thank you! The delivery crate was placed seamlessly in our penthouse salon.',
    lastTimestamp: Date.now() - 86400000,
    messages: [
      {
        id: 'msg-s1',
        senderId: 'client-sophia',
        senderName: 'Sophia Lin',
        senderRole: 'client',
        timestamp: Date.now() - 86400000 * 2,
        text: 'Marcus, could you confirm when the white-glove carrier reaches Seattle for our two Kronos tables?',
      },
      {
        id: 'msg-s2',
        senderId: 'admin-marcus',
        senderName: 'Marcus Kern (Owner)',
        senderRole: 'admin',
        timestamp: Date.now() - 86400000 * 1.5,
        text: 'Sophia, tracking indicates delivery arrival tomorrow at 10:00 AM PST. The crew is equipped with laser leveling tools.',
      },
      {
        id: 'msg-s3',
        senderId: 'client-sophia',
        senderName: 'Sophia Lin',
        senderRole: 'client',
        timestamp: Date.now() - 86400000,
        text: 'Thank you! The delivery crate was placed seamlessly in our penthouse salon.',
      },
    ],
  },
  {
    clientId: 'client-marcus-thorne',
    clientName: 'Marcus Thorne',
    clientEmail: 'm.thorne@thorneinteriors.co.uk',
    clientCompany: 'Thorne Interiors Mayfair',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    unreadCount: 1,
    lastMessage: 'We would like to settle payment via Crypto (USDT) or Bank Wire for the two Strata coffee tables.',
    lastTimestamp: Date.now() - 3600000 * 2,
    messages: [
      {
        id: 'msg-m1',
        senderId: 'client-marcus-thorne',
        senderName: 'Marcus Thorne',
        senderRole: 'client',
        timestamp: Date.now() - 3600000 * 2,
        text: 'We would like to settle payment via Crypto (USDT) or Bank Wire for the two Strata coffee tables.',
        productRef: {
          id: 'strata-sculptural-coffee-table',
          name: 'Strata Sculptural Coffee Table',
          image: '/src/assets/images/prod_sculptural_coffee_table_1791740505199.jpg',
          price: 4600,
        },
      },
    ],
  },
];
