import { Button } from "@/components/ui/button";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { CardContent, Card } from "@/components/ui/card";
import { ChevronLeftIcon, FileEditIcon, MenuIcon, Package2Icon, TrashIcon } from "@/app/_components/iconsForm";
import { tyGrupoLista } from "../../../../../types/types";
import { retGrupos } from "@/actions/grupoActions";

export default async function TabelaFontes() {
  const response = await fetch('http://localhost:3000/api/fontes', {
    next: {
      tags: ['listaFontes']
    }
  });

  if (!response.ok) {
    return (
      <div className="flex flex-col w-full items-center">
        <Card className="w-full">
          <CardContent className="p-0">
            <p>Erro ao carregar os dados.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const data = await response.json();

  if (!data || !Array.isArray(data.fonte)) {
    return (
      <div className="flex flex-col w-full items-center">
        <Card className="w-full">
          <CardContent className="p-0">
            <p>Dados inválidos retornados da API.</p>
          </CardContent>
        </Card>
      </div>
    );
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
                <TableHead className="w-[100px] text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.fonte.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
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
  );
}
