// Importe os tipos necessários e o módulo do Prisma
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
  return {
    status: 0,
    menssage: "Vazio",
    fonte: [
      {
        id: 1,
        nome: "Nome da Fonte",
        descricao: "Descrição da Fonte", // Preencha com os dados corretos
        tipo: "D",
      },
      // ... outros dados da fonte
    ],
  }
}
