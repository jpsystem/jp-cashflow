"use client"
// COMPONENTE PAI

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { novoGrupoComSubgrupos } from "@/actions/grupoActions"
import { Checkbox } from "@/components/ui/checkbox"
import { z } from "zod"
import React, { useState } from "react"
import TabelaSubGrupos from "./tabelaSubGrupos"
import { Textarea } from "@/components/ui/textarea"
import { tyGrupo, tySubGrupo, tyGrupoLista } from "@/types/types"

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

//COMPONENTE TABLE
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
})

type SubGrupo = {
  id?: number
  nome: string
  descricao: string
}

type FormProps = z.infer<typeof schema>


interface Props {
  setAtualizaGrupos: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NovoGrupoForm({setAtualizaGrupos}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubimit, setIsSubmit] = useState(false)
  const [subGruposP, setSubGruposP] = useState<SubGrupo[]>([])

  //Função a ser executada no evento
  //click do botão cancelar
  const handleClose = () => {
    form.reset()
    setSubGruposP([])
    setIsOpen(false)
  }

  //Inicialização do hook useForm
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      descricao: "",
      tipo: "D",
    },
  })

  //Função a ser executada no evento onSubmit
  // do componente form
  function onSubmit(values: FormProps) {
    const novoGrupo: tyGrupo = {
      nome: values.nome,
      descricao: values.descricao,
      tipo: values.tipo,
    }
    //Essa validação e para corrigir erro de submissão formulário antes de
    //selecionar os subgrupos
    if (isSubimit) {
      incluirGrupo(novoGrupo, subGruposP)
      form.reset()
      setIsOpen(false)
    }
  }

  //Essa função executa uma funçao de backEnd para
  //incluir o Grupo e seus respectivos subGrupos
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
        console.log("Erro ao criar Grupo e SubGrupos: ", error)
      })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="rounded border-solid border-black border-2 p-2 hover:bg-slate-200">
        + GRUPO
      </SheetTrigger>
      <SheetContent className="fixed border-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[800px] min-w-[800px] overflow-auto rounded-2xl bg-white p-8 text-gray-900 shadow">
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
                      onClick={() => setIsSubmit(true)}
                    >
                      Incluir
                    </Button>
                    <Button variant="outline" onClick={handleClose}>
                      Cancelar
                    </Button>
                    {/* <SheetClose asChild>
                    </SheetClose> */}
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
