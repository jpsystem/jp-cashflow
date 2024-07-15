"use client";
// COMPONENTE PAI

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { novoGrupoComSubgrupos } from "@/actions/grupoActions";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import React, { useState } from "react";
import TabelaSubGrupos from "./tabelaSubGrupos";
import { Textarea } from "@/components/ui/textarea";
import { tyGrupo, tySubGrupo, tyGrupoLista } from "@/types/types";

// Componente SHEET shadcn/ui
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Componente FORM
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Componente TABLE
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Novo componente de dropdown do shadcn/ui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Ícone de seta para baixo
import { FaChevronDown } from "react-icons/fa";

// Configurando o zod para validação do formulário
const schema = z.object({
  nome: z.string().min(2, "Campo obrigatório!"),
  descricao: z.string().min(2, "Campo obrigatório!"),
  ativo: z.boolean().default(true),
  tipo: z.enum(["D", "C", "M"], {
    errorMap: () => ({
      message:
        "Informe 'D' para débito, 'C' para crédito ou 'M' para conta de movimentação.",
    }),
  }),
});

type FormProps = z.infer<typeof schema>;

interface Props {
  setAtualizaGrupos: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NovoGrupoForm({ setAtualizaGrupos }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubimit, setIsSubmit] = useState(false);
  const [subGruposP, setSubGruposP] = useState<tySubGrupo[]>([]);

  const handleClose = () => {
    form.reset();
    setSubGruposP([]);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      descricao: "",
      tipo: "D",
    },
  });

  function onSubmit(values: FormProps) {
    const novoGrupo: tyGrupo = {
      nome: values.nome,
      descricao: values.descricao,
      tipo: values.tipo,
    };
    if (isSubimit) {
      incluirGrupo(novoGrupo, subGruposP);
      form.reset();
      setIsOpen(false);
    }
  }

  async function incluirGrupo(
    dadosGrupo: tyGrupo,
    dadosSubGrupos: tySubGrupo[]
  ) {
    novoGrupoComSubgrupos(dadosGrupo, dadosSubGrupos)
      .then((grupo) => {
        console.log("Grupo e SubGrupos criado: ", grupo);
        setAtualizaGrupos(true);
      })
      .catch((error) => {
        console.log("Erro ao criar Grupo e SubGrupos: ", error);
      });
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        className="hover:bg-slate-200"
        onClick={handleOpen}
      >
        + grupo
      </Button>
      <SheetContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[590px] min-w-[400px] overflow-auto rounded-2xl bg-white p-6 text-gray-900 shadow-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl">Novo grupo de Contas</SheetTitle>
        </SheetHeader>
        {isOpen && (
          <div className="mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex-row">
                  <div>
                    <TabelaSubGrupos
                      data={subGruposP}
                      setSubGruposP={setSubGruposP}
                    />
                  </div>
                </div>
                <div className="text-sm font-semibold flex justify-end mt-7">
                  <SheetFooter className="text-sm font-semibold flex justify-end mt-7">
                    <Button
                      variant="outline"
                      className="text-lg px-2 py-1 hover:bg-slate-200"
                      type="submit"
                      onClick={() => setIsSubmit(true)}
                    >
                      Incluir
                    </Button>
                    <Button
                      variant="outline"
                      className="text-lg px-2 py-1 hover:bg-slate-200"
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                  </SheetFooter>
                </div>
              </form>
            </Form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
