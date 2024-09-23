// pages/about.tsx

//import React from 'react';
//import Image from 'next/image';
import { getFusoLocal } from '@/lib/formatacoes';
import { FaReact, FaNodeJs, FaCss3Alt, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiPrisma, SiMysql } from 'react-icons/si';
import packageJson from '../../../package.json';
import { newDate } from 'react-datepicker/dist/date_utils';


export default async function About() {
  const dadosGeoolocalizacao = getFusoLocal();

  function retDataAtual(): string{
    const data = new Date();
    return data.toISOString();
  }
  return (
    <div className="overflow-x-auto min-w-screen w-[90%] min-h-screen max-w-[1400px] min-w-[500px]">
      <h1 className="text-4xl font-bold tracking-tighter text-center text-sky-900">
        Sobre JP Cash Flow
      </h1>
      <p className="mb-6 text-sky-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
        Uma aplicação para gerênciar e controlar suas contas financeiras de forma prática.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ferramentas utilizadas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <FaReact className="text-4xl mb-2 text-blue-600" />
            <span className="text-lg font-medium">React</span>
          </div>
          <div className="flex flex-col items-center">
            <SiTypescript className="text-4xl mb-2 text-blue-600" />
            <span className="text-lg font-medium">TypeScript</span>
          </div>
          <div className="flex flex-col items-center">
            <SiTailwindcss className="text-4xl mb-2 text-blue-500" />
            <span className="text-lg font-medium">Tailwind CSS</span>
          </div>
          <div className="flex flex-col items-center">
            <FaNodeJs className="text-4xl mb-2 text-green-600" />
            <span className="text-lg font-medium">Node.js</span>
          </div>
          <div className="flex flex-col items-center">
            <SiPrisma className="text-4xl mb-2 text-purple-600" />
            <span className="text-lg font-medium">Prisma</span>
          </div>
          <div className="flex flex-col items-center">
            <SiMysql className="text-4xl mb-2 text-red-600" />
            <span className="text-lg font-medium">MySQL</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCss3Alt className="text-4xl mb-2 text-blue-500" />
            <span className="text-lg font-medium">CSS</span>
          </div>
          <div className="flex flex-col items-center">
            <FaDatabase className="text-4xl mb-2 text-gray-600" />
            <span className="text-lg font-medium">Banco de Dados</span>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Geolocalização
        </h2>
        <p className="text-lg">
          Dados sobre o local de execução do sistema:<br/><br/><br/>
          DataLocal: {retDataAtual()}<br/>
          Time Zone: {dadosGeoolocalizacao.timeZone}<br/>
          Diferença de Horas: {dadosGeoolocalizacao.diferencaEmHoras}<br/><br/><br/>
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contate-me</h2>
        <p className="text-lg">
          Se você tiver alguma dúvida ou quiser conversar sobre um projeto, não hesite em entrar em contato!
        </p>
      </section>
      <section>
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-6">Sobre o Sistema</h1>
          
          <p className="text-lg mb-4">
            <strong>Nome do Sistema:</strong> {packageJson.name}
          </p>
          <p className="text-lg mb-4">
            <strong>Versão:</strong> {packageJson.version}
          </p>
          <p className="text-lg">
            Este sistema foi desenvolvido utilizando tecnologias modernas como Next.js, TypeScript, Tailwind CSS e outras ferramentas essenciais para o desenvolvimento full stack.
          </p>
        </div>
      </section>
    </div>
  );
};

