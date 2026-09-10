import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAdminSession } from '@/lib/adminAuth';

function getUploadDir() {
  const isVercel = process.env.VERCEL === '1';
  if (isVercel) {
    const dir = path.join('/tmp', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return { dir, isVercel: true };
  }
  const dir = path.join(process.cwd(), 'public', 'image', 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return { dir, isVercel: false };
}

export async function POST(request) {
  const { isAuthenticated } = await getAdminSession();
  if (!isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WebP, GIF allowed.' }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 });
    }

    const ext = file.name.split('.').pop().toLowerCase();
    const safeName = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 40);
    const filename = `${safeName}-${Date.now()}.${ext}`;

    const { dir, isVercel } = getUploadDir();
    const bytes = await file.arrayBuffer();
    fs.writeFileSync(path.join(dir, filename), Buffer.from(bytes));

    const publicPath = isVercel ? `/api/admin/uploads/${filename}` : `/image/uploads/${filename}`;
    return NextResponse.json({ success: true, path: publicPath, filename });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request) {
  const { isAuthenticated } = await getAdminSession();
  if (!isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { dir, isVercel } = getUploadDir();
    if (!fs.existsSync(dir)) return NextResponse.json({ images: [] });

    const files = fs.readdirSync(dir)
      .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
      .map(f => ({
        filename: f,
        path: isVercel ? `/api/admin/uploads/${f}` : `/image/uploads/${f}`,
        size: fs.statSync(path.join(dir, f)).size,
      }))
      .sort((a, b) => b.filename.localeCompare(a.filename));

    return NextResponse.json({ images: files });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { isAuthenticated } = await getAdminSession();
  if (!isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { filename } = await request.json();
    if (!filename || filename.includes('..') || filename.includes('/')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }
    const { dir } = getUploadDir();
    const filePath = path.join(dir, filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
