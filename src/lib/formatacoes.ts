
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
