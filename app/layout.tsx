import type { CSSProperties, ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings.seoTitle,
    description: settings.seoDescription,
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings();
  const themeStyle = {
    '--primary': settings.primaryColor,
    '--secondary': settings.secondaryColor,
  } as CSSProperties;

  return (
    <html lang="en" style={themeStyle}>
      <body>{children}</body>
    </html>
  );
}
