"use client";

import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  //Capturar erro de URL
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  //Inicializar o HOOK useForm
  const form = useForm();

  //Constantes para Estilo tailwind dos controles do formulário
  const clsLabel = "text-sm font-bold text-sky-900";
  const clsInput = "text-sm h-7";

  const handleSubmit = form.handleSubmit((data) => {
    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
  });

  return (
    <div
      className="flex items-center justify-center px-0 py-0 xl:border-b-[300px] 2xl:border-b-[200px] 
      sm:border-b-[100px] lg:border-b-[100px]
      md:border-b-[100px] border-white h-screen"
    >
      <Card className="w-[98%] max-w-[35rem]">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-sky-900">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
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
            <Button
              className="w-full text-base hover:bg-sky-100 hover:text-sky-900 bg-sky-900 text-sky-50"
              variant={"outline"}
              type="submit"
            >
              Login
            </Button>
            {error === "CredentialsSignin" && (
              <div className="text-red-600">Erro no login!</div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-1">
            <Link
              className="text-blue-600 underline dark:text-blue-400"
              href="/cadastros/usuarios/cadastro"
            >
              Esqueceu a senha?
            </Link>
            <p className="text-center hover:opacity-100 text-sky-800 opacity-40">
              ainda não está cadastrado?
              <Link className="text-blue-600 underline dark:text-blue-400" 
                    href="/cadastros/usuarios/cadastro">
                Cadastrar
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
