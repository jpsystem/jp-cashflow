"use client";

import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { IncluirCodVerificacao, RetUsuarioPorLoginOuEmail } from "@/actions/usarioActions";
import { montaEmailVerificacao, validarTipoLogin } from "@/lib/jpFuncoes";
import { tyVerificacao } from "@/types/types";
import { useGlobalContext } from "../contextGlobal";
import {useRouter} from 'next/navigation'

export default function LoginForm() {
  const router = useRouter();
  //Capturar erro de URL
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  //Recuperar as funções do contexto
  const {setEmailVerificacao, setCodigoVerificacao, setUsuarioId} = useGlobalContext();

  //Inicializar o HOOK useForm
  const form = useForm();

  //Constantes para Estilo tailwind dos controles do formulário
  const clsLabel = "text-xl font-bold text-sky-900";
  const clsInput = "text-xl h-10";
  const clsErro  = "text-xl h-10 text-red-600 font-bold";

  const handleSubmit = form.handleSubmit((data) => {
    console.log("DATA: ", data);
    
    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
  });

  async function enviaCodigo(){
    const identificador = form.getValues("nickname");

    //verificar se foi digitado um logim ou email
    if(!identificador){
      alert("Por favor informar um login valido ou o email cadastrado!")
      return;
    }

    let codigo: string = "";
    let email: string = "";
    let login: string = "";

    if(validarTipoLogin(identificador) === "email"){
      codigo = await IncluirCodVerificacao(undefined, identificador);
      email = identificador;
    }else{
      codigo = await IncluirCodVerificacao(identificador);
      login = identificador;
    }
    
    //verificar se o email foi enviado
    if(codigo === "NADA" || codigo === "ERRO"){
      alert("Email não foi enviado! Verifique se voçe está digitando um email ou um login!")
      return;
    }
    const usuario: tyVerificacao | boolean = await RetUsuarioPorLoginOuEmail(login, email);
    
    if(typeof(usuario) === 'object'){
      usuario.codigo = codigo;
      const emailHTML = await montaEmailVerificacao(usuario);

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          para: `${usuario?.email}`, // Email do usuário
          assunto: "👮 Redefinição de Senha",
          corpoTexto: `Olá ${usuario?.nome},\nSeu código de verificação: ${codigo}`,
          corpoHtml: emailHTML ,
        }),
      });
      if (response.ok) {
        setEmailVerificacao(usuario.email);
        setCodigoVerificacao(usuario.codigo);
        setUsuarioId(usuario.id);
        console.log('Email enviado com sucesso');
        //redericona para a página de verificação do código
        router.push('/cadastros/usuarios/verificacao');
      } else {
        console.log('Erro ao enviar email');
      }
    }
  }

  return (
    <div
      className="flex items-center mt-[10%] justify-center align-middle w-screen"
    >
      <Card className="w-[80%] max-w-[800px]">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-4xl font-bold text-sky-900">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="text-4xl">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="nickname" className={clsLabel}> 
                Login
              </Label>
              <Input
                id="nickname"
                required
                type="text"
                className={clsInput}
                {...form.register("nickname")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className={clsLabel}>
                Senha
              </Label>
              <Input
                id="password"
                required
                type="password"
                className={clsInput}
                {...form.register("password")}
              />
            </div>
            <div className="pt-8">
              <Button
                className="w-full text-xl font-bold hover:bg-sky-100 hover:text-sky-900 bg-sky-900 text-sky-50"
                variant={"outline"}
                type="submit"
              >
                Login
              </Button>
              {error === "CredentialsSignin" && (
                <div className={clsErro}>Erro no login!</div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-1">
            <p className="text-center text-xl hover:opacity-100 text-sky-800 opacity-40">
            esqueceu sua senha digite o login para cadastra uma nova senha! 
            <Link
              className="text-blue-600 underline ml-2 dark:text-blue-400"
              onClick={() => enviaCodigo()}
              href="#"
              //href="/cadastros/usuarios/verificacao"
            >
              Esqueceu a senha?
            </Link>
            </p>
            <p className="text-center text-xl hover:opacity-100 text-sky-800 opacity-40">
              ainda não está cadastrado?
              <Link className="text-blue-600 underline ml-2 dark:text-blue-400" 
                    href="/cadastros/usuarios/cadastro">
                Cadastrar
              </Link>
            </p>
          </div>
        </CardFooter>
        {/* <Button onClick={() => enviaCodigo()}>
            Esqueci a senha
        </Button> */}
      </Card>
    </div>
  );
}
