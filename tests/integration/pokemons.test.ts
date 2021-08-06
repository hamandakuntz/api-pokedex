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
      const user = await userFactory.createNewUser("1234");
      const session = await userFactory.createSession(user.id);
      const pokemon = await pokemonFactory.createAPokemon();
      const result = await test.get("/pokemons").set("Authorization", `Bearer ${session.token}`);
      
      expect(result.body[0]).toStrictEqual({ ...pokemon, "inMyPokemons": false });
      expect(result.status).toBe(200);
    });

    it("should answer with status 401 for a invalid authorization", async () => {
      const noHeaderAuthorization = await test.get("/pokemons");
      const wrongToken = await test.get("/pokemons").set("Authorization", `Bearer wrongToken`);;

      expect(noHeaderAuthorization.status).toBe(401);
      expect(wrongToken.status).toBe(401);
  });
});

describe("POST /my-pokemons/:pokemonId/add", () => {
  it("should answer with status 401 for an invalid authorization", async () => {
      const newPokemon = await pokemonFactory.createAPokemon();
      const noHeaderAuthorization = await test.post(`/my-pokemons/${newPokemon.id}/add`);
      const wrongToken = await test.post(`/my-pokemons/${newPokemon.id}/add`).set("Authorization", `Bearer wrongToken`);

      expect(noHeaderAuthorization.status).toBe(401);
      expect(wrongToken.status).toBe(401);
  });

  it("should answer with status 200 for a successful added pokemon", async () => {
      const user = await userFactory.createNewUser("1234");
      const session = await userFactory.createSession(user.id);
      const pokemon = await pokemonFactory.createAPokemon();
      const addPokemon = await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${session.token}`);

      expect(addPokemon.status).toBe(200);
  });

  it("should answer with status 409 for a duplicate pokemon added", async () => {
    const user = await userFactory.createNewUser("1234");
    const session = await userFactory.createSession(user.id);
    const pokemon = await pokemonFactory.createAPokemon();
    const addPokemon = await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${session.token}`);
    const addTheSamePokemon = await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${session.token}`);

    expect(addTheSamePokemon.status).toBe(409);
});
});

describe("POST /my-pokemons/:pokemonId/remove", () => {

  it("should answer with status 401 for an invalid authorization", async () => {
      const pokemon = await pokemonFactory.createAPokemon();
      const noHeaderAuthorization = await test.post(`/my-pokemons/${pokemon.id}/remove`);
      const wrongToken = await test.post(`/my-pokemons/${pokemon.id}/remove`).set("Authorization", `Bearer wrongToken`);

      expect(noHeaderAuthorization.status).toBe(401);
      expect(wrongToken.status).toBe(401);
  });

  it("should answer with status 200 for a sucessfull removed pokemon", async () => {
      const user = await userFactory.createNewUser("1234");
      const session = await userFactory.createSession(user.id);
      const pokemon = await pokemonFactory.createAPokemon();
      await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${session.token}`);
      const addPokemon = await test.post(`/my-pokemons/${pokemon.id}/remove`).set("Authorization", `Bearer ${session.token}`);
    
      expect(addPokemon.status).toBe(200);
  });

  it("should answer with status 404 for a non existing pokemon in userPokemons list", async () => {
    const user = await userFactory.createNewUser("1234");
    const session = await userFactory.createSession(user.id);
    const pokemon = await pokemonFactory.createAPokemon();
    await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${session.token}`);
    const addPokemon = await test.post(`/my-pokemons/${pokemon.id}/remove`).set("Authorization", `Bearer ${session.token}`);
    const addTheSamePokemon = await test.post(`/my-pokemons/${pokemon.id}/remove`).set("Authorization", `Bearer ${session.token}`);

    expect(addTheSamePokemon.status).toBe(404);
  });
});