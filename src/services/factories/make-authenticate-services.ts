import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateServices } from "../orgs/authenticate";

export function makeAuthenticateServices() {
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new AuthenticateServices(orgsRepository);

  return useCase;
}
