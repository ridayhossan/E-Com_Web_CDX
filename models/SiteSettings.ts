import mongoose, { Schema, models, model } from 'mongoose';

export interface ISiteSettings extends mongoose.Document {
  siteName: string; logoUrl: string; primaryColor: string; secondaryColor: string;
  heroTitle: string; heroText: string; heroImage: string; promoTitle: string; promoText: string;
  footerText: string; contactEmail: string; contactPhone: string; contactAddress: string;
  seoTitle: string; seoDescription: string;
}
const SiteSettingsSchema = new Schema<ISiteSettings>({
  siteName: { type: String, default: 'MiniMart' },
  logoUrl: { type: String, default: '' },
  primaryColor: { type: String, default: '#2563eb' },
  secondaryColor: { type: String, default: '#f97316' },
  heroTitle: { type: String, default: 'Shop beautiful essentials for everyday life' },
  heroText: { type: String, default: 'A clean, fast, and customizable mini e-commerce store powered by Next.js and MongoDB.' },
  heroImage: { type: String, default: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80' },
  promoTitle: { type: String, default: 'Free shipping on featured picks' },
  promoText: { type: String, default: 'Edit this promotion from the admin panel whenever your campaign changes.' },
  footerText: { type: String, default: '© 2026 MiniMart. Built for simple e-commerce practice.' },
  contactEmail: { type: String, default: 'hello@minimart.dev' },
  contactPhone: { type: String, default: '+1 (555) 123-4567' },
  contactAddress: { type: String, default: '123 Commerce Street, Web City' },
  seoTitle: { type: String, default: 'MiniMart - Modern E-commerce Store' },
  seoDescription: { type: String, default: 'A small professional e-commerce website with a complete admin panel.' },
}, { timestamps: true });
export default models.SiteSettings || model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
