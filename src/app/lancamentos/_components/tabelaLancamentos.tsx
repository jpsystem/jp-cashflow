"use client";

import "react-datepicker/dist/react-datepicker.css";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Replace, Trash2 } from "lucide-react";
import { useLancamentoContext } from "./contextLancamentoProvider";
import { useGlobalContext } from "@/app/contextGlobal";
import { tyLancamento } from "@/types/types";
import { DoubleToRealBR } from "@/lib/formatacoes";
import { format }  from "date-fns";
import { ptBR } from 'date-fns/locale';
import { DeleteLancamentos } from "@/actions/lancamentoActions";
import { useState } from "react";
import queryClient from "@/lib/reactQuery";
import ConfirmationBox from "@/app/_components/confirmationBox";
import { FileEditIcon, TrashIcon } from "@/app/_components/iconsForm"
import EditaLancamentoForm from "./editaLancamento";

export default function TabelaLancamentos() {
  //const {dados} = useLancamentoContext();
  const {periodoId } = useGlobalContext();
  const { dados, setFormGrupoId, setFormSubGrupoId,
          setFormFonteIdO, setFormFonteIdD,
          setOperacao
} = useLancamentoContext();

  //Variavel para a caixa de confirmação (ConfirmationBox)
  const [showConfirmation, setShowConfirmation] = useState(false);

  //Variaveis para setar o indice selecionado
  const [indice, setIndice] = useState(0);
  const [pItem, setPItem]=useState<tyLancamento>();

    //Variaveis para ativar o forme (EditaGrupoForm)
    const [isEdita, setIsEdita] = useState(false);
  //Função para cofirmar a exclusão
  const handleConfirm= async ()=>{
    await DeleteLancamentos(indice);
    //Limpar o cache da consulta para atualizar os dados
    queryClient.refetchQueries(["lancamentos", periodoId]);

    //fecha caixa de confirmação
    setShowConfirmation(false);
  };

  //Função para cancelar a exclusão
  const handleCancel=()=>{
    //fecha caixa de confirmação
    setShowConfirmation(false);
  };

  // Função para excluir um item da lista
  const handleDeleteLancamentos = async (index: number) => {
    setIndice(index);
    setShowConfirmation(true)
  }

  const handleEditLancamento = async (index: number, item: tyLancamento) => {
    setFormGrupoId(item.grupoId || 0)
    setFormSubGrupoId(item.subGrupoId || 0)
    setFormFonteIdO(item.fonteId || 0)
    setFormFonteIdD(item.fonteIdD)
    setOperacao(item.operacao || "") 
    setIndice(index);
    setPItem(item)
    setIsEdita(true);
  };

  return (
    <div className="p-1">
      { showConfirmation && (
          <ConfirmationBox
            title="Confirmação!"
            menssage="Essa ação vai excluir o lançamento. Tem certeza de que deseja continuar?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )
      } 
      <div className="overflow-x-auto mt-4 mb-10">
        {/* <h1 className="text-2xl font-bold mb-4 text-sky-900">Lançamentos</h1> */}
        {isEdita && (
            <EditaLancamentoForm
              pIndice={indice}
              pItem={pItem}
              isEdita={isEdita}
              setIsEdita={setIsEdita}
            />
        )} 
        <Table className="min-w-[1300px] overflow-auto rounded-2xl p-8 border-sky-800 border-2 shadow">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-2 w-[10%] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Conta
              </TableHead>
              <TableHead className="text-center border-2 w-[15%] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Sub Conta
              </TableHead>
              <TableHead className="text-center border-2 w-[30%] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Descrição
              </TableHead>
              <TableHead className="text-center border-2 w-[10%] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Valor
              </TableHead>
              <TableHead className="text-center border-2 w-[15%] min-w-[200px] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Fonte
              </TableHead>
              <TableHead className="text-center border-2 w-[10%] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Data
              </TableHead>
              <TableHead className="text-center border-2 w-[10%] min-w-[100px] text-sky-50 border-sky-700 bg-sky-900 text-lg">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {dados.map((item: tyLancamento, index: number) => (
            <TableRow className="hover:bg-slate-200" key={item.lancamentoId}>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900 text-lg">{item.grupo}</TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900 text-lg">{item.subGrupo}</TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900 text-lg">{item.descricao}</TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900 text-lg">{DoubleToRealBR(item.valor || 0)}</TableCell>
              <TableCell className="text-center border-2 whitespace-pre-wrap text-sky-800 border-sky-900 text-lg">{item.fontes}</TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900 text-lg">
                {format(item.dtLancamento || new Date(), 'dd/MM', { locale: ptBR }) }
              </TableCell>
              <TableCell className="text-center border-2 text-sky-800 border-sky-900">
              <div className="flex px-2 justify-between text-sky-800">
                <Button 
                  onClick={() => handleEditLancamento(item.lancamentoId || 0, item)}
                  className="h-8 w-8" 
                  size="icon" 
                  variant="ghost"
                >
                  <FileEditIcon className="h-6 w-6" />
                </Button>
                <Button 
                  onClick={() => handleDeleteLancamentos(item.lancamentoId || 0)} 
                  className="h-8 w-8" 
                  size="icon"                
                  variant="ghost"
                >
                  <TrashIcon className="h-6 w-6 text-red-700"/>
                </Button>
              </div>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

