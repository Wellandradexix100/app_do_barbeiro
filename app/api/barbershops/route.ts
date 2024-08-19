// src/app/api/barbershops/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const barbershops = await prisma.barbershop.findMany({
      select: {
        id: true,
        name: true, // Adicione outros campos que deseja retornar, se necessário
      },
    });
    return NextResponse.json(barbershops);
  } catch (error) {
    console.error("Error fetching barbershops:", error);
    return NextResponse.error();
  }
}
