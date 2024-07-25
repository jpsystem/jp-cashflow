"use client";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { useQuery} from 'react-query';
import queryClient from "@/lib/reactQuery";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table, } from "@/components/ui/table";
import { FileEditIcon, TrashIcon } from "@/app/_components/iconsForm";
import { retGrupo, retGrupos } from "@/actions/grupoActions";
import { tyGrupoLista } from "@/types/types";
import { useState } from "react";
import { Grupo, SubGrupo } from "@prisma/client";
import EditaGrupoForm from "./editaGrupo";
import ConfirmationBox from "@/app/_components/confirmationBox";

export default function TabelaGrupos() {

  //Criação e execução do HOOK useQuery
  //Carrega as fontes
  const { data, isLoading } = useQuery( "grupos", async () => {
    const response:tyGrupoLista[] = await retGrupos();
    return response;
  })

  //Variavel para a caixa de confirmação (ConfirmationBox)
  const [showConfirmation, setShowConfirmation] = useState(false);
  //Variaveis para ativar o forme (EditaGrupoForm)
  const [isEdita, setIsEdita] = useState(false);
  //Variaveis para setar o indice selecionado
  const [indice, setIndice] = useState(0);

  //Função para cofirmar a exclusão
  const handleConfirm=()=>{
    console.log("Confirmada a exclusão!");
    setShowConfirmation(false);
  };
  //Função para cancelar a exclusão
  const handleCancel=()=>{
    console.log("Exclusão cancelada!")
    setShowConfirmation(false);
  };


  const handleEditGrupo = async (index: number) => {
    
    setIndice(index);
    setIsEdita(true);
    // const { grupo, subGrupos } = await retGrupo(index);
    // if (grupo !== null) {
    //   setGrupo(grupo);
    //   setSubGrupos(subGrupos);
    // }
  };

  // Função para excluir um grupo
  const handleDeleteGrupo = async (index: number) => {
    setShowConfirmation(true)
    //await DeleteGrupo(index);
    //Limpar o cache da consulta para atualizar os dados
    //queryClient.invalidateQueries("grupos")
  }

  if(isLoading){
    return(
      <div>
       <p>Carregando...</p> 
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full items-center">
      { showConfirmation && (
          <ConfirmationBox
            title="Confirmação!"
            menssage="Essa ação vai excluir o grupo e todos os subgrupos associados. Tem certeza de que deseja continuar?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )
      }
          <Card className="w-full rounded">
            <CardContent className="p-0">
              <Table className="border-collapse border-spacing-0">
                {isEdita && (
                  <EditaGrupoForm
                    // pGrupo={grupo}
                    // pSubGrupos={subGrupos}
                    pIndice={indice}
                    isEdita={isEdita}
                    setIsEdita={setIsEdita}
                  />
                )}
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-sky-900 border-2 border-sky-50 text-sky-50 text-center">
                      Conta
                    </TableHead>
                    <TableHead className=" bg-sky-900 border-2 border-sky-50 text-sky-50 text-center">
                      Descrição
                    </TableHead>
                    <TableHead className=" bg-sky-900 border-2 border-sky-50 text-center text-sky-50">
                      Subcontas
                    </TableHead>
                    <TableHead className=" bg-sky-900 border-2 border-sky-50 text-center text-sky-50">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="border-2 border-sky-900 text-sky-900 text-center w-[13%]">
                        {item.nome}
                      </TableCell>
                      <TableCell className="border-2 border-sky-900 text-sky-900 w-[64%] text-center">
                        {item.descricao}
                      </TableCell>
                      <TableCell className="border-2 border-sky-900 text-center text-sky-900 w-[1%]">
                        {item.qtdSubGrupos.toString()}
                      </TableCell>
                      <TableCell className="border-2 border-sky-900 w-[10%]">
                        <div className="flex gap-1 justify-center text-sky-800">
                          <Button
                            onClick={() => handleEditGrupo(item.id)}
                            className="h-8 w-8"
                            size="icon"
                            variant="ghost"
                          >
                            <FileEditIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            onClick={() => handleDeleteGrupo(item.id)} 
                            className="h-8 w-8" 
                            size="icon" 
                            variant="ghost"
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
    </div>
  );
}


//setAtualizaGruposEdicao={setAtualizaGruposEdicao}

  // const [listGrupos, setListaGrupos] = useState<tyGrupoLista[]>(dados);
  // const [atualisaGruposEdicao, setAtualizaGruposEdicao] = useState(true);

    // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await retGrupos();
  //       setListaGrupos(result);
  //     } catch (error) {
  //       console.error("Erro ao buscar dados:", error);
  //     }
  //   };
  //   if (setAtualizaGruposEdicao) {
  //     fetchData();
  //     setAtualizaGruposEdicao(false);
  //     setIsEdita(false);
  //   }
  // }, [atualisaGruposEdicao]);

  //import { useState } from 'react';

// interface Props {
//   dados: tyGrupoLista[];
// }

//{ dados }: Props


  // const [grupo, setGrupo] = useState<Grupo>();
  // const [subGrupos, setSubGrupos] = useState<SubGrupo[]>([]);