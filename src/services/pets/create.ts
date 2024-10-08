import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { AGE, ENERGY, ENVIRONMENT, Pet, SIZE } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreatePetServicesRequest {
  name: string;
  about: string;
  age: AGE;
  size: SIZE;
  energy_level: ENERGY;
  environment: ENVIRONMENT;
  orgId: string;
}

interface CreatePetServicesResponse {
  pet: Pet;
}

export class CreatePetServices {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    orgId,
  }: CreatePetServicesRequest): Promise<CreatePetServicesResponse> {
    const org = await this.orgsRepository.findById(orgId);
    if (!org) throw new ResourceNotFoundError();

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      org_id: orgId,
    });

    return { pet };
  }
}
