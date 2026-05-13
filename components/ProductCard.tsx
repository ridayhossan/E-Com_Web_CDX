import Link from 'next/link';
import { money } from '@/lib/utils';

export default function ProductCard({ product }: { product: any }) {
  return <Link href={`/products/${product.slug}`} className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
    <div className="aspect-square overflow-hidden bg-slate-100"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
    <div className="p-5"><p className="text-sm text-slate-500">{product.category?.name || 'Product'}</p><h3 className="mt-1 text-lg font-bold">{product.name}</h3><div className="mt-3 flex items-center gap-3"><span className="font-black text-primary">{money(product.discountPrice || product.price)}</span>{product.discountPrice ? <span className="text-sm text-slate-400 line-through">{money(product.price)}</span> : null}</div></div>
  </Link>;
}
