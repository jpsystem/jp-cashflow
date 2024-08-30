"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQuery } from "react-query";
import queryClient from "@/lib/reactQuery";
import {
  AtualizaOrcamentos,
  CriarOrcamentos,
  gruposAtivos,
  RetOrcamento,
} from "@/actions/orcamentoActions";
import { tyOrcamento, tyResult } from "@/types/types";
import { useGlobalContext } from "@/app/contextGlobal";

export default function PainelControle() {
  const { usuarioId, periodoId, periodo } = useGlobalContext();

  const [qtdGrupos, setQtdGrupos] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retorno = await retQtdGrupos();
        setQtdGrupos(retorno);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, [periodoId, usuarioId]);

  const { data, isLoading, refetch } = useQuery(
    ["orcamentos", periodoId],
    async () => {
      const response: tyOrcamento[] = await RetOrcamento(periodoId);
      return response;
    }
  );

  const retQtdGrupos = async () => {
    const resultado: number = await gruposAtivos(periodoId, usuarioId);
    return resultado;
  };

  // const incluirOrcamentos = async () => {
  //   try {
  //     await CriarOrcamentos(periodoId, usuarioId);
  //     queryClient.refetchQueries(["orcamentos", periodoId]);
  //   } catch (error) {
  //     console.error("Erro ao criar orçamentos:", error);
  //   }
  // };

  // const atualizarOrcamentos = async () => {
  //   try {
  //     await AtualizaOrcamentos(periodoId, usuarioId);
  //     queryClient.refetchQueries(["orcamentos", periodoId]);
  //   } catch (error) {
  //     console.error("Erro ao atualizar orçamentos:", error);
  //   }
  // };

  return (
    <div className="pb-8 flex flex-col w-full items-center">
      <Card className="border-sky-900 border-2 w-full max-w-5xl">
        <CardContent className="flex flex-row items-center justify-between py-4">
          <Label className="text-lg font-bold text-sky-900">{`Período Agosto/2024`}</Label>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-2 border-sky-900 text-sm text-sky-900 hover:text-sky-700"
              // onClick={incluirOrcamentos}
            >
              Criar Saldos
            </Button>
            <Button
              variant="outline"
              className="border-2 border-sky-900 text-sm text-sky-900 hover:text-sky-700"
              // onClick={atualizarOrcamentos}
            >
              Atualizar Saldos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
