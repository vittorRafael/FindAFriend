import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { GetPetDetailsServices } from "./get-pet-details";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: GetPetDetailsServices;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetDetailsServices(petsRepository);
  });

  it("should be able to get pet details", async () => {
    const createdPet = await petsRepository.create({
      id: "pet-1",
      name: "Bob",
      about: "the dog is very happy and sleeper",
      age: "Filhote",
      size: "Pequenino",
      energy_level: "Moderado",
      environment: "Amplo",
      org_id: "orgId-1",
    });

    const { pet } = await sut.execute({
      petId: createdPet.id,
    });

    expect(pet.name).toEqual("Bob");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        petId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
