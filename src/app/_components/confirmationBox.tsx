"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConfirmationBoxProps {
  title: string;
  menssage: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationBox({
  title,
  menssage,
  onConfirm,
  onCancel,
}: ConfirmationBoxProps) {
  // Variável de estado isOpen
  const [isOpen, setIsOpen] = useState(true);

  // Função para fechar o DIALOG
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[280px] min-w-[400px] overflow-auto rounded-2xl bg-white p-6 shadow-lg">
        <SheetClose asChild>
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-0 top-1"
          ></Button>
        </SheetClose>
        <SheetHeader>
          <SheetTitle className="text-2xl text-sky-900 pt-0 pb-1">
            {title}
          </SheetTitle>
          <p className="text-lg text-sky-700 pt-2">{menssage}</p>
        </SheetHeader>
        <SheetFooter className="pt-11 pb-0 text-sky-900">
          <Button
            variant="outline"
            className="text-lg px-2 py-1 hover:bg-slate-200 border-sky-800 border-2"
            onClick={onConfirm}
          >
            Confirmar
          </Button>
          <Button
            variant="outline"
            className="text-lg px-2 py-1 hover:bg-slate-200 border-sky-800 border-2"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
