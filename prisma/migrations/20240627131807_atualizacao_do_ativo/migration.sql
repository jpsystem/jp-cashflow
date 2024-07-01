-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fonte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'M',
    "ativo" BOOLEAN NOT NULL DEFAULT true
);
--INSERT INTO "new_Fonte" ("descricao", "id", "nome", "tipo") SELECT "descricao", "id", "nome", "tipo" FROM "Fonte";
DROP TABLE "Fonte";
ALTER TABLE "new_Fonte" RENAME TO "Fonte";
CREATE TABLE "new_Grupo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'D',
    "ativo" BOOLEAN NOT NULL DEFAULT true
);
--INSERT INTO "new_Grupo" ("descricao", "id", "nome", "tipo") SELECT "descricao", "id", "nome", "tipo" FROM "Grupo";
DROP TABLE "Grupo";
ALTER TABLE "new_Grupo" RENAME TO "Grupo";
CREATE UNIQUE INDEX "Grupo_nome_key" ON "Grupo"("nome");
CREATE TABLE "new_SubGrupo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "grupoId" INTEGER NOT NULL,
    CONSTRAINT "SubGrupo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
--INSERT INTO "new_SubGrupo" ("descricao", "grupoId", "id", "nome") SELECT "descricao", "grupoId", "id", "nome" FROM "SubGrupo";
DROP TABLE "SubGrupo";
ALTER TABLE "new_SubGrupo" RENAME TO "SubGrupo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
