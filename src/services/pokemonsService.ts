import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import UserPokemons from "../entities/UserPokemons";
import { getConnection } from "typeorm";

export async function getPokemon (userId: number) {
  const pokemon = await getRepository(Pokemon).find();
  const userPokemons = await getRepository(UserPokemons).find({ where: { userId } });
  const listOfUserPokemons = pokemon.map(p => { userPokemons.forEach(up => { if (p.id === up.pokemonId) {
    p.inMyPokemons = true
  } 
 
  })
    return p 
  });

  return listOfUserPokemons;
}

export async function addToMyPokemons (userId: number, pokemonId: number) {
  const userPokemons = await getRepository(UserPokemons).find({ where: { userId } });
  const listOfUserPokemonsId = userPokemons.map(p => p.pokemonId);

  if (!listOfUserPokemonsId.includes(pokemonId)) {
    await getRepository(UserPokemons).save({ userId, pokemonId });   
    return 200;
  }
  return 409;
}

export async function deleteOfMyPokemons(userId: number, pokemonId: number) {
  const relation = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(UserPokemons)
    .where("userId = :userId AND pokemonId = :pokemonId", { userId, pokemonId })
    .execute();
  
  if (relation) {   
    return 200;
  }  
  return 404;
}

