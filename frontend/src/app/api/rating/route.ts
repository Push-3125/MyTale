import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const { mangaId, userId, rating } = await req.json();
  const { db } = await connectToDatabase();
  await db.collection('ratings').updateOne(
    { mangaId, userId },
    { $set: { rating, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ success: true });
}
