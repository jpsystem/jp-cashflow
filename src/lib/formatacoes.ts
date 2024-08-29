

import { getDate } from 'date-fns';
import { toDate, format, formatInTimeZone } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale/pt-BR'

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

//const options = { timeZone: 'Africa/Accra' }; //Pais de Gana-Acrra que tem UTC-0