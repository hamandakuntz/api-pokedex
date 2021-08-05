import { Request, Response } from "express";
import schemaValidateSignUp from "../schemas/validateSignUp";

import * as userService from "../services/userService";


export async function signUp (req: Request, res: Response) {
  // const { email, password, confirmPassword} = req.body as { email: string; password: string; confirmPassword: string};
  // const params = { email, password, confirmPassword};

  const { error } = schemaValidateSignUp.validate(req.body);
  if (error) return res.sendStatus(400);
  console.log(error);
  const existingEmail = await userService.getUserByEmail(req.body.email);
  if (existingEmail) return res.sendStatus(409);
  const user = await userService.createUser(req.body);
  return res.status(201).send(user);
}
