import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { createSessionToken, setSessionCookie } from '@/lib/adminAuth';

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    const adminPassword = (process.env.ADMIN_PASSWORD || '').trim();
    if (!adminPassword) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Timing-safe comparison to prevent timing attacks
    let match = false;
    try {
      const a = Buffer.from(password.trim());
      const b = Buffer.from(adminPassword);
      if (a.length === b.length) {
        match = timingSafeEqual(a, b);
      }
    } catch {
      match = false;
    }

    if (!match) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Create signed session token and set HTTP-only cookie
    const token = createSessionToken();
    const response = NextResponse.json({ success: true });
    setSessionCookie(response, token);
    return response;

  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
