import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mangaId = searchParams.get('mangaId');
  const chapterId = searchParams.get('chapterId');
  if (!mangaId || !chapterId) {
    return NextResponse.json({ error: 'Thiếu mangaId hoặc chapterId' }, { status: 400 });
  }
  const dir = path.join(process.cwd(), 'public', 'manga', mangaId, chapterId);
  if (!fs.existsSync(dir)) {
    return NextResponse.json({ error: 'Không tìm thấy thư mục ảnh' }, { status: 404 });
  }
  const files = fs.readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort((a, b) => {
      const na = parseInt(a);
      const nb = parseInt(b);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      return a.localeCompare(b);
    });
  const pages = files.map((file, idx) => ({
    id: `p${idx + 1}`,
    pageNumber: idx + 1,
    imageUrl: `/manga/${mangaId}/${chapterId}/${file}`,
    imageHint: 'manhua page',
    text: '',
  }));
  // Tạo chuỗi TypeScript để copy vào file truyện
  const tsString = pages.map(page => `        {\n          id: '${page.id}',\n          pageNumber: ${page.pageNumber},\n          imageUrl: '${page.imageUrl}',\n          imageHint: '${page.imageHint}',\n          text: '',\n        },`).join('\n');
  return NextResponse.json({ pages, tsString });
}
