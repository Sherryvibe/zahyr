import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';

type Post = { img: string; tag: string; title: string; excerpt: string; body: string[]; date: string; read: string };

const POSTS: Post[] = [
  {
    img: '/images/journal-1.jpg', tag: 'STYLE', date: 'AUG 2026', read: '6 MIN READ',
    title: 'The Loafer, Worn Three Ways',
    excerpt: 'One shoe, three registers of dress — from a morning of meetings to a late dinner in DHA.',
    body: [
      'There is a particular confidence in owning one excellent shoe rather than six adequate ones. The Zahyr Loafer was designed for exactly that arithmetic — a penny strap clean enough for tailoring, soft enough for denim, and burnished deeply enough to hold its own after dark.',
      'Morning: charcoal tropical-wool trousers, an ecru shirt with the sleeves worn full, the espresso loafer sockless but never careless. The rule is restraint — let the burnish do the talking.',
      'Afternoon: raw indigo denim with a single turn-up, an olive overshirt, the same loafer. The chisel toe keeps the casual honest; the hand-stitched apron keeps it elevated.',
      'Evening: a midnight shalwar with a structured waistcoat. No socks, a short crop above the ankle, the loafer polished that morning. Presence, not costume — the ZAHYR register.',
    ],
  },
  {
    img: '/images/journal-2.jpg', tag: 'CULTURE', date: 'JUL 2026', read: '8 MIN READ',
    title: 'Lahore After Light',
    excerpt: 'An evening walk through the old city with photographer A. Rahman — and the new Chelsea boot.',
    body: [
      'The brief was simple: no studio, no styling van, no borrowed skylines. Photographer A. Rahman took the charcoal Chelsea through Delhi Gate at maghrib, when the sandstone holds the day’s heat and the bazaars switch on one bulb at a time.',
      'What emerges in the frames is the thesis of the house — a Pakistani object photographed as fashion, not folklore. The boot against Mughal brick reads as continuity, not contrast. We have always made beautiful things here. We are simply signing them now.',
      '“People abroad ask me where I’m from,” Rahman says, “and I tell them to look at the shoes first.”',
    ],
  },
  {
    img: '/images/craft-hands.jpg', tag: 'CRAFT', date: 'JUL 2026', read: '5 MIN READ',
    title: '212 Operations: Anatomy of a Loafer',
    excerpt: 'From hide inspection to final burnish — every station the founding loafer passes through.',
    body: [
      'One: the bend. Only the tightest-grained section of the hide is cut for the vamp — roughly forty percent of each skin never qualifies. Two: skiving, where edges are pared to half a millimetre so seams lie flat for decades.',
      'Three: closing, on vintage post-bed machines older than most of our craftsmen. Four: lasting — the upper is pulled over beechwood and left for forty-eight hours to learn its shape.',
      'Five through two hundred: stitching, welting, soling, edge-inking, burnishing, polishing, resting, inspecting. The final operation is always the same — a master holds the pair at arm’s length, turns it once, and either nods or starts again.',
    ],
  },
  {
    img: '/images/story-leather.jpg', tag: 'CRAFT', date: 'JUN 2026', read: '4 MIN READ',
    title: 'Why Full-Grain Only',
    excerpt: 'Most brands won’t show you their leather room. We built our story around ours.',
    body: [
      'Full-grain is the top layer of the hide — the only layer with intact fibres, the only layer that ages instead of wearing out. Corrected grain is sanded, coated in plastic and printed with a fake pore pattern. It looks perfect for a season, then cracks.',
      'We buy full-grain from two audited tanneries and reject one hide in five. It costs more. It means fewer pairs per month. It also means your loafers, conditioned twice a year, will outlive the trend cycle by a decade.',
      'Cheap leather is expensive. Good leather is merely honest.',
    ],
  },
  {
    img: '/images/campaign-man.jpg', tag: 'STYLE', date: 'MAY 2026', read: '5 MIN READ',
    title: 'Dressing Between Worlds',
    excerpt: 'For the man who boards in Lahore and lands in London — a wardrobe that never needs translating.',
    body: [
      'The modern Pakistani man lives between dress codes: the boardroom in Gulberg, the wedding in DHA, the conference in Dubai. Our answer is a wardrobe of bridges — pieces that read correctly in every room without changing register.',
      'The uniform: an unstructured olive overshirt over a pressed kurta collar, tapered charcoal trousers, the espresso loafer. Add a waistcoat after six. Nothing shouts; everything lands.',
      'Presence over noise is not a slogan. It is a packing list.',
    ],
  },
  {
    img: '/images/accessories-teaser.jpg', tag: 'HOUSE', date: 'APR 2026', read: '3 MIN READ',
    title: 'What Comes Next: Apparel & Small Goods',
    excerpt: 'Belts from the same hides. Overshirts with the same restraint. A note on 2027.',
    body: [
      'We have resisted expansion for six years — deliberately. A house should earn each category. In 2027, ZAHYR adds two: apparel and small leather goods.',
      'The logic is material, not commercial. Our belts will be cut from the same full-grain bends as our shoes. Our wallets from the same offcuts we currently burnish into key fobs. Our overshirts will follow the loafer’s code: clean, unlined where possible, built to be resoled — or rather, re-worn — for years.',
      'Join the inner circle below. The first hundred pieces of each will never reach the public site.',
    ],
  },
];

