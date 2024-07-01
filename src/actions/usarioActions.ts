"use server"

import { tyUsuario } from "@/types/types"
import prisma from "@/lib/db"
import { error } from "console"

export async function CreateUsuario(data: tyUsuario) {
  let retorno = {
    status: 0,
    menssage: "Vazio",
  }
  try {
    const { id } = await prisma.user.create({
      data: {
        login: data.login,
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        perfil: data.perfil,
        // token: data.token,
        // dtToken: data.dtToken,
      },
    })
    retorno.status = 1
    retorno.menssage = `Cadastro do usuario ${id} efetuado com sucesso`
  } catch (err: any) {
    if (err.code === "P2002") {
      retorno.status = 0
      retorno.menssage = "O email já está cadastrado para outro usuário!"
    } else {
      retorno.status = 0
      retorno.menssage = err.menssage
    }
  }
  return retorno
}

//Essa função é apenas para desenvolvimento e
//Cria um usuario Administrador
export async function CreateUsuarioAdmin() {
  let retorno = {
    status: 0,
    menssage: "Vazio",
  }
  try {
    const { id } = await prisma.user.create({
      data: {
        login: "jpsystem",
        nome: "JP-System",
        email: "jpsystem@gmail.com",
        senha: "123456",
        perfil: "admin",
        // dtToken: data.dtToken,
      },
    })
    retorno.status = 1
    retorno.menssage = `Cadastro do usuario ${id} efetuado com sucesso`
  } catch (err: any) {
    if (err.code === "P2002") {
      retorno.status = 0
      retorno.menssage = "O email já está cadastrado para outro usuário!"
    } else {
      retorno.status = 0
      retorno.menssage = err.menssage
    }
  }
  return retorno
}