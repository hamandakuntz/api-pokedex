import { Request, Response } from "express";

import * as pokemonsService from "../services/pokemonsService";

export async function getPokemon (req: Request, res: Response) {
  try {
    const pokemon = await pokemonsService.getPokemon();
    res.send(pokemon);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
