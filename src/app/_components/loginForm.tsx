"use client"

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

export default function LoginForm() {
  const searchParams = useSearchParams()

  const error = searchParams.get("error")

  const form = useForm()

  const handleSubmit = form.handleSubmit((data) => {
    signIn("credentials", {
      ...data,
      callbackUrl: "/home",
    })
  })
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-4xl font-bold text-sky-900">Login</CardTitle>
          <CardDescription className="text-2xl text-sky-800">
            Entre com os dados para o login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-2xl">
              <Label htmlFor="nickname" className="text-2xl text-sky-900">
                Login
              </Label>
              <Input
                id="nickname"
                required
                type="text"
                className="text-2xl"
                {...form.register("nickname")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-2xl text-sky-900">
                Senha
              </Label>
              <Input
                id="password"
                required
                type="password"
                className="text-2xl"
                {...form.register("password")}
              />
            </div>
            <Button
              className="w-full hover:bg-sky-100 hover:text-sky-900 text-sky-900"
              variant={"outline"}
              type="submit"
            >
              Login
            </Button>
            {error === "CredentialsSignin" && (
              <div className="space-y-2 text-red-600">Erro no login!</div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full max-w-sm space-y-2">
            <Link
              className="text-blue-600 underline dark:text-blue-400"
              href="/cadastros/usuarios/cadastro"
            >
              Esqueceu a senha?
            </Link>
            <p className="text-center text-gray-500 dark:text-gray-400">
              ainda não está cadastrado?
              <Link className="underline" href="/cadastros/usuarios/cadastro">
                Cadastrar
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
