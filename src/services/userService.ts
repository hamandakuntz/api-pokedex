import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import User from "../entities/User";
import Session from "../entities/Session";
import { v4 as uuidv4 } from 'uuid';

interface validateParams {
  email: string;
  password: string; 
  confirmPassword: string;
}

export async function validateSession(token: string) {
  const sessionRepository = getRepository(Session);
  const session = await sessionRepository.findOne({ where: { token }, relations: ["user"]});

  if(!session) {
    return null;
  } else {
    return session.user;
  }
}


export async function getUserByEmail(email: string) {
  const checkEmail = await getRepository(User).findOne({
    where: { email }
  });
  return checkEmail;
}

export async function createUser(params: validateParams) {
  const repository = getRepository(User);
    const hashedPassword = bcrypt.hashSync(params.password, 10);
    const email = params.email;    
    await repository.insert({ email, password: hashedPassword}) 
}


export async function signIn(email: string, password: string): Promise<string> {
  const userRepository = getRepository(User);
  const sessionRepository = getRepository(Session);

  const user = await userRepository.findOne({ email });

  if(!user) {
    return null;
  }

  if(bcrypt.compareSync(password, user.password)) {
    const token = uuidv4();
    await sessionRepository.insert({ userId: user.id, token})
    return token;
  } else {
    return null;
  }
}
