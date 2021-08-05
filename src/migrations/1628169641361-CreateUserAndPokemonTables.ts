import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserAndPokemonTables1628169641361 implements MigrationInterface {
    name = 'CreateUserAndPokemonTables1628169641361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" character varying NOT NULL, "height" character varying NOT NULL, "baseExp" character varying NOT NULL, "description" character varying NOT NULL, "inMyPokemons" boolean NOT NULL, CONSTRAINT "PK_0b503db1369f46c43f8da0a6a0a" PRIMARY KEY ("id"))`);        
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_f8d562bb40e7351e55536e2941d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_f8d562bb40e7351e55536e2941d"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
