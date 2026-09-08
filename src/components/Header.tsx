import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, Minus, Plus, Search, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../lib/store';
import { PRODUCTS, formatPKR, getProduct } from '../lib/products';

const NAV = [
  { label: 'FOOTWEAR', to: '/footwear', menu: 'footwear' },
  { label: 'APPAREL', to: '/footwear', menu: 'apparel' },
  { label: 'ACCESSORIES', to: '/footwear', menu: 'accessories' },
  { label: 'OUR STORY', to: '/our-story', menu: null },
  { label: 'JOURNAL', to: '/journal', menu: null },
] as const;

function MegaMenu({ kind, onClose }: { kind: string; onClose: () => void }) {
  const navigate = useNavigate();
  if (kind === 'footwear') {
    return (
      <div className="grid grid-cols-[1fr_1fr_260px] gap-10">
        <div>
          <p className="eyebrow text-sand mb-5">SHOP BY STYLE</p>
          <ul className="space-y-3">
            {['Loafers', 'Boots', 'Derby', 'Monk Strap'].map((c) => (
              <li key={c}>
                <button
                  onClick={() => { navigate(`/footwear?cat=${encodeURIComponent(c)}`); onClose(); }}
                  className="font-serif-d text-2xl text-cream hover:text-gold transition-colors"
                >
                  {c}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => { navigate('/footwear'); onClose(); }} className="nav-link text-gold inline-flex items-center gap-2 mt-2">
                VIEW ALL FOOTWEAR <ArrowRight size={13} />
              </button>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-sand mb-5">FEATURED</p>
          <ul className="space-y-3">
            {PRODUCTS.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Link to={`/product/${p.slug}`} onClick={onClose} className="group flex items-center gap-4">
                  <img src={p.image} alt={p.name} className="w-12 h-14 object-cover" />
                  <span>
                    <span className="block text-[13px] tracking-wide text-cream group-hover:text-gold">{p.name}</span>
                    <span className="block text-[11px] tracking-[0.18em] text-cream/50">{formatPKR(p.price)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden">
          <img src="/images/hero-loafers.jpg" alt="ZAHYR loafers" className="w-full h-56 object-cover img-warm" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <p className="eyebrow text-gold !text-[10px]">THE ICON</p>
            <p className="font-serif-d text-xl text-cream italic">The Zahyr Loafer</p>
          </div>
        </div>
      </div>
    );
  }
  const apparel = kind === 'apparel';
  return (
    <div className="grid grid-cols-[1fr_280px] gap-10 items-center">
      <div>
        <p className="eyebrow text-rust mb-4">{apparel ? 'COMING 2027' : 'COMING 2027'}</p>
        <p className="font-serif-d text-4xl text-cream leading-tight">
          {apparel ? (
            <>Tailoring & overshirts,<br /><span className="italic text-gold-soft">cut in Lahore.</span></>
          ) : (
            <>Belts, wallets & care,<br /><span className="italic text-gold-soft">in the same leather.</span></>
          )}
        </p>
        <p className="text-cream/60 text-sm mt-4 max-w-md font-light leading-relaxed">
          {apparel
            ? 'A small wardrobe of essentials — wool overshirts, pressed trousers, knit polos. Join the list to shop first.'
            : 'Small leather goods cut from the same full-grain hides as our shoes. Join the list to shop first.'}
        </p>
        <button onClick={() => { navigate('/our-story'); onClose(); }} className="nav-link text-cream inline-flex items-center gap-2 mt-6 border-b border-gold/60 pb-1">
          OUR STORY <ArrowRight size={13} />
        </button>
      </div>
      <div className="relative overflow-hidden">
        <img src={apparel ? '/images/apparel-teaser.jpg' : '/images/accessories-teaser.jpg'} alt={kind} className="w-full h-60 object-cover img-warm" />
      </div>
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div className="bg-olive-deep text-cream/90 relative z-[60]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-9 flex items-center justify-between gap-4">
        <p className="text-[10px] md:text-[11px] tracking-[0.22em] font-light truncate">
          CRAFTED IN PAKISTAN. <span className="text-gold-soft hidden sm:inline">MADE TO BE WORN EVERYWHERE.</span>
        </p>
        <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-[11px] tracking-[0.18em] shrink-0">
          <button className="hidden md:inline-flex items-center gap-1 hover:text-gold-soft transition-colors">PAKISTAN (PKR) <ChevronDown size={12} /></button>
          <button className="hidden md:inline-flex items-center gap-1 hover:text-gold-soft transition-colors">EN <ChevronDown size={12} /></button>
          <CartOpenButton />
        </div>
      </div>
    </div>
  );
}

function CartOpenButton() {
  const { count, setDrawerOpen } = useCart();
  return (
    <button onClick={() => setDrawerOpen(true)} className="inline-flex items-center gap-1.5 hover:text-gold-soft transition-colors tracking-[0.18em]">
      <ShoppingBag size={12} className="md:hidden" />
      <span>CART ({count})</span>
    </button>
  );
}

export function Header({ overHero = false }: { overHero?: boolean }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const solid = scrolled || !overHero || openMenu || mobileOpen;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-500 ${solid ? 'bg-coal/95 backdrop-blur-md border-b border-white/10' : 'bg-gradient-to-b from-black/60 to-transparent'}`}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-[68px] md:h-[76px] flex items-center justify-between gap-6">
          {/* Left: logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="ZAHYR home">
            <span className="font-serif-d text-[26px] md:text-[30px] tracking-[0.28em] text-cream leading-none pl-1">ZAHYR</span>
            <span className="hidden sm:block w-px h-7 bg-cream/25" />
            <span className="hidden sm:block font-urdu text-[22px] md:text-[24px] text-cream/90 leading-none pt-1">زاہِر</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setOpenMenu(item.menu)}>
                {item.menu ? (
                  <button
                    onClick={() => setOpenMenu(openMenu === item.menu ? null : (item.menu as string))}
                    className={`nav-link py-8 transition-colors ${openMenu === item.menu ? 'text-gold' : 'text-cream/90 hover:text-gold-soft'}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `nav-link py-8 inline-block transition-colors ${isActive ? 'text-gold' : 'text-cream/90 hover:text-gold-soft'}`}
                  >
                    {item.label}
                  </NavLink>
                )}
                {item.menu && openMenu === item.menu && (
                  <span className="absolute -bottom-0 left-0 right-0 h-px bg-gold" />
                )}
              </div>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="text-cream/90 hover:text-gold p-2 transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link to="/footwear" className="btn-outline-light hidden md:inline-flex items-center gap-4 px-7 py-3 text-cream ml-2">
              SHOP NOW <ArrowRight size={14} />
            </Link>
            <button className="lg:hidden text-cream p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              key={openMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="hidden lg:block absolute top-full left-0 right-0 bg-coal/98 backdrop-blur-xl border-t border-white/10 border-b border-gold/20"
            >
              <div className="max-w-[1100px] mx-auto px-8 py-10">
                <MegaMenu kind={openMenu} onClose={() => setOpenMenu(null)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-[70] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-olive-deep text-cream flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-[68px] border-b border-white/10">
                <span className="font-serif-d text-xl tracking-[0.28em]">ZAHYR <span className="font-urdu tracking-normal text-base">زاہِر</span></span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2"><X size={22} strokeWidth={1.5} /></button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
                {[
                  { label: 'FOOTWEAR', to: '/footwear' },
                  { label: 'OUR STORY', to: '/our-story' },
                  { label: 'JOURNAL', to: '/journal' },
                  { label: 'CART', to: '/cart' },
                ].map((l, i) => (
                  <Link key={l.label} to={l.to} className="flex items-center justify-between py-4 border-b border-white/10 group">
                    <span className="flex items-baseline gap-4">
                      <span className="text-[10px] tracking-[0.2em] text-gold">0{i + 1}</span>
                      <span className="headline-condensed text-3xl text-cream group-active:text-gold">{l.label}</span>
                    </span>
                    <ArrowRight size={16} className="text-cream/40" />
                  </Link>
                ))}
                <div className="pt-6">
                  <p className="eyebrow text-gold mb-3">COMING 2027</p>
                  <p className="text-sm text-cream/60 font-light">Apparel & Accessories — join the list via the newsletter below.</p>
                </div>
              </nav>
              <div className="px-6 pb-8">
                <Link to="/footwear" className="btn-outline-light flex items-center justify-center gap-3 py-4 text-cream w-full">
                  SHOP NOW <ArrowRight size={14} />
                </Link>
                <p className="text-center text-[10px] tracking-[0.25em] text-cream/40 mt-5">CRAFTED IN PAKISTAN</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function CartDrawer() {
  const { lines, drawerOpen, setDrawerOpen, setQty, remove, subtotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const shipping = subtotal >= 75000 || subtotal === 0 ? 0 : 950;

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream text-charcoal flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-charcoal/10">
              <p className="nav-link">YOUR BAG ({lines.reduce((a, l) => a + l.qty, 0)})</p>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close cart" className="p-2"><X size={20} strokeWidth={1.5} /></button>
            </div>

            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <ShoppingBag size={30} strokeWidth={1} className="text-charcoal/30" />
                <p className="font-serif-d text-3xl mt-5">Your bag is empty.</p>
                <p className="text-sm text-charcoal/60 font-light mt-2">Presence begins with the first pair.</p>
                <button onClick={() => { setDrawerOpen(false); navigate('/footwear'); }} className="btn-solid-dark px-8 py-4 mt-7">
                  EXPLORE FOOTWEAR
                </button>
              </div>
            ) : (
              <>
                <div className="bg-olive text-cream px-6 py-3 text-[11px] tracking-[0.14em] font-light">
                  {shipping === 0 ? 'COMPLIMENTARY SHIPPING UNLOCKED — PAKISTAN' : `ADD ${formatPKR(75000 - subtotal)} MORE FOR COMPLIMENTARY SHIPPING`}
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                  {lines.map((l) => {
                    const p = getProduct(l.slug);
                    if (!p) return null;
                    return (
                      <div key={l.slug + l.size} className="flex gap-4">
                        <Link to={`/product/${p.slug}`} onClick={() => setDrawerOpen(false)} className="w-20 h-24 bg-linen shrink-0 overflow-hidden">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-serif-d text-lg leading-tight">{p.name}</p>
                              <p className="text-[11px] tracking-[0.16em] text-charcoal/55 mt-1">{p.colour.toUpperCase()} · EU {l.size}</p>
                            </div>
                            <button onClick={() => remove(l.slug, l.size)} aria-label="Remove" className="text-charcoal/40 hover:text-charcoal p-1">
                              <Trash2 size={15} strokeWidth={1.5} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-charcoal/20">
                              <button onClick={() => setQty(l.slug, l.size, l.qty - 1)} className="p-2 px-2.5" aria-label="Decrease"><Minus size={13} /></button>
                              <span className="text-sm w-6 text-center">{l.qty}</span>
                              <button onClick={() => setQty(l.slug, l.size, l.qty + 1)} className="p-2 px-2.5" aria-label="Increase"><Plus size={13} /></button>
                            </div>
                            <p className="text-sm tracking-wide">{formatPKR(p.price * l.qty)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-charcoal/10 px-6 py-5 bg-cream">
                  <div className="flex justify-between text-sm font-light text-charcoal/70">
                    <span>Subtotal</span><span className="text-charcoal">{formatPKR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-light text-charcoal/70 mt-1.5">
                    <span>Shipping</span><span className="text-charcoal">{shipping === 0 ? 'Complimentary' : formatPKR(shipping)}</span>
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-charcoal/10">
                    <span className="nav-link">TOTAL</span>
                    <span className="font-serif-d text-2xl">{formatPKR(subtotal + shipping)}</span>
                  </div>
                  <button
                    onClick={() => { setDrawerOpen(false); navigate('/cart'); }}
                    className="btn-solid-dark w-full py-4 mt-4 flex items-center justify-center gap-3"
                  >
                    CHECKOUT <ArrowRight size={14} />
                  </button>
                  <button onClick={() => setDrawerOpen(false)} className="w-full text-center nav-link text-charcoal/60 mt-3 hover:text-charcoal">
                    CONTINUE SHOPPING
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const results = q.trim().length > 1
    ? PRODUCTS.filter((p) => (p.name + p.colour + p.category).toLowerCase().includes(q.toLowerCase())).slice(0, 4)
    : [];
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] bg-coal/97 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="max-w-2xl mx-auto px-6 pt-28">
            <div className="flex items-center justify-between mb-8">
              <p className="eyebrow text-gold">SEARCH ZAHYR</p>
              <button onClick={onClose} className="text-cream p-2"><X size={22} /></button>
            </div>
            <div className="flex items-center gap-4 border-b border-cream/30 pb-4">
              <Search size={20} className="text-cream/60" />
              <input
                autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Loafer, Chelsea, Derby…"
                className="bg-transparent flex-1 outline-none font-serif-d text-3xl text-cream placeholder:text-cream/25 italic"
                onKeyDown={(e) => { if (e.key === 'Enter' && results[0]) { navigate(`/product/${results[0].slug}`); onClose(); } }}
              />
            </div>
            <div className="mt-6 space-y-1">
              {results.map((p) => (
                <button key={p.slug} onClick={() => { navigate(`/product/${p.slug}`); onClose(); }} className="w-full flex items-center gap-4 py-3 text-left group">
                  <img src={p.image} className="w-11 h-13 h-[52px] object-cover" alt={p.name} />
                  <span className="flex-1">
                    <span className="block text-cream group-hover:text-gold">{p.name}</span>
                    <span className="block text-[11px] tracking-[0.2em] text-cream/50">{p.colour.toUpperCase()} · {formatPKR(p.price)}</span>
                  </span>
                  <ArrowRight size={15} className="text-cream/40" />
                </button>
              ))}
              {q.trim().length > 1 && results.length === 0 && (
                <p className="text-cream/50 font-light">No pieces match “{q}” — try “loafer”.</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
