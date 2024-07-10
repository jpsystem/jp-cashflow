"use client"
// COMPONENTE PAI

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { alteraGrupo, novoGrupoComSubgrupos } from "@/actions/grupoActions"
import { Checkbox } from "@/components/ui/checkbox"
import { z } from "zod"
import React, { useEffect, useState } from "react"
import TabelaSubGrupos from "./tabelaSubGrupos"
import { Textarea } from "@/components/ui/textarea"
import { tyGrupo, tySubGrupo, } from "@/types/types"

//Componente SHEET shadcn/ui
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

//COMPONENTE FORM
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Grupo, SubGrupo } from "@prisma/client"

//Configurando o zod para validação do formulário
const schema = z.object({
  nome: z.string().min(2, "Campo obrigatório!"),
  descricao: z.string().min(2, "Campo obrigatório!"),
  tipo: z.string(),
  ativo: z.boolean(),
})

type FormProps = z.infer<typeof schema>

interface Props {
  pGrupo?: Grupo;
  pSubGrupos?: SubGrupo[];
  setAtualizaGruposEdicao: React.Dispatch<React.SetStateAction<boolean>>;
  isEdita: boolean;
  setIsEdita: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditaGrupoForm( {pGrupo, 
                                        pSubGrupos, 
                                        setAtualizaGruposEdicao, 
                                        isEdita, 
                                        setIsEdita}: Props) {
  const [isOpen, setIsOpen] = useState(isEdita)
  const [subGruposP, setSubGruposP] = useState<tySubGrupo[]>([])

  //Criar uma função para o parse do array pSubGrupos
  //para a variavel de estado subGruposP
  useEffect(() =>{
    const lista: tySubGrupo[] = [];
    const fetchData = async ()=> {
      pSubGrupos?.map(subGrupo => lista.push({
        id: subGrupo.id,
        nome: subGrupo.nome,
        descricao: subGrupo.descricao || undefined,
        ativo: subGrupo.ativo,
        grupoId: subGrupo.grupoId,
      }));
      setSubGruposP(lista);
    }
  },[pSubGrupos])
  //======================================

  //Função a ser executada no evento
  //click do botão cancelar
  const handleClose = () => {
    setIsEdita(false)
  }

  //Inicialização do hook useForm
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: pGrupo?.nome,
      descricao: pGrupo?.descricao || undefined,
      tipo: pGrupo?.tipo || undefined,
      ativo: pGrupo?.ativo,
    },
  })

  //Função a ser executada no evento onSubmit
  // do componente form
  function onSubmit(values: FormProps) {
    const novoGrupo: tyGrupo = {
      id: pGrupo?.id,
      nome: values.nome,
      descricao: values.descricao,
      tipo: values.tipo,
      ativo: values.ativo,
    }
    altGrupo(novoGrupo)
    setIsOpen(false)
  }

  //Essa função altera os dados do Grupo
  async function altGrupo(dadosGrupo: tyGrupo) {
    alteraGrupo(dadosGrupo)
    .then((grupo) =>{
      console.log("Grupo e SubGrupos criado: ", grupo);
      setAtualizaGruposEdicao(true);
    })
    .catch((error) => {
      console.log("Erro ao criar Grupo e SubGrupos: ", error)
    })
  }

  return (
    <Sheet open={isOpen}>
      <SheetContent className="fixed border-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[800px] min-w-[800px] overflow-auto rounded-2xl bg-white p-8 text-gray-900 shadow">
        <SheetHeader>
          <SheetTitle className="text-2xl">Editar grupo de Contas</SheetTitle>
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
                        <Input placeholder="Nome" {...field} />
                      </FormControl>
                      <FormDescription>Nome do grupo.</FormDescription>
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
                        <Textarea placeholder="Descrição" {...field} />
                      </FormControl>
                      <FormDescription>Descrição do grupo.</FormDescription>
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
                        <Input placeholder="Tipo" {...field} />
                      </FormControl>
                      <FormDescription>Tipo da conta.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ativo"
                  render={({ field }) => (
                    <FormItem
                      className="flex items-center space-x-2"
                    >
                      <FormLabel className={"mr-2"}>Ativo</FormLabel>
                      <FormControl>
                        <Checkbox 
                          className={"align-top"} 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Defina se o subgrupo está ativo.
                      </FormDescription>
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
                <div className="text-right mt-8 space-x-4">
                  <SheetFooter>
                    <Button
                      variant="outline"
                      type="submit"
                    >
                      Salvar
                    </Button>
                    <Button variant="outline" onClick={handleClose}>
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
