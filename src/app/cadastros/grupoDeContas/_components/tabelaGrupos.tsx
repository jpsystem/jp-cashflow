'use client'

import { Button } from "@/components/ui/button"
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table"
import { CardContent, Card } from "@/components/ui/card"
import {
  ChevronLeftIcon,
  FileEditIcon,
  MenuIcon,
  Package2Icon,
  TrashIcon,
} from "@/app/_components/iconsForm"
import { tyGrupoLista } from "@/types/types"
import { useEffect, useState } from "react"
import { retGrupos } from "@/actions/grupoActions"

interface Props {
  dados: tyGrupoLista[]
}


export default  function TabelaGrupos({dados}: Props) {
  //const[dados, setDados]  = useState<tyGrupoLista[]>([]);

  // useEffect(() =>{
  //   const fetchData = async () => {
  //     try {
  //       const result = await retGrupos();
  //       setDados(result);
  //     } catch (error) {
  //       console.error('Erro ao buscar dados:', error);
  //     }
  //   };
  //   fetchData();
  // },[])

  return (
    <div className="flex flex-col w-full items-center">
      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
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
              {dados.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell className="text-center">
                    {item.qtdSubGrupos}
                  </TableCell>
                  <TableCell className="flex gap-1 justify-center">
                    <Button className="h-8 w-8" size="icon" variant="ghost">
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
