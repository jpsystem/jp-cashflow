
'use server'
//import { fromZonedTime  } from 'date-fns-tz';
//import { tyFonte } from './../types/types';
//import { format } from 'date-fns';
import { tyErro, tyResult, tyLancamento } from "@/types/types"
import prisma from "@/lib/db"
import { AcertaFusoHorario, convertLocalDateToUTC, convertUTCToLocalDate } from '@/lib/formatacoes';


type retorno = {
  status: string
  menssagem?: string
  regId: number
}

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
