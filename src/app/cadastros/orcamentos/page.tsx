'use client'

export default function Orcamento() {
  return (
    <div className="flex flex-col min-h-[80vh] items-start gap-4 px-4 pb-4 md:justify-center md:px-6 md:gap-5">
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full justify-center">
          <h1 className="text-sky-900 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
            Orçamento
          </h1>
          <p className="text-sky-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
            Para controlar seus gastos
          </p>
        </div>
        <div className="flex w-full justify-end">     
        </div>
      </div>
      
    </div>
  )
}
