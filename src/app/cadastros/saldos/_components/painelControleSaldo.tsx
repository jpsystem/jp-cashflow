"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQuery } from "react-query";
import queryClient from "@/lib/reactQuery";
import { AtualizaSaldo, AtualizaSaldos, CriarSaldos, fontesAtivas, RetSaldos } from "@/actions/saldosActions";
import { tySaldo, tyResult } from "@/types/types";
import { useSaldoContext } from "./contextSaldosProvider";
import { useGlobalContext } from "@/app/contextGlobal";

export default function PainelControleSaldo() {
  const {dados, setDados} = useSaldoContext();
  const { usuarioId, periodoId, periodo } = useGlobalContext();

  const { data, isLoading, refetch } = useQuery(["saldos", periodoId], async () => {
      const response: tySaldo[] = await RetSaldos(periodoId);
      setDados(response);
      return response;
    }
  );

  const incluirSaldos = async () =>{
    let retorno:tyResult ;
    try {
      retorno = await CriarSaldos(periodo, usuarioId);
       //Limpar o cache da consulta para atualizar os dados
       queryClient.refetchQueries(["saldos", periodoId]);   
    } catch (error) {
      
    }
  }

  const atualizarSaldos = async () =>{
    let retorno:tyResult ;
    try {
      retorno = await AtualizaSaldos(periodoId, usuarioId);
       //Limpar o cache da consulta para atualizar os dados
       queryClient.refetchQueries(["saldos", periodoId]);   
    } catch (error) {
      
    }
  }

  return (
    <div className="pb-8 flex flex-col w-full items-center">
      <Card className="border-sky-900 border-2 w-[70%]">
        <CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3">
          <div className="flex flex-1 gap-4 justify-between">
            <div className="flex w-[30%] max-w-xs">          
              <Label className="text-lg font-bold">{`Periodo ${periodo}`}</Label>
            </div>
            <div className="flex flex-row w-[30%] max-w-xs justify-between">
              <Button
                variant="outline"
                disabled={!(dados?.length === 0 && periodoId > 0)}
                className="border-2 border-sky-900 text-sm text-sky-900 hover:bg-sky-200"
                onClick={incluirSaldos}
              >
                Criar Saldos
              </Button>
              <Button
                variant="outline"
                disabled={(dados?.length === 0 && periodoId > 0)}
                className="border-2 border-sky-900 text-sm text-sky-900 hover:bg-sky-200"
                onClick={atualizarSaldos}
              >
                Atualizar Saldos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
