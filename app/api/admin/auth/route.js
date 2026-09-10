import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    // Trim both sides to prevent whitespace issues from Vercel env var copy-paste
    const adminPassword = (process.env.ADMIN_PASSWORD || '').trim();
    const inputPassword = password.trim();

    if (!adminPassword) {
      return NextResponse.json({ error: 'Server config error: ADMIN_PASSWORD not set' }, { status: 500 });
    }

    if (inputPassword === adminPassword) {
      return NextResponse.json({ success: true, token: adminPassword });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
