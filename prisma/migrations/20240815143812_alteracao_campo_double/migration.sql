/*
  Warnings:

  - You are about to alter the column `valor` on the `Lancamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `valor` on the `Orcamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `valor` on the `Saldo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Lancamento` MODIFY `valor` DOUBLE NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `Orcamento` MODIFY `valor` DOUBLE NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `Saldo` MODIFY `valor` DOUBLE NOT NULL DEFAULT 0.00;
