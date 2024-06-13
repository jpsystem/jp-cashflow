import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { CardContent, Card } from "@/components/ui/card"
import { ChevronLeftIcon, FileEditIcon, MenuIcon, Package2Icon, TrashIcon } from "@/app/_components/iconsForm"
import { tyGrupoLista } from "../../../../../types/types";
import { retGrupos } from "@/actions/grupoActions";

export default async function TabelaGrupos(){
  //const grupos:tyGrupoLista[] = await retGrupos();
  const response = await fetch('http://localhost:3000/api/grupos', {
    next: {
      tags: ['listaGrupos']
    }
  })
  const data = await response.json();
  return(
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
              {data.grupos.map((item: any) => 
                <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.descricao}</TableCell>
                <TableCell className="text-center">{item.qtdSubGrupos}</TableCell>
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
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  </div>
  )
}