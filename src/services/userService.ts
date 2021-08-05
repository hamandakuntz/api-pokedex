import { Request, Response } from "express";
import { getRepository } from "typeorm";

import bcrypt from "bcrypt";
import User from "../entities/User";
import Session from "../entities/Session";


export async function getUsers () {
  const users = await getRepository(User).find({
    select: ["id", "email"]
  });
  
  return users;
}

export async function signIn(email: string, password: string) {

  
}

export async function signUp(email: string, password: string) {
  const repository = getRepository(User);
  const hashedPassword = bcrypt.hashSync(password, 10);

  await repository.insert({ email, password: hashedPassword})
}


// export async function validateSession(token: string) {
//   return await getRepository(Session).find(session => session.token === token);
// }