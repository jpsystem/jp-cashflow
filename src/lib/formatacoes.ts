
import { format, parseISO } from 'date-fns';
import { getDate } from 'date-fns';
import {  toDate,formatInTimeZone } from 'date-fns-tz';
import {   toZonedTime }  from 'date-fns-tz'
import { ptBR } from 'date-fns/locale';
//import { ptBR } from 'date-fns/locale/pt-BR'
import { Contact } from 'lucide-react';

export function RealBRToDouble(value: string): number {
  let cleanedValue = value.replaceAll(".","");
  cleanedValue = cleanedValue.replace(/[^\d,.-]/g, '').replace(',', '.');
  return parseFloat(cleanedValue);
}

export function DoubleToRealBR(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function retPeriodoAtual(): string{
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",];
  const dataAtual = new Date();
  const mes = dataAtual.getMonth();
  const ano = dataAtual.getFullYear();
  const mesAno = `${meses[mes]}/${ano}`;
  return mesAno;
}

export function retDataDoPeriodo(periodo: string){
  const partes = periodo.split('/');
  //const nomeMes = periodo.substring(0, periodo.length - 5)
  const nomeMes = partes[0];
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",];
  const mes = meses.indexOf(nomeMes);
  const dia = getDate(new Date())
  return new Date(Number(partes[1]), mes, dia)
}

/**
 * Esta função retorna a string do periodo anterior
 * @param periodo - O periodo que sera analizado, ex: Abril/2024.
 * @returns A string do periodo anterior, ex: Março/2024.
 */
export async function retPeriodoAnterior(periodo: string){
  const partes = periodo.split('/');
  const nomeMes = partes[0];
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",];
  const mes = meses.indexOf(nomeMes);
  let mesAnterior = "";
  let anoAnterior = 0;
  if(mes === 0){
    mesAnterior = "Dezembro"
    anoAnterior = Number(partes[1]) - 1;
  }else{
    mesAnterior = meses[mes - 1];
    anoAnterior = Number(partes[1]);
  }
  return (mesAnterior + "/" + anoAnterior)
}

//Converter uma data local para uma data UTC
//independente da Timezone
export function convertLocalDateToUTC(date: Date) {
  const timestamp = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );

  return new Date(timestamp);
}

//Converter uma data UTC para uma data Local
//independente da Timezone
export function convertUTCToLocalDate(utcDate: Date) {
  return new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
    utcDate.getUTCHours(),
    utcDate.getUTCMinutes(),
    utcDate.getUTCSeconds(),
    utcDate.getUTCMilliseconds(),
  );
}

// export function AcertaFusoHorario(pData: Date){
//   //console.log("Data Local: ", pData.getDate());
//   //console.log("Data UTC: ", pData.getUTCDate());
//   //console.log("Data LocalCovertida: ", convertUTCToLocalDate(pData));
//   if(pData.getDate() === pData.getUTCDate()){
//     return convertUTCToLocalDate(pData)
//   }else{
//     return pData
//   }
// }

// export function AtualizaData(dateString: string){

// //const dateString = "2023-04-21T15:00:00Z";
// const parsedDate = parseISO(dateString);
// const timeZone = 'America/Sao_Paulo';
// const zonedDate = toZonedTime(parsedDate, timeZone);

// return zonedDate;
// }


// export function ConverterData(pData: Date) {
// // Obter o fuso horário local
// const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// console.log("TIME_ZONE: ", timeZone, pData);
// // Converte a data UTC para o fuso horário local
// const dataLocal = toZonedTime(pData, timeZone);

// const dataFormatada = format(dataLocal, 'yyyy-MM-dd HH:mm:ssXXX');
// console.log("DATA_FORMATADA: ", dataFormatada);
// return dataFormatada;

// }

/**
 * Converte uma data no formato ISO String para o formato
 * informado em 'mascara'.
 * @param {string} dataISO - Data no formato ISO String
 * @param {string} mascara - Mascara para formatar a data
 * Ex: 'dd/MM/yyyy', 'dd/MM', 'dd/MMM', 'MM/yyyy', 'yyyy',  etc
 * @returns {string} Data formatada
 */
export function FormataDataISOString(dataISO: string, mascara: string): string {
  const data = parseISO(dataISO);
  const dataFormatada = format(data, mascara);
  return dataFormatada;
}


/**
 * Converte uma data para o formato UTC em seguida
 * converte para ISO String.
 * @param {Date} data - Data a ser convertida.
 * @returns {string} Data no formato ISO String.
 */
export function FormataDataParaISOString(data: Date): string{
  const dataUTC = toZonedTime(data, 'UTC');
  const dataISOString = dataUTC.toISOString();
  return dataISOString;
}
