'use client'
// COMPONENTE PAI
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useState } from "react"
import { TrashIcon } from "@/app/_components/iconsForm"
import NovoSubGrupo from "./novoSubGrupo"


type SubGrupo = {
  id?: number,
  nome: string,
  descricao: string,
}

interface Props {
  data: SubGrupo[];
  //onAddItem: (item: SubGrupo) => boolean;
}

export default function TabelaSubGrupos({data}: Props){

    //Lista dos subGrupos
    const [subGrupos, setSubGrupos] = useState<SubGrupo[]>(data)
    //const subGrupos = data;

    //Função para incluir um subGrupo na lista
    const handleAddSubGrupo = (item: SubGrupo) => {
      //Uma validação para ver se o Nome do subgrupo já existe
      const index = subGrupos.findIndex(subGrupo => subGrupo.nome === item.nome);
      if (index === -1) {
        setSubGrupos([...subGrupos, item])
        odenarSubGrupos;
        return true;
      }
      return false;
      //setSubGrupos([...subGrupos, item])
    };

  // Função para excluir um item da lista
  const handleDeleteSubGrupo = (index: number) => {
    // Encontra o índice do objeto com o id fornecido
    //const index = subGrupos.findIndex(item => item.id === id);
    if (index > -1) {      
      const newArray = [...subGrupos.slice(0,index), ...subGrupos.slice(index + 1)];
      setSubGrupos(newArray);
    }
    odenarSubGrupos;
  };

  //Função para ordenar a lista
  function odenarSubGrupos(){
    const listOrdenada = subGrupos.sort((a, b) => {
      if (a.nome < b.nome) {
          return -1;
      }
      if (a.nome > b.nome) {
          return 1;
      }
      return 0;
    });
    setSubGrupos(listOrdenada);
  
  }



  return(
    <div className="flex flex-col w-full items-center">
    <Card className="w-full">
      <CardContent className="p-0">
        <Table>
          <TableCaption className="caption-top">
            <div className="flex flex-row caption-top justify-between w-full items-center space-y-2">
              <span className="flex text-lg ">Lista de Sub-Grupos</span>
              <NovoSubGrupo data={subGrupos} onAddItem={handleAddSubGrupo}/>
            </div>
          </TableCaption>
          <TableHeader >
            <TableRow>
              <TableHead className="w-[100px]">Indice</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Excluir</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subGrupos.map((grupo, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index+1}</TableCell>
                <TableCell>{grupo.nome}</TableCell>
                <TableCell>{grupo.descricao}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteSubGrupo(index)} className="h-8 w-8" size="icon" variant="ghost">
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