import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <footer className="bg-coal text-cream">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow text-gold mb-4">THE INNER CIRCLE</p>
            <p className="font-serif-d text-4xl md:text-5xl leading-[1.05]">First access to drops,<br /><span className="italic text-cream/85">stories & private previews.</span></p>
          </div>
          <div>
            {done ? (
              <div className="flex items-center gap-3 border border-gold/40 px-6 py-5">
                <Check size={18} className="text-gold" />
                <p className="text-sm tracking-wide text-cream/85">Welcome to the house. Your first letter arrives soon.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setDone(true); }}
                className="flex border-b border-cream/30 focus-within:border-gold transition-colors"
              >
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-transparent flex-1 py-4 outline-none text-[15px] font-light placeholder:text-cream/35"
                />
                <button className="inline-flex items-center gap-3 nav-link text-cream hover:text-gold transition-colors pl-4" type="submit">
                  SUBSCRIBE <ArrowRight size={14} />
                </button>
              </form>
            )}
            <p className="text-[11px] tracking-[0.14em] text-cream/40 mt-4 font-light">ONE LETTER A MONTH. NO NOISE — PRESENCE ONLY.</p>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-14 grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div>
          <p className="font-serif-d text-3xl tracking-[0.28em]">ZAHYR</p>
          <p className="font-urdu text-xl text-cream/70 mt-1">زاہِر</p>
          <p className="text-sm font-light text-cream/55 leading-relaxed mt-5 max-w-xs">
            A Pakistani-origin fashion house crafting footwear, apparel and lifestyle pieces for the modern man. Presence over noise.
          </p>
          <div className="flex gap-5 mt-6 text-[11px] tracking-[0.2em] text-cream/60">
            {['INSTAGRAM', 'FACEBOOK', 'TIKTOK'].map((s) => (
              <a key={s} href="#" onClick={(e) => e.preventDefault()} className="hover:text-gold transition-colors">{s}</a>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-cream/40 mb-5 !text-[10px]">SHOP</p>
          <ul className="space-y-3 text-sm font-light text-cream/70">
            <li><Link to="/footwear" className="hover:text-gold">All Footwear</Link></li>
            <li><Link to="/footwear?cat=Loafers" className="hover:text-gold">Loafers</Link></li>
            <li><Link to="/footwear?cat=Boots" className="hover:text-gold">Boots</Link></li>
            <li><Link to="/footwear?cat=Derby" className="hover:text-gold">Derby</Link></li>
            <li><Link to="/cart" className="hover:text-gold">Cart & Checkout</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-cream/40 mb-5 !text-[10px]">HOUSE</p>
          <ul className="space-y-3 text-sm font-light text-cream/70">
            <li><Link to="/our-story" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/journal" className="hover:text-gold">Journal</Link></li>
            <li><Link to="/footwear" className="hover:text-gold">Craftsmanship</Link></li>
            <li><Link to="/our-story" className="hover:text-gold">Stockists</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-cream/40 mb-5 !text-[10px]">CARE</p>
          <ul className="space-y-3 text-sm font-light text-cream/70">
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gold">Shipping & Returns</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gold">Size Guide</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gold">Leather Care</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gold">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.22em] text-cream/40">
          <p>© 2026 ZAHYR · LAHORE — DUBAI — LONDON</p>
          <p>CRAFTED IN PAKISTAN. MADE TO BE WORN EVERYWHERE.</p>
        </div>
      </div>
    </footer>
  );
}
