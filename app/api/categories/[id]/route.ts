import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const category = await prisma.category.update({
      where: { id: context.params.id },
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
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await prisma.category.delete({
      where: { id: context.params.id },
    });
    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 }
    );
  }
}
