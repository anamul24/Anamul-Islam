import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'nx_session';
const MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'default-dev-secret-change-in-prod';
}

function sign(payload) {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function createSessionToken() {
  const payload = `admin:${Date.now()}:${Math.random().toString(36).slice(2)}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  const lastDot = token.lastIndexOf('.');
  if (lastDot === -1) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const expected = sign(payload);
  try {
    return timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expected, 'hex')
    );
  } catch {
    return false;
  }
}

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return { isAuthenticated: verifySessionToken(token) };
  } catch {
    return { isAuthenticated: false };
  }
}

export function setSessionCookie(response, token) {
  const isProd = process.env.NODE_ENV === 'production';
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export function clearSessionCookie(response) {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export { COOKIE_NAME, MAX_AGE };
