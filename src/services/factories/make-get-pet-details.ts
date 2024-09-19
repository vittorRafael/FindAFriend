import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetDetailsServices } from "../pets/get-pet-details";

export function makeGetPetDetails() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new GetPetDetailsServices(petsRepository);

  return useCase;
}
