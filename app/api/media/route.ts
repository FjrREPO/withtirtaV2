import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const mediaItems = await prisma.mediaItem.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json(mediaItems);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching media items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const mediaItem = await prisma.mediaItem.create({
      data: {
        name: json.name,
        type: json.type,
        filePath: json.filePath,
        categoryId: json.categoryId,
      },
    });
    return NextResponse.json(mediaItem);
  } catch (error) {
    return NextResponse.json({ error: "Error creating media item" }, { status: 500 });
  }
}