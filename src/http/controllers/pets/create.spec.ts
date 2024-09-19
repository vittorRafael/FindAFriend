import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticate } from "@/utils/test/create-and-authenticate";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to create a pet", async () => {
    const { token, orgId } = await createAndAuthenticate(app);
    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Bob",
        about: "the dog is very happy and sleeper",
        age: "Filhote",
        size: "Pequenino",
        energy_level: "Moderado",
        environment: "Amplo",
        orgId,
      });
    console.log(response.body);

    expect(response.statusCode).toEqual(201);
  });
});
