import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Minus, Plus, RotateCcw, Ruler, ShieldCheck, Truck } from 'lucide-react';
import Reveal from '../components/Reveal';
import { ProductCard } from '../components/ui';
import { PRODUCTS, formatPKR, getProduct } from '../lib/products';
import { useCart } from '../lib/store';

export default function ProductPage() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  const navigate = useNavigate();
  const { add } = useCart();

  const [img, setImg] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState<'details' | 'shipping' | 'care'>('details');

  useEffect(() => {
    setImg(0); setSize(null); setQty(1); setSizeError(false); setAdded(false);
    window.scrollTo({ top: 0 });
  }, [slug]);

  const related = useMemo(() => PRODUCTS.filter((p) => p.slug !== slug).slice(0, 3), [slug]);

  if (!product) {
    return (
      <main className="bg-cream min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow text-rust">404</p>
        <h1 className="font-serif-d text-5xl mt-4">This piece no longer exists.</h1>
        <Link to="/footwear" className="btn-solid-dark px-8 py-4 mt-8 inline-block">BACK TO FOOTWEAR</Link>
      </main>
    );
  }

  const handleAdd = () => {
    if (!size) { setSizeError(true); return; }
    add(product.slug, size, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  return (
    <main className="bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 md:pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 nav-link !text-[10px] text-charcoal/55 hover:text-charcoal">
          <ArrowLeft size={13} /> BACK
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-16 md:pb-24 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28 self-start">
          <div className="relative bg-linen aspect-[4/5] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={product.gallery[img]}
                src={product.gallery[img]} alt={product.name}
                initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover img-warm"
              />
            </AnimatePresence>
            {product.badge && (
              <span className="absolute top-4 left-4 bg-coal/90 text-cream text-[10px] tracking-[0.22em] px-3 py-1.5">{product.badge.toUpperCase()}</span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {product.gallery.map((g, i) => (
              <button key={g + i} onClick={() => setImg(i)} className={`aspect-[4/3] overflow-hidden bg-linen transition-all ${img === i ? 'ring-1 ring-charcoal ring-offset-2 ring-offset-cream' : 'opacity-70 hover:opacity-100'}`}>
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow text-rust">{product.category.toUpperCase()} — N°01</p>
          <h1 className="font-serif-d text-5xl md:text-6xl leading-[1.0] mt-4">{product.name}</h1>
          <p className="text-[12px] tracking-[0.22em] text-charcoal/55 mt-3">{product.colour.toUpperCase()} · FULL-GRAIN CALF</p>

          <div className="flex items-center gap-3 mt-5">
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.6 5.5 21l2-7.5L2 9h7z" /></svg>
              ))}
            </div>
            <span className="text-[12px] tracking-[0.14em] text-charcoal/55">{product.rating.toFixed(1)} · {product.reviews} REVIEWS</span>
          </div>

          <p className="font-serif-d text-4xl mt-6">{formatPKR(product.price)}</p>
          <p className="text-[12px] font-light text-charcoal/55 mt-1">Duties included · Complimentary shipping over PKR 75,000</p>

          <p className="text-[15px] font-light leading-relaxed text-charcoal/80 mt-6">{product.description}</p>
          <p className="text-[13px] italic font-serif-d text-lg text-espresso mt-4">“{product.craft}”</p>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <p className="nav-link !text-[10px]">SELECT SIZE (EU)</p>
              <button className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] text-charcoal/55 hover:text-charcoal"><Ruler size={13} /> SIZE GUIDE</button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s} onClick={() => { setSize(s); setSizeError(false); }}
                  className={`py-3 text-sm tracking-widest border transition-all ${size === s ? 'bg-charcoal text-cream border-charcoal' : 'border-charcoal/25 hover:border-charcoal'}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <p className="text-[12px] tracking-wide text-rust mt-2">Please select a size first.</p>}
          </div>

          {/* Qty + Add */}
          <div className="flex gap-3 mt-7">
            <div className="flex items-center border border-charcoal/25">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-4" aria-label="Decrease"><Minus size={14} /></button>
              <span className="w-8 text-center">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(9, q + 1))} className="px-4 py-4" aria-label="Increase"><Plus size={14} /></button>
            </div>
            <button onClick={handleAdd} className={`flex-1 py-4 nav-link transition-all flex items-center justify-center gap-3 ${added ? 'bg-olive text-cream' : 'bg-charcoal text-cream hover:bg-olive'}`}>
              {added ? <><Check size={15} /> ADDED TO BAG</> : <>ADD TO BAG — {formatPKR(product.price * qty)}</>}
            </button>
          </div>
          <Link to="/cart" className="mt-3 w-full py-4 border border-charcoal/30 nav-link flex items-center justify-center gap-3 hover:border-charcoal transition-colors">
            BUY IT NOW <ArrowRight size={14} />
          </Link>

          {/* Assurances */}
          <div className="grid grid-cols-3 gap-3 mt-7 text-center">
            {[
              { icon: Truck, t: 'Free ship 75K+' },
              { icon: RotateCcw, t: '30-day returns' },
              { icon: ShieldCheck, t: '1-yr resoling' },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="border border-charcoal/12 py-4 px-2">
                <Icon size={17} strokeWidth={1.5} className="mx-auto text-espresso" />
                <p className="text-[10px] tracking-[0.16em] mt-2 text-charcoal/70">{t.toUpperCase()}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-8 border-t border-charcoal/15">
            {(['details', 'shipping', 'care'] as const).map((t) => {
              const open = tab === t;
              return (
                <div key={t} className="border-b border-charcoal/15">
                  <button onClick={() => setTab(t)} className="w-full flex items-center justify-between py-4 nav-link !text-[10px] text-left hover:text-rust transition-colors">
                    {t === 'details' ? 'DETAILS & MATERIALS' : t === 'shipping' ? 'SHIPPING & RETURNS' : 'LEATHER CARE'}
                    <span className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`}><Plus size={14} /></span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: 'easeInOut' }} className="overflow-hidden">
                        <div className="pb-5">
                          {t === 'details' && (
                            <ul className="space-y-2">
                              {product.details.map((d) => (
                                <li key={d} className="flex gap-3 text-sm font-light text-charcoal/75"><span className="text-rust">—</span> {d}</li>
                              ))}
                            </ul>
                          )}
                          {t === 'shipping' && <p className="text-sm font-light text-charcoal/75 leading-relaxed">Dispatched from Lahore in 24–48 hours. Complimentary nationwide shipping over PKR 75,000 (otherwise PKR 950). 30-day returns, unworn, in original packaging. International delivery to the UAE, UK and US in 4–7 days.</p>}
                          {t === 'care' && <p className="text-sm font-light text-charcoal/75 leading-relaxed">Brush after wear, rest 24 hours between wears on beechwood trees, condition monthly. Every ZAHYR pair includes a complimentary first conditioning at any stockist.</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Craft band */}
      <section className="bg-olive-deep text-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-14 md:py-20 grid md:grid-cols-3 gap-8 items-center">
          <Reveal><p className="font-serif-d text-3xl md:text-4xl leading-tight">Worn in, <span className="italic text-gold-soft">never worn out.</span></p></Reveal>
          <Reveal delay={0.1}><p className="text-sm font-light text-cream/65 leading-relaxed">Blake-stitched soles can be resoled again and again. Full-grain calf only gets better — scuffs buff out, patina builds, the shoe becomes yours.</p></Reveal>
          <Reveal delay={0.2}><img src="/images/craft-stitch.jpg" alt="Stitching detail" className="w-full h-44 object-cover img-warm" /></Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif-d text-4xl md:text-5xl">Complete the <span className="italic">rotation</span></h2>
            <Link to="/footwear" className="hidden md:inline-flex items-center gap-2 nav-link border-b border-charcoal/30 pb-1">VIEW ALL <ArrowRight size={13} /></Link>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {related.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
        </div>
      </section>
    </main>
  );
}
