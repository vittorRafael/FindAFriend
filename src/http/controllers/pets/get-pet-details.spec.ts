import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticate } from "@/utils/test/create-and-authenticate";
import { prisma } from "@/lib/prisma";

describe("Pet Details (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get pet details", async () => {
    const { token } = await createAndAuthenticate(app);
    const org = await prisma.org.findFirstOrThrow();
    const pet = await prisma.pet.create({
      data: {
        name: "Bob",
        about: "the dog is very happy and sleeper",
        age: "Filhote",
        size: "Pequenino",
        energy_level: "Moderado",
        environment: "Amplo",
        org_id: org.id,
      },
    });

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(expect.objectContaining({ name: "Bob" }));
  });
});
