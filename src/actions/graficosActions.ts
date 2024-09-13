'use server'

import prisma from "@/lib/db"
import { tyDespesaGrafico, tyEntradasGrafico, tySelects, tySomatoriasPeriodo, tySubGruposGrafico } from "@/types/types";


// Retorna uma lista de tyDespesaGrafico com os dados necessario para
// o grafico de despsas em relação aos valores orçados de um detrminado periodo
export async function RetEstatisticaDespesas(periodoId: number | undefined) {
  let dadosDespesas: tyDespesaGrafico[];
  try {
    dadosDespesas = await prisma.$queryRaw`
      SELECT 
        VO.GrupoID,
        VO.Grupo,
        VO.valorOrcado,
        IFNULL(VR.valorReal,0) as valorReal
      FROM
        (SELECT 
          G.id as GrupoID,
          G.Nome as Grupo,
          G.tipo as Tipo,
          O.valor as valorOrcado,
          O.periodoId as PeriodoID
        FROM 
          cashFlow.Orcamento AS O LEFT JOIN cashFlow.Grupo as G 
          ON O.grupoId = G.id 
        WHERE 
          O.periodoId = ${periodoId} AND 
          G.tipo = 'D' ) AS VO
        LEFT JOIN
          (SELECT 
          G.id as GrupoID, 
          G.nome as Grupo,
          SUM(L.valor) as valorReal,
          L.periodoId as PeriodoID
        FROM 
          cashFlow.Lancamento AS L LEFT JOIN cashFlow.SubGrupo as S 
          ON L.subGrupoId = S.id 
          LEFT JOIN cashFlow.Grupo AS G ON S.grupoId = G.id
        WHERE 
          periodoId = ${periodoId}
        GROUP BY 
          G.id, 
              G.nome, 
              L.periodoId) AS VR
        ON VO.GrupoID = VR.GrupoID
    `
    return  dadosDespesas
  } catch (error) {
    return dadosDespesas = [];
  }
}

// Retorna uma lista de tyEntradasGrafico com os dados necessario para
// o grafico de pizza de destribuição das entradas no periodo
export async function RetEstatisticaEntradas(periodoId: number | undefined) {
  let dadosEntradas: tyEntradasGrafico[];
  try {
    dadosEntradas = await prisma.$queryRaw`
     SELECT 
	    S.id as SubGrupoID, 
	    S.nome as SubGrupo,
	    SUM(L.valor) as valorReal,
	    L.periodoId as PeriodoID
    FROM 
	    cashFlow.Lancamento AS L LEFT JOIN cashFlow.SubGrupo as S 
	    ON L.subGrupoId = S.id LEFT JOIN cashFlow.Grupo as G 
      ON S.grupoId = G.id
    WHERE 
	    L.periodoId = ${periodoId} AND G.tipo = 'C' 
    GROUP BY 
	    S.id, 
      S.nome, 
      L.periodoId
     `
    return  dadosEntradas
  } catch (error) {
    return dadosEntradas = [];
  }
}

// Retorna uma lista dos grupos de despesas para o combo 
// do grafico de detalhes do grupo.
export async function ListaDespesasPeriodo(periodoId: number | undefined) {
  let contas: tySelects[];
  try {
    contas = await prisma.$queryRaw`
    SELECT 
      G.id as id,
      G.nome as nome
    FROM 
	    cashFlow.Lancamento AS L LEFT JOIN cashFlow.SubGrupo AS S
      ON L.subGrupoId = S.id LEFT JOIN cashFlow.Grupo AS G
      ON S.grupoId = G.id
    WHERE 
	    L.periodoId = ${periodoId} AND G.tipo = "D"
    GROUP BY
      G.nome
    ORDER BY
	    G.nome
    `
    return  contas
  } catch (error) {
    return contas = [];
  }
}

