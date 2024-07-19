"use client";

import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { tyGrupoLista } from "@/types/types";
import { useEffect, useState } from "react";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { FileEditIcon, TrashIcon } from "@/app/_components/iconsForm";
import EditaGrupoForm from "./editaGrupo";
import { retGrupo, retGrupos } from "@/actions/grupoActions";
import { Grupo, SubGrupo } from "@prisma/client";

interface Props {
  dados: tyGrupoLista[];
}

export default function TabelaGrupos({ dados }: Props) {
  const [listGrupos, setListaGrupos] = useState<tyGrupoLista[]>(dados);
  const [atualisaGruposEdicao, setAtualizaGruposEdicao] = useState(true);
  const [isEdita, setIsEdita] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await retGrupos();
        setListaGrupos(result);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    if (setAtualizaGruposEdicao) {
      fetchData();
      setAtualizaGruposEdicao(false);
      setIsEdita(false);
    }
  }, [atualisaGruposEdicao]);

  const [grupo, setGrupo] = useState<Grupo>();
  const [subGrupos, setSubGrupos] = useState<SubGrupo[]>([]);

  const handleEditGrupo = async (index: number) => {
    const { grupo, subGrupos } = await retGrupo(index);
    if (grupo !== null) {
      setGrupo(grupo);
      setSubGrupos(subGrupos);
    }
    setIsEdita(true);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <Card className="w-full rounded">
        <CardContent className="p-0">
          <Table className="border-collapse border-spacing-0">
            {isEdita && (
              <EditaGrupoForm
                pGrupo={grupo}
                pSubGrupos={subGrupos}
                setAtualizaGruposEdicao={setAtualizaGruposEdicao}
                isEdita={isEdita}
                setIsEdita={setIsEdita}
              />
            )}
            <TableHeader>
              <TableRow>
                <TableHead className="bg-sky-900 border-2 border-sky-50 text-sky-50 text-center">
                  Conta
                </TableHead>
                <TableHead className=" bg-sky-900 border-2 border-sky-50 text-sky-50 text-center">
                  Descrição
                </TableHead>
                <TableHead className=" bg-sky-900 border-2 border-sky-50 text-center text-sky-50">
                  Subcontas
                </TableHead>
                <TableHead className=" bg-sky-900 border-2 border-sky-50 text-center text-sky-50">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listGrupos.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="border-2 border-sky-900 text-sky-900 text-center w-[13%]">
                    {item.nome}
                  </TableCell>
                  <TableCell className="border-2 border-sky-900 text-sky-900 w-[64%] text-center">
                    {item.descricao}
                  </TableCell>
                  <TableCell className="border-2 border-sky-900 text-center text-sky-900 w-[1%]">
                    {item.qtdSubGrupos}
                  </TableCell>
                  <TableCell className="border-2 border-sky-900 w-[10%]">
                    <div className="flex gap-1 justify-center text-sky-800">
                      <Button
                        onClick={() => handleEditGrupo(item.id)}
                        className="h-8 w-8"
                        size="icon"
                        variant="ghost"
                      >
                        <FileEditIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button className="h-8 w-8" size="icon" variant="ghost">
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
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
