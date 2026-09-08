import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, ChevronDown, SlidersHorizontal } from 'lucide-react';
import Reveal from '../components/Reveal';
import { ProductCard } from '../components/ui';
import { PRODUCTS } from '../lib/products';

const CATS = ['All', 'Loafers', 'Boots', 'Derby', 'Monk Strap'];
type Sort = 'featured' | 'low' | 'high' | 'name';

export default function Collection() {
  const [params, setParams] = useSearchParams();
  const initialCat = params.get('cat') || 'All';
  const [cat, setCat] = useState(initialCat);
  const [sort, setSort] = useState<Sort>('featured');
  const [maxPrice, setMaxPrice] = useState(60000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => (cat === 'All' ? true : p.category === cat));
    l = l.filter((p) => p.price <= maxPrice);
    const s = [...l];
    if (sort === 'low') s.sort((a, b) => a.price - b.price);
    if (sort === 'high') s.sort((a, b) => b.price - a.price);
    if (sort === 'name') s.sort((a, b) => a.name.localeCompare(b.name));
    return s;
  }, [cat, sort, maxPrice]);

  const pickCat = (c: string) => {
    setCat(c);
    if (c === 'All') params.delete('cat'); else params.set('cat', c);
    setParams(params, { replace: true });
  };

  return (
    <main className="bg-cream">
      {/* Editorial banner */}
      <section className="relative bg-coal text-cream overflow-hidden -mt-[68px] md:-mt-[76px]">
        <img src="/images/craft-stitch.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 img-warm" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/60 to-coal/30" />
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-[160px] md:pt-[200px] pb-14 md:pb-20">
          <p className="eyebrow text-gold mb-4">THE COLLECTION — N°01</p>
          <h1 className="headline-condensed text-6xl md:text-8xl">FOOT<span className="text-gold">WEAR</span></h1>
          <p className="text-cream/65 font-light mt-5 max-w-lg leading-relaxed">Six styles. One last philosophy. Every pair hand-lasted in Lahore from full-grain calf — made to be resoled, reworn, and remembered.</p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-charcoal/15">
          <div className="hidden md:flex items-center gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => pickCat(c)}
                className={`nav-link px-5 py-2.5 border transition-all ${cat === c ? 'bg-charcoal text-cream border-charcoal' : 'border-charcoal/20 text-charcoal/70 hover:border-charcoal'}`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => setFiltersOpen((v) => !v)} className="md:hidden inline-flex items-center gap-2 nav-link border border-charcoal/25 px-5 py-2.5">
            <SlidersHorizontal size={14} /> FILTERS {list.length > 0 && `(${list.length})`}
          </button>
          <div className="flex items-center gap-4">
            <p className="text-[11px] tracking-[0.2em] text-charcoal/50">{list.length} PIECES</p>
            <label className="relative inline-flex items-center">
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="appearance-none bg-transparent border border-charcoal/25 pl-4 pr-10 py-2.5 text-[11px] tracking-[0.18em] outline-none cursor-pointer">
                <option value="featured">FEATURED</option>
                <option value="low">PRICE · LOW TO HIGH</option>
                <option value="high">PRICE · HIGH TO LOW</option>
                <option value="name">ALPHABETICAL</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 pointer-events-none text-charcoal/60" />
            </label>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10 pt-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-10">
              <div>
                <p className="eyebrow !text-[10px] text-charcoal/50 mb-5">STYLE</p>
                <ul className="space-y-3">
                  {CATS.map((c) => (
                    <li key={c}>
                      <button onClick={() => pickCat(c)} className={`flex items-center gap-3 text-sm tracking-wide ${cat === c ? 'text-charcoal' : 'text-charcoal/55 hover:text-charcoal'}`}>
                        <span className={`w-4 h-4 border flex items-center justify-center ${cat === c ? 'bg-charcoal border-charcoal text-cream' : 'border-charcoal/30'}`}>
                          {cat === c && <Check size={11} />}
                        </span>
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow !text-[10px] text-charcoal/50 mb-5">MAX PRICE — PKR {maxPrice.toLocaleString()}</p>
                <input type="range" min={35000} max={60000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#283A29]" />
                <div className="flex justify-between text-[11px] text-charcoal/50 mt-2 tracking-wider"><span>35K</span><span>60K</span></div>
              </div>
              <div className="bg-olive text-cream p-6">
                <p className="font-serif-d text-xl leading-snug italic">Not sure of your size?</p>
                <p className="text-[13px] font-light text-cream/65 mt-2 leading-relaxed">ZAHYR lasts run true to UK sizing. Between sizes? Take the smaller.</p>
              </div>
            </div>
          </aside>

          {/* Mobile filter panel */}
          {filtersOpen && (
            <div className="lg:hidden border border-charcoal/15 p-5 space-y-5 bg-linen">
              <div className="flex flex-wrap gap-2">
                {CATS.map((c) => (
                  <button key={c} onClick={() => pickCat(c)} className={`nav-link px-4 py-2 border ${cat === c ? 'bg-charcoal text-cream border-charcoal' : 'border-charcoal/25'}`}>{c.toUpperCase()}</button>
                ))}
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] mb-2">MAX PRICE — PKR {maxPrice.toLocaleString()}</p>
                <input type="range" min={35000} max={60000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#283A29]" />
              </div>
            </div>
          )}

          {/* Grid */}
          <div>
            {list.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif-d text-3xl">No pieces at this price.</p>
                <button onClick={() => { setMaxPrice(60000); pickCat('All'); }} className="nav-link border-b border-charcoal mt-4 pb-1">RESET FILTERS</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {list.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
              </div>
            )}
            <Reveal className="mt-16 bg-espresso text-cream p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
              <div>
                <p className="eyebrow text-gold !text-[10px] mb-2">THE ZAHYR PROMISE</p>
                <p className="font-serif-d text-2xl md:text-3xl">Free resoling in year one. Complimentary shipping over PKR 75,000.</p>
              </div>
              <p className="text-sm font-light text-cream/65 max-w-xs leading-relaxed">Every pair is registered to its owner. Bring them home to Lahore — or any stockist — and we restore them.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
