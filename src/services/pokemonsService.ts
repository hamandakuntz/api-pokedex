import { getRepository } from "typeorm";

import Pokemon from "../entities/Pokemon";

export async function getPokemon () {
  const pokemon = await getRepository(Pokemon).find();  
  return pokemon;
}
