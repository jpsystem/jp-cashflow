"use server"

import { tyFonte } from "@/types/types"
import prisma from "@/lib/db"

// Função para criar uma fonte no banco de dados
export async function CreateFonte(data: tyFonte) {
  try {
    const fonte = await prisma.fonte.create({
      data: {
        nome: data.nome.toUpperCase(),
        descricao: data.descricao.toString(),
        tipo: data.tipo.toString(),
      },
    })
    return {
      status: 1,
      menssage: `Cadastro de fonte ${fonte.id}:${fonte.nome} efetuado com sucesso`,
    }
  } catch (err: any) {
    if (err.code === "P2002") {
      return {
        status: 0,
        menssage: "O nome dessa fonte já está cadastrado para outro usuário!",
      }
    } else {
      return {
        status: 0,
        menssage: err.message,
      }
    }
  }
}

// Função para listar fontes (ajuste conforme a lógica de negócio)
export async function ListaFontes() {
  // let retorno = {
  //   status: 0,
  //   menssage: "Vazio",
  //   fontes: [{}],
  // }
  // try {
  //   const fontes = await prisma.fonte.findMany()
  //   retorno.status =1;
  //   retorno.menssage = "Consulta realizada com sucesso!"
  //   retorno.fontes = fontes;
  // } catch (error) {
  //   return retorno
  // }
  return {
    status: 1,
    menssage: "Consulta realizada com sucesso!",
    fonte: [
      {
        id: 1,
        nome: "Nubank",
        descricao: "Conta de pagamentos Nubank", // Preencha com os dados corretos
        tipo: "M",
        ativo: true
      },
      {
        id: 2,
        nome: "Credito-Nubank",
        descricao: "Cartão de Crédito Nubank", // Preencha com os dados corretos
        tipo: "C",
        ativo: true
      },
      {
        id: 3,
        nome: "Fundo-TD",
        descricao: "Fundo tesouro direto", // Preencha com os dados corretos
        tipo: "A",
        ativo: true
      },
      {
        id: 4,
        nome: "Caixa",
        descricao: "Caixa em dinheiro", // Preencha com os dados corretos
        tipo: "M",
        ativo: true
      },
      // ... outros dados da fonte
    ],
  }
}
