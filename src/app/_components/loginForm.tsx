"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  const form = useForm();

  const handleSubmit = form.handleSubmit((data) => {
    signIn("credentials", {
      ...data,
      callbackUrl: "/home",
    });
  });

  return (
    <div
      className="flex items-center justify-center px-0 py-0 xl:border-b-[300px] 2xl:border-b-[200px] 
      sm:border-b-[100px] lg:border-b-[100px]
      md:border-b-[100px] border-white h-screen"
    >
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-sky-900">
            Login
          </CardTitle>
          {/* <CardDescription className="text-lg text-sky-800">
            Entre com os dados para o login
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="nickname" className="text-lg text-sky-900">
                Login
              </Label>
              <Input
                id="nickname"
                required
                type="text"
                className="text-base"
                {...form.register("nickname")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-lg text-sky-900">
                Senha
              </Label>
              <Input
                id="password"
                required
                type="password"
                className="text-base"
                {...form.register("password")}
              />
            </div>
            <Button
              className="w-full text-base hover:bg-sky-100 hover:text-sky-900 text-sky-900"
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
              <Link className="underline" href="/cadastros/usuarios/cadastro">
                Cadastrar
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
