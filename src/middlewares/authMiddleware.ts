import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    const token = authorization.split("Bearer ")[1];
  
    // const validSession = userService.validateSession(token);
    // if (!validSession) {
    //   return res.sendStatus(401);
    // } else {       
    //   next();
    // }
}