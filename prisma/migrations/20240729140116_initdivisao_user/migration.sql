/*
  Warnings:

  - A unique constraint covering the columns `[nome,userId]` on the table `Fonte` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome,userId]` on the table `Grupo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[periodo,userId]` on the table `Periodo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Fonte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Grupo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Periodo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Fonte` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Grupo` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Periodo` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Fonte_nome_userId_key` ON `Fonte`(`nome`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Grupo_nome_userId_key` ON `Grupo`(`nome`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Periodo_periodo_userId_key` ON `Periodo`(`periodo`, `userId`);

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fonte` ADD CONSTRAINT `Fonte_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Periodo` ADD CONSTRAINT `Periodo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
