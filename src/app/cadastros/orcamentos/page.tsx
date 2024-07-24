"use client";

import TabelaOrcamento from "./_components/tabelaOrcamento";
import FormOrcamento from "./_components/OrcamentoForm";

export default function Orcamento() {
  return (
    <div className="flex flex-col min-h-[70vh] items-start px-4 pt-0 pb-4 md:justify-center">
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-sky-900 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
          Orçamento
        </h1>
        <p className="text-sky-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
          Elaboração de orçamentos no período
        </p>
        <div className="flex w-full justify-end">
          <FormOrcamento />
        </div>
        <div>
          <TabelaOrcamento />
        </div>
      </div>
    </div>
  );
}
