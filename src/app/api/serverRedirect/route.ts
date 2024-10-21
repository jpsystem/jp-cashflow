import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');

  if (destination) {
    try {
      const url = new URL(destination, request.url);
      return NextResponse.redirect(url.toString());
    } catch (error) {
      return NextResponse.json({ error: 'URL de destino é invalida' }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: 'Destino não encontrado ou invalido' }, { status: 400 });
  }
}
