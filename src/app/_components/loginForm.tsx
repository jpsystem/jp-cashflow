'use client'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

import {signIn} from "next-auth/react"
import { useSearchParams } from "next/navigation"

export default function LoginForm(){
  const searchParams = useSearchParams()

  const error = searchParams.get('error')

  const form = useForm()

  const handleSubmit = form.handleSubmit((data)=>{
    //console.log(data)
    signIn("credentials", {
      ...data,
      callbackUrl: "/home",
    })
  })
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email to receive a magic link</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              placeholder="m@example.com" 
              required 
              type="email"
              {... form.register("email")} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Password</Label>
            <Input 
              id="password" 
              placeholder="m@example.com" 
              required 
              type="password"
              {... form.register("password")} 
            />
          </div>
          <Button className="w-full hover:bg-gray-100" variant={"outline"} type="submit">Entrar no sistema</Button>
          { error === "CredentialsSignin" &&           
            <div className="space-y-2 text-red-600">
              Erro no login!
            </div>
          }
        </form>
      </CardContent>
    </Card>
  )
}