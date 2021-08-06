import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import User from "../../src/entities/User";
import Session from "../../src/entities/Session";
import { v4 as uuidv4 } from 'uuid';
import {getConnection} from "typeorm";


export async function createUser(createSession?: boolean) {
    const user = {
        email: "email@email.com",
        password: "123456"             
    };

    const newUser = {
        email: user.email,
        password: bcrypt.hashSync(user.password, 10)
    }

    const token = uuidv4();

    const result = await getRepository(User).insert(newUser);
    const { id } = result.generatedMaps[0];      
    return { ...user, id } 
}

export async function createNewUser(password?: string) {
    const user = {
        email: "email@email.com",
        password
    };

    const newUser = await getRepository(User).save({       
        email: user.email,
        password: bcrypt.hashSync(user.password, 10)
    });

    return newUser;
}


export async function getAll() {
    return await getRepository(User).find();
}

export async function createSession(userId: number) {
    const session = {
        userId,
        token: "1234567890"
    };

    console.log(userId)

    await getRepository(Session).save({
        token: session.token,
        userId: userId
    });

    return session;
}

export async function getUserToken(userId: number) {
    const sessionRepository = getRepository(Session);
    const session = await sessionRepository.findOne({ where: { userId }, relations: ["user"]});   
    
    console.log(session.token);
    return session.token;
}

