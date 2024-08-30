
'use server'
import { fromZonedTime  } from 'date-fns-tz';
import { tyFonte } from './../types/types';
import { format } from 'date-fns';
import { tyErro, tyResult, tyLancamento } from "@/types/types"
import prisma from "@/lib/db"
import { convertUTCToLocalDate } from '@/lib/formatacoes';


type retorno = {
  status: string
  menssagem?: string
  regId: number
}



// export async function RetLancamentos(periodoId: number | undefined) {
//   let lancamentos: tyLancamento[];
//   try {
//     lancamentos = await prisma.$queryRaw`
//       SELECT
// 	      L.id as lancamentoId,
//         L.valor as valor,
//         DATE(L.dtLancamento) as dtLancamento,
//         L.descricao as descricao,
//         L.operacao as operacao,
//         L.periodoId as periodoId,
//         P.periodo as periodo,
//         L.subGrupoId as subGrupoId,
//         S.nome as subGrupo,
//         L.fonteId as fonteId,
//         L.fonteIdD as fonteIdD,
//         CASE
//           WHEN L.fonteIdD > 0 THEN CONCAT('De: ', F.nome , CHAR(13), CHAR(10), 'Para: ', F2.nome)
//           ELSE F.nome
// 	      END AS fontes,
// 	      S.grupoId as grupoId,
// 	      G.nome as grupo
//       FROM 
//       cashFlow.Lancamento as L Left Join cashFlow.Fonte as F
//         ON L.fonteId = F.id    Left Join cashFlow.Fonte as F2
//         ON L.fonteIdD = F2.id  Left Join cashFlow.SubGrupo as S
//         ON L.subGrupoId = S.id Left Join cashFlow.Grupo as G
//         ON S.grupoId = G.id Left Join cashFlow.Periodo as P
//         ON L.periodoId = P.id
//       Where
// 	      L.periodoId =  ${periodoId} 
//       Order By
//         dtLancamento,
//         lancamentoId  
//     `
//     return  lancamentos
//   } catch (error) {
//     return lancamentos = [];
//   }
// }

export async function CriarLancamento(dados: tyLancamento){
  let result:tyResult = <tyResult>{};
  try {
    const lancamento = await prisma.lancamento.create({
      data: {
        valor: dados.valor,
        dtLancamento: dados.dtLancamento ?? new Date(),
        operacao: dados.operacao,
        subGrupoId: dados.subGrupoId ?? 0,
        fonteId: dados.fonteId ?? 0,
        periodoId: dados.periodoId ?? 0,
        descricao: dados.descricao,
        fonteIdD: dados.fonteIdD,
      }
    });
    result.status = "Sucesso"
    result.dados = lancamento
    return result     

  } catch (error) {
    console.log("Erro: ", error)
    const erro = <tyErro>error;
    result.status = "Erro"
    result.menssagem = erro.code
    return result 
  }
}

export async function RetOperacao(grupoId:number){
  const oper = await prisma.grupo.findUnique({
    where:{
      id: grupoId,
    },
  })
  return oper?.tipo;
}

export async function getLancamentos(periodoId: number) {
  const lancamentos = await prisma.lancamento.findMany({
    where: {
      periodoId: periodoId,
    },
    include: {
      periodo: true,
      subGrupo: {
        include: {
          grupo: true,
        },
      },
      fonte: true,
      fonteD: true,
    },
    orderBy: [
      { dtLancamento: 'asc' },
      { id: 'asc' },
    ],
  });

  const dados:tyLancamento[] = lancamentos.map(lancamento => ({
    lancamentoId: lancamento.id,
    valor: lancamento.valor,
    //dtLancamento: fromZonedTime (lancamento.dtLancamento,'America/Sao_Paulo'),
    //convertUTCToLocalDate
    dtLancamento: convertUTCToLocalDate(lancamento.dtLancamento),
    descricao: lancamento.descricao || undefined,
    operacao: lancamento.operacao,
    periodoId: lancamento.periodoId,
    periodo: lancamento.periodo?.periodo,
    subGrupoId: lancamento.subGrupoId,
    subGrupo: lancamento.subGrupo?.nome,
    fonteId: lancamento.fonteId,
    fonteIdD: lancamento.fonteIdD,
    fontes: lancamento.fonteIdD ? `De: ${lancamento.fonte?.nome}\nPara: ${lancamento.fonteD?.nome}` : lancamento.fonte?.nome,
    grupoId: lancamento.subGrupo?.grupoId,
    grupo: lancamento.subGrupo?.grupo?.nome,
  }));
  return dados
}

// Função para excluir um lançamento
export async function DeleteLancamentos(index: number) {
  const lancamento = await prisma.lancamento.delete({
    where: { id: index },
  });
  
  return Promise.resolve(lancamento); //Promise.resolve(fontes);
}

//Essa função altera os dados do Lançamento
export async function AlteraLancamento(data: tyLancamento) {
  let result:tyResult = <tyResult>{};
  try {
    const lancamento = await prisma.lancamento.update({
      where: {id: data.lancamentoId},
      data: {
        valor: data.valor,
        dtLancamento: data.dtLancamento ?? new Date(),
        subGrupoId: data.subGrupoId ?? 0,
        fonteId: data.fonteId ?? 0,
        descricao: data.descricao,
        fonteIdD: data.fonteIdD,
      },
    })
    result.status = "Sucesso"
    result.dados = lancamento
    return result     
  } catch (err) {
    const erro = <tyErro>err;
    result.status = "Erro"
    result.menssagem = erro.code
    return result
  }
}