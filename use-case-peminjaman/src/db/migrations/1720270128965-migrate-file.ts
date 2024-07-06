import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateFile1720270128965 implements MigrationInterface {
    name = 'MigrateFile1720270128965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`borrowed\` DROP COLUMN \`members_id\``);
        await queryRunner.query(`ALTER TABLE \`borrowed\` ADD \`members_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`borrowed\` DROP COLUMN \`books_id\``);
        await queryRunner.query(`ALTER TABLE \`borrowed\` ADD \`books_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`borrowed\` ADD CONSTRAINT \`FK_0dc660325fbc8c104ca179cd720\` FOREIGN KEY (\`members_id\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`borrowed\` ADD CONSTRAINT \`FK_01047184a37de804d08725858ba\` FOREIGN KEY (\`books_id\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`borrowed\` DROP FOREIGN KEY \`FK_01047184a37de804d08725858ba\``);
        await queryRunner.query(`ALTER TABLE \`borrowed\` DROP FOREIGN KEY \`FK_0dc660325fbc8c104ca179cd720\``);
        await queryRunner.query(`ALTER TABLE \`borrowed\` DROP COLUMN \`books_id\``);
        await queryRunner.query(`ALTER TABLE \`borrowed\` ADD \`books_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`borrowed\` DROP COLUMN \`members_id\``);
        await queryRunner.query(`ALTER TABLE \`borrowed\` ADD \`members_id\` int NOT NULL`);
    }

}
