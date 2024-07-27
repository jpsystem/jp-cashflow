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
import { WarningBox, tipoEnu } from "@/app/_components/warningBox";
import queryClient from "@/lib/reactQuery";

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

export default function NovoGrupoForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [subGruposP, setSubGruposP] = useState<tySubGrupo[]>([]);

  //Variaveis para a caixa de avisos (WarningBox)
  const [showAlerta, setShowAlerta] = useState(false);
  const [tipo, setTipo] = useState<tipoEnu>(tipoEnu.Alerta);
  const [mensagem, setMensagem] = useState("Menssagem default");

  //Função para fechar a caixa de aviso
  const handleFechar=()=>{
    setSubGruposP([]);
    setIsOpen(false);
    setShowAlerta(false);
  };

  const handleClose = () => {
    //form.reset();
    setSubGruposP([]);
    setIsOpen(false);
  };

  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      descricao: "",
      tipo: "D",
      ativo: true,
    },
  });

  const handleOpen = () => {
    form.resetField("nome");
    form.resetField("descricao");
    form.resetField("tipo");
    form.resetField("ativo");
    setIsOpen(true);
  };



  function onSubmit(values: FormProps) {
    const novoGrupo: tyGrupo = {
      nome: values.nome,
      descricao: values.descricao,
      tipo: values.tipo,
      ativo: values.ativo,
    };
    if (isSubmit) {
      incluirGrupo(novoGrupo, subGruposP);
      //form.reset();
      setIsOpen(false);
    }
  }

  async function incluirGrupo( dadosGrupo: tyGrupo, dadosSubGrupos: tySubGrupo[]) {
    await novoGrupoComSubgrupos(dadosGrupo, dadosSubGrupos)
      //.then((grupo) => {
        setTipo(tipoEnu.Sucesso);
        setMensagem(`A conta foi incluida com sucesso!` );
        setShowAlerta(true);
        
        //Limpar o cache da consulta para atualizar os dados
        queryClient.invalidateQueries("grupos")        

  }

  return (
    <>
      { showAlerta && (
          <WarningBox
            tipo={tipo}
            mensagem={mensagem}
            onCancel={handleFechar}
          />
        )
      }    
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Button
          variant="outline"
          className="hover:bg-slate-100 text-sky-900 border-2 border-sky-800 hover:text-sky-900 text-xl"
          onClick={handleOpen}
        >
          + Grupo
        </Button>
        <SheetContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  max-h-[500px] min-w-[680px] overflow-auto rounded-2xl bg-white p-6 shadow-lg">
          <SheetHeader>
            <SheetTitle className="text-2xl text-sky-900">
              Novo grupo de Contas
            </SheetTitle>
          </SheetHeader>
          {isOpen && (
            <div className="mt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-5">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sky-900">Nome</FormLabel>
                            <FormControl>
                              <Input
                                className="placeholder:text-sky-800 border-2 border-sky-900"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-5">
                      <FormField
                        control={form.control}
                        name="tipo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sky-900">Tipo</FormLabel>
                            <FormControl>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full text-sm flex items-center justify-between hover:bg-slate-200 text-sky-900 border-sky-900"
                                  >
                                    {field.value === "D"
                                      ? "Débito"
                                      : field.value === "C"
                                      ? "Crédito"
                                      : "Movimentação"}
                                    <FaChevronDown />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white text-sm border-2 border-sky-900 text-sky-800">
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
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="ativo"
                        render={({ field }) => (
                          <FormItem className="col-span-1 flex flex-col items-center mt-5">
                            <FormLabel className="text-sky-900">Ativo</FormLabel>
                            <FormControl>
                              <Checkbox
                                id="ativo"
                                className="border-2 border-sky-900"
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
                  <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sky-900">Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            className="placeholder:text-sky-800 border-2 border-sky-900"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-sky-900">
                    <TabelaSubGrupos
                      data={subGruposP}
                      setSubGruposP={setSubGruposP}
                    />
                  </div>
                  <div className="text-sm font-semibold flex justify-end mt-7 text-sky-900">
                    <SheetFooter className="text-sm font-semibold flex justify-end mt-7">
                      <Button
                        variant="outline"
                        className="text-lg px-2 py-1 hover:bg-slate-200 border-sky-800 border-2"
                        type="submit"
                        onClick={() => setIsSubmit(true)}
                      >
                        Incluir
                      </Button>
                      <Button
                        variant="outline"
                        className="text-lg px-2 py-1 hover:bg-slate-200 border-sky-800 border-2"
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
    </>
  );
}
