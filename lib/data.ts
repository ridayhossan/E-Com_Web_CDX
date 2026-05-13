import { connectDB } from '@/lib/mongodb';
import { serialize } from '@/lib/utils';
import Product from '@/models/Product';
import Category from '@/models/Category';
import SiteSettings from '@/models/SiteSettings';

export const defaultCategories = [
  { _id: 'demo-cat-1', name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', description: 'Useful add-ons and lifestyle items.' },
  { _id: 'demo-cat-2', name: 'Home Goods', slug: 'home-goods', image: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&w=800&q=80', description: 'Minimal pieces for your home.' },
  { _id: 'demo-cat-3', name: 'Tech', slug: 'tech', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80', description: 'Modern tech essentials.' },
];
export const defaultProducts = [
  { _id: 'demo-prod-1', name: 'Everyday Backpack', slug: 'everyday-backpack', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80', price: 79, discountPrice: 59, description: 'A practical backpack with clean styling and plenty of room.', category: defaultCategories[0], stock: 22, featured: true },
  { _id: 'demo-prod-2', name: 'Desk Lamp', slug: 'desk-lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80', price: 49, discountPrice: 39, description: 'Warm lighting for productive workspaces.', category: defaultCategories[1], stock: 15, featured: true },
  { _id: 'demo-prod-3', name: 'Wireless Headphones', slug: 'wireless-headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80', price: 129, discountPrice: 99, description: 'Comfortable sound for commutes, focus, and relaxing.', category: defaultCategories[2], stock: 8, featured: true },
];
export const defaultSettings = { siteName: 'MiniMart', logoUrl: '', primaryColor: '#2563eb', secondaryColor: '#f97316', heroTitle: 'Shop beautiful essentials for everyday life', heroText: 'A clean, fast, and customizable mini e-commerce store powered by Next.js and MongoDB.', heroImage: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80', promoTitle: 'Free shipping on featured picks', promoText: 'Edit this promotion from the admin panel whenever your campaign changes.', footerText: '© 2026 MiniMart. Built for simple e-commerce practice.', contactEmail: 'hello@minimart.dev', contactPhone: '+1 (555) 123-4567', contactAddress: '123 Commerce Street, Web City', seoTitle: 'MiniMart - Modern E-commerce Store', seoDescription: 'A small professional e-commerce website with a complete admin panel.' };

export async function getSettings() { try { await connectDB(); const s = await SiteSettings.findOne(); return serialize(s || defaultSettings); } catch { return defaultSettings; } }
export async function getCategories() { try { await connectDB(); const docs = await Category.find().sort({ createdAt: -1 }); return serialize(docs.length ? docs : defaultCategories); } catch { return defaultCategories; } }
export async function getProducts(filter: { featured?: boolean; category?: string } = {}) { try { await connectDB(); const q: any = {}; if (filter.featured) q.featured = true; const docs = await Product.find(q).populate('category').sort({ createdAt: -1 }); return serialize(docs.length ? docs : defaultProducts.filter(p => !filter.featured || p.featured)); } catch { return defaultProducts.filter(p => !filter.featured || p.featured); } }
export async function getProductBySlug(slug: string) { const products = await getProducts(); return products.find((p: any) => p.slug === slug) || null; }
