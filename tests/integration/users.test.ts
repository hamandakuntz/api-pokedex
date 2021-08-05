import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import * as userFactory from "../factories/userFactory";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

const test = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  it("should answer status 201 for a new user created", async () => {
    const users = await userFactory.getAll();
    const result = await test.post("/sign-up").send({ email: "test@test.com", password: "1234", confirmPassword: "1234" });
    const usersAfter = await userFactory.getAll();
    expect(users.length).toBe(usersAfter.length - 1);
    expect(result.status).toBe(201);
  });

  it("should answer status 400 for a missing email at body", async () => {
    const missingEmail = await test.post("/sign-up").send({ email: "", password: "1234", confirmPassword: "1234" });
    expect(missingEmail.status).toBe(400);
  });

  it("should answer status 400 for a missing password at body", async () => {
    const missingPassword = await test.post("/sign-up").send({ email: "test@test.com", password: "", confirmPassword: "1234" });
    expect(missingPassword.status).toBe(400);
  });

  it("should answer status 400 for invalid email", async () => {
    const invalidEmail = await test.post("/sign-up").send({ email: "test", password: "1234", confirmPassword: "1234" });
    expect(invalidEmail.status).toBe(400);

  }); 

  it("should answer status 400 for a invalid confirm password", async () => {
    const invalidConfirmPassword = await test.post("/sign-up").send({ email: "test@test.com", password: "1234", confirmPassword: "1233" });
    expect(invalidConfirmPassword.status).toBe(400);
  });
});

describe("POST /sign-in", () => {
  it("should answer status 200 for a sucess created session and a token", async () => {
    const user = await userFactory.createUser();
    const result = await test.post("/sign-in").send({ email: user.email, password: user.password });
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("token");
});

  it("should answer status 401 for incorrect email", async () => {
    const user = await userFactory.createUser();
    const incorrectEmail = await test.post("/sign-in").send({ email: "vgg@test.com", password: user.password });
    expect(incorrectEmail.status).toBe(401);
  });

  it("should answer status 401 for incorrect password", async () => {
    const user = await userFactory.createUser();    
    const incorrectPassword = await test.post("/sign-in").send({ email: user.email, password: "incorrect" });
    expect(incorrectPassword.status).toBe(401);
  });

});