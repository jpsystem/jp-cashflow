'use server'


import prisma from "@/lib/db"


type Despesas = {
  GrupoID: number;
  Grupo: string;
  valorReal: number;
  valorOrcado: number;
}

export async function RetEstatisticaDespesas(periodoId: number | undefined) {
  let dadosDesesas: Despesas[];
  try {
    dadosDesesas = await prisma.$queryRaw`
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
    return  dadosDesesas
  } catch (error) {
    return dadosDesesas = [];
  }
}