"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Pen, Replace, Trash2 } from "lucide-react";
import BoxMesAno from "./boxMesAno";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileEditIcon, TrashIcon } from "@/app/_components/iconsForm";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

const TabelaOrcamento = () => {
  return (
    <div>
      <div className="pb-8 flex flex-col w-full items-center">
        <Card className="border-sky-900 border-2 w-[70%]">
          <CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3">
            <div className="flex flex-col">
              <Label className="block text-sm font-medium text-sky-900 ">
                Período
              </Label>
              <BoxMesAno />
            </div>
            <div className="flex flex-1 gap-4 justify-end">
              <div className="flex flex-col w-[10%] max-w-xs">
                <Button
                  variant="outline"
                  className="border-2 border-sky-900"
                ></Button>
              </div>
              <div className="flex flex-col w-[10%] max-w-xs">
                <Button
                  variant="outline"
                  className="border-2 border-sky-900"
                ></Button>
              </div>
              <div className="flex flex-col w-[10%] max-w-xs">
                <Button
                  variant="outline"
                  className="border-2 border-sky-900"
                ></Button>
              </div>
              <div className="flex flex-col w-[10%] max-w-xs">
                <Button
                  variant="outline"
                  className="border-2 border-sky-900"
                ></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Table className="border-collapse border-spacing-0 w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="bg-sky-900 border-2 border-sky-700 text-sky-50 text-center text-lg">
                Grupo
              </TableHead>
              <TableHead className=" bg-sky-900 border-2 border-sky-700 text-sky-50 text-center text-lg">
                Valor
              </TableHead>
              <TableHead className=" bg-sky-900 border-2 border-sky-700 text-center text-sky-50 text-lg">
                Tipo
              </TableHead>
              <TableHead className=" bg-sky-900 border-2 border-sky-700 text-center text-sky-50 text-lg">
                Editar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border-2 border-sky-900 text-sky-900 text-center w-[0.5%] text-lg">
                1
              </TableCell>
              <TableCell className="border-2 border-sky-900 text-sky-900 text-center w-[0.5%] text-lg">
                R$250,00
              </TableCell>
              <TableCell className="border-2 border-sky-900 text-center text-sky-900 w-[0.5%] text-lg">
                M
              </TableCell>
              <TableCell className="border-2 border-sky-900 w-[0.5%]">
                <div className="flex gap-1 justify-center text-sky-800 ">
                  <Button variant="ghost">
                    <Pen className="mr-1 text-xs" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TabelaOrcamento;
