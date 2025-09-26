import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import User from "../models/User.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // clear DB between tests
  await User.deleteMany({});
});

describe("Auth: register", () => {
  test("should register a new user and return token (201)", async () => {
    const payload = { username: "testuser", password: "password123", email: "t@x.com" };
    const res = await request(app).post("/api/auth/register").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user.username).toBe("testuser");
  });

  test("should not allow duplicate username", async () => {
    const payload = { username: "testuser", password: "password123" };
    await request(app).post("/api/auth/register").send(payload);
    const res = await request(app).post("/api/auth/register").send(payload);
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("error");
  });

  test("should return 400 when missing fields", async () => {
    const res = await request(app).post("/api/auth/register").send({ username: "x" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
