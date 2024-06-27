"use server";

import { tySubGrupo, tyGrupo,  tyGrupoLista } from '@/types/types';
import prisma from '@/lib/db';


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
  } catch (err: any) {
    
  }
  return retorno
}

//Está função faz uma consulta no banco de dados
//e retornar todos os grupos com a quantidade de subGrupos associado
export async function retGrupos(){
  let grupos:tyGrupoLista[];
  try {
    grupos = await prisma.$queryRaw`
      Select 
        Grupo.id as id,
        Grupo.nome as nome,
        Grupo.descricao as descricao,
        Grupo.ativo as ativo,
        Count(*) as qtdSubGrupos
      From 
        Grupo
      Left Join 
        SubGrupo On Grupo.id = SubGrupo.grupoId 
      Group By 
        Grupo.id,
        Grupo.nome, 
        Grupo.descricao,
        Grupo.ativo 
    `;
    return grupos
  } catch (err: any) {
    return grupos=[{}];
  }
}


export async function CreateSubGrupo(data: tySubGrupo){

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

export async function novoGrupoComSubgrupos(dadosGrupo: tyGrupo, dadosSubGrupos: tySubGrupo[] ){
  
  const grupo = await prisma.grupo.create({
    data: {
      nome: dadosGrupo.nome.toUpperCase(),
      descricao: dadosGrupo.descricao,
      tipo: dadosGrupo.tipo,
      subGrupos: {
        create: dadosSubGrupos.map(
          subGrupo => ({
            nome: subGrupo.nome.toUpperCase(),
            descricao: subGrupo.descricao,
          })
        )
      }
    },
    include: {
      subGrupos: true,
    }
  })

  return grupo;


}