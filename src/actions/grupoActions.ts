"use server";

import { tySubGrupo, tyGrupo,  tyGrupoLista } from './../../types/types';
import prisma from '@/lib/db';

// type GrupoLista = {
//   id?: number;
//   nome?: string;
//   descricao?: string;
//   qtdSubGrupos?: number;
// }

export async function CreateGrupo(data: tyGrupo){

  let retorno = {
    status: 0,
    menssage: "Vazio"
  }
  try {
    const grupo = await prisma.grupo.create({
      data: {
        nome: data.nome.toUpperCase(),
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

export async function ListaGrupos(){
  let retorno = {
    status: 0,
    menssage: "Vazio",
    grupos: [{}],
  }
  try {
    const grupos = await prisma.grupo.findMany({
      //Todos os campos do grupo e todos os subgrupos
      include: {
        subGrupos: {
          select: {
            id: true,
            nome: true,
            descricao: true,
          }
        }
      }
    })
    retorno.grupos = grupos;
    console.log("RETORNO: ", retorno)
  } catch (err: any) {
    
  }
  return retorno
}

export async function retGrupos(){
  let grupos:tyGrupoLista[];
  try {
    grupos = await prisma.$queryRaw`
      Select 
        Grupo.id as id,
        Grupo.nome as nome,
        Grupo.descricao as descricao,
        Count(*) as qtdSubGrupos
      From 
        Grupo
      Left Join 
        SubGrupo On Grupo.id = SubGrupo.grupoId 
      Group By 
        Grupo.id,
        Grupo.nome, 
        Grupo.descricao 
    `;
    return grupos
  } catch (err: any) {
    return grupos=[{}];
  }
}

export async function CreateSunGrupo(data: tySubGrupo){

  let retorno = {
    status: 0,
    menssage: "Vazio"
  }
  try {
    const subGrupo = await prisma.subGrupo.create({
      data: {
        nome: data.nome.toUpperCase(),
        descricao: data.descricao,
        grupoId: data.grupoId,
      },
    });
    retorno.status = 1;
    retorno.menssage = `Cadastro do subGrupo ${subGrupo.id}: ${subGrupo.nome} efetuado com sucesso`;
  } catch (err: any) {
    if(err.code === "P2002"){
      retorno.status = 0;
      retorno.menssage = "O nome desse subGrupo já está cadastrado!"
    }else{
      retorno.status = 0;
      retorno.menssage = err.menssage;
    }
  }
  return retorno;
}