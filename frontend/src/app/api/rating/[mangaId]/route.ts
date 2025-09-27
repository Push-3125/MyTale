import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { mangaId: string } }) {
  const { db } = await connectToDatabase();
  const ratings = await db.collection('ratings')
    .find({ mangaId: params.mangaId })
    .toArray();
  const count = ratings.length;
  const average = count > 0 ? (ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / count).toFixed(2) : 0;
  return NextResponse.json({ average, count, ratings });
}

export async function POST(req: NextRequest) {
  const { mangaId, userId, rating } = await req.json();
  const { db } = await connectToDatabase();
  // Mỗi user chỉ được 1 rating cho 1 manga, update nếu đã có
  await db.collection('ratings').updateOne(
    { mangaId, userId },
    { $set: { rating, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ success: true });
}
