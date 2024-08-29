"use client";

import "react-datepicker/dist/react-datepicker.css";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Replace, Trash2 } from "lucide-react";
import { useLancamentoContext } from "./contextLancamentoProvider";
import { tyLancamento } from "@/types/types";
import { DoubleToRealBR } from "@/lib/formatacoes";
import { format }  from "date-fns";
import { ptBR } from 'date-fns/locale';

export default function TabelaLancamentos() {
  const {dados} = useLancamentoContext();

  return (
    <div className="p-1">
      <div className="overflow-x-auto mt-4 mb-10">
        {/* <h1 className="text-2xl font-bold mb-4 text-sky-900">Lançamentos</h1> */}
        <Table className="min-w-[1300px] overflow-auto rounded-2xl p-8 border-sky-800 border-2 shadow">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-2 w-[10%] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Conta
              </TableHead>
              <TableHead className="text-center border-2 w-[10%] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Sub Conta
              </TableHead>
              <TableHead className="text-center border-2 w-[30%] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Descrição
              </TableHead>
              <TableHead className="text-center border-2 w-[10%] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Valor
              </TableHead>
              <TableHead className="text-center border-2 w-[15%] min-w-[200px] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Fonte
              </TableHead>
              <TableHead className="text-center border-2 w-[10%] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Data
              </TableHead>
              <TableHead className="text-center border-2 w-[15%] min-w-[200px] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {dados.map((item: tyLancamento, index: number) => (
            <TableRow key={item.lancamentoId}>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900 text-lg">
                {item.grupo}
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900 text-lg">
                {item.subGrupo}
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900 text-lg">
                {item.descricao}
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900 text-lg">
                {DoubleToRealBR(item.valor || 0)}
              </TableCell>
              <TableCell className="text-center border-2 whitespace-pre-wrap text-sky-800 border-sky-900 text-lg">
                {item.fontes}
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900 text-lg">
              {format(item.dtLancamento || new Date(), 'dd/MM', { locale: ptBR }) }
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900">
                <Button variant="ghost">
                  <Pen className="mr-1 h-5 w-8 text-lg"/>
                </Button>
                <Button variant="ghost">
                  <Replace className="mr-2 h-6 w-4"/>
                </Button>
                <Button variant="ghost">
                  <Trash2 className="mr-2 h-6 w-4"/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

