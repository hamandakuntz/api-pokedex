import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import * as pokemonFactory from "../factories/pokemonFactory";
import * as userFactory from "../factories/userFactory";
import { clearDatabase } from "../utils/database";


const test = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();  
});

afterAll(async () => {
  await getConnection().close();
});


describe("get /pokemons", () => {
    it("should answer status 200 and an array with all pokemons when a valid token is sent", async () => {
      const user = await userFactory.createNewUser("123456");
      const session = await userFactory.createSession(user.id);
      console.log(user.id);
      const pokemon = await pokemonFactory.createAPokemon();
      const result = await test.get("/pokemons").set("Authorization", `Bearer ${session.token}`);
      
      expect(result.body[0]).toStrictEqual({ ...pokemon, "inMyPokemons": false });
      expect(result.status).toBe(200);
    });

    it("should answer with status 401 for a invalid authorization", async () => {
      const noHeaderAuthorization = await test.get("/pokemons");
      const invalidToken = await test.get("/pokemons").set("Authorization", `Bearer invalidToken`);;

      expect(noHeaderAuthorization.status).toBe(401);
      expect(invalidToken.status).toBe(401);
  });
});