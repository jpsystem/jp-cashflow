'use client'

// COMPONENTE FILHO

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
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

type SubGrupo = {
  id?: number,
  nome: string,
  descricao: string,
}

interface Props {
  data: SubGrupo[];
  onAddItem: (item: SubGrupo) => boolean;
}

const schema = z
.object({
  nome: z.string().min(3,"O nome da subconta deve ter pelo menos 3 caracteres."),
  descricao: z.string().min(10,"A descrição deve ter pelo menos 10 caracteres."),
});

type FormProps = z.infer<typeof schema>;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function NovoSubGrupo({data, onAddItem}: Props) {
  //Variavel de estado isOpen
  const [isOpen, setIsOpen] = useState(false);

  //Função para fechar a SHEET
  const handleClose = () => {
    setIsOpen(false);
  }


  //Definição do formulario
  const form = useForm<FormProps>({  
    resolver: zodResolver(schema),
    defaultValues:{
      nome: "",
      descricao: "",
    }
  });

  //Função para abrir a Sheet
  const handleOpen = () => {
    form.resetField("nome"); 
    form.resetField("descricao"); 
    setIsOpen(true);
  }

  //Definição do submit handler.
  function onSubmit(values: FormProps) {

    const newItem: SubGrupo = { 
      //id: data.length + 1,
      nome: values.nome.toUpperCase(),
      descricao: values.descricao
    };
    const retorno = onAddItem(newItem);
    if(retorno){
      setIsOpen(false);
    }
    else{
      alert("Esse subtipo ja existe!")
      setIsOpen(true);
    }
    
  }

  return(
    <Sheet open={isOpen}>
      {/* bg-black/80 */}
        {/* <button onClick={handleOpen}>+ SubGrupo</button> */}
        <Button variant="outline" onClick={handleOpen}>+ SubGrupo</Button>
      <SheetTrigger>
      </SheetTrigger>
      <SheetContent 
        side="top" 
        className= {`
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
          <SheetTitle>Novo SubGrupo</SheetTitle>
          <SheetDescription>
            Inclui um novo subgrupo.
          </SheetDescription>
        </SheetHeader>

        {/* //Inclusão do formulário */}
        {isOpen ? (
          <div className="flex flex-col w-full items-end space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField 
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nome do subgrupo.
                      </FormDescription>
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
        ): (<></>)}
      </SheetContent>
    </Sheet>
  )

}