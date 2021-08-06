import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserPokemonsAndAlterRelationsOfTablesUsersAndPokemon1628262408659 implements MigrationInterface {
    name = 'CreateUserPokemonsAndAlterRelationsOfTablesUsersAndPokemon1628262408659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_f8d562bb40e7351e55536e2941d"`);
        await queryRunner.query(`CREATE TABLE "userPokemons" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_e3dfc348f178e7a8c17b68734bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "userPokemons" ADD CONSTRAINT "FK_7df3d612d515a0c8dd416337493" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userPokemons" ADD CONSTRAINT "FK_adba93fee6560e93ff084514b89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userPokemons" DROP CONSTRAINT "FK_adba93fee6560e93ff084514b89"`);
        await queryRunner.query(`ALTER TABLE "userPokemons" DROP CONSTRAINT "FK_7df3d612d515a0c8dd416337493"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "userId" integer`);
        await queryRunner.query(`DROP TABLE "userPokemons"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_f8d562bb40e7351e55536e2941d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
