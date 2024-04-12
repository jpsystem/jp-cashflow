"use server";

import { tyGrupo } from "../../types/types";
import prisma from '@/lib/db';

export async function CreateGrupo(data: tyGrupo){

  let retorno = {
    status: 0,
    menssage: "Vasio"
  }
  try {
    const grupo = await prisma.grupo.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        tipo: data.tipo,
      },
    });
    retorno.status = 1;
    retorno.menssage = `Cadastro do grupo ${grupo.id}: ${grupo.nome} efetuado com sucesso`;
  } catch (err: any) {
    if(err.code === "P2002"){
      retorno.status = 0;
      retorno.menssage = "O nome desse grupo já está cadastrado para outro usuário!"
    }else{
      retorno.status = 0;
      retorno.menssage = err.menssage;
    }
  }
  return retorno;
}