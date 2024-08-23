/*
  Warnings:

  - You are about to drop the column `periodo` on the `Lancamento` table. All the data in the column will be lost.
  - Added the required column `periodoId` to the `Lancamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Lancamento` DROP COLUMN `periodo`,
    ADD COLUMN `periodoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Lancamento` ADD CONSTRAINT `Lancamento_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `Periodo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
