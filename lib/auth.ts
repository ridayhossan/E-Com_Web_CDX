import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'mini_admin_token';
const secret = () => process.env.JWT_SECRET || 'development-secret-change-me';
type AdminPayload = { id: string; email: string; role: string; exp?: number };

function base64url(input: string) { return Buffer.from(input).toString('base64url'); }
function sign(value: string) { return crypto.createHmac('sha256', secret()).update(value).digest('base64url'); }

export async function hashPassword(password: string) { return bcrypt.hash(password, 10); }
export async function comparePassword(password: string, hash: string) { return bcrypt.compare(password, hash); }
export function signAdminToken(payload: AdminPayload) {
  const body = base64url(JSON.stringify({ ...payload, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 }));
  return `${body}.${sign(body)}`;
}
export function verifyAdminToken(token?: string) {
  if (!token) return null;
  const [body, signature] = token.split('.');
  if (!body || !signature || sign(body) !== signature) return null;
  try { const decoded = JSON.parse(Buffer.from(body, 'base64url').toString()) as AdminPayload; return decoded.role === 'admin' && (decoded.exp || 0) > Date.now() ? decoded : null; }
  catch { return null; }
}
export function getAdminFromCookies() { return verifyAdminToken(cookies().get(COOKIE_NAME)?.value); }
export function requireAdmin() { const admin = getAdminFromCookies(); if (!admin) redirect('/admin/login'); return admin; }
export { COOKIE_NAME };
