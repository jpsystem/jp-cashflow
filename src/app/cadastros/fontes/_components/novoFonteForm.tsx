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
import { Textarea } from "@/components/ui/textarea"

// Definição do objeto ZOD de validação
const schema = z.object({
  nome: z.string().min(2, "Campo obrigatorio!"),
  descricao: z.string().min(2, "Campo obrigatorio!"),
  tipo: z.enum(["M"], {
    errorMap: () => {
      return { message: "Sucesso ao criar uma nova Fonte." }
    },
  }),
})

// Definição do type Fonte
type Fontes = {
  id?: number
  nome: string
  descricao: string
  tipo?: string
}

// Definição das props para TabelaFontes
type TabelaFontesProps = {
  data: Fontes[]
}

// Definição do componente TabelaFontes
const TabelaFontes: React.FC<TabelaFontesProps> = ({ data }) => {
    function handleDelete(index: number): void {
        throw new Error("Função não implementada.")
    }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Tipo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((fonte, index) => (
          <TableRow key={index}>
            <TableCell>{fonte.nome}</TableCell>
            <TableCell>{fonte.descricao}</TableCell>
            <TableCell>{fonte.tipo}</TableCell>
            <TableCell>
              <Button variant="outline" onClick={() => handleDelete(index)}>
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Componente principal
type FormProps = z.infer<typeof schema>

////////////////////////////////////////////////////////////////

export default function NovoFontesForm() {
  // Variavel de estado isOpen
  const [isOpen, setIsOpen] = useState(false)

  // Função para fechar o DIALOG
  const handleClose = () => {
    setIsOpen(false)
  }

  // Lista das Fontes
  const [Fonte, setFonte] = useState<Fontes[]>([])

  // Função para incluir uma fonte na lista
  const handleAddFonte = (item: Fontes) => {
    // Uma validação para ver se o Nome da Fonte já existe
    const index = Fonte.findIndex((Fonte) => Fonte.nome === item.nome)
    if (index === -1) {
      setFonte([...Fonte, item])
      ordenarFonte()
      return true
    }
    return false
  }

  // // Função para excluir uma Fonte da lista
  // const handleDeleteSubGrupo = (index: number) => {
  //   // Encontra o índice do objeto com o id fornecido
  //   if (index > -1) {
  //     const newArray = [...Fonte.slice(0, index), ...Fonte.slice(index + 1)]
  //     setFonte(newArray)
  //   }
  //   ordenarFonte()
  // }

  // Função para ordenar a lista
  function ordenarFonte() {
    const listOrdenada = Fonte.sort((a, b) => {
      if (a.nome < b.nome) {
        return -1
      }
      if (a.nome > b.nome) {
        return 1
      }
      return 0
    })
    setFonte(listOrdenada)
  }

  // Definição do formulário
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      descricao: "",
      tipo: "M"
    },
  })

  // Função para abrir a Sheet
  const handleOpen = () => {
    form.resetField("nome")
    form.resetField("descricao")
    setIsOpen(true)
  }

  // Função para executar no Submit
  function onSubmit(values: FormProps) {
    console.log("VALORES", values)
    console.log("SUBS", Fonte)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen}>
      {/* <DialogOverlay className="bg-black/10" /> */}
      <Button variant="outline" onClick={handleOpen}>
        + Fonte
      </Button>
      <SheetTrigger className="rounded p-2 hover:bg-slate-200">
        {/* Add Conta */}
      </SheetTrigger>
      {/* <DialogPortal > */}
      <SheetContent
        className="fixed border-4
                      left-1/2 top-1/2
                      -translate-x-1/2 -translate-y-1/2
                      max-h-[600px] overflow-auto
                      rounded-2xl bg-white p-8  
                    text-gray-900 shadow"
      >
        <DialogTitle>Nova Fonte</DialogTitle>
        {isOpen ? (
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
                        <Input placeholder="Nome..." {...field} />
                      </FormControl>
                      <FormDescription>Nome da Fonte.</FormDescription>
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
                        <Textarea placeholder="Descrição sobre a fonte..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Digite a descrição da Fonte.
                      </FormDescription>
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
                        <Input placeholder="Tipo..." {...field} />
                      </FormControl>
                      <FormDescription>Tipo da Fonte.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex-row">
                  <div>
                    <TabelaFontes data={Fonte} />
                  </div>
                </div>
                {/* <Button className="w-full hover:bg-gray-100" variant={"outline"} type="submit">Incluir grupo</Button> */}
                <div className="text-right space-x-6">
                  <SheetFooter>
                    <button type="submit">Incluir</button>
                    {/* <Button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" variant={"default"} type="submit">Incluir grupo</Button> */}
                    <SheetClose onClick={handleClose}>
                      {/* <Button variant="outline" className="rounded bg-gray-200 text-red-500 hover:bg-red-200">Concelar</Button>  */}
                      {/* <Button onClick={handleClose}>Cancel</Button> */}
                      CANCEL
                    </SheetClose>
                  </SheetFooter>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <></>
        )}
      </SheetContent>
      {/* </DialogPortal> */}
    </Sheet>
  )
}
