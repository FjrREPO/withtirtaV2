import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function PUT(
  request: NextRequest,
  props: Props
) {
  try {
    const params = await props.params;
    const json = await request.json();
    const mediaItem = await prisma.mediaItem.update({
      where: { id: params.id },
      data: json,
    });
    return NextResponse.json(mediaItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating mediaItem" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  props: Props
) {
  try {
    const params = await props.params;
    await prisma.mediaItem.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "mediaItem deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting mediaItem" },
      { status: 500 }
    );
  }
}
