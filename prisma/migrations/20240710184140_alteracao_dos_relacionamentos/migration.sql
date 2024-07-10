/*
  Warnings:

  - You are about to drop the column `periodo` on the `Saldo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Fonte` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[periodo]` on the table `Periodo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome,grupoId]` on the table `SubGrupo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fonteId` to the `Saldo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodoId` to the `Saldo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Saldo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" DECIMAL NOT NULL DEFAULT 0.00,
    "fonteId" INTEGER NOT NULL,
    "periodoId" INTEGER NOT NULL,
    CONSTRAINT "Saldo_fonteId_fkey" FOREIGN KEY ("fonteId") REFERENCES "Fonte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Saldo_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periodo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Saldo" ("id", "valor") SELECT "id", "valor" FROM "Saldo";
DROP TABLE "Saldo";
ALTER TABLE "new_Saldo" RENAME TO "Saldo";
CREATE UNIQUE INDEX "Saldo_periodoId_fonteId_key" ON "Saldo"("periodoId", "fonteId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Fonte_nome_key" ON "Fonte"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Periodo_periodo_key" ON "Periodo"("periodo");

-- CreateIndex
CREATE UNIQUE INDEX "SubGrupo_nome_grupoId_key" ON "SubGrupo"("nome", "grupoId");
