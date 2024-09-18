import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";

interface SearchPetsServicesRequest {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

interface SearchPetsServicesResponse {
  pets: Pet[];
}

export class SearchPetsServices {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
  }: SearchPetsServicesRequest): Promise<SearchPetsServicesResponse> {
    const pets = await this.petsRepository.search({
      city,
      age,
      size,
      energy_level,
      environment,
    });

    return { pets };
  }
}
