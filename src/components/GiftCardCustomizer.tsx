import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Gift,
  Check,
  RefreshCw,
  Heart,
  Palette
} from 'lucide-react';

interface GiftCardCustomizerProps {
  onExploreFullPage?: () => void;
  showExploreButton?: boolean;
}

export const GiftCardCustomizer: React.FC<GiftCardCustomizerProps> = ({
  onExploreFullPage,
  showExploreButton = false,
}) => {
  const PRESET_AMOUNTS = [50, 100, 150, 250, 500];
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [cardTheme, setCardTheme] = useState<'obsidian' | 'champagne'>('obsidian');

  // Interactive 3D Card tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  // Fresha verified partner booking URL for gift cards
  const FRESHA_GIFT_CARDS_URL =
    'https://www.fresha.com/a/lume-hair-studio-new-york-mercer-street';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    const rotateX = -(y / card.height) * 14;
    const rotateY = (x / card.width) * 14;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handlePresetClick = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) {
      setSelectedAmount(0);
    } else {
      setSelectedAmount(100);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Interactive 3D Gift Card Stage */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          {/* Card Theme Switcher */}
          <div className="flex items-center space-x-2 mb-4 bg-white/70 p-1 border border-[#24201D]/10 rounded-full shadow-xs">
            <span className="text-[11px] uppercase tracking-wider text-[#756B63] px-2 font-medium flex items-center gap-1">
              <Palette className="w-3 h-3 text-[#B98272]" />
              <span>Finish:</span>
            </span>
            <button
              type="button"
              onClick={() => setCardTheme('obsidian')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                cardTheme === 'obsidian'
                  ? 'bg-[#24201D] text-[#EDE5DC] shadow-xs'
                  : 'text-[#24201D] hover:bg-[#EDE5DC]/50'
              }`}
            >
              Noir Obsidian
            </button>
            <button
              type="button"
              onClick={() => setCardTheme('champagne')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                cardTheme === 'champagne'
                  ? 'bg-[#B98272] text-white shadow-xs'
                  : 'text-[#24201D] hover:bg-[#EDE5DC]/50'
              }`}
            >
              Champagne Silk
            </button>
          </div>

          {/* 3D Perspective Stage */}
          <div
            className="w-full max-w-md aspect-16/10 perspective-1000 py-2 select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`relative w-full h-full rounded-2xl p-6 sm:p-7 shadow-2xl transition-transform duration-200 ease-out border flex flex-col justify-between overflow-hidden ${
                cardTheme === 'obsidian'
                  ? 'bg-gradient-to-br from-[#2D2825] via-[#24201D] to-[#171413] border-[#EDE5DC]/25 text-[#EDE5DC]'
                  : 'bg-gradient-to-br from-[#FAF7F2] via-[#EDE5DC] to-[#DECFC1] border-[#B98272]/30 text-[#24201D]'
              }`}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Subtle Luxury Card Background Shimmer */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)',
                }}
              />
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />

              {/* Card Top: Brand and Chip Badge */}
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-normal">
                      LUMÉ
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                        cardTheme === 'obsidian'
                          ? 'border-[#B98272] text-[#B98272]'
                          : 'border-[#8A5243] text-[#8A5243]'
                      }`}
                    >
                      SoHo · NY
                    </span>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-[0.25em] block mt-0.5 ${
                      cardTheme === 'obsidian' ? 'text-[#EDE5DC]/70' : 'text-[#756B63]'
                    }`}
                  >
                    HAIR ARTISTRY VOUCHER
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-8 h-6 rounded-sm bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] opacity-80 border border-white/30 shadow-xs flex items-center justify-center">
                    <div className="w-4 h-3 border-y border-white/40" />
                  </div>
                  <Gift
                    className={`w-5 h-5 ${
                      cardTheme === 'obsidian' ? 'text-[#D4AF37]' : 'text-[#B98272]'
                    }`}
                  />
                </div>
              </div>

              {/* Card Center: Dynamic Recipient & Sentiment */}
              <div className="relative z-10 my-auto py-2">
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] block mb-0.5 ${
                    cardTheme === 'obsidian' ? 'text-[#EDE5DC]/60' : 'text-[#756B63]'
                  }`}
                >
                  PRESENTED TO
                </span>
                <div className="font-serif text-xl sm:text-2xl font-normal truncate min-h-[32px]">
                  {recipientName.trim() ? (
                    <span className="italic">{recipientName}</span>
                  ) : (
                    <span className="opacity-45 italic">Someone beloved</span>
                  )}
                </div>

                {message.trim() && (
                  <p
                    className={`text-xs mt-1 italic font-light line-clamp-2 ${
                      cardTheme === 'obsidian' ? 'text-[#EDE5DC]/85' : 'text-[#50463E]'
                    }`}
                  >
                    “{message}”
                  </p>
                )}
              </div>

              {/* Card Bottom: Amount and Authentication Code */}
              <div className="relative z-10 flex items-end justify-between pt-2 border-t border-current/15">
                <div>
                  <span
                    className={`text-[9px] uppercase tracking-[0.2em] block ${
                      cardTheme === 'obsidian' ? 'text-[#EDE5DC]/60' : 'text-[#756B63]'
                    }`}
                  >
                    CARD VALUE
                  </span>
                  <div className="font-inter font-bold text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                    ${activeAmount > 0 ? activeAmount : 0}
                    <span className="text-xs font-normal opacity-70 ml-1">USD</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono text-[9px] uppercase tracking-wider block ${
                      cardTheme === 'obsidian' ? 'text-[#EDE5DC]/50' : 'text-[#756B63]'
                    }`}
                  >
                    SERIAL · CERTIFIED
                  </span>
                  <span className="font-mono text-xs opacity-75">
                    LM-GF-{String(activeAmount || 100).padStart(3, '0')}X
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#756B63] mt-3 italic font-light text-center">
            Interactive real-time 3D simulation · Hover or tilt to inspect voucher
          </p>
        </div>

        {/* Right Column: Customization Controls Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 border border-[#24201D]/15 shadow-sm">
          <div className="mb-6 pb-4 border-b border-[#24201D]/10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B98272] font-semibold block mb-1">
              PERSONALIZE & ORDER
            </span>
            <h3 className="font-serif font-normal text-2xl sm:text-3xl text-[#24201D]">
              Select Amount & Sentiment
            </h3>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* Amount Selection Pills */}
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] font-semibold text-[#24201D] mb-2">
                1. Choose Voucher Amount (USD)
              </label>
              <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                {PRESET_AMOUNTS.map((amt) => {
                  const isSelected = selectedAmount === amt && !customAmount;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handlePresetClick(amt)}
                      className={`py-2.5 sm:py-3 text-xs sm:text-sm font-inter font-bold transition-all cursor-pointer border text-center ${
                        isSelected
                          ? 'bg-[#24201D] text-[#EDE5DC] border-[#24201D] shadow-xs'
                          : 'bg-[#F7F3EE] hover:bg-[#EDE5DC] text-[#24201D] border-[#24201D]/15'
                      }`}
                    >
                      ${amt}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Input Option */}
              <div className="mt-2.5 flex items-center space-x-2">
                <span className="text-xs text-[#756B63]">Or enter custom:</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#756B63]">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount (e.g. 175)"
                    className="w-full pl-6 pr-3 py-2 text-xs bg-[#F7F3EE] border border-[#24201D]/15 focus:border-[#24201D] focus:bg-white outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Recipient Name Field */}
            <div>
              <label
                htmlFor="recipientName"
                className="block text-xs uppercase tracking-[0.16em] font-semibold text-[#24201D] mb-1.5"
              >
                2. Who is it for?
              </label>
              <input
                id="recipientName"
                type="text"
                maxLength={28}
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Recipient's Name (e.g. Sophia, Camille)"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F7F3EE] border border-[#24201D]/15 focus:border-[#24201D] focus:bg-white outline-none transition-colors"
              />
            </div>

            {/* Personal Message Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="cardMessage"
                  className="block text-xs uppercase tracking-[0.16em] font-semibold text-[#24201D]"
                >
                  3. Your Personal Note
                </label>
                <span className="text-[10px] text-[#756B63]">
                  {message.length}/70 chars
                </span>
              </div>
              <input
                id="cardMessage"
                type="text"
                maxLength={70}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Happy Birthday, indulge in effortless beauty..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F7F3EE] border border-[#24201D]/15 focus:border-[#24201D] focus:bg-white outline-none transition-colors"
              />
            </div>

            {/* Value Highlights List */}
            <ul className="pt-2 border-t border-[#24201D]/10 space-y-2 text-xs text-[#756B63] font-light">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#B98272] shrink-0" />
                <span>Valid for all cuts, French balayage, and restorative treatments at SoHo studio</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#B98272] shrink-0" />
                <span>Never expires · Digital email pass & printable luxury voucher included</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#B98272] shrink-0" />
                <span>Instant dispatch or schedule for a celebratory calendar date</span>
              </li>
            </ul>

            {/* CTA Continue to Purchase Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch">
              <a
                href={FRESHA_GIFT_CARDS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 bg-[#24201D] hover:bg-[#3D3732] text-[#EDE5DC] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md text-center flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>CONTINUE TO PURCHASE</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D4AF37]" />
              </a>

              {showExploreButton && onExploreFullPage && (
                <button
                  type="button"
                  onClick={onExploreFullPage}
                  className="px-6 py-3.5 border border-[#24201D]/20 hover:border-[#24201D] text-[#24201D] text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer text-center"
                >
                  FULL GIFT GUIDE
                </button>
              )}
            </div>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[#756B63] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6B8E72]" />
              <span>Official Verified Fresha Partner Checkout · 256-bit Encrypted</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
