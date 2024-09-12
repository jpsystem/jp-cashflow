'use server'

import prisma from "@/lib/db"
import { tyDespesaGrafico, tyEntradasGrafico, tySelects, tySubGruposGrafico } from "@/types/types";


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