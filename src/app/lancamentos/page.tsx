import TabelaLancamentos from "../lancamentos/_components/tabelaLancamentos"
import LancamentosForm from "../lancamentos/_components/LancamentosForm"
import { LancamentoProvider } from "./_components/contextLancamentoProvider";
import PainelFiltros from "./_components/painelFiltros";

export default async function LancamentosPage() {
  return (
    <LancamentoProvider>
      <div className="overflow-x-auto min-w-screen w-[90%] min-h-screen max-w-[1400px] min-w-[500px]">
        <div className="justify-items-center flex flex-col md:justify-center md:px-6 md:gap-5">
          <div className="flex flex-col w-full gap-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-sky-900">
              Grupos de Lançamentos
            </h1>
            <p className="text-sky-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center mb-6">
              Gerenciar os lançamentos para o controle financeiro
            </p>
          </div>
        </div>
        <PainelFiltros/>
        <div className="justify-items-center flex w-full justify-end content-center mt-6">
          <LancamentosForm />
        </div>
        <div className="items-center">
          <TabelaLancamentos/>
        </div>
      </div>
    </LancamentoProvider>
  )
}
