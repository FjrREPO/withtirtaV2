import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.articleCategory.findMany({
      include: {
        articles: true,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const category = await prisma.articleCategory.create({
      data: {
        name: body.name,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
  }
}