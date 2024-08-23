/*
  Warnings:

  - Made the column `dtLancamento` on table `Lancamento` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Lancamento` MODIFY `dtLancamento` DATE NOT NULL;

-- AlterTable
ALTER TABLE `Periodo` MODIFY `dtAtualizacao` DATE NOT NULL;
