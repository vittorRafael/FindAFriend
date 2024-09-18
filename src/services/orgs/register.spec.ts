import { expect, describe, it, beforeEach } from "vitest";
import { RegisterServices } from "./register";
import { compare } from "bcryptjs";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsAlreadyExistsError } from "../errors/orgs-already-exists-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterServices;

describe("Register Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterServices(orgsRepository);
  });
  it("should be able to register", async () => {
    const { org } = await sut.execute({
      name: "Animal Foundation",
      author_name: "John Doe",
      email: "jonhdoe@example.com",
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

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { org } = await sut.execute({
      name: "Animal Foundation",
      author_name: "John Doe",
      email: "jonhdoe@example.com",
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

    const isPasswordCorrectlyHashed = await compare("123456", org.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "jonhdoe@example.com";

    await sut.execute({
      name: "Animal Foundation",
      author_name: "John Doe",
      email,
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

    await expect(() => {
      return sut.execute({
        name: "Animal Foundation",
        author_name: "John Doe",
        email,
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
    }).rejects.toBeInstanceOf(OrgsAlreadyExistsError);
  });
});
