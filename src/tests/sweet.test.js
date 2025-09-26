import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // create a test user directly in DB
  const hashed = await bcrypt.hash("password123", 10);
  const user = new User({ username: "sweetadmin", password: hashed });
  await user.save();

  token = jwt.sign({ id: user._id, username: user.username }, "test_secret");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe("Sweets API", () => {
  test("should not allow unauthenticated user to add sweet", async () => {
    const res = await request(app).post("/api/sweets").send({
      name: "Ladoo",
      category: "Indian",
      price: 20,
      quantity: 50,
    });

    expect(res.status).toBe(401);
  });

  test("should allow authenticated user to add sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 20,
        quantity: 50,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Ladoo");
  });

  test("should require all fields to add sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "IncompleteSweet" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});


//for search
describe("Sweets API - Search", () => {
  beforeEach(async () => {
    // Add some sweets
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Ladoo", category: "Indian", price: 20, quantity: 50 });

    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Barfi", category: "Indian", price: 30, quantity: 25 });

    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Chocolate", category: "Western", price: 50, quantity: 10 });
  });

  test("should filter sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=Ladoo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Ladoo");
  });

  test("should filter sweets by category", async () => {
    const res = await request(app)
      .get("/api/sweets/search?category=Indian")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test("should filter sweets by price range", async () => {
    const res = await request(app)
      .get("/api/sweets/search?minPrice=25&maxPrice=60")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test("should return empty array when no match found", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=Nonexistent")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  test("should require authentication for search", async () => {
    const res = await request(app).get("/api/sweets/search?name=Ladoo");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});

