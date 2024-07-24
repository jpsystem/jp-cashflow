"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogTitle } from "@/components/ui/dialog";

// Definição dos tipos de dados do formulário
type FormProps = {
  nomeDoOrcamento: string;
  valor: string;
};

// Schema de validação com zod
const schema = z.object({
  nomeDoOrcamento: z.string().min(1, "Campo obrigatório!"),
  valor: z.string().min(1, "Campo obrigatório!"),
});

const FormOrcamento = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeDoOrcamento: "",
      valor: "",
    },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const onSubmit = (values: FormProps) => {
    console.log("VALORES", values);
    handleClose();
  };

  return (
    <div className="flex flex-col">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-h-[300px] max-h-[330px] min-w-[400px] max-w-[400px] overflow-x-auto rounded-2xl bg-white p-8 text-sky-800 shadow">
          <DialogTitle className="text-sky-900">Editar Orçamento</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 mt-7">
                <FormField
                  control={form.control}
                  name="nomeDoOrcamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sky-900">
                        Conta
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-sky-900 w-full text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sky-900">Valor</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:text-sky-900 w-full text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SheetFooter className="mt-7 flex justify-between">
                <Button
                  type="submit"
                  className="h-9 w-22 border-2 text-sky-900 border-sky-800"
                >
                  Concluir
                </Button>
                <SheetClose asChild>
                  <Button
                    className="h-9 w-22 border-2 text-sky-900 border-sky-800"
                    variant="outline"
                    onClick={handleClose}
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
  );
};

export default FormOrcamento;
