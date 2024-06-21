"use client"
// COMPONENTE PAI

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateGrupo } from "@/actions/grupoActions"
import { z } from "zod"
import LabelError from "@/components/ui/jp/labelError"
import { useContext, useEffect, useState } from "react"
//import { ModalContext } from "@/components/ui/jp/modal/modal-context"
import NovoSubGrupo from "./novoSubGrupo"
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
import TabelaSubGrupos from "./tabelaSubGrupos"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
  nome: z.string().min(2, "Campo obrigatório!"),
  descricao: z.string().min(2, "Campo obrigatório!"),
  tipo: z.enum(["D", "C", "M"], {
    errorMap: () => ({
      message:
        "Informe 'D' para débito, 'C' para crédito ou 'M' para conta de movimentação.",
    }),
  }),
});

type SubGrupo = {
  id?: number;
  nome: string;
  descricao: string;
};

type FormProps = z.infer<typeof schema>;

export default function NovoGrupoForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [subGrupos, setSubGrupos] = useState<SubGrupo[]>([]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      descricao: "",
      tipo: "D",
    },
  });

  function onSubmit(values: FormProps) {
    console.log("VALORES", values);
    console.log("SUBS", subGrupos);
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="outline" onClick={handleOpen}>
        + Grupo
      </Button>
      <SheetTrigger className="rounded p-2 hover:bg-slate-200">
        {/* Add Conta */}
      </SheetTrigger>
      <SheetContent className="fixed border-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[600px] overflow-auto rounded-2xl bg-white p-8 text-gray-900 shadow">
        <DialogTitle>
          <button onClick={handleClose} className="absolute left-4 top-4">
          </button>
          Novo grupo de contas
        </DialogTitle>
        {isOpen && (
          <div className="mt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <TabelaSubGrupos data={subGrupos} />
                  </div>
                </div>
                <div className="text-right mt-8 space-x-4">
                  <SheetFooter>
                    <Button variant="outline" type="submit">Incluir</Button>
                    <SheetClose asChild>
                      <Button variant="outline" onClick={handleClose}>Cancelar</Button>
                    </SheetClose>
                  </SheetFooter>
                </div>
              </form>
            </Form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
