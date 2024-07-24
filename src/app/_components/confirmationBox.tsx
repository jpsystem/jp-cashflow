"use client"

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface ConfirmationBoxProps {
  title: string;
  menssage: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationBox({title, menssage, onConfirm, onCancel}: ConfirmationBoxProps) {
  return (
    <Sheet open={true}>
      <SheetContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[590px] min-w-[400px] overflow-auto rounded-2xl bg-white p-6 shadow-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl text-sky-900">
            {title}
          </SheetTitle>
          <p>{menssage}</p>
        </SheetHeader>
        <SheetFooter>
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
  )
}