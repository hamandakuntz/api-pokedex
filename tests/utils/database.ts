import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";
import Pokemon from "../../src/entities/Pokemon";
import UserPokemons from "../../src/entities/UserPokemons";

export async function clearDatabase () {
  await getRepository(UserPokemons).delete({});
  await getRepository(Session).delete({});
  await getRepository(User).delete({});  
  await getRepository(Pokemon).delete({}); 
}
