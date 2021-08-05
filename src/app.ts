import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

// app.post("/sign-in", userController.signIn);

// app.get("/pokemons", authMiddleware, userController.getUsers);

// app.post("/my-pokemons/:id/add", authMiddleware, userController.getUsers);

// app.post("/my-pokemons/:id/remove", authMiddleware, userController.getUsers);


export async function init () {
  await connectDatabase();
}

export default app;
