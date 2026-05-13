import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getCategories, getProducts, getSettings } from '@/lib/data';

export default async function HomePage() { const [settings, products, categories] = await Promise.all([getSettings(), getProducts({ featured: true }), getCategories()]); return <><Header settings={settings} /><main>
  <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
    <div><span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">Dynamic mini commerce</span><h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">{settings.heroTitle}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{settings.heroText}</p><div className="mt-8 flex gap-3"><Link href="/shop" className="btn-primary rounded-full px-6 py-3 font-bold">Shop now</Link><Link href="/contact" className="rounded-full border border-slate-200 px-6 py-3 font-bold">Contact</Link></div></div>
    <div className="card overflow-hidden p-3"><img src={settings.heroImage} alt="Hero banner" className="h-[420px] w-full rounded-2xl object-cover" /></div>
  </section>
  <section className="mx-auto max-w-7xl px-4 py-10"><div className="flex items-end justify-between"><h2 className="text-3xl font-black">Featured products</h2><Link href="/shop" className="font-bold text-primary">View all</Link></div><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((p: any) => <ProductCard key={p._id} product={p} />)}</div></section>
  <section className="mx-auto max-w-7xl px-4 py-10"><h2 className="text-3xl font-black">Categories</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{categories.map((c: any) => <Link href={`/shop?category=${c.slug}`} className="card overflow-hidden" key={c._id}><img src={c.image} className="h-44 w-full object-cover" alt={c.name} /><div className="p-5"><h3 className="text-xl font-bold">{c.name}</h3><p className="mt-2 text-slate-600">{c.description}</p></div></Link>)}</div></section>
  <section className="mx-auto max-w-7xl px-4 py-10"><div className="rounded-[2rem] p-10 text-white" style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})` }}><h2 className="text-3xl font-black">{settings.promoTitle}</h2><p className="mt-3 max-w-2xl text-white/90">{settings.promoText}</p></div></section>
</main><Footer settings={settings} /></>; }
