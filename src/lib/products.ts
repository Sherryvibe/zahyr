export type Product = {
  slug: string;
  name: string;
  colour: string;
  colourHex: string;
  price: number;
  category: 'Loafers' | 'Boots' | 'Derby' | 'Monk Strap';
  badge?: string;
  image: string;
  gallery: string[];
  short: string;
  description: string;
  details: string[];
  craft: string;
  rating: number;
  reviews: number;
  sizes: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: 'the-zahyr-loafer',
    name: 'The Zahyr Loafer',
    colour: 'Espresso',
    colourHex: '#382A20',
    price: 38500,
    category: 'Loafers',
    badge: 'The Icon',
    image: '/images/product-espresso-loafer.jpg',
    gallery: ['/images/product-espresso-loafer.jpg', '/images/hero-loafers.jpg', '/images/craft-stitch.jpg'],
    short: 'Our founding penny loafer — burnished espresso calf, hand-stitched apron.',
    description:
      'Cut from full-grain calf leather and burnished by hand, The Zahyr Loafer is the shoe the house was built on. A clean penny strap, a soft chisel toe, and a leather sole that breaks in like it was made for you — because it was.',
    details: ['Full-grain aniline calf leather', 'Hand-stitched apron & plug', 'Leather-lined, cushioned insole', 'Blake-stitched leather sole', 'Hand-burnished espresso finish', 'Made in Lahore, Pakistan'],
    craft: '212 hand operations. 48 hours on the last. One pair at a time.',
    rating: 4.9,
    reviews: 214,
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
  },
  {
    slug: 'the-tassel-loafer',
    name: 'The Tassel Loafer',
    colour: 'Deep Olive',
    colourHex: '#283A29',
    price: 42000,
    category: 'Loafers',
    badge: 'New',
    image: '/images/product-tassel-olive.jpg',
    gallery: ['/images/product-tassel-olive.jpg', '/images/craft-hands.jpg', '/images/craft-stitch.jpg'],
    short: 'Deep-olive suede with hand-rolled tassels. Quiet, assured, unmistakable.',
    description:
      'A tassel loafer without the noise. Deep-olive calf suede, brushed to a soft nap, with tassels cut and rolled entirely by hand. Wears with tailoring, denim, and everything between.',
    details: ['Deep-olive calf suede', 'Hand-rolled tassel detail', 'Unlined heel for softness', 'Leather sole with rubber insert', 'Made in Lahore, Pakistan'],
    craft: 'Suede is skived to 1.1mm so the shoe folds, never creases.',
    rating: 4.8,
    reviews: 96,
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
  },
  {
    slug: 'the-chelsea-boot',
    name: 'The Chelsea Boot',
    colour: 'Charcoal',
    colourHex: '#1A1A1A',
    price: 56000,
    category: 'Boots',
    badge: 'Limited',
    image: '/images/product-chelsea-charcoal.jpg',
    gallery: ['/images/product-chelsea-charcoal.jpg', '/images/story-leather.jpg', '/images/campaign-man.jpg'],
    short: 'A sculpted charcoal boot in polished calf. Built for winter, worn all year.',
    description:
      'Our Chelsea is cut close to the ankle with a refined almond toe — sharp enough for an evening in Lahore, restrained enough for every day. Polished charcoal calf over a storm-welted sole.',
    details: ['Polished charcoal calf leather', 'Double elastic gusset', 'Storm-welted leather + rubber sole', 'Rear pull tab, leather lined', 'Made in Lahore, Pakistan'],
    craft: 'Lasted for 72 hours before soling, so the ankle holds its line.',
    rating: 5.0,
    reviews: 61,
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
  },
  {
    slug: 'the-dune-loafer',
    name: 'The Dune Loafer',
    colour: 'Sand Suede',
    colourHex: '#C8B89E',
    price: 39500,
    category: 'Loafers',
    badge: 'Summer',
    image: '/images/product-suede-sand.jpg',
    gallery: ['/images/product-suede-sand.jpg', '/images/journal-1.jpg'],
    short: 'Sand suede, unlined and weightless. Made for warm light.',
    description:
      'An unlined summer loafer in sand suede — featherweight, breathable, and cut soft through the vamp so it feels broken-in from the first wear.',
    details: ['Sand calf suede', 'Unlined construction', 'Natural leather sole', 'Hand-stitched detailing', 'Made in Lahore, Pakistan'],
    craft: 'Unlined make — only 84 pieces, each edge hand-painted.',
    rating: 4.7,
    reviews: 78,
    sizes: ['39', '40', '41', '42', '43', '44'],
  },
  {
    slug: 'the-single-monk',
    name: 'The Single Monk',
    colour: 'Burnt Copper',
    colourHex: '#A86B45',
    price: 48500,
    category: 'Monk Strap',
    image: '/images/product-monk.jpg',
    gallery: ['/images/product-monk.jpg', '/images/craft-stitch.jpg'],
    short: 'A single brass-buckled monk in copper calf. Formal, without stiffness.',
    description:
      'One strap, one solid-brass buckle, zero excess. The Single Monk is our evening shoe — copper calf polished to a deep glow, on a beveled waist.',
    details: ['Burnt-copper calf leather', 'Solid brass buckle', 'Beveled leather waist', 'Leather lined', 'Made in Lahore, Pakistan'],
    craft: 'Buckles are cast, tumbled and hand-polished in small batches.',
    rating: 4.9,
    reviews: 44,
    sizes: ['40', '41', '42', '43', '44', '45'],
  },
  {
    slug: 'the-lahore-derby',
    name: 'The Lahore Derby',
    colour: 'Espresso Grain',
    colourHex: '#4A3423',
    price: 44000,
    category: 'Derby',
    image: '/images/product-derby.jpg',
    gallery: ['/images/product-derby.jpg', '/images/story-founder.jpg'],
    short: 'Our open-laced derby — the everyday anchor of the wardrobe.',
    description:
      'Named for the city that makes it. An open-laced derby in grained espresso calf — roomier in the instep, immaculate with everything from pressed trousers to raw denim.',
    details: ['Grained espresso calf', 'Open 3-eyelet lacing', 'Rubber-injected leather sole', 'Padded collar', 'Made in Lahore, Pakistan'],
    craft: 'Grain is embossed, then hand-glazed for depth without shine.',
    rating: 4.8,
    reviews: 52,
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
  },
];

export const formatPKR = (n: number) => 'PKR ' + n.toLocaleString('en-PK');
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
