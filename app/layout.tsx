import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> { const s = await getSettings(); return { title: s.seoTitle, description: s.seoDescription }; }
export default async function RootLayout({ children }: { children: React.ReactNode }) { const s = await getSettings(); return <html lang="en" style={{ ['--primary' as string]: s.primaryColor, ['--secondary' as string]: s.secondaryColor }}><body>{children}</body></html>; }
