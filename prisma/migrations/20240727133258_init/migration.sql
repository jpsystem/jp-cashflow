-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(60) NOT NULL,
    `nome` VARCHAR(60) NOT NULL,
    `senha` VARCHAR(20) NOT NULL,
    `perfil` VARCHAR(20) NOT NULL DEFAULT 'default',
    `login` VARCHAR(20) NOT NULL,
    `token` VARCHAR(100) NULL,
    `dtToken` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `descricao` VARCHAR(100) NULL,
    `tipo` VARCHAR(5) NOT NULL DEFAULT 'D',
    `ativo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Grupo_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubGrupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `descricao` VARCHAR(100) NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `grupoId` INTEGER NOT NULL,

    UNIQUE INDEX `SubGrupo_nome_grupoId_key`(`nome`, `grupoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fonte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `descricao` VARCHAR(100) NULL,
    `tipo` VARCHAR(5) NOT NULL DEFAULT 'M',
    `ativo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Fonte_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `periodo` VARCHAR(191) NOT NULL,
    `dtAtualizacao` DATETIME(3) NOT NULL,
    `status` VARCHAR(5) NOT NULL DEFAULT 'A',

    UNIQUE INDEX `Periodo_periodo_key`(`periodo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saldo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `fonteId` INTEGER NOT NULL,
    `periodoId` INTEGER NOT NULL,

    UNIQUE INDEX `Saldo_periodoId_fonteId_key`(`periodoId`, `fonteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lancamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `periodo` VARCHAR(15) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `dtLancamento` DATETIME(3) NULL,
    `operacao` VARCHAR(5) NOT NULL DEFAULT 'D',
    `subGrupoId` INTEGER NOT NULL,
    `fonteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orcamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `grupoId` INTEGER NOT NULL,
    `periodoId` INTEGER NOT NULL,

    UNIQUE INDEX `Orcamento_periodoId_grupoId_key`(`periodoId`, `grupoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubGrupo` ADD CONSTRAINT `SubGrupo_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saldo` ADD CONSTRAINT `Saldo_fonteId_fkey` FOREIGN KEY (`fonteId`) REFERENCES `Fonte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saldo` ADD CONSTRAINT `Saldo_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `Periodo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lancamento` ADD CONSTRAINT `Lancamento_subGrupoId_fkey` FOREIGN KEY (`subGrupoId`) REFERENCES `SubGrupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lancamento` ADD CONSTRAINT `Lancamento_fonteId_fkey` FOREIGN KEY (`fonteId`) REFERENCES `Fonte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orcamento` ADD CONSTRAINT `Orcamento_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orcamento` ADD CONSTRAINT `Orcamento_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `Periodo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
