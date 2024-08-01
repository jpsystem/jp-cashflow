'use server'

import { tyFonte, tyErro, tyResult } from "@/types/types"
import prisma from "@/lib/db"

// Função para listar fontes
export async function ListaFontes(userID: number | undefined) {
  
  const fontes = await prisma.fonte.findMany({
    where: { userId: userID },
  });
  //revalidatePath("/cadastros/fonte")
  
  return Promise.resolve(fontes); //Promise.resolve(fontes);
}

// Função para criar uma fonte no banco de dados
export async function CreateFonte(data: tyFonte) {
  let result:tyResult = <tyResult>{};
  try {
    const fonte = await prisma.fonte.create({
      data: {
        nome: data.nome.toUpperCase(),
        descricao: data.descricao,
        tipo: data.tipo.toString(),
        ativo: data.ativo,
        userId: data.userId,
      },
    })
    result.status = "Sucesso"
    result.dados = fonte
    return result    
    
  } catch (error) {

    const erro = <tyErro>error;
    result.status = "Erro"
    result.menssagem = erro.code
    return result    
  }
}

// Função para listar fontes (ajuste conforme a lógica de negócio)
export async function DeleteFontes(index: number) {
  const fonte = await prisma.fonte.delete({
    where: { id: index },
  });
  //revalidatePath("/cadastros/fonte")
  
  return Promise.resolve(fonte); //Promise.resolve(fontes);
}
