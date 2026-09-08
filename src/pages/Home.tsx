import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { CraftStrip, JournalCard, Marquee, ProductCard, SectionHead } from '../components/ui';
import { PRODUCTS } from '../lib/products';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Home() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <main>
      {/* ============ 1. HERO ============ */}
      <section className="relative bg-coal text-cream overflow-hidden grain -mt-[68px] md:-mt-[76px]">
        <div className="absolute inset-0">
          <img src="/images/hero-loafers.jpg" alt="ZAHYR espresso leather loafers with packaging" className="w-full h-full object-cover object-[70%_center] md:object-center img-warm animate-kenburns" />
          <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/72 to-coal/10 md:via-coal/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal/85 via-transparent to-coal/40" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-[150px] md:pt-[190px] pb-16 md:pb-24 min-h-[92vh] md:min-h-[100vh] flex flex-col justify-end md:justify-center">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease }}
              className="eyebrow text-rust mb-5 md:mb-7"
            >
              ROOTED IN CULTURE.
            </motion.p>
            <h1 className="headline-condensed text-[17vw] sm:text-[13vw] lg:text-[104px] xl:text-[118px]">
              <motion.span className="block text-cream" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35, ease }}>MADE TO BE</motion.span>
              <motion.span className="block text-gold" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease }}>WORN</motion.span>
              <motion.span className="block text-gold" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.62, ease }}>EVERYWHERE.</motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8, ease }}
              className="text-cream/75 font-light text-[15px] md:text-lg leading-relaxed mt-6 md:mt-8 max-w-md"
            >
              ZAHYR is a Pakistani-origin fashion house crafting footwear, apparel and lifestyle pieces for the modern man.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.92, ease }}
              className="flex flex-wrap gap-4 mt-8 md:mt-10"
            >
              <Link to="/footwear" className="btn-outline-light inline-flex items-center gap-4 px-8 py-4 text-cream">
                EXPLORE COLLECTION <ArrowRight size={15} />
              </Link>
              <Link to="/our-story" className="hidden sm:inline-flex items-center gap-4 px-8 py-4 nav-link text-cream/70 hover:text-gold transition-colors">
                OUR STORY
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
            className="hidden md:flex items-center gap-6 mt-16 text-[10px] tracking-[0.3em] text-cream/45"
          >
            <span>N°01 — THE FOUNDING COLLECTION</span>
            <span className="h-px w-24 bg-cream/25" />
            <span>FULL-GRAIN CALF · HAND-LASTED · LAHORE</span>
          </motion.div>
        </div>
      </section>

      {/* ============ 2. BRAND VALUES STRIP ============ */}
      <section className="grid grid-cols-2 lg:grid-cols-5 text-cream">
        <div className="bg-olive px-7 py-9 md:py-12 flex flex-col justify-center gap-3">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-cream/85"><path d="M14 4h16l3 5 4 2v8l-3 4 1 6-4 4-4 6H17l-4-6-4-4 1-6-3-4v-8l4-2 3-5z" /></svg>
          <p className="nav-link leading-relaxed">PREMIUM<br />CRAFTSMANSHIP</p>
          <p className="text-[13px] font-light text-cream/60 leading-relaxed">Finest materials.<br />Timeless quality.</p>
        </div>
        <div className="bg-cream-deep text-charcoal px-7 py-9 md:py-12 flex flex-col justify-center gap-3">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-charcoal/80"><path d="M6 32L30 8M30 8l-2 8 8-2M30 8l6-2M12 34c4 2 8 1 10-2 3-4 1-9-3-12" /><path d="M20 36c5 3 11 2 13-2 2-5-1-11-6-13" /></svg>
          <p className="nav-link leading-relaxed">HANDCRAFTED<br />IN PAKISTAN</p>
          <p className="text-[13px] font-light text-charcoal/60 leading-relaxed">Made with pride.<br />Rooted in heritage.</p>
        </div>
        <div className="relative overflow-hidden min-h-[190px] md:min-h-0">
          <img src="/images/craft-stitch.jpg" alt="Hand stitching leather" className="absolute inset-0 w-full h-full object-cover img-warm" />
        </div>
        <div className="bg-rust px-7 py-9 md:py-12 flex flex-col justify-center gap-3">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-cream/90"><circle cx="22" cy="22" r="14" /><ellipse cx="22" cy="22" rx="6.5" ry="14" /><path d="M8 22h28M10.5 14.5h23M10.5 29.5h23" /></svg>
          <p className="nav-link leading-relaxed">MADE TO BE<br />WORN EVERYWHERE</p>
          <p className="text-[13px] font-light text-cream/75 leading-relaxed">Designed for the world.<br />Inspired by home.</p>
        </div>
        <div className="relative overflow-hidden min-h-[190px] md:min-h-0 col-span-2 lg:col-span-1">
          <img src="/images/product-espresso-loafer.jpg" alt="ZAHYR leather detail" className="absolute inset-0 w-full h-full object-cover img-warm" />
          <div className="absolute inset-0 bg-espresso/35" />
          <p className="absolute bottom-5 left-6 font-serif-d text-cream tracking-[0.3em] text-sm">ZAHYR</p>
        </div>
      </section>

      {/* Presence bar */}
      <div className="bg-linen">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-7 flex items-center justify-between gap-6">
          <p className="nav-link !text-[10px] text-charcoal/70 hidden sm:block">NEW COLLECTION<br />NOW LIVE</p>
          <span className="hidden sm:block h-px flex-1 max-w-[140px] bg-charcoal/30 relative"> <span className="absolute right-0 -top-[3px] text-charcoal/50">→</span></span>
          <div className="flex items-center gap-5 mx-auto sm:mx-0">
            <span className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-charcoal/50 flex items-center justify-center font-serif-d text-2xl md:text-3xl">Z</span>
            <p className="nav-link !text-[10px] md:!text-[11px] text-charcoal leading-loose">PRESENCE IS OUR LANGUAGE.<br />STYLE IS OUR EXPRESSION.</p>
          </div>
          <span className="hidden sm:block h-px flex-1 max-w-[140px] bg-charcoal/30" />
          <Link to="/footwear" className="nav-link !text-[10px] text-charcoal/70 hover:text-rust hidden sm:block">DISCOVER MORE</Link>
        </div>
      </div>

      {/* ============ 3. FEATURED FOOTWEAR ============ */}
      <section className="bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <SectionHead
            eyebrow="01 — THE FOUNDING COLLECTION"
            title={<>Featured <span className="italic font-medium">Footwear</span></>}
            link="VIEW ALL"
            linkTo="/footwear"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {featured.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
          </div>
          <Reveal className="mt-12 text-center md:hidden">
            <Link to="/footwear" className="btn-solid-dark inline-flex items-center gap-3 px-10 py-4">VIEW ALL FOOTWEAR <ArrowRight size={14} /></Link>
          </Reveal>
        </div>
      </section>

      <Marquee items={['FULL-GRAIN CALF LEATHER', 'HAND-LASTED IN LAHORE', 'BLAKE-STITCHED SOLES', 'PRESENCE OVER NOISE', 'FREE SHIPPING OVER PKR 75,000']} />

      {/* ============ 4. CRAFTSMANSHIP EDITORIAL ============ */}
      <section className="bg-olive-deep text-cream grain relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <p className="eyebrow text-gold mb-5">02 — CRAFTSMANSHIP</p>
            <h2 className="font-serif-d text-5xl md:text-7xl leading-[1.0]">The Making<br />of <span className="italic text-gold-soft">Zahyr.</span></h2>
            <p className="text-cream/65 font-light leading-relaxed mt-7 max-w-md text-[15px] md:text-base">
              Two hundred and twelve operations. Forty-eight hours on the last. Every pair passes through the hands of master craftsmen in Lahore — cut, skived, lasted, stitched and burnished one pair at a time.
            </p>
            <div className="flex flex-wrap gap-8 mt-9">
              {[['212', 'HAND OPERATIONS'], ['48H', 'ON THE LAST'], ['100%', 'FULL-GRAIN']].map(([n, l]) => (
                <div key={l}>
                  <p className="headline-condensed text-4xl md:text-5xl text-gold">{n}</p>
                  <p className="text-[10px] tracking-[0.28em] text-cream/50 mt-2">{l}</p>
                </div>
              ))}
            </div>
            <Link to="/our-story" className="btn-outline-light inline-flex items-center gap-4 px-8 py-4 mt-10 text-cream">
              INSIDE THE ATELIER <ArrowRight size={14} />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7 overflow-hidden">
                <img src="/images/craft-hands.jpg" alt="Craftsman burnishing a loafer" className="w-full h-[320px] md:h-[460px] object-cover img-warm hover:scale-[1.03] transition-transform duration-[1.4s]" />
              </div>
              <div className="col-span-5 flex flex-col gap-4">
                <div className="overflow-hidden">
                  <img src="/images/craft-stitch.jpg" alt="Saddle stitch macro" className="w-full h-[200px] md:h-[280px] object-cover img-warm hover:scale-[1.03] transition-transform duration-[1.4s]" />
                </div>
                <div className="bg-rust p-6 md:p-7 flex-1 flex flex-col justify-center">
                  <p className="font-serif-d italic text-xl md:text-2xl leading-snug">“We don't chase seasons. We chase permanence.”</p>
                  <p className="text-[10px] tracking-[0.28em] mt-4 text-cream/80">— ATELIER NOTE N°4</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <CraftStrip />
      </section>

      {/* ============ 5. LIFESTYLE CAMPAIGN ============ */}
      <section className="relative bg-coal text-cream overflow-hidden">
        <img src="/images/campaign-man.jpg" alt="South Asian man wearing ZAHYR in contemporary courtyard" className="absolute inset-0 w-full h-full object-cover img-warm" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/85 via-coal/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-coal/30" />
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 py-28 md:py-44 min-h-[70vh] flex items-center">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-gold mb-5">03 — THE CAMPAIGN</p>
            <h2 className="headline-condensed text-6xl md:text-8xl">ROOTED<br />IN <span className="text-gold">CULTURE.</span></h2>
            <p className="text-cream/70 font-light leading-relaxed mt-6 max-w-md">
              Shot between Lahore and London. Worn with shalwar, tailoring, and denim — because true luxury never asks you to change who you are.
            </p>
            <Link to="/journal" className="btn-outline-light inline-flex items-center gap-4 px-8 py-4 mt-9 text-cream">
              VIEW THE JOURNAL <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ 6. FUTURE EXPANSION ============ */}
      <section className="bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <SectionHead eyebrow="04 — THE HOUSE EXPANDS" title={<>Beyond <span className="italic font-medium">Footwear</span></>} />
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              { img: '/images/apparel-teaser.jpg', k: 'APPAREL — 2027', t: 'A wardrobe, not a collection.', d: 'Wool overshirts, pressed trousers and knit polos — cut with the same restraint as our shoes.' },
              { img: '/images/accessories-teaser.jpg', k: 'ACCESSORIES — 2027', t: 'Small goods, same leather.', d: 'Belts, wallets and shoe-care cut from the same full-grain hides as our footwear.' },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.1}>
                <Link to="/our-story" className="group relative block overflow-hidden bg-espresso min-h-[420px] md:min-h-[520px] flex items-end">
                  <img src={c.img} alt={c.k} className="absolute inset-0 w-full h-full object-cover img-warm opacity-90 transition-transform duration-[1.4s] group-hover:scale-[1.04]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="relative p-8 md:p-12 text-cream">
                    <p className="eyebrow text-gold !text-[10px]">{c.k}</p>
                    <p className="font-serif-d text-3xl md:text-5xl mt-3">{c.t}</p>
                    <p className="text-sm font-light text-cream/70 mt-3 max-w-sm leading-relaxed">{c.d}</p>
                    <span className="inline-flex items-center gap-3 nav-link mt-6 border-b border-gold/60 pb-1 group-hover:gap-5 transition-all">NOTIFY ME <ArrowRight size={14} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journal preview */}
      <section className="bg-linen border-y border-charcoal/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <SectionHead eyebrow="05 — JOURNAL" title={<>Notes on <span className="italic font-medium">Presence</span></>} link="ALL STORIES" linkTo="/journal" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <Reveal><JournalCard img="/images/journal-1.jpg" tag="STYLE — N°12" title="The Loafer, Worn Three Ways" excerpt="From morning meetings to late dinners — one shoe, three registers of dress." date="AUG 2026" /></Reveal>
            <Reveal delay={0.1}><JournalCard img="/images/journal-2.jpg" tag="CULTURE — N°11" title="Lahore After Light" excerpt="An evening walk through the old city with photographer A. Rahman — and the new Chelsea." date="JUL 2026" /></Reveal>
            <Reveal delay={0.2}><JournalCard img="/images/story-leather.jpg" tag="CRAFT — N°10" title="Why Full-Grain Only" excerpt="Most brands won't show you their leather room. We built our story around ours." date="JUN 2026" /></Reveal>
          </div>
        </div>
      </section>

      {/* ============ 7. BRAND STORY CTA ============ */}
      <section className="relative bg-olive-deep text-cream overflow-hidden grain">
        <div className="absolute inset-0 opacity-[0.16]">
          <img src="/images/hero-loafers.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-36 text-center">
          <Reveal>
            <p className="font-urdu text-3xl md:text-4xl text-gold-soft mb-6">زاہِر</p>
            <h2 className="headline-condensed text-5xl md:text-7xl leading-[1.0]">CRAFTED IN PAKISTAN.<br /><span className="text-gold">MADE TO BE WORN</span><br />EVERYWHERE.</h2>
            <p className="text-cream/60 font-light mt-7 max-w-lg mx-auto leading-relaxed">Presence over noise. Join the house — or step into the founding collection.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link to="/footwear" className="btn-outline-light inline-flex items-center gap-4 px-9 py-4 text-cream">SHOP FOOTWEAR <ArrowRight size={14} /></Link>
              <Link to="/our-story" className="inline-flex items-center gap-4 px-9 py-4 nav-link text-cream/70 hover:text-gold transition-colors">READ OUR STORY</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
