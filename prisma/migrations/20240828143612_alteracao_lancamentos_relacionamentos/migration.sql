-- AddForeignKey
ALTER TABLE `Lancamento` ADD CONSTRAINT `Lancamento_fonteIdD_fkey` FOREIGN KEY (`fonteIdD`) REFERENCES `Fonte`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
