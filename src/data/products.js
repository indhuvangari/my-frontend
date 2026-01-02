// src/data/products.js
// Synthetic demo data for ShopCart. Replace/extend freely.
// Image paths assume files in: public/images/<category>/<file>.webp
// Example: public/images/men/wireless-headphones-pro.webp
 
export const products = [
  // ===================== MEN (6) =====================
  {
    id: 'men-001',
    name: 'Wireless Headphones Pro',
    category: 'men',
    price: 2499,
    rating: 4.4,
    inStock: true,
    imageUrl: '/images/men/wireless-headphones-pro.webp',
    description: 'Bluetooth 5.3, ANC, 32h playtime, Type‑C fast charge.',
    tags: ['audio', 'bluetooth', 'anc', 'type-c']
  },
  {
    id: 'men-002',
    name: 'RGB Gaming Mouse 7200 DPI',
    category: 'men',
    price: 1099,
    rating: 4.1,
    inStock: true,
    imageUrl: '/images/men/rgb-gaming-mouse-7200dpi.webp',
    description: '6 programmable buttons, polling 1000Hz, lightweight shell.',
    tags: ['gaming', 'accessory', 'rgb']
  },
  {
    id: 'men-003',
    name: 'Mechanical Keyboard (Blue Switch)',
    category: 'men',
    price: 2899,
    rating: 4.5,
    inStock: false,
    imageUrl: '/images/men/mech-keyboard-blue.webp',
    description: 'Hot‑swappable switches, white backlight, metal top plate.',
    tags: ['keyboard', 'mechanical', 'hotswap']
  },
  {
    id: 'men-004',
    name: 'Casual Backpack 28L',
    category: 'men',
    price: 1699,
    rating: 4.2,
    inStock: true,
    imageUrl: '/images/men/casual-backpack-28l.webp',
    description: 'Water‑resistant fabric, padded laptop sleeve (15.6").',
    tags: ['bag', 'laptop', 'travel']
  },
  {
    id: 'men-005',
    name: 'Running Sneakers',
    category: 'men',
    price: 1999,
    rating: 4.0,
    inStock: true,
    imageUrl: '/images/men/running-sneakers.webp',
    description: 'Breathable mesh upper, cushioned midsole, outdoor grip.',
    tags: ['shoes', 'sports', 'outdoor']
  },
  {
    id: 'men-006',
    name: 'Fitness Band with SpO₂',
    category: 'men',
    price: 2299,
    rating: 4.3,
    inStock: true,
    imageUrl: '/images/men/fitness-band-spo2.webp',
    description: 'Heart rate, SpO₂, sleep tracking, 5‑ATM water resistance.',
    tags: ['wearable', 'health', 'spo2']
  },
 
  // ===================== WOMEN (6) =====================
  {
    id: 'women-001',
    name: 'Smart Watch Slim',
    category: 'women',
    price: 2599,
    rating: 4.2,
    inStock: true,
    imageUrl: '/images/women/smart-watch-slim.webp',
    description: 'AMOLED display, GPS, menstrual cycle tracking.',
    tags: ['watch', 'gps', 'health']
  },
  {
    id: 'women-002',
    name: 'Ionic Hair Dryer 1400W',
    category: 'women',
    price: 1799,
    rating: 4.3,
    inStock: true,
    imageUrl: '/images/women/ionic-hair-dryer-1400w.webp',
    description: 'Foldable, cool shot, diffuser + concentrator nozzles.',
    tags: ['beauty', 'haircare', 'appliance']
  },
  {
    id: 'women-003',
    name: 'Ceramic Hair Straightener',
    category: 'women',
    price: 2199,
    rating: 4.1,
    inStock: false,
    imageUrl: '/images/women/ceramic-hair-straightener.webp',
    description: 'Fast heat, anti‑frizz plates, auto shut‑off.',
    tags: ['beauty', 'styling']
  },
  {
    id: 'women-004',
    name: 'Classic Tote Handbag',
    category: 'women',
    price: 1499,
    rating: 4.0,
    inStock: true,
    imageUrl: '/images/women/classic-tote-handbag.webp',
    description: 'PU leather, zip closure, fits tablet and essentials.',
    tags: ['bag', 'fashion']
  },
  {
    id: 'women-005',
    name: 'Lightweight Trainers',
    category: 'women',
    price: 1899,
    rating: 4.2,
    inStock: true,
    imageUrl: '/images/women/lightweight-trainers.webp',
    description: 'Cushion foam, breathable knit, everyday comfort.',
    tags: ['shoes', 'athleisure']
  },
  {
    id: 'women-006',
    name: 'Noise‑Canceling Earbuds',
    category: 'women',
    price: 2799,
    rating: 4.4,
    inStock: true,
    imageUrl: '/images/women/noise-canceling-earbuds.webp',
    description: 'Hybrid ANC, transparency mode, 28h total battery.',
    tags: ['audio', 'earbuds', 'anc']
  },
 
  // ===================== HOME (6) =====================
  {
    id: 'home-001',
    name: 'LED Table Lamp',
    category: 'home',
    price: 1299,
    rating: 4.3,
    inStock: true,
    imageUrl: '/images/home/led-table-lamp.webp',
    description: 'Dimmable, warm/cool modes, touch control.',
    tags: ['lighting', 'desk']
  },
  {
    id: 'home-002',
    name: 'Memory Foam Cushion',
    category: 'home',
    price: 899,
    rating: 4.4,
    inStock: true,
    imageUrl: '/images/home/memory-foam-cushion.webp',
    description: 'Ergonomic support for chair/sofa, washable cover.',
    tags: ['comfort', 'cushion']
  },
  {
    id: 'home-003',
    name: 'Cotton Bedsheet Set (Queen)',
    category: 'home',
    price: 1599,
    rating: 4.1,
    inStock: true,
    imageUrl: '/images/home/cotton-bedsheet-queen.webp',
    description: '300 TC cotton, 1 bedsheet + 2 pillow covers.',
    tags: ['bedding', 'cotton']
  },
  {
    id: 'home-004',
    name: 'Minimal Wall Clock',
    category: 'home',
    price: 799,
    rating: 4.0,
    inStock: true,
    imageUrl: '/images/home/minimal-wall-clock.webp',
    description: 'Silent sweep movement, 12" diameter.',
    tags: ['decor', 'clock']
  },
  {
    id: 'home-005',
    name: 'Cool Mist Humidifier 3L',
    category: 'home',
    price: 2299,
    rating: 4.2,
    inStock: false,
    imageUrl: '/images/home/cool-mist-humidifier-3l.webp',
    description: 'Auto shut‑off, adjustable nozzle, bedroom friendly.',
    tags: ['air', 'humidifier']
  },
  {
    id: 'home-006',
    name: '5‑Tier Storage Rack',
    category: 'home',
    price: 2199,
    rating: 4.1,
    inStock: true,
    imageUrl: '/images/home/5-tier-storage-rack.webp',
    description: 'Powder‑coated steel, max load 100kg.',
    tags: ['storage', 'rack', 'organization']
  },
 
  // ===================== KITCHEN (6) =====================
  {
    id: 'kitchen-001',
    name: 'Non‑Stick Frying Pan 28cm',
    category: 'kitchen',
    price: 899,
    rating: 4.5,
    inStock: true,
    imageUrl: '/images/kitchen/nonstick-frying-pan-28cm.webp',
    description: 'Induction compatible, PFOA‑free coating.',
    tags: ['cookware', 'pan']
  },
  {
    id: 'kitchen-002',
    name: 'Manual Vegetable Chopper',
    category: 'kitchen',
    price: 499,
    rating: 4.0,
    inStock: true,
    imageUrl: '/images/kitchen/manual-veg-chopper.webp',
    description: '3‑blade system, BPA‑free, easy pull cord.',
    tags: ['prep', 'chopper']
  },
  {
    id: 'kitchen-003',
    name: 'Chef Knife Set (3 Pc)',
    category: 'kitchen',
    price: 1399,
    rating: 4.2,
    inStock: true,
    imageUrl: '/images/kitchen/chef-knife-set-3pc.webp',
    description: 'Stainless steel, ergonomic handles.',
    tags: ['knife', 'set']
  },
  {
    id: 'kitchen-004',
    name: 'Aluminium Pressure Cooker 5L',
    category: 'kitchen',
    price: 2199,
    rating: 4.3,
    inStock: true,
    imageUrl: '/images/kitchen/pressure-cooker-5l.webp',
    description: 'ISI certified, safety valve, induction base.',
    tags: ['cooker', 'pressure']
  },
  {
    id: 'kitchen-005',
    name: 'Mixer Grinder 500W',
    category: 'kitchen',
    price: 2799,
    rating: 4.1,
    inStock: false,
    imageUrl: '/images/kitchen/mixer-grinder-500w.webp',
    description: '3 jars, overload protection, 2‑year warranty.',
    tags: ['appliance', 'mixer']
  },
  {
    id: 'kitchen-006',
    name: 'Insulated Steel Bottle 1L',
    category: 'kitchen',
    price: 799,
    rating: 4.4,
    inStock: true,
    imageUrl: '/images/kitchen/insulated-steel-bottle-1l.webp',
    description: 'Keeps drinks cold 24h, hot 12h, leak‑proof.',
    tags: ['bottle', 'hydration']
  },
 
  // ===================== BEAUTY (6) =====================
  {
    id: 'beauty-001',
    name: 'Vitamin C Serum 20%',
    category: 'beauty',
    price: 699,
    rating: 4.5,
    inStock: true,
    imageUrl: '/images/beauty/vitamin-c-serum-20.webp',
    description: 'Brightening formula, fragrance‑free, paraben‑free.',
    tags: ['skincare', 'serum', 'vitamin-c']
  },
  {
    id: 'beauty-002',
    name: 'SPF 50 PA++++ Gel Sunscreen',
    category: 'beauty',
    price: 549,
    rating: 4.6,
    inStock: true,
    imageUrl: '/images/beauty/spf50-gel-sunscreen.webp',
    description: 'Broad‑spectrum UV protection, non‑greasy finish.',
    tags: ['sunscreen', 'spf50', 'uv']
  },
  {
    id: 'beauty-003',
    name: 'Gentle Face Wash',
    category: 'beauty',
    price: 299,
    rating: 4.2,
    inStock: true,
    imageUrl: '/images/beauty/gentle-face-wash.webp',
    description: 'SLS/SLES free, suitable for all skin types.',
    tags: ['cleanser', 'face-wash']
  },
  {
    id: 'beauty-004',
    name: 'Hydrating Moisturizer',
    category: 'beauty',
    price: 449,
    rating: 4.3,
    inStock: false,
    imageUrl: '/images/beauty/hydrating-moisturizer.webp',
    description: 'Ceramides + Hyaluronic acid, barrier friendly.',
    tags: ['moisturizer', 'hydration']
  },
  {
    id: 'beauty-005',
    name: 'Matte Lipstick Set (3 Shades)',
    category: 'beauty',
    price: 799,
    rating: 4.1,
    inStock: true,
    imageUrl: '/images/beauty/matte-lipstick-set-3.webp',
    description: 'Long‑wear, transfer resistant, rich pigment.',
    tags: ['lipstick', 'makeup']
  },
  {
    id: 'beauty-006',
    name: 'Anti‑Dandruff Shampoo',
    category: 'beauty',
    price: 379,
    rating: 4.0,
    inStock: true,
    imageUrl: '/images/beauty/anti-dandruff-shampoo.webp',
    description: 'ZPTO formula, gentle on scalp, fresh fragrance.',
    tags: ['haircare', 'shampoo']
  }
];
 
// Optional helpers (keep if useful in your codebase)
export const getProductsByCategory = (key) =>
  key && key !== 'all' ? products.filter((p) => p.category === key) : products;
 
export const searchProducts = ({ q = '', category = 'all', inStockOnly = false, minRating = 0 }) => {
  const query = q.trim().toLowerCase();
  return getProductsByCategory(category)
    .filter((p) => (inStockOnly ? p.inStock : true))
    .filter((p) => p.rating >= (minRating || 0))
    .filter((p) =>
      query
        ? (p.name + ' ' + p.category + ' ' + (p.tags || []).join(' '))
            .toLowerCase()
            .includes(query)
        : true
    );
};