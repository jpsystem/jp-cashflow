//import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
//const prisma = new PrismaClient()

export async function GET(){
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(
      {
        message: "OK",
        users
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error
      },
      {
        status: 400,
      }
    );  
  }
}

export async function POST(req: Request){
  const dado = await req.json();
  try {
    const user = await prisma.user.create({
      data: dado,
    });
    return NextResponse.json(
      {
        message: "OK",
        user
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error
      },
      {
        status: 500,
      }
    );
  }
}