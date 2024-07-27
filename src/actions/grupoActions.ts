"use server"

import { tySubGrupo, tyGrupo, tyGrupoLista } from "@/types/types"
import prisma from "@/lib/db"
import {Grupo, SubGrupo } from "@prisma/client"

// Função para listar Grupos
export async function ListaGrupos() {
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
          },
        },
      },
    })
    retorno.grupos = grupos
  } catch (err: any) {}
  return retorno
}

//Está função faz uma consulta no banco de dados
//e retornar todos os grupos com a quantidade de subGrupos associado
export async function retGrupos() {
  let grupos: tyGrupoLista[]
  try {
    grupos = await prisma.$queryRaw`
      Select 
        Grupo.id as id,
        Grupo.nome as nome,
        Grupo.descricao as descricao,
        Grupo.ativo as ativo,
        Count(SubGrupo.id) as qtdSubGrupos
      From 
        Grupo
      Left Join 
        SubGrupo On Grupo.id = SubGrupo.grupoId 
      Group By 
        Grupo.id,
        Grupo.nome, 
        Grupo.descricao,
        Grupo.ativo 
    `
    return grupos
  } catch (err: any) {
    return (grupos = [{}])
  }
}

//Essa função retorna os dados do Grupo para Edição
export async function retGrupo(grupoId: number): Promise<{ grupo?: Grupo | null; 
                                subGrupos: SubGrupo[] }> {
  try {
    const grupo = await prisma.grupo.findUnique({ 
      where: { id: grupoId },
      include:{subGrupos: true},
    });
    return { grupo , subGrupos: grupo?.subGrupos || [] };
  } catch (error){
    console.error('Error fetching grupo:', error)
    return { grupo: undefined, subGrupos: [] };
    //throw error;
  }
  
}

export async function CreateSubGrupo(data: tySubGrupo) {
  let retorno = {
    status: 0,
    menssage: "Vazio",
  }
  try {
    const subGrupo = await prisma.subGrupo.create({
      data: {
        nome: data.nome.toUpperCase(),
        descricao: data.descricao,
        grupoId: data.grupoId,
      },
    })
    retorno.status = 1
    retorno.menssage = `Cadastro do subGrupo ${subGrupo.id}: ${subGrupo.nome} efetuado com sucesso`
  } catch (err: any) {
    if (err.code === "P2002") {
      retorno.status = 0
      retorno.menssage = "O nome desse subGrupo já está cadastrado!"
    } else {
      retorno.status = 0
      retorno.menssage = err.menssage
    }
  }
  return retorno
}

export async function novoGrupoComSubgrupos(
  dadosGrupo: tyGrupo,
  dadosSubGrupos: tySubGrupo[]
) {
  const grupo = await prisma.grupo.create({
    data: {
      nome: dadosGrupo.nome.toUpperCase(),
      descricao: dadosGrupo.descricao,
      tipo: dadosGrupo.tipo,
      subGrupos: {
        create: dadosSubGrupos.map((subGrupo) => ({
          nome: subGrupo.nome.toUpperCase(),
          descricao: subGrupo.descricao,
        })),
      },
    },
    include: {
      subGrupos: true,
    },
  })

  return grupo
}

export async function alteraSubGrupo(data: tySubGrupo) {
  let retorno = {
    status: true,
    menssage: "Alteração efetuada",
  }
  try {
    const subGrupo = await prisma.subGrupo.update({
      where: {id: data.id},
      data: {
        nome: data.nome,
        descricao: data.descricao,
        ativo: data.ativo,
      },
    })
  } catch (err) {
    retorno.status = false;
    retorno.menssage = "O correu um error! ";
  }
  return retorno;
}

export async function alteraGrupo(data: tyGrupo){
  let retorno = {
    status: true,
    menssage: "Alteração efetuada",
  }
  try {
    const grupo = await prisma.grupo.update({
      where: {id: data.id},
      data: {
        nome: data.nome,
        descricao: data.descricao,
        tipo: data.tipo,
        ativo: data.ativo,
      },
    })
  } catch (err) {
    retorno.status = false;
    retorno.menssage = "O correu um error! ";
  }
  return retorno;
}

//Função para excluir um registro da tabela grupos e dos subgrupos
export async function DeleteGrupo(index: number) {
  await prisma.$transaction(async (trx) => {
    try {      
      const subGrupos = await prisma.subGrupo.deleteMany({
        where: { grupoId: index },
      })
      const grupo = await prisma.grupo.delete({
        where: { id: index },
      });
      return Promise.resolve(grupo);
    } catch (error) {
      return Promise.resolve(error);
    }
  })
}