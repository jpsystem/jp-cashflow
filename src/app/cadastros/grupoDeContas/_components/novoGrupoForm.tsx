'use client'
// COMPONENTE PAI

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateGrupo } from "@/actions/grupoActions"
import {z} from "zod"
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
  DialogTrigger 
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

//Definição do objeto ZOD de validação
const schema = z
.object({
  nome: z.string().min(2,"Campo obrigatorio!"),
  descricao: z.string().min(2,"Campo obrigatorio!"),
  tipo: z.enum(['D','C','M'], {
    errorMap: () =>{
      return { message: "Informe 'D' para débito, 'C' para crédito ou 'M' para conta de mivimentação."};
    }
  }),
});

//Definição do type SubGrupo
type SubGrupo = {
  id?: number,
  nome: string,
  descricao: string,
}

//Definição do type Grupo
type Grupo = {
  id?: number,
  nome: string,
  descricao: string,
  tipo?: string,
  subgrupos?: [{
    id?: number,
    nome: string,
    descricao: string,
  }]
}

type FormProps = z.infer<typeof schema>;

////////////////////////////////////////////////////////////////

export default function NovoGrupoForm(){
  //Variavel de estado isOpen
  const [isOpen, setIsOpen] = useState(false);

  //Função para fechar o DIALOG
  const handleClose = () => {
    setIsOpen(false);
  }

  //Lista dos subGrupos
  const [subGrupos, setSubGrupos] = useState<SubGrupo[]>([])

  //Função para incluir um subGrupo na lista
  const handleAddSubGrupo = (item: SubGrupo) => {
        //Uma validação para ver se o Nome do subgrupo já existe
        const index = subGrupos.findIndex(subGrupo => subGrupo.nome === item.nome);
        if (index === -1) {
          setSubGrupos([...subGrupos, item])
          odenarSubGrupos;
          return true;
        }
        return false;
        //setSubGrupos([...subGrupos, item])
      };

  //Função para excluir um subGrupo da lista
  const handleDeleteSubGrupo = (index: number) => {
    // Encontra o índice do objeto com o id fornecido
    //const index = subGrupos.findIndex(item => item.id === id);
    if (index > -1) {      
      const newArray = [...subGrupos.slice(0,index), ...subGrupos.slice(index + 1)];
      setSubGrupos(newArray);
    }
    odenarSubGrupos;
  };

  //Função para ordenar a lista
  function odenarSubGrupos(){
  const listOrdenada = subGrupos.sort((a, b) => {
    if (a.nome < b.nome) {
        return -1;
    }
    if (a.nome > b.nome) {
        return 1;
    }
    return 0;
  });
  setSubGrupos(listOrdenada);

  }

  //Definição do formulário
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues:{
      nome: "",
      descricao: "",
      tipo: "D",
    }
  })

  // const { register, handleSubmit, formState: {errors } } = useForm<FormProps>({
  //   mode: 'all',
  //   reValidateMode: "onChange",
  //   resolver: zodResolver(schema)
  // });

  //Função para abrir a Sheet
  const handleOpen = () => {
    form.resetField("nome"); 
    form.resetField("descricao"); 
    setIsOpen(true);
  }
 
  //Função para executar no Submit
  function onSubmit(values: FormProps){
    console.log("VALORES",values);
    console.log("SUBS",subGrupos);
    setIsOpen(false);
  }


  return (
    <Sheet open={isOpen}>
      {/* <DialogOverlay className="bg-black/10" /> */}
        <Button variant="outline" onClick={handleOpen}>+ Grupo</Button>
      <SheetTrigger className="rounded p-2 hover:bg-slate-200">
        {/* Add Conta */}
      </SheetTrigger>
      {/* <DialogPortal > */}
      <SheetContent className="fixed border-4
                      left-1/2 top-1/2
                      -translate-x-1/2 -translate-y-1/2
                      max-h-[600px] overflow-auto
                      rounded-2xl bg-white p-8  
                    text-gray-900 shadow">

        <DialogTitle>Novo grupo de contas</DialogTitle>
        {isOpen ? (
        <div className="mt-8">
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Nome do grupo (nome) */}
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
                    Nome do grupo.
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
            <FormField 
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tipo" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tipo da conta.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-row"> 
              <div>
                <TabelaSubGrupos data={subGrupos} />
              </div>
            </div>
            {/* <Button className="w-full hover:bg-gray-100" variant={"outline"} type="submit">Incluir grupo</Button> */}
            <div className="text-right space-x-6">
              <SheetFooter >
              <button type="submit">Incluir</button>
                {/* <Button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" variant={"default"} type="submit">Incluir grupo</Button> */}
                <SheetClose onClick={handleClose} >
                  {/* <Button variant="outline" className="rounded bg-gray-200 text-red-500 hover:bg-red-200">Concelar</Button>  */}
                  {/* <Button onClick={handleClose}>Cancel</Button> */}
                  CANCEL
                </SheetClose>
              </SheetFooter>
            </div>
          </form>
          </Form>
        </div>
        ):(<></>)}
      </SheetContent>
      {/* </DialogPortal> */}
    </Sheet>
  )
}


