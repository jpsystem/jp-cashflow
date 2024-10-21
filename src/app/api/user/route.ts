//import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { validarTipoLogin } from '@/lib/jpFuncoes';


export async function GET(req: NextRequest){
  const {searchParams} = new URL(req.url)
  const login = searchParams.get('login')

  //verificar o tipo do login
  const tipo = validarTipoLogin(login || "");
  let filtroEmail = "";
  let filtroLogin = "";
  if(tipo === "email"){ 
    filtroEmail = login?.toLowerCase() || "";
  }else{
    filtroLogin = login?.toUpperCase() || "";
  }
  
  //const testes = request.cookies.get("next-auth.csrf-token");
  req.cookies.set("userNome","LOGIN");
  try
  {
    if(login){
      // const users = await prisma.user.findUnique({ 
      //   where: { login:login},
      // })
      // console.log("USERS: ", users);
      const consulta = await prisma.user.findMany({
        where: {
          ...filtroEmail && {email:filtroEmail},
          ...filtroLogin && {login:filtroLogin},
        }
      })

      const users = consulta[0];

      if(!users){
        return  NextResponse.json({
          menssage: "Não encontrou registros"
        })
        
      }
      else
      {
        return NextResponse.json(
          {
            message: "OK",
            users
          },
          {
            status: 200,
          }
        );
      }
    }
    else{
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
    } 
  }
  catch (error) {
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

export async function DELETE(req: NextRequest){
  const {searchParams} = new URL(req.url)
  const id = searchParams.get('id')
  try {
    if(id){
      const user = await prisma.user.delete({ 
        where: { id: parseInt(id)},
      })
      if(!user){
        return  NextResponse.json({
          menssage: "Não foi possivel excluir"
        })
        
      }
      else
      {
        return NextResponse.json(
          {
            message: "OK",
            user
          },
          {
            status: 200,
          }
        );
      }
    }
    
  } catch(error){
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

