import homeHero from '../assets/images/2home-hero.avif';
// import about from '../assets/images/about.avif';
import after from '../assets/images/after.avif';
import balayageHairDetail from '../assets/images/balayage_hair_detail.avif';
import balayageHair from '../assets/images/balayage_hair.avif';
import beforeAfter from '../assets/images/before-after.avif';
import before from '../assets/images/before.avif';
import blowDryStyling from '../assets/images/blow-dry-styling.avif';
import bodyWaxing from '../assets/images/body-waxing.avif';
import brazilianBlowDryKeratin from '../assets/images/Brazilian-Blow-Dry-Keratin.avif';
import crystalClearFacials from '../assets/images/crystal-clear-facials.avif';
import crystalClearMicrodermabrasion from '../assets/images/Crystal-Clear-Microdermabrasion.avif';
import cutFinish from '../assets/images/cut-finish.avif';
import dermalogicaDeepCleansingFacial from '../assets/images/Dermalogica-Deep-Cleansing-Facial.avif';
import dermalogicaFacials from '../assets/images/dermalogica-facials.avif';
import facialHairRemoval2 from '../assets/images/facial-hair-removal-2.avif';
import facialHairRemoval3 from '../assets/images/facial-hair-removal-3.avif';
import facialHairRemoval4 from '../assets/images/facial-hair-removal-4.avif';
import facialHairRemoval5 from '../assets/images/facial-hair-removal-5.avif';
import facialHairRemoval from '../assets/images/facial-hair-removal.avif';
import frenchDimensionalBalayage from '../assets/images/French-Dimensional-Balayage.avif';
import gallery from '../assets/images/gallery.avif';
import gentsMassage from '../assets/images/gents-massage.avif';
import gentsWaxing from '../assets/images/gents-waxing.avif';
import gents from '../assets/images/gents.avif';
import hairColour from '../assets/images/hair-colour.avif';
import hairFoils from '../assets/images/hair-foils.avif';
import hairRoots from '../assets/images/hair-roots.avif';
import hairTreatments from '../assets/images/hair-treatments.avif';
import halfHeadDimensionalHighlights from '../assets/images/Half-Head-Dimensional-Highlights.avif';
import intimateWaxing from '../assets/images/intimate-waxing.avif';
import laserHairRemoval from '../assets/images/laser-hair-removal.avif';
import lashes from '../assets/images/lashes.avif';
import lumeSalon from '../assets/images/Lume-Salon.avif';
import makeUp from '../assets/images/make-up.avif';
import massageBody from '../assets/images/massage-body.avif';
import mehndi from '../assets/images/mehndi.avif';
import microdermabrasion from '../assets/images/microdermabrasion.avif';
import organicThreadingWaxing from '../assets/images/organic-threading-waxing.avif';
import peelsEyeTreatments from '../assets/images/peels-eye-treatments.avif';
import price from '../assets/images/price.avif';
import restorativeHairBotox from '../assets/images/Restorative-Hair-Botox.avif';
import ser1 from '../assets/images/ser1.avif';
import singleProcessRootRefresh from '../assets/images/Single-Process-Root-Refresh.avif';
import stylists1 from '../assets/images/stylists-1.avif';
import stylists13 from '../assets/images/stylists-13.avif';
import stylists14 from '../assets/images/stylists-14.avif';
import stylists2 from '../assets/images/stylists-2.avif';
import stylists3 from '../assets/images/stylists-3.avif';
import stylists4 from '../assets/images/stylists-4.avif';
import stylists5 from '../assets/images/stylists-5.avif';
import stylists6 from '../assets/images/stylists-6.avif';
import stylists7 from '../assets/images/stylists-7.avif';
import stylists8 from '../assets/images/stylists-8.avif';
import tintingLamination2 from '../assets/images/tinting-lamination2.avif';


import {
  ServiceCard,
  SalonSection,
  ServiceItem,
  Stylist,
  LookbookItem,
  ReviewItem,
  FaqItem,
  BlogPost,
  ServiceSubItem
} from '../types';

export const HERO_IMAGE = homeHero;
export const SALON_INTERIOR = lumeSalon;
export const STYLIST_DIRECTOR = stylists2;
export const BALAYAGE_DETAIL = balayageHair;
export const HAIR_TREATMENT_LOOK = hairTreatments;

export const SALON_INFO = {
  name: 'LUMÉ Hair',
  tagline: 'Hair artistry designed around you.',
  phone: '(555) 123-4567',
  email: 'concierge@lumehairstudio.com',
  address: '123 Mercer Street, SoHo, New York, NY 10012',
  instagram: '@lumehairstudio',
  // Daily schedule listed individually for each day as explicitly requested:
  schedule: [
    { day: 'Monday', hours: '9:00 AM – 7:00 PM', status: 'Open today' },
    { day: 'Tuesday', hours: '9:00 AM – 7:00 PM', status: 'Open today' },
    { day: 'Wednesday', hours: '9:00 AM – 7:00 PM', status: 'Open today' },
    { day: 'Thursday', hours: '9:00 AM – 8:00 PM', status: 'Open today' },
    { day: 'Friday', hours: '9:00 AM – 8:00 PM', status: 'Open today' },
    { day: 'Saturday', hours: '9:00 AM – 7:00 PM', status: 'Open today' },
    { day: 'Sunday', hours: 'Closed', status: 'Closed on Sundays' },
  ],
};

