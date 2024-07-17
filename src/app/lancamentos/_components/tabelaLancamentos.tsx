"use client";

import { format } from "date-fns";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Replace, Trash2 } from "lucide-react";

const TabelaLancamentos = () => {
  return (
    <div className="p-4">
      <div className="max-w-full mx-auto md:max-w-6xl overflow-x-auto min-w-screen">
        <Card className="border-sky-900 border-2">
          <CardHeader>
            <CardTitle className="font-semibold mb-2 text-sky-900">
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="block text-sm font-medium text-sky-900">
                  Conta
                </Label>
                <Select>
                  <SelectTrigger className="w-full text-sky-800 border-2">
                    <SelectValue placeholder="Selecione a conta" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-sky-900 p-0 m-0">
                    <SelectGroup className="bg-white text-sky-900">
                      <SelectItem value="Conta 1">Conta 1</SelectItem>
                      <SelectItem value="Conta 2">Conta 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium text-sky-900">
                  Sub-Conta
                </Label>
                <Select>
                  <SelectTrigger className="w-full text-sky-800 border-2">
                    <SelectValue placeholder="Selecione a Sub-Conta" />
                  </SelectTrigger>
                  <SelectContent className=" border-2 border-sky-900 p-0 m-0">
                    <SelectGroup className="bg-white text-sky-800">
                      <SelectItem value="Sub-Conta 1">Sub-Conta 1</SelectItem>
                      <SelectItem value="Sub-Conta 2">Sub-Conta 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium text-sky-900">
                  Data
                </Label>
                <Input
                  className="text-sky-800 border-sky-900 border-2"
                  type="date"
                  defaultValue={format(new Date(), "yyyy-MM")}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-sky-900">
                  Fonte
                </Label>
                <Select>
                  <SelectTrigger className="w-full text-sky-800 border-2">
                    <SelectValue placeholder="Selecione a Fonte" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-sky-900 p-0 m-0">
                    <SelectGroup className="bg-white w-full text-sky-800">
                      <SelectItem value="Fonte 1">Fonte 1</SelectItem>
                      <SelectItem value="Fonte 2">Fonte 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="overflow-x-auto mt-4 ">
        <h1 className="text-2xl font-bold mb-4 text-sky-900">Lançamentos</h1>
        <Table className="min-w-full overflow-auto rounded-2xl p-8 border-sky-800 border-2 shadow">
          <TableCaption className="text-sky-800 ">
            Uma lista sobre seus lançamentos recentes.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-2 w-[2%] text-sky-50 border-sky-50 bg-sky-900">
                Conta
              </TableHead>
              <TableHead className="text-center border-2  w-[2%] text-sky-50 border-sky-50 bg-sky-900">
                Sub Conta
              </TableHead>
              <TableHead className="text-center border-2 w-[43%] text-sky-50 border-sky-50 bg-sky-900">
                Descrição
              </TableHead>
              <TableHead className="text-center border-2 w-[6%] text-sky-50 border-sky-50 bg-sky-900">
                Valor
              </TableHead>
              <TableHead className="text-center border-2 w-[2%] text-sky-50 border-sky-50 bg-sky-900">
                Fonte
              </TableHead>
              <TableHead className="text-center border-2 w-[7%] text-sky-50 border-sky-50 bg-sky-900">
                Data
              </TableHead>
              <TableHead className="text-center border-2 w-[10%] text-sky-50 border-sky-50 bg-sky-900">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900">
                Conta1
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900">
                2
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900">
                Crédito tipo mt texto aqui oq eu faço aaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaa sjdasdjasdasdasjd
                askjdlsadajksdasdkjladaskdlasdjaks asoçdkl asd kasod asidop
                asidopa sdioasd ipa
                sasasasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900">
                R$250.00
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900">
                2
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900">
                24/5/2024
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900">
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
  );
};

export default TabelaLancamentos;
