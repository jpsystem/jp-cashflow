import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const Fonte: any[] = await prisma.$queryRaw`
      SELECT 
        Fonte.id AS id,
        Fonte.nome AS nome,
        Fonte.descricao AS descricao,
        Fonte.tipo AS tipo
      FROM 
        Fonte
      GROUP BY 
        Fonte.id,
        Fonte.nome, 
        Fonte.descricao,
        Fonte.tipo
    `;
    if (Fonte.length === 0) {
      return NextResponse.json(
        { message: "Não encontrou nenhum dado" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "OK", Fonte },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("ERROR", error);
    return NextResponse.json(
      {
        message: "Error",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
