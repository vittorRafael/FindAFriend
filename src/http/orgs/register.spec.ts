import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to register", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: "Animal Foundation",
      author_name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      cep: "62875000",
      state: "CE",
      city: "Chorozinho",
      neighborhood: "Triângulo",
      street: "Rua 1 de maio, 18",
      whatsapp: "85 9 9199-9999",
      latitude: -4.334747,
      longitude: -38.4744777,
    });


    expect(response.statusCode).toEqual(201);
  });
});
