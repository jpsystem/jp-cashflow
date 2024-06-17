/*
  Warnings:

  - You are about to drop the column `userId` on the `Grupo` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Fonte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'M'
);

-- CreateTable
CREATE TABLE "Periodo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "periodo" TEXT NOT NULL,
    "dtAtualizacao" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'A'
);

-- CreateTable
CREATE TABLE "Saldo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "periodo" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL DEFAULT 0.00
);

-- CreateTable
CREATE TABLE "Lancamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "periodo" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL DEFAULT 0.00,
    "dtLancamento" DATETIME,
    "operacao" TEXT NOT NULL DEFAULT 'D',
    "subGrupoId" INTEGER NOT NULL,
    "fonteId" INTEGER NOT NULL,
    CONSTRAINT "Lancamento_subGrupoId_fkey" FOREIGN KEY ("subGrupoId") REFERENCES "SubGrupo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamento_fonteId_fkey" FOREIGN KEY ("fonteId") REFERENCES "Fonte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Grupo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'D'
);
INSERT INTO "new_Grupo" ("descricao", "id", "nome", "tipo") SELECT "descricao", "id", "nome", "tipo" FROM "Grupo";
DROP TABLE "Grupo";
ALTER TABLE "new_Grupo" RENAME TO "Grupo";
CREATE UNIQUE INDEX "Grupo_nome_key" ON "Grupo"("nome");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
