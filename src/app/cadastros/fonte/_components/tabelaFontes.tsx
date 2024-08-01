'use client'
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { useQuery} from 'react-query';
import queryClient from "@/lib/reactQuery";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { FileEditIcon, TrashIcon } from "@/app/_components/iconsForm"
import { DeleteFontes, ListaFontes } from "@/actions/fonteActions";
import { useSession } from 'next-auth/react';
import ConfirmationBox from "@/app/_components/confirmationBox";
import { useState } from "react";

export  default function  TabelaFontes() {
  
  //Variavel para a caixa de confirmação (ConfirmationBox)
  const [showConfirmation, setShowConfirmation] = useState(false);
  //Variaveis para setar o indice selecionado
  const [indice, setIndice] = useState(0);

  //Busca o id do usuário da seção
  const { data: session } = useSession();
  const idUsuario = session?.user.id;

  //Criação e execução do HOOK useQuery
  //Carrega as fontes
  const { data, isLoading } = useQuery( "fontes", async () => {
    const response = await ListaFontes(idUsuario);
    // console.log("DATA", data)
    return response;
  })

  //Tratamento para exibição de menssagem de espera
  //enquanto estiver processando a consulta do UseQuery
  if( isLoading) {
    return(<div className="loading"><h1>Carregando…</h1></div>)
  }
  
  //Função para cofirmar a exclusão
  const handleConfirm= async ()=>{
    await DeleteFontes(indice);
    //Limpar o cache da consulta para atualizar os dados
    queryClient.invalidateQueries("fontes")

    //fecha caixa de confirmação
    setShowConfirmation(false);
  };

  //Função para cancelar a exclusão
  const handleCancel=()=>{
    //fecha caixa de confirmação
    setShowConfirmation(false);
  };

  // Função para excluir um item da lista
  const handleDeleteFonte = async (index: number) => {
    setIndice(index);
    setShowConfirmation(true)
  }

  //Função para tazer a descrição do tipo dentro da tabela
  function retTipo(tipo: String){
    let retorno = "";
    if(tipo ==="M") retorno = "Movimentação";
    if(tipo ==="C") retorno = "Crédito";
    if(tipo ==="A") retorno = "Aplicação";
    return retorno;
  }

  return (
    <div className="flex flex-col w-full items-center">
      { showConfirmation && (
          <ConfirmationBox
            title="Confirmação!"
            menssage="Essa ação vai excluir a fonte de origem das transações. Tem certeza de que deseja continuar?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )
      }      
      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-[100px]">ID</TableHead> */}
                <TableHead>Fonte</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead className="w-[100px] text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item: any) => (
                <TableRow key={item.id}>
                  {/* <TableCell>{item.id}</TableCell> */}
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>{retTipo(item.tipo)}</TableCell>
                  <TableCell>{item.ativo.toString()}</TableCell>
                  <TableCell className="flex gap-1 justify-center">
                    <Button className="h-8 w-8" size="icon" variant="ghost">
                      <FileEditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      onClick={() => handleDeleteFonte(item.id)} 
                      className="h-8 w-8" 
                      size="icon" 
                      variant="ghost"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
