import { RegisterServices } from "../orgs/register";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeRegisterServices() {
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new RegisterServices(orgsRepository);

  return useCase;
}
