
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