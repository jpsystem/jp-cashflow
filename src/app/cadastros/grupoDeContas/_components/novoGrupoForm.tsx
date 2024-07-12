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

//Componente SHEET shadcn/ui
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

//COMPONENTE FORM
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

//COMPONENTE TABLE
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//Configurando o zod para validação do formulário
const schema = z.object({
  nome: z.string().min(2, "Campo obrigatório!"),
  descricao: z.string().min(2, "Campo obrigatório!"),
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
      <SheetTrigger className="rounded p-2 hover:bg-slate-200"></SheetTrigger>
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
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-400"
                          placeholder="Tipo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
