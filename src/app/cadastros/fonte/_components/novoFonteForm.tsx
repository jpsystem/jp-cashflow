"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import { DropdownMenu,  DropdownMenuContent,  DropdownMenuItem,  DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FaChevronDown } from "react-icons/fa";
import { CreateFonte } from "@/actions/fonteActions";
import { tipoFonte, tyFonte, tyResult } from "@/types/types";
import queryClient from "@/lib/reactQuery";
import { WarningBox, tipoEnu } from "@/app/_components/warningBox";
import {useSession } from "next-auth/react"

// Definição do objeto ZOD de validação
const schema = z.object({
  nome: z.string().min(2, "Campo obrigatorio, Mínimo (2) caracteres"),
  descricao: z.string().min(2, "Campo obrigatorio, Mínimo (2) caracteres"),
  ativo: z.boolean(),
  tipo: z.nativeEnum(tipoFonte, {
    errorMap: () => {
      return {
        message:
          "Informe 'A' para conta de aplicações, 'C' para conta de crédito ou 'M' para conta de movimentação.",
      };
    },
  }),
});

type FormProps = z.infer<typeof schema>;

export default function NovoFonteForm() {
  const { data: session } = useSession();

  // Variavel de estado isOpen
  const [isOpen, setIsOpen] = useState(false);

  //Variaveis para a caixa de avisos (WarningBox)
  const [showAlerta, setShowAlerta] = useState(false);
  const [tipo, setTipo] = useState<tipoEnu>(tipoEnu.Alerta);
  const [mensagem, setMensagem] = useState("Menssagem default");

  //Função para fechar a caixa de aviso
  const handleFechar=()=>{
    setShowAlerta(false);
  };

  // Função para fechar o DIALOG
  const handleClose = () => {
    setIsOpen(false);
  };

  // Definição do formulário
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      descricao: "",
      tipo: tipoFonte.Movimentacao,
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
    const novoFonte: tyFonte = {
      nome: values.nome,
      descricao: values?.descricao,
      tipo: values.tipo,
      ativo: values.ativo,
      userId: session?.user.id, 
    }
    incluirFonte(novoFonte)
    setIsOpen(false);
  }
  
  //Função para incluir uma nova fonte
  async function incluirFonte(dadosFonte: tyFonte){
    
    let retorno:tyResult ;
    try {      
      retorno = await CreateFonte(dadosFonte);
      
      if(retorno.status === "Sucesso"){
        setTipo(tipoEnu.Sucesso);
        setMensagem(`A fonte foi incluida com sucesso!` );
        setShowAlerta(true);   
         //Limpar o cache da consulta para atualizar os dados
         queryClient.invalidateQueries("fontes")   

      }else{
        if(retorno.menssagem === "P2002")
          {
            setTipo(tipoEnu.Erro);
            setMensagem("A fonte já está cadastrada!" );
            setShowAlerta(true);
          }else{
            setTipo(tipoEnu.Erro);
            setMensagem("O correu um erro inesperado no servidor!" );
            setShowAlerta(true);
          }
      }
    } catch (error) {
      setTipo(tipoEnu.Erro);
      setMensagem(`Ocorreu um erro inesperado! ${error}` );
      setShowAlerta(true);      
    }
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
          + Fonte
        </Button>
        <SheetContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[410px] min-w-[400px] overflow-auto rounded-2xl bg-white p-6 text-gray-900 shadow-lg">
          <SheetHeader>
            <SheetTitle className="text-2xl text-sky-900">
              Nova fonte financeira
            </SheetTitle> 
          </SheetHeader>
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
                                      {field.value === tipoFonte.Aplicacao
                                        ? "Aplicação"
                                        : field.value === tipoFonte.Credito
                                        ? "Crédito"
                                        : "Movimentação"}
                                      <FaChevronDown className="ml-2" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="bg-white text-sm">
                                    <DropdownMenuItem
                                      className="hover:shadow-xl hover:bg-slate-200 text-sm"
                                      onClick={() => field.onChange(tipoFonte.Aplicacao)}
                                    >
                                      Aplicação
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="hover:shadow-xl hover:bg-slate-200 text-sm"
                                      onClick={() => field.onChange(tipoFonte.Credito)}
                                    >
                                      Crédito
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="hover:shadow-xl hover:bg-slate-200 text-sm"
                                      onClick={() => field.onChange(tipoFonte.Movimentacao)}
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
    </>
  );
}
