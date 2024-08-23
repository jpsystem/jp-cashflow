'use server'

import { tyErro, tyResult, tyLancamento } from "@/types/types"
import prisma from "@/lib/db"

type retorno = {
  status: string
  menssagem?: string
  regId: number
}

export async function RetLancamentos(periodoId: number | undefined) {
  let lancamentos: tyLancamento[];
  try {
    lancamentos = await prisma.$queryRaw`
      SELECT
	      L.id as lancamentoId,
        L.valor as valor,
        L.dtLancamento as dtLancamento,
        L.descricao as descricao,
        L.operacao as operacao,
        L.periodoId as periodoId,
        P.periodo as periodo,
        L.subGrupoId as subGrupoId,
        S.nome as subGrupo,
        L.fonteId as fonteId,
        F.nome as fonte,
        S.grupoId as grupoId,
        G.nome as grupo
      FROM 
	      Lancamento as L Left Join Fonte as F
        ON L.fonteId = F.id Left Join SubGrupo as S
        ON L.subGrupoId = S.id Left Join Grupo as G
        ON S.grupoId = G.id Left Join Periodo as P
        ON L.periodoId = P.id
      Where
	      L.periodoId =  ${periodoId} 
      Order By
        dtLancamento,
        lancamentoId  
    `
    console.log(lancamentos);
    return  lancamentos
  } catch (error) {
    return lancamentos = [];
  }
}