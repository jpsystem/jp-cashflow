"use client";

// COMPONENTE FILHO
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { tySubGrupo } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";

// Componente SHEET shadcn/ui
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Componente FORM shadcn/ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  onAddItem: (item: tySubGrupo) => Promise<boolean>;
}

const schema = z.object({
  nome: z
    .string()
    .min(3, "O nome da subconta deve ter pelo menos 3 caracteres."),
  descricao: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
  ativo: z.boolean(),
});

type FormProps = z.infer<typeof schema>;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function NovoSubGrupo({ onAddItem }: Props) {
  // Variável de estado isOpen
  const [isOpen, setIsOpen] = useState(false);

  // Função para fechar a SHEET
  const handleClose = () => {
    setIsOpen(false);
  };

  // Definição do formulário
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      descricao: "",
      ativo: true,
    },
  });

  // Função para abrir a Sheet
  const handleOpen = () => {
    form.reset();
    setIsOpen(true);
  };

  // Definição do submit handler.
  async function onSubmit(values: FormProps) {
    const newItem: tySubGrupo = {
      nome: values.nome.toUpperCase(),
      descricao: values.descricao,
      ativo: values.ativo,
    };
    const retorno = await onAddItem(newItem);
    if (retorno) {
      setIsOpen(false);
    } else {
      alert("Esse subtipo já existe!");
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        className="hover:bg-sky-100"
        onClick={handleOpen}
      >
        + SubGrupo
      </Button>
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
          text-gray-900 shadow-lg 
          flex flex-col`}
      >
        <SheetHeader>
          <SheetTitle className="text-2xl text-left">Novo SubGrupo</SheetTitle>
          <SheetClose asChild>
            <button
              onClick={handleClose}
              className="absolute right-5 top-1"
            ></button>
          </SheetClose>
        </SheetHeader>
        {/* Inclusão do formulário */}
        <div className="flex flex-col w-full items-center space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full max-w-[400px]"
            >
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Nome
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome"
                        className="placeholder:text-gray-400"
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
                    <FormLabel className="text-lg font-semibold">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrição"
                        className="placeholder:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center">
                <FormField
                  control={form.control}
                  name="ativo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center space-y-2">
                      <FormLabel>Ativo</FormLabel>
                      <FormControl>
                        {/* {...field} checked={field.value}  */}
                        <Checkbox />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-sm font-semibold flex justify-end mt-7">
                <SheetFooter>
                  <Button
                    variant="outline"
                    type="submit"
                    className="text-lg px-4 py-2 hover:bg-sky-100"
                  >
                    Incluir
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="text-lg px-4 py-2 hover:bg-sky-100"
                  >
                    Cancelar
                  </Button>
                </SheetFooter>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
