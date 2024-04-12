/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Grupo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Grupo_nome_key" ON "Grupo"("nome");
