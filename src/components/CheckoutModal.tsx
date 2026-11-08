import React, { useState } from 'react';
import { CartItem, PaymentMethodType, CryptoCoin, MobileProvider, CommissionOrder } from '../types';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Download,
  Smartphone,
  ChevronRight,
  Sparkles,
  QrCode,
  Copy,
  Check,
  Coins,
  Globe,
  Wallet,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onPaymentSuccess: (newOrder: CommissionOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onPaymentSuccess,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const whiteGloveShipping = subtotal > 5000 ? 0 : 350;
  const estimatedTax = subtotal * 0.0825;
  const grandTotal = subtotal + whiteGloveShipping + estimatedTax;

  // Step state
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'confirmed'>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');

  // Multi-Payment Options State
  const [cryptoCoin, setCryptoCoin] = useState<CryptoCoin>('USDT (TRC20)');
  const [mobileProvider, setMobileProvider] = useState<MobileProvider>('Apple Pay');
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState('+1 (415) 890-3421');
  const [copiedWallet, setCopiedWallet] = useState(false);

  // Customer Details
  const [formData, setFormData] = useState({
    fullName: 'Julian Vance',
    email: 'julian@vanceloft.com',
    phone: '+1 (415) 890-3421',
    address: '428 Sansome Street, Penthouse 6',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94111',
    country: 'United States',
    installationNotes: 'Freight elevator reserved for 2.6m crating; wood floor protective mats requested.',
  });

  // Card details
  const [cardData, setCardData] = useState({
    cardNumber: '4242 8841 9012 8912',
    cardName: 'JULIAN VANCE',
    cardExpiry: '08/29',
    cardCvc: '884',
  });

  const [orderNumber] = useState(() => `LX-${Math.floor(100000 + Math.random() * 900000)}`);
  const [processStage, setProcessStage] = useState('Initiating cryptographic handshake...');

  // Wallet addresses for crypto options
  const walletAddresses: Record<CryptoCoin, string> = {
    'USDT (TRC20)': 'TXk8u4rT9mPnY8wZ7bC6eD5fA1s3vL2q9X',
    'Bitcoin (BTC)': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    'Ethereum (ETH)': '0x71C...B29a8f4c178E6e42b82A79C3',
    'Solana (SOL)': '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
  };

  const handleCopyWallet = () => {
    navigator.clipboard?.writeText(walletAddresses[cryptoCoin]);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  const executePayment = () => {
    setStep('processing');
    setProcessStage('Encrypting LIXIE FURNITURES escrow authorization...');

    setTimeout(() => {
      setProcessStage('Verifying white-glove crate insurance & master slot...');
    }, 1000);

    setTimeout(() => {
      setProcessStage('Settling gateway clearance & recording client profile...');
    }, 1900);

    setTimeout(() => {
      const confirmedOrder: CommissionOrder = {
        id: orderNumber,
        clientName: formData.fullName,
        clientEmail: formData.email,
        date: new Date().toISOString().split('T')[0],
        total: Math.round(grandTotal),
        paymentMethod,
        paymentDetails:
          paymentMethod === 'crypto'
            ? cryptoCoin
            : paymentMethod === 'mobile'
            ? `${mobileProvider} (${mobilePhoneNumber})`
            : paymentMethod === 'paypal'
            ? 'PayPal Express Verified'
            : `Card ending ${cardData.cardNumber.slice(-4)}`,
        paymentStatus: 'Completed',
        deliveryStatus: 'In Production',
        items: items.map((c) => ({
          name: c.product.name,
          quantity: c.quantity,
          wood: c.wood.name,
          glass: c.glass.name,
          steel: c.steel.name,
          price: c.product.price,
        })),
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
        notes: formData.installationNotes,
      };

      setStep('confirmed');
      onPaymentSuccess(confirmedOrder);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#d97706', '#ffffff', '#8b5cf6'],
        });
      } catch (err) {}
    }, 2800);
  };

  const handleDownloadInvoice = () => {
    const textContent = `
LIXIE FURNITURES — ATELIER ARCHITECTURAL COMMISSIONS
CONFIRMATION & PAYMENT CLEARANCE INVOICE
======================================================
Order Ref: ${orderNumber}
Date: ${new Date().toLocaleDateString()}
Client: ${formData.fullName}
Email: ${formData.email}
Delivery Destination:
${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}
Access Directives: ${formData.installationNotes}

PAYMENT METHOD & CLEARANCE:
------------------------------------------------------
Settlement Channel: ${paymentMethod.toUpperCase()}
Payment Status: COMPLETED (Verified via Escrow)
Delivery Status: IN PRODUCTION (Timber Seasoning)

COMMISSIONED FURNITURE SPECIFICATIONS:
------------------------------------------------------
${items
  .map(
    (i, idx) => `
0${idx + 1}. ${i.product.name} (Qty: ${i.quantity})
   - Hardwood: ${i.wood.name}
   - Glass: ${i.glass.name}
   - Structural Steel: ${i.steel.name}
   - Dimensions: ${i.product.dimensions.width}W x ${i.product.dimensions.depth}D x ${i.product.dimensions.height}H mm
   - Net Mass: ${i.product.weightKg} kg each
   - Amount: $${(i.product.price * i.quantity).toLocaleString()} USD
`
  )
  .join('\n')}
------------------------------------------------------
Subtotal: $${subtotal.toLocaleString()} USD
White-Glove Insured Freight: ${whiteGloveShipping === 0 ? 'COMPLIMENTARY' : `$${whiteGloveShipping} USD`}
Architectural Sales Tax: $${Math.round(estimatedTax).toLocaleString()} USD
TOTAL PAID IN FULL: $${Math.round(grandTotal).toLocaleString()} USD
======================================================
Lixie Furnitures Atelier | Handcrafted Wooden, Glass & Steel Pieces
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Lixie_Furnitures_${orderNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#101217] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-white tracking-wider font-display">LIXIE FURNITURES</span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-amber-400 font-mono">Multi-Channel Payment Checkout</span>
          </div>

          {step !== 'processing' && (
            <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* STEP 1: CLIENT DELIVERY DOSSIER */}
          {step === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Delivery & Client Dossier</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    White-glove uncrating, room-of-choice placement, and hardware calibration included.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2">
                    <label className="block text-zinc-400 mb-1">Full Client / Architect Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-zinc-400 mb-1">Residence / Project Street Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-zinc-400 mb-1">White-Glove Installation Directives</label>
                    <textarea
                      rows={2}
                      value={formData.installationNotes}
                      onChange={(e) => setFormData({ ...formData, installationNotes: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full py-3 px-6 rounded-xl font-medium text-sm text-zinc-950 bg-white hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Select Payment Channel (Card, Mobile, PayPal, Crypto)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Summary */}
              <div className="lg:col-span-5 p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-3">
                    Commissioned Items ({items.length})
                  </h3>
                  <div className="space-y-3 divide-y divide-white/5">
                    {items.map((it) => (
                      <div key={it.cartItemId} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs">
                        <div className="pr-2">
                          <p className="font-semibold text-white truncate max-w-[180px]">{it.product.name}</p>
                          <p className="text-[11px] text-zinc-400">{it.wood.name} / {it.steel.name}</p>
                        </div>
                        <span className="font-mono text-zinc-200">${(it.product.price * it.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>White-Glove Crated Delivery</span>
                    <span className="text-emerald-400 font-mono">
                      {whiteGloveShipping === 0 ? 'Complimentary' : `$${whiteGloveShipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Tax (8.25%)</span>
                    <span className="font-mono text-white">${Math.round(estimatedTax).toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white text-sm">
                    <span>Total Due</span>
                    <span className="font-mono text-amber-400 text-base">${Math.round(grandTotal).toLocaleString()} USD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MULTI-PAYMENT CHANNELS (Card, Mobile, PayPal, Crypto) */}
          {step === 'payment' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Select Payment Method</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Choose from mobile payments, credit/debit card, PayPal, or decentralized crypto escrow.
                  </p>
                </div>

                {/* 4 Multi-Payment Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-amber-400 bg-amber-500/10 text-white'
                        : 'border-white/10 bg-black/30 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-semibold">Credit/Debit</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('mobile')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'mobile'
                        ? 'border-amber-400 bg-amber-500/10 text-white'
                        : 'border-white/10 bg-black/30 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-sky-400" />
                    <span className="text-xs font-semibold">Mobile Pay</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-amber-400 bg-amber-500/10 text-white'
                        : 'border-white/10 bg-black/30 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs font-semibold">PayPal</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'crypto'
                        ? 'border-amber-400 bg-amber-500/10 text-white'
                        : 'border-white/10 bg-black/30 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Coins className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-semibold">Crypto Web3</span>
                  </button>
                </div>

                {/* 1. CREDIT/DEBIT CARD */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 text-xs bg-black/30 p-4 rounded-xl border border-white/10">
                    <div>
                      <label className="block text-zinc-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="block text-zinc-400 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardData.cardName}
                          onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardData.cardExpiry}
                          onChange={(e) => setCardData({ ...cardData, cardExpiry: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. MOBILE PAYMENT (Apple Pay, Google Pay, M-Pesa) */}
                {paymentMethod === 'mobile' && (
                  <div className="space-y-4 bg-black/30 p-4 rounded-xl border border-white/10 text-xs">
                    <div>
                      <label className="block text-zinc-400 mb-1.5">Select Mobile Payment Provider</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Apple Pay', 'Google Pay', 'M-Pesa / Mobile Wallet'] as MobileProvider[]).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setMobileProvider(p)}
                            className={`p-2.5 rounded-lg border text-center transition-colors ${
                              mobileProvider === p
                                ? 'border-sky-400 bg-sky-500/10 text-white font-bold'
                                : 'border-white/10 text-zinc-400 hover:text-white'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">Registered Mobile Number</label>
                      <input
                        type="tel"
                        value={mobilePhoneNumber}
                        onChange={(e) => setMobilePhoneNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-white font-mono"
                      />
                      <p className="text-[11px] text-zinc-500 mt-1">
                        A secure biometric one-touch push notification or STK push will be triggered to this phone.
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. PAYPAL */}
                {paymentMethod === 'paypal' && (
                  <div className="p-6 bg-black/30 rounded-xl border border-white/10 text-center space-y-3">
                    <Globe className="w-10 h-10 text-indigo-400 mx-auto" />
                    <h3 className="text-sm font-bold text-white">PayPal Express Checkout Ready</h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      You will authorize ${Math.round(grandTotal).toLocaleString()} USD through your linked PayPal wallet with buyer purchase protection.
                    </p>
                  </div>
                )}

                {/* 4. CRYPTOCURRENCY WEB3 ESCROW */}
                {paymentMethod === 'crypto' && (
                  <div className="space-y-4 bg-black/30 p-4 rounded-xl border border-white/10 text-xs">
                    <div>
                      <label className="block text-zinc-400 mb-1.5">Select Settlement Cryptocurrency</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['USDT (TRC20)', 'Bitcoin (BTC)', 'Ethereum (ETH)', 'Solana (SOL)'] as CryptoCoin[]).map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCryptoCoin(c)}
                            className={`p-2 rounded-lg border text-center transition-colors ${
                              cryptoCoin === c
                                ? 'border-emerald-400 bg-emerald-500/10 text-white font-bold'
                                : 'border-white/10 text-zinc-400 hover:text-white'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-black/60 rounded-xl border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-zinc-400">Atelier Escrow Vault Address:</span>
                        <button
                          type="button"
                          onClick={handleCopyWallet}
                          className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-mono"
                        >
                          {copiedWallet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedWallet ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="font-mono text-zinc-200 text-[11px] break-all bg-zinc-900/80 p-2 rounded border border-white/5">
                        {walletAddresses[cryptoCoin]}
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        Transfer the exact equivalent of ${Math.round(grandTotal).toLocaleString()} USD. Clearance detected in ~15 seconds.
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setStep('details')}
                    className="px-4 py-3 rounded-xl border border-white/15 text-xs text-zinc-300 hover:text-white"
                  >
                    Back
                  </button>

                  <button
                    onClick={executePayment}
                    className="flex-1 py-3 px-6 rounded-xl font-bold text-sm text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize ${Math.round(grandTotal).toLocaleString()} USD via {paymentMethod.toUpperCase()}</span>
                  </button>
                </div>
              </div>

              {/* Right: Live Payment Trust Badge */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center">
                <div className="w-full max-w-sm rounded-2xl p-6 bg-gradient-to-tr from-[#161a22] to-[#252c38] border border-white/20 shadow-2xl relative flex flex-col justify-between text-white space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold tracking-widest text-sm text-amber-300">
                      LIXIE FURNITURES
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                      {paymentMethod.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-400 block">Total Authorization</span>
                    <p className="font-mono text-2xl font-bold text-white tabular-nums">
                      ${Math.round(grandTotal).toLocaleString()} USD
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-xs text-zinc-300 space-y-1">
                    <p>Client: {formData.fullName}</p>
                    <p className="text-zinc-500 text-[11px] truncate">Channel: {paymentMethod === 'crypto' ? cryptoCoin : paymentMethod === 'mobile' ? mobileProvider : paymentMethod.toUpperCase()}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified 256-Bit Escrow Vault Protocol</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PROCESSING OVERLAY */}
          {step === 'processing' && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-amber-400 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white">Clearing High-Value Atelier Payment</h3>
              <p className="text-xs text-amber-300 font-mono animate-pulse">{processStage}</p>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMED */}
          {step === 'confirmed' && (
            <div className="py-8 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                  Payment Status: Completed · Production Queued
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Commission Confirmed, {formData.fullName}
                </h2>
                <p className="text-sm text-zinc-300 mt-2 max-w-lg mx-auto">
                  Your pieces have entered production under Reference{' '}
                  <span className="font-mono text-white font-semibold">{orderNumber}</span>.
                </p>
              </div>

              {/* Dossier Card */}
              <div className="w-full p-6 rounded-2xl bg-black/60 border border-white/10 text-left space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Order Ref</span>
                    <span className="text-white font-medium">{orderNumber}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Payment Status</span>
                    <span className="text-emerald-400 font-medium">COMPLETED</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Delivery Status</span>
                    <span className="text-amber-400 font-medium">IN PRODUCTION</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Payment Method</span>
                    <span className="text-white font-medium uppercase">{paymentMethod}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  {items.map((it) => (
                    <div key={it.cartItemId} className="flex justify-between text-zinc-300">
                      <span>{it.quantity}x {it.product.name} ({it.wood.name} / {it.steel.name})</span>
                      <span>${(it.product.price * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                <button
                  onClick={handleDownloadInvoice}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-xs transition-colors shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Spec Sheet & Pro-Forma Invoice</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white font-medium text-xs transition-colors"
                >
                  Return to Atelier Collection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
