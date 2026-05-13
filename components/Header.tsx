import Link from 'next/link';

export default function Header({ settings }: { settings: any }) {
  return <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <Link href="/" className="flex items-center gap-3 font-black text-xl">
        {settings.logoUrl ? <img src={settings.logoUrl} alt={settings.siteName} className="h-10 w-10 rounded-2xl object-cover" /> : <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white">M</span>}
        {settings.siteName}
      </Link>
      <nav className="hidden items-center gap-6 font-medium text-slate-700 md:flex">
        <Link href="/shop">Shop</Link><Link href="/cart">Cart</Link><Link href="/contact">Contact</Link><Link href="/login">Login</Link>
      </nav>
      <Link href="/admin" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold">Admin</Link>
    </div>
  </header>;
}
