import {MigrationInterface, QueryRunner} from "typeorm";

export class someRelations1622158525226 implements MigrationInterface {
    name = 'someRelations1622158525226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `customerId` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_6c687a8fa35b0ae35ce766b56c` (`customerId`)");
        await queryRunner.query("ALTER TABLE `product` CHANGE `createdAt` `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `product` CHANGE `updatedAt` `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user` CHANGE `createdAt` `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user` CHANGE `updatedAt` `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `customer` CHANGE `createdAt` `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `customer` CHANGE `updatedAt` `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_6c687a8fa35b0ae35ce766b56c` ON `user` (`customerId`)");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_6c687a8fa35b0ae35ce766b56ce` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_6c687a8fa35b0ae35ce766b56ce`");
        await queryRunner.query("DROP INDEX `REL_6c687a8fa35b0ae35ce766b56c` ON `user`");
        await queryRunner.query("ALTER TABLE `customer` CHANGE `updatedAt` `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `customer` CHANGE `createdAt` `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user` CHANGE `updatedAt` `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user` CHANGE `createdAt` `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `product` CHANGE `updatedAt` `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `product` CHANGE `createdAt` `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_6c687a8fa35b0ae35ce766b56c`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `customerId`");
    }

}
