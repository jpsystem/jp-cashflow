"use client";

import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useState } from "react";
// import { tyOrcamento } from "@/types/types";
import { RealBRToDouble, DoubleToRealBR } from "@/lib/formatacoes";
import FormSaldo from "./saldosForm";

export default function TabelaSaldo() {
  const [isEdita, setIsEdita] = useState<boolean>(false);
  const [indice, setIndice] = useState<number>(0);

  const handleEditSubGrupo = async (posicao: number) => {
    setIndice(posicao);
    setIsEdita(true);
  };

  return (
    <div>
      <Table className="border-collapse border-spacing-0 w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-sky-900 border-2 border-sky-700 text-sky-50 text-center text-lg">
              Fonte
            </TableHead>
            <TableHead className=" bg-sky-900 border-2 border-sky-700 text-sky-50 text-center text-lg">
              Saldo Inicial
            </TableHead>
            <TableHead className=" bg-sky-900 border-2 border-sky-700 text-sky-50 text-center text-lg">
              Saldo Atual
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
          {/* {dados.map((item: tyOrcamento, index: number) => ( */}
          <TableRow className ="hover:bg-slate-200"> 
            <TableCell className="border-2 border-sky-900 text-sky-900 text-center w-[0.5%] text-lg">
              Saldo1
            </TableCell>
            <TableCell className="border-2 border-sky-900 text-sky-900 text-center w-[0.5%] text-lg">
              R$12321,1203123
            </TableCell>
            <TableCell className="border-2 border-sky-900 text-sky-900 text-center w-[0.5%] text-lg">
              R$12321,1203123
            </TableCell>
            <TableCell className="border-2 border-sky-900 text-center text-sky-900 w-[0.5%] text-lg">
              Não sei
            </TableCell>
            <TableCell className="border-2 border-sky-900 w-[0.5%]">
              <div className="flex gap-1 justify-center text-sky-800 ">
                <Button
                  variant="ghost"
                  onClick={() => handleEditSubGrupo(0)} // Aqui 0 é apenas um exemplo de índice
                >
                  <Pen className="mr-1 text-xs" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
      {/* === Formulario para edição do saldo === */}
      {isEdita && (
        <FormSaldo indice={indice} isEdita={isEdita} setIsEdita={setIsEdita} />
      )}
      {/* =========================================== */}
    </div>
  );
}
