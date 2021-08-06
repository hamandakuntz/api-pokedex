import { getRepository } from "typeorm";
import Pokemon from "../../src/entities/Pokemon";

export async function createAPokemon() {
    const pokemonRepository = getRepository(Pokemon);

    const pokemon = {
        id: 1,
        name: "Pikachu",
        number: 1,
        image: "testimage",
        weight: 1,
        height: 1,
        baseExp: 1,
        description: "testing description",
    };
    
    return await pokemonRepository.save(pokemon);    
}

export async function getAll() {
    return await getRepository(Pokemon).find();
}