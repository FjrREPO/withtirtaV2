import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const article = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        thumbnail: data.thumbnail,
        published: data.published,
        categories: {
          connect: data.categoryIds.map((id: string) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}