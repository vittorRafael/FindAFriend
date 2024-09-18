import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { AuthenticateServices } from "./authenticate";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateServices;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateServices(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    await orgsRepository.create({
      name: "Animal Foundation",
      author_name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
      cep: "62875000",
      state: "CE",
      city: "Chorozinho",
      neighborhood: "Triângulo",
      street: "Rua 1 de maio, 18",
      whatsapp: "85 9 9199-9999",
      latitude: -4.334747,
      longitude: -38.4744777,
    });

    const { org } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await orgsRepository.create({
      name: "Animal Foundation",
      author_name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123", 6),
      cep: "62875000",
      state: "CE",
      city: "Chorozinho",
      neighborhood: "Triângulo",
      street: "Rua 1 de maio, 18",
      whatsapp: "85 9 9199-9999",
      latitude: -4.334747,
      longitude: -38.4744777,
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
