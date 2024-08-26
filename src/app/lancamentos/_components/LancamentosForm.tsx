"use client";

import { Input } from "@/components/ui/input";
import { format, startOfMonth, endOfMonth, parseISO, addHours } from "date-fns";
import { ptBR } from "date-fns/locale"; // Importa a localização em português
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ComboGrupos from "./querys/selectGrupos";
import ComboSubGrupos from "./querys/selectSubGrupos";
import ComboFontes from "./querys/selectFontes";
import { Label } from "@/components/ui/label";

// Definição dos tipos de dados do formulário
type FormProps = {
  valor: string;
  descricao: string;
  dtLancamento: Date | null;
  fonte: string;
  destino: string;
  conta: string;
  subConta: string;
};

// Schema de validação com zod
const schema = z.object({
  valor: z.string().min(1, "Campo obrigatório!"),
  descricao: z.string().min(1, "Campo obrigatório!"),
  dtLancamento: z.date(),
});

export default function NovoLancamentosForm() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      valor: "",
      descricao: "",
      dtLancamento: new Date(),
    },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const onSubmit = (values: FormProps) => {
    console.log("VALORES", values);
    handleClose();
  };

  // Calcula o primeiro e o último dia do mês atual
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  return (
    <div className="flex flex-col">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            className="border-2 text-sky-900 border-sky-900 hover:text-sky-800 hover:border-sky-700"
            variant="outline"
            onClick={handleOpen}
          >
            + Lançamentos
          </Button>
        </SheetTrigger>
        <SheetContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-h-[500px] max-h-[500px] min-w-[800px] max-w-[800px] overflow-x-auto rounded-2xl bg-white p-8 text-sky-800 shadow">
          <DialogTitle className="text-sky-900">Novo Lançamento</DialogTitle>
          {/* CONTA E SUBCONTA */}
          <div className="flex gap-2 mb-2" >
            <div className="flex-1">
              <Label className="block text-sm font-medium text-sky-900">
                  Conta
              </Label>
              <ComboGrupos pai="Form"/>
            </div>
            <div className="flex-1">
              <Label className="block text-sm font-medium text-sky-900">
                  Sub-Conta
              </Label>
              <ComboSubGrupos pai="Form"/>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sky-900 caret-sky-900">
                        Descrição
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="placeholder:text-sky-900 w-full"
                          placeholder="Descrição"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sky-900">Valor</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-sky-900 w-full text-lg"
                          placeholder="Valor"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dtLancamento"
                  render={({ field }) => (
                    <FormItem className="flex-1 ">
                      <FormLabel className="text-sky-900">Data</FormLabel>
                      <FormControl>
                        <div className="relative border-sky-800 ">
                          <DatePicker
                            showIcon
                            icon="fa fa-calendar"
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="E - dd/MMMM"
                            minDate={firstDayOfMonth}
                            maxDate={lastDayOfMonth}
                            className="text-sky-800 border-sky-900 rounded-md text-center h-9 pb-1 w-[362px] text-lg hover:bg-slate-100"
                            showMonthDropdown={false}
                            showYearDropdown={false}
                            showPopperArrow={false}
                            isClearable={false}
                            locale={ptBR} // Configura a localização para português
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                ></link>
              </div>
              {/* FONTE E DESTINO */}
              <div className="flex gap-2 mt-2" >
                <div className="flex-1">
                  <Label className="block text-sm font-medium text-sky-900">
                      Fonte
                  </Label>
                  <ComboFontes pai="FormO"/>
                </div>
                <div className="flex-1">
                  <Label className="block text-sm font-medium text-sky-900">
                      Destino
                  </Label>
                  <ComboFontes pai="FormD"/>
                </div>
              </div>
              <SheetFooter className="mt-7">
                <Button
                  type="submit"
                  className="h-9 w-22 border-2 text-sky-900 border-sky-800"
                >
                  Confirmar
                </Button>
                <SheetClose asChild>
                  <Button
                    className="h-9 w-22 border-2 text-sky-900 border-sky-800"
                    variant="outline"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>

        </SheetContent>
      </Sheet>
    </div>
  );
}
