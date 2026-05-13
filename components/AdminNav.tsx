import Link from 'next/link';

const links = [['/admin','Dashboard'],['/admin/products','Products'],['/admin/categories','Categories'],['/admin/settings','Settings']];
export default function AdminNav() { return <aside className="card h-fit p-4 md:sticky md:top-6"><h2 className="px-3 text-lg font-black">Admin Panel</h2><nav className="mt-4 grid gap-2">{links.map(([href,label]) => <Link className="rounded-2xl px-3 py-2 font-semibold text-slate-700 hover:bg-slate-100" href={href} key={href}>{label}</Link>)}<form action="/api/auth/logout" method="post"><button className="w-full rounded-2xl px-3 py-2 text-left font-semibold text-red-600 hover:bg-red-50">Logout</button></form></nav></aside>; }
