import { getServerSession } from "next-auth"
import { auth as authOptions } from "@/lib/auth-config"
// import { AppProvider } from "./_components/contextProvider";
import PainelControle from "./_components/painelControle";
import TabelaSaldo from "./_components/tabelaSaldos";

export default async function Saldo() {
  //Carregar variavei de secao
  const session = await getServerSession(authOptions)

  return (
    <div>
      <div className="flex flex-col mb-6 min-h-[70vh] w-full max-w-[1400px] min-w-[500px] items-start px-4 pt-0 pb-4">
        <div className="flex flex-col w-full gap-4">
          <h1 className="text-sky-900 text-2xl font-bold tracking-tighter text-center">
            Saldo
          </h1>
          <p className="text-sky-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
            Elaboração de saldos no período.
          </p>
          <div className="flex w-full justify-end">
            <PainelControle/>
          </div>
          <div>
            <TabelaSaldo />
          </div>
        </div>
      </div>
    </div>
  );
}
