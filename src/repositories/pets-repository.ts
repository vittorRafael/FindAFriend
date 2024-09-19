import { AGE, ENERGY, ENVIRONMENT, Pet, Prisma, SIZE } from "@prisma/client";

export interface FindAllParams {
  city: string;
  age?: AGE;
  size?: SIZE;
  energy_level?: ENERGY;
  environment?: ENVIRONMENT;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  search(params: FindAllParams): Promise<Pet[]>;
}
