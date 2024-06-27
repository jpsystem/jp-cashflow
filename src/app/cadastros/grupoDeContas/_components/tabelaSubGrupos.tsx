'use client'
// COMPONENTE PAI
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { TrashIcon } from "@/app/_components/iconsForm"
import NovoSubGrupo from "./novoSubGrupo"
import { flushAllTraces } from "next/dist/trace"
import { ListaFontes } from "@/actions/fonteActions"

type SubGrupo = {
  id?: number,
  nome: string,
  descricao: string,
}

interface Props {
  data: SubGrupo[];
  setSubGruposP: React.Dispatch<React.SetStateAction<SubGrupo[]>>;
}

export default function TabelaSubGrupos({data, setSubGruposP}: Props){

    //Lista dos subGrupos
    const [subGrupos, setSubGrupos] = useState<SubGrupo[]>(data)
    const [alterou, setAlterou] = useState(false)
    //const subGrupos = data;



    //Função para incluir um subGrupo na lista
    const  handleAddSubGrupo = async (item: SubGrupo) => {
      //Uma validação para ver se o Nome do subgrupo já existe
      const index = subGrupos.findIndex(subGrupo => subGrupo.nome === item.nome);
      if (index === -1) {
        const lista: SubGrupo[] = [...subGrupos, item]
        setSubGrupos(lista);
        ordenarSubGrupos(lista);
        return true;
      }
      return false;
    };

  // Função para excluir um item da lista
  const handleDeleteSubGrupo = async (index: number) => {
    // Encontra o índice do objeto com o id fornecido
    //const index = subGrupos.findIndex(item => item.id === id);
    if (index > -1) {      
      const newArray = [...subGrupos.slice(0,index), ...subGrupos.slice(index + 1)];
      setSubGrupos(newArray);
      setSubGruposP(newArray);
    }
  };

  //Função para ordenar a lista
  async function ordenarSubGrupos(itens: SubGrupo[]) {
    console.log("Ordenou")
    const listOrdenada = itens.sort((a, b) => {
      if (a.nome < b.nome) {
          return -1;
      }
      if (a.nome > b.nome) {
          return 1;
      }
      return 0;
    });
    setSubGrupos(listOrdenada);
    setSubGruposP(listOrdenada);
  }

  return(
    <div className="flex flex-col w-full items-center">
      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            <TableCaption className="caption-top">
              <div className="flex flex-row justify-around w-full gap-4">
                <div className="flex  font-bold space-y-2">
                  <span className="flex text-2xl ">Lista de Sub-Grupos</span>
                </div>
                <div className="flex justify-end">
                  <NovoSubGrupo data={subGrupos}  onAddItem={handleAddSubGrupo}/>
                </div>
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
                  <TableCell className="font-medium">{index}</TableCell>
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