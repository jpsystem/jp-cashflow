'use client'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUsuario } from "@/actions/usarioActions"
import { useRouter } from "next/navigation";
import { tyUsuario } from "../../../../../types/types"
import {z} from "zod"
import LabelError from "@/components/ui/jp/labelError"
import { useContext } from "react"
import { ModalContext } from "@/components/ui/jp/modal/modal-context"



const schema = z
.object({
  login: z.string().min(2,"Campo obrigatorio!"),
  email: z.string().email("Digite um email valido!"),
  nome: z.string().min(1,"Campo obrigatorio!"),
  perfil: z.enum(['admin','default'], {
    errorMap: () =>{
      return { message: "Informe 'admin' ou 'default'."};
    }
  }),
  senha: z.string().min(6,"A senha precisa ter no minimo 6 caracteres!"),
  confirmaSenha: z.string(),
})
.refine((fields) => fields.senha === fields.confirmaSenha, {
  path: ['confirmaSenha'],
  message: 'As senhas precisam ser iguais!'
});

type FormProps = z.infer<typeof schema>;

export default function NovoUsuarioForm(){

  const router = useRouter();

  const { setShow, setTitle, setBody } = useContext(ModalContext)

  const { register, handleSubmit, formState: {errors } } = useForm<FormProps>({
    mode: 'all',
    reValidateMode: "onChange",
    resolver: zodResolver(schema)
  });
 
  const handleForm = async (data: FormProps) => {
    
    const dados = {
      key: 0,
      id: 0,
      email: data.email,
      nome: data.nome,
      senha: data.senha,
      perfil: data.perfil,
      login: data.login,
      token: undefined,
      dtToken: undefined,
      confirmaSenha: data.confirmaSenha,
    }

    const ret = await CreateUsuario(dados);
    if(ret.status > 0){
      setTitle("Sucesso!");
      setBody(ret.menssage);
      setShow(true);
      router.replace("/");
    }else{
      setTitle("Falha!");
      setBody(ret.menssage);
      setShow(true);
    }


  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold">Cadastro</CardTitle>
        <CardDescription>Entre com os dados para o cadastro</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
        <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
          {/* Login (login) */}
          <div className="space-y-2">
            <Label htmlFor="login">Login</Label>
            <Input 
              id="login"
              placeholder="login"  
              type="text"
              {...register("login")} 
            />
            {/* {errors.login ? (<LabelError message="Teste"/>)  : ("")} */}
            {errors.login ? (<LabelError>{errors?.login?.message}</LabelError>):""}
          </div>
          {/* Email (email) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              placeholder="yourEmail@dominio"  
              type="email"
              {...register("email")} 
            />
            {errors.email ? (<LabelError>{errors?.email?.message}</LabelError>):""}
          </div>
          {/* Nome completo (nome) */}
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input 
              id="nome" 
              placeholder="seu nome"  
              type="text"
              {...register("nome")} 
            />
            {errors.nome ? (<LabelError>{errors?.nome?.message}</LabelError>):""}
          </div>
          {/* Nome completo (nome) */}
          <div className="space-y-2">
            <Label htmlFor="nome">Perfil</Label>
            <Input 
              id="perfil" 
              placeholder="perfil"  
              type="text"
              {...register("perfil")} 
            />
            {errors.perfil ? (<LabelError>{errors?.perfil?.message}</LabelError>):""}
          </div>
          {/* Senha (senha) */}
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input 
              id="senha"   
              type="password"
              {...register("senha")} 
            />
            {errors.senha ? (<LabelError>{errors?.senha?.message}</LabelError>):""}
          </div>
          {/* Senha (senha) */}
          <div className="space-y-2">
            <Label htmlFor="confirmaSenha">Confirmação da Senha</Label>
            <Input 
              id="confirmaSenha"   
              type="password"
              {...register("confirmaSenha")} 
            />
            {errors.confirmaSenha ? (<LabelError>{errors?.confirmaSenha?.message}</LabelError>):""}
          </div>
          <Button className="w-full hover:bg-gray-100" variant={"outline"} type="submit">Cadastrar</Button>
          {/* { error === "CredentialsSignin" &&           
            <div className="space-y-2 text-red-600">
              Erro no login!
            </div>
          } */}
        </form>
      </CardContent>
    </Card>
  )
}