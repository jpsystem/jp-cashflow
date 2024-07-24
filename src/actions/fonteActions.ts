'use server'

import { tyFonte } from "@/types/types"
//import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"
//import { Fonte } from "@prisma/client"

// Função para listar fontes
export async function ListaFontes() {
  
  const fontes = await prisma.fonte.findMany();
  //revalidatePath("/cadastros/fonte")
  
  return Promise.resolve(fontes); //Promise.resolve(fontes);
}


// Função para criar uma fonte no banco de dados
export async function CreateFonte(data: tyFonte) {
  const fonte = await prisma.fonte.create({
    data: {
      nome: data.nome.toUpperCase(),
      descricao: data.descricao,
      tipo: data.tipo.toString(),
      ativo: data.ativo,
    },
  })
  //revalidatePath('/cadastros/fonte')
  return fonte;
}



// Função para listar fontes (ajuste conforme a lógica de negócio)
export async function DeleteFontes(index: number) {
  const fonte = await prisma.fonte.delete({
    where: { id: index },
  });
  //revalidatePath("/cadastros/fonte")
  
  return Promise.resolve(fonte); //Promise.resolve(fontes);
}
