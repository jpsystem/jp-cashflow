
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { CardContent, Card } from "@/components/ui/card"
import { ChevronLeftIcon, FileEditIcon, MenuIcon, Package2Icon, TrashIcon } from "@/app/_components/iconsForm"

export default function GrupoDeContas() {
  return (
    <div className="flex flex-col min-h-[80vh] items-start gap-4 px-4 pb-4 md:justify-center md:px-6 md:gap-5">
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full justify-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">Grupos de contas</h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
            Gêrenciar o plano de contas para o controle financeiro
          </p>
        </div>
        <div className="flex w-full justify-end">
          <Button className="ml-auto max-w-[200px] m-2" size="lg">
            Add Conta
          </Button>
        </div>
      </div>
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
                <TableRow key={1}>
                  <TableCell>1</TableCell>
                  <TableCell>Electronics</TableCell>
                  <TableCell>Aparelhos eletronicos</TableCell>
                  <TableCell className="text-center">3</TableCell>
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
                <TableRow key={2}>
                  <TableCell>2</TableCell>
                  <TableCell>Books</TableCell>
                  <TableCell>Aparelhos eletronicos</TableCell>
                  <TableCell className="text-center">3</TableCell>
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
                <TableRow key={3}>
                  <TableCell>3</TableCell>
                  <TableCell>Home Decor</TableCell>
                  <TableCell>Aparelhos eletronicos</TableCell>
                  <TableCell className="text-center">3</TableCell>
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
                <TableRow key={4}>
                  <TableCell>4</TableCell>
                  <TableCell>Discos</TableCell>
                  <TableCell>Aparelhos eletronicos</TableCell>
                  <TableCell className="text-center">3</TableCell>
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}