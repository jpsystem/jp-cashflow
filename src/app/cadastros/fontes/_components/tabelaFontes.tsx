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
import { FileEditIcon, TrashIcon } from "@/app/_components/iconsForm"

type Fonte = {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
};

export default async function TabelaFonte() {
  let data;

  try {
    const response = await fetch('http://localhost:3000/api/fontes', {
      next: {
        tags: ["listaFonte"],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json()
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return (
      <div className="flex flex-col w-full items-center">
        <Card className="w-full">
          <CardContent className="p-0">
            <p>Erro ao carregar Fontes. Por favor, tente novamente.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center">
      {data &&  (
      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Conta</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-[100px] text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.fontes.map((Fonte: Fonte) => (
                <TableRow key={Fonte.id}>
                  <TableCell>{Fonte.id}</TableCell>
                  <TableCell>{Fonte.nome}</TableCell>
                  <TableCell>{Fonte.descricao}</TableCell>
                  <TableCell>{Fonte.tipo}</TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="flex gap-1 justify-center">
                    <Button className="h-8 w-8" size="icon" variant="ghost">
                      <FileEditIcon className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button className="h-8 w-8" size="icon" variant="ghost">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      )}
    </div>
  );
}
