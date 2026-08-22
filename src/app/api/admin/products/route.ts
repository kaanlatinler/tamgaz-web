import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Ürünleri Listele
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Ürünler çekilemedi." }, { status: 500 });
  }
}

// Yeni Ürün Ekle
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, brand, price, stock, imageUrl } = body;

    if (!name || !brand || !price || !imageUrl) {
      return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        brand,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        imageUrl,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Ürün eklenemedi." }, { status: 500 });
  }
}