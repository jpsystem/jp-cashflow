"use client"
// COMPONENTE PAI

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import LabelError from "@/components/ui/jp/labelError"
import { useContext, useEffect, useState } from "react"
//import { ModalContext } from "@/components/ui/jp/modal/modal-context"
//COMPONENTE DIALOG
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Checkbox } from "@/components/ui/checkbox"
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
import { TrashIcon } from "@/app/_components/iconsForm"
import { sub } from "date-fns"
import TabelaFonte from "./tabelaFontes"
import { Textarea } from "@/components/ui/textarea"

// Definição do objeto ZOD de validação
const schema = z.object({
  nome: z.string().min(2, "Campo obrigatorio!"),
  descricao: z.string().min(2, "Campo obrigatorio!"),
  ativo: z.boolean(),
  tipo: z.enum(["D", "C", "M"], {
    errorMap: () => {
      return {
        message:
          "Informe 'D' para débito, 'C' para crédito ou 'M' para conta de movimentação.",
      }
    },
  }),
})

// Definição do type fonte
type tyFonte = {
  id?: number
  nome: string
  descricao: string | null
  tipo: string
  ativo: boolean
}

type FormProps = z.infer<typeof schema>

////////////////////////////////////////////////////////////////

export default function NovoFonteForm() {
  // Variavel de estado isOpen
  const [isOpen, setIsOpen] = useState(false)

  // Função para fechar o DIALOG
  const handleClose = () => {
    setIsOpen(false)
  }

  // Lista das fontes
  const [Fonte] = useState<tyFonte[]>([])

  // Definição do formulário
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      descricao: "",
      tipo: "D",
      ativo: true,
    },
  })

  // Função para abrir a Sheet
  const handleOpen = () => {
    form.resetField("nome")
    form.resetField("descricao")
    form.resetField("tipo")
    form.resetField("ativo")
    setIsOpen(true)
  }

  // Função para executar no Submit
  function onSubmit(values: FormProps) {
    console.log("VALORES", values)
    console.log("SUBS", Fonte)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="outline" onClick={handleOpen}>
        + Fonte
      </Button>
      <SheetTrigger className="rounded p-2 hover:bg-slate-200 ">
        {/* Add Conta */}
      </SheetTrigger>
      <SheetContent
        className="fixed border-4
                    left-1/2 top-1/2
                    -translate-x-1/2 -translate-y-1/2
                    max-h-[600px] overflow-auto
                    rounded-2xl bg-white p-8  
                    text-gray-900 shadow max-w-md
                    flex flex-col w-full items-center space-y-4"
      >
        <DialogTitle>Nova Fonte</DialogTitle>
        <SheetClose asChild>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4"
          ></button>
        </SheetClose>
        {isOpen && (
          <div className="mt-8">
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
                        <Input placeholder="Nome" {...field} />
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
                        <Textarea placeholder="Descrição" {...field} />
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
                        <Input placeholder="Tipo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ativo"
                  render={({ field }) => (
                    <FormItem className="display:flex justify-content: flex-end">
                      <FormLabel>Ativo</FormLabel>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox />
                        </FormControl>
                        <div>salve</div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right mt-8 space-x-4">
                  <SheetFooter>
                    <Button variant="outline" type="submit">
                      Incluir
                    </Button>
                    <SheetClose asChild>
                      <Button variant="outline" onClick={handleClose}>
                        Cancelar
                      </Button>
                    </SheetClose>
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
