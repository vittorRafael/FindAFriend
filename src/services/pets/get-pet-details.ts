import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { PetsRepository } from "@/repositories/pets-repository";

interface GetPetDetailsServicesResquest {
  petId: string;
}
interface GetPetDetailsServicesResponse {
  pet: Pet;
}

export class GetPetDetailsServices {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailsServicesResquest): Promise<GetPetDetailsServicesResponse> {
    const pet = await this.petRepository.findById(petId);
    if (!pet) throw new ResourceNotFoundError();

    return { pet };
  }
}
