"use client"

import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table"

import {
  ChevronLeftIcon,
  FileEditIcon,
  MenuIcon,
  Package2Icon,
  TrashIcon,
} from "@/app/_components/iconsForm"
import { tyFonte } from "@/types/types"

interface TabelaFontesProps {
  data: tyFonte[]
}

export default function TabelaFontes({data}: TabelaFontesProps) {
  function retTipo(tipo: String){
    let retorno = "";
    if(tipo ==="M") retorno = "Movimento";
    if(tipo ==="C") retorno = "Crédito";
    if(tipo ==="A") retorno = "Aplicação";
    return retorno;
  }
  return (
    <div className="flex flex-col w-full items-center">
      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead className="w-[100px] text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>{retTipo(item.tipo)}</TableCell>
                  <TableCell>{item.ativo.toString()}</TableCell>
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
