import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsServices } from "../pets/search";

export function makeSearchServices() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new SearchPetsServices(petsRepository);

  return useCase;
}
