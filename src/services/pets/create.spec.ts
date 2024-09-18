import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { CreatePetServices } from "./create";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetServices;

describe("Create Pet Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreatePetServices(petsRepository, orgsRepository);
    await orgsRepository.create({
      id: "orgId-1",
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
  });
  it("should be able to create pet", async () => {
    const { pet } = await sut.execute({
      name: "Bob",
      about: "the dog is very happy and sleeper",
      age: "Filhote",
      size: "Pequenino",
      energy_level: "Moderado",
      environment: "Amplo",
      orgId: "orgId-1",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
