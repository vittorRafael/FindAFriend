import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { SearchPetsServices } from "./search";

describe("Search Pets Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: SearchPetsServices;

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new SearchPetsServices(petsRepository);
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

    await orgsRepository.create({
      id: "orgId-2",
      name: "Animal Foundation 2",
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

    await petsRepository.create({
      name: "Bob",
      about: "the dog is very happy and sleeper",
      age: "Filhote",
      size: "Pequenino",
      energy_level: "Moderado",
      environment: "Amplo",
      org_id: "orgId-1",
    });

    await petsRepository.create({
      name: "Mel",
      about: "the dog is very happy and hyperactive",
      age: "Adulto",
      size: "Grande",
      energy_level: "Hiperativo",
      environment: "Amplo",
      org_id: "orgId-1",
    });

    await petsRepository.create({
      name: "Bob 2",
      about: "the dog is very happy and sleeper",
      age: "Filhote",
      size: "Pequenino",
      energy_level: "Moderado",
      environment: "Amplo",
      org_id: "orgId-2",
    });

    await petsRepository.create({
      name: "Mel 2",
      about: "the dog is very happy and hyperactive",
      age: "Adulto",
      size: "Grande",
      energy_level: "Hiperativo",
      environment: "Amplo",
      org_id: "orgId-2",
    });
  });

  it("should be able to search pets by city", async () => {
    const { pets } = await sut.execute({
      city: "chorozinho",
    });

    expect(pets).toHaveLength(4);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Bob" }),
      expect.objectContaining({ name: "Mel" }),
      expect.objectContaining({ name: "Bob 2" }),
      expect.objectContaining({ name: "Mel 2" }),
    ]);
  });

  it("should be able to search pets by city and age", async () => {
    const { pets } = await sut.execute({
      city: "chorozinho",
      age: "Filhote",
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Bob" }),
      expect.objectContaining({ name: "Bob 2" }),
    ]);
  });

  it("should be able to search pets by city and size", async () => {
    const { pets } = await sut.execute({
      city: "chorozinho",
      size: "Grande",
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Mel" }),
      expect.objectContaining({ name: "Mel 2" }),
    ]);
  });

  it("should be able to search pets by city and energy_level", async () => {
    const { pets } = await sut.execute({
      city: "chorozinho",
      energy_level: "Hiperativo",
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Mel" }),
      expect.objectContaining({ name: "Mel 2" }),
    ]);
  });

  it("should be able to search pets by city and environment", async () => {
    const { pets } = await sut.execute({
      city: "chorozinho",
      environment: "Amplo",
    });

    expect(pets).toHaveLength(4);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Bob" }),
      expect.objectContaining({ name: "Mel" }),
      expect.objectContaining({ name: "Bob 2" }),
      expect.objectContaining({ name: "Mel 2" }),
    ]);
  });
});
