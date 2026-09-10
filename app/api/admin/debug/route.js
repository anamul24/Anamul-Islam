import { NextResponse } from 'next/server';

// Temporary debug endpoint — remove after fixing
export async function GET() {
  const pwd = process.env.ADMIN_PASSWORD;
  return NextResponse.json({
    isSet: !!pwd,
    length: pwd ? pwd.length : 0,
    firstChar: pwd ? pwd[0] : null,
    lastChar: pwd ? pwd[pwd.length - 1] : null,
    env: process.env.VERCEL ? 'vercel' : 'local',
  });
}
