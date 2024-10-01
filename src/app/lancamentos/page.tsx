import TabelaLancamentos from "../lancamentos/_components/tabelaLancamentos";
import LancamentosForm from "../lancamentos/_components/LancamentosForm";
import { LancamentoProvider } from "./_components/contextLancamentoProvider";
import PainelFiltros from "./_components/painelFiltros";
import ExportaTabela from "./_components/exportarTabela";
import ExportaTabelaModelo from "./_components/exportaTabelaModelo";

export default async function LancamentosPage() {
  return (
    <LancamentoProvider>
      <div className="overflow-x-auto min-w-screen w-[90%] min-h-screen max-w-[1400px] min-w-[500px]">
        <div className="justify-items-center flex flex-col md:justify-center md:px-6 md:gap-5">
          <div className="flex flex-col w-full gap-4">
            <h1 className="text-2xl font-bold tracking-tighter text-center text-sky-900">
              Grupos de Lançamentos
            </h1>
            <p className="mb-6 text-sky-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
              Gerenciar os lançamentos para o controle financeiro
            </p>
          </div>
        </div>
        <PainelFiltros />
        {/* <div className="flex-row flex  justify-between mt-6">
          <div className="justify-items-center flex justify-end content-center">
            <ExportaTabelaModelo/>
          </div>
          <div className="justify-items-center flex justify-end content-center">
            <LancamentosForm />
          </div>
        </div> */}
        <div className="items-center">
          <TabelaLancamentos />
        </div>
      </div>
    </LancamentoProvider>
  );
}
