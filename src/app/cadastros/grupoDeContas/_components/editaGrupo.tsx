"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { alteraGrupo, novoGrupoComSubgrupos, retGrupo } from "@/actions/grupoActions";
import { Checkbox } from "@/components/ui/checkbox";
import {  number, z } from "zod";
import React, { useEffect, useState } from "react";
import TabelaSubGrupos from "./tabelaSubGrupos";
import { Textarea } from "@/components/ui/textarea";
import { tyGrupo, tySubGrupo } from "@/types/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa"; // Ícone de seta para baixo
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import { Grupo, SubGrupo } from "@prisma/client";
import queryClient from "@/lib/reactQuery";
import { useQuery } from "react-query";

//Configurando o zod para validação do formulário
const schema = z.object({
  nome: z.string().min(2, "Campo obrigatório!"),
  descricao: z.string().min(2, "Campo obrigatório!"),
  tipo: z.string(),
  ativo: z.boolean(),
});

type FormProps = z.infer<typeof schema>;

interface Props {
  pIndice: number;
  isEdita: boolean;
  setIsEdita: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditaGrupoForm({ pIndice, isEdita, setIsEdita }: Props) {



  const { data, isLoading } = useQuery( "misto", async () => {
    const { grupo, subGrupos } = await retGrupo(pIndice);
    return { grupo, subGrupos };
  })



  console.log("Grupo: ", data?.grupo)
  console.log("SubGrupo: ", data?.subGrupos)
  
  const [isOpen, setIsOpen] = useState(isEdita);
  const [grupoP, setGrupoP] = useState<tyGrupo>();
  const [subGruposP, setSubGruposP] = useState<tySubGrupo[]>([]);

  //Criar uma função para o parse do array pSubGrupos
  //para a variavel de estado subGruposP
  useEffect(() => {

    const fetchData = async () => {
      const lista: tySubGrupo[] = [];
      let dadoGrupo:tyGrupo;


      // const { grupo, subGrupos } = await retGrupo(pIndice);
      // console.log("Grupo: ", grupo);
      // console.log("SubGrupo: ", subGrupos);
      //if (data.grupo !== null && data.grupo !== undefined) {
        dadoGrupo={
          id: data?.grupo?.id,
          nome: data?.grupo?.nome ?? "",
          descricao: data?.grupo?.descricao || undefined,
          tipo: data?.grupo?.tipo,
          ativo: data?.grupo?.ativo,
        }
        setGrupoP(dadoGrupo);

        data?.subGrupos?.map((subGrupo) =>
          lista.push({
            id: subGrupo.id,
            nome: subGrupo.nome,
            descricao: subGrupo.descricao || undefined,
            ativo: subGrupo.ativo,
            grupoId: subGrupo.grupoId,
          })
        );
        setSubGruposP(lista);
      //}
    };
    fetchData();
    console.log("Grupos: ", grupoP)
    console.log("SubGrupos: ", subGruposP)
  },[]);
  //======================================

  //Função a ser executada no evento
  //click do botão cancelar
  const handleClose = () => {
    setIsEdita(false);
  };

  //Inicialização do hook useForm
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: grupoP?.nome,
      descricao: grupoP?.descricao || undefined,
      tipo: grupoP?.tipo || undefined,
      ativo: grupoP?.ativo,
    },
  });

  //Função a ser executada no evento onSubmit
  // do componente form
  function onSubmit(values: FormProps) {
    const novoGrupo: tyGrupo = {
      id: grupoP?.id,
      nome: values.nome,
      descricao: values.descricao,
      tipo: values.tipo,
      ativo: values.ativo,
    };
    altGrupo(novoGrupo);
    setIsOpen(false);
  }

  //Essa função altera os dados do Grupo
  async function altGrupo(dadosGrupo: tyGrupo) {
    alteraGrupo(dadosGrupo)
      .then((grupo) => {
        console.log("Grupo e SubGrupos criado: ", grupo);
        queryClient.invalidateQueries("grupos")
        //setAtualizaGruposEdicao(true);
      })
      .catch((error) => {
        console.log("Erro ao criar Grupo e SubGrupos: ", error);
      });
  }

  return (
    <> 
      { grupoP !== undefined && (
          <Sheet open={isOpen}>
            <SheetContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[590px] min-w-[400px] overflow-auto rounded-2xl bg-white p-6 shadow-lg">
              <SheetHeader>
                <SheetTitle className="text-2xl text-sky-900">
                  Editar grupo de Contas
                </SheetTitle>
              </SheetHeader>
              {(isOpen && grupoP !== undefined) && (
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
                            <FormLabel className="text-sky-900">Nome</FormLabel>
                            <FormControl>
                              <Input
                                className="text-sky-800 border-2 border-sky-900"
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
                            <FormLabel className="text-sky-900">Descrição</FormLabel>
                            <FormControl>
                              <Textarea
                                className="text-sky-800 border-2 border-sky-900"
                                placeholder="Descrição"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <FormField
                            control={form.control}
                            name="tipo"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="flex flex-col space-y-2">
                                    <FormLabel className="text-sky-900">
                                      Tipo
                                    </FormLabel>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-15 h-7 text-sm px-2 py-1 flex items-center justify-between hover:bg-slate-200 text-sky-900 border-sky-900"
                                        >
                                          {field.value === "D"
                                            ? "Débito"
                                            : field.value === "C"
                                            ? "Crédito"
                                            : "Movimentação"}
                                          <FaChevronDown className="pl-2" />
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
                              <FormItem className="flex flex-col items-center space-y-2 text-sky-900 ">
                                <FormLabel>Ativo</FormLabel>
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
                      <div className="flex-row text-sky-900">
                        <div>
                          <TabelaSubGrupos
                            data={subGruposP}
                            setSubGruposP={setSubGruposP}
                          />
                        </div>
                      </div>
                      <div className="text-right mt-8 space-x-4 text-sky-900">
                        <SheetFooter>
                          <Button
                            variant="outline"
                            className="text-lg px-2 py-1 hover:bg-slate-200 border-sky-800 border-2"
                            type="submit"
                          >
                            Salvar
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
        )
      }
    </>
  );
}
