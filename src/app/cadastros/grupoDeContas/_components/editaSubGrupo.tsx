"use client"
// COMPONENTE FILHO

//Passo 1 - receber como parametro o subGrupo atual
//Passo 2 - Exibir formulário para edição dos dados, todos os campos podem ser editados
//Passo 3 - feita alteração nos campos salvar os dados na tabela de subgrpos
//Passo 4 -  retorna para tabela e atualiza os dados da lista de subgrupos.


import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { tySubGrupo } from "@/types/types"

//Componente SHEET shadcn/ui
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

//Componente FORM shadcn/ui
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface Props {
  data: tySubGrupo
  isEdita: boolean
  setIsEdita: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = z.object({
  nome: z
    .string()
    .min(3, "O nome da subconta deve ter pelo menos 3 caracteres."),
  descricao: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
  ativo: z.boolean()
})

type FormProps = z.infer<typeof schema>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function EditaSubGrupo({ data, isEdita, setIsEdita}: Props) {
  //Variavel de estado isOpen
  const [isOpen, setIsOpen] = useState(isEdita)

  //Função para fechar a SHEET
  const handleClose = () => {
    setIsEdita(false)
  }

  //Definição do formulario
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: data?.nome,
      descricao: data?.descricao,
      ativo: data?.ativo,
    },
  })

  //Definição do submit handler.
  async function onSubmit(values: FormProps) {
    console.log("Alterados: ",values)
    const newItem: tySubGrupo = {
      //id: data.length + 1,
      nome: values.nome.toUpperCase(),
      descricao: values.descricao,
      ativo: values.ativo
    }
    //const retorno = await onAddItem(newItem)
    const retorno = false;
    if (retorno) {
      setIsOpen(false)
    } else {
      alert("Não foi possivel atualizar!")
      setIsOpen(true)
    }
  }

  return (
    <Sheet open={isOpen}>
      <SheetContent
        side="top"
        className={`
          bg-gray-100/90 
          left-1/2 top-1/2 
          -translate-x-1/2 
          -translate-y-1/2 
          h-fit
          max-w-[500px] 
          max-h-[600px] 
          overflow-auto 
          rounded-2xl 
          bg-white p-8 
          text-gray-900 shadow 
          justify-self-center`}
      >
        <SheetHeader>
          <SheetTitle>Editar SubGrupo</SheetTitle>
        </SheetHeader>
        {/* //Inclusão do formulário */}
        {isOpen && (
          <div className="flex flex-col w-full items-end space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
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
                      <FormDescription>Nome do subgrupo.</FormDescription>
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
                        <Textarea placeholder="Descricao" {...field} />
                      </FormControl>
                      <FormDescription>
                        Digite a descrição do subgrupo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ativo"
                  render={({ field }) => (
                    <FormItem
                      //onChange={handleChange} 
                      className="flex items-center space-x-2"
                    >
                      <FormLabel className={"mr-2"}>Ativo</FormLabel>
                      <FormControl>
                        <Checkbox 
                          className={"align-top"} 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          //defaultChecked 
                        />
                      </FormControl>
                      <FormDescription>
                        Defina se o subgrupo está ativo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right mt-8 space-x-4">
                  <SheetFooter>
                    <Button variant="outline" type="submit">
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
