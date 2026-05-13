import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'mini_admin_token';

type AdminPayload = {
  id: string;
  email: string;
  role: string;
  exp?: number;
};

const secret = () => process.env.JWT_SECRET || 'development-secret-change-me';

function encodeBase64Url(value: object) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function decodeBase64Url<T>(value: string): T {
  return JSON.parse(Buffer.from(value, 'base64url').toString()) as T;
}

function createSignature(value: string) {
  return crypto.createHmac('sha256', secret()).update(value).digest('base64url');
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(payload: AdminPayload) {
  const header = encodeBase64Url({ alg: 'HS256', typ: 'JWT' });
  const body = encodeBase64Url({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  });
  const unsignedToken = `${header}.${body}`;

  return `${unsignedToken}.${createSignature(unsignedToken)}`;
}

export function verifyAdminToken(token?: string) {
  if (!token) return null;

  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) return null;

  const unsignedToken = `${header}.${body}`;
  if (createSignature(unsignedToken) !== signature) return null;

  try {
    const decoded = decodeBase64Url<AdminPayload>(body);
    const isAdmin = decoded.role === 'admin';
    const isActive = Boolean(decoded.exp && decoded.exp > Math.floor(Date.now() / 1000));

    return isAdmin && isActive ? decoded : null;
  } catch {
    return null;
  }
}

export function getAdminFromCookies() {
  return verifyAdminToken(cookies().get(COOKIE_NAME)?.value);
}

export function requireAdmin() {
  const admin = getAdminFromCookies();
  if (!admin) redirect('/admin/login');

  return admin;
}

export { COOKIE_NAME };
