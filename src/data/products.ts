import { FurnitureProduct, WoodOption, GlassOption, SteelOption } from '../types';

export const WOOD_OPTIONS: WoodOption[] = [
  {
    id: 'walnut',
    name: 'American Black Walnut',
    subname: 'Natural Hand-Oiled',
    color: '#4a2e1b',
    roughness: 0.65,
    description: 'Quarter-sawn heartwood selected for tight vertical grain and rich chocolate undertones.',
    origin: 'Appalachian FSC Certified',
  },
  {
    id: 'smoked_oak',
    name: 'European Smoked Oak',
    subname: 'Thermo-Treated Charcoal',
    color: '#2b241e',
    roughness: 0.6,
    description: 'Deep fumed oak cured in mineral chambers for uniform through-body pigmentation.',
    origin: 'Spessart Forest, Germany',
  },
  {
    id: 'white_ash',
    name: 'Nordic White Ash',
    subname: 'Bleached Matte Wax',
    color: '#c2b29d',
    roughness: 0.7,
    description: 'High-tensile flexural hardwood finished with organic bio-wax for a pale architectural tone.',
    origin: 'Småland, Sweden',
  },
];

export const GLASS_OPTIONS: GlassOption[] = [
  {
    id: 'smoked_bronze',
    name: 'Smoked Bronze Glass',
    subname: 'Thermal Tempered 19mm',
    color: '#38322c',
    opacity: 0.55,
    transmission: 0.85,
    roughness: 0.12,
    description: 'Low-iron solar bronze float glass with micro-bevelled, hand-polished edges.',
    thickness: '19mm Solid Tempered',
  },
  {
    id: 'clear_fluted',
    name: 'Architectural Fluted Glass',
    subname: 'Low-Iron Ribbed Reeded',
    color: '#556066',
    opacity: 0.45,
    transmission: 0.9,
    roughness: 0.25,
    description: 'Linear textured ribs diffusing ambient daylight while retaining tectonic silhouettes.',
    thickness: '15mm Laminated Structural',
  },
  {
    id: 'frosted_mist',
    name: 'Acid-Etched Frosted Mist',
    subname: 'Velvet Satin Finish',
    color: '#6e777f',
    opacity: 0.65,
    transmission: 0.7,
    roughness: 0.38,
    description: 'Silky tactile matte surface resistant to fingerprints with soft light diffusion.',
    thickness: '19mm Architectural Float',
  },
];

export const STEEL_OPTIONS: SteelOption[] = [
  {
    id: 'brushed_steel',
    name: 'Marine-Grade 316 Stainless',
    subname: 'Directional Satin Grain',
    color: '#cfd2d6',
    metalness: 0.96,
    roughness: 0.22,
    description: 'Corrosion-resistant austenitic alloy with 240-grit linear brushed surface passivated by hand.',
    grade: 'AISI 316L Marine Austenitic',
  },
  {
    id: 'blackened_patina',
    name: 'Blackened Gunmetal Patina',
    subname: 'Hot-Rolled Carbon Oxide',
    color: '#232528',
    metalness: 0.88,
    roughness: 0.35,
    description: 'Chemical cold-blackened bath creating an iridescent slate-charcoal patina with microcrystalline wax.',
    grade: 'Structural Carbon Steel Q235',
  },
  {
    id: 'champagne_nickel',
    name: 'Champagne Satin Nickel',
    subname: 'PVD Vapor Deposited',
    color: '#bfae95',
    metalness: 0.94,
    roughness: 0.25,
    description: 'Physical Vapor Deposition coating providing high hardness with subtle warm titanium warmth.',
    grade: 'PVD Titanium-Nickel Composite',
  },
];

