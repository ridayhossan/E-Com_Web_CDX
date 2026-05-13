import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { COOKIE_NAME, comparePassword, hashPassword, signAdminToken } from '@/lib/auth';

export async function POST(request: Request) {
  const form = await request.formData(); const email = String(form.get('email') || '').toLowerCase(); const password = String(form.get('password') || '');
  await connectDB();
  let user = await User.findOne({ email });
  if (!user && email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) user = await User.create({ name: 'Store Admin', email, password: await hashPassword(password), role: 'admin' });
  if (!user || user.role !== 'admin' || !(await comparePassword(password, user.password))) return NextResponse.redirect(new URL('/admin/login?error=1', request.url));
  const res = NextResponse.redirect(new URL('/admin', request.url));
  res.cookies.set(COOKIE_NAME, signAdminToken({ id: String(user._id), email: user.email, role: user.role }), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 7 });
  return res;
}
