import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, Minus, Plus, ShieldCheck, Trash2, Truck } from 'lucide-react';
import Reveal from '../components/Reveal';
import { formatPKR, getProduct } from '../lib/products';
import { useCart } from '../lib/store';

type Step = 'bag' | 'details' | 'done';

export default function Cart() {
  const { lines, setQty, remove, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('bag');
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: 'Lahore', address: '', pay: 'cod' });
  const [orderId, setOrderId] = useState('');
  const [touched, setTouched] = useState(false);

  const shipping = subtotal >= 75000 || subtotal === 0 ? 0 : 950;
  const total = subtotal + shipping;
  const valid = form.name.trim().length > 2 && form.phone.trim().length >= 10 && form.address.trim().length > 5;

  const progress = useMemo(() => (step === 'bag' ? 1 : step === 'details' ? 2 : 3), [step]);

  const placeOrder = () => {
    setTouched(true);
    if (!valid) return;
    setOrderId('ZH-' + Math.floor(100000 + Math.random() * 900000));
    setStep('done');
    clear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 'done') {
    return (
      <main className="bg-cream min-h-[80vh]">
        <div className="max-w-2xl mx-auto px-6 py-20 md:py-28 text-center">
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="w-20 h-20 rounded-full bg-olive text-cream flex items-center justify-center mx-auto">
            <Check size={30} />
          </motion.div>
          <p className="eyebrow text-rust mt-8">ORDER {orderId} CONFIRMED</p>
          <h1 className="font-serif-d text-5xl md:text-6xl mt-4">Shukriya{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</h1>
          <p className="text-charcoal/60 font-light mt-5 leading-relaxed max-w-md mx-auto">
            Your pairs enter the finishing room within 24 hours — conditioned, polished and boxed in deep olive. A confirmation has been sent to {form.email || 'your inbox'}.
          </p>
          <div className="border border-charcoal/15 bg-linen p-6 mt-8 text-left grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-[10px] tracking-[0.24em] text-charcoal/50">DELIVER TO</p><p className="mt-1 font-light">{form.address}, {form.city}</p></div>
            <div><p className="text-[10px] tracking-[0.24em] text-charcoal/50">PAYMENT</p><p className="mt-1 font-light">{form.pay === 'cod' ? 'Cash on Delivery' : form.pay === 'card' ? 'Debit / Credit Card' : 'Bank Transfer'}</p></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-9">
            <Link to="/footwear" className="btn-solid-dark px-9 py-4 inline-flex items-center gap-3">CONTINUE SHOPPING <ArrowRight size={14} /></Link>
            <Link to="/journal" className="px-9 py-4 nav-link border border-charcoal/25 hover:border-charcoal">READ THE JOURNAL</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream min-h-[80vh]">
      <div className="bg-coal text-cream -mt-[68px] md:-mt-[76px]">
        <div className="max-w-[1100px] mx-auto px-6 pt-[140px] md:pt-[160px] pb-10">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 nav-link !text-[10px] text-cream/55 hover:text-cream mb-5"><ArrowLeft size={13} /> CONTINUE SHOPPING</button>
          <h1 className="headline-condensed text-5xl md:text-7xl">{step === 'bag' ? 'YOUR BAG' : 'CHECKOUT'}</h1>
          <div className="flex items-center gap-3 mt-7 max-w-md">
            {['BAG', 'DETAILS', 'CONFIRMED'].map((s, i) => (
              <div key={s} className="flex items-center gap-3 flex-1 last:flex-none">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center border ${i + 1 <= progress ? 'bg-gold border-gold text-coal' : 'border-cream/30 text-cream/50'}`}>{i + 1}</span>
                  <span className={`text-[10px] tracking-[0.22em] hidden sm:block ${i + 1 <= progress ? 'text-cream' : 'text-cream/40'}`}>{s}</span>
                </div>
                {i < 2 && <span className={`h-px flex-1 ${i + 1 < progress ? 'bg-gold' : 'bg-cream/20'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-10 md:py-14">
        {lines.length === 0 && step === 'bag' ? (
          <div className="text-center py-16">
            <p className="font-serif-d text-4xl">Your bag is empty.</p>
            <p className="text-charcoal/55 font-light mt-3">Presence begins with the first pair.</p>
            <Link to="/footwear" className="btn-solid-dark inline-flex items-center gap-3 px-10 py-4 mt-8">EXPLORE FOOTWEAR <ArrowRight size={14} /></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
            <div>
              {step === 'bag' && (
                <Reveal>
                  <ul className="divide-y divide-charcoal/12 border-y border-charcoal/12">
                    {lines.map((l) => {
                      const p = getProduct(l.slug);
                      if (!p) return null;
                      return (
                        <li key={l.slug + l.size} className="py-6 flex gap-5">
                          <Link to={`/product/${p.slug}`} className="w-24 h-28 md:w-28 md:h-32 bg-linen shrink-0 overflow-hidden">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <Link to={`/product/${p.slug}`} className="font-serif-d text-xl md:text-2xl leading-tight hover:italic">{p.name}</Link>
                                <p className="text-[11px] tracking-[0.18em] text-charcoal/55 mt-1.5">{p.colour.toUpperCase()} · EU {l.size} · {p.category.toUpperCase()}</p>
                              </div>
                              <button onClick={() => remove(l.slug, l.size)} className="text-charcoal/40 hover:text-rust p-1" aria-label="Remove item"><Trash2 size={16} strokeWidth={1.5} /></button>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-charcoal/20">
                                <button onClick={() => setQty(l.slug, l.size, l.qty - 1)} className="p-2.5 px-3" aria-label="Decrease"><Minus size={13} /></button>
                                <span className="text-sm w-7 text-center">{l.qty}</span>
                                <button onClick={() => setQty(l.slug, l.size, l.qty + 1)} className="p-2.5 px-3" aria-label="Increase"><Plus size={13} /></button>
                              </div>
                              <p className="tracking-wide">{formatPKR(p.price * l.qty)}</p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex items-center gap-3 mt-6 text-[13px] font-light text-charcoal/65">
                    <Truck size={16} className="text-olive" />
                    {shipping === 0 ? 'Your order ships complimentary, anywhere in Pakistan.' : `Add ${formatPKR(75000 - subtotal)} more for complimentary shipping.`}
                  </div>
                </Reveal>
              )}

              {step === 'details' && (
                <Reveal>
                  <div className="border border-charcoal/15 bg-linen/60 p-6 md:p-8">
                    <p className="eyebrow !text-[10px] text-charcoal/55 mb-6">01 — DELIVERY DETAILS</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[11px] tracking-[0.18em] text-charcoal/60">FULL NAME *</span>
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ahmed Raza" className={`mt-2 w-full bg-cream border px-4 py-3.5 outline-none text-[15px] font-light focus:border-olive ${touched && form.name.trim().length <= 2 ? 'border-rust' : 'border-charcoal/20'}`} />
                      </label>
                      <label className="block">
                        <span className="text-[11px] tracking-[0.18em] text-charcoal/60">PHONE *</span>
                        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="03xx xxxxxxx" inputMode="tel" className={`mt-2 w-full bg-cream border px-4 py-3.5 outline-none text-[15px] font-light focus:border-olive ${touched && form.phone.trim().length < 10 ? 'border-rust' : 'border-charcoal/20'}`} />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="text-[11px] tracking-[0.18em] text-charcoal/60">EMAIL</span>
                        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" type="email" className="mt-2 w-full bg-cream border border-charcoal/20 px-4 py-3.5 outline-none text-[15px] font-light focus:border-olive" />
                      </label>
                      <label className="block">
                        <span className="text-[11px] tracking-[0.18em] text-charcoal/60">CITY *</span>
                        <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-2 w-full bg-cream border border-charcoal/20 px-4 py-3.5 outline-none text-[15px] font-light">
                          {['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Dubai', 'London', 'Other'].map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </label>
                      <label className="block">
                        <span className="text-[11px] tracking-[0.18em] text-charcoal/60">STREET ADDRESS *</span>
                        <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House, street, area" className={`mt-2 w-full bg-cream border px-4 py-3.5 outline-none text-[15px] font-light focus:border-olive ${touched && form.address.trim().length <= 5 ? 'border-rust' : 'border-charcoal/20'}`} />
                      </label>
                    </div>

                    <p className="eyebrow !text-[10px] text-charcoal/55 mt-9 mb-4">02 — PAYMENT</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {[
                        { id: 'cod', t: 'Cash on Delivery', d: 'Pay at your door' },
                        { id: 'card', t: 'Card', d: 'Debit / credit' },
                        { id: 'bank', t: 'Bank Transfer', d: 'IBFT / Raast' },
                      ].map((m) => (
                        <button key={m.id} onClick={() => setForm({ ...form, pay: m.id })} className={`text-left border p-4 transition-all ${form.pay === m.id ? 'border-charcoal bg-charcoal text-cream' : 'border-charcoal/20 hover:border-charcoal'}`}>
                          <span className="flex items-center gap-2 text-sm tracking-wide"><CreditCard size={15} /> {m.t}</span>
                          <span className={`block text-[12px] font-light mt-1 ${form.pay === m.id ? 'text-cream/65' : 'text-charcoal/55'}`}>{m.d}</span>
                        </button>
                      ))}
                    </div>
                    {touched && !valid && <p className="text-[13px] text-rust mt-4">Please complete name, phone and address to place your order.</p>}
                    <div className="flex flex-wrap gap-3 mt-7">
                      <button onClick={() => setStep('bag')} className="px-7 py-4 nav-link border border-charcoal/25 hover:border-charcoal">BACK TO BAG</button>
                      <button onClick={placeOrder} className="flex-1 min-w-[220px] bg-charcoal text-cream py-4 nav-link hover:bg-olive transition-colors inline-flex items-center justify-center gap-3">
                        <Lock size={13} /> PLACE ORDER — {formatPKR(total)}
                      </button>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-28 bg-coal text-cream p-7">
              <p className="eyebrow !text-[10px] text-gold mb-6">ORDER SUMMARY</p>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {lines.map((l) => {
                  const p = getProduct(l.slug);
                  if (!p) return null;
                  return (
                    <div key={l.slug + l.size} className="flex gap-3 items-center">
                      <div className="relative w-14 h-16 bg-cream/10 shrink-0 overflow-hidden">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                        <span className="absolute -top-0 -right-0 bg-gold text-coal text-[10px] w-5 h-5 flex items-center justify-center">{l.qty}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] truncate">{p.name}</p>
                        <p className="text-[11px] text-cream/50 tracking-[0.14em]">EU {l.size}</p>
                      </div>
                      <p className="text-[13px]">{formatPKR(p.price * l.qty)}</p>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-white/12 mt-6 pt-5 space-y-2.5 text-sm font-light">
                <div className="flex justify-between text-cream/70"><span>Subtotal</span><span className="text-cream">{formatPKR(subtotal)}</span></div>
                <div className="flex justify-between text-cream/70"><span>Shipping</span><span className="text-cream">{shipping === 0 ? 'Complimentary' : formatPKR(shipping)}</span></div>
                <div className="flex justify-between pt-3 border-t border-white/12"><span className="nav-link !text-[10px]">TOTAL</span><span className="font-serif-d text-2xl">{formatPKR(total)}</span></div>
              </div>
              {step === 'bag' && (
                <button onClick={() => { setStep('details'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-full mt-6 bg-cream text-charcoal py-4 nav-link hover:bg-gold transition-colors inline-flex items-center justify-center gap-3">
                  CONTINUE TO DETAILS <ArrowRight size={14} />
                </button>
              )}
              <p className="flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] text-cream/45 mt-4"><ShieldCheck size={13} /> SECURE · 30-DAY RETURNS</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
