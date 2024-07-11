import TabelaLancamentos from "../lancamentos/_components/tabelaLancamentos"
import LancamentosForm from "../lancamentos/_components/LancamentosForm"

export default async function LancamentosPage() {
  return (
    <div className="overflow-x-auto">
      <div className="justify-items-center flex flex-col min-h-[80vh]md:justify-center md:px-6 md:gap-5 min-w-screen">
        <div className="flex flex-col w-full gap-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
            Grupos de Lançamentos
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
            Gerenciar os lançamentos para o controle financeiro
          </p>
        </div>
        <div className="justify-items-center flex w-full justify-end content-center">
          <LancamentosForm />
        </div>
      </div>
      <div className="items-center">
      <TabelaLancamentos/>
      </div>
    </div>
  )
}
