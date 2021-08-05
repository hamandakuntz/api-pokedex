import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterPokemonTable1628198567439 implements MigrationInterface {
    name = 'AlterPokemonTable1628198567439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "inMyPokemons"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_f8d562bb40e7351e55536e2941d"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "weight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "height" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "baseExp"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "baseExp" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemon" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_f8d562bb40e7351e55536e2941d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_f8d562bb40e7351e55536e2941d"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "baseExp"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "baseExp" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "height" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "weight" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_f8d562bb40e7351e55536e2941d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "inMyPokemons" boolean NOT NULL`);
    }

}
