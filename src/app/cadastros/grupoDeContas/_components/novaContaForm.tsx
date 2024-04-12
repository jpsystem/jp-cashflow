'use client'

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function NovaContaForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar conta</CardTitle>
        <CardDescription>Adicione uma nova conta ou subconta à sua organização.</CardDescription>
      </CardHeader>
      {/* <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da conta</Label>
            <Input id="name" placeholder="Nome da conta" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de conta</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="receita">Receita</SelectItem>
                <SelectItem value="despesa">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea className="min-h-[100px]" id="description" placeholder="Adicione uma descrição opcional" />
          </div>
          <div className="space-y-2">
            <Label>Subcontas</Label>
            <div className="space-y-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subaccount1">Nome da subconta</Label>
                  <Input id="subaccount1" placeholder="Nome da subconta" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value1">Valor</Label>
                  <Input id="value1" placeholder="R$" required />
                </div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subaccount2">Nome da subconta</Label>
                  <Input id="subaccount2" placeholder="Nome da subconta" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value2">Valor</Label>
                  <Input id="value2" placeholder="R$" required />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button type="submit">Adicionar</Button>
        <Button variant="outline">Cancelar</Button>
      </CardFooter> */}
    </Card>
  )
}

