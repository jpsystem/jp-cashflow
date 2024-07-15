"use client";
// COMPONENTE PAI

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LabelError from "@/components/ui/jp/labelError";
import { useContext, useEffect, useState } from "react";
//COMPONENTE DIALOG
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
//Componente SHEET shadcn/ui
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
//COMPONENTE FORM
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TrashIcon } from "@/app/_components/iconsForm";
import { sub } from "date-fns";
import TabelaFonte from "./tabelaFontes";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { Dropdown } from "flowbite-react";
import { FaChevronDown } from "react-icons/fa";

// Definição do objeto ZOD de validação
const schema = z.object({
  nome: z.string().min(2, "Campo obrigatorio, Mínimo (2) caracteres"),
  descricao: z.string().min(2, "Campo obrigatorio, Mínimo (2) caracteres"),
  ativo: z.boolean(),
  tipo: z.enum(["D", "C", "M"], {
    errorMap: () => {
      return {
        message:
          "Informe 'D' para débito, 'C' para crédito ou 'M' para conta de movimentação.",
      };
    },
  }),
});

// Definição do type fonte
type tyFonte = {
  id?: number;
  nome: string;
  descricao: string | null;
  tipo: string;
  ativo: boolean;
};

type FormProps = z.infer<typeof schema>;

////////////////////////////////////////////////////////////////

export default function NovoFonteForm() {
  // Variavel de estado isOpen
  const [isOpen, setIsOpen] = useState(false);

  // Função para fechar o DIALOG
  const handleClose = () => {
    setIsOpen(false);
  };

  // Lista das fontes
  const [Fonte] = useState<tyFonte[]>([]);

  // Definição do formulário
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      descricao: "",
      tipo: "D",
      ativo: true,
    },
  });

  // Função para abrir a Sheet
  const handleOpen = () => {
    form.resetField("nome");
    form.resetField("descricao");
    form.resetField("tipo");
    form.resetField("ativo");
    setIsOpen(true);
  };

  // Função para executar no Submit
  function onSubmit(values: FormProps) {
    console.log("VALORES", values);
    console.log("SUBS", Fonte);
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        className="hover:bg-slate-200"
        onClick={handleOpen}
      >
        + Fonte
      </Button>
      <SheetContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[410px] min-w-[400px] overflow-auto rounded-2xl bg-white p-6 text-gray-900 shadow-lg">
        <DialogTitle className="text-xl font-bold">Nova Fonte</DialogTitle>
        <SheetClose asChild>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4"
          ></button>
        </SheetClose>
        {isOpen && (
          <div className="mt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Nome da fonte (nome) */}
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-400"
                          placeholder="Nome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Descrição da fonte (descricao) */}
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          className="placeholder:text-gray-400"
                          placeholder="Descrição"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-4 text-sm">
                    <FormField
                      control={form.control}
                      name="tipo"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col space-y-2">
                              <FormLabel className="">Tipo</FormLabel>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-40 h-9 text-lg px-2 py-1 flex items-center justify-between hover:bg-slate-200"
                                  >
                                    {field.value === "D"
                                      ? "Débito"
                                      : field.value === "C"
                                      ? "Crédito"
                                      : "Movimentação"}
                                    <FaChevronDown className="ml-2" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white text-sm">
                                  <DropdownMenuItem
                                    className="hover:shadow-xl hover:bg-slate-200 text-sm"
                                    onClick={() => field.onChange("D")}
                                  >
                                    Débito
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="hover:shadow-xl hover:bg-slate-200 text-sm"
                                    onClick={() => field.onChange("C")}
                                  >
                                    Crédito
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="hover:shadow-xl hover:bg-slate-200 text-sm"
                                    onClick={() => field.onChange("M")}
                                  >
                                    Movimentação
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
                  <div className="flex items-center">
                    <FormField
                      control={form.control}
                      name="ativo"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-center space-y-2">
                          <FormLabel>Ativo</FormLabel>
                          <FormControl>
                            {/* {...field} checked={field.value}  */}
                            <Checkbox />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <SheetFooter className="text-sm font-semibold flex justify-end mt-7 ">
                  <Button
                    variant="outline"
                    type="submit"
                    className="text-lg px-2 py-1 hover:bg-slate-200"
                  >
                    Incluir
                  </Button>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      onClick={handleClose}
                      className="text-lg px-2 py-1 hover:bg-slate-200"
                    >
                      Cancelar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </form>
            </Form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
