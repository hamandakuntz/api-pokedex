import { Request, Response } from "express";
import schemaValidateSignUp from "../schemas/validateSignUp";
import schemaValidateSignIn from "../schemas/validateSignIn";

import * as userService from "../services/userService";


export async function signUp (req: Request, res: Response) {
  const { error } = schemaValidateSignUp.validate(req.body);
  if (error) return res.sendStatus(400);

  const existingEmail = await userService.getUserByEmail(req.body.email);
  if (existingEmail) return res.sendStatus(409);
  
  const user = await userService.createUser(req.body);
  return res.status(201).send(user);
}

export async function signIn(req: Request, res: Response) {
  const { error } = schemaValidateSignIn.validate(req.body);
  if (error) return res.sendStatus(400);

  const { email, password } = req.body as { email: string, password: string}
  const token = await userService.signIn(email, password);
  
  if (token === null) return res.sendStatus(401);

  res.status(200).send({ token });
}