import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');

  if (!section) {
    return NextResponse.json({ error: 'section parameter required' }, { status: 400 });
  }

  // Sanitize section name to prevent path traversal
  const safeName = section.replace(/[^a-z0-9_-]/gi, '');
  const filePath = path.join(DATA_DIR, `${safeName}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');

  if (!section) {
    return NextResponse.json({ error: 'section parameter required' }, { status: 400 });
  }

  const safeName = section.replace(/[^a-z0-9_-]/gi, '');
  const filePath = path.join(DATA_DIR, `${safeName}.json`);

  try {
    const body = await request.json();
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
