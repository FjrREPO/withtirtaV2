import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  request: Request,
  props: Props
) {
  try {
    const params = await props.params;
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: { categories: true },
    });
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  props: Props
) {
  try {
    const params = await props.params;
    const data = await request.json();
    const article = await prisma.article.update({
      where: { id: params.id },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        thumbnail: data.thumbnail,
        published: data.published,
        categories: {
          set: [],
          connect: data.categoryIds.map((id: string) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: Props
) {
  try {
    const params = await props.params;
    await prisma.article.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}