export default function Journal() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState('All');
  const post = POSTS[active];
  const cats = ['All', 'STYLE', 'CULTURE', 'CRAFT', 'HOUSE'];
  const filtered = POSTS.map((p, i) => ({ p, i })).filter(({ p }) => filter === 'All' || p.tag === filter);

  return (
    <main className="bg-cream">
      {/* Masthead */}
      <section className="bg-coal text-cream -mt-[68px] md:-mt-[76px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-[150px] md:pt-[180px] pb-12 md:pb-16 text-center">
          <p className="eyebrow text-gold mb-4">THE JOURNAL — EST. 2021</p>
          <h1 className="headline-condensed text-6xl md:text-8xl">NOTES ON <span className="text-gold">PRESENCE</span></h1>
          <p className="text-cream/60 font-light mt-5 max-w-lg mx-auto">Style, craft and culture — published monthly from Lahore. No noise, ever.</p>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {cats.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`nav-link !text-[10px] px-5 py-2.5 border transition-all ${filter === c ? 'bg-cream text-coal border-cream' : 'border-cream/25 text-cream/70 hover:border-cream'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <Reveal>
          <div className="grid lg:grid-cols-2 bg-coal text-cream overflow-hidden">
            <div className="overflow-hidden min-h-[300px]">
              <img key={post.img} src={post.img} alt={post.title} className="w-full h-full object-cover img-warm min-h-[300px] lg:min-h-[520px]" />
            </div>
            <div className="p-8 md:p-14 flex flex-col justify-center">
              <p className="eyebrow text-gold !text-[10px]">{post.tag} — {post.date} · {post.read}</p>
              <h2 className="font-serif-d text-4xl md:text-5xl leading-[1.05] mt-4">{post.title}</h2>
              <p className="text-cream/65 font-light mt-4 leading-relaxed">{post.excerpt}</p>
              <div className="mt-6 space-y-4 max-h-56 overflow-y-auto pr-2">
                {post.body.map((para, i) => (
                  <p key={i} className="text-[14px] font-light text-cream/75 leading-[1.8]">{para}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Index */}
        <div className="mt-12">
          <p className="eyebrow !text-[10px] text-charcoal/50 mb-5">INDEX — {filtered.length} STORIES</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {filtered.map(({ p, i }) => (
              <button key={p.title} onClick={() => { setActive(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`text-left group ${i === active ? '' : 'opacity-90'}`}>
                <div className={`overflow-hidden aspect-[16/10] bg-linen ${i === active ? 'ring-1 ring-charcoal ring-offset-4 ring-offset-cream' : ''}`}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover img-warm transition-transform duration-[1.2s] group-hover:scale-[1.05]" loading="lazy" />
                </div>
                <p className="eyebrow !text-[10px] text-rust mt-4">{p.tag} — {p.date}</p>
                <p className="font-serif-d text-2xl leading-tight mt-1.5 group-hover:italic">{p.title}</p>
                <p className="text-sm font-light text-charcoal/55 mt-1.5 line-clamp-2">{p.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] mt-3 text-charcoal/60 group-hover:text-rust">READ STORY <ArrowUpRight size={13} /></span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
