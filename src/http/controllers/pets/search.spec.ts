import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticate } from "@/utils/test/create-and-authenticate";

describe("Search pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to search pets", async () => {
    const { token } = await createAndAuthenticate(app);
    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Bob",
        about: "the dog is very happy and sleeper",
        age: "Filhote",
        size: "Pequenino",
        energy_level: "Moderado",
        environment: "Amplo",
      });
    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Mel",
        about: "the dog is very happy and sleeper",
        age: "Filhote",
        size: "Pequenino",
        energy_level: "Moderado",
        environment: "Amplo",
      });

    const response = await request(app.server)
      .get("/pets/search")
      .query({ city: "Chorozinho" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: "Bob" }),
      expect.objectContaining({ name: "Mel" }),
    ]);
  });
});
