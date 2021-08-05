import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterPokemonTableAgain1628205281785 implements MigrationInterface {
    name = 'AlterPokemonTableAgain1628205281785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "inMyPokemons" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "inMyPokemons"`);
    }

}
