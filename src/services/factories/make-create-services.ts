import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreatePetServices } from "../pets/create";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeCreateServices() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new CreatePetServices(petsRepository, orgsRepository);

  return useCase;
}
