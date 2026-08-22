import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const { title, slug, category, description } = await req.json();
  const service = await prisma.service.create({
    data: { title, slug, category, description },
  });
  return NextResponse.json(service, { status: 201 });
}