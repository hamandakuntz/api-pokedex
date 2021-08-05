import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterSessionTable1628171873685 implements MigrationInterface {
    name = 'AlterSessionTable1628171873685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "token" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "email" character varying NOT NULL`);
    }

}
