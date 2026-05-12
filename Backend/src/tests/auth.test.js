const request = require("supertest");
const app = require("../server"); // IMPORTANT

describe("Auth API", () => {
  it("should register user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
  });

  it("should login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});