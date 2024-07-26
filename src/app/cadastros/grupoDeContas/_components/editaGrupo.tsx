"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { alteraGrupo, retGrupo } from "@/actions/grupoActions";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import TabelaSubGrupos from "./tabelaSubGrupos";
import { Textarea } from "@/components/ui/textarea";
import { tyGrupo, tySubGrupo } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa"; // Ícone de seta para baixo
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQuery } from "react-query";
import queryClient from "@/lib/reactQuery";

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

export default function EditaGrupoForm({
  pIndice,
  isEdita,
  setIsEdita,
}: Props) {
  const { data } = useQuery("misto", async () => {
    const { grupo, subGrupos } = await retGrupo(pIndice);
    return { grupo, subGrupos };
  });

  const [isOpen, setIsOpen] = useState(isEdita);
  const [grupoP, setGrupoP] = useState<tyGrupo>();
  const [subGruposP, setSubGruposP] = useState<tySubGrupo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const lista: tySubGrupo[] = [];
      let dadoGrupo: tyGrupo;

      dadoGrupo = {
        id: data?.grupo?.id,
        nome: data?.grupo?.nome ?? "",
        descricao: data?.grupo?.descricao || undefined,
        tipo: data?.grupo?.tipo,
        ativo: data?.grupo?.ativo,
      };
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
    };
    fetchData();
  }, [data]);

  const handleClose = () => {
    setIsEdita(false);
  };

  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: grupoP?.nome,
      descricao: grupoP?.descricao || undefined,
      tipo: grupoP?.tipo || undefined,
      ativo: grupoP?.ativo,
    },
  });

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

  async function altGrupo(dadosGrupo: tyGrupo) {
    alteraGrupo(dadosGrupo)
      .then((grupo) => {
        console.log("Grupo e SubGrupos criado: ", grupo);
        queryClient.invalidateQueries("grupos");
      })
      .catch((error) => {
        console.log("Erro ao criar Grupo e SubGrupos: ", error);
      });
  }

  return (
    <>
      {grupoP !== undefined && (
        <Sheet open={isOpen}>
          <Button
            variant="outline"
            className="hover:bg-slate-100 text-sky-900 border-2 border-sky-800 hover:text-sky-900"
            onClick={() => setIsOpen(true)}
          >
            Editar grupo
          </Button>
          <SheetContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[500px] min-w-[680px] overflow-auto rounded-2xl bg-white p-6 shadow-lg">
            <SheetHeader>
              <SheetTitle className="text-2xl text-sky-900">
                Editar grupo de Contas
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
                              <FormLabel className="text-sky-900">
                                Nome
                              </FormLabel>
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
                              <FormLabel className="text-sky-900">
                                Tipo
                              </FormLabel>
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
                              <FormLabel className="text-sky-900">
                                Ativo
                              </FormLabel>
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
                          <FormLabel className="text-sky-900">
                            Descrição
                          </FormLabel>
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
                        >
                          Salvar
                        </Button>
                        <Button
                          variant="outline"
                          className="text-lg px-2 py-1 hover:bg-slate-200 border-sky-800 border-2 ml-3"
                          type="button"
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
      )}
    </>
  );
}
