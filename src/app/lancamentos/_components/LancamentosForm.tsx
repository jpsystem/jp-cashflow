"use client";

import { Input } from "@/components/ui/input";
import { format, startOfMonth, endOfMonth, parseISO, addHours } from "date-fns";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";

// Definição dos tipos de dados do formulário
type FormProps = {
  valor: string;
  descricao: string;
  dtLancamento: string;
  fonte: string;
  destino: string;
  conta: string;
  subConta: string;
};

// Schema de validação com zod
const schema = z.object({
  valor: z.string().min(1, "Campo obrigatório!"),
  descricao: z.string().min(1, "Campo obrigatório!"),
  dtLancamento: z.string(),
  fonte: z.string().min(1, "Campo obrigatório!"),
  destino: z.string().min(1, "Campo obrigatório!"),
  conta: z.string().min(1, "Campo obrigatório!"),
  subConta: z.string().min(1, "Campo obrigatório!"),
});

export default function NovoLancamentosForm() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      valor: "",
      descricao: "",
      dtLancamento: format(new Date(), "yyyy-MM-dd"),
      fonte: "",
      destino: "",
      conta: "",
      subConta: "",
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-2 mt-7">
                <FormField
                  control={form.control}
                  name="conta"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sky-900">Conta</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full h-9 text-lg px-2 py-1 flex items-center justify-between hover:bg-slate-200"
                              >
                                {field.value || "Selecione a Conta"}
                                <FaChevronDown className="ml-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white text-sm border-2 border-sky-800 text-sky-800 ">
                              <DropdownMenuItem
                                className="hover:shadow-xl hover:bg-slate-200 text-sm"
                                onClick={() => field.onChange("Conta1")}
                              >
                                Conta 1
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:shadow-xl hover:bg-slate-200 text-sm"
                                onClick={() => field.onChange("Conta2")}
                              >
                                Conta 2
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:shadow-xl hover:bg-slate-200 text-sm"
                                onClick={() => field.onChange("Conta3")}
                              >
                                Conta 3
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subConta"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sky-900">Sub-Conta</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full h-9 text-lg px-2 py-1 flex items-center justify-between hover:bg-slate-200"
                              >
                                {field.value || "Selecione a Sub-Conta"}
                                <FaChevronDown className="ml-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white text-sm border-2 border-sky-900 text-sky-800">
                              <DropdownMenuItem
                                className="hover:shadow-xl hover:bg-slate-400 text-sm"
                                onClick={() => field.onChange("SubConta1")}
                              >
                                Sub-Conta 1
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:shadow-xl hover:bg-slate-400 text-sm"
                                onClick={() => field.onChange("SubConta2")}
                              >
                                Sub-Conta 2
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:shadow-xl hover:bg-slate-400 text-sm"
                                onClick={() => field.onChange("SubConta3")}
                              >
                                Sub-Conta 3
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sky-900 caret-sky-900">Descrição</FormLabel>
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
                          className="placeholder:text-sky-900 w-full"
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
                    <FormItem className="flex-1">
                      <FormLabel className="text-sky-900">Data</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-sky-900 text-center w-full"
                          type="date"
                          min={format(firstDayOfMonth, "yyyy-MM-dd")}
                          max={format(lastDayOfMonth, "yyyy-MM-dd")}
                          {...field}
                          value={format(parseISO(field.value), "yyyy-MM-dd")}
                          onChange={(e) => {
                            const newDate = parseISO(e.target.value);
                            field.onChange(
                              format(addHours(newDate, 12), "yyyy-MM-dd")
                            );
                          }}
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
                  name="fonte"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sky-900">Fonte</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full h-9 text-lg px-2 py-1 flex items-center justify-between hover:bg-slate-200"
                              >
                                {field.value || "Selecione a Fonte"}
                                <FaChevronDown className="ml-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white text-sm border-2 border-sky-900 text-sky-800">
                              <DropdownMenuItem
                                className="hover:shadow-xl hover:bg-slate-400 text-sm"
                                onClick={() => field.onChange("Conta1")}
                              >
                                Fonte 1
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:shadow-xl hover:bg-slate-400 text-sm"
                                onClick={() => field.onChange("Conta2")}
                              >
                                Fonte 2
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:shadow-xl hover:bg-slate-400 text-sm"
                                onClick={() => field.onChange("Conta3")}
                              >
                                Fonte 3
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destino"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sky-900">Destino</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-sky-900 w-full"
                          placeholder="Destino"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SheetFooter className="mt-7">
              <Button type="submit" className="h-9 w-22 border-2 text-sky-900 border-sky-800">
                  Confirmar
                </Button>
                <SheetClose asChild>
                  <Button className="h-9 w-22 border-2 text-sky-900 border-sky-800" variant="outline" onClick={handleClose}>
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
