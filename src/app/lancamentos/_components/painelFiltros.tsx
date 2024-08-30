'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale"; // Importa a localização em português
import { useState } from "react";
import { startOfMonth, endOfMonth } from "date-fns";
import { useQuery} from 'react-query';
import { useGlobalContext } from "@/app/contextGlobal";
import { useLancamentoContext } from "./contextLancamentoProvider";
import { tyLancamento } from "@/types/types";
import { getLancamentos } from "@/actions/lancamentoActions";
import ComboGrupos from "./querys/selectGrupos";
import ComboSubGrupos from "./querys/selectSubGrupos";
import ComboFontes from "./querys/selectFontes";
import { retDataDoPeriodo } from "@/lib/formatacoes";


export default function PainelFiltros (){ 
  
  const {dados, setDados} = useLancamentoContext();
  const {periodoId, periodo } = useGlobalContext();



    //Carrega os Lancamentos
    const { data, isLoading, refetch } = useQuery( ["lancamentos", periodoId], async () => {
      const response:tyLancamento[] = await getLancamentos(periodoId); 
      setDados(response);
      return response;
    })

  const [selDate, setSelDate] = useState<Date>(retDataDoPeriodo(periodo));

  // Calcula o primeiro e o último dia do mês atual
  const currentDate = selDate //retDataDoPeriodo(periodo); //new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  return (
    <div className="max-w-full mx-auto md:max-w-6xl overflow-x-auto min-w-screen">
      <Card className="border-sky-900 border-2">
        <CardHeader>
          <CardTitle className="font-semibold mb-2 text-sky-900">
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="block text-sm font-medium text-sky-900">
                Conta
              </Label>
              <ComboGrupos pai="Filtros"/>
            </div>
            <div>
              <Label className="block text-sm font-medium text-sky-900">
                Sub-Conta
              </Label>
              <ComboSubGrupos pai="Filtros"/>
            </div>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ></link>
            <div className="text-sky-900 text-lg">
              <Label className="block text-sm font-medium text-sky-900">
                Data
              </Label>
              <DatePicker
                showIcon
                icon="fa fa-calendar"
                dateFormat="E - dd/MMMM"
                selected={selDate}
                minDate={firstDayOfMonth}
                maxDate={lastDayOfMonth}
                onChange={(date) => setSelDate(date ?? new Date())}
                closeOnScroll={true}
                className="text-sky-800 border-2 border-sky-900 rounded-md text-center h-9 pb-1 w-[262px] text-lg hover:bg-slate-100"
                showMonthDropdown={false}
                showYearDropdown={false}
                showPopperArrow={false}
                isClearable={false}
                locale={ptBR} // Configura a localização para português
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-sky-900">
                Fonte
              </Label>
              <ComboFontes pai="Filtros"/>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
