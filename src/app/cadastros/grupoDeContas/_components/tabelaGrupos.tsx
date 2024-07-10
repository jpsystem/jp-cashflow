'use client'

import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { tyGrupo, tyGrupoLista } from "@/types/types"
import { useEffect, useState } from "react"

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table"

import {
  FileEditIcon,
  TrashIcon,
} from "@/app/_components/iconsForm"
import EditaGrupoForm from "./editaGrupo"
import { retGrupo, retGrupos } from "@/actions/grupoActions"
import { Grupo, SubGrupo } from "@prisma/client"

interface Props {
  dados: tyGrupoLista[]
}

export default  function TabelaGrupos({dados}: Props) {

  //PROGRAMAÇÃO PARA EDITAR GRUPOS
  //==========================================
    const [listGrupos, setListaGrupos] = useState<tyGrupoLista[]>(dados)
    const [atualisaGruposEdicao, setAtualizaGruposEdicao] = useState(true)
    const [isEdita, setIsEdita] = useState(false)

    useEffect(() =>{
      const fetchData = async () => {
        try {
          const result = await retGrupos();
          setListaGrupos(result);
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      };
      if(setAtualizaGruposEdicao){
        fetchData();
        setAtualizaGruposEdicao(false);
        setIsEdita(false)
      }
    },[atualisaGruposEdicao])
  //==========================================


  const [grupo, setGrupo] = useState<Grupo>();
  const [subGrupos, setSubGrupos] = useState<SubGrupo[]>([]);

  // Função para editar um item da lista
  const handleEditGrupo = async (index: number) => {
    // Encontra o índice do objeto com o id fornecido
    //const index = subGrupos.findIndex(item => item.id === id);
    
    const {grupo, subGrupos} = await retGrupo(index);
    if(grupo !== null) {
      setGrupo(grupo);
      setSubGrupos(subGrupos);
    }
    setIsEdita(true)
    //setIndexGrupo(index)
    
    console.log("IndexTabela: ", index)
  }
  return (
    <div className="flex flex-col w-full items-center">
      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            {/* ======================================== */}
            {
              isEdita && (
                <EditaGrupoForm 
                  // idGrupo ={dados[indexGrupo]?.id}
                  pGrupo={grupo}
                  pSubGrupos={subGrupos}
                  setAtualizaGruposEdicao={setAtualizaGruposEdicao}
                  isEdita={isEdita}
                  setIsEdita={setIsEdita}
                />
              )
            }            
            {/* ======================================== */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-center">Subcontas</TableHead>
                <TableHead className="w-[100px] text-center">Açoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listGrupos.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell className="text-center">
                    {item.qtdSubGrupos}
                  </TableCell>
                  <TableCell className="flex gap-1 justify-center">
                    <Button 
                    onClick={() => handleEditGrupo(item.id)}
                      className="h-8 w-8" 
                      size="icon" 
                      variant="ghost"
                    >
                      <FileEditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button className="h-8 w-8" size="icon" variant="ghost">
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
