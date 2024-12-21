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
    const category = await prisma.articleCategory.update({
      where: { id: params.id },
      data: json,
    });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating category" },
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
    await prisma.articleCategory.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 }
    );
  }
}
