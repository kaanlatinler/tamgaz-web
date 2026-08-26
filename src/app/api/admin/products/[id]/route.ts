import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, brand, price, stock, imageUrl } = await req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        brand,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        imageUrl,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Ürün güncellenemedi." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Ürün silinemedi." }, { status: 500 });
  }
}