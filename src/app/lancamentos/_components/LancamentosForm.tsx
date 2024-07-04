"use client"

// Imports
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DialogTitle } from "@/components/ui/dialog"

// Schema de validação com zod
const schema = z.object({
  valor: z.string().min(1, "Campo obrigatório!"),
  periodo: z.string().min(1, "Campo obrigatório!"),
  descricao: z.string().min(1, "Campo obrigatório!"),
  dtLancamento: z.date(),
  fonte: z.string().min(1, "Campo obrigatório!"),
  destino: z.string().min(1, "Campo obrigatório!"),
  conta: z.string().min(1, "Campo obrigatório!"),
  subConta: z.string().min(1, "Campo obrigatório!"),
  operacao: z.enum(["D", "C", "M"], {
    errorMap: () => ({
      message:
        "Informe 'D' para débito, 'C' para crédito ou 'M' para conta de movimentação.",
    }),
  }),
})

type FormProps = z.infer<typeof schema>

export default function NovoLancamentosForm() {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      valor: "",
      periodo: "",
      descricao: "",
      dtLancamento: new Date(),
      fonte: "",
      destino: "",
      conta: "",
      subConta: "",
      operacao: "D",
    },
  })

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const onSubmit = (values: FormProps) => {
    console.log("VALORES", values)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          asChild
          className="container mx-auto max-sm:bg-red-100, max-md:px-2, max-[360px]:py-1, min-2xl:border sm:120px"
        >
          <Button variant="outline" onClick={handleOpen}>
            + Lançamentos
          </Button>
        </SheetTrigger>
        <SheetContent
          className="text-6xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
           min-h-[480px] max-h-[480px] min-w-[600px] max-w-[600px] overflow-auto 
           rounded-2xl bg-white p-8 text-gray-900 shadow"
        >
          <DialogTitle>Novo Lançamento</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col-2 gap-2 items-center leading-3 mx-auto">
                <FormField
                  control={form.control}
                  name="conta"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Conta</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-400 w-full"
                          placeholder="Conta"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subConta"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Sub-Conta</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-400 w-full"
                          placeholder="Sub-Conta"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="items-center leading-3 mx-auto">
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          className="placeholder:text-gray-400 w-full"
                          placeholder="Descrição"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col-2 gap-2 items-center leading-3 mx-auto">
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-400 w-full"
                          placeholder="Valor"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dtLancamento"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-400 text-center w-full"
                          type="date"
                          defaultValue={format(new Date(), "yyyy-MM")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col-2 gap-2 items-center leading-3 mx-auto">
                <FormField
                  control={form.control}
                  name="fonte"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Fonte</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-400 w-full"
                          placeholder="Fonte"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destino"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Destino</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-gray-400 w-full"
                          placeholder="Destino"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SheetFooter className="text-sm font-semibold flex justify-end mt-7">
                <Button
                  variant="outline"
                  type="submit"
                  className="text-lg px-2 py-1"
                >
                  Incluir
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="text-lg px-2 py-1"
                  >
                    Cancelar
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