// ============================================================================
// COMPREHENSIVE SALON SECTIONS & CARDS (Exact User Structure)
// ============================================================================
export const SALON_SECTIONS: SalonSection[] = [
  // --------------------------------------------------------------------------
  // 01: THREADING & BROWS
  // --------------------------------------------------------------------------
  {
    id: 'threading-brows',
    name: 'THREADING & BROWS',
    tagline: 'Ultra-precise organic cotton threading and bespoke brow sculpting',
    cards: [
      {
        id: 'facial-hair-removal',
        sectionId: 'threading-brows',
        sectionName: 'THREADING & BROWS',
        name: 'Facial Hair Removal',
        shortDesc: 'Gentle, razor-free organic cotton hair removal for precision facial contouring.',
        image: facialHairRemoval,
        whatItIs: 'An ancient, skin-friendly technique utilizing antibacterial organic twisted cotton thread to capture individual hairs from the root without tugging delicate skin layers.',
        whoItsFor: 'Ideal for sensitive skin, dermatological retinoid users, or anyone seeking clean, sharp definition and velvety smooth texture.',
        services: [
          { id: 'tb-eyebrows', name: 'Eyebrows', duration: '15 min', price: 'From $15', priceNumber: 15 },
          { id: 'tb-upper-lip', name: 'Upper lip', duration: '10 min', price: 'From $10', priceNumber: 10 },
          { id: 'tb-sides', name: 'Sides', duration: '15 min', price: 'From $14', priceNumber: 14 },
          { id: 'tb-chin', name: 'Chin', duration: '10 min', price: 'From $12', priceNumber: 12 },
          { id: 'tb-forehead', name: 'Forehead', duration: '15 min', price: 'From $12', priceNumber: 12 },
          { id: 'tb-neck', name: 'Neck', duration: '15 min', price: 'From $14', priceNumber: 14 },
          { id: 'tb-back-sides-neck', name: 'Back & sides of neck', duration: '20 min', price: 'From $18', priceNumber: 18 },
          { id: 'tb-nose', name: 'Nose', duration: '10 min', price: 'From $10', priceNumber: 10 },
          { id: 'tb-full-face', name: 'Full face', duration: '45 min', price: '$48', priceNumber: 48, originalPrice: '$55', discountBadge: 'Save up to 10%', note: 'Complete facial threading package with soothing rosewater mist' },
          { id: 'tb-small-area', name: 'Any other small area', duration: '10 min', price: 'From $10', priceNumber: 10 },
        ],
      },
      {
        id: 'tinting-lamination',
        sectionId: 'threading-brows',
        sectionName: 'THREADING & BROWS',
        name: 'Tinting & Lamination',
        shortDesc: 'Semi-permanent botanical tinting and keratin lamination for structured fullness.',
        image: '/src/assets/images/tinting-lamination2.avif',
        whatItIs: 'High-definition customized brow tinting and gentle keratin perming that redirects brow hairs into an effortlessly brushed-up, feathered editorial arch.',
        whoItsFor: 'Those with sparse, unruly, or lighter hairs wanting fuller, thicker framing that holds for 6 to 8 weeks.',
        popular: true,
        services: [
          { id: 'tb-eyebrow-tint', name: 'Eyebrow Tint', duration: '15 min', price: 'From $18', priceNumber: 18 },
          { id: 'tb-eyelash-tint', name: 'Eyelash Tint', duration: '20 min', price: 'From $22', priceNumber: 22 },
          { id: 'tb-brow-lash-tint', name: 'Eyebrow & Eyelash Tint', duration: '30 min', price: '$36', priceNumber: 36, originalPrice: '$40', discountBadge: 'Save up to 10%', note: 'Dual eye framing combination' },
          { id: 'tb-brow-lamination-wax', name: 'Brow Lamination, Tint & Wax', duration: '45 min', price: 'From $75', priceNumber: 75, note: 'Complete architectural brow transformation' },
          { id: 'tb-brow-lift', name: 'Brow Lift', duration: '45 min', price: 'From $65', priceNumber: 65 },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 02: HAIR
  // --------------------------------------------------------------------------
  {
    id: 'hair',
    name: 'HAIR',
    tagline: 'Architectural cuts, bouncy editorial blowouts, and restorative therapies',
    cards: [
      {
        id: 'cut-finish',
        sectionId: 'hair',
        sectionName: 'HAIR',
        name: 'Cut & Finish',
        shortDesc: 'Bespoke scissor and razor sectioning tailored to hair density and natural flow.',
        image: '/src/assets/images/cut-finish.avif',
        whatItIs: 'A tailored cut created through diagnostic sectioning, botanical basin cleanse, personalized texturizing, and styling finish.',
        whoItsFor: 'Anyone wanting flawless silhouette, graceful growth, and effortless daily movement.',
        services: [
          { id: 'h-wash-cut', name: 'Wash & Cut', duration: '45 min', price: 'From $65', priceNumber: 65 },
          { id: 'h-wash-cut-blowdry', name: 'Wash, Cut & Blow-Dry', duration: '1 hr', price: 'From $85', priceNumber: 85, note: 'Includes diagnostic consultation and wave finish' },
          { id: 'h-restyle', name: 'Restyle', duration: '1 hr 15 min', price: 'From $95', priceNumber: 95, note: 'Complete shape transformation' },
          { id: 'h-wash-cut-u16', name: 'Wash & Cut (under 16)', duration: '30 min', price: 'From $40', priceNumber: 40 },
          { id: 'h-wash-cut-blowdry-u16', name: 'Wash, Cut & Blow-Dry (under 16)', duration: '45 min', price: 'From $55', priceNumber: 55 },
          { id: 'h-fringe-cut', name: 'Fringe Cut', duration: '15 min', price: 'From $20', priceNumber: 20 },
          { id: 'h-wash-only', name: 'Wash Only', duration: '20 min', price: 'From $25', priceNumber: 25 },
        ],
      },
      {
        id: 'blow-dry-styling',
        sectionId: 'hair',
        sectionName: 'HAIR',
        name: 'Blow-Dry & Styling',
        shortDesc: 'Luminous volume, cascading waves, and red-carpet formal sculpts.',
        image: '/src/assets/images/blow-dry-styling.avif',
        whatItIs: 'Professional thermal blowout using round ceramic brushes, heat protectants, and specialized curling irons for radiant bounce.',
        whoItsFor: 'Special evenings, weddings, photoshoots, or a luxurious weekly hair elevation.',
        services: [
          { id: 'h-wash-blowdry', name: 'Wash & Blow-Dry', duration: '45 min', price: 'From $50', priceNumber: 50 },
          { id: 'h-curls', name: 'Curls', duration: '45 min', price: 'From $45', priceNumber: 45 },
          { id: 'h-bridal-hair-curls', name: 'Bridal Hair Up or Curls', duration: '1 hr 30 min', price: 'From $140', priceNumber: 140, note: 'Couture formal updos and thermal setting' },
        ],
      },
      {
        id: 'hair-treatments',
        sectionId: 'hair',
        sectionName: 'HAIR',
        name: 'Hair Treatments',
        shortDesc: 'Deep reconstructive peptide therapy, keratin alignment, and molecular bond repair.',
        image: '/src/assets/images/hair-treatments.avif',
        whatItIs: 'Concentrated active formulas applied under micro-mist warmth to repair disulfide bonds, infuse moisture, and seal split ends.',
        whoItsFor: 'Hair damaged by chemical color, thermal irons, or natural environmental dryness.',
        popular: true,
        services: [
          { id: 'h-brazilian-blowdry', name: 'Brazilian Blow-Dry', duration: '2 hr', price: '$220', priceNumber: 220, originalPrice: '$245', discountBadge: 'Save up to 10%', note: 'Long-lasting keratin smoothing & humidity resistance' },
          { id: 'h-hair-botox', name: 'Hair Botox', duration: '1 hr 30 min', price: 'From $160', priceNumber: 160, note: 'Intensive restorative collagen and protein filler' },
          { id: 'h-olaplex', name: 'OLAPLEX', duration: '45 min', price: 'From $55', priceNumber: 55, note: 'Patented disulfide bond builder' },
          { id: 'h-deep-conditioning', name: 'Deep Conditioning', duration: '30 min', price: 'From $40', priceNumber: 40 },
          { id: 'h-instant-after-colour', name: 'Instant After-Colour', duration: '20 min', price: 'From $30', priceNumber: 30 },
        ],
      },
      {
        id: 'gents-hair',
        sectionId: 'hair',
        sectionName: 'HAIR',
        name: 'Gents',
        shortDesc: 'Precision scissor-over-comb cuts, fading, and discreet grey blending.',
        image: '/src/assets/images/gents.avif',
        whatItIs: 'Tailored men’s grooming featuring diagnostic consultation, precision scissor-work, razor neckline detailing, and styling.',
        whoItsFor: 'Gentlemen seeking immaculate grooming and tailored classic or contemporary cuts.',
        services: [
          { id: 'h-gents-cut', name: 'Cut', duration: '30 min', price: 'From $35', priceNumber: 35 },
          { id: 'h-gents-wash-cut', name: 'Wash & Cut', duration: '40 min', price: 'From $45', priceNumber: 45 },
          { id: 'h-gents-tint', name: 'Tint', duration: '30 min', price: 'From $35', priceNumber: 35 },
          { id: 'h-gents-wash-cut-u12', name: 'Wash & Cut (under 12)', duration: '25 min', price: 'From $28', priceNumber: 28 },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 03: COLOR
  // --------------------------------------------------------------------------
  {
    id: 'color',
    name: 'COLOR',
    tagline: 'Dimensional balayage, bespoke highlighting, and luminous ammonia-free glazes',
    cards: [
      {
        id: 'colour',
        sectionId: 'color',
        sectionName: 'COLOR',
        name: 'Colour',
        shortDesc: 'Hand-painted French balayage, full multi-tonal highlights, and high-shine sealers.',
        image: '/src/assets/images/hair-colour.avif',
        whatItIs: 'Multi-dimensional light-catching highlights and rich all-over low-ammonia formulas blended seamlessly for soft growth.',
        whoItsFor: 'Clients wanting sun-drenched brightness, dimensional depth, or high-definition brunette gloss.',
        popular: true,
        services: [
          { id: 'c-half-head-highlights', name: 'Half Head Highlights', duration: '1 hr 30 min', price: 'From $110', priceNumber: 110 },
          { id: 'c-full-head-highlights', name: 'Full Head Highlights', duration: '2 hr 15 min', price: 'From $165', priceNumber: 165 },
          { id: 'c-t-section-highlights', name: 'T-Section Highlights', duration: '1 hr', price: 'From $75', priceNumber: 75 },
          { id: 'c-half-head-balayage', name: 'Half Head Balayage', duration: '2 hr', price: 'From $180', priceNumber: 180 },
          { id: 'c-full-head-balayage', name: 'Full Head Balayage', duration: '3 hr', price: '$240', priceNumber: 240, originalPrice: '$265', discountBadge: 'Save up to 10%', note: 'French bespoke hand-painted ribbons with gloss sealant' },
          { id: 'c-tint', name: 'Tint', duration: '1 hr 15 min', price: 'From $75', priceNumber: 75 },
          { id: 'c-tint-inoa', name: 'Tint (Inoa)', duration: '1 hr 15 min', price: 'From $85', priceNumber: 85, note: '100% ammonia-free oil delivery system' },
          { id: 'c-toner-with-colour', name: 'Toner with Colour', duration: '30 min', price: 'From $35', priceNumber: 35 },
          { id: 'c-toner-only', name: 'Toner Only', duration: '45 min', price: 'From $45', priceNumber: 45 },
          { id: 'c-pre-lightening', name: 'Pre-Lightening', duration: '1 hr 30 min', price: 'From $90', priceNumber: 90 },
          { id: 'c-single-foil', name: 'Single Foil', duration: '15 min', price: 'From $12', priceNumber: 12 },
        ],
      },
      {
        id: 'roots',
        sectionId: 'color',
        sectionName: 'COLOR',
        name: 'Roots',
        shortDesc: 'Flawless root regrowth coverage, color blending, and grey concealment.',
        image: '/src/assets/images/hair-roots.avif',
        whatItIs: 'Targeted root touch-up matching your exact existing mid-length tone for seamless, undetectable continuity.',
        whoItsFor: 'Maintaining polished single-process color between full highlight appointments.',
        services: [
          { id: 'c-roots', name: 'Roots', duration: '1 hr', price: 'From $55', priceNumber: 55 },
          { id: 'c-roots-inoa', name: 'Roots (Inoa)', duration: '1 hr', price: 'From $65', priceNumber: 65, note: 'Odourless, ammonia-free root application' },
        ],
      },
      {
        id: 'foils',
        sectionId: 'color',
        sectionName: 'COLOR',
        name: 'Foils',
        shortDesc: 'Strategic framing foils to illuminate parting, hairline, and crown.',
        image: '/src/assets/images/hair-foils.avif',
        whatItIs: 'Express foil placement targeting key visual areas for a rapid color refresh without committing to a full session.',
        whoItsFor: 'Quick refreshes between major salon appointments.',
        services: [
          { id: 'c-6-foils', name: '6 Foils', duration: '30 min', price: 'From $35', priceNumber: 35 },
          { id: 'c-8-foils', name: '8 Foils', duration: '40 min', price: 'From $45', priceNumber: 45 },
          { id: 'c-10-foils', name: '10 Foils', duration: '45 min', price: 'From $55', priceNumber: 55 },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 04: FACIALS & SKINS
  // --------------------------------------------------------------------------
  {
    id: 'facials-skins',
    name: 'FACIALS & SKINS',
    tagline: 'Clinical Dermalogica protocols, Crystal Clear microdermabrasion, and skin resurfacing',
    cards: [
      {
        id: 'dermalogica-facials',
        sectionId: 'facials-skins',
        sectionName: 'FACIALS & SKINS',
        name: 'Dermalogica Facials',
        shortDesc: 'Custom targeted facials addressing acne, barrier repair, pigmentation, and cellular renewal.',
        image: '/src/assets/images/dermalogica-facials.avif',
        whatItIs: 'Medical-grade professional botanical formulations featuring deep pore extraction, enzymatic exfoliation, and custom masque infusion.',
        whoItsFor: 'Congested, sensitive, dehydrated, or breakout-prone skin seeking clinical restoration.',
        services: [
          { id: 'fs-deep-cleansing', name: 'Deep Cleansing Facial', duration: '1 hr', price: 'From $75', priceNumber: 75 },
          { id: 'fs-medicated-acne', name: 'Medicated Acne Treatment', duration: '1 hr', price: 'From $85', priceNumber: 85 },
          { id: 'fs-power-brightening', name: 'Power Brightening Facial', duration: '1 hr 15 min', price: 'From $95', priceNumber: 95 },
          { id: 'fs-anti-ageing', name: 'Anti-Ageing Facial', duration: '1 hr 15 min', price: 'From $105', priceNumber: 105 },
        ],
      },
      {
        id: 'crystal-clear-facials',
        sectionId: 'facials-skins',
        sectionName: 'FACIALS & SKINS',
        name: 'Crystal Clear Facials',
        shortDesc: 'Diamond microdermabrasion, pulsed oxygen therapy, and micro-needling derma roller.',
        image: '/src/assets/images/crystal-clear-facials.avif',
        whatItIs: 'High-tech mechanical exfoliation combining micro-crystal resurfacing with pressurized pure oxygen infusion to plump fine lines instantly.',
        whoItsFor: 'Dull texture, scarring, enlarged pores, or pre-event glass-skin radiance.',
        popular: true,
        services: [
          { id: 'fs-microdermabrasion', name: 'Microdermabrasion', duration: '45 min', price: 'From $70', priceNumber: 70 },
          { id: 'fs-oxygen-therapy', name: 'Oxygen Therapy', duration: '45 min', price: 'From $75', priceNumber: 75 },
          { id: 'fs-micro-oxygen-combo', name: 'Microdermabrasion & Oxygen Therapy', duration: '1 hr 15 min', price: '$120', priceNumber: 120, originalPrice: '$135', discountBadge: 'Save up to 10%', note: 'Dual rejuvenation system' },
          { id: 'fs-oxygen-derma-roller', name: 'Oxygen Therapy & Derma Roller', duration: '1 hr 15 min', price: 'From $130', priceNumber: 130 },
          { id: 'fs-frozen-trio', name: 'Frozen: Microdermabrasion, Oxygen & Derma Roller', duration: '1 hr 30 min', price: 'From $160', priceNumber: 160, note: 'Ultimate anti-aging cryo-resurfacing' },
        ],
      },
      {
        id: 'peels-eye-treatments',
        sectionId: 'facials-skins',
        sectionName: 'FACIALS & SKINS',
        name: 'Peels & Eye Treatments',
        shortDesc: 'Gentle fruit acid resurfacing peels and targeted dark circle eye de-puffing.',
        image: '/src/assets/images/peels-eye-treatments.avif',
        whatItIs: 'Targeted chemical acid solutions and peptide eye masques that brighten the under-eye contour and accelerate cellular turnover.',
        whoItsFor: 'Tired eyes, hyperpigmentation, and texture irregularities.',
        services: [
          { id: 'fs-prime-peel', name: 'Prime & Peel', duration: '45 min', price: 'From $65', priceNumber: 65 },
          { id: 'fs-revitalising-eye', name: 'Revitalising Eye Rescue', duration: '30 min', price: 'From $40', priceNumber: 40 },
          { id: 'fs-eye-masque', name: 'Eye Masque', duration: '20 min', price: 'From $25', priceNumber: 25 },
        ],
      },
      {
        id: 'gents-facials',
        sectionId: 'facials-skins',
        sectionName: 'FACIALS & SKINS',
        name: 'Gents',
        shortDesc: 'Formulated specifically for thicker men’s skin, ingrown hair relief, and pore clearing.',
        image: '/src/assets/images/microdermabrasion.avif',
        whatItIs: 'Deep extraction, razor burn soothing, steam cleansing, and microdermabrasion adapted for beard lines and active lifestyles.',
        whoItsFor: 'Men wanting clear, invigorated facial skin without greasy residue.',
        services: [
          { id: 'fs-gents-deep-cleansing', name: 'Deep Cleansing Facial', duration: '45 min', price: 'From $65', priceNumber: 65 },
          { id: 'fs-gents-microdermabrasion', name: 'Microdermabrasion', duration: '45 min', price: 'From $70', priceNumber: 70 },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 05: WAXING
  // --------------------------------------------------------------------------
  {
    id: 'waxing',
    name: 'WAXING',
    tagline: 'Warm chocolate and hot peelable waxes for velvet-smooth, irritation-free skin',
    cards: [
      {
        id: 'body-waxing',
        sectionId: 'waxing',
        sectionName: 'WAXING',
        name: 'Body Waxing',
        shortDesc: 'Gentle honey and chamomile strip waxing for long-lasting silky smoothness.',
        image: '/src/assets/images/body-waxing.avif',
        whatItIs: 'Fast, hygienic hair removal using temperature-controlled gentle wax infused with soothing azulene oils to minimize redness.',
        whoItsFor: 'Silky, stubble-free body skin lasting 3 to 5 weeks.',
        services: [
          { id: 'w-full-arms', name: 'Full Arms', duration: '30 min', price: 'From $30', priceNumber: 30 },
          { id: 'w-half-arms', name: 'Half Arms', duration: '20 min', price: 'From $20', priceNumber: 20 },
          { id: 'w-34-arms', name: '¾ Arms', duration: '25 min', price: 'From $24', priceNumber: 24 },
          { id: 'w-underarms', name: 'Underarms', duration: '15 min', price: 'From $15', priceNumber: 15 },
          { id: 'w-full-legs', name: 'Full legs', duration: '45 min', price: 'From $45', priceNumber: 45 },
          { id: 'w-half-legs-upper', name: 'Half Legs (upper)', duration: '25 min', price: 'From $25', priceNumber: 25 },
          { id: 'w-half-legs-lower', name: 'Half Legs (lower)', duration: '25 min', price: 'From $24', priceNumber: 24 },
          { id: 'w-34-legs', name: '¾ Legs', duration: '35 min', price: 'From $32', priceNumber: 32 },
          { id: 'w-full-back', name: 'Full Back', duration: '35 min', price: 'From $35', priceNumber: 35 },
          { id: 'w-half-back', name: 'Half Back', duration: '20 min', price: 'From $22', priceNumber: 22 },
          { id: 'w-full-front', name: 'Full Front', duration: '35 min', price: 'From $35', priceNumber: 35 },
          { id: 'w-half-front', name: 'Half Front', duration: '20 min', price: 'From $22', priceNumber: 22 },
          { id: 'w-stomach', name: 'Stomach', duration: '20 min', price: 'From $18', priceNumber: 18 },
          { id: 'w-belly-line', name: 'Belly Line', duration: '10 min', price: 'From $10', priceNumber: 10 },
          { id: 'w-bottom', name: 'Bottom', duration: '20 min', price: 'From $18', priceNumber: 18 },
          { id: 'w-full-body', name: 'Full Body', duration: '1 hr 45 min', price: '$145', priceNumber: 145, originalPrice: '$160', discountBadge: 'Save up to 10%', note: 'Complete head-to-toe smooth skin package' },
        ],
      },
      {
        id: 'intimate-waxing',
        sectionId: 'waxing',
        sectionName: 'WAXING',
        name: 'Intimate Waxing',
        shortDesc: 'Perron Rigot hot peelable wax for zero-pinch, confidential intimate hygiene.',
        image: '/src/assets/images/intimate-waxing.avif',
        whatItIs: 'Delicate hot wax formulated to shrink-wrap the hair rather than stick to delicate skin, ensuring minimal sensation.',
        whoItsFor: 'Discreet, pristine intimate hair removal performed by senior certified therapists.',
        popular: true,
        services: [
          { id: 'w-bikini-line', name: 'Bini Line', price: 'From $22', priceNumber: 22, duration: '20 min' },
          { id: 'w-high-bikini', name: 'High Bikini', duration: '25 min', price: 'From $28', priceNumber: 28 },
          { id: 'w-high-bikini-aline', name: 'High Bikini with A-Line', duration: '30 min', price: 'From $34', priceNumber: 34 },
          { id: 'w-brazilian', name: 'Brazilian', duration: '40 min', price: 'From $45', priceNumber: 45 },
          { id: 'w-hollywood', name: 'Hollywood', duration: '45 min', price: 'From $50', priceNumber: 50, note: 'Complete front-to-back bare finish' },
          { id: 'w-a-line', name: 'A-Line', duration: '15 min', price: 'From $18', priceNumber: 18 },
          { id: 'w-a-line-combo', name: 'A-line (with other service)', duration: '10 min', price: 'From $12', priceNumber: 12 },
        ],
      },
      {
        id: 'gents-waxing',
        sectionId: 'waxing',
        sectionName: 'WAXING',
        name: 'Gents',
        shortDesc: 'Effective body depilation for chest, back, shoulders, and legs.',
        image: '/src/assets/images/gents-waxing.avif',
        whatItIs: 'High-strength warm wax formulated to remove coarser hair smoothly with antiseptic pre and post soothing tea tree gels.',
        whoItsFor: 'Athletes, swimmers, or gentlemen desiring clean athletic skin.',
        services: [
          { id: 'w-gents-chest', name: 'Chest', duration: '30 min', price: 'From $35', priceNumber: 35 },
          { id: 'w-gents-full-front', name: 'Full Front', duration: '40 min', price: 'From $45', priceNumber: 45 },
          { id: 'w-gents-full-back', name: 'Full Back', duration: '40 min', price: 'From $45', priceNumber: 45 },
          { id: 'w-gents-back-shoulders', name: 'Back & Shoulders', duration: '45 min', price: 'From $50', priceNumber: 50 },
          { id: 'w-gents-full-arms', name: 'Full Arms', duration: '35 min', price: 'From $38', priceNumber: 38 },
          { id: 'w-gents-full-legs', name: 'Full Legs', duration: '50 min', price: 'From $55', priceNumber: 55 },
          { id: 'w-gents-underarms', name: 'Underarms', duration: '15 min', price: 'From $18', priceNumber: 18 },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 06: MASSAGE & BODY
  // --------------------------------------------------------------------------
  {
    id: 'massage-body',
    name: 'MASSAGE & BODY',
    tagline: 'Holistic restorative body rituals, authentic Indian head massages, and botanical scrubs',
    cards: [
      {
        id: 'massage-body-card',
        sectionId: 'massage-body',
        sectionName: 'MASSAGE & BODY',
        name: 'Massage & Body',
        shortDesc: 'Aromatherapy pressure point release and traditional Ayurvedic scalp rituals.',
        image: '/src/assets/images/massage-body.avif',
        whatItIs: 'Therapeutic pressure techniques combining pure essential botanical oils with warm towels to melt muscular tension.',
        whoItsFor: 'Alleviating stress, desk tension, migraine pressure, and full body fatigue.',
        services: [
          { id: 'mb-aromatherapy', name: 'Aromatherapy Massage', duration: '1 hr', price: 'From $85', priceNumber: 85 },
          { id: 'mb-indian-head', name: 'Indian Head Massage', duration: '45 min', price: 'From $55', priceNumber: 55 },
          { id: 'mb-indian-head-wash', name: 'Indian Head Massage with Wash', duration: '1 hr', price: 'From $70', priceNumber: 70, note: 'Includes botanical scalp massage, wash and rough dry' },
          { id: 'mb-body-scrub', name: 'Body Scrub', duration: '45 min', price: 'From $65', priceNumber: 65 },
        ],
      },
      {
        id: 'gents-massage',
        sectionId: 'massage-body',
        sectionName: 'MASSAGE & BODY',
        name: 'Gents',
        shortDesc: 'Deep tissue back and shoulder knot relief for active gentlemen.',
        image: '/src/assets/images/gents-massage.avif',
        whatItIs: 'Targeted firm pressure targeting the upper trapezius, rhomboids, and lower lumbar region to relieve stiffness.',
        whoItsFor: 'Relieving gym soreness and postural strain.',
        services: [
          { id: 'mb-gents-back-shoulder', name: 'Back & Shoulder Massage', duration: '45 min', price: 'From $60', priceNumber: 60 },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 07: LASER
  // --------------------------------------------------------------------------
  {
    id: 'laser',
    name: 'LASER',
    tagline: 'Permanent medical-grade diode laser hair reduction for all Fitzpatrick skin tones',
    cards: [
      {
        id: 'laser-hair-removal',
        sectionId: 'laser',
        sectionName: 'LASER',
        name: 'Laser Hair Removal',
        shortDesc: 'Cool-tip medical diode laser targeting the follicle for lasting smooth freedom.',
        image: '/src/assets/images/laser-hair-removal.avif',
        whatItIs: 'Safe, virtually painless light pulses filtered through a sapphire contact cooling tip to disable active hair follicles.',
        whoItsFor: 'Permanent solution for ingrown hairs, coarse shadow, and endless shaving cycles.',
        popular: true,
        services: [
          { id: 'l-upper-lip', name: 'Upper Lip', duration: '15 min', price: 'From $30', priceNumber: 30 },
          { id: 'l-chin', name: 'Chin', duration: '15 min', price: 'From $35', priceNumber: 35 },
          { id: 'l-jawline', name: 'Jawline', duration: '20 min', price: 'From $40', priceNumber: 40 },
          { id: 'l-full-face', name: 'Full Face', duration: '30 min', price: '$85', priceNumber: 85, originalPrice: '$95', discountBadge: 'Save up to 10%', note: 'Includes cooling aloe calming treatment' },
          { id: 'l-underarms', name: 'Underarms', duration: '20 min', price: 'From $45', priceNumber: 45 },
          { id: 'l-hollywood', name: 'Hollywood', duration: '35 min', price: 'From $95', priceNumber: 95 },
          { id: 'l-upper-leg', name: 'Upper Leg', duration: '35 min', price: 'From $85', priceNumber: 85 },
          { id: 'l-full-leg', name: 'Full Leg', duration: '1 hr', price: 'From $140', priceNumber: 140 },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 08: LASHES
  // --------------------------------------------------------------------------
  {
    id: 'lashes',
    name: 'LASHES',
    tagline: 'Keratin lash curling, dramatic eye lifting, and effortless mascara-free beauty',
    cards: [
      {
        id: 'lashes-card',
        sectionId: 'lashes',
        sectionName: 'LASHES',
        name: 'Lashes',
        shortDesc: 'Curling lifts, deep black tinting, and lightweight strip lash artistry.',
        image: '/src/assets/images/lashes.avif',
        whatItIs: 'Gentle silicone shield lifting that turns your natural lashes upwards from the root, finished with high-gloss keratin.',
        whoItsFor: 'Anyone wanting awake, wide eyes that hold a curl for up to 8 weeks with zero extensions.',
        popular: true,
        services: [
          { id: 'ls-lash-lift', name: 'Lash Lift', duration: '45 min', price: 'From $55', priceNumber: 55 },
          { id: 'ls-lash-brow-lift', name: 'Lash & Brow Lift', duration: '1 hr 15 min', price: '$95', priceNumber: 95, originalPrice: '$105', discountBadge: 'Save up to 10%', note: 'Dual eye elevation package' },
          { id: 'ls-strip-lashes', name: 'Strip Lashes', duration: '20 min', price: 'From $25', priceNumber: 25 },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 09: MAKE-UP & MEHNDY
  // --------------------------------------------------------------------------
  {
    id: 'makeup-mehndi',
    name: 'MAKE-UP & MEHNDY',
    tagline: 'Couture bridal glam, editorial occasion makeup, and intricate organic henna art',
    cards: [
      {
        id: 'make-up',
        sectionId: 'makeup-mehndi',
        sectionName: 'MAKE-UP & MEHNDY',
        name: 'Make-Up',
        shortDesc: 'Flawless skin prep, sculpting, waterproof wedding glam, and traditional drape setting.',
        image: '/src/assets/images/make-up.avif',
        whatItIs: 'High-end editorial beauty artistry using luxury waterproof cosmetics designed to photograph flawlessly under all lighting.',
        whoItsFor: 'Brides, engagement ceremonies, gala evenings, and high-profile parties.',
        services: [
          { id: 'mu-day-makeup', name: 'Day Make-Up', duration: '45 min', price: 'From $65', priceNumber: 65 },
          { id: 'mu-evening-makeup', name: 'Evening Make-Up', duration: '1 hr', price: 'From $85', priceNumber: 85 },
          { id: 'mu-engagement-makeup', name: 'Engagement Make-Up', duration: '1 hr 15 min', price: 'From $120', priceNumber: 120 },
          { id: 'mu-bridal-makeup', name: 'Bridal Make-Up (with lashes)', duration: '1 hr 45 min', price: 'From $180', priceNumber: 180, note: 'Includes luxury mink strip lashes & touch-up kit' },
          { id: 'mu-dupatta-saree-setting', name: 'Dupatta/Saree Setting', duration: '30 min', price: 'From $35', priceNumber: 35 },
        ],
      },
      {
        id: 'mehndi',
        sectionId: 'makeup-mehndi',
        sectionName: 'MAKE-UP & MEHNDY',
        name: 'Mehndi',
        shortDesc: '100% natural chemical-free dark stain henna artistry with intricate bridal motifs.',
        image: '/src/assets/images/mehndi.avif',
        whatItIs: 'Hand-piped organic henna paste infused with pure eucalyptus and clove oils for deep mahogany pigmentation.',
        whoItsFor: 'Brides, festive Eid/Diwali celebrations, and sangeet parties.',
        services: [
          { id: 'm-mehndi', name: 'Mehndi', duration: '45 min', price: 'From $45', priceNumber: 45, note: 'Per side / palm design' },
          { id: 'm-bridal-mehndi', name: 'Bridal Mehndi', duration: '2 hr 30 min', price: 'From $195', priceNumber: 195, note: 'Intricate traditional bridal arms and feet package' },
        ],
      },
    ],
  },
];

// Helper: Flatten all sub-services for easy search, selection, and multi-booking
export const ALL_SUB_SERVICES: (ServiceSubItem & { cardName: string; sectionName: string; sectionId: string })[] =
  SALON_SECTIONS.flatMap((sec) =>
    sec.cards.flatMap((card) =>
      card.services.map((sub) => ({
        ...sub,
        cardName: card.name,
        sectionName: sec.name,
        sectionId: sec.id,
      }))
    )
  );

// Legacy flat SERVICES array for backwards compatibility across existing hero/lookbook modules
export const SERVICES: ServiceItem[] = SALON_SECTIONS.flatMap((sec) =>
  sec.cards.map((c) => {
    const minPrice = Math.min(...c.services.map((s) => s.priceNumber));
    return {
      id: c.id,
      name: c.name,
      category: sec.name,
      shortDesc: c.shortDesc,
      priceFrom: `From $${minPrice}`,
      duration: c.services[0]?.duration || '30 – 60 min',
      image: c.image,
      whatItIs: c.whatItIs,
      whoItsFor: c.whoItsFor,
      popular: c.popular,
    };
  })
);

export const STYLISTS: Stylist[] = [
  {
    id: 'emma-carter',
    name: 'Emma Carter',
    role: 'Creative Director',
    bio: 'Emma trained in Paris and London with over twelve years of editorial experience. She specializes in effortless Parisian bobs, French balayage, and natural textural movement.',
    portrait: '/src/assets/images/stylists-3.avif',
    specialties: ['French Balayage', 'Precision Bobs', 'Editorial Texture', 'Bridal Styling'],
    signatureWork: ['/src/assets/images/.avif', '/src/assets/images/.avif'],
    experienceYears: 12,
  },
  {
    id: 'sophia-lee',
    name: 'Sophia Lee',
    role: 'Senior Colorist',
    bio: 'Renowned for dimensional sun-kissed brunettes and gentle Scandinavian blondes. Sophia formulates custom tonal glazes that maintain hair integrity and illuminate natural complexion.',
    portrait: '/src/assets/images/stylists-4.avif',
    specialties: ['Lived-in Blonde', 'Dimensional Brunette', 'Gloss Formulations', 'Color Correction'],
    signatureWork: ['/src/assets/images/.avif', '/src/assets/images/.avif'],
    experienceYears: 9,
  },
  {
    id: 'mia-anderson',
    name: 'Mia Anderson',
    role: 'Hair Stylist',
    bio: 'Mia combines classical scissor-over-comb precision with modern razor cutting. She excels at flowing layered cuts, curtain bangs, and bouncy red-carpet blowouts.',
    portrait: '/src/assets/images/stylists-5.avif',
    specialties: ['Custom Layering', 'Curtain Bangs', 'Signature Blowouts', 'Restorative Treatments'],
    signatureWork: ['/src/assets/images/.avif', '/src/assets/images/.avif'],
    experienceYears: 7,
  },
  {
    id: 'chloe-bennett',
    name: 'Chloe Bennett',
    role: 'Master Extensionist & Skin Artist',
    bio: 'Chloe brings elite mastery in undetectable hand-tied wefts and luxury hair extension transformations, prioritizing scalp wellness and weightless natural wear.',
    portrait: '/src/assets/images/stylists-2.avif',
    specialties: ['Hand-Tied Wefts', 'Threading Precision', 'Texture Matching', 'Keratin Bonding'],
    signatureWork: ['/src/assets/images/.avif', '/src/assets/images/.avif'],
    experienceYears: 8,
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Lead Balayage Artist',
    bio: 'Specializing in dimensional lived-in blondes and sun-drenched brunette ribbons. Elena combines delicate hand-painting with customized high-shine toners.',
    portrait: '/src/assets/images/stylists-1.avif',
    specialties: ['Lived-in Balayage', 'Baby-lights', 'Tonal Glossing', 'Color Correction'],
    signatureWork: ['/src/assets/images/.avif', '/src/assets/images/.avif'],
    experienceYears: 11,
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Director of Gents Grooming',
    bio: 'European trained master barber specializing in architectural scissor-over-comb cuts, contemporary fading, beard sculpting, and executive grooming.',
    portrait: '/src/assets/images/stylists-7.avif',
    specialties: ['Precision Fading', 'Scissor Sculpting', 'Beard Contouring', 'Grey Blending'],
    signatureWork: ['/src/assets/images/', '/src/assets/images/.avif'],
    experienceYears: 10,
  },
  {
    id: 'amara-khan',
    name: 'Emran Khan',
    role: 'Holistic Head Massage & Ayurvedic Specialist',
    bio: 'Emran preserves generational Ayurvedic scalp massage techniques and botanical hair oiling rituals to relieve nervous tension and fortify hair roots.',
    portrait: '/src/assets/images/stylists-8.avif',
    specialties: ['Indian Head Massage', 'Scalp Detox Therapy', 'Aromatherapy Acupressure', 'Botanical Scrubs'],
    signatureWork: ['/src/assets/images/', '/src/assets/images/.avif'],
    experienceYears: 9,
  },
  {
    id: 'camille-dupont',
    name: 'Camille Dupont',
    role: 'Senior Dermalogica Aesthetician',
    bio: 'Certified clinical skin therapist with expertise in non-invasive skin rejuvenation, chemical peels, and Crystal Clear microdermabrasion protocols.',
    portrait: '/src/assets/images/stylists-6.avif',
    specialties: ['Dermalogica Facials', 'Microdermabrasion', 'Oxygen Plumping', 'Prime & Peel'],
    signatureWork: ['/src/assets/images/', '/src/assets/images/'],
    experienceYears: 8,
  },
  {
    id: 'leila-noor',
    name: 'Leila Noor',
    role: 'Couture Make-Up & Mehndi Designer',
    bio: 'Renowned for high-fashion bridal looks, glowing skin prep, traditional saree draping, and intricate organic henna stain artistry.',
    portrait: '/src/assets/images/stylists-13.avif',
    specialties: ['Bridal Make-Up', 'Handcrafted Mehndi', 'Saree & Dupatta Setting', 'Editorial Glam'],
    signatureWork: ['/src/assets/images/.avif', '/src/assets/images/.avif'],
    experienceYears: 7,
  },
  {
    id: 'zoe-chen',
    name: 'Zoe Chen',
    role: 'Keratin Lash & Brow Architect',
    bio: 'Meticulous precision artist focusing on organic cotton threading, natural brow lamination, and keratin lash lifting that emphasizes individual eye geometry.',
    portrait: '/src/assets/images/stylists-14.avif',
    specialties: ['Brow Lamination', 'Keratin Lash Lift', 'Facial Threading', 'Custom Brow Tinting'],
    signatureWork: ['/src/assets/images/.avif', '/src/assets/images/.avif'],
    experienceYears: 6,
  },
];

export const LOOKBOOK: LookbookItem[] = [
  {
    id: 'gallery-facial-hair-removal',
    title: 'Facial Hair Removal',
    category: 'THREADING & BROWS',
    cardId: 'facial-hair-removal',
    image: '/src/assets/images/facial-hair-removal.avif',
    beforeImage: before,
    afterImage: after,
    serviceId: 'tb-eyebrows',
    stylistName: 'Zoe Chen',
    description: 'Precision organic cotton facial threading sculpting the natural brow arch and forehead line.',
    galleryImages: [
      '/src/assets/images/facial-hair-removal.avif',
      '/src/assets/images/facial-hair-removal-2.avif',
      '/src/assets/images/facial-hair-removal-3.avif',
      '/src/assets/images/facial-hair-removal-4.avif',
      '/src/assets/images/facial-hair-removal-5.avif',
    ],
  },
  {
    id: 'gallery-tinting-lamination',
    title: 'Tinting & Lamination',
    category: 'THREADING & BROWS',
    cardId: 'tinting-lamination',
    image: '/src/assets/images/tinting-lamination2.avif',
    serviceId: 'tb-brow-lamination-wax',
    stylistName: 'Zoe Chen',
    description: 'Feathered architectural brow lamination with bespoke vegetable tint and wax shaping.',
    galleryImages: [
      '/src/assets/images/tinting-lamination2.avif',
      '/src/assets/images/tinting-lamination2.avif',
      '/src/assets/images/tinting-lamination2.avif',
      '/src/assets/images/tinting-lamination2.avif',
      '/src/assets/images/tinting-lamination2.avif',
    ],
  },
  {
    id: 'gallery-cut-finish',
    title: 'Cut & Finish',
    category: 'HAIR',
    cardId: 'cut-finish',
    image: '/src/assets/images/cut-finish.avif',
    serviceId: 'h-wash-cut-blowdry',
    stylistName: 'Emma Carter',
    description: 'Precision scissor-cut layered silhouette with fluid movement and face-framing softness.',
    galleryImages: [
      '/src/assets/images/cut-finish.avif',
      '/src/assets/images/cut-finish.avif',
      '/src/assets/images/cut-finish.avif',
      '/src/assets/images/cut-finish.avif',
      '/src/assets/images/cut-finish.avif',
    ],
  },
  {
    id: 'gallery-blow-dry-styling',
    title: 'Blow-Dry & Styling',
    category: 'HAIR',
    cardId: 'blow-dry-styling',
    image: '/src/assets/images/blow-dry-styling.avif',
    serviceId: 'h-wash-blowdry',
    stylistName: 'Mia Anderson',
    description: 'Bouncy red-carpet thermal blowout with high-mirror shine and lasting memory hold.',
    galleryImages: [
      '/src/assets/images/blow-dry-styling.avif',
      '/src/assets/images/blow-dry-styling.avif',
      '/src/assets/images/blow-dry-styling.avif',
      '/src/assets/images/blow-dry-styling.avif',
      '/src/assets/images/blow-dry-styling.avif',
    ],
  },
  {
    id: 'gallery-hair-treatments',
    title: 'Hair Treatments',
    category: 'HAIR',
    cardId: 'hair-treatments',
    image: '/src/assets/images/hair-treatments.avif',
    serviceId: 'h-brazilian-blowdry',
    stylistName: 'Sophia Lee',
    description: 'Deep reconstructive peptide therapy renewing hair fiber elasticity, shine, and moisture.',
    galleryImages: [
      '/src/assets/images/hair-treatments.avif',
      '/src/assets/images/hair-treatments.avif',
      '/src/assets/images/hair-treatments.avif',
      '/src/assets/images/hair-treatments.avif',
      '/src/assets/images/hair-treatments.avif',
    ],
  },
  {
    id: 'gallery-gents-hair',
    title: 'Gents Grooming',
    category: 'HAIR',
    cardId: 'gents-hair',
    image: '/src/assets/images/gents.avif',
    serviceId: 'h-gents-wash-cut',
    stylistName: 'Marcus Vance',
    description: 'Classic scissor-over-comb architecture with clean razor-tapered edges and modern texture.',
    galleryImages: [
      '/src/assets/images/gents.avif',
      '/src/assets/images/gents.avif',
      '/src/assets/images/gents.avif',
      '/src/assets/images/gents.avif',
      '/src/assets/images/gents.avif',
    ],
  },
  {
    id: 'gallery-colour',
    title: 'Colour & Balayage',
    category: 'COLOR',
    cardId: 'colour',
    image: BALAYAGE_DETAIL,
    serviceId: 'c-full-head-balayage',
    stylistName: 'Elena Rostova',
    description: 'Hand-painted French balayage ribbons creating multi-dimensional sunlight radiance.',
    galleryImages: [
      BALAYAGE_DETAIL,
      HERO_IMAGE,
      '/src/assets/images/1home-hero.avif',
      '/src/assets/images/1home-hero.avif',
      '/src/assets/images/1home-hero.avif',
    ],
  },
  {
    id: 'gallery-roots',
    title: 'Roots & Foils',
    category: 'COLOR',
    cardId: 'roots',
    image: '/src/assets/images/hair-roots.avif',
    serviceId: 'c-roots',
    stylistName: 'Sophia Lee',
    description: 'Seamless single process root coverage and strategic framing foils for immaculate color harmony.',
    galleryImages: [
      '/src/assets/images/hair-roots.avif',
      BALAYAGE_DETAIL,
      '/src/assets/images/hair-roots.avif',
      HERO_IMAGE,
    ],
  },
  {
    id: 'gallery-dermalogica-facials',
    title: 'Dermalogica Facials',
    category: 'FACIALS & SKINS',
    cardId: 'dermalogica-facials',
    image: '/src/assets/images/dermalogica-facials.avif',
    serviceId: 'fs-deep-cleansing',
    stylistName: 'Camille Dupont',
    description: 'Targeted medical-grade botanical facial protocols with gentle pore extractions and calming masques.',
    galleryImages: [
      '/src/assets/images/dermalogica-facials.avif',
      '/src/assets/images/dermalogica-facials.avif',
      '/src/assets/images/dermalogica-facials.avif',
      '/src/assets/images/dermalogica-facials.avif',
      '/src/assets/images/dermalogica-facials.avif',
    ],
  },
  {
    id: 'gallery-crystal-clear',
    title: 'Crystal Clear Facials',
    category: 'FACIALS & SKINS',
    cardId: 'crystal-clear-facials',
    image: '/src/assets/images/crystal-clear-facials.avif',
    serviceId: 'fs-micro-oxygen-combo',
    stylistName: 'Camille Dupont',
    description: 'Diamond microdermabrasion and pressurized oxygen therapy for instant pore refinement and glow.',
    galleryImages: [
      '/src/assets/images/crystal-clear-facials.avif',
      '/src/assets/images/crystal-clear-facials.avif',
      '/src/assets/images/crystal-clear-facials.avif',
      SALON_INTERIOR,
    ],
  },
  {
    id: 'gallery-body-waxing',
    title: 'Body Waxing',
    category: 'WAXING',
    cardId: 'body-waxing',
    image: '/src/assets/images/body-waxing.avif',
    serviceId: 'w-full-body',
    stylistName: 'Zoe Chen',
    description: 'Silky smooth full body depilation using soothing chamomile and azulene warm strip wax.',
    galleryImages: [
      '/src/assets/images/body-waxing.avif',
      '/src/assets/images/body-waxing.avif',
      SALON_INTERIOR,
      '/src/assets/images/body-waxing.avif',
    ],
  },
  {
    id: 'gallery-intimate-waxing',
    title: 'Intimate Waxing',
    category: 'WAXING',
    cardId: 'intimate-waxing',
    image: '/src/assets/images/intimate-waxing.avif',
    serviceId: 'w-brazilian',
    stylistName: 'Zoe Chen',
    description: 'Perron Rigot hot peelable wax ensuring low sensation and impeccable intimate hygiene.',
    galleryImages: [
      '/src/assets/images/intimate-waxing.avif',
      '/src/assets/images/intimate-waxing.avif',
      SALON_INTERIOR,
      '/src/assets/images/intimate-waxing.avif',
    ],
  },
  {
    id: 'gallery-massage-body',
    title: 'Massage & Body',
    category: 'MASSAGE & BODY',
    cardId: 'massage-body-card',
    image: '/src/assets/images/massage-body.avif',
    serviceId: 'mb-indian-head-wash',
    stylistName: 'Amara Khan',
    description: 'Traditional Ayurvedic warm herbal oil scalp therapy and full body aromatherapy relaxation.',
    galleryImages: [
      '/src/assets/images/massage-body.avif',
      '/src/assets/images/massage-body.avif',
      '/src/assets/images/massage-body.avif',
      '/src/assets/images/massage-body.avif',
      '/src/assets/images/massage-body.avif',
    ],
  },
  {
    id: 'gallery-laser',
    title: 'Laser Hair Removal',
    category: 'LASER',
    cardId: 'laser-hair-removal',
    image: '/src/assets/images/laser-hair-removal.avif',
    serviceId: 'l-full-face',
    stylistName: 'Camille Dupont',
    description: 'Sapphire cool-tip medical diode laser targeting the follicle for lasting silky freedom.',
    galleryImages: [
      '/src/assets/images/laser-hair-removal.avif',
      '/src/assets/images/laser-hair-removal.avif',
      '/src/assets/images/laser-hair-removal.avif',
      '/src/assets/images/laser-hair-removal.avif',
    ],
  },
  {
    id: 'gallery-lashes',
    title: 'Lashes & Lift',
    category: 'LASHES',
    cardId: 'lashes-card',
    image: '/src/assets/images/lashes.avif',
    serviceId: 'ls-lash-lift',
    stylistName: 'Zoe Chen',
    description: 'Natural lash keratin curling lift and deep carbon-black tint opening up the eye aperture.',
    galleryImages: [
      '/src/assets/images/lashes.avif',
      '/src/assets/images/lashes.avif',
      '/src/assets/images/lashes.avif',
      '/src/assets/images/lashes.avif',
    ],
  },
  {
    id: 'gallery-makeup',
    title: 'Make-Up Artistry',
    category: 'MAKE-UP & MEHNDY',
    cardId: 'make-up',
    image: '/src/assets/images/make-up.avif',
    serviceId: 'mu-bridal-makeup',
    stylistName: 'Leila Noor',
    description: 'Flawless couture bridal and gala glam with high-definition skin finish and luxury lashes.',
    galleryImages: [
      '/src/assets/images/make-up.avif',
      '/src/assets/images/make-up.avif',
      '/src/assets/images/make-up.avif',
      '/src/assets/images/make-up.avif',
      '/src/assets/images/make-up.avif',
    ],
  },
  {
    id: 'gallery-mehndi',
    title: 'Mehndi Artistry',
    category: 'MAKE-UP & MEHNDY',
    cardId: 'mehndi',
    image: '/src/assets/images/mehndi.avif',
    serviceId: 'm-bridal-mehndi',
    stylistName: 'Leila Noor',
    description: 'Intricate 100% natural organic henna motifs staining deep rich mahogany tones.',
    galleryImages: [
      '/src/assets/images/mehndi.avif',
      '/src/assets/images/mehndi.avif',
      '/src/assets/images/mehndi.avif',
      '/src/assets/images/mehndi.avif',
    ],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    clientName: 'Emily Richardson',
    service: 'Full Head Balayage & Cut',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The French balayage technique here is completely unmatched. My color grew out so seamlessly that four months later people still ask if I just left the salon.',
    verifiedOnGoogle: true,
  },
  {
    id: 'rev-2',
    clientName: 'Camilla Vance',
    service: 'Facial Hair Removal & Brow Lamination',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The most gentle and precise threading I have ever experienced in Manhattan. My brows look editorial and lifted without any redness.',
    verifiedOnGoogle: true,
  },
  {
    id: 'rev-3',
    clientName: 'Julianne Morris',
    service: 'Brazilian Blow-Dry',
    rating: 5,
    date: '1 month ago',
    comment: 'Transformed my frizzy hair into liquid silk. Even on humid New York summer days my hair stays silky, reflective, and completely frizz-free.',
    verifiedOnGoogle: true,
  },
  {
    id: 'rev-4',
    clientName: 'Elena Rostova',
    service: 'Crystal Clear Microdermabrasion',
    rating: 5,
    date: '1 month ago',
    comment: 'Immediate glass skin results with zero downtime. The oxygen infusion left my face radiant for an entire week.',
    verifiedOnGoogle: true,
  },
  {
    id: 'rev-5',
    clientName: 'Hannah Davies',
    service: 'Bridal Hair & Make-Up',
    rating: 5,
    date: '2 months ago',
    comment: 'Emma and the team made our wedding day unforgettable. The hair and makeup held through tears, dancing, and 12 hours of photos.',
    verifiedOnGoogle: true,
  },
  {
    id: 'rev-6',
    clientName: 'Claire Beaumont',
    service: 'Laser Hair Removal',
    rating: 5,
    date: '2 months ago',
    comment: 'The sapphire cooling tip makes the laser virtually painless compared to other clinics. Noticeable hair reduction after just two sessions.',
    verifiedOnGoogle: true,
  },
  {
    id: 'rev-7',
    clientName: 'Victoria Price',
    service: 'Wash, Cut & Blow-Dry',
    rating: 5,
    date: '2 months ago',
    comment: 'The interior architecture is so serene. You step off Mercer Street and immediately relax with an organic herbal tea while they pamper your hair.',
    verifiedOnGoogle: true,
  },
  {
    id: 'rev-8',
    clientName: 'Serena Lin',
    service: 'OLAPLEX & Deep Conditioning',
    rating: 5,
    date: '3 months ago',
    comment: 'My bleached hair was completely restored. The softness and tensile strength came back after just one visit.',
    verifiedOnGoogle: true,
  },
  {
    id: 'rev-9',
    clientName: 'Maya Patel',
    service: 'Aromatherapy & Indian Head Massage',
    rating: 5,
    date: '3 months ago',
    comment: 'The Indian head massage with wash is heavenly. It eliminated my chronic desk headaches and left my scalp so invigorated.',
    verifiedOnGoogle: true,
  },
  {
    id: 'rev-10',
    clientName: 'Isabella Rossi',
    service: 'Full Body Waxing',
    rating: 5,
    date: '4 months ago',
    comment: 'Immaculately clean, quick, and almost painless intimate waxing. The hot peelable wax is far superior to standard salon strips.',
    verifiedOnGoogle: true,
  },
];

// FAQs for the About Page
export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need a consultation before color or major transformations?',
    answer: 'While routine glosses and single process appointments include a consultation at the start of your visit, we strongly recommend a dedicated 15-minute consultation prior to dramatic color transformations, corrective color, or first-time balayage. This allows our colorists to evaluate your hair strand elasticity and curate realistic expectations.',
  },
  {
    id: 'faq-2',
    question: 'How long does a balayage or treatment appointment take?',
    answer: 'A comprehensive balayage appointment generally ranges between 2.5 to 3.5 hours. This includes the bespoke hand-painting process, developing time, restorative gloss, basin treatment, and signature blowout finish. We invite you to bring a book or work on your laptop in our tranquil lounge.',
  },
  {
    id: 'faq-3',
    question: 'Do you offer combined packages and multi-service bookings?',
    answer: 'Yes! Our booking system allows you to select multiple services in a single reservation—such as facial threading alongside a blowout or hair treatment. Your schedule will be seamlessly synchronized with our master artists.',
  },
  {
    id: 'faq-4',
    question: 'Can I reschedule my appointment?',
    answer: 'We kindly ask for a minimum of 48 hours notice for any rescheduling or cancellation so we may offer that reserved time to clients on our waiting list. Rescheduling can be conveniently completed via your confirmation link or by calling our studio directly.',
  },
  {
    id: 'faq-5',
    question: 'What products do you use in the salon?',
    answer: 'We exclusively formulate with clean, cruelty-free European salon brands, Dermalogica professional skincare, Perron Rigot waxes, and low-ammonia pigment lines. Every wash and styling ritual incorporates organic botanical oils, vegan proteins, and sustainable packaging.',
  },
];

// Blog Posts for the About Page (6 total service-oriented guides)
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'maintain-balayage',
    title: 'How to Maintain Your Balayage',
    category: 'Color Care',
    readTime: '4 min read',
    date: 'March 2026',
    author: 'Sophia Lee',
    excerpt: 'French balayage is naturally low-maintenance, but retaining that fresh salon gloss requires intentional at-home rituals.',
    image: '/src/assets/images/balayage_hair_detail.avif',
    content: [
      'One of the greatest joys of French balayage is its effortless grow-out phase. Because the color ribbons are hand-painted without touching the scalp roots directly, there is no harsh line of demarcation as your hair grows.',
      'To keep your tone luminous and avoid brassiness, we recommend washing with sulfate-free cleansers and alternating with a gentle violet or blue toning gloss once every ten days.',
      'Always remember that heat tools are color thieves! Applying a nourishing thermal shield spray prior to blow-drying preserves the outer cuticle and locks in your custom toner for months.',
    ],
  },
  {
    id: 'keep-hair-healthy',
    title: '5 Ways to Keep Your Hair Healthy',
    category: 'Hair Wellness',
    readTime: '5 min read',
    date: 'February 2026',
    author: 'Emma Carter',
    excerpt: 'Lustrous hair starts from within the follicle. Discover our creative director’s top non-negotiables for silky resilience.',
    image: HAIR_TREATMENT_LOOK,
    content: [
      'Healthy hair is not an accident—it is the result of consistent, gentle rituals. First, treat wet hair like fine silk; hair is at its most vulnerable when saturated with water, so always detangle with a wide-tooth comb from ends upwards.',
      'Second, incorporate a weekly scalp detox. Scalp skin requires the same gentle exfoliation as facial skin to clear product buildup and allow follicles to breathe freely.',
      'Third, invest in a 100% mulberry silk pillowcase. It minimizes nighttime friction, eliminates morning frizz, and keeps your blowout intact.',
      'Fourth, schedule micro-trims every 10 to 12 weeks to eliminate split ends before they travel up the hair shaft.',
      'Fifth, deeply hydrate from the inside out with healthy dietary fats like avocado, salmon, and adequate hydration.',
    ],
  },
  {
    id: 'organic-threading-benefits',
    title: 'The Art of Organic Threading vs Waxing',
    category: 'Brows & Skin',
    readTime: '4 min read',
    date: 'February 2026',
    author: 'Zoe Chen',
    excerpt: 'Why high-fashion models and dermatologists favor antibacterial organic cotton threading for hyper-defined facial architecture.',
    image: '/src/assets/images/organic-threading-waxing.avif',
    content: [
      'Unlike waxing, which pulls at the epidermis, organic threading relies solely on twisted antibacterial cotton to extract unwanted follicles cleanly from the root without stripping the top skin layer.',
      'This makes threading the single safest facial hair removal technique for clients using retinol, chemical peels, or acne treatments like Accutane.',
      'The clean, razor-sharp lines achieved with threading create an immediate visual lifting effect on the brow arch, opening the eyes and emphasizing cheekbone structure.',
    ],
  },
  {
    id: 'clinical-facials-guide',
    title: 'Clinical Facials: Dermalogica vs Microdermabrasion',
    category: 'Skin Health',
    readTime: '5 min read',
    date: 'January 2026',
    author: 'Camille Dupont',
    excerpt: 'Deciding between enzymatic botanical extractions and diamond-tip crystal resurfacing for your seasonal skin reset.',
    image: '/src/assets/images/dermalogica-facials.avif',
    content: [
      'When your skin feels congested, dehydrated, or inflamed, selecting the proper aesthetic treatment accelerates recovery tenfold.',
      'Dermalogica targeted facials excel at balancing sebum, clearing acne with antibacterial botanicals, and repairing a compromised lipid barrier without mechanical abrasion.',
      'Meanwhile, Crystal Clear microdermabrasion gently vacuums away dull dead keratinocytes and combines with pressurized oxygen to erase fine lines and acne scarring for instant radiance.',
    ],
  },
  {
    id: 'lash-lift-lamination-care',
    title: 'Lash Lamination & Keratin Lift Care Guide',
    category: 'Lash Artistry',
    readTime: '3 min read',
    date: 'January 2026',
    author: 'Zoe Chen',
    excerpt: 'How to make your keratin lash lift and brow lamination remain glossy, sculpted, and full for 8 weeks.',
    image: '/src/assets/images/lashes.avif',
    content: [
      'Keratin lash lifting and brow lamination have transformed beauty routines by offering semi-permanent structure without the heavy upkeep of eyelash extensions.',
      'The golden rule: keep lashes and brows completely dry and steam-free for the first 24 to 48 hours while the keratin bonds permanently set.',
      'Daily brushing with a spoolie and brushing through a drop of nourishing peptide oil keeps the hair fiber supple and prevents brittleness between salon sessions.',
    ],
  },
  {
    id: 'ayurvedic-head-massage-wellness',
    title: 'Ayurvedic Indian Head Massage: Stress & Scalp Benefits',
    category: 'Holistic Wellness',
    readTime: '4 min read',
    date: 'January 2026',
    author: 'Amara Khan',
    excerpt: 'Explore how ancient warm oil acupressure stimulates microcirculation, releases tension headaches, and strengthens hair follicles.',
    image: '/src/assets/images/massage-body.avif',
    content: [
      'In traditional Ayurveda, the head represents the primary gateway to nervous system equilibrium. Massaging specific marma pressure points eases built-up stress accumulated from screen time.',
      'Infusing warm organic sesame and brahmi oils directly into the scalp dissolves calcified sebum blockages around hair follicles, encouraging denser, healthier hair growth.',
      'Paired with our botanical restorative basin wash, clients report deeper sleep, immediate relief from neck tension, and renewed mental clarity.',
    ],
  },
];

