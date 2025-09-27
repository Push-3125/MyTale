import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { mangaId: string } }) {
  const { db } = await connectToDatabase();
  const comments = await db.collection('comments')
    .find({ mangaId: params.mangaId })
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const { mangaId, userId, content } = await req.json();
  const { db } = await connectToDatabase();
  const doc = {
    mangaId,
    userId,
    content,
    createdAt: new Date(),
  };
  await db.collection('comments').insertOne(doc);
  return NextResponse.json({ success: true });
}