// Retorna uma lista do tipo tySubGruposGrafico com as somatorias
// dos subgrupos para o grafico de detalhes do grupo
export async function ListaSubContasPorContas(periodoId: number | undefined, grupoId: number) {
  let subContas: tySubGruposGrafico[];
  try {
    subContas = await prisma.$queryRaw`
      SELECT 
	      L.subGrupoId,
        S.nome as SubGrupo,
        SUM(L.valor) as valorReal
      FROM 
	      cashFlow.Lancamento AS L LEFT JOIN cashFlow.SubGrupo AS S
        ON L.subGrupoId = S.id LEFT JOIN cashFlow.Grupo AS G
        ON S.grupoId = G.id
      WHERE 
	      L.periodoId = ${periodoId} AND 
        G.tipo = "D" AND 
        G.id = ${grupoId}
      GROUP BY
	      L.subGrupoId,
        S.nome
      ORDER BY
        SubGrupo
    `
    return  subContas
  } catch (error) {
    return subContas = [{
      SubGrupoID: 0,
      SubGrupo: '',
      valorReal: 0}];
  }
}

// Retorna uma lista de fontes com as somatorias
// no periodo
export async function RetSomatoriasPeriodo(periodoId: number | undefined) {
  let saldos: tySomatoriasPeriodo[];
  try {
    saldos = await prisma.$queryRaw`
      SELECT
	      A.FonteId,
        A.Fonte,
        A.Tipo,
        A.saldoId,
        ROUND(A.SaldoInicio, 2) as valorInicial,
        IFNULL(ROUND(B.Somatoria, 2),0) as valorPeriodo,
        IFNULL(ROUND((ROUND(A.SaldoInicio, 2) + ROUND(IFNULL(B.Somatoria , 0), 2) ), 2), 0) as saldoAtual
      FROM
      ( SELECT 
	        S.fonteId as FonteId, 
          F.nome as Fonte, 
          S.valor as SaldoInicio, 
          F.tipo as Tipo,
          S.id as saldoId 
        FROM 
	        cashFlow.Saldo as S left join cashFlow.Fonte as F 
          on S.fonteId = F.id 
        WHERE 
	        periodoId = ${periodoId}
      ) as A
      LEFT JOIN 
      ( SELECT 
          SUM(  CASE WHEN U.Operacao = "C" THEN U.Total ELSE -(U.Total) END) as Somatoria,
          U.FonteId,
          U.Fonte
        FROM
        ( 
	        ( SELECT 
		          SUM(L.valor) Total,
		          CASE  WHEN L.operacao = "M" THEN "D" ELSE  L.operacao END AS Operacao, 
		          L.fonteId as FonteId,  
		          F.nome as Fonte 
	          FROM 
		          cashFlow.Lancamento as L left join cashFlow.Fonte as F 
		          ON L.fonteId = F.id
	          WHERE 
              L.periodoId = ${periodoId}
	          GROUP BY
		          L.operacao,
		          L.fonteId, 
		          F.nome
          ) 
	        UNION
	        ( SELECT 
		          SUM(L.valor) as Total, 
		          "C" as Operacao, 
		          L.fonteIdD as FonteId, 
		          F2.nome as Fonte 
	          FROM 
		          cashFlow.Lancamento as L left join cashFlow.Fonte as F2  
		          ON L.fonteIdD = F2.id 
	          WHERE 
		          L.periodoId = ${periodoId} AND
		          F2.id IS NOT NULL
	          GROUP BY
              Operacao,
		          L.fonteIdD, 
		          F2.nome
          )
        ) as U
        GROUP BY
          U.FonteId,
          U.Fonte
        ORDER BY
	        U.Fonte
      ) as B 
      ON A.FonteId = B.FonteId   
    `
    return  saldos
  } catch (error) {
    return  saldos = [{
      FonteId: 0,
      Fonte: "",
      Tipo: "",
      saldoId: 0,
      valorInicial: 0,
      valorPeriodo: 0,
      saldoAtual: 0,
    }];
  }
}