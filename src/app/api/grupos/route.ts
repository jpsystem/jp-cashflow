import { tyGrupoLista } from './../../../../types/types';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';



export async function GET(){
  //let grupos:tyGrupoLista[];
  try {
    const grupos = await prisma.$queryRaw`
      Select 
        Grupo.id as id,
        Grupo.nome as nome,
        Grupo.descricao as descricao,
        CAST(COUNT(SubGrupo.grupoId) AS VARCHAR) as qtdSubGrupos
      From 
        Grupo
      Left Join 
        SubGrupo On Grupo.id = SubGrupo.grupoId 
      Group By 
        Grupo.id,
        Grupo.nome, 
        Grupo.descricao 
    `;
    if(!grupos){
      return  NextResponse.json({
        menssage: "Não encontrou registros",
      },
      {
        status: 200,
      }
      );   
    }
    else
    {
      const objetoComBigInt = JSON.stringify(grupos)
      return NextResponse.json(
        {
          message: "OK",
          grupos ,
        },
        {
          status: 200,
        }
      );
    }

  } catch (error) {
    console.log("ERROR", error)
    return NextResponse.json(
      {
        message: "Error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}