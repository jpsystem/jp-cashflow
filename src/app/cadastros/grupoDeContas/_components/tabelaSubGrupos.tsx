"use client"
// COMPONENTE PAI
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { FileEditIcon, TrashIcon } from "@/app/_components/iconsForm"
import NovoSubGrupo from "./novoSubGrupo"
import EditaSubGrupo from "./editaSubGrupo"
import { tySubGrupo } from "@/types/types"
import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

interface Props {
  data: tySubGrupo[]
  setSubGruposP: React.Dispatch<React.SetStateAction<tySubGrupo[]>>
}

export default function TabelaSubGrupos({ data, setSubGruposP }: Props) {
  //Lista dos subGrupos
  const [subGrupos, setSubGrupos] = useState<tySubGrupo[]>(data)
  const [alterou, setAlterou] = useState(false)
  const [isEdita, setIsEdita] = useState(false)
  const [indexSG, setIndexSG] = useState(0)
  //const subGrupos = data;

  //Função para incluir um subGrupo na lista
  const handleAddSubGrupo = async (item: tySubGrupo) => {
    //Uma validação para ver se o Nome do subgrupo já existe
    const index = subGrupos.findIndex((subGrupo) => subGrupo.nome === item.nome)
    if (index === -1) {
      const lista: tySubGrupo[] = [...subGrupos, item]
      setSubGrupos(lista)
      ordenarSubGrupos(lista)
      return true
    }
    return false
  }

  // Função para excluir um item da lista
  const handleDeleteSubGrupo = async (index: number) => {
    // Encontra o índice do objeto com o id fornecido
    //const index = subGrupos.findIndex(item => item.id === id);
    if (index > -1) {
      const newArray = [
        ...subGrupos.slice(0, index),
        ...subGrupos.slice(index + 1),
      ]
      setSubGrupos(newArray)
      setSubGruposP(newArray)
    }
  }
  // Função para editar um item da lista
  const handleEditSubGrupo = async (index: number) => {
    // Encontra o índice do objeto com o id fornecido
    //const index = subGrupos.findIndex(item => item.id === id);
    setIndexSG(index)
    setIsEdita(true)
    console.log("Index-G: ", index)
  }


  //Função para ordenar a lista
  async function ordenarSubGrupos(itens: tySubGrupo[]) {
    console.log("Ordenou")
    const listOrdenada = itens.sort((a, b) => {
      if (a.nome < b.nome) {
        return -1
      }
      if (a.nome > b.nome) {
        return 1
      }
      return 0
    })
    setSubGrupos(listOrdenada)
    setSubGruposP(listOrdenada)
  }

  return (
    <div className="flex flex-col w-full items-center">
      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            <TableCaption className="caption-top">
              <div className="flex flex-row justify-around w-full gap-4">
                <div className="flex  font-bold space-y-2">
                  <span className="flex text-2xl ">Lista de SubGrupos</span>
                </div>
                <div className="flex justify-end">
                  <NovoSubGrupo
                    //data={subGrupos}
                    onAddItem={handleAddSubGrupo}
                  />
                </div>
                {/* ================================ */}
                {
                  isEdita && (
                    <EditaSubGrupo 
                      data={subGrupos[indexSG]}
                      isEdita={isEdita}
                      setIsEdita={setIsEdita}
                    />
                  )
                }
                {/* ================================ */}
              </div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-[100px]">Indice</TableHead> */}
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead>Excluir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subGrupos.map((grupo, index) => (
                <TableRow key={index} className={grupo.ativo ? 'text-black' : 'text-red-500'} >
                  {/* <TableCell className="font-medium">{index}</TableCell> */}
                  <TableCell className="text-sky-900">{grupo.nome}</TableCell>
                  <TableCell className="text-sky-900">{grupo.descricao}</TableCell>
                  <TableCell className="text-sky-900">{grupo.ativo ? 'True' : 'False'}</TableCell>
                  <TableCell className="text-sky-900">
                    <Button
                      onClick={() => handleEditSubGrupo(index)} 
                      className="h-8 w-8" 
                      size="icon" 
                      variant="ghost"
                    >
                      <FileEditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      onClick={() => handleDeleteSubGrupo(index)}
                      className="h-8 w-8"
                      size="icon"
                      variant="ghost"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
