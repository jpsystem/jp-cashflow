"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pen, Replace, Trash2 } from "lucide-react"

const TabelaLancamentos = () => {
  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-4 border p-4">
          <CardHeader>
            <CardTitle className="font-semibold mb-2">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="block text-sm font-medium">Conta</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Conta 1">Conta 1</SelectItem>
                      <SelectItem value="Conta 2">Conta 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium">Sub-Conta</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a Sub-Conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Sub-Conta 1">Sub-Conta 1</SelectItem>
                      <SelectItem value="Sub-Conta 2">Sub-Conta 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium">Data</Label>
                <Input
                  type="date"
                  className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium">Fonte</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a Fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Fonte 1">Fonte 1</SelectItem>
                      <SelectItem value="Fonte 2">Fonte 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <h1 className="text-2xl font-bold mb-4">Lançamentos</h1>
        <Table className="w-full">
          <TableCaption>
            Uma lista sobre seus lançamentos recentes.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Conta</TableHead>
              <TableHead className="text-center">Sub-Conta</TableHead>
              <TableHead className="text-center">Descrição</TableHead>
              <TableHead className="text-center">Valor</TableHead>
              <TableHead className="text-center">Fonte</TableHead>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-left">Conta1</TableCell>
              <TableCell className="text-center">2</TableCell>
              <TableCell className="text-center">Crédito</TableCell>
              <TableCell className="text-center">R$250.00</TableCell>
              <TableCell className="text-center">2</TableCell>
              <TableCell className="text-center">24/5/2024</TableCell>
              <TableCell className="text-center">
                <Button variant="ghost">
                  <Pen className="mr-1 h-4 w-4 text-xs" />
                </Button>
                <Button variant="ghost">
                  <Replace className="mr-2 h-4 w-4" />
                </Button>
                <Button variant="ghost">
                  <Trash2 className="mr-2 h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TabelaLancamentos