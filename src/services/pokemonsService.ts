import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import UserPokemons from "../entities/UserPokemons";
import { getConnection } from "typeorm";


export async function getPokemon () {
  const pokemon = await getRepository(Pokemon).find();  
  return pokemon;
}

export async function addToMyPokemons (userId: number, pokemonId: number) {
  const userPokemons = await getRepository(UserPokemons).find({ where: { userId } });
  const listOfUserPokemonsId = userPokemons.map(p => p.pokemonId);

  if (!listOfUserPokemonsId.includes(pokemonId)) {
    await getRepository(UserPokemons).save({ userId, pokemonId });

      await getConnection()
      .createQueryBuilder()
      .update(Pokemon)
      .set({ inMyPokemons: true })
      .where("id = :id", { id: pokemonId })
      .execute();

    return 200;
  }
  return 409;
}

export async function deleteOfMyPokemons(userId: number, pokemonId: number) {
  const relation = await getRepository(UserPokemons).findOne({ where: { userId, pokemonId } });
  
  if (relation) {
    await getRepository(UserPokemons).remove(relation);
    await getConnection()
      .createQueryBuilder()
      .update(Pokemon)
      .set({ inMyPokemons: false })
      .where("id = :id", { id: pokemonId })
      .execute();
    return 200;
  }  
  return 404;
}

