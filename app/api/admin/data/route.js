import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAdminSession } from '@/lib/adminAuth';

const ALLOWED_SECTIONS = ['hero', 'about', 'projects', 'experience', 'education', 'skills', 'certificates', 'labs'];

function getFilePath(section) {
  const tmpPath = path.join('/tmp', 'data', `${section}.json`);
  const srcPath = path.join(process.cwd(), 'data', `${section}.json`);
  if (fs.existsSync(tmpPath)) return tmpPath;
  return srcPath;
}

function saveFilePath(section) {
  const isVercel = process.env.VERCEL === '1';
  if (isVercel) {
    const tmpDir = path.join('/tmp', 'data');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    return path.join(tmpDir, `${section}.json`);
  }
  return path.join(process.cwd(), 'data', `${section}.json`);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');

  if (!section || !ALLOWED_SECTIONS.includes(section)) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
  }

  try {
    const filePath = getFilePath(section);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }
}

export async function POST(request) {
  // Verify admin session via HTTP-only cookie
  const { isAuthenticated } = await getAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');

  if (!section || !ALLOWED_SECTIONS.includes(section)) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const filePath = saveFilePath(section);
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true, message: `${section} updated` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
