import TabelaLancamentos from "../lancamentos/_components/tabelaLancamentos"
import LancamentosForm from "../lancamentos/_components/LancamentosForm"

export default async function LancamentosPage() {
  return (
    <div>
      <div className="flex flex-col min-h-[80] items-start gap-4 px-4 pb-4 md:justify-center md:px-6 md:gap-5">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full justify-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              Grupos de contas
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
              Gerenciar o plano de contas para o controle financeiro
            </p>
          </div>
          <div className="flex w-full justify-end md:flex-1 ">
            <LancamentosForm />
          </div>
          <div></div>
        </div>
        <div className="md:flex-1 flex w-full">
          <TabelaLancamentos />
        </div>
      </div>
    </div>
  )
}
