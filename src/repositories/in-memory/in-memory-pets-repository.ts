import { Prisma, Pet } from "@prisma/client";
import { randomUUID } from "crypto";
import { FindAllParams, PetsRepository } from "../pets-repository";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);
    if (!org) return null;

    return org;
  }

  async search(params: FindAllParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city.toLowerCase() === params.city.toLowerCase()
    );

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true
      );

    return pets;
  }
}
