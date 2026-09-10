import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    const adminPassword = (process.env.ADMIN_PASSWORD || '').trim();
    const inputPassword = password.trim();

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'ADMIN_PASSWORD is not configured on the server.' },
        { status: 500 }
      );
    }

    if (inputPassword === adminPassword) {
      return NextResponse.json({ success: true, token: adminPassword });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
