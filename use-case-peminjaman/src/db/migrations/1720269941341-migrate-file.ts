import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateFile1720269941341 implements MigrationInterface {
    name = 'MigrateFile1720269941341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`borrowed\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`members_id\` int NOT NULL, \`books_id\` int NOT NULL, \`borrow_date\` datetime NOT NULL, \`return_date\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`members\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`penalty_end_date\` datetime NOT NULL, UNIQUE INDEX \`IDX_8b08a36b59b238402b8c38d1f6\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`stock\` int NOT NULL, UNIQUE INDEX \`IDX_c19328bbdf15e7ddbea3812318\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_c19328bbdf15e7ddbea3812318\` ON \`books\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b08a36b59b238402b8c38d1f6\` ON \`members\``);
        await queryRunner.query(`DROP TABLE \`members\``);
        await queryRunner.query(`DROP TABLE \`borrowed\``);
    }

}
