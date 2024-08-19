// src/app/api/appointments/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const now = new Date();

    const appointments = await prisma.booking.findMany({
      where: {
        date: {
          gte: now, // Filtra agendamentos com data maior ou igual à data atual
        },
      },
      include: {
        user: { select: { name: true } },
        service: { select: { name: true } },
      },
      orderBy: {
        date: "asc", // Ordena os agendamentos por data (opcional)
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.error();
  }
}
