import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { formatPKR, type Product } from '../lib/products';
import Reveal from './Reveal';

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link to={`/product/${p.slug}`} className="group block">
        <div className="relative overflow-hidden bg-linen aspect-[4/5]">
          <img
            src={p.image} alt={`${p.name} — ${p.colour}`}
            className="w-full h-full object-cover img-warm transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
          {p.badge && (
            <span className="absolute top-4 left-4 bg-coal/90 text-cream text-[10px] tracking-[0.22em] px-3 py-1.5">{p.badge.toUpperCase()}</span>
          )}
          <span className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-coal/95 text-cream nav-link py-4 text-center hidden md:block">
            VIEW PIECE →
          </span>
        </div>
        <div className="pt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif-d text-[22px] leading-none">{p.name}</h3>
            <p className="text-[11px] tracking-[0.2em] text-charcoal/55 mt-2">{p.colour.toUpperCase()} · {p.category.toUpperCase()}</p>
          </div>
          <p className="text-[14px] tracking-wide whitespace-nowrap pt-1">{formatPKR(p.price)}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function SectionHead({ eyebrow, title, link, linkTo = '/footwear', dark = false }: { eyebrow: string; title: ReactNode; link?: string; linkTo?: string; dark?: boolean }) {
  return (
    <Reveal>
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          <p className={`eyebrow mb-4 ${dark ? 'text-gold' : 'text-rust'}`}>{eyebrow}</p>
          <h2 className={`font-serif-d text-4xl md:text-6xl leading-[1.02] ${dark ? 'text-cream' : 'text-charcoal'}`}>{title}</h2>
        </div>
        {link && (
          <Link to={linkTo} className={`hidden md:inline-flex items-center gap-3 nav-link border-b pb-2 shrink-0 transition-colors ${dark ? 'text-cream border-cream/30 hover:text-gold hover:border-gold' : 'text-charcoal border-charcoal/30 hover:text-rust hover:border-rust'}`}>
            {link} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </Reveal>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-charcoal/10 bg-cream py-4 select-none">
      <div className="flex w-max animate-marquee gap-0">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 text-[11px] tracking-[0.3em] text-charcoal/60 whitespace-nowrap">
            {t} <span className="text-rust">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function CraftStrip() {
  const items = [
    { n: '01', t: 'Full-grain calf', d: 'Sourced from audited tanneries, cut only from the bend.' },
    { n: '02', t: 'Hand-lasted', d: 'Each upper rests 48 hours on beechwood lasts.' },
    { n: '03', t: 'Blake-stitched', d: 'A flexible, resoleable bond — made to be reworn for decades.' },
    { n: '04', t: 'Hand-burnished', d: 'Depth built in layers of cream, wax and patience.' },
  ];
  return (
    <div className="grid md:grid-cols-4 border-t border-cream/15">
      {items.map((c) => (
        <div key={c.n} className="px-8 py-8 md:py-10 border-b md:border-b-0 md:border-r border-cream/15 last:border-r-0">
          <p className="text-[11px] tracking-[0.3em] text-gold">{c.n}</p>
          <p className="font-serif-d text-2xl text-cream mt-3">{c.t}</p>
          <p className="text-sm font-light text-cream/60 mt-2 leading-relaxed">{c.d}</p>
        </div>
      ))}
    </div>
  );
}

export function JournalCard({ img, tag, title, excerpt, date }: { img: string; tag: string; title: string; excerpt: string; date: string }) {
  return (
    <Link to="/journal" className="group block">
      <div className="overflow-hidden aspect-[4/5] bg-linen">
        <img src={img} alt={title} className="w-full h-full object-cover img-warm transition-transform duration-[1.2s] group-hover:scale-[1.05]" loading="lazy" />
      </div>
      <p className="eyebrow !text-[10px] text-rust mt-5">{tag}</p>
      <h3 className="font-serif-d text-[28px] leading-[1.1] mt-2 group-hover:italic transition-all">{title}</h3>
      <p className="text-sm font-light text-charcoal/60 mt-2 line-clamp-2 leading-relaxed">{excerpt}</p>
      <p className="text-[11px] tracking-[0.2em] text-charcoal/45 mt-3 inline-flex items-center gap-2">{date} <ArrowUpRight size={13} /></p>
    </Link>
  );
}