export const FURNITURE_PRODUCTS: FurnitureProduct[] = [
  {
    id: 'kronos-dining-table',
    name: 'Kronos Trestle Dining Table',
    kicker: 'Signature Monolith',
    category: 'Dining',
    price: 6850,
    image: '/src/assets/images/prod_arch_dining_table_1791740474537.jpg',
    images: [
      '/src/assets/images/prod_arch_dining_table_1791740474537.jpg',
      '/src/assets/images/hero_arch_furniture_1791740462910.jpg',
      '/src/assets/images/prod_sculptural_coffee_table_1791740505199.jpg',
    ],
    tagline: 'Suspension bridge tensile engineering meets architectural timber.',
    description:
      'The Kronos Trestle challenges conventional table construction. A solid American walnut structural trestle anchors twin angled legs, counterbalanced by calibrated 316 stainless steel tension turnbuckles that suspend a 19mm smoked bronze tempered glass surface in mid-air.',
    dimensions: {
      width: 2600,
      depth: 1050,
      height: 750,
    },
    weightKg: 142,
    leadTimeWeeks: 5,
    materials: {
      wood: 'Solid FSC Appalachian Walnut',
      glass: '19mm Smoked Float Glass with 45° Chamfered Edges',
      steel: 'Turnbuckles & Pin-Joints in 316 Marine Stainless Steel',
    },
    architecturalDetails: {
      joinery: 'Mortise and tenon timber joints reinforced by internal steel gusset brackets.',
      tensileHardware: 'Precision CNC-turned tensioning barrel with dual M14 reverse threads.',
      loadRating: 'Uniform distributed load up to 280 kg.',
      environmentalFSC: '100% Certified Sustainable Forestry (FSC-C012345).',
    },
    features: [
      'Accommodates 8 to 10 guests with generous cantilevered legroom',
      'Structural turnbuckles allow micro-leveling across uneven flooring',
      'Floating acoustic dampening silicone isolators between glass and wood',
      'Hand-rubbed organic hardwax oil finish resilient to wine and heat',
    ],
  },
  {
    id: 'aura-cantilever-chair',
    name: 'Aura Cantilever Lounge Chair',
    kicker: 'Tectonic Balance',
    category: 'Seating',
    price: 3450,
    image: '/src/assets/images/prod_cantilever_chair_1791740484092.jpg',
    images: [
      '/src/assets/images/prod_cantilever_chair_1791740484092.jpg',
      '/src/assets/images/hero_arch_furniture_1791740462910.jpg',
    ],
    tagline: 'Continuous tubular steel geometry with warm tactile wood touchpoints.',
    description:
      'Inspired by the Bauhaus cantilever legacy and re-engineered for contemporary ergonomics. The Aura Chair employs a continuous cold-bent 38mm stainless steel tube with tuned flexural compliance, inlaid with solid walnut armrests that warm to human touch.',
    dimensions: {
      width: 820,
      depth: 920,
      height: 740,
    },
    weightKg: 28,
    leadTimeWeeks: 4,
    materials: {
      wood: 'Hand-sculpted American Walnut armrest pads',
      glass: 'Smoked glass structural floor glide isolators',
      steel: 'Seamless 38mm x 3mm tubular 316 stainless steel',
    },
    architecturalDetails: {
      joinery: 'Concealed counterbored steel fasteners plugged with matching grain walnut dowels.',
      tensileHardware: 'Integrated spring-tempered bottom radius providing 8° gentle kinetic recline.',
      loadRating: 'Dynamic load tested to 180 kg through 100,000 cycles.',
      environmentalFSC: 'Zero VOC organic natural beeswax finish.',
    },
    features: [
      'Subtle kinetic spring flex for effortless lumbar decompression',
      'Saddle leather sling reinforced with high-tenacity nylon interior core',
      'Interchangeable armrest wood inlays compatible with atelier upgrades',
      'Precision acoustic floor dampers preventing floor scuffing',
    ],
  },
  {
    id: 'monolith-modular-credenza',
    name: 'Monolith Modular Credenza',
    kicker: 'Architectural Storage',
    category: 'Storage',
    price: 8200,
    image: '/src/assets/images/prod_modular_credenza_1791740495107.jpg',
    images: [
      '/src/assets/images/prod_modular_credenza_1791740495107.jpg',
      '/src/assets/images/hero_arch_furniture_1791740462910.jpg',
    ],
    tagline: 'Rhythm of fluted glass reeds framed by precision laser-welded steel.',
    description:
      'A statement sideboard designed for residential art collections and media setups. The Monolith combines a blackened steel box frame with twin sliding fluted glass doors that softly reveal inner rift-cut oak drawers, floating on a minimal cross-braced trestle base.',
    dimensions: {
      width: 2200,
      depth: 520,
      height: 780,
    },
    weightKg: 118,
    leadTimeWeeks: 6,
    materials: {
      wood: 'Quarter-sawn White Oak cabinetry with dovetail drawers',
      glass: '15mm Low-Iron Vertical Fluted Tempered Glass',
      steel: 'Blackened 25mm square structural steel framework',
    },
    architecturalDetails: {
      joinery: 'Traditional English dovetail joinery with Blum concealed soft-close glides.',
      tensileHardware: 'High-precision ball-bearing top rollers with magnetic soft-catch stops.',
      loadRating: 'Top surface capacity 120 kg (suitable for bronze sculptures & audio equipment).',
      environmentalFSC: 'E0 ultra-low emission certified composite core with natural veneers.',
    },
    features: [
      'Smooth sliding fluted glass panels diffuse interior lighting',
      'Concealed brush-grommet wire management channel along rear spine',
      'Adjustable internal glass shelving with rubberized steel pins',
      'Cross-braced structural stretcher base ensures zero mid-span deflection',
    ],
  },
  {
    id: 'strata-sculptural-coffee-table',
    name: 'Strata Sculptural Coffee Table',
    kicker: 'Material Dialogue',
    category: 'Living',
    price: 4600,
    image: '/src/assets/images/prod_sculptural_coffee_table_1791740505199.jpg',
    images: [
      '/src/assets/images/prod_sculptural_coffee_table_1791740505199.jpg',
      '/src/assets/images/hero_arch_furniture_1791740462910.jpg',
    ],
    tagline: 'A solid timber monolith anchoring a floating disk of tempered glass.',
    description:
      'The Strata table explores gravity and lightness. A heavy, monolithic block of solid American walnut rests in counterpoint to a satin-finished brushed stainless steel cylinder, together cantilevering a circular disk of 19mm ultra-clear low-iron glass.',
    dimensions: {
      width: 1350,
      depth: 850,
      height: 380,
    },
    weightKg: 64,
    leadTimeWeeks: 4,
    materials: {
      wood: 'End-grain matched solid Walnut block with natural live medullary rays',
      glass: '19mm Ultra-Clear Tempered Glass Disk (900mm diameter)',
      steel: 'Solid-turned 200mm brushed steel cylinder with weighted ballast core',
    },
    architecturalDetails: {
      joinery: 'Internal CNC steel tie-rod bolting timber block to steel cylinder beneath the floorline.',
      tensileHardware: 'UV-bonded surgical-grade stainless steel puck adhering glass to steel pillar.',
      loadRating: 'Cantilever edge rated to 45 kg static point load.',
      environmentalFSC: 'FSC Certified sustainably harvested North American walnut.',
    },
    features: [
      'Dual-level staging: low wooden display surface + elevated glass coffee disk',
      'Optical clarity glass with virtually zero green edge tint',
      'Seamless concealed steel structural tie-plate maintains clean silhouette',
      'Felt-lined recessed floor glides for effortless repositioning',
    ],
  },
];

export const HERO_IMAGE = '/src/assets/images/hero_arch_furniture_1791740462910.jpg';
