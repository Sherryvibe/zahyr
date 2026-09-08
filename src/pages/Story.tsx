import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';

const CHAPTERS = [
  { n: '01', img: '/images/story-founder.jpg', t: 'The last-maker’s grandson', d: 'ZAHYR began in a two-room workshop off Lahore’s Brandreth Road, where our founder swept floors for his grandfather — a last-maker who believed a shoe should outlive its owner. The brogues were European. The hands were Lahori. The idea lodged early: why should the world’s finest shoes never carry our name?' },
  { n: '02', img: '/images/story-leather.jpg', t: 'Leather before logo', d: 'We spent two years before selling a single pair — sourcing full-grain hides, testing tanneries, breaking a hundred prototypes. No logo was drawn until the leather earned it. To this day every hide is inspected by hand, and one in five never makes it to the cutting table.' },
  { n: '03', img: '/images/craft-hands.jpg', t: 'Presence over noise', d: 'ZAHYR — زاہِر — means the visible, the present, the evident. Not loud. Not hidden. Simply there, fully. That is our design code: clean lines, honest materials, nothing decorative that doesn’t serve the wearer. A shoe that enters the room a half-second after you do.' },
];

const VALUES = [
  ['Craft before calendar', 'We release when the shoe is ready — not when the season demands it.'],
  ['Fewer, better pairs', 'Six styles, perfected. We would rather resole your shoes for a decade than sell you twelve forgettable ones.'],
  ['Rooted, not costumed', 'Pakistani origin lives in our making, our people and our pride — never in borrowed motifs or clichés.'],
  ['Worn everywhere', 'Designed in Lahore for Lahore, Dubai, London and everywhere a modern man walks.'],
];

export default function Story() {
  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="relative bg-coal text-cream overflow-hidden grain -mt-[68px] md:-mt-[76px]">
        <img src="/images/story-founder.jpg" alt="Master shoemaker" className="absolute inset-0 w-full h-full object-cover opacity-45 img-warm" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/55 to-coal/30" />
        <div className="relative max-w-[1100px] mx-auto px-6 pt-[170px] md:pt-[210px] pb-16 md:pb-24 text-center">
          <p className="font-urdu text-2xl md:text-3xl text-gold-soft">زاہِر</p>
          <p className="eyebrow text-gold mt-4 mb-5">OUR STORY</p>
          <h1 className="font-serif-d text-5xl md:text-7xl leading-[1.02] max-w-3xl mx-auto">The visible one.<br /><span className="italic text-cream/85">Made by invisible hands.</span></h1>
          <p className="text-cream/65 font-light mt-6 max-w-xl mx-auto leading-relaxed">A Pakistani-origin fashion house built on a simple conviction — that the finest shoes in the world can carry a Lahori name.</p>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-olive text-cream">
        <div className="max-w-4xl mx-auto px-6 py-14 md:py-20 text-center">
          <Reveal>
            <p className="font-serif-d italic text-3xl md:text-[40px] leading-[1.25]">“My grandfather made shoes for men who never knew his name. ZAHYR is his name, finally — <span className="text-gold-soft not-italic">written on the insole of every pair.”</span></p>
            <p className="text-[11px] tracking-[0.3em] text-cream/55 mt-6">— THE FOUNDER, LAHORE</p>
          </Reveal>
        </div>
      </section>

      {/* Chapters */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28 space-y-20 md:space-y-28">
        {CHAPTERS.map((c, i) => (
          <div key={c.n} className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? '' : ''}`}>
            <Reveal className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <div className="overflow-hidden">
                <img src={c.img} alt={c.t} className="w-full h-[320px] md:h-[440px] object-cover img-warm hover:scale-[1.03] transition-transform duration-[1.4s]" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <p className="text-[11px] tracking-[0.3em] text-rust">CHAPTER {c.n}</p>
              <h2 className="font-serif-d text-4xl md:text-5xl mt-4 leading-tight">{c.t}</h2>
              <p className="text-charcoal/70 font-light leading-[1.85] mt-5 text-[15px]">{c.d}</p>
            </Reveal>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="bg-coal text-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {([['2019', 'FOUNDED IN LAHORE'], ['27', 'MASTER CRAFTSMEN'], ['212', 'HAND OPERATIONS'], ['14', 'COUNTRIES WORN IN']] as const).map(([n, l]) => (
            <Reveal key={l}>
              <p className="headline-condensed text-5xl md:text-6xl text-gold">{n}</p>
              <p className="text-[10px] tracking-[0.28em] text-cream/50 mt-3">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <Reveal>
          <p className="eyebrow text-rust mb-4">WHAT WE STAND FOR</p>
          <h2 className="font-serif-d text-4xl md:text-6xl">Four quiet <span className="italic">convictions</span></h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-px bg-charcoal/15 border border-charcoal/15 mt-12">
          {VALUES.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06} className="bg-cream">
              <div className="p-8 md:p-12">
                <p className="text-[11px] tracking-[0.3em] text-rust">0{i + 1}</p>
                <p className="font-serif-d text-3xl mt-3">{t}</p>
                <p className="text-charcoal/60 font-light mt-3 leading-relaxed text-[15px]">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-14">
          <p className="font-urdu text-2xl text-espresso/70">حاضر — موجود — زاہِر</p>
          <div className="flex flex-wrap justify-center gap-4 mt-7">
            <Link to="/footwear" className="btn-solid-dark inline-flex items-center gap-3 px-10 py-4">SHOP THE COLLECTION <ArrowRight size={14} /></Link>
            <Link to="/journal" className="inline-flex items-center gap-3 px-10 py-4 nav-link border border-charcoal/25 hover:border-charcoal">READ THE JOURNAL</Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
