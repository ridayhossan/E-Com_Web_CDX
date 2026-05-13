import type { ReactNode } from 'react';
import AdminNav from '@/components/AdminNav';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: ReactNode }) {
  requireAdmin();

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[240px_1fr]">
        <AdminNav />
        {children}
      </div>
    </div>
  );
}